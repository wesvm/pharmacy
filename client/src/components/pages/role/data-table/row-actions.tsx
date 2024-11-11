import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { Ellipsis } from "lucide-react";
import { useRoleRowActionStore } from ".";


interface RowActionsProps {
  row: Role;
}

export function RowActions({
  row
}: RowActionsProps) {
  const { setRowAction } = useRoleRowActionStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Abrir menu"
          variant="ghost"
          className="flex size-8 p-0 data-[state=open]:bg-muted"
        >
          <Ellipsis className="size-4" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onSelect={() => setRowAction(row, "update")}
        >
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setRowAction(row, "delete")}
        >
          Eliminar
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}