import { forwardRef } from "react"
import { Button } from "./ui/button"
import { LoaderCircle } from "lucide-react";

interface Props extends React.ComponentProps<"button"> {
  disabled: boolean;
  label: string;
  loadLabel?: string;
}

export const LoaderButton = forwardRef<HTMLButtonElement, Props>((
  { className, disabled, label, loadLabel = label, ...props },
  ref
) => {
  return (
    <Button ref={ref} type="submit" className={`w-full ${className}`} disabled={disabled} {...props}>
      {disabled && (
        <LoaderCircle
          className="size-4 animate-spin"
          aria-hidden="true"
        />
      )}
      {disabled ? loadLabel : label}
    </Button>
  )
})