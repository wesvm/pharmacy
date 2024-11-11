import { cn } from "@/lib/utils"
import { PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
  className?: string;
}
export const SimpleCard = ({
  className, children
}: CardProps) => {
  return (
    <div
      className={
        cn("p-4 rounded-md border shadow-md", className)}
    >
      {children}
    </div>
  )
}