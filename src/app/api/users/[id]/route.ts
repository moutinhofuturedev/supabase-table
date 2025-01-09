import { supabaseApi } from '@/app/lib/supabase'
import { userSchema } from '@/app/types/user-schema'
import { NextResponse } from 'next/server'
import z from 'zod'

export async function DELETE(
	_: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		// Extrair o ID do usuário dos parâmetros da rota
		const { id } = await params
		const validatedId = z.string().parse(id)

		// Remover o usuário do Supabase
		const { error } = await supabaseApi
			.from('users')
			.delete()
			.eq('id', validatedId)

		if (error) {
			console.error('Erro ao remover usuário:', error)
			return NextResponse.json(
				{ error: 'Erro ao remover usuário' },
				{ status: 500 },
			)
		}

		// Retornar uma resposta de sucesso
		return NextResponse.json(
			{ message: `Usuário ${id} removido com sucesso` },
			{ status: 200 },
		)
	} catch (error) {
		console.error('Erro inesperado:', error)
		return NextResponse.json(
			{ error: 'Erro interno do servidor' },
			{ status: 500 },
		)
	}
}

export async function PATCH(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		// Extrair e validar o ID do usuário dos parâmetros da rota
		const { id } = await params
		const validatedId = z.string().parse(id)

		// Extrair e validar os dados do corpo da requisição
		const body = await request.json()
		const validatedData = userSchema.parse(body)

		// Atualizar o usuário no Supabase
		const { data, error } = await supabaseApi
			.from('users')
			.update(validatedData)
			.eq('id', validatedId)
			.select()
			.single()

		if (error) {
			console.error('Erro ao atualizar usuário:', error)
			return NextResponse.json(
				{ error: 'Erro ao atualizar usuário' },
				{ status: 500 },
			)
		}

		if (!data) {
			return NextResponse.json(
				{ error: 'Usuário não encontrado' },
				{ status: 404 },
			)
		}

		// Retornar o usuário atualizado
		return NextResponse.json(
			{ message: 'Usuário atualizado com sucesso', user: data },
			{ status: 200 },
		)
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{ error: 'Dados de entrada inválidos', details: error.errors },
				{ status: 400 },
			)
		}

		console.error('Erro inesperado:', error)
		return NextResponse.json(
			{ error: 'Erro interno do servidor' },
			{ status: 500 },
		)
	}
}
