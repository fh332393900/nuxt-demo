export default oauth.githubEventHandler({
  config: {
    emailRequired: true
  },
  async onSuccess (event, { user }) {
    user.name = user.login
    user.avatar = user.avatar_url
    console.log(user, '----user')
    await setUserSession(event, { user })
    return sendRedirect(event, '/')
  },
  // Optional, will return a json error and 401 status code by default
  onError (event, error) {
    console.error('GitHub OAuth error:', error)
    return sendRedirect(event, '/')
  }
})
