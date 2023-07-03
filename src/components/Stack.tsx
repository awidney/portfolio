import { useState, useEffect } from 'react'
import { FaReact, FaHtml5, FaSass, FaWordpress, FaGithub } from 'react-icons/fa'
import StackItem from './StackItem'
import { useInView } from 'react-intersection-observer'
import {
	SiJavascript,
	SiTypescript,
	SiPhp,
	SiMysql,
	SiCss3,
	SiTailwindcss,
	SiGit,
	SiVisualstudiocode,
} from 'react-icons/si'

const technologyIcons: TechnologyIcons = {
	React: FaReact,
	JavaScript: SiJavascript,
	TypeScript: SiTypescript,
	PHP: SiPhp,
	HTML5: FaHtml5,
	CSS3: SiCss3,
	Sass: FaSass,
	'Tailwind CSS': SiTailwindcss,
	WordPress: FaWordpress,
	MySQL: SiMysql,
	Git: SiGit,
	GitHub: FaGithub,
	'Visual Studio Code': SiVisualstudiocode,
}

interface StackData {
	title: {
		rendered: string
	}
	acf: {
		stack_description: string
		stack: {
			technology: string
			description: string
		}[]
	}
}

interface TechnologyIcons {
	[key: string]: React.ElementType
}

interface StackProps {
	restBase: string
}

const Stack = ({ restBase }: StackProps) => {
	const restPath = restBase + 'pages/98'
	const [data, setData] = useState<StackData | null>(null)
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
				setError('My stack should be here, but something went wrong.')
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
					className={`hide border-b border-dashed border-white/20 py-14 ${
						inView ? 'show' : ''
					}`}
				>
					<div className='mb-16'>
						<h2 className=''>{data.title.rendered}</h2>
						<p>{data.acf.stack_description}</p>
					</div>

					<ul>
						{data.acf.stack.map((item, index) => {
							const IconComponent = technologyIcons[item.technology]

							return (
								<StackItem
									key={index}
									technology={item.technology}
									description={item.description}
									IconComponent={IconComponent}
								/>
							)
						})}
					</ul>
				</section>
			) : null}
		</>
	)
}

export default Stack
