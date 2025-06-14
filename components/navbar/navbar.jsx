"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Navbar() {
	const [isMenuOpen, setMenuOpen] = useState(false);
	const navRef = useRef(null);
	const mobileMenuRef = useRef(null);
	const menuItemsRef = useRef([]);

	const addToRefs = (el) => {
		if (el && !menuItemsRef.current.includes(el)) {
			menuItemsRef.current.push(el);
		}
	};

	useEffect(() => {
		gsap.set(navRef.current, {
			opacity: 0,
			y: -20,
		});

		gsap.to(navRef.current, {
			opacity: 1,
			y: 0,
			duration: 1.5,
			ease: "power2.out",
		});
	}, []);

	useEffect(() => {
		if (mobileMenuRef.current) {
			if (isMenuOpen) {
				gsap.set(mobileMenuRef.current, {
					display: "block",
					opacity: 0,
					y: -10,
				});
				gsap.to(mobileMenuRef.current, {
					opacity: 1,
					y: 0,
					duration: 0.3,
					ease: "power2.out",
				});

				// Animate menu items
				gsap.fromTo(
					menuItemsRef.current,
					{ opacity: 0, y: -10 },
					{
						opacity: 1,
						y: 0,
						duration: 0.2,
						stagger: 0.1,
						delay: 0.1,
						ease: "power2.out",
					}
				);
			} else {
				gsap.to(mobileMenuRef.current, {
					opacity: 0,
					y: -10,
					duration: 0.2,
					ease: "power2.in",
					onComplete: () => {
						gsap.set(mobileMenuRef.current, { display: "none" });
					},
				});
			}
		}
	}, [isMenuOpen]);

	const toggleMenu = () => {
		setMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setMenuOpen(false);
	};

	// Close menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				navRef.current &&
				!navRef.current.contains(event.target) &&
				window.innerWidth < 768
			) {
				setMenuOpen(false);
			}
		};

		const handleEscapeKey = (event) => {
			if (event.key === "Escape" && isMenuOpen) {
				setMenuOpen(false);
			}
		};

		if (isMenuOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			document.addEventListener("keydown", handleEscapeKey);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscapeKey);
		};
	}, [isMenuOpen]);

	useEffect(() => {
		if (isMenuOpen) {
			const scrollY = window.scrollY;

			const originalOverflow = document.body.style.overflow;
			const originalPosition = document.body.style.position;
			const originalTop = document.body.style.top;
			const originalWidth = document.body.style.width;

			document.body.style.overflow = "hidden";
			document.body.style.position = "fixed";
			document.body.style.top = `-${scrollY}px`;
			document.body.style.width = "100%";

			return () => {
				document.body.style.overflow = originalOverflow;
				document.body.style.position = originalPosition;
				document.body.style.top = originalTop;
				document.body.style.width = originalWidth;

				window.scrollTo(0, scrollY);
			};
		}
	}, [isMenuOpen]);

	return (
		<div className="w-full flex justify-center fixed top-0 left-0 z-50 py-2 sm:py-4 px-2 sm:px-4">
			<nav
				ref={navRef}
				className="font-body flex items-center justify-between px-3 sm:px-4 md:px-20 py-3 sm:py-5 bg-[#29292a]/90 backdrop-blur-md text-white font-semibold md:max-w-7xl w-full mx-auto rounded-md relative shadow-lg border border-[#29292a]">
				<div className="hidden md:flex items-center space-x-4">
					<Link
						href="/"
						className="text-sm border-2 border-white/80 hover:border-white px-3 py-1 rounded-full hover:bg-white/10 transition-all duration-200 hover:scale-105">
						Home
					</Link>
					<Link
						href="/projects"
						className="text-sm border-2 border-white/80 hover:border-white px-3 py-1 rounded-full hover:bg-white/10 transition-all duration-200 hover:scale-105">
						Projects
					</Link>
				</div>

				<div className="font-content text-xl sm:text-2xl font-normal">
					<Link href="/" className="hover:text-gray-300 transition-colors">
						<h2>NansZ</h2>
					</Link>
				</div>

				<div className="hidden md:flex items-center space-x-4">
					<Link
						href="/about"
						className="text-sm border-2 border-white/80 hover:border-white px-3 py-1 rounded-full hover:bg-white/10 transition-all duration-200 hover:scale-105">
						About
					</Link>
					<Link
						href="/contact"
						className="text-sm border-2 border-white/80 hover:border-white px-3 py-1 rounded-full hover:bg-white/10 transition-all duration-200 hover:scale-105">
						Contact
					</Link>
				</div>

				<button
					onClick={toggleMenu}
					className="md:hidden p-2 rounded-md hover:bg-white/10 transition-all duration-200"
					aria-label="Toggle menu"
					aria-expanded={isMenuOpen}>
					<div className="w-6 h-6 flex flex-col justify-center items-center">
						<span
							className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
								isMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
							}`}></span>
						<span
							className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
								isMenuOpen ? "opacity-0" : "opacity-100"
							}`}></span>
						<span
							className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
								isMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
							}`}></span>
					</div>
				</button>

				<div
					ref={mobileMenuRef}
					className="absolute top-full left-0 right-0 mt-2 bg-[#29292a] backdrop-blur-md rounded-md shadow-xl md:hidden border border-gray-700 min-h-[calc(100vh-100px)] max-h-[calc(100vh-100px)] overflow-hidden"
					style={{ display: "none" }}>
					<div className="flex flex-col space-y-6 p-4">
						<Link
							ref={addToRefs}
							href="/"
							onClick={closeMenu}
							className="text-2xl transition-all duration-200 text-start active:scale-95">
							Home
						</Link>
						<Link
							ref={addToRefs}
							href="/projects"
							onClick={closeMenu}
							className="text-2xl transition-all duration-200 text-start active:scale-95">
							Projects
						</Link>
						<Link
							ref={addToRefs}
							href="/about"
							onClick={closeMenu}
							className="text-2xl transition-all duration-200 text-start active:scale-95">
							About
						</Link>
						<Link
							ref={addToRefs}
							href="/contact"
							onClick={closeMenu}
							className="text-2xl transition-all duration-200 text-start active:scale-95">
							Contact
						</Link>
					</div>
				</div>
			</nav>
		</div>
	);
}
