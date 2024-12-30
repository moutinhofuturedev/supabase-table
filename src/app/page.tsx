import { UserDataResponse } from '@/app/api/types/users'
import { Header } from '@/components/header'
import { UserTable } from '@/components/user-table'
import { supabaseApi } from '@/lib/supabase'

const Users = async () => {
	const { data: users, error } = await supabaseApi
		.from('users')
		.select('*')
		.order('createdAt', { ascending: false })
		.returns<UserDataResponse[]>()

	if (error) {
		throw new Error('Falha ao carregar usuários')
	}

	return (
		<>
			<Header />
			<UserTable initialData={users} />
		</>
	)
}

export default Users
