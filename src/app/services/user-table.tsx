'use client'
import { DeleteDialog } from '@/app/components/layout/delete-dialog'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/app/components/ui/table'
import { QUERY_KEY } from '@/app/constants/query-keys'
import { useToast } from '@/app/hooks/use-toast'
import { api } from '@/app/lib/axios'
import { UserDataResponse } from '@/app/types/users'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { revalidatePath } from 'next/cache'
import Image from 'next/image'
import { UpdateUser } from './update-user'

dayjs.locale(ptBR)

interface InitialDataProps {
	initialData: UserDataResponse[]
}

export const UserTable = ({ initialData }: InitialDataProps) => {
	const { toast } = useToast()
	const queryClient = useQueryClient()

	const { data: users } = useQuery<UserDataResponse[]>({
		queryKey: QUERY_KEY.users,
		queryFn: async () => {
			const response = await api.get('/users')

			return response.data
		},
		initialData,
		staleTime: 1000 * 60 * 5, // 5 minutos

		// Adiciona retry para tentativas em caso de erro
		retry: 2,
		throwOnError(error) {
			toast({
				title: 'Erro ao buscar usuários',
				description: error.message,
				variant: 'destructive',
			})
			return false
		},
	})

	const {
		mutateAsync: removeUser,
		reset,
		isPending,
	} = useMutation({
		mutationFn: async (id: string) => {
			const response = await api.delete(`/users/${id}`)

			return response.data
		},
		onSuccess: async () => {
			reset()

			toast({
				title: 'Sucesso',
				description: 'Usuário deletado.',
				style: { background: '#16a34a', color: '#f0fdf4' },
			})

			await queryClient.invalidateQueries({ queryKey: QUERY_KEY.users })

			revalidatePath('/')
		},
		onError: async error => {
			toast({
				title: 'Erro ao deletar usuário',
				description: error.message,
				variant: 'destructive',
			})

			await queryClient.setQueryData(QUERY_KEY.users, initialData)
		},
	})

	return (
		<>
			{users?.length > 0 ? (
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
							<TableHead className='w-[100px]' />
							<TableHead className='w-[100px]' />
						</TableRow>
					</TableHeader>
					<TableBody>
						{users.map(user => {
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
									<TableCell>
										<UpdateUser
											id={user.id}
											name={user.name}
											age={user.age}
											profession={user.profession}
											imageSrc={user.imageSrc}
											alt={user.alt}
										/>
									</TableCell>
									<TableCell>
										<DeleteDialog
											name={user.name}
											onConfirm={() => removeUser(user.id)}
											isPending={isPending}
										/>
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
