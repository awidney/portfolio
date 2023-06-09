import { useEffect, useState } from 'react'
import { AiFillFolder, AiFillFolderOpen } from 'react-icons/ai'
import { IoCaretUpSharp } from 'react-icons/io5'
import { FaGithub } from 'react-icons/fa'
import { BiLinkExternal } from 'react-icons/bi'
import Process from './Process'
import Learnings from './Learnings'

interface ProjectsData {
	id: number
	title: {
		rendered: string
	}
	acf: {
		learnings_description: string
		learnings: {
			learning: string
		}[]
		summary: string
		chapters: {
			title: string
			content: {
				paragraph: string
			}[]
		}[]
		github_repository: string
		live_site: string
	}
}

interface ProjectsProps {
	restBase: string
}

const Projects = ({ restBase }: ProjectsProps) => {
	const restPath = restBase + 'projects?order=asc'
	const [data, setData] = useState<ProjectsData[] | null>(null)
	const [expandedProjectId, setExpandedProjectId] = useState<number | null>(
		null
	)
	const [activeComponent, setActiveComponent] = useState<
		'learnings' | 'process' | null
	>(null)

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

	const toggleProject = (
		projectId: number,
		state?: string,
		component?: string
	) => {
		if (state === 'expanded') {
			setExpandedProjectId(null)
		} else if (component === 'learnings' || component === 'process') {
			setExpandedProjectId(projectId)
			setActiveComponent(component)
		}
	}

	return (
		<>
			{data &&
				data.map((project) => (
					<article
						className='my-12 border-b border-white/25 last-of-type:border-none'
						key={project.id}
					>
						<h3
							className={`flex items-center ${
								expandedProjectId === project.id ? 'cursor-pointer' : ''
							}`}
							onClick={() => toggleProject(project.id, 'expanded')}
						>
							{project.title.rendered}
							{expandedProjectId === project.id ? (
								<AiFillFolderOpen className='folder text-blue-200 hover:text-white' />
							) : (
								<AiFillFolder className='folder' />
							)}
						</h3>
						{expandedProjectId !== project.id && (
							<div className='mb-12 animate-fade-in opacity-0'>
								<p
									className='my-6'
									dangerouslySetInnerHTML={{ __html: project.acf.summary }}
								></p>
								<div className='flex'>
									<button
										className='mr-5 cursor-pointer text-blue-200 hover:text-white'
										onClick={() =>
											toggleProject(project.id, undefined, 'learnings')
										}
									>
										Learnings
									</button>
									<button
										className='cursor-pointer text-blue-200 hover:text-white'
										onClick={() =>
											toggleProject(project.id, undefined, 'process')
										}
									>
										Process
									</button>
									<a
										className='ml-auto text-2xl text-blue-200 hover:text-white'
										href={project.acf.github_repository}
										target='_blank'
									>
										<FaGithub />
									</a>
									<a
										className='ml-5 mr-2 text-2xl text-blue-200 hover:text-white'
										href={project.acf.live_site}
										target='_blank'
									>
										<BiLinkExternal />
									</a>
								</div>
							</div>
						)}
						{expandedProjectId === project.id && (
							<>
								{activeComponent === 'learnings' &&
									project.acf.learnings_description &&
									project.acf.learnings && (
										<Learnings
											learningsDescription={project.acf.learnings_description}
											learnings={project.acf.learnings}
										/>
									)}
								{activeComponent === 'process' && project.acf.chapters && (
									<Process chapters={project.acf.chapters} />
								)}
								<IoCaretUpSharp
									className='mx-auto w-full cursor-pointer bg-white/10 text-blue-200 hover:bg-white/20 hover:text-white'
									onClick={() => toggleProject(project.id, 'expanded')}
								/>
							</>
						)}
					</article>
				))}
		</>
	)
}

export default Projects
