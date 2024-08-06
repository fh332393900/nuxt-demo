<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
import useUserAuth from '~/composables/userAuth'

definePageMeta({
  middleware: 'auth'
})

const loginError = ref({
  title: '',
  message: ''
})
const router = useRouter()
const state = reactive({
  email: '',
  password: ''
})
const { user, login } = useUserAuth()

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) { errors.push({ path: 'email', message: 'Required' }) }
  if (!state.password) { errors.push({ path: 'password', message: 'Required' }) }
  return errors
}

async function onSubmit (event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data)
  const res = await login(event.data)
  if (res.status === 'success') {
    console.log(user.value, '-----------')
    state.value = {
      email: '',
      password: ''
    }
    router.push('/')
  } else {
    loginError.value = {
      title: 'Error',
      message: res.message
    }
  }
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

      <UAlert
        v-if="loginError.title"
        icon="i-material-symbols:error-circle-rounded-sharp"
        color="red"
        variant="outline"
        :title="loginError.title"
        :description="loginError.message"
      />

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
