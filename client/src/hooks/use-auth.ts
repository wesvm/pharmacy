import { signIn } from '@/api/auth/actions'
import type { LoginSchema } from '@/api/auth/validations'
import { tokenService } from '@/api/token-service'
import { useAuthStore } from '@/store/auth-store'

export const isAuthenticated = (): boolean => {
  return !!tokenService.getToken() || !!useAuthStore.getState().user
}

const useAuth = () => {
  const user = useAuthStore((s) => s.user)
  const setUser = useAuthStore((s) => s.setUser)
  const removeUser = useAuthStore((s) => s.removeUser)

  const login = async (credentials: LoginSchema) => {
    const response = await signIn(credentials)
    if (response.token) {
      const { token, user } = response
      tokenService.saveToken(token)
      setUser(user)
    }

    return response
  }

  const logout = () => {
    tokenService.clearToken()
    removeUser()
  }

  const isAuthenticated = !!useAuthStore((s) => s.user) && !!tokenService.getToken()

  return {
    user,
    login,
    logout,
    isAuthenticated
  }
}


export default useAuth