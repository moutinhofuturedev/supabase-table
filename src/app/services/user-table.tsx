'use client'
import { DeleteDialog } from '@/app/components/layout/delete-dialog'
import { TableSkeleton } from '@/app/components/layout/loading'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/app/components/ui/table'
import { QUERY_KEY } from '@/app/constants/query-keys'
import { TABLE_KEY } from '@/app/constants/table-keys'
import { useToast } from '@/app/hooks/use-toast'
import { api } from '@/app/lib/axios'
import { UserDataResponse } from '@/app/types/users'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import Image from 'next/image'
import { UpdateUser } from './update-user'

dayjs.locale(ptBR)

// interface InitialDataProps {
// 	initialData: UserDataResponse[]
// }

export const UserTable = () => {
	const { toast } = useToast()
	const queryClient = useQueryClient()

	const { data: users, isLoading } = useQuery<UserDataResponse[]>({
		queryKey: QUERY_KEY.users,
		queryFn: async () => {
			const response = await api.get('/users')

			return response.data
		},
		staleTime: 1000 * 60 * 5,

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
		},
		throwOnError(error) {
			toast({
				title: 'Erro ao deletar usuário',
				description: error.message,
				variant: 'destructive',
			})
			return false
		},
	})

	const renderTable = () => {
		if (isLoading) return <TableSkeleton />
		if (!users || users.length === 0)
			return (
				<p className='text-center text-zinc-500'>Nenhum usuário encontrado.</p>
			)

		return (
			<Table>
				<TableHeader>
					<TableRow className='bg-zinc-500 hover:bg-zinc-500'>
						{TABLE_KEY.map((header, index) => (
							<TableHead
								key={index}
								className={`text-zinc-50 ${index === 4 ? 'w-[150px]' : ''} ${
									index > 4 ? 'w-[100px]' : ''
								}`}
							>
								{header}
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map(user => (
						<TableRow key={user.id}>
							<TableCell>{user.name}</TableCell>
							<TableCell>{user.age}</TableCell>
							<TableCell>{user.profession}</TableCell>
							<TableCell>
								{user.imageSrc && (
									<Image
										src={user.imageSrc}
										alt={user.alt || 'Avatar'}
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
								<UpdateUser {...user} />
							</TableCell>
							<TableCell>
								<DeleteDialog
									name={user.name}
									onConfirm={() => removeUser(user.id)}
									isPending={isPending}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		)
	}

	return <>{renderTable()}</>
}
