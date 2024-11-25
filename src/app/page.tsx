import { TableBodyComponent } from '@/components/table-body-component'
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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
		.returns<DataPerson[]>()

	if (error) throw error

	console.log(persons)

	return (
		<div className='h-screen w-full flex justify-center px-6 py-8'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='w-[300px]'>Nome</TableHead>
						<TableHead>Idade</TableHead>
						<TableHead>Profissão</TableHead>
						<TableHead>Avatar</TableHead>
					</TableRow>
				</TableHeader>
				{persons.map((person: DataPerson) => {
					return (
						<TableBodyComponent
							key={person.id}
							name={person.name}
							age={person.age}
							profession={person.profession}
							imageSrc={person.imageSrc}
							alt={person.alt}
						/>
					)
				})}
			</Table>
		</div>
	)
}

export default Home
