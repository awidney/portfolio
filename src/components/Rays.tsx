const Rays = () => {
	return (
		<div className='pointer-events-none absolute inset-x-0 top-[-375px] flex justify-center'>
			<div
				className='shrink-0'
				style={{ opacity: 1, transform: 'translateY(0%) translateZ(0px)' }}
			>
				<div className='relative -translate-y-[60px] [mask-image:linear-gradient(black_50%,transparent)] before:absolute before:inset-0 before:bg-gradient-to-r before:from-zinc-950 before:via-transparent before:to-zinc-950'>
					<img
						src='aurora-layer-1.webp'
						alt=''
						width={2646}
						height={1301}
						style={{ color: 'transparent' }}
					/>
				</div>
				<div className='absolute inset-0 translate-x-[60px] [mask-image:linear-gradient(black_50%,transparent)] before:absolute before:inset-0 before:bg-gradient-to-r before:from-zinc-950 before:via-transparent before:to-zinc-950'>
					<img
						src='aurora-layer-2.webp'
						alt=''
						width={2646}
						height={1301}
						style={{ color: 'transparent' }}
					/>
				</div>
			</div>
		</div>
	)
}

export default Rays
