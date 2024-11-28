import { UserDataResponse } from '@/app/api/types/users'
import { UserTable } from '@/components/user-table'
import { supabaseApi } from '@/lib/supabase'

export const Users = async () => {
	const { data: users, error } = await supabaseApi
		.from('users')
		.select('*')
		.order('id', { ascending: true })
		.returns<UserDataResponse[]>()

	if (error) {
		console.error(error)

		return null
	}

	return (
		<div className='h-screen flex justify-center px-6 py-8'>
			<UserTable initialData={users} />
		</div>
	)
}

export default Users
