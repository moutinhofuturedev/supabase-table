'use client'
import { UserDataResponse } from '@/app/api/types/users'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table'

interface UsersDataProps {
	initialData: UserDataResponse[]
}

export const UserTable = ({ initialData }: UsersDataProps) => {
	const [users, setUsers] = useState<UserDataResponse[]>(initialData)

	const getUsers = async () => {
		const data = await fetch('/api')
		const response: UserDataResponse[] = await data.json()

		setUsers(response)
	}

	useEffect(() => {
		getUsers()
	}, [])

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[300px]'>Nome</TableHead>
					<TableHead>Idade</TableHead>
					<TableHead>Profissão</TableHead>
					<TableHead>Avatar</TableHead>
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
										width={50}
										height={50}
										sizes='auto'
										className='rounded-full'
										loading='lazy'
									/>
								)}
							</TableCell>
						</TableRow>
					)
				})}
			</TableBody>
		</Table>
	)
}
