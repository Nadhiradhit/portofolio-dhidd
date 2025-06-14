import { Roboto, Roboto_Slab } from "next/font/google";
import Navbar from "@/components/navbar/navbar";
import "./globals.css";

const roboto = Roboto({
	variable: "--font-roboto",
	weight: ["400", "500", "700"],
	subsets: ["latin"],
});

const robotoSlab = Roboto_Slab({
	variable: "--font-roboto-slab",
	weight: ["400", "700"],
	subsets: ["latin"],
});

export const metadata = {
	title: "NanSz",
	description: "Portofolio Nadhir Adhitya Z",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${roboto.variable} ${robotoSlab.variable} antialiased`}>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
