import React from "react";
import Noise from "@/components/ui/noise";
import { ArrowBigDown } from "lucide-react";

export default function AdditionalPanel({ additionalRef }) {
	return (
		<div className="panel w-screen h-full text-4xl font-content font-bold relative overflow-hidden">
			<Noise
				patternSize={250}
				patternScaleX={1}
				patternScaleY={1}
				patternRefreshInterval={2}
				patternAlpha={15}
				className="z-0"
			/>
			<div className="absolute inset-0 flex items-center justify-center z-10 px-4 sm:px-6 lg:px-8">
				<div
					className="max-w-4xl flex flex-col items-center"
					ref={additionalRef}>
					<h3>
						Want to know about{" "}
						<span className="text-yellow-400">my project?</span>
					</h3>
					<p className="text-2xl">coba scroll deh</p>
					<ArrowBigDown size={40} />
				</div>
			</div>
		</div>
	);
}
