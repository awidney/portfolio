import Profile from './components/Profile'
import Projects from './components/Projects'
import Stack from './components/Stack'
import Footer from './components/Footer'
import Rays from './components/Rays'

function App() {
	const restBase = 'https://adamwidney.com/wp-portfolio/wp-json/wp/v2/'

	return (
		<div className='mx-auto max-w-[33rem] animate-fade-in px-4 opacity-0 animation-delay-700'>
			<main>
				<div className='pointer-events-none absolute inset-0 select-none overflow-hidden'>
					<Rays />
				</div>
				<div className='mt-40'>
					<Profile restBase={restBase} />
					<Projects restBase={restBase} />
					<Stack restBase={restBase} />
				</div>
			</main>
			<footer>
				<Footer restBase={restBase} />
			</footer>
		</div>
	)
}

export default App
