'use client'
import Image from 'next/image'

interface DataPerson {
	name: string
	age: number
	profession: string
	imageSrc?: string
	alt?: string
}

export const TableBody = ({
	age,
	name,
	profession,
	imageSrc,
	alt,
}: DataPerson) => {
	return (
		<tbody>
			<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
				<th
					scope='row'
					className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
				>
					{name}
				</th>
				<td className='px-6 py-4'>{age}</td>
				<td className='px-6 py-4'>{profession}</td>
				<td className='w-20 h-20'>
					{imageSrc && alt && (
						<Image
							src={imageSrc}
							alt={alt}
							width={50}
							height={50}
							sizes='auto'
							className='rounded-full'
							loading='lazy'
						/>
					)}
				</td>
			</tr>
		</tbody>
	)
}
