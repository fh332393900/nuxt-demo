<script setup>
import { createClient } from '@supabase/supabase-js'
import useUserAuth from '~/composables/userAuth'

const supabase = createClient('https://gmpherjortzssdpmpxkp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtcGhlcmpvcnR6c3NkcG1weGtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4MTA3MDcsImV4cCI6MjA0MDM4NjcwN30.BQTPsLAdzaK5nZKaN4BJgMxJ6yUIyh82iIWzyqxU7-0')

const { user } = useUserAuth()
const toast = useToast()
const state = reactive({
  name: user.value.username,
  avatar: user.value.avatarUrl
})
const filePath = ref()
const files = ref({})
const isNoChangeUser = computed(() => {
  return state.name === user.value.username && state.avatar === user.value.avatarUrl
})

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

async function onSubmit () {
  const params = {
    username: state.name,
    avatarUrl: state.avatar
  }
  if (filePath.value) {
    const { fullPath } = await uploadAvatar()
    params.avatarUrl = `https://gmpherjortzssdpmpxkp.supabase.co/storage/v1/object/public/${fullPath}`
  }
  await $fetch('/api/user/update', {
    method: 'PUT',
    body: params
  })
  toast.add({ title: 'Update success!' })
}
function changeFile (file, path) {
  const url = URL.createObjectURL(file)
  filePath.value = path
  state.avatar = url
  files.value = file
}
</script>

<template>
  <div>
    <UContainer>
      <div class="pb-2 text-base font-bold border-b border-gray-200 dark:border-gray-600">
        Settings
      </div>
      <div>
        <UForm ref="form" :state="state" @submit="onSubmit">
          <UFormGroup class="flex py-4 justify-between border-b border-gray-200 dark:border-gray-600" label="Email" description="We'll only use this for spam." size="sm">
            <template #label>
              <span>Name</span>
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
              <span>Avatar</span>
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
              Save
            </UButton>
            <UButton
              class="ml-4 px-5"
              variant="outline"
              :disabled="isNoChangeUser"
              @click="cancelChange"
            >
              Cancel
            </UButton>
          </div>
        </UForm>
      </div>
      <div class="mt-4 py-4 border-t border-b border-gray-200 dark:border-gray-600">
        <p>
          Account
        </p>
        <p class="text-sm text-gray-400">
          No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently.
        </p>
      </div>
      <UButton type="submit" class="mt-4 px-5" color="red">
        Delete Account
      </UButton>
    </UContainer>
    <UNotifications />
  </div>
</template>
