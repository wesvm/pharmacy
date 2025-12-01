import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { type LoginSchema, loginSchema } from '@/api/auth/validations'
import { LoginForm } from '@/components/auth/login-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import useAuth from '@/hooks/use-auth'

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  const { login } = useAuth()
  const navigate = Route.useNavigate()
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: LoginSchema) => {
    try {
      const { message } = await login(values)

      if (message) {
        toast.error(message)
        return
      }

      navigate({ to: '/' })
      form.reset()
      toast.success('Bienvenido!')
    } catch {
      toast.error('Something went wrong, please try again later.')
    }
  }

  return (
    <main className="h-dvh flex items-center justify-center">
      <Card className="mx-auto w-full max-w-sm shadow-md">
        <CardHeader className="items-center">
          <CardTitle>Inicio de sesión</CardTitle>
          <CardDescription>Ingresa tus credenciales para comenzar.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm form={form} onSubmit={onSubmit} />
        </CardContent>
      </Card>
    </main>
  )
}
