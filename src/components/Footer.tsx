import { useEffect, useState } from 'react'

interface FooterData {
	acf: {
		email: string
	}
}

interface FooterProps {
	restBase: string
}

const Footer = ({ restBase }: FooterProps) => {
	const restPath = restBase + 'pages/6'
	const [data, setData] = useState<FooterData | null>(null)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(restPath)
				const jsonData = await response.json()
				setData(jsonData)
				setError(null)
			} catch (error) {
				setError('My contact information should be here, but something went wrong.')
			}
		}
		fetchData()
	}, [restPath])

	return (
		<>
			{error ? (
				<p className='error'>{error}</p>
			) : data ? (
				<a
					className='my-14 inline-block text-sm hover:text-white hover:underline focus:text-white focus:underline'
					href={`mailto:${data.acf.email}`}
				>
					{data.acf.email}
				</a>
			) : null}
		</>
	)
}

export default Footer
