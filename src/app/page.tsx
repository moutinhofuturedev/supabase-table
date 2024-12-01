import { UserDataResponse } from '@/app/api/types/users'
import { UserTable } from '@/components/user-table'
import { supabaseApi } from '@/lib/supabase'

const Users = async () => {
	const { data: users, error } = await supabaseApi
		.from('users')
		.select('*')
		.order('id', { ascending: true })
		.returns<UserDataResponse[]>()

	if (error) {
		throw new Error('Falha ao carregar usuários')
	}

	return <UserTable initialData={users} />
}

export default Users
