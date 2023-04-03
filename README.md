# A Simple Anime List Application

## Progress: Still In Progress

Technologies Used:

- Tailwind
- Next Js
- Graphql querying (I am now familiar with GraphQL!)
- Apollo and how to create pagination using .fetchMore()

It has both dark and light mode! Accomplished using tailwind

# This website will have (still deciding) functionalities
# This website will have (still deciding) functionalities

- Home page. Displays all the anime available. Will include a way for users to select what they wish to view. By default, it is the trending anime option.
- Search Function (hopefully im smart enough)
- When anime is clicked, users will be redirected to the individual Descriptions of the anime

# If you are in need of assistance with the graphQL querying

Understandably, anilist's querying tutorial/guide is not exactly widely available on the internet other than from their official documentation, which I find lacking. Hence, some especially beginners may find it difficult to implement their queries in a way that satisfies their needs. Hopefully my guide can assist a bit for those who chanced upon my repository.

1. https://anilist.github.io/ApiV2-GraphQL-Docs/ <- General Docs for what the query parameters mean
2. https://anilist.co/graphiql <- Playground for you to experiment and test out how you can construct your queries

For simple anime query via its id, my query looks like this. Take your time to decipher how the query's structure generally should be.

```javascript
const QUERY = gql`
	query GetAnime($id: Int!) {
		Media(type: ANIME, id: $id) {
			id
			title {
				userPreferred
			}
			coverImage {
				extraLarge
			}
			episodes
			genres
			description
			status
			averageScore
			meanScore
			popularity
			characters {
				edges {
					node {
						id
						name {
							userPreferred
						}
						image {
							large
							medium
						}
					}
					role
					voiceActors {
						id
						name {
							userPreferred
						}
						image {
							large
							medium
						}
					}
				}
			}
			startDate {
				year
				month
				day
			}
			endDate {
				year
				month
				day
			}
		}
	}
`;
```

You can replace the Media's parameter depending on your needs. Take note that it's $id because I'm dynamically inputting the id. Normally, you'll need to pass a number type in order to have it work.

The id will be passed in via useQuery. If you are unfamiliar with this code snippet, you may consult the apollo's documentation website to familiarize yourself of what was done here.

```javascript
const { loading, error, data } = useQuery(QUERY, {
	variables: { id: parseInt(animeID) },
});
```

```javascript
Media(type: ANIME, id: 21) // this is for searching anime based on its ID

Media(type: ANIME, search: "Blue Lock") //this is to search an anime based on string. Useful if you're implementating a search bar.
```

For queries with sort selections:

```javascript
QUERY = gql`
		query GetAnime($page: Int!, $perPage: Int!) {
			Page(page: $page, perPage: $perPage) {
				pageInfo {
					hasNextPage
					currentPage
				}
				media(type: ANIME, sort: POPULARITY_DESC, season: ${nextSeason}, seasonYear: ${currentYear}) {
					id
					title {
						userPreferred
					}
					coverImage {
						extraLarge
					}
				}
			}
		}
	`;
```

Note! To enable pagination, you must extract pageInfo's "hasNextPage," which returns a boolean. Hence, if you implement something like a load more button, if the hasNextPage is false, you should enforce the disabled functionality on the button.

The sort parameter has some selections for you to choose. For me personally, I've used 5 sorting options. Here are their definition.

- SCORE_DESC = highest to lowest
- SCORE = lowest to highest
- POPULARITY_DESC = most popular to least popular
- POPULARITY = least popular to most popular
- TRENDING_DESC = most trending to least trending
