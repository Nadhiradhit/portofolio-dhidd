"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ProfilePanel from "./profile-panel";
import AboutPanel from "./about-panel";
import AdditionalPanel from "./additional-panel";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
	const sectionRef = useRef(null);
	const containerRef = useRef(null);
	const aboutContentRef = useRef(null);
	const scrambledTextRef = useRef(null);
	const additionalRef = useRef(null);

	useGSAP(() => {
		const ctx = gsap.context(() => {
			const panels = gsap.utils.toArray(".panel");

			if (aboutContentRef.current) {
				gsap.set(aboutContentRef.current.children, {
					y: 80,
					opacity: 0,
				});
			}

			if (scrambledTextRef.current) {
				gsap.set(scrambledTextRef.current, {
					y: 100,
					opacity: 0,
				});
			}

			if (additionalRef.current) {
				gsap.set(additionalRef.current.children, {
					y: 80,
					opacity: 0,
				});
			}

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
						const profilePanelEnd = 0.1;
						const aboutPanelStart = 0.2;
						const aboutPanelVisible = 0.4;
						const aboutPanelEnd = 0.6;
						const additionalPanelStart = 0.65;
						const additionalPanelVisible = 0.75;

						if (
							progress <= profilePanelEnd &&
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

						if (
							progress >= aboutPanelVisible &&
							progress < aboutPanelEnd &&
							aboutContentRef.current &&
							!aboutContentRef.current.hasAttribute("data-animated")
						) {
							aboutContentRef.current.setAttribute("data-animated", "true");

							gsap.to(aboutContentRef.current.children, {
								y: 0,
								opacity: 1,
								duration: 1.2,
								stagger: 0.2,
								ease: "power3.out",
							});

							setTimeout(() => {
								if (
									aboutContentRef.current &&
									aboutContentRef.current.animateTechIconsIn
								) {
									aboutContentRef.current.animateTechIconsIn();
								}
							}, 800);
						}

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

							if (
								aboutContentRef.current &&
								aboutContentRef.current.resetTechIcons
							) {
								aboutContentRef.current.resetTechIcons();
							}
						}

						if (
							progress >= additionalPanelVisible &&
							additionalRef.current &&
							!additionalRef.current.hasAttribute("data-animated")
						) {
							additionalRef.current.setAttribute("data-animated", "true");

							gsap.to(additionalRef.current.children, {
								y: 0,
								opacity: 1,
								duration: 1.2,
								stagger: 0.15,
								ease: "power3.out",
							});
						}

						if (
							progress < additionalPanelStart &&
							additionalRef.current &&
							additionalRef.current.hasAttribute("data-animated")
						) {
							additionalRef.current.removeAttribute("data-animated");

							gsap.set(additionalRef.current.children, {
								y: 80,
								opacity: 0,
							});
						}

						if (
							progress >= aboutPanelEnd &&
							aboutContentRef.current &&
							aboutContentRef.current.hasAttribute("data-animated")
						) {
							aboutContentRef.current.removeAttribute("data-animated");

							gsap.to(aboutContentRef.current.children, {
								y: 80,
								opacity: 0,
								duration: 0.8,
								stagger: 0.1,
								ease: "power3.in",
							});

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
			<div ref={containerRef} className="flex absolute w-[300vw] h-screen">
				<ProfilePanel scrambledTextRef={scrambledTextRef} />
				<AboutPanel aboutContentRef={aboutContentRef} />
				<AdditionalPanel additionalRef={additionalRef} />
			</div>
		</section>
	);
}
