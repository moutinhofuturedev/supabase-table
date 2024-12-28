import { supabaseApi } from '@/lib/supabase'
import { NextResponse } from 'next/server'

interface UserDataParams {
  params: { id: string }
}

export async function DELETE(
  request: Request,
  { params }: UserDataParams
) {
  try {
    // Extrair o ID do usuário dos parâmetros da rota
    const { id } = params

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

