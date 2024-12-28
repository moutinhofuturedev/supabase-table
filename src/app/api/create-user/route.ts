import { supabaseApi } from '@/lib/supabase'
import { NextResponse } from 'next/server'
import type { UserDataResponse } from '../types/users'

export const POST = async (request: Request) => {
	try {
		// Extrair os dados do corpo da requisição
		const { name, age, profession, imageSrc, alt } =
			(await request.json()) as Omit<UserDataResponse, 'createdAt'>

		// Validar os dados de entrada
		if (!name || !age || !profession) {
			return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 })
		}

		// Inserir os dados no Supabase
		const { data, error } = await supabaseApi
			.from('users')
			.insert([{ name, age, profession, imageSrc, alt }])
			.select()
			.returns<Omit<UserDataResponse[], 'createdAt'>>()

		if (error) {
			console.error('Erro ao inserir usuário:', error)
			return NextResponse.json(
				{ error: 'Erro ao criar usuário' },
				{ status: 500 },
			)
		}

		// Retornar os dados do usuário criado
		return NextResponse.json(data[0])
	} catch (error) {
		console.error('Erro inesperado:', error)
		return NextResponse.json(
			{ error: 'Erro interno do servidor' },
			{ status: 500 },
		)
	}
}
