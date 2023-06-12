import Profile from './components/Profile'
import ProjectsIntro from './components/ProjectsIntro'
import Stack from './components/Stack'

function App() {
	const restBase = 'http://localhost/wp-portfolio/wp-json/wp/v2/'

	return (
		<div className='px-4'>
			<Profile restBase={restBase} />
			<ProjectsIntro restBase={restBase} />
			<Stack restBase={restBase} />
		</div>
	)
}

export default App
