import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Project from './Project'

export interface ProjectsData {
	title: {
		rendered: string
	}
	acf: {
		projects_section: {
			projects_description: string
			projects: {
				project_title: string
				project_description: string
				project_tags: {
					project_tag: string
				}[]
				github_repository: string
				live_site: string
				learnings_description: string
				learnings_list: string
				process_chapters: {
					chapter_title: string
					chapter_content: string
				}[]
			}[]
		}
	}
}

interface ProjectsProps {
	restBase: string
}

const Projects = ({ restBase }: ProjectsProps) => {
	const restPath = restBase + 'pages/76'
	const [data, setData] = useState<ProjectsData | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(restPath)
				const jsonData = await response.json()
				setData(jsonData)
				setError(null)
			} catch (error) {
				setError('My projects should be here, but something went wrong.')
			}
		}
		fetchData()
	}, [restPath])

	return (
		<>
			{error ? (
				<p className='error'>{error}</p>
			) : data ? (
				<section
					ref={ref}
					className={`hide border-b border-t border-dashed border-white/20 py-14 ${
						inView ? 'show' : ''
					}`}
				>
					<div className='mb-16'>
						<h2>{data.title.rendered}</h2>

						<p>{data.acf.projects_section.projects_description}</p>
					</div>
					<Project
						restBase={restBase}
						data={data.acf.projects_section.projects}
					/>
				</section>
			) : null}
		</>
	)
}

export default Projects
