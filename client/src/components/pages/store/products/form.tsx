import { UseFormReturn } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { ProductFormSchema } from "@/api/store/product/validations";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { NumericFormat } from "react-number-format";

interface Props
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  form: UseFormReturn<ProductFormSchema>;
  onSubmit: (data: ProductFormSchema) => void;
  classname?: string;
  children: React.ReactNode;
}

export const ProductForm = ({
  form,
  onSubmit,
  className,
  children
}: Props) => {
  const queryClient = useQueryClient();
  const queryCategories = queryClient.getQueryData<{ categories: Category[] }>(['categories']);
  const querySuppliers = queryClient.getQueryData<{ suppliers: Supplier[] }>(['suppliers']);
  const categories = queryCategories?.categories
  const suppliers = querySuppliers?.suppliers

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("grid gap-2 pt-2", className)}>
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
                <Textarea
                  placeholder="Ingresa la descripción"
                  className="resize-none"
                  disabled={form.formState.isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-3 gap-2">
          <FormField
            control={form.control}
            name="salePrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio venta</FormLabel>
                <FormControl>
                  <NumericFormat
                    name={field.name}
                    value={field.value || ''}
                    onValueChange={(values) => {
                      form.setValue(field.name, values.floatValue || 0);
                    }}
                    onChange={() => form.trigger(field.name)}
                    placeholder="S/ 0.00"
                    prefix="S/ "
                    allowNegative={false}
                    thousandSeparator
                    customInput={Input}
                    decimalScale={2}
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="purchasePrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio compra</FormLabel>
                <FormControl>
                  <NumericFormat
                    name={field.name}
                    value={field.value || ''}
                    onValueChange={(values) => {
                      form.setValue(field.name, values.floatValue || 0);
                    }}
                    onChange={() => form.trigger(field.name)}
                    placeholder="S/ 0.00"
                    prefix="S/ "
                    allowNegative={false}
                    thousandSeparator
                    customInput={Input}
                    decimalScale={2}
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stockQuantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Ingresa el stock"
                    disabled={form.formState.isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        disabled={form.formState.isSubmitting}
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <span className="truncate">
                          {field.value
                            ? categories?.find((category) => category.id === field.value)?.name
                            : "Selecciona la categoria"}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Busca la categoria..." />
                      <CommandList>
                        <CommandEmpty>Categoria no encontrada.</CommandEmpty>
                        <CommandGroup>
                          {
                            categories?.map((category) => (
                              <CommandItem
                                key={category.id}
                                value={category.name}
                                onSelect={() => {
                                  form.setValue(field.name, category.id);
                                  form.trigger(field.name)
                                }}
                              >
                                {category.name}
                                <Check
                                  className={cn("ml-auto", category.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0")}
                                />
                              </CommandItem>
                            ))
                          }
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="supplierId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proveedor</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        disabled={form.formState.isSubmitting}
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <span className="truncate">
                          {field.value
                            ? suppliers?.find((supplier) => supplier.id === field.value)?.name
                            : "Seleccione el proveedor"
                          }
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Busca el proveedor..." />
                      <CommandList>
                        <CommandEmpty>Proveedor no encontrado.</CommandEmpty>
                        <CommandGroup>
                          {
                            suppliers?.map((supplier) => (
                              <CommandItem
                                key={supplier.id}
                                value={supplier.name}
                                onSelect={() => {
                                  form.setValue(field.name, supplier.id);
                                  form.trigger(field.name)
                                }}
                              >
                                {supplier.name}
                                <Check
                                  className={cn("ml-auto", supplier.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0")}
                                />
                              </CommandItem>
                            ))
                          }
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {children}
      </form>
    </Form>
  )
}