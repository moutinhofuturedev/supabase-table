import { Header } from '@/app/components/layout/header'
import { supabaseApi } from '@/app/lib/supabase'
import { UserTable } from '@/app/services/user-table'
import { UserDataResponse } from '@/app/types/users'
import { cache } from 'react'

// função cacheada para buscar usuários
const getUsers = cache(async () => {
	const { data: users, error } = await supabaseApi
		.from('users')
		.select('*')
		.order('createdAt', { ascending: false })
		.returns<UserDataResponse[]>()

	if (error) {
		throw new Error('Falha ao carregar usuários')
	}

	return users
})

const Users = async () => {
	const users = await getUsers()

	return (
		<>
			<Header />
			<UserTable initialData={users} />
		</>
	)
}

export default Users
