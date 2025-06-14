"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Noise from "@/components/ui/noise";

export default function AboutPanel({ aboutContentRef }) {
	const techIconsRef = useRef([]);

	useEffect(() => {
		// Set initial state for tech icons (hidden)
		techIconsRef.current.forEach((icon) => {
			if (icon) {
				gsap.set(icon, {
					scale: 0,
					opacity: 0,
					rotation: 45,
				});
			}
		});

		// Continuous floating animation after they appear
		const startFloatingAnimation = () => {
			techIconsRef.current.forEach((icon, index) => {
				if (icon) {
					gsap.to(icon, {
						y: "random(-15, 15)",
						x: "random(-8, 8)",
						rotation: "random(-10, 10)",
						duration: "random(4, 6)",
						repeat: -1,
						yoyo: true,
						ease: "power2.inOut",
						delay: index * 0.3,
					});
				}
			});
		};

		// Start floating animation after a delay
		setTimeout(startFloatingAnimation, 2000);
	}, []);

	const technologies = [
		{
			name: "JavaScript",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
			position: { top: "15%", left: "10%" },
		},
		{
			name: "TypeScript",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
			position: { top: "25%", right: "15%" },
		},
		{
			name: "Laravel",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
			position: { bottom: "30%", left: "8%" },
		},
		{
			name: "PHP",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
			position: { bottom: "15%", right: "12%" },
		},
		{
			name: "HTML",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
			position: { top: "40%", left: "5%" },
		},
		{
			name: "CSS",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
			position: { top: "35%", right: "8%" },
		},
	];

	// Function to animate tech icons in
	const animateTechIconsIn = () => {
		techIconsRef.current.forEach((icon, index) => {
			if (icon && !icon.hasAttribute("data-animated")) {
				icon.setAttribute("data-animated", "true");

				gsap.to(icon, {
					scale: 1,
					opacity: 1,
					rotation: 0,
					duration: 0.8,
					delay: index * 0.15,
					ease: "back.out(1.7)",
				});
			}
		});
	};

	// Function to reset tech icons
	const resetTechIcons = () => {
		techIconsRef.current.forEach((icon) => {
			if (icon && icon.hasAttribute("data-animated")) {
				icon.removeAttribute("data-animated");

				gsap.set(icon, {
					scale: 0,
					opacity: 0,
					rotation: 45,
				});
			}
		});
	};

	// Expose functions to parent component
	useEffect(() => {
		if (aboutContentRef.current) {
			aboutContentRef.current.animateTechIconsIn = animateTechIconsIn;
			aboutContentRef.current.resetTechIcons = resetTechIcons;
		}
	}, []);

	return (
		<div className="panel w-screen h-full bg-[#eeeef0] text-[#0a0a0a] text-4xl font-bold relative overflow-hidden">
			<Noise
				patternSize={250}
				patternScaleX={1}
				patternScaleY={1}
				patternRefreshInterval={2}
				patternAlpha={15}
				className="z-0"
			/>

			{/* Floating Technology Icons */}
			{technologies.map((tech, index) => (
				<div
					key={tech.name}
					ref={(el) => (techIconsRef.current[index] = el)}
					className="absolute z-5"
					style={tech.position}>
					<div className="relative">
						{/* Blue circular outline */}
						<div className="w-20 h-20 md:w-24 md:h-24 rounded-full opacity-70  backdrop-blur-sm"></div>
						{/* Technology icon */}
						<div className="absolute inset-0 flex items-center justify-center">
							<img
								src={tech.icon || "/placeholder.svg"}
								alt={tech.name}
								className="w-10 h-10 md:w-12 md:h-12 object-contain"
								onError={(e) => {
									// Fallback for Laravel specifically
									if (tech.name === "Laravel") {
										e.target.src = "https://laravel.com/img/logomark.min.svg";
									} else {
										// General fallback to text
										e.target.style.display = "none";
										e.target.nextSibling.style.display = "flex";
									}
								}}
							/>
							<div className="hidden w-10 h-10 md:w-12 md:h-12 items-center justify-center bg-blue-500 rounded-full">
								<span className="text-xs font-bold text-white">
									{tech.name.slice(0, 2).toUpperCase()}
								</span>
							</div>
						</div>
					</div>
				</div>
			))}

			{/* Main content */}
			<div className="absolute inset-0 flex items-center justify-center z-10">
				<div ref={aboutContentRef} className="text-center">
					<h2 className="font-content mb-8 about-appear">About Me</h2>
					<p className="text-lg max-w-2xl mx-auto leading-relaxed font-body">
						Experienced with Full Stack Web Developer and Frontend Developer for
						a 5 years' experience. Skilled in a wide range of technologies
						including <span className="font-bold text-yellow-700">Next.js</span>
						, <span className="font-bold text-red-700">Laravel</span>,{" "}
						<span className="font-bold text-cyan-700">Tailwind CSS</span>. My
						favorite part of programming is making an interactive design website
						for user and I love to think about how to I am solving a problem.
						Who has some value to build a creative and interactive website. Able
						to effectively self-manage during independent projects, and weel to
						collaborate in a team. I am always looking to learn new
						technologies.
					</p>
				</div>
			</div>
		</div>
	);
}
