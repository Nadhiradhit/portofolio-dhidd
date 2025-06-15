"use client";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import HeroSection from "./_sections/hero-section";
import AboutSection from "./_sections/about-section";
import ProjectSection from "./_sections/project-section";
import SkillSection from "./_sections/skill-section";
import FooterSection from "./_sections/footer-section";
import ExperienceSection from "./_sections/experience-section";

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
			<ProjectSection />
			<SkillSection />
			<ExperienceSection />
			<FooterSection />
		</div>
	);
}
