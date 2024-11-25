import Image from 'next/image'
import { TableBody, TableCell, TableRow } from './ui/table'

interface DataPerson {
	name: string
	age: number
	profession: string
	imageSrc?: string
	alt?: string
}

export const TableBodyComponent = ({
	name,
	age,
	profession,
	imageSrc,
	alt,
}: DataPerson) => {
	return (
		<TableBody>
			<TableRow>
				<TableCell>{name}</TableCell>
				<TableCell>{age}</TableCell>
				<TableCell>{profession}</TableCell>
				<TableCell>
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
				</TableCell>
			</TableRow>
		</TableBody>
	)
}
