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
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const createUserSchema = z.object({
	name: z.string().min(1, { message: 'Nome é obrigatório' }),
	age: z.coerce.number().min(1, 'Idade é obrigatório'),
	profession: z.string().min(1, 'Profissão é obrigatório'),
	imageSrc: z.string().nullable() || z.string().url(),
	alt: z.string().nullable(),
})

type CreateUserType = z.infer<typeof createUserSchema>

export const CreateUser = () => {
	const { toast } = useToast()
	const queryClient = useQueryClient()

	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting, isLoading, errors },
	} = useForm<CreateUserType>({
		resolver: zodResolver(createUserSchema),
	})

	const { mutateAsync: crateUserForm } = useMutation({
		mutationFn: async ({
			name,
			age,
			profession,
			imageSrc,
			alt,
		}: CreateUserType) => {
			await api.post('/create-user', {
				name,
				age,
				profession,
				imageSrc,
				alt,
			})
		},
		onSuccess: async () => {
			reset()
			toast({
				title: 'Sucesso',
				description: 'Usuário cadastrado.',
				style: { background: '#16a34a', color: '#f0fdf4' },
			})

			await queryClient.invalidateQueries({ queryKey: QUERY_KEY.users })
		},
		throwOnError(error) {
			toast({
				title: 'Erro ao cadastrar usuário',
				description: error.message,
				variant: 'destructive',
			})
			return false
		},
	})

	const handleCreateUser = async ({
		name,
		age,
		profession,
		imageSrc,
		alt,
	}: CreateUserType) => {
		await crateUserForm({
			name,
			age,
			profession,
			imageSrc,
			alt,
		})
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Novo usuário</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px] lg:max-w-[600px]'>
				<DialogHeader>
					<DialogTitle>Novo usuário</DialogTitle>
					<DialogDescription>
						Insira os dados do usuário abaixo.
					</DialogDescription>
				</DialogHeader>
				<form
					onSubmit={handleSubmit(handleCreateUser)}
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
						{errors.name && (
							<span className='ml-36 col-span-4 text-red-500 text-sm'>
								{errors.name.message}
							</span>
						)}
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
						{errors.age && (
							<span className='ml-36 col-span-4 text-red-500 text-sm'>
								{errors.age.message}
							</span>
						)}
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
						{errors.profession && (
							<span className='ml-36 col-span-4 text-red-500 text-sm'>
								{errors.profession.message}
							</span>
						)}
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
						<Button type='submit' disabled={isSubmitting || isLoading}>
							{(isSubmitting || isLoading) && (
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							)}
							{isSubmitting || isLoading ? 'Cadastrando...' : 'Cadastrar'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
