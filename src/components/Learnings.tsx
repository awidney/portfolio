interface LearningsProps {
	learningsDescription: string
	learnings: {
		learning: string
	}[]
}

const Learnings = ({ learningsDescription, learnings }: LearningsProps) => {
	return (
		<article className='pb-12'>
			<p className='mb-12'>{learningsDescription}</p>

			<ul>
				{learnings.map((item, index) => (
					<li
						key={index}
						className='mb-6 list-disc text-sm leading-6 text-gray-300 last-of-type:mb-0'
					>
						{item.learning}
					</li>
				))}
			</ul>
		</article>
	)
}

export default Learnings
