'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import IconSupabase from '../../public/icon-header.svg'

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
				<nav className='flex items-center gap-4'>
					<Link
						href='#'
						className='text-sm font-medium text-muted-foreground hover:text-primary transition-colors'
					>
						Usuários
					</Link>
					<Link
						href='#'
						className='text-sm font-medium text-muted-foreground hover:text-primary transition-colors'
					>
						Relatórios
					</Link>
				</nav>
			</div>
		</header>
	)
}
