import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	server: {
		SUPABASE_URL: z.string().url(),
		SUPABASE_SECRET_KEY: z.string().min(1),
	},

	client: {
		NEXT_PUBLIC_API_URL: z.string().url(),
	},

	runtimeEnv: {
		SUPABASE_URL: process.env.SUPABASE_URL,
		SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY,
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
	},
})
