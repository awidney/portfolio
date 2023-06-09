/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				caveat: ['Caveat', 'cursive'],
				'nunito-sans': ['Nunito Sans', 'sans-serif'],
			},
			colors: {
				'profile-red': '#800000',
				'project-blue': '#002134',
			},
			keyframes: {
				'fade-in': {
					to: { opacity: '1' },
				},
			},
			animation: {
				'fade-in': 'fade-in 1s ease forwards',
			},
		},
	},
	plugins: [require('tailwindcss-animation-delay')],
}
