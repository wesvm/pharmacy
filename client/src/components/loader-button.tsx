import { Button } from "./ui/button"
import { LoaderCircle } from "lucide-react";

interface Props extends React.ComponentPropsWithoutRef<typeof Button> {
  label: string;
  loadLabel?: string;
}

export const LoaderButton = ({ label, loadLabel = label, disabled, ...props }: Props) => {
  return (
    <Button disabled={disabled} {...props}>
      {disabled && (
        <LoaderCircle
          className="size-4 animate-spin"
          aria-hidden="true"
        />
      )}
      {disabled ? loadLabel : label}
    </Button>
  )
}