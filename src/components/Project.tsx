import { useState, useEffect } from 'react'
import { BiLinkExternal } from 'react-icons/bi'
import { useInView } from 'react-intersection-observer'
import { ProjectsData } from './Projects'
import Process from './Process'
import Learnings from './Learnings'

interface ProjectProps {
	restBase: string
	data: ProjectsData['acf']['projects_section']['projects']
}

const Project = ({ data }: ProjectProps) => {
	const [expandedProjectIndex, setExpandedProjectIndex] = useState<
		number | null
	>(null)
	const [activeComponent, setActiveComponent] = useState<
		'learnings' | 'process' | null
	>(null)
	const [initialScrollPosition, setInitialScrollPosition] = useState(0)

	const toggleProject = (
		projectIndex: number,
		state?: string,
		component?: string
	) => {
		if (state === 'expanded') {
			setExpandedProjectIndex(null)
			setActiveComponent(null)
		} else {
			setExpandedProjectIndex(projectIndex)
			setActiveComponent(component as 'learnings' | 'process')
		}
	}

	const scrollToInitialPosition = () => {
		window.scrollTo({ top: initialScrollPosition, behavior: 'smooth' })
	}

	useEffect(() => {
		const expandedProjectRef = document.getElementById(
			`project-${expandedProjectIndex}`
		)
		if (expandedProjectRef) {
			const rect = expandedProjectRef.getBoundingClientRect()

			if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
				return
			}
			expandedProjectRef.scrollIntoView({ behavior: 'smooth' })

			setTimeout(() => {
				setInitialScrollPosition(window.scrollY)
			}, 400)
		}
	}, [expandedProjectIndex])

	return (
		<>
			{data &&
				data.map((project, index) => {
					const [ref, inView] = useInView({ threshold: 1 })

					return (
						<article className='relative pb-16 pl-7 last:pb-0' key={index}>
							<div
								className={`absolute bottom-0 left-1 w-px bg-white/10 ${
									index === 0 ? 'top-3' : 'top-0'
								}`}
							></div>
							<div className='absolute left-0 top-[6px] h-2 w-2 rounded-full border border-sky-300 bg-zinc-950'></div>
							<div>
								<ul
									className='flex flex-wrap gap-y-2 pb-2 font-outfit text-[12px] font-semibold uppercase tracking-[0.2em] text-sky-300'
									id={`project-${index}`}
									ref={ref}
								>
									{project.project_tags &&
										project.project_tags.map((tag, index) => {
											return (
												<li key={index}>
													{tag.project_tag}

													{index !== project.project_tags.length - 1 && (
														<span className='mx-2'>&bull;</span>
													)}
												</li>
											)
										})}
								</ul>

								<h3
									className={`${
										expandedProjectIndex === index ? 'animate-pulse' : ''
									}`}
								>
									{project.project_title}
								</h3>

								{expandedProjectIndex !== index && (
									<div>
										<p className='mb-6 animate-fade-in opacity-0'>
											{project.project_description}
										</p>

										<div className='flex flex-wrap gap-x-6 gap-y-4'>
											<button
												className='btn'
												onClick={() => {
													toggleProject(index, undefined, 'learnings')
													if (inView) {
														setInitialScrollPosition(window.scrollY)
													}
												}}
											>
												Learnings
											</button>

											<button
												className='btn'
												onClick={() => {
													toggleProject(index, undefined, 'process')
													if (inView) {
														setInitialScrollPosition(window.scrollY)
													}
												}}
											>
												Process
											</button>

											<a
												className='external-link'
												href={project.github_repository}
												target='_blank'
											>
												GitHub
												<BiLinkExternal className='inline-block' />
											</a>

											<a
												className='external-link'
												href={project.live_site}
												target='_blank'
											>
												Demo
												<BiLinkExternal className='inline-block' />
											</a>
										</div>
									</div>
								)}

								{expandedProjectIndex === index && (
									<>
										{activeComponent === 'learnings' &&
											project.learnings_list && (
												<Learnings learnings_list={project.learnings_list} />
											)}

										{activeComponent === 'process' &&
											project.process_chapters && (
												<Process process_chapters={project.process_chapters} />
											)}

										<div className='flex gap-6'>
											<button
												className='btn'
												onClick={() => {
													toggleProject(index, 'expanded')
													if (!inView) {
														scrollToInitialPosition()
													}
												}}
											>
												Close
											</button>
											<button
												className='btn'
												onClick={() => {
													toggleProject(
														index,
														undefined,
														activeComponent === 'learnings'
															? 'process'
															: 'learnings'
													)
													if (!inView) {
														scrollToInitialPosition()
													}
												}}
											>
												{activeComponent === 'learnings'
													? 'Process'
													: 'Learnings'}
											</button>
										</div>
									</>
								)}
							</div>
						</article>
					)
				})}
		</>
	)
}

export default Project
