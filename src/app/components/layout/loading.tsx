import { Skeleton } from '@/app/components/ui/skeleton'

export function TableSkeleton() {
	return (
		<div className='w-full space-y-6'>
			{/* Table Skeleton */}
			<div className='rounded-md border'>
				{/* Table Header */}
				<div className='border-b bg-muted/40 p-4'>
					<div className='flex items-center gap-4'>
						<Skeleton className='h-4 w-[100px]' />
						<Skeleton className='h-4 w-[150px]' />
						<Skeleton className='h-4 w-[200px]' />
						<Skeleton className='h-4 w-[100px]' />
					</div>
				</div>

				{/* Table Body */}
				<div className='divide-y'>
					{Array.from({ length: 7 }).map((_, index) => (
						<div key={index} className='p-4'>
							<div className='flex items-center gap-4'>
								<Skeleton className='h-4 w-[100px]' />
								<Skeleton className='h-4 w-[150px]' />
								<Skeleton className='h-4 w-[200px]' />
								<Skeleton className='h-4 w-[100px]' />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
