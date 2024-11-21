export const DELIVERY_STATUSES = ["Pendiente", "En progreso", "Entregado", "Cancelado"] as const;
export type DeliveryStatus = typeof DELIVERY_STATUSES[number];