import { Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog'

interface DeleteDialogProps {
	name: string
	onConfirm: () => void
	isPending?: boolean
}

export const DeleteDialog = ({
	name,
	onConfirm,
	isPending,
}: DeleteDialogProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='destructive' size='sm'>
					Deletar
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle className='text-lg'>
					Deseja realmente deletar o usuário <strong>{name}</strong>?
				</DialogTitle>
				<div className='flex justify-end space-x-4'>
					<Button
						variant='destructive'
						size='sm'
						onClick={onConfirm}
						disabled={isPending}
					>
						{isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
						{isPending ? 'Deletando...' : 'Sim'}
					</Button>
					<DialogClose asChild>
						<Button variant='outline' size='sm'>
							Não
						</Button>
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	)
}
