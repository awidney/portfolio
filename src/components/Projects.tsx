import { useEffect, useState } from 'react'
import { IoCaretUpSharp } from 'react-icons/io5'
import { BiLinkExternal } from 'react-icons/bi'
import {
	AiOutlineShopping,
	AiOutlineApi,
	AiFillEyeInvisible,
} from 'react-icons/ai'
import { BsRocketTakeoff } from 'react-icons/bs'
import Process from './Process'
import Learnings from './Learnings'
import { useInView } from 'react-intersection-observer'

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

interface ProjectsIcons {
	[key: string]: React.ElementType
}

const projectsIcons: ProjectsIcons = {
	'E-commerce Site': AiOutlineShopping,
	'Movie Database': AiOutlineApi,
	'Web Portfolio': BsRocketTakeoff,
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
	const [ref, inView] = useInView({ threshold: .5 })

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
				data.map((project) => {
					const IconComponent = projectsIcons[project.title.rendered]

					return (
						<article
							ref={ref}
							className={` ${
								inView ? '' : ''
							} my-12 last-of-type:mb-0`}
							key={project.id}
						>
							<div className='flex items-start gap-4'>
								<span
									className={`shrink-0 rounded-lg bg-gray-800 p-4 text-xl ${
										expandedProjectId === project.id ? 'cursor-pointer' : ''
									}`}
									onClick={() => toggleProject(project.id, 'expanded')}
								>
									{expandedProjectId === project.id ? (
										<AiFillEyeInvisible />
									) : (
										<IconComponent />
									)}
								</span>
								<div>
									<h3>{project.title.rendered}</h3>

									{expandedProjectId !== project.id && (
										<div className='mb-12'>
											<p
												className='mb-6'
												dangerouslySetInnerHTML={{
													__html: project.acf.summary,
												}}
											></p>

											<div className='flex flex-wrap gap-x-6 gap-y-4'>
												<button
													className='btn'
													onClick={() =>
														toggleProject(project.id, undefined, 'learnings')
													}
												>
													Learnings
												</button>

												<button
													className='btn'
													onClick={() =>
														toggleProject(project.id, undefined, 'process')
													}
												>
													Process
												</button>

												<a
													className='external-link'
													href={project.acf.live_site}
													target='_blank'
												>
													Demo
													<BiLinkExternal className='inline-block' />
												</a>

												<a
													className='external-link'
													href={project.acf.github_repository}
													target='_blank'
												>
													GitHub
													<BiLinkExternal className='inline-block' />
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
														learningsDescription={
															project.acf.learnings_description
														}
														learnings={project.acf.learnings}
													/>
												)}

											{activeComponent === 'process' &&
												project.acf.chapters && (
													<Process chapters={project.acf.chapters} />
												)}

											<IoCaretUpSharp
												className='mx-auto w-full cursor-pointer bg-gray-700 hover:bg-gray-600'
												onClick={() => toggleProject(project.id, 'expanded')}
											/>
										</>
									)}
								</div>
							</div>
						</article>
					)
				})}
		</>
	)
}

export default Projects
