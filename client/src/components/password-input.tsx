import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from '@/components/ui/input'
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const PasswordInput = forwardRef<HTMLInputElement, React.ComponentProps<"input">>((
  { className, ...props },
  ref
) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const disabled = props.disabled;

  return (
    <div className="relative">
      <Input
        ref={ref}
        type={showPassword ? "text" : "password"}
        className={cn("pr-10", className)}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
        disabled={disabled}
      >
        {showPassword && !disabled ? (
          <EyeOff className="h-4 w-4 text-muted-foreground" />
        ) : (
          <Eye className="h-4 w-4 text-muted-foreground" />
        )}
      </Button>

      <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}
      </style>
    </div>
  )
});