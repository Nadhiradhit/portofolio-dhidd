import {
	Plus_Jakarta_Sans,
	Roboto_Slab,
	Edu_AU_VIC_WA_NT_Hand,
	Playfair,
} from "next/font/google";
import Navbar from "@/components/navbar/navbar";
import "./globals.css";

const playfair = Playfair({
	variable: "--font-playfair",
	weight: ["400", "500", "700"],
	subsets: ["latin"],
});

const plusjakarta = Plus_Jakarta_Sans({
	variable: "--font-plus-jakarta-sans",
	weight: ["400", "700"],
	subsets: ["latin"],
});

const eduAU = Edu_AU_VIC_WA_NT_Hand({
	variable: "--font-edu-au",
	weight: ["400"],
	subsets: ["latin"],
});

export const metadata = {
	title: "NanSz",
	description: "Portofolio Nadhir Adhitya Z",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${playfair.variable} ${plusjakarta.variable} ${eduAU.variable} antialiased`}>
				{/* <Navbar /> */}
				{children}
			</body>
		</html>
	);
}
