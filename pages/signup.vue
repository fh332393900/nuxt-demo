<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const state = reactive({
  email: '',
  password: '',
  username: ''
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) { errors.push({ path: 'email', message: 'Required' }) }
  if (!state.username) { errors.push({ path: 'username', message: 'Required' }) }
  if (!state.password) { errors.push({ path: 'password', message: 'Required' }) }
  return errors
}

async function onSubmit (event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data)
  const res = await $fetch('/api/auth/register', {
    method: 'POST',
    body: event.data
  })
  console.log(res)
}
</script>

<template>
  <div class="mx-auto mt-6 max-w-96 flex justify-center flex-col">
    <div class="text-center font-bold text-lg py-4 text-primary">
      Sign up
    </div>
    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" placeholder="Email Address" />
      </UFormGroup>

      <UFormGroup label="Username" name="username">
        <UInput v-model="state.username" placeholder="Username" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" placeholder="Password" type="password" />
      </UFormGroup>

      <UButton block size="lg" icon="i-heroicons-envelope" type="submit">
        Sign Up
      </UButton>
    </UForm>
    <div class="text-center mt-4">
      <ULink
        to="/login"
        icon="i-material-symbols:keyboard-backspace-rounded"
        active-class="text-primary"
        inactive-class="text-primary dark:text-primary-400 hover:underline"
      >
        Back to Login
      </ULink>
    </div>
    <p class="text-xs text-gray-500 dark:text-gray-400 mt-5 text-center">
      By continuing, you are indicating that you have read and acknowledge the
      <ULink
        active-class="text-primary"
        inactive-class="text-primary dark:text-primary-400 hover:underline"
      >
        Terms of Service
      </ULink> and
      <ULink
        active-class="text-primary"
        inactive-class="text-primary dark:text-primary-400 hover:underline"
      >
        Privacy Policy
      </ULink>.
    </p>
  </div>
</template>
