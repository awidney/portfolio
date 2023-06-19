interface StackItemProps {
	technology: string
	description: string
	IconComponent: React.ElementType
}

const StackItem = ({
	technology,
	description,
	IconComponent,
}: StackItemProps) => {
	return (
		<li className='mb-8 flex items-start gap-4 last:mb-0'>
			<span className='shrink-0 rounded-lg bg-zinc-900 p-3 text-xl'>
				{IconComponent && <IconComponent />}
			</span>

			<div>
				<h3 className='mb-0'>{technology}</h3>
				<p className='mt-1'>{description}</p>
			</div>
		</li>
	)
}

export default StackItem
