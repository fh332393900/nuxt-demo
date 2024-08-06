export function setUserCookie (event: any, token: string, user: any) {
  setCookie(event, 'auth._token.local', token, {
    httpOnly: false,
    sameSite: true,
    maxAge: 3600
  })

  setCookie(event, 'auth.user.local', JSON.stringify(user), {
    httpOnly: false,
    sameSite: true,
    maxAge: 3600
  })
}
