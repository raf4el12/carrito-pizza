import z from 'zod'

// Schema para el formulario de entrega
export const deliveryFormSchema = z.object({
  address: z
    .string()
    .min(10, 'La dirección debe tener al menos 10 caracteres')
    .max(255, 'La dirección no puede exceder 255 caracteres'),
  notes: z
    .string()
    .max(500, 'Las notas no pueden exceder 500 caracteres'),
})

export type DeliveryFormDto = z.infer<typeof deliveryFormSchema>

// Alias para compatibilidad
export type DeliveryData = DeliveryFormDto
