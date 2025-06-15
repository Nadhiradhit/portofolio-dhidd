"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Github, Linkedin, Twitter, ArrowUp } from "lucide-react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function FooterSection() {
	const containerRef = useRef(null);
	const titleRef = useRef(null);
	const subtitleRef = useRef(null);
	const contactRef = useRef(null);
	const socialRef = useRef(null);
	const decorRef = useRef(null);

	useGSAP(() => {
		const ctx = gsap.context(() => {
			gsap.set(
				[
					titleRef.current,
					subtitleRef.current,
					contactRef.current,
					socialRef.current,
				],
				{
					opacity: 0,
					y: 50,
				}
			);

			gsap.set(decorRef.current, {
				scale: 0,
				rotation: -180,
			});

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top 80%",
					end: "bottom 20%",
					toggleActions: "play none none reverse",
				},
			});

			tl.to(decorRef.current, {
				scale: 1,
				rotation: 0,
				duration: 1,
				ease: "back.out(1.7)",
			})
				.to(
					titleRef.current,
					{
						opacity: 1,
						y: 0,
						duration: 0.8,
						ease: "power2.out",
					},
					"-=0.5"
				)
				.to(
					subtitleRef.current,
					{
						opacity: 1,
						y: 0,
						duration: 0.8,
						ease: "power2.out",
					},
					"-=0.4"
				)
				.to(
					contactRef.current,
					{
						opacity: 1,
						y: 0,
						duration: 0.8,
						ease: "power2.out",
					},
					"-=0.4"
				)
				.to(
					socialRef.current,
					{
						opacity: 1,
						y: 0,
						duration: 0.8,
						ease: "power2.out",
					},
					"-=0.4"
				);

			const socialIcons = socialRef.current.querySelectorAll(".social-icon");
			socialIcons?.forEach((icon) => {
				const iconElement = icon;
				iconElement.addEventListener("mouseenter", () => {
					gsap.to(iconElement, {
						scale: 1.2,
						rotation: 10,
						duration: 0.3,
						ease: "power2.out",
					});
				});

				iconElement.addEventListener("mouseleave", () => {
					gsap.to(iconElement, {
						scale: 1,
						rotation: 0,
						duration: 0.3,
						ease: "power2.out",
					});
				});
			});

			gsap.to(decorRef.current, {
				y: -10,
				duration: 2,
				ease: "power1.inOut",
				yoyo: true,
				repeat: -1,
			});
		}, containerRef);

		return () => ctx.revert();
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div
			ref={containerRef}
			className="min-h-screen flex items-center justify-center bg-gradient-to-br  relative overflow-hidden">
			<div className="absolute inset-0 opacity-10">
				<div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
				<div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
			</div>

			<div
				ref={decorRef}
				className="absolute top-20 right-20 w-20 h-20 border-2 border-purple-400 rounded-full opacity-30"></div>

			<div className="text-center z-10 max-w-4xl mx-auto px-6">
				<h1
					ref={titleRef}
					className="text-6xl md:text-8xl font-bold text-white mb-6 font-content">
					Thank You!
				</h1>

				<p
					ref={subtitleRef}
					className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
					Perjalanan ini telah berjalan dengan keren! Mari terhubung dan
					berkolaborasi untuk menciptakan sesuatu yang luar biasa bersama.
				</p>

				<div ref={contactRef} className="mb-12">
					<h2 className="text-2xl font-semibold text-white mb-6">
						Let's Connect
					</h2>
					<div className="flex flex-col md:flex-row items-center justify-center gap-6">
						<a
							href="mailto:nadhiradhitya@gmail.com"
							className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 text-white hover:bg-white/20 transition-all duration-300 group">
							<Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
							<span>nadhiradhitya@gmail.com</span>
						</a>
						<div className="text-gray-400">or</div>
						<div className="text-white font-medium">
							Find me on social media
						</div>
					</div>
				</div>

				<div
					ref={socialRef}
					className="flex items-center justify-center gap-6 mb-12">
					<a
						href="https://github.com/Nadhiradhit"
						className="social-icon w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
						target="_blank"
						rel="noopener noreferrer">
						<Github className="w-6 h-6" />
					</a>
					<a
						href="https://www.linkedin.com/in/nadhiradhitt/"
						className="social-icon w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
						target="_blank"
						rel="noopener noreferrer">
						<Linkedin className="w-6 h-6" />
					</a>
				</div>

				<button
					onClick={scrollToTop}
					className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 group">
					<ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
					<span>Back to top</span>
				</button>
			</div>

			<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
		</div>
	);
}
