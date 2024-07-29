export default oauth.googleEventHandler({
  async onSuccess (event, { user }) {
    console.log(user, '----user')
    user.avatar = user.picture
    await setUserSession(event, { user })
    return sendRedirect(event, '/')
  },
  // Optional, will return a json error and 401 status code by default
  onError (event, error) {
    console.error('GitHub OAuth error:', error)
    return sendRedirect(event, '/')
  }
})
