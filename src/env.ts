import zod from 'zod'

const envSchema = zod.object({
	NEXT_PUBLIC_SUPABASE_URL: zod.string().url(),
	SUPABASE_SERVICE_ROLE_KEY: zod.string(),
})

export const env = envSchema.parse(process.env)
