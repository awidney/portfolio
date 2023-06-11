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
				<section className='px-10 py-16'>
					<h2 className='animate-fade-in text-profile-red opacity-0 animation-delay-500 first-letter:text-2xl first-letter:font-extrabold'>
						{data.acf.bio_opening}
					</h2>
					<p className='my-6 animate-fade-in opacity-0 animation-delay-2000'>
						{data.acf.bio}
					</p>
					<h1 className='mr-4 mt-8 animate-fade-in text-right font-caveat opacity-0 animation-delay-2000'>
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
