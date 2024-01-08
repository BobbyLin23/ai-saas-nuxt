export async function useCurrentUser() {
  const { getSession } = useAuth()

  const session = await getSession()

  return session.user
}
