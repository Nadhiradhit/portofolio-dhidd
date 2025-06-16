"use client";
import { useState, useEffect, use } from "react";
import PixelTrail from "@/components/event/pixel-train";
import { MoveDown } from "lucide-react";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Noise from "@/components/ui/noise";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText);

const words = ["Everyone", "Developers", "Designers", "Friends"];
export default function HeroSection({ onScrollToAbout }) {
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const titleRef = useRef(null);
	const buttonRef = useRef(null);

	useGSAP(() => {
		if (!titleRef.current) return;

		const split = new SplitText(titleRef.current, { type: "chars" });

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: titleRef.current,
				start: "top center",
				end: "bottom top",
				scrub: true,
			},
		});

		gsap.from(split.chars, {
			y: 100,
			opacity: 0,
			stagger: 0.05,
			duration: 1,
			ease: "power3.out",
		});

		tl.to(titleRef.current, {
			opacity: 0,
			y: -100,
			ease: "power2.out",
		});

		return () => {
			tl.kill();
			split.revert();
		};
	}, []);

	useGSAP(() => {
		if (!buttonRef.current) return;

		gsap.from(buttonRef.current, {
			opacity: 0,
			duration: 1,
			stagger: 0.05,
			ease: "power3.out",
		});
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentWordIndex((prev) => (prev + 1) % words.length);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	return (
		<section className="relative overflow-hidden">
			<div className="relative h-screen">
				<Noise
					patternSize={250}
					patternScaleX={1}
					patternScaleY={1}
					patternRefreshInterval={2}
					patternAlpha={15}
					className="z-0"
				/>
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
					<h1
						ref={titleRef}
						className="text-4xl md:text-8xl font-bold font-body">
						Hello,{" "}
						<span className="text-primary">{words[currentWordIndex]}</span>
					</h1>
				</div>
				<div
					className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce"
					ref={buttonRef}>
					<button
						onClick={onScrollToAbout}
						className="bg-background text-white px-4 py-2 rounded-full shadow-md border border-foreground transition flex items-center font-body text-lg">
						Scroll Down{" "}
						<span className="">
							<MoveDown size={20} />
						</span>
					</button>
				</div>
			</div>
		</section>
	);
}
