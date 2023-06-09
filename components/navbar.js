import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faChevronDown);

export default function Navbar(props) {
	const { theme, setTheme } = useTheme();
	const router = useRouter();

	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [value, setValue] = useState("");
	const [visible, setVisible] = useState(true);
	const [toggle, setToggle] = useState(false);

	const searchRef = useRef(null);
	const handleSubmit = (e) => {
		e.preventDefault();

		props.search(searchRef.current);
		const animeName = searchRef.current
			.trim()
			.replace(/\s+/g, "-")
			.toLowerCase();
		console.log(`Search Query on submit: "${animeName}"`);
		router.push(`/search/${animeName}`);
		setValue("");
	};

	const handleChange = (e) => {
		searchRef.current = e.target.value;
		setValue(e.target.value);
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

	//handle navbar on scroll
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	});

	return (
		<>
			<nav
				className={`${
					visible ? "top-0" : ""
				} sticky z-50 transition-all duration-150 ease-in-out md:pt-10 grid place-items-center justify-center place-content-center grid-cols-1 text-center gap-3 md:grid-cols-3 bg-slate-200 bg-gradient-to-r from-green-300 to-green-500 dark:from-gray-500 dark:to-gray-900`}
			>
				{/* Logo */}
				<h1 className="hover:drop-shadow-lg text-2xl md:text-4xl dark:hover:text-white sm:hover:text-5xl transition-all duration-150 ease-out sm:hover:ease-infont-semibold text-white drop-shadow-md m-auto">
					<Link href="/">Anime List</Link>
				</h1>
				{/* Search Bar */}
				<form
					className={`${
						toggle === false ? "hidden" : ""
					} md:flex items-center justify-center `}
					onSubmit={handleSubmit}
					autoComplete="off"
				>
					<input
						className={`p-3 h-9 rounded-l-md ${
							toggle === true ? "rounded-md" : ""
						}`}
						onChange={handleChange}
						value={value}
						required
						placeholder="Search Anime"
					/>
					<button
						className="
								dark:bg-gray-600 h-9 flex mx-auto mt-3 md:mt-0 items-center text-align dark:border-slate-400 bg-green-100 border-green-500 border dark:text-slate-100 text-emerald-950
								rounded-md p-2 hover:bg-green-300 dark:hover:bg-gray-800 ease-in transition-all"
						type="submit"
					>
						Search
					</button>
				</form>
				{/* Theme Switcher */}
				<select
					className={`p-1 md:p-2 ${
						toggle === false ? "hidden md:block" : ""
					} cursor-pointer h-10 md:w-28 dark:hover:bg-cyan-600 rounded`}
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

				<FontAwesomeIcon
					onClick={() => setToggle(!toggle)}
					className={`md:invisible ${
						toggle === true ? "rotate-180" : ""
					} cursor-pointer text-xl pb-1 text-white ease-linear transition-all duration-150`}
					icon={faChevronDown}
				/>
			</nav>
		</>
	);
}
