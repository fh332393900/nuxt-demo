export default oauth.githubEventHandler({
  config: {
    emailRequired: true
  },
  async onSuccess (event, { user }) {
    await setUserSession(event, {
      ...user,
      avarat: user.avatar_url,
      name: user.login
    })
    return sendRedirect(event, '/')
  },
  // Optional, will return a json error and 401 status code by default
  onError (event, error) {
    console.error('GitHub OAuth error:', error)
    return sendRedirect(event, '/')
  }
})
