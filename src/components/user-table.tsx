'use client'
import { UserDataResponse } from '@/app/api/types/users'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table'

interface UsersDataProps {
	initialData: UserDataResponse[]
}

export const UserTable = ({ initialData }: UsersDataProps) => {
	const { data: users } = useQuery<UserDataResponse[]>({
		queryKey: ['users'],
		queryFn: async () => {
			const response = await api.get('/users')

			return response.data
		},
		initialData,
		staleTime: 1000 * 60 * 10,
	})

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[300px]'>Nome</TableHead>
					<TableHead>Idade</TableHead>
					<TableHead>Profissão</TableHead>
					<TableHead>Avatar</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{users?.map(user => {
					return (
						<TableRow key={user.id}>
							<TableCell>{user.name}</TableCell>
							<TableCell>{user.age}</TableCell>
							<TableCell>{user.profession}</TableCell>
							<TableCell>
								{user.imageSrc && user.alt && (
									<Image
										src={user.imageSrc}
										alt={user.alt}
										width={50}
										height={50}
										sizes='auto'
										className='rounded-full'
										loading='lazy'
									/>
								)}
							</TableCell>
						</TableRow>
					)
				})}
			</TableBody>
		</Table>
	)
}
