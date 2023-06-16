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
	content: {
		rendered: string
	}
	acf: {
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
				<section className='py-16'>
					<div ref={ref} className={`${inView ? 'show' : ''} hide`}>
						<h2 className=''>{data.title.rendered}</h2>
						<p
							className='mb-20'
							dangerouslySetInnerHTML={{ __html: data.content.rendered }}
						></p>
					</div>

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
				</section>
			)}
		</>
	)
}

export default Stack
