'use client'

import { Button } from '@/app/components/ui/button'
import { useEffect } from 'react'

const Error = ({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) => {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<h2 className='text-2xl font-bold mb-4'>Algo deu errado!</h2>
			<Button onClick={() => reset()}>Tentar novamente</Button>
		</div>
	)
}

export default Error
