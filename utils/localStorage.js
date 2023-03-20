let localStorage;

function getLocalStorage(localStorage) {
	if (typeof window !== "undefined") {
		localStorage = window.localStorage;

		if (
			localStorage.theme === "dark" ||
			(!("theme" in localStorage) &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
		) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}

		// Whenever the user explicitly chooses light mode
		// localStorage.theme = "light";

		// // Whenever the user explicitly chooses dark mode
		// localStorage.theme = "dark";
	}

	return localStorage;
}

getLocalStorage(localStorage);

export default localStorage;
