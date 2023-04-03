import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function Navbar(props) {
	const { theme, setTheme } = useTheme();

	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [visible, setVisible] = useState(true);

	const searchRef = useRef(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		props.search(searchRef.current);
		const animeName = searchRef.current
			.trim()
			.replace(/\s+/g, "-")
			.toLowerCase();
		console.log(`"${animeName}"`);
	};

	const handleChange = (e) => {
		searchRef.current = e.target.value;
	};

	const handleScroll = () => {
		const currentScrollPos = window.scrollY;

		if (currentScrollPos > prevScrollPos) {
			setVisible(false);
		} else {
			setVisible(true);
		}

		setPrevScrollPos(currentScrollPos);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	});

	return (
		<>
			<nav
				className={`${
					visible ? "top-0" : ""
				} sticky z-50 transition-all duration-150 ease-in-out p-10 grid place-content-center place-items-center grid-cols-1 text-center gap-3 md:grid-cols-3  bg-slate-200 bg-gradient-to-r from-green-300 to-green-500 dark:from-gray-500 dark:to-gray-900`}
			>
				{/* Logo */}
				<h1 className="hover:drop-shadow-lg dark:hover:text-white sm:hover:text-5xl transition-all duration-150 ease-out sm:hover:ease-infont-semibold text-4xl text-white drop-shadow-md m-auto">
					<Link href="/">Anime List</Link>
				</h1>

				{/* Search Bar */}
				<form className="flex" onSubmit={handleSubmit}>
					<input
						className="p-3 rounded-l-md"
						onChange={handleChange}
						required
						placeholder="Search Anime"
					/>
					<button
						className="
					dark:bg-gray-600 dark:border-slate-400 bg-green-100 border-green-800
					rounded-md p-2 hover:bg-green-300 dark:hover:bg-gray-800 ease-in transition-all
					"
						type="submit"
					>
						Search
					</button>
				</form>

				{/* Theme Switcher */}
				<select
					className="p-3 cursor-pointer w-28 dark:hover:bg-cyan-600 rounded"
					value={theme}
					onChange={(e) => setTheme(e.target.value)}
				>
					<option className="cursor-pointer" value="dark">
						Dark
					</option>
					<option className="cursor-pointer" value="light">
						Light
					</option>
				</select>
			</nav>
		</>
	);
}
