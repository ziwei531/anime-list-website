export default function Description() {
	return (
		<>
			<h1 className="text-center">This is the Description Page</h1>
		</>
	);
}

// export async function getStaticProps() {
// 	let searchQuery = "Blue Lock";
// 	const query = `
// 	query {
// 		Media (search: "${searchQuery}", type: ANIME) {
// 		  title {
// 			romaji
// 		  }
// 		  description
// 		}
// 	  }
// 	`;

// 	// const response = await fetch("https://learnwebcode.github.io/json-example/posts.json")
// 	const data = await request("https://graphql.anilist.co", query);

// 	console.log(data.Media);

// 	return {
// 		props: {
// 			anime: data.Media,
// 		},
// 	};
// }
