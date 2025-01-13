import { Header } from '@/app/components/layout/header'
// import { supabaseApi } from '@/app/lib/supabase'
import { UserTable } from '@/app/services/user-table'
// import { UserDataResponse } from '@/app/types/users'

const Users = () => {
	// const { data: users, error } = await supabaseApi
	// 	.from('users')
	// 	.select('*')
	// 	.order('createdAt', { ascending: false })
	// 	.returns<UserDataResponse[]>()

	// if (error) {
	// 	throw new Error('Falha ao carregar usuários')
	// }

	return (
		<>
			<Header />
			<UserTable />
		</>
	)
}

export default Users
