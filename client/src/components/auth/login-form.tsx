import { cn } from "@/lib/utils";
import { type UseFormReturn } from "react-hook-form"
import { type LoginSchema } from "@/api/auth/validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/password-input";
import { LoaderButton } from "@/components/loader-button";

interface Props
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  form: UseFormReturn<LoginSchema>;
  onSubmit: (data: LoginSchema) => void;
  classname?: string;
}

export const LoginForm = ({
  form,
  onSubmit,
  className,
}: Props) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("grid gap-4", className)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="elon@mail.com"
                  type="text"
                  disabled={form.formState.isSubmitting}
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Contraseña
              </FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="******"
                  disabled={form.formState.isSubmitting}
                  required
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <LoaderButton
          type="submit"
          label="Ingresar"
          loadLabel="Ingresando.."
          disabled={form.formState.isSubmitting}
        />
      </form>
    </Form>
  )
}