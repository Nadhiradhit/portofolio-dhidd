"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Noise from "@/components/ui/noise";
import { useGSAP } from "@gsap/react";

export default function AboutPanel({ aboutContentRef }) {
	const techIconsRef = useRef([]);
	const floatingIconsRef = useRef([]);

	useGSAP(() => {
		[...techIconsRef.current, ...floatingIconsRef.current].forEach((icon) => {
			if (icon) {
				gsap.set(icon, {
					scale: 0,
					opacity: 0,
					rotation: 45,
				});
			}
		});

		const startFloatingAnimation = () => {
			techIconsRef.current.forEach((icon, index) => {
				if (icon) {
					gsap.to(icon, {
						y: "random(-20, 20)",
						x: "random(-15, 15)",
						rotation: "random(-15, 15)",
						duration: "random(5, 8)",
						repeat: -1,
						yoyo: true,
						ease: "power2.inOut",
						delay: index * 0.4,
					});
				}
			});

			floatingIconsRef.current.forEach((icon, index) => {
				if (icon) {
					gsap.to(icon, {
						y: "random(-10, 10)",
						x: "random(-5, 5)",
						rotation: "random(-8, 8)",
						duration: "random(6, 9)",
						repeat: -1,
						yoyo: true,
						ease: "sine.inOut",
						delay: index * 0.6,
					});
				}
			});
		};

		setTimeout(startFloatingAnimation, 2500);
	}, []);

	const backgroundTechnologies = [
		{
			name: "JavaScript",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
			position: { top: "15%", left: "8%" },
		},
		{
			name: "TypeScript",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
			position: { top: "20%", right: "10%" },
		},
		{
			name: "Laravel",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
			position: { bottom: "25%", left: "6%" },
		},
		{
			name: "PHP",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
			position: { bottom: "20%", right: "8%" },
		},
		{
			name: "HTML",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
			position: { top: "45%", left: "4%" },
		},
		{
			name: "CSS",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
			position: { top: "40%", right: "6%" },
		},
	];

	const floatingTechnologies = [
		{
			name: "React",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
			position: { top: "25%", left: "25%" },
		},
		{
			name: "Node.js",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
			position: { top: "30%", right: "25%" },
		},
		{
			name: "Tailwind",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
			position: { bottom: "35%", left: "20%" },
		},
		{
			name: "Next.js",
			icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
			position: { bottom: "40%", right: "22%" },
		},
	];

	const animateTechIconsIn = () => {
		[...techIconsRef.current, ...floatingIconsRef.current].forEach(
			(icon, index) => {
				if (icon && !icon.hasAttribute("data-animated")) {
					icon.setAttribute("data-animated", "true");

					gsap.to(icon, {
						scale: 1,
						opacity: 1,
						rotation: 0,
						duration: 0.9,
						delay: index * 0.12,
						ease: "back.out(1.4)",
					});
				}
			}
		);
	};

	const resetTechIcons = () => {
		[...techIconsRef.current, ...floatingIconsRef.current].forEach((icon) => {
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

	useEffect(() => {
		if (aboutContentRef.current) {
			aboutContentRef.current.animateTechIconsIn = animateTechIconsIn;
			aboutContentRef.current.resetTechIcons = resetTechIcons;
		}
	}, []);

	const TechIcon = ({ tech, index, refArray, size = "md" }) => (
		<div
			key={tech.name}
			ref={(el) => (refArray.current[index] = el)}
			className={`absolute z-5 hidden lg:block ${
				size === "sm" ? "opacity-60" : "opacity-70"
			}`}
			style={tech.position}>
			<div className="relative group cursor-pointer">
				<div
					className={`${
						size === "sm" ? "w-16 h-16" : "w-20 h-20 xl:w-24 xl:h-24"
					} rounded-full bg-white/20 backdrop-blur-sm border border-white/30 
					transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30`}
				/>
				<div className="absolute inset-0 flex items-center justify-center">
					<img
						src={tech.icon || "/placeholder.svg"}
						alt={tech.name}
						className={`${
							size === "sm" ? "w-8 h-8" : "w-10 h-10 xl:w-12 xl:h-12"
						} object-contain transition-transform duration-300 group-hover:scale-110`}
						onError={(e) => {
							const target = e.target;
							if (tech.name === "Laravel") {
								target.src = "https://laravel.com/img/logomark.min.svg";
							} else {
								target.style.display = "none";
								const fallback = target.nextElementSibling;
								if (fallback) fallback.style.display = "flex";
							}
						}}
					/>
					<div className="hidden w-8 h-8 xl:w-12 xl:h-12 items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg">
						<span className="text-xs font-bold text-white">
							{tech.name.slice(0, 2).toUpperCase()}
						</span>
					</div>
				</div>

				<div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
					{tech.name}
				</div>
			</div>
		</div>
	);

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

			{backgroundTechnologies.map((tech, index) => (
				<TechIcon
					key={`bg-${tech.name}`}
					tech={tech}
					index={index}
					refArray={techIconsRef}
					size="md"
				/>
			))}

			{floatingTechnologies.map((tech, index) => (
				<TechIcon
					key={`float-${tech.name}`}
					tech={tech}
					index={index}
					refArray={floatingIconsRef}
					size="sm"
				/>
			))}

			<div className="absolute inset-0 flex items-center justify-center z-10 px-4 sm:px-6 lg:px-8">
				<div ref={aboutContentRef} className="text-center max-w-4xl">
					<h2 className="font-content mb-6 sm:mb-8 about-appear text-3xl sm:text-4xl lg:text-5xl">
						About Me
					</h2>
					<div className="space-y-4 sm:space-y-6">
						<p className="text-base sm:text-lg lg:text-xl leading-relaxed font-content font-medium text-gray-700">
							Experienced Full Stack Web Developer and Frontend Developer with{" "}
							<span className="font-bold text-blue-600">5 years</span> of
							experience. Skilled in a wide range of technologies including{" "}
							<span className="font-bold text-black bg-yellow-200 px-1 rounded">
								Next.js
							</span>
							,{" "}
							<span className="font-bold text-white bg-red-600 px-1 rounded">
								Laravel
							</span>
							, and{" "}
							<span className="font-bold text-white bg-cyan-500 px-1 rounded">
								Tailwind CSS
							</span>
							.
						</p>
						<p className="text-base sm:text-lg lg:text-xl leading-relaxed font-content font-medium text-gray-700">
							My favorite part of programming is creating{" "}
							<span className="font-bold text-purple-600">
								interactive design websites
							</span>{" "}
							for users, and I love thinking about creative solutions to complex
							problems. I bring value through building{" "}
							<span className="font-bold text-green-600">
								creative and interactive websites
							</span>
							.
						</p>
						<p className="text-base sm:text-lg lg:text-xl leading-relaxed font-content font-medium text-gray-700">
							Able to effectively self-manage during independent projects and
							collaborate well in team environments. I am always looking to
							learn{" "}
							<span className="font-bold text-orange-600">
								new technologies
							</span>{" "}
							and stay current with industry trends.
						</p>
					</div>
				</div>
			</div>

			<div className="lg:hidden absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse" />
			<div className="lg:hidden absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse delay-1000" />
			<div className="lg:hidden absolute top-1/3 left-4 w-6 h-6 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full opacity-20 animate-pulse delay-2000" />
		</div>
	);
}
