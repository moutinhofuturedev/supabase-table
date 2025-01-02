import { env } from '@/env'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = env.SUPABASE_URL
const supabaseKey = env.SUPABASE_SECRET_KEY

export const supabaseApi = createClient(supabaseUrl, supabaseKey)
