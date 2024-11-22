import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { useQuery } from "@tanstack/react-query";
import { getPurchaseById } from '@/api/purchase/queries';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogHeader
} from "@/components/ui/dialog";
import {
  FileText,
  Image,
  LoaderCircle
} from "lucide-react";
import { PurchaseTicket } from "@/components/pages/purchase/purchase-ticket";
import { Button } from "@/components/ui/button";

interface Props extends React.ComponentPropsWithoutRef<typeof Dialog> {
  purchaseId: number;
}

export const ModalTicket = ({ purchaseId, ...props }: Props) => {
  const { status, data } = useQuery({
    queryKey: ['purchaseById', purchaseId],
    queryFn: () => getPurchaseById(purchaseId),
  });

  const handleDownloadImage = () => {
    const ticketElement = document.getElementById('purchase-ticket');
    if (ticketElement) {
      toPng(ticketElement)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `ticket-ord-${purchaseId}.png`;
          link.click();
        })
        .catch((err) => {
          console.error('Error generating image:', err);
        });
    }
  };

  const handleDownloadPDF = () => {
    const ticketElement = document.getElementById('purchase-ticket');
    if (ticketElement) {
      const pdf = new jsPDF();
      toPng(ticketElement)
        .then((dataUrl) => {
          pdf.addImage(dataUrl, 'PNG', 68, 10, 0, 0);
          pdf.save(`ticket-ord-${purchaseId}.pdf`);
        })
        .catch((err) => {
          console.error('Error generating PDF:', err);
        });
    }
  };

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          {status === 'pending' && (
            <div className="flex items-center justify-center space-x-2 h-96">
              <p>Cargando ticket de compra...</p>
              <LoaderCircle
                className="size-4 animate-spin"
                aria-hidden="true"
              />
            </div>
          )}
          {status === 'success' && (<PurchaseTicket purchase={data.purchase} />)}
        </div>
        <DialogFooter>
          <Button
            type="button"
            className="w-full"
            variant="secondary"
            onClick={handleDownloadImage}
            disabled={status === 'pending'}
          >
            <Image className="size-4" />
            Descargar como Imagen
          </Button>
          <Button
            type="button"
            className="w-full"
            onClick={handleDownloadPDF}
            disabled={status === 'pending'}
          >
            <FileText className="size-4" />
            Descargar como PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}