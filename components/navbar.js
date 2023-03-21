import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function Navbar() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<>
			<div className="sticky top-0 z-50 flex p-10 justify-between bg-slate-200 bg-gradient-to-r from-green-300 to-green-500 dark:from-gray-500 dark:to-gray-900">
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
