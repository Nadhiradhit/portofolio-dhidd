"use client";
import { useRef } from "react";

import { gsap } from "gsap";
import Image from "next/image";
import ScrambledText from "@/components/ui/scramble-text";
import { useGSAP } from "@gsap/react";

export default function ProfilePanel({ scrambledTextRef }) {
	const imageRef = useRef(null);
	const h3Ref = useRef(null);

	useGSAP(() => {
		if (!imageRef.current || !h3Ref.current) return;

		const tl = gsap.timeline({
			repeat: -1,
			yoyo: true,
			defaults: { ease: "power2.inOut" },
		});

		tl.fromTo(
			imageRef.current,
			{ borderRadius: "0%" },
			{
				borderRadius: "50%",
				duration: 2,
			}
		).fromTo(
			h3Ref.current,
			{
				scale: 1,
				opacity: 0.7,
				y: 0,
			},
			{
				scale: 1.05,
				opacity: 1,
				y: -5,
				duration: 2,
			},
			0
		);
	}, []);

	return (
		<div className="panel w-screen h-full bg-black flex flex-col gap-2 sm:gap-4 items-center justify-center p-4 sm:p-6 md:p-10">
			<div className="relative">
				<Image
					ref={imageRef}
					src="/assets/photo/img-1.jpg"
					alt="Profile"
					width={400}
					height={400}
					quality={100}
					className="rounded-lg w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover mx-auto picture"
					priority
				/>
			</div>

			<h3
				ref={h3Ref}
				className="text-lg sm:text-xl md:text-2xl font-semibold italic text-center font-content mt-2 sm:mt-4 md:mt-8 text-white px-4">
				Hola! i&apos;m
			</h3>

			<div ref={scrambledTextRef} className="px-2 sm:px-4">
				<ScrambledText
					className="scrambled-text-demo text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-8xl text-center font-body mx-auto text-white leading-tight"
					radius={100}
					duration={1.2}
					speed={0.5}
					scrambleChars=".:">
					Nadhir Adhitya Zhalifunnas
				</ScrambledText>
			</div>
		</div>
	);
}
