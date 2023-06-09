import Profile from './components/Profile'
import ProjectsIntro from './components/ProjectsIntro'

function App() {
	const restBase = 'http://localhost/wp-portfolio/wp-json/wp/v2/'

	return (
		<>
			<Profile restBase={restBase} />
			<ProjectsIntro restBase={restBase} />
		</>
	)
}

export default App
