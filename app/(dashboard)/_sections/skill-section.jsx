"use client";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpotlightCard from "@/components/ui/spotlight-card";

gsap.registerPlugin(ScrollTrigger);

export default function SkillSection() {
	const sectionRef = useRef(null);
	const titleRef = useRef(null);
	const subtitleRef = useRef(null);
	const skillsContainerRef = useRef(null);
	const skillsRef = useRef(null);

	useGSAP(
		() => {
			const ctx = gsap.context(() => {
				// Set initial states
				gsap.set([titleRef.current, subtitleRef.current], {
					opacity: 0,
					y: 50,
				});

				gsap.set(skillsContainerRef.current, {
					opacity: 0,
					y: 30,
				});

				gsap.set(skillsRef.current?.children || [], {
					opacity: 0,
					y: 20,
					scale: 0.9,
				});

				// Create main timeline
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 80%",
						end: "bottom 20%",
						toggleActions: "play none none reverse",
					},
				});

				// Animate title and subtitle
				tl.to(titleRef.current, {
					opacity: 1,
					y: 0,
					duration: 0.8,
					ease: "power3.out",
				})
					.to(
						subtitleRef.current,
						{
							opacity: 1,
							y: 0,
							duration: 0.8,
							ease: "power3.out",
						},
						"-=0.4"
					)
					.to(
						skillsContainerRef.current,
						{
							opacity: 1,
							y: 0,
							duration: 0.8,
							ease: "power3.out",
						},
						"-=0.4"
					)
					.to(
						skillsRef.current?.children || [],
						{
							opacity: 1,
							y: 0,
							scale: 1,
							duration: 0.6,
							stagger: 0.1,
							ease: "back.out(1.7)",
						},
						"-=0.6"
					);

				// Optional: Add a subtle parallax effect to the title
				gsap.to(titleRef.current, {
					y: -50,
					ease: "none",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top bottom",
						end: "bottom top",
						scrub: 1,
					},
				});

				const skillCards = skillsRef.current?.children || [];
				Array.from(skillCards).forEach((card) => {
					const cardElement = card;

					cardElement.addEventListener("mouseenter", () => {
						gsap.to(cardElement, {
							scale: 1.05,
							duration: 0.3,
							ease: "power2.out",
						});
					});

					cardElement.addEventListener("mouseleave", () => {
						gsap.to(cardElement, {
							scale: 1,
							duration: 0.3,
							ease: "power2.out",
						});
					});
				});
			}, sectionRef);

			return () => {
				ctx.revert();
			};
		},
		{ scope: sectionRef }
	);

	const skills = [
		{ name: "HTML", icon: "🌐", color: "text-orange-400" },
		{ name: "CSS", icon: "🎨", color: "text-blue-400" },
		{ name: "Javascript", icon: "⚡", color: "text-yellow-400" },
		{ name: "React.js", icon: "⚛️", color: "text-cyan-400" },
		{ name: "Next.js", icon: "▲", color: "text-white" },
		{ name: "Typescript", icon: "📘", color: "text-blue-500" },
		{ name: "Tailwind css", icon: "🎯", color: "text-teal-400" },
		{ name: "Node.js", icon: "🟢", color: "text-green-400" },
	];

	return (
		<div>
			<section ref={sectionRef}>
				<div className="min-h-[100vh] w-full p-8 flex items-center justify-center">
					<div className="flex flex-col items-center">
						<h1
							className="text-4xl md:text-8xl font-bold font-content mb-8 text-center"
							ref={titleRef}>
							mau tau skill yang gua punya apa aja?
						</h1>
						<h2
							className="text-2xl md:text-4xl font-semibold font-body text-yellow-400 -mt-3 mb-16 text-center"
							ref={subtitleRef}>
							It's my skills
						</h2>
						<div ref={skillsContainerRef} className="w-full max-w-6xl">
							<div
								ref={skillsRef}
								className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg md:text-xl">
								{skills.map((skill, index) => (
									<SpotlightCard
										spotlightColor="rgba(255, 255, 255, 0.25)"
										key={index}>
										<div className="flex items-center space-x-4">
											<span
												className={`text-3xl ${skill.color} group-hover:scale-110 transition-transform duration-300`}>
												{skill.icon}
											</span>
											<span className="font-semibold text-gray-200 group-hover:text-white transition-colors duration-300">
												{skill.name}
											</span>
										</div>
									</SpotlightCard>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
