import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { LucideIcon } from "lucide-react";

const boxVariant = cva(
  "rounded-md p-2",
  {
    variants: {
      variant: {
        default: "bg-blue-500/20",
        success: "bg-emerald-500/20",
        danger: "bg-rose-500/20",
        warning: "bg-yellow-500/20"
      }
    },
    defaultVariants: {
      variant: "default",
    }
  }
)

const iconVariant = cva(
  "size-4",
  {
    variants: {
      variant: {
        default: "fill-blue-500",
        success: "fill-emerald-500",
        danger: "fill-rose-500",
        warning: "fill-yellow-500"
      }
    },
    defaultVariants: {
      variant: "default",
    }
  }
)

type BoxVariants = VariantProps<typeof boxVariant>;
type IconVariants = VariantProps<typeof iconVariant>;

interface SummaryCardProps extends BoxVariants, IconVariants {
  title: string;
  total: React.ReactNode;
  icon?: LucideIcon;
}

export const SummaryCard = ({
  title,
  total,
  icon: Icon,
  variant
}: SummaryCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {Icon && (
          <div className={cn(boxVariant({ variant }))}>
            <Icon className={iconVariant({ variant })} />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <span className="text-2xl font-bold">
          {total}
        </span>
      </CardContent>
    </Card>
  )
}