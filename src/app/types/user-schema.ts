import { z } from 'zod'

export const userSchema = z.object({
	name: z.string().min(1, { message: 'Nome é obrigatório' }),
	age: z.coerce.number().min(1, 'Idade é obrigatório'),
	profession: z.string().min(1, { message: 'Profissão é obrigatório' }),
	imageSrc: z.string().nullable() || z.string().url(),
	alt: z.string().nullable(),
})
