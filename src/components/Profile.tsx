import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface ProfileData {
	acf: {
		name: string
		role: string
		bio_opening: string
		bio: string
	}
}

interface ProfileProps {
	restBase: string
}

const Profile = ({ restBase }: ProfileProps) => {
	const restPath = restBase + 'pages/6'
	const [data, setData] = useState<ProfileData | null>(null)
	const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })

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
				<section ref={ref} className={`hide py-14 ${inView ? 'show' : ''} `}>
					<h1>{data.acf.name}</h1>

					<h2 className='font-inter text-xl font-semibold normal-case tracking-tight text-white'>
						{data.acf.role}
					</h2>

					<p className='mt-6'>{data.acf.bio}</p>
				</section>
			)}
		</>
	)
}

export default Profile
