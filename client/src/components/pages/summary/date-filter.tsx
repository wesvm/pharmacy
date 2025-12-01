import { Calendar1Icon } from 'lucide-react'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useDateFilters } from '@/hooks/use-date-filters'
import { cn, formatDateRange } from '@/lib/utils'

export const DateFilter = () => {
  const { from, to, defaultFrom, defaultTo, setFilters, clearFilters } = useDateFilters()
  const [localDate, setLocalDate] = useState<DateRange | undefined>({
    from,
    to,
  })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'justify-start text-left font-normal',
            !localDate && 'text-muted-foreground'
          )}
        >
          <Calendar1Icon className="size-4 mr-2" />
          <span>{formatDateRange({ from, to })}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={localDate?.from}
          selected={localDate}
          onSelect={setLocalDate}
          numberOfMonths={2}
        />
        <div className="p-4 w-full flex items-center gap-x-2">
          <PopoverClose asChild>
            <Button
              className="w-full"
              variant="outline"
              disabled={!localDate?.from || !localDate?.to}
              onClick={() => {
                clearFilters()
                setLocalDate({ from: defaultFrom, to: defaultTo })
              }}
            >
              Resetear
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button
              className="w-full"
              disabled={!localDate?.from || !localDate.to}
              onClick={() =>
                setFilters({
                  from: localDate?.from,
                  to: localDate?.to,
                })
              }
            >
              Aplicar
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  )
}
