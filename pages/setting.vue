<script setup>
// import { createClient } from '@supabase/supabase-js'
import useUserAuth from '~/composables/userAuth'

// const supabase = createClient('https://gmpherjortzssdpmpxkp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtcGhlcmpvcnR6c3NkcG1weGtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4MTA3MDcsImV4cCI6MjA0MDM4NjcwN30.BQTPsLAdzaK5nZKaN4BJgMxJ6yUIyh82iIWzyqxU7-0')

const { user } = useUserAuth()
const state = reactive({
  name: user.value.username,
  avatar: user.value.avatarUrl
})
// const uploading = ref(false)
// const src = ref('')
// const files = ref()

// const uploadAvatar = async (evt) => {
//   files.value = evt.target.files
//   try {
//     uploading.value = true

//     if (!files.value || files.value.length === 0) {
//       throw new Error('You must select an image to upload.')
//     }

//     const file = files.value[0]
//     const fileExt = file.name.split('.').pop()
//     const fileName = `${Math.random()}.${fileExt}`
//     const filePath = `/avatar/${fileName}`
//     console.log(file)
//     const { error: uploadError } = await supabase.storage.from('test').upload(filePath, file)

//     if (uploadError) { throw uploadError }
//   } catch (error) {
//     alert(error.message)
//   } finally {
//     uploading.value = false
//   }
// }

function onSubmit () {

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
                <!-- <UInput type="file" size="sm" icon="i-heroicons-folder" /> -->
                <Upload />
              </div>
            </template>
          </UFormGroup>

          <div class="mt-4">
            <UButton type="submit" class="px-5">
              Save
            </UButton>
            <UButton class="ml-4 px-5" variant="outline">
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
  </div>
</template>
