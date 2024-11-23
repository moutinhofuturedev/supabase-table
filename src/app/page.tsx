import { TableBody } from '@/app/components/table'
import { supabaseApi } from '@/lib/supabase'

interface DataPerson {
	id: number
	name: string
	age: number
	profession: string
	imageSrc?: string
	alt?: string
}

export const Home = async () => {
	const { data: persons, error } = await supabaseApi
		.from('persons')
		.select('*')
		.order('id', { ascending: true })

	if (error) throw error

	return (
		<div className='min-h-screen flex items-center justify-center flex-col px-6'>
			<table className='max-w-2xl w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
				<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
					<tr>
						<th scope='col' className='px-6 py-3'>
							Nome
						</th>
						<th scope='col' className='px-6 py-3'>
							Idade
						</th>
						<th scope='col' className='px-6 py-3'>
							Profissão
						</th>
						<th>Avatar</th>
					</tr>
				</thead>
				{persons.map((person: DataPerson) => {
					return (
						<TableBody
							key={person.id}
							name={person.name}
							age={person.age}
							profession={person.profession}
							imageSrc={person.imageSrc}
							alt={person.alt}
						/>
					)
				})}
			</table>
		</div>
	)
}

export default Home
