import {
  type ColumnDef,
} from '@tanstack/react-table';
import { DataTable } from '@/components/data-table/data-table';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ModalTicket } from '../modal-ticket';

interface Props {
  columns: ColumnDef<Purchase>[];
  data: Purchase[];
}

export function PurchasesTable({
  columns,
  data,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null)

  return (
    <>
      {selectedPurchase && (
        <ModalTicket
          purchaseId={selectedPurchase.id}
          open={open}
          onOpenChange={setOpen}
        />
      )}
      <DataTable
        columns={columns}
        data={data}
        onRowSelect={(row) => {
          setSelectedPurchase(row);
          setOpen(true)
        }}
      >
        <Link to='/purchases/new'>
          <Button>
            Realizar compra
          </Button>
        </Link>
      </DataTable>
    </>
  );
}