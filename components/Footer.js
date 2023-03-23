export default function Footer() {
	return (
		<>
			<footer className=" p-7 bottom-0 w-full bg-slate-200 bg-gradient-to-r from-green-300 to-green-500 dark:from-gray-500 dark:to-gray-900 text-white">
				<div className="flex text-center flex-col items-center justify-center">
					<h1 className="text-2xl font-semibold">By Whoong Zi Wei</h1>
					<h1 className="text-xl p-4 font-semibold">
						<a
							className="dark:text-green-400 text-gray-900 dark:hover:text-slate-500 hover:hover:text-green-300 transition-all ease-in"
							href="https://anilist.gitbook.io/anilist-apiv2-docs/"
							target={"_blank"}
						>
							{" "}
							Anime API
						</a>{" "}
						provided by Anilist
					</h1>
					<p className="text-xl font-medium">
						Visit this Website&apos;s Github
						<a
							className="dark:text-green-400 text-gray-900 dark:hover:text-slate-500 hover:hover:text-green-300 transition-all ease-in"
							href="https://github.com/ziwei531/anime-list-website"
							target={"_blank"}
						>
							{" "}
							Here
						</a>
					</p>
				</div>
			</footer>
		</>
	);
}
