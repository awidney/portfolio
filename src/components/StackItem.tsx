import { useInView } from 'react-intersection-observer'

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
	const [ref, inView] = useInView({ threshold: 1 })

	return (
		<article
			ref={ref}
			className={`${inView ? 'show' : ''} hide mb-6 flex items-start gap-4`}
		>
			<span className='shrink-0 rounded-lg bg-gray-800 p-4 text-xl'>
				{IconComponent && <IconComponent />}
			</span>

			<div>
				<h3 className='mb-0 normal-case'>{technology}</h3>
				<p className='mt-1'>{description}</p>
			</div>
		</article>
	)
}

export default StackItem
