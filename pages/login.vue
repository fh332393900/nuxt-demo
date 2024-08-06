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
  <div class="mx-auto mt-3 max-w-96 flex justify-center flex-col">
    <div class="text-center font-bold text-lg text-primary">
      {{ $t('login.welcome_back') }}
    </div>
    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup :label="$t('login.email')" name="email">
        <UInput v-model="state.email" :placeholder="$t('login.email_address')" />
      </UFormGroup>

      <UFormGroup :label="$t('login.password')" name="password">
        <UInput v-model="state.password" :placeholder="$t('login.password')" type="password" />
      </UFormGroup>

      <UButton type="submit" size="lg" icon="i-heroicons-envelope" block>
        {{ $t('login.continue_with', [$t('login.email')]) }}
      </UButton>
    </UForm>

    <div class="flex justify-center flex-col">
      <div class="p-4">
        <UDivider :label="$t('login.or')" />
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
        {{ $t('login.continue_with', ['Github']) }}
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
        {{ $t('login.continue_with', ['Google']) }}
      </UButton>
    </div>
    <div class="text-center mt-4">
      <span class="text-gray-500 dark:text-gray-400">
        {{ $t('login.no_account') }}
      </span>
      <ULink
        to="/signup"
        active-class="text-primary"
        inactive-class="text-primary dark:text-primary-400 hover:underline"
      >
        {{ $t('login.sign_up') }}
      </ULink>
    </div>
    <p class="text-xs text-gray-500 dark:text-gray-400 mt-5 text-center">
      <i18n-t keypath="login.policy_tips">
        <ULink
          active-class="text-primary"
          inactive-class="text-primary dark:text-primary-400 hover:underline"
        >
          {{ $t('login.service') }}
        </ULink>
        <ULink
          active-class="text-primary"
          inactive-class="text-primary dark:text-primary-400 hover:underline"
        >
          {{ $t('login.policy') }}
        </ULink>
      </i18n-t>
    </p>
  </div>
</template>
