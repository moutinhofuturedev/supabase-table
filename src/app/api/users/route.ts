import { supabaseApi } from '@/lib/supabase'
import { NextResponse } from 'next/server'
import type { UserDataResponse } from '../types/users'

export const GET = async () => {
	try {
		// Buscar os usuários do Supabase
		const { data: users, error } = await supabaseApi
			.from('users')
			.select('*')
			.returns<UserDataResponse[]>()

		if (error) {
			console.error('Erro ao buscar usuários:', error)
			return NextResponse.json(
				{ error: 'Erro ao buscar usuários' },
				{ status: 500 },
			)
		}

		// Retornar os usuários
		return NextResponse.json(users)
	} catch (error) {
		console.error('Erro inesperado:', error)
		return NextResponse.json(
			{ error: 'Erro interno do servidor' },
			{ status: 500 },
		)
	}
}
