import { supabaseApi } from '@/lib/supabase'

interface DataPerson {
	id: number
	name: string
	age: number
	profession: string
}

export const Home = async () => {
	const { data } = await supabaseApi
		.from('data system')
		.select('*')
		.order('id', { ascending: false })

	if (!data) {
		return null
	}

	return (
		<div className='min-h-screen flex items-center justify-center flex-col'>
			<div className='relative overflow-x-auto'>
				<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<tr>
							<th scope='col' className='px-6 py-3'>
								Name
							</th>
							<th scope='col' className='px-6 py-3'>
								Age
							</th>
							<th scope='col' className='px-6 py-3'>
								Profession
							</th>
						</tr>
					</thead>
					<tbody>
						{data.map((person: DataPerson) => {
							return (
								<tr
									key={person.id}
									className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
								>
									<th
										scope='row'
										className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
									>
										{person.name}
									</th>
									<td className='px-6 py-4'>{person.age}</td>
									<td className='px-6 py-4'>{person.profession}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default Home
