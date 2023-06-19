interface LearningsProps {
	learnings_list: string
}

const Learnings = ({ learnings_list }: LearningsProps) => {
	return (
		<article className='animate-fade-in pb-8 opacity-0'>
			<div
				dangerouslySetInnerHTML={{ __html: learnings_list }}
				className='learnings'
			></div>
		</article>
	)
}

export default Learnings
