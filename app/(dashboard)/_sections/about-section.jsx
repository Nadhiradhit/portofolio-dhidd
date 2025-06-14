"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ProfilePanel from "./profile-panel";
import AboutPanel from "./about-panel";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
	const sectionRef = useRef(null);
	const containerRef = useRef(null);
	const aboutContentRef = useRef(null);
	const scrambledTextRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const panels = gsap.utils.toArray(".panel");

			// Set initial state for about content (hidden)
			if (aboutContentRef.current) {
				gsap.set(aboutContentRef.current.children, {
					y: 80,
					opacity: 0,
				});
			}

			// Set initial state for scrambled text (hidden at bottom)
			if (scrambledTextRef.current) {
				gsap.set(scrambledTextRef.current, {
					y: 100,
					opacity: 0,
				});
			}

			// Horizontal scroll animation with content triggers
			const horizontalTween = gsap.to(panels, {
				xPercent: -100 * (panels.length - 1),
				ease: "none",
				scrollTrigger: {
					trigger: sectionRef.current,
					pin: true,
					scrub: 1,
					snap: 1 / (panels.length - 1),
					end: () => "+=" + containerRef.current.offsetWidth,
					onUpdate: (self) => {
						const progress = self.progress;
						const aboutPanelStart = 0.3;
						const aboutPanelVisible = 0.5;

						// Animate scrambled text when first panel is visible
						if (
							progress <= 0.2 &&
							scrambledTextRef.current &&
							!scrambledTextRef.current.hasAttribute("data-animated")
						) {
							scrambledTextRef.current.setAttribute("data-animated", "true");

							gsap.to(scrambledTextRef.current, {
								y: 0,
								opacity: 1,
								duration: 1.5,
								delay: 0.5,
								ease: "power3.out",
							});
						}

						// Trigger about content and tech icons animation
						if (
							progress >= aboutPanelVisible &&
							aboutContentRef.current &&
							!aboutContentRef.current.hasAttribute("data-animated")
						) {
							aboutContentRef.current.setAttribute("data-animated", "true");

							// Animate about content
							gsap.to(aboutContentRef.current.children, {
								y: 0,
								opacity: 1,
								duration: 1.2,
								stagger: 0.2,
								ease: "power3.out",
							});

							// Animate tech icons after a short delay
							setTimeout(() => {
								if (
									aboutContentRef.current &&
									aboutContentRef.current.animateTechIconsIn
								) {
									aboutContentRef.current.animateTechIconsIn();
								}
							}, 800);
						}

						// Reset animations when scrolling back
						if (
							progress < aboutPanelStart &&
							aboutContentRef.current &&
							aboutContentRef.current.hasAttribute("data-animated")
						) {
							aboutContentRef.current.removeAttribute("data-animated");

							gsap.set(aboutContentRef.current.children, {
								y: 80,
								opacity: 0,
							});

							// Reset tech icons
							if (
								aboutContentRef.current &&
								aboutContentRef.current.resetTechIcons
							) {
								aboutContentRef.current.resetTechIcons();
							}
						}
					},
				},
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			id="about"
			ref={sectionRef}
			className="relative h-screen overflow-hidden">
			<div ref={containerRef} className="flex absolute w-[200vw] h-screen">
				<ProfilePanel scrambledTextRef={scrambledTextRef} />
				<AboutPanel aboutContentRef={aboutContentRef} />
			</div>
		</section>
	);
}
