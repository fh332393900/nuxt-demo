<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const router = useRouter()
const state = reactive({
  email: '',
  password: ''
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) { errors.push({ path: 'email', message: 'Required' }) }
  if (!state.password) { errors.push({ path: 'password', message: 'Required' }) }
  return errors
}

async function onSubmit (event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data)
  const res = await $fetch('/api/auth/login', {
    method: 'POST',
    body: event.data
  })
  console.log(res)
  router.push('/')
}
</script>

<template>
  <div class="mx-auto mt-6 max-w-96 flex justify-center flex-col">
    <div class="text-center font-bold text-lg py-4 text-primary">
      Welcome back!
    </div>
    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" placeholder="Email Address" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" placeholder="Password" type="password" />
      </UFormGroup>

      <UButton type="submit" size="lg" icon="i-heroicons-envelope" block>
        Continue with Email
      </UButton>
    </UForm>

    <div class="flex justify-center flex-col mt-2 pt-3">
      <div class="text-gray-500 text-center p-4 flex items-center">
        <div class="border-t flex-1" />
        <div class="mx-4">
          or
        </div>
        <div class="border-t flex-1" />
      </div>
      <UButton
        to="/api/auth/github"
        icon="i-simple-icons-github"
        label="Github"
        color="black"
        size="lg"
        external
        class="mb-4 text-center flex justify-center"
      >
        {{ 'Continue with Github' }}
      </UButton>
      <UButton
        to="/api/auth/google"
        icon="i-logos:google-icon"
        label="Google"
        color="gray"
        size="lg"
        external
        class="mb-4 text-center flex justify-center"
      >
        {{ 'Continue with Google' }}
      </UButton>
    </div>
    <div class="text-center mt-8">
      <span class="text-gray-500 dark:text-gray-400">Don't have an account?</span>
      <ULink
        to="/signup"
        active-class="text-primary"
        inactive-class="text-primary dark:text-primary-400 hover:underline"
      >
        Sign Up
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
