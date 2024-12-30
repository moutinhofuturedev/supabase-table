import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { QUERY_KEY } from '@/constants/query-keys'

const createUserSchema = z.object({
	name: z.string(),
	age: z.coerce.number(),
	profession: z.string(),
	imageSrc: z.string().url().nullable(),
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
		formState: { isSubmitting, isLoading },
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
							required
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
							required
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
							required
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
