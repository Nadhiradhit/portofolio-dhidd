"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import ScrambledText from "@/components/ui/scramble-text";

export default function ProfilePanel({ scrambledTextRef }) {
	const imageRef = useRef(null);
	const h3Ref = useRef(null);

	useEffect(() => {
		// Sync h3 animation with image border-radius animation
		const tl = gsap.timeline({ repeat: -1, yoyo: true });

		tl.fromTo(
			imageRef.current,
			{ borderRadius: "0%" },
			{
				borderRadius: "50%",
				duration: 2,
				ease: "power2.inOut",
			}
		).fromTo(
			h3Ref.current,
			{
				scale: 1,
				opacity: 0.7,
				y: 0,
			},
			{
				scale: 1.1,
				opacity: 1,
				y: -10,
				duration: 2,
				ease: "power2.inOut",
			},
			0 // Start at the same time as image animation
		);
	}, []);

	return (
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
			<h3
				ref={h3Ref}
				className="text-2xl font-semibold italic text-center font-content mt-8 text-white">
				Hola! i&apos;m
			</h3>
			<div ref={scrambledTextRef}>
				<ScrambledText
					className="scrambled-text-demo text-4xl md:text-8xl text-center font-content mx-auto text-white"
					radius={100}
					duration={1.2}
					speed={0.5}
					scrambleChars={".:"}>
					Nadhir Adhitya Zhalifunnas
				</ScrambledText>
			</div>
		</div>
	);
}
