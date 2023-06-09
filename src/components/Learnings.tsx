import { FaCaretRight } from 'react-icons/fa'

interface LearningsProps {
	learningsDescription: string
	learnings: {
		learning: string
	}[]
}

const Learnings = ({ learningsDescription, learnings }: LearningsProps) => {
	return (
		<article className='animate-fade-in pb-12 opacity-0'>
			<p className='mb-12 mt-6'>{learningsDescription}</p>
			<ul>
				{learnings.map((item, index) => (
					<div className='grid grid-cols-[20px_auto] text-sm' key={index}>
						<FaCaretRight className='mt-1 text-blue-200' />
						<li
							className={`mb-6 leading-6 ${
								index === learnings.length - 1 ? 'mb-0' : ''
							}`}
						>
							{item.learning}
						</li>
					</div>
				))}
			</ul>
		</article>
	)
}

export default Learnings
