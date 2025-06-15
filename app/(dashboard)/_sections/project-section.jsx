"use client";

import FlowingMenu from "@/components/ui/flowing-menu";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";
import { useRef } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const demoItems = [
	{
		link: "https://github.com/Nadhiradhit/humas-polimedia-web.git",
		text: "Service Humas Polimedia Website",
		image: "https://picsum.photos/600/400?random=1",
	},
	{
		link: "https://solera.id",
		text: "Solera MarketPlace",
		image: "https://picsum.photos/600/400?random=2",
	},
	{
		link: "https://loction-app.vercel.app/",
		text: "LoCaption Web App",
		image: "https://picsum.photos/600/400?random=3",
	},
	{
		link: "https://github.com/kelompok-1-Gitsid/Eventify.git",
		text: "Eventify",
		image: "https://picsum.photos/600/400?random=4",
	},
	{
		link: "https://github.com/asyarbre/audiobook-web.git",
		text: "Audio Book Polimedia Website",
		image: "https://picsum.photos/600/400?random=5",
	},
	{
		link: "https://porto-nadhir.vercel.app/",
		text: "My Personal Website",
		image: "https://picsum.photos/600/400?random=6",
	},
];

export default function ProjectSection() {
	const [showProjects, setShowProjects] = useState(false);
	const projectsRef = useRef(null);
	const questionRef = useRef(null);
	const projectsContentRef = useRef(null);

	useGSAP(
		() => {
			gsap.from(questionRef.current, {
				y: 50,
				opacity: 0,
				duration: 1,
				ease: "power2.out",
				scrollTrigger: {
					trigger: projectsRef.current,
					start: "top 80%",
					end: "bottom 20%",
					toggleActions: "play none none reverse",
				},
			});

			if (showProjects) {
				gsap.fromTo(
					projectsContentRef.current,
					{
						y: 100,
						opacity: 0,
						scale: 0.9,
					},
					{
						y: 0,
						opacity: 1,
						scale: 1,
						duration: 1.2,
						ease: "power2.out",
						delay: 0.3,
						scrollTrigger: {
							trigger: projectsRef.current,
							start: "top 80%",
							end: "bottom 20%",
							toggleActions: "play none none reverse",
						},
					}
				);
			}
		},
		{ scope: projectsRef, dependencies: [showProjects] }
	);

	const handleShowProjects = () => {
		gsap.to(questionRef.current, {
			y: -50,
			opacity: 0,
			duration: 0.8,
			ease: "power2.in",
			onComplete: () => {
				setShowProjects(true);
			},
		});
	};

	return (
		<section id="projects">
			<div
				className="h-screen flex flex-col items-center w-full justify-center"
				ref={projectsRef}>
				{!showProjects ? (
					<div
						ref={questionRef}
						className="flex flex-col items-center justify-center text-center space-y-8">
						<h2 className="text-3xl md:text-6xl font-bold font-content max-w-4xl leading-tight">
							Apakah{" "}
							<span className="font-semibold font-body text-yellow-400">
								loe mau liat projek{" "}
							</span>
							gue?
						</h2>
						<div className="flex gap-4">
							<button
								onClick={handleShowProjects}
								size="lg"
								className="px-8 py-4 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
								Lihat
							</button>
							<button
								onClick={handleShowProjects}
								variant="outline"
								size="lg"
								className="px-8 py-4 text-lg font-semibold border-2 transition-all duration-300 transform hover:scale-105 font-content">
								Ya kalo mau liat
							</button>
						</div>
					</div>
				) : (
					<div
						ref={projectsContentRef}
						className="w-full h-screen flex flex-col items-center justify-center mt-40">
						<h1 className="text-4xl md:text-8xl font-bold font-content mb-8">
							My Projects
						</h1>
						<h2 className="text-xl md:text-2xl font-content italic mb-8">
							ini adalah projek-projek gue :
						</h2>
						<div className="relative w-full h-[1000px] pb-20">
							<FlowingMenu items={demoItems} />
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
