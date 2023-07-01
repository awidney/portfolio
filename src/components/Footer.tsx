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
				<a
					className='my-14 inline-block text-sm hover:text-white hover:underline focus:text-white focus:underline'
					href={`mailto:${data.acf.email}`}
				>
					{data.acf.email}
				</a>
			)}
		</>
	)
}

export default Footer
