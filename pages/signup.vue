<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const state = reactive({
  email: '',
  password: '',
  username: ''
})
const signupSuccess = ref(false)

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) { errors.push({ path: 'email', message: 'Required' }) }
  if (!state.username) { errors.push({ path: 'username', message: 'Required' }) }
  if (!state.password) { errors.push({ path: 'password', message: 'Required' }) }
  return errors
}

async function onSubmit (event: FormSubmitEvent<any>) {
  const res = await $fetch('/api/auth/register', {
    method: 'POST',
    body: event.data
  })
  if (res.status === 'success') {
    signupSuccess.value = true
  }
}
</script>

<template>
  <div class="mx-auto mt-3 max-w-96 flex justify-center flex-col">
    <div class="text-center font-bold text-lg text-primary">
      {{ $t('login.sign_up') }}
    </div>
    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup :label="$t('login.email')" name="email">
        <UInput v-model="state.email" :placeholder="$t('login.email_address')" />
      </UFormGroup>

      <UFormGroup :label="$t('signup.username')" name="username">
        <UInput v-model="state.username" :placeholder="$t('signup.username')" />
      </UFormGroup>

      <UFormGroup :label="$t('login.password')" name="password">
        <UInput v-model="state.password" :placeholder="$t('login.password')" type="password" />
      </UFormGroup>
      <div v-if="signupSuccess">
        <UAlert
          icon="i-material-symbols-light:check-circle-rounded"
          color="primary"
          variant="outline"
          :title="$t('signup.success')"
          :description="$t('signup.signup_success_tips')"
        />
      </div>
      <UButton block size="lg" icon="i-heroicons-envelope" type="submit">
        {{ $t('login.sign_up') }}
      </UButton>
    </UForm>
    <div class="text-center mt-4">
      <ULink
        to="/login"
        icon="i-material-symbols:keyboard-backspace-rounded"
        active-class="text-primary"
        inactive-class="text-primary dark:text-primary-400 hover:underline"
      >
        {{ $t('signup.back_login') }}
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
