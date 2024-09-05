<script setup>
import { createClient } from '@supabase/supabase-js'
import useUserAuth from '~/composables/userAuth'

definePageMeta({
  middleware: 'auth'
})

let supabase
const { user, clear } = useUserAuth()
const router = useRouter()
const toast = useToast()
const state = reactive({
  name: user.value.username,
  avatar: user.value.avatarUrl
})
const filePath = ref()
const files = ref({})
const supabaseKey = ref({})
const isOpen = ref(false)

const isNoChangeUser = computed(() => {
  return state.name === user.value.username && state.avatar === user.value.avatarUrl
})

initSupabase()

async function getUploadKey () {
  const { data } = await $fetch('/api/uploadKey')
  supabaseKey.value = data
}

async function initSupabase () {
  await getUploadKey()
  const { url, key } = supabaseKey.value
  supabase = createClient(url, key)
}
function cancelChange () {
  state.name = user.value.username
  state.avatar = user.value.avatarUrl

  filePath.value = ''
  files.value = {}
}

async function uploadAvatar () {
  try {
    const { data } = await supabase.storage.from('test').upload(filePath.value, files.value)
    return data
  } catch (error) {}
}

function getSupabaseFileName (url) {
  const isSupabaseImage = url.includes(supabaseKey.value.bucket)
  const fileNames = url.split('/')
  const fileName = fileNames[fileNames.length - 1]

  if (!isSupabaseImage) {
    return ''
  }
  return fileName
}

async function deleteImage (fileName) {
  await supabase.storage.from('test').remove([`/avatar/${fileName}`])
}

async function onSubmit () {
  const params = {
    username: state.name,
    avatarUrl: state.avatar
  }
  const deleteImageUrl = getSupabaseFileName(user.value.avatarUrl)
  if (filePath.value) {
    const { fullPath } = await uploadAvatar()
    params.avatarUrl = `${supabaseKey.value.bucket}${fullPath}`
  }
  await $fetch('/api/user/update', {
    method: 'PUT',
    body: params
  })
  toast.add({ title: 'Update success!' })
  deleteImageUrl && await deleteImage(deleteImageUrl)
}
function changeFile (file, path) {
  const url = URL.createObjectURL(file)
  filePath.value = path
  state.avatar = url
  files.value = file
}

async function deleteAccount () {
  await $fetch('/api/user/delete', {
    method: 'DELETE'
  })
  toast.add({ title: 'Delete success!' })
  clear()
  isOpen.value = false
  router.push('/')
}
</script>

<template>
  <div>
    <UContainer>
      <div class="pb-2 text-base font-bold border-b border-gray-200 dark:border-gray-600">
        {{ $t('action.settings') }}
      </div>
      <div>
        <UForm ref="form" :state="state" @submit="onSubmit">
          <UFormGroup class="flex py-4 justify-between border-b border-gray-200 dark:border-gray-600" label="Email" description="We'll only use this for spam." size="sm">
            <template #label>
              <span>{{ $t('signup.username') }}</span>
            </template>
            <template #description>
              <span class="text-sm text-gray-400">Will appear on receipts, invoices, and other communication.</span>
            </template>
            <template #default>
              <UInput v-model="state.name" placeholder="Your name" />
            </template>
          </UFormGroup>
          <UFormGroup class="flex py-4 justify-between border-b border-gray-200 dark:border-gray-600" label="Email" description="We'll only use this for spam." size="sm">
            <template #label>
              <span>{{ $t('setting.avatar') }}</span>
            </template>
            <template #description>
              <span class="text-sm text-gray-400">Will appear on receipts, invoices, and other communication.</span>
            </template>
            <template #default>
              <div class="flex">
                <UAvatar
                  class="mr-4"
                  :src="state.avatar"
                  :alt="state.name"
                />
                <Upload @change-file="changeFile" />
              </div>
            </template>
          </UFormGroup>

          <div class="mt-4">
            <UButton type="submit" class="px-5" :disabled="isNoChangeUser">
              {{ $t('setting.save') }}
            </UButton>
            <UButton
              class="ml-4 px-5"
              variant="outline"
              :disabled="isNoChangeUser"
              @click="cancelChange"
            >
              {{ $t('setting.cancel') }}
            </UButton>
          </div>
        </UForm>
      </div>
      <div class="mt-4 py-4 border-t border-b border-gray-200 dark:border-gray-600">
        <p>
          {{ $t('setting.account') }}
        </p>
        <p class="text-sm text-gray-400">
          {{ $t('setting.delete_account_tips') }}
        </p>
      </div>
      <UButton type="submit" class="mt-4 px-5" color="red" @click="isOpen = true">
        {{ $t('setting.delete_account') }}
      </UButton>
    </UContainer>
    <UNotifications />
    <UModal v-model="isOpen">
      <div class="p-4">
        <div class="flex">
          <UIcon name="i-heroicons:exclamation-circle" class="text-red-500 w-10 h-10" />
          <div class="ml-2">
            <p class="font-bold">
              Delete account
            </p>
            <p class="text-sm text-gray-400">
              Are you sure you want to delete your account?
            </p>
          </div>
        </div>
        <UButton class="mt-4 px-5 ml-12" color="red" @click="deleteAccount">
          {{ $t('setting.delete_account') }}
        </UButton>
        <UButton class="mt-4 px-5 ml-1" variant="outline" @click="isOpen = false">
          {{ $t('setting.cancel') }}
        </UButton>
      </div>
    </UModal>
  </div>
</template>
