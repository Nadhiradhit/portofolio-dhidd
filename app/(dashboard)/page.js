"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import SplitText from "@/components/ui/split-text";
import ScrollReveal from "@/components/ui/scroll-reveal";
import PixelTrail from "@/components/event/pixel-train";
import ScrambledText from "@/components/ui/scramble-text";
import Noise from "@/components/ui/noise";

import { MoveDown } from "lucide-react";

import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

export default function Page() {
	const sectionRef = useRef(null);
	const containerRef = useRef(null);
	const imageRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const panels = gsap.utils.toArray(".panel");

			gsap.to(panels, {
				xPercent: -100 * (panels.length - 1),
				ease: "none",
				scrollTrigger: {
					trigger: sectionRef.current,
					pin: true,
					scrub: 1,
					snap: 1 / (panels.length - 1),
					end: () => "+=" + containerRef.current.offsetWidth,
				},
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	useEffect(() => {
		gsap.fromTo(
			imageRef.current,
			{ borderRadius: "0%" },
			{
				borderRadius: "50%",
				duration: 2,
				ease: "power2.inOut",
				yoyo: true,
				repeat: -1,
			}
		);
	});

	return (
		<div>
			<section className="h-screen relative overflow-hidden">
				<PixelTrail
					gridSize={53}
					trailSize={0.05}
					maxAge={250}
					interpolate={4.1}
					color="#eeeef0"
					gooeyFilter={{ id: "custom-goo-filter", strength: 2 }}
					className="absolute inset-0 z-0 hidden md:block"
				/>
				<div className="absolute inset-0 flex items-center justify-center">
					<SplitText
						text="Hello, Everyone! I am a Full Stack Developer."
						className="text-4xl md:text-8xl font-bold text-center font-content"
						splitType="words, chars"
						delay={100}
						duration={1}
						ease="power3.out"
						from={{ opacity: 0, y: 40 }}
						to={{ opacity: 1, y: 0 }}
						threshold={0.1}
						rootMargin="-100px"
						textAlign="center"
					/>
				</div>
				<div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
					<button
						onClick={() => {
							const target = document.getElementById("about");
							if (target) {
								gsap.to(window, {
									duration: 1.2,
									scrollTo: { y: target, offsetY: 0 },
									ease: "power2.inOut",
								});
							}
						}}
						className="bg-background text-white px-4 py-2 rounded-full shadow-md border border-foreground transition flex items-center font-content text-lg">
						Scroll Down{" "}
						<span className="">
							<MoveDown size={20} />
						</span>
					</button>
				</div>
			</section>

			<section
				id="about"
				ref={sectionRef}
				className="relative h-screen overflow-hidden">
				<div ref={containerRef} className="flex absolute w-[200vw] h-screen">
					<div className="panel w-screen h-full bg-black flex flex-col gap-4 items-center justify-center p-10">
						<Image
							ref={imageRef}
							src="/assets/photo/img-1.jpg"
							alt="Profile"
							width={400}
							height={400}
							quality={100}
							className="rounded-lg w-96 h-96 object-cover mx-auto picture"
						/>
						<h3 className="text-2xl font-semibold italic text-center font-content mt-8 text-white">
							Hola! i&apos;m{" "}
						</h3>
						<ScrambledText
							className="scrambled-text-demo text-4xl md:text-8xl text-center font-content mx-auto text-white"
							radius={100}
							duration={1.2}
							speed={0.5}
							scrambleChars={".:"}>
							Nadhir Adhitya Zhalifunnas
						</ScrambledText>
					</div>

					<div className="panel w-screen h-full bg-[#eeeef0] text-[#0a0a0a] text-4xl font-bold relative">
						<Noise
							patternSize={250}
							patternScaleX={1}
							patternScaleY={1}
							patternRefreshInterval={2}
							patternAlpha={15}
							className="z-0"
						/>
						<div className="absolute inset-0 flex items-center justify-center z-10">
							<div className="text-center">
								<h2 className="font-content mb-8">About Me</h2>
								<ScrollReveal>
									<p className="text-lg max-w-2xl mx-auto leading-relaxed">
										I'm a passionate full-stack developer with expertise in
										modern web technologies. I love creating beautiful,
										functional, and user-friendly applications that solve
										real-world problems.
									</p>
								</ScrollReveal>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section>
				<div className="h-screen flex items-center justify-center">
					<p className="text-2xl">More content coming soon...</p>
				</div>
			</section>
		</div>
	);
}
