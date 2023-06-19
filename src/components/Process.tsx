interface ProcessProps {
	process_chapters: {
		chapter_title: string
		chapter_content: string
	}[]
}

const Process = ({ process_chapters }: ProcessProps) => {
	return (
		<>
			{process_chapters.map(
				(
					chapter: { chapter_title: string; chapter_content: string },
					index: number
				) => (
					<section className='mb-8 animate-fade-in opacity-0' key={index}>
						<h4 className='mt-1'>{chapter.chapter_title}</h4>
						<p
							className='process mb-6'
							dangerouslySetInnerHTML={{ __html: chapter.chapter_content }}
						></p>
					</section>
				)
			)}
		</>
	)
}

export default Process
