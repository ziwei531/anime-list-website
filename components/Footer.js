export default function Footer() {
	return (
		<>
			<footer className="bg-slate-200 bg-gradient-to-r from-green-300 to-green-500 dark:from-gray-500 dark:to-gray-900 text-white">
				<div className="flex flex-col items-center justify-center p-10">
					<h1 className="text-2xl font-semibold">By Whoong Zi Wei</h1>
					<p className="text-xl font-medium">
						Visit this Website&apos;s Github
						<a
							className="dark:hover:text-slate-500 hover:hover:text-green-600 transition-all ease-in"
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
