import { supabaseApi } from '@/lib/supabase'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { UserDataResponse } from '../types//users'

export const GET = async (
	req: NextApiRequest,
	res: NextApiResponse<UserDataResponse[] | { error: string }>,
) => {
	if (req.method === 'GET') {
		const { data: users, error } = await supabaseApi
			.from('users')
			.select('*')
			.returns<UserDataResponse[]>()

		if (error) {
			return res.status(500).json({ error: error.message })
		}

		return Response.json(users)
	}

	return res.status(405).json({ error: 'Método não permitido' })
}
