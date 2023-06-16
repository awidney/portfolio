interface ProcessProps {
	chapters: {
		title: string
		content: {
			paragraph: string
		}[]
	}[]
}

const Process = ({ chapters }: ProcessProps) => {
	return (
		<>
			{chapters.map((chapter, index) => (
				<section className='mb-12' key={index}>
					<h4 className='mt-1'>{chapter.title}</h4>
					{chapter.content.map((paragraph, index) => (
						<p
							className='mb-6'
							key={index}
							dangerouslySetInnerHTML={{
								__html: paragraph.paragraph,
							}}
						></p>
					))}
				</section>
			))}
		</>
	)
}

export default Process
