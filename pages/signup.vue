<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const { t } = useI18n()
const state = reactive({
  email: '',
  password: '',
  username: ''
})
const signupSuccess = ref(false)
const btnLoading = ref(false)
const signupResult = ref({
  color: 'primary',
  title: t('signup.success'),
  message: t('signup.signup_success_tips'),
  icon: 'i-material-symbols-light:check-circle-rounded'
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) { errors.push({ path: 'email', message: 'Required' }) }
  if (!state.username) { errors.push({ path: 'username', message: 'Required' }) }
  if (!state.password) { errors.push({ path: 'password', message: 'Required' }) }
  return errors
}

async function onSubmit (event: FormSubmitEvent<any>) {
  btnLoading.value = true
  try {
    const res = await $fetch('/api/auth/register', {
      method: 'POST',
      body: event.data
    })
    signupSuccess.value = true
    btnLoading.value = false
    if (res.status !== 'success') {
      signupResult.value = {
        color: 'red',
        title: t('signup.error'),
        message: res.message,
        icon: 'i-material-symbols:error-circle-rounded-sharp'
      }
    } else {
      signupResult.value = {
        color: 'primary',
        title: t('signup.success'),
        message: t('signup.signup_success_tips'),
        icon: 'i-material-symbols-light:check-circle-rounded'
      }
    }
  } catch (error) {
    btnLoading.value = false
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
          :icon="signupResult.icon"
          :color="signupResult.color"
          variant="outline"
          :title="signupResult.title"
          :description="signupResult.message"
        />
      </div>
      <UButton
        block
        size="lg"
        icon="i-heroicons-envelope"
        type="submit"
        :loading="btnLoading"
      >
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
