'use client'
import { Input } from '@/app/components/ui/input'
import { CreateUser } from '@/app/services/create-user'
import { Search } from 'lucide-react'
import Image from 'next/image'
import IconSupabase from '../../../../public/icon-header.svg'

export function Header() {
	return (
		<header className='border-b bg-white mb-6'>
			<div className='flex h-16 items-center px-6 gap-4 justify-between'>
				<div className='flex items-center gap-4'>
					<h1 className='hidden sm:block font-semibold'>Tablela Supabase</h1>
					<Image
						src={IconSupabase}
						alt='Logo Supabase'
						className='sm:hidden'
						width={30}
						height={30}
						loading='lazy'
						sizes='auto'
					/>
					<div className='hidden sm:flex items-center gap-2 w-96'>
						<Search className='w-4 h-4 text-muted-foreground absolute ml-2.5' />
						<Input
							className='pl-8 w-[300px]'
							placeholder='Buscar usuário...'
							type='search'
						/>
					</div>
				</div>
				<CreateUser />
			</div>
		</header>
	)
}
