import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RoleFormSchema } from "@/api/role/validations";

interface Props
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  form: UseFormReturn<RoleFormSchema>;
  onSubmit: (data: RoleFormSchema) => void;
  classname?: string;
  children: React.ReactNode;
}

export const RoleForm = ({
  form,
  onSubmit,
  className,
  children
}: Props) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("grid gap-2 py-2", className)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rol</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ingresa el nombre"
                  className="uppercase"
                  disabled={form.formState.isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  )
}