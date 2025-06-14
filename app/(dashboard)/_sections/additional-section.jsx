import ScrollReveal from "@/components/ui/scroll-reveal";

export default function AdditionalSection() {
	return (
		<section>
			<div className="h-[1000vh] flex items-center justify-center">
				<ScrollReveal
					baseOpacity={0}
					enableBlur={true}
					baseRotation={10}
					blurStrength={10}>
					U have any project?
				</ScrollReveal>
			</div>
		</section>
	);
}
