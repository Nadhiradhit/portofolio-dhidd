"use client";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import HeroSection from "./_sections/hero-section";
import AboutSection from "./_sections/about-section";
import AdditionalSection from "./_sections/additional-section";

gsap.registerPlugin(ScrollToPlugin);

export default function Page() {
	const handleScrollToAbout = () => {
		const target = document.getElementById("about");
		if (target) {
			gsap.to(window, {
				duration: 1.2,
				scrollTo: { y: target, offsetY: 0 },
				ease: "power2.inOut",
			});
		}
	};

	return (
		<div>
			<HeroSection onScrollToAbout={handleScrollToAbout} />
			<AboutSection />
			<AdditionalSection />
		</div>
	);
}
