import {
  type ColumnDef,
} from '@tanstack/react-table';
import { DataTable } from '@/components/data-table/data-table';
import { createRowActionStore } from '@/store/row-action-store';
import { ModalTicket } from '../../modal-ticket';
import { UpdateDeliveryModal } from '../update-modal';
import { DELIVERY_STATUSES } from '@/lib/const';

interface Props {
  columns: ColumnDef<Delivery>[];
  data: Delivery[];
}

export const useDeliveyRowActionStore = createRowActionStore<Delivery>();

export function DeliveriesTable({
  columns,
  data,
}: Props) {
  const { row, type, clearRowAction } = useDeliveyRowActionStore();
  const filterFields: DataTableFilterField<Delivery>[] = [
    {
      id: "status",
      label: "Estado",
      options: DELIVERY_STATUSES.map((status) => (
        {
          label: status,
          value: status
        }
      ))
    }
  ]

  return (
    <>
      {row?.sale && (
        <ModalTicket
          saleId={row.sale.id}
          open={type === 'show'}
          onOpenChange={clearRowAction}
        />
      )}
      <DataTable columns={columns} data={data} filterFields={filterFields} />
      <UpdateDeliveryModal
        delivery={row}
        open={type === 'update'}
        onOpenChange={clearRowAction}
      />
    </>
  );
}