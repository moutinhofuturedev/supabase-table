import { supabaseApi } from '@/lib/supabase'
import { NextResponse } from 'next/server'
import z from 'zod'

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Extrair o ID do usuário dos parâmetros da rota
    const id = z.string().parse(params.id)

    // Remover o usuário do Supabase
    const { error } = await supabaseApi
      .from('users')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Erro ao remover usuário:', error)
      return NextResponse.json(
        { error: 'Erro ao remover usuário' },
        { status: 500 }
      )
    }

    // Retornar uma resposta de sucesso
    return NextResponse.json(
      { message: `Usuário ${id} removido com sucesso` },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erro inesperado:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

