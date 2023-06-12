import { useEffect, useState } from 'react'

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
					<p className='my-6 animate-fade-in opacity-0  first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:font-bold first-letter:text-white first-line:uppercase first-line:tracking-widest'>
						{data.acf.bio}
					</p>
					<h1 className='mr-4 mt-8 animate-fade-in text-right font-caveat opacity-0'>
						{data.acf.name},
						<br />
						{data.acf.role}
					</h1>
					<div className='water'></div>
				</section>
			)}
		</>
	)
}

export default Profile
