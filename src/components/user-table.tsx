'use client'
import { UserDataResponse } from '@/app/api/types/users'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
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
			<TableHeader className='bg-muted'>
				<TableRow>
					<TableHead className='w-[280px]'>Nome</TableHead>
					<TableHead>Idade</TableHead>
					<TableHead>Profissão</TableHead>
					<TableHead>Avatar</TableHead>
					<TableHead className='w-[150px]'>Data de cadastro</TableHead>
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
										width={40}
										height={40}
										sizes='auto'
										className='rounded-full'
										loading='lazy'
									/>
								)}
							</TableCell>
							<TableCell>
								{dayjs(user.createdAt).format('DD MMM YYYY')}
							</TableCell>
						</TableRow>
					)
				})}
			</TableBody>
		</Table>
	)
}
