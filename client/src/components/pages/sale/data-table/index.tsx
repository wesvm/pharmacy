import {
  type ColumnDef,
} from '@tanstack/react-table';
import { DataTable } from '@/components/data-table/data-table';
import { useState } from 'react';
import { ModalTicket } from '../modal-ticket';

interface Props {
  columns: ColumnDef<Sale>[];
  data: Sale[];
}

export function SalesTable({
  columns,
  data,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null)

  return (
    <>
      {selectedSale && (
        <ModalTicket
          saleId={selectedSale.id}
          open={open}
          setOpen={setOpen}
        />
      )}
      <DataTable
        columns={columns}
        data={data}
        onRowSelect={(row) => {
          setSelectedSale(row);
          setOpen(true)
        }}
      >
        {/* TODO: HERE */}
      </DataTable>
    </>
  );
}