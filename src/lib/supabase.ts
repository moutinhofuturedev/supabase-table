import { env } from '@/env'
import { createClient } from '@supabase/supabase-js'

export const supabaseApi = createClient(
	env.NEXT_PUBLIC_SUPABASE_URL || '',
	env.SUPABASE_SERVICE_ROLE_KEY || '',
)
