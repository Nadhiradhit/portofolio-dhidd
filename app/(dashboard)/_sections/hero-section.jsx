"use client";
import SplitText from "@/components/ui/split-text";
import PixelTrail from "@/components/event/pixel-train";
import { MoveDown } from "lucide-react";

export default function HeroSection({ onScrollToAbout }) {
	return (
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
					onClick={onScrollToAbout}
					className="bg-background text-white px-4 py-2 rounded-full shadow-md border border-foreground transition flex items-center font-content text-lg">
					Scroll Down{" "}
					<span className="">
						<MoveDown size={20} />
					</span>
				</button>
			</div>
		</section>
	);
}
