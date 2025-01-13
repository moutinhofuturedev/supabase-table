'use client'

import { Button } from '@/app/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/app/components/ui/dialog'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { QUERY_KEY } from '@/app/constants/query-keys'
import { useToast } from '@/app/hooks/use-toast'
import { api } from '@/app/lib/axios'
import { queryClient } from '@/app/lib/react-query-provider'
import { userSchema as updateUserSchema } from '@/app/types/user-schema'
import type { UserDataResponse } from '@/app/types/users'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type UpdateUserType = z.infer<typeof updateUserSchema>

type UpdateUserProps = Omit<UserDataResponse, 'createdAt'>

export const UpdateUser = ({
	id,
	name,
	age,
	profession,
	imageSrc,
	alt,
}: UpdateUserProps) => {
	const { toast } = useToast()

	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting, isLoading },
	} = useForm<UpdateUserType>({
		resolver: zodResolver(updateUserSchema),
		mode: 'onBlur', // Validação ao sair do input
		values: {
			name,
			age,
			profession,
			imageSrc,
			alt,
		},
	})

	const { mutateAsync: updateUser } = useMutation({
		mutationFn: async ({
			name,
			age,
			profession,
			imageSrc,
			alt,
		}: UpdateUserType) => {
			const response = await api.patch(`/users/${id}`, {
				name,
				age,
				profession,
				imageSrc,
				alt,
			})

			return response.data
		},
		onSuccess: (_, { name, age, profession, imageSrc, alt }) => {
			const cached = queryClient.getQueryData<UserDataResponse[]>(
				QUERY_KEY.users,
			)

			if (cached) {
				const updated = cached.map(user => {
					if (user.id === id) {
						return {
							id,
							name,
							age,
							profession,
							imageSrc,
							alt,
							createdAt: user.createdAt,
						}
					}

					return user
				})

				queryClient.setQueryData<UserDataResponse[]>(QUERY_KEY.users, updated)
			}

			reset()
			toast({
				title: 'Sucesso',
				description: 'Usuário atualizado.',
				style: { background: '#16a34a', color: '#f0fdf4' },
			})
		},
		throwOnError(error) {
			toast({
				title: 'Erro ao editar usuário',
				description: error.message,
				variant: 'destructive',
			})
			return false
		},
	})

	const handleUpdateUser = async ({
		name,
		age,
		profession,
		imageSrc,
		alt,
	}: UpdateUserType) => {
		await updateUser({ name, age, profession, imageSrc, alt })
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Editar</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px] lg:max-w-[600px]'>
				<DialogHeader>
					<DialogTitle>Editar usuário</DialogTitle>
					<DialogDescription>
						Editar as informações do usuário
					</DialogDescription>
				</DialogHeader>
				<form
					onSubmit={handleSubmit(handleUpdateUser)}
					className='grid gap-4 py-4'
				>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='name'>Nome</Label>
						<Input
							id='name'
							placeholder='digite o nome'
							type='text'
							className='col-span-3'
							{...register('name')}
						/>
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='age'>Idade</Label>
						<Input
							id='age'
							placeholder='digite a idade'
							type='number'
							className='col-span-3'
							{...register('age')}
						/>
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='profession'>Profissão</Label>
						<Input
							id='profession'
							placeholder='digite a profissão'
							type='text'
							className='col-span-3'
							{...register('profession')}
						/>
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='imageSrc'>Url da imagem</Label>
						<Input
							id='imageSrc'
							placeholder='insira a url'
							type='url'
							className='col-span-3'
							{...register('imageSrc')}
						/>
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='alt'>Alt</Label>
						<Input
							id='alt'
							placeholder='digite o alt'
							type='text'
							className='col-span-3'
							{...register('alt')}
						/>
					</div>
					<DialogFooter>
						<Button type='submit'>
							{(isSubmitting || isLoading) && (
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							)}
							{isSubmitting || isLoading ? 'Salvando...' : 'Salvar'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
