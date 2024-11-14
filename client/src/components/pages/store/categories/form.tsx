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
import { CategoryFormSchema } from "@/api/store/category/validations";

interface Props
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  form: UseFormReturn<CategoryFormSchema>;
  onSubmit: (data: CategoryFormSchema) => void;
  classname?: string;
  children: React.ReactNode;
}

export const CategoryForm = ({
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
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ingresa el nombre"
                  disabled={form.formState.isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input
                  placeholder="Descripción"
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