import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function Navbar() {
	const { theme, setTheme } = useTheme();

	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [visible, setVisible] = useState(true);

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
			<div
				className={`${
					visible ? "top-0" : ""
				} sticky z-50 transition-all duration-150 ease-in-out flex p-10 justify-between bg-slate-200 bg-gradient-to-r from-green-300 to-green-500 dark:from-gray-500 dark:to-gray-900`}
			>
				<h1 className="hover:drop-shadow-lg dark:hover:text-white sm:hover:text-5xl transition-all duration-150 ease-out sm:hover:ease-infont-semibold text-4xl text-white drop-shadow-md m-auto">
					<Link href="/">Anime List</Link>
				</h1>
				<select
					className="p-3 cursor-pointer dark:hover:bg-cyan-600 rounded"
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
			</div>
		</>
	);
}
