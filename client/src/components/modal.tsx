import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

interface ModalProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
  title: string;
  description: string;
  triggerContent?: React.ReactNode;
  onInteractOutside?: (event: Event) => void;
  className?: string;
  children?: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  triggerContent,
  onInteractOutside,
  className,
  children,
  ...props
}) => {
  return (
    <Dialog {...props}>
      {triggerContent && (
        <DialogTrigger asChild>
          {triggerContent}
        </DialogTrigger>
      )}
      <DialogContent className={className} onInteractOutside={onInteractOutside}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};