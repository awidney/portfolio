import { useEffect, useState } from 'react'
import Projects from './Projects'
import { useInView } from 'react-intersection-observer'

interface ProjectsIntroData {
	title: {
		rendered: string
	}
	content: {
		rendered: string
	}
}

interface ProjectsProps {
	restBase: string
}

const ProjectsIntro = ({ restBase }: ProjectsProps) => {
	const restPath = restBase + 'pages/76'
	const [data, setData] = useState<ProjectsIntroData | null>(null)
	const [ref, inView] = useInView({ threshold: 1 })

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(restPath)
				const jsonData = await response.json()
				setData(jsonData)
			} catch (error) {
				console.log(error)
			}
		}
		fetchData()
	}, [restPath])

	return (
		<>
			{data && (
				<section className='py-16 text-white'>
					<div ref={ref} className={`${inView ? 'show' : ''} hide`}>
						<h2 className=''>{data.title.rendered}</h2>
						<p
							className='mb-20'
							dangerouslySetInnerHTML={{ __html: data.content.rendered }}
						></p>
					</div>
					<Projects restBase={restBase} />
				</section>
			)}
		</>
	)
}

export default ProjectsIntro
