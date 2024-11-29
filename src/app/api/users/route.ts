import { supabaseApi } from '@/lib/supabase'
import type { UserDataResponse } from '../types//users'

export const GET = async () => {
	const { data: users, error } = await supabaseApi
		.from('users')
		.select('*')
		.returns<UserDataResponse[]>()

	if (error) {
		return Response.json({ error: error.message }, { status: 500 })
	}

	return Response.json(users)
}
