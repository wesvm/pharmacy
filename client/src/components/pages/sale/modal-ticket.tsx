import { useQuery } from '@tanstack/react-query'
import { toPng } from 'html-to-image'
import jsPDF from 'jspdf'
import { FileText, Image, LoaderCircle } from 'lucide-react'
import { getSaleById } from '@/api/sale/queries'
import { SaleTicket } from '@/components/pages/sale/sale-ticket'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface Props extends React.ComponentPropsWithoutRef<typeof Dialog> {
  saleId: number
}

export const ModalTicket = ({ saleId, ...props }: Props) => {
  const { status, data } = useQuery({
    queryKey: ['saleById', saleId],
    queryFn: () => getSaleById(saleId),
  })

  const handleDownloadImage = () => {
    const ticketElement = document.getElementById('sale-ticket')
    if (ticketElement) {
      toPng(ticketElement)
        .then((dataUrl) => {
          const link = document.createElement('a')
          link.href = dataUrl
          link.download = `ticket-ord-${saleId}.png`
          link.click()
        })
        .catch((err) => {
          console.error('Error generating image:', err)
        })
    }
  }

  const handleDownloadPDF = () => {
    const ticketElement = document.getElementById('sale-ticket')
    if (ticketElement) {
      const pdf = new jsPDF()
      toPng(ticketElement)
        .then((dataUrl) => {
          pdf.addImage(dataUrl, 'PNG', 68, 10, 0, 0)
          pdf.save(`ticket-ord-${saleId}.pdf`)
        })
        .catch((err) => {
          console.error('Error generating PDF:', err)
        })
    }
  }

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader className="hidden">
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>
        <div className="flex justify-center">
          {status === 'pending' && (
            <div className="flex items-center justify-center space-x-2 h-96">
              <p>Cargando ticket de compra...</p>
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
            </div>
          )}
          {status === 'success' && <SaleTicket sale={data.sale} />}
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
