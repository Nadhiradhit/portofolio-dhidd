"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

import soleraLogo from "@/public/assets/images/logoSolera.png";
import polimediaLogo from "@/public/assets/images/polimedia-logo.png";
import pilihLogo from "@/public/assets/images/pilih.jpg";
import gitsLogo from "@/public/assets/images/logo-gits.jpg";
import telkomLogo from "@/public/assets/images/logoTelkom.png";
import Noise from "@/components/ui/noise";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
	const titleRef = useRef();
	const containerRef = useRef();
	const cardsRef = useRef([]);

	const experiences = [
		{
			title: "Front-End Developer (Freelance)",
			company: "PT. Solera Crypto Network",
			companyLogo: soleraLogo,
			period: "May 2025 - Present",
			description:
				"Building scalable server-side applications and APIs using Node.js and databases. Focus on performance optimization and secure data handling.",
		},
		{
			title: "Full-Stack Web Developer (Freelance)",
			company: "Politeknik Negeri Media Kreatif Jakarta",
			companyLogo: polimediaLogo,
			period: "November 2024 - December 2024",
			description:
				"Developed responsive web applications using React and Next.js. Collaborated with design teams for pixel-perfect UI implementations.",
		},
		{
			title: "Front-End Web Developer (Magang Merdeka Batch 6)",
			company: "PT. Pilihanmu Indonesia Jaya",
			companyLogo: pilihLogo,
			period: "February 2024 - June 2024",
			description:
				"Built end-to-end web applications for various clients. Handled both frontend and backend development with modern technologies.",
		},
		{
			title: "Full-Stack Web Developer (Studi Independen Batch 5)",
			company: "PT. Gits Indonesia",
			companyLogo: gitsLogo,
			period: "August 2023 - December 2023",
			description:
				"Built end-to-end web applications for various clients. Handled both frontend and backend development with modern technologies.",
		},
		{
			title: "Front-End Web Developer (Freelance)",
			company: "Politeknik Negeri Media Kreatif Jakarta",
			companyLogo: polimediaLogo,
			period: "June 2023 - August 2023",
			description:
				"Built end-to-end web applications for various clients. Handled both frontend and backend development with modern technologies.",
		},
		{
			title: "Magang Sekolah",
			company: "PT. Telkom Akses Bogor",
			companyLogo: telkomLogo,
			period: "January 2020 - March 2020",
			description:
				"Built end-to-end web applications for various clients. Handled both frontend and backend development with modern technologies.",
		},
	];

	useGSAP(() => {
		gsap.from(titleRef.current, {
			y: 50,
			opacity: 0,
			duration: 1,
			ease: "power2.out",
			scrollTrigger: {
				trigger: titleRef.current,
				start: "top 80%",
				toggleActions: "play none none reverse",
			},
		});

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: containerRef.current,
				start: "top top",
				end: "bottom top",
				scrub: 1,
				pin: true,
			},
		});

		cardsRef.current.forEach((card, index) => {
			if (card) {
				tl.to(
					card,
					{
						opacity: 1,
						y: 0,
						duration: 1,
						ease: "power2.out",
					},
					index * 2
				);

				if (index < experiences.length - 1) {
					tl.to(
						card,
						{
							opacity: 0,
							y: -50,
							duration: 1,
							ease: "power2.in",
						},
						index * 2 + 1.5
					);
				}
			}
		});

		// Add floating animations for company logos
		cardsRef.current.forEach((card, index) => {
			if (card) {
				const logo = card.querySelector(".company-logo");
				if (logo) {
					gsap.to(logo, {
						y: -10,
						duration: 2,
						ease: "power2.inOut",
						yoyo: true,
						repeat: -1,
						delay: index * 0.3,
					});

					gsap.to(logo, {
						rotation: 3,
						duration: 3,
						ease: "power2.inOut",
						yoyo: true,
						repeat: -1,
						delay: index * 0.2,
					});
				}
			}
		});
	});

	return (
		<section>
			<div className="h-60 md:h-96 flex justify-center items-center">
				<h1
					className="text-xl md:text-6xl font-body font-semibold text-center"
					ref={titleRef}>
					And then what's{" "}
					<span className="bg-white text-gray-900 px-2 py-1 rounded-lg font-content">
						my experience?
					</span>{" "}
					🤔
				</h1>
			</div>

			<div className="h-full relative" ref={containerRef}>
				<div className="h-screen flex justify-center items-center px-4">
					{experiences.map((exp, index) => (
						<div
							key={index}
							ref={(el) => (cardsRef.current[index] = el)}
							className="absolute inset-0 flex justify-center items-center opacity-0"
							style={{ transform: "translateY(50px)" }}>
							<div className="max-w-7xl w-full mx-auto px-4 md:px-0">
								<div className="block md:hidden border border-gray-200 rounded-2xl shadow-lg p-6 space-y-4 font-content relative overflow-hidden">
									<Noise
										patternSize={250}
										patternScaleX={1}
										patternScaleY={1}
										patternRefreshInterval={2}
										patternAlpha={15}
										className="z-0 rounded-2xl"
									/>
									<div className="relative">
										<div className="absolute -top-4 -right-4 z-10">
											<Image
												src={exp.companyLogo || "/placeholder.svg"}
												width={60}
												height={60}
												alt="Company Logo"
												className="company-logo opacity-80 rounded-lg shadow-lg"
											/>
										</div>
										<h2 className="text-xl font-bold pr-16">{exp.title}</h2>
										<h3 className="text-lg font-semibold text-gray-300 pr-16">
											{exp.company}
										</h3>
									</div>
									<p className="text-sm text-yellow-100 font-medium">
										{exp.period}
									</p>
									<p className="text-gray-50 leading-relaxed text-sm">
										{exp.description}
									</p>
								</div>

								<div className="hidden md:flex gap-12 items-center h-96 rounded-2xl shadow-md shadow-gray-600/40 p-8 font-content bg-black/40 relative overflow-hidden">
									<Noise
										patternSize={250}
										patternScaleX={1}
										patternScaleY={1}
										patternRefreshInterval={2}
										patternAlpha={15}
										className="z-0 rounded-2xl"
									/>
									<div className="w-2/3 relative z-10">
										<p className="text-xl text-yellow-100 mb-4">{exp.period}</p>
										<div className="flex items-center gap-2 flex-wrap">
											<h2 className="text-2xl font-bold">{exp.title}</h2>
											<span className="text-2xl font-bold">.</span>
											<h3 className="text-2xl font-bold">{exp.company}</h3>
										</div>
										<p className="text-gray-50 leading-relaxed text-xl mt-8">
											{exp.description}
										</p>
									</div>
									<div className="w-1/3 flex justify-center relative">
										<div className="absolute -top-8 -right-8 opacity-20">
											<Image
												src={exp.companyLogo || "/placeholder.svg"}
												width={200}
												height={200}
												alt="Background Logo"
												className="blur-sm"
											/>
										</div>
										<Image
											src={exp.companyLogo || "/placeholder.svg"}
											width={120}
											height={120}
											alt="Company Logo"
											className="company-logo opacity-90 hover:opacity-100 transition-all duration-300 rounded-xl shadow-2xl relative z-10 hover:scale-105"
										/>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
