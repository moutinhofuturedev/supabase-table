'use client'
import { UserDataResponse } from '@/app/api/types/users'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import Image from 'next/image'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table'

dayjs.locale(ptBR)

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
		staleTime: 1000 * 60 * 5,
	})

	return (
		<>
			{users.length > 0 ? (
				<Table>
					<TableHeader>
						<TableRow className='bg-zinc-500 hover:bg-zinc-500'>
							<TableHead className='w-[280px] text-zinc-50'>Nome</TableHead>
							<TableHead className='text-zinc-50'>Idade</TableHead>
							<TableHead className='text-zinc-50'>Profissão</TableHead>
							<TableHead className='text-zinc-50'>Avatar</TableHead>
							<TableHead className='w-[150px] text-zinc-50'>
								Data de cadastro
							</TableHead>
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
										{user.createdAt &&
											dayjs(user.createdAt).format('DD MMM YYYY')}
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			) : (
				<p className='text-muted-foreground text-lg'>
					Nenhum usuário cadastrado
				</p>
			)}
		</>
	)
}
