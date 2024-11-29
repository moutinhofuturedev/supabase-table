import { env } from '@/env'
import { createClient } from '@supabase/supabase-js'

export const supabaseApi = createClient(
	env.SUPABASE_URL || '',
	env.SUPABASE_SECRET_KEY || '',
)
