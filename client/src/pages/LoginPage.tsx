import { LoginForm } from "@/components/auth/login-form";
import { useAuth } from "@/setup/auth-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "@/api/auth/validations";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import SEO from "@/setup/seo";

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (values: LoginSchema) => {
    try {
      const { message } = await login(values)

      if (message) {
        toast.error(message)
        return
      }

      navigate("/")
      form.reset()
      toast.success('Bienvenido!')
    } catch (error) {
      toast.error('Something went wrong, please try again later.')
    }
  }

  return (
    <SEO
      title="Inicio de sesión - Pharmacy"
      description="Ingresa tus credenciales para acceder."
    >
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
    </SEO>
  )
}