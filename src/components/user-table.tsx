'use client'
import { UserDataResponse } from '@/app/api/types/users'
import { QUERY_KEY } from '@/constants/query-keys'
import { useToast } from '@/hooks/use-toast'
import { api } from '@/lib/axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import Image from 'next/image'
import { DeleteDialog } from './delete-dialog'
import { Button } from './ui/button'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table'

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
		staleTime: Number.POSITIVE_INFINITY, // Evita o cache ser limpo automaticamente pelo react-query

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
		mutationFn: async (id: number) => {
			const response = await api.delete(`/users/${id}`)

			return response.data
		},
		onSuccess: async () => {
			reset()

			toast({
				title: 'Sucesso',
				description: 'Usuário deletado.',
			})

			await queryClient.invalidateQueries({ queryKey: QUERY_KEY.users })
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
										{user.createdAt &&
											dayjs(user.createdAt).format('DD MMM YYYY')}
									</TableCell>
									<TableCell>
										<Button variant='secondary' size='sm'>
											Editar
										</Button>
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
