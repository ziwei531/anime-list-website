import { useRef } from "react";

export default function SelectList(props) {
	/*
        score_desc = highest to lowest
        score = lowest to highest
        popularity_desc = most popular to least popular
        popularity = least popular to most popular
        trending_desc = most trending to least trending
    */

	//develop a for loop that loops through the 5 options for the select element

	const selectRef = useRef(null);

	function handleOption(e) {
		selectRef.current = e.target.value;
		// console.log("selectRef.current: " + selectRef.current);
		props.selection(selectRef.current);
	}

	return (
		<>
			<div
				onChange={handleOption}
				className="p-5 flex justify-center items-center"
			>
				<select
					defaultValue={"TRENDING_DESC"}
					className="text-center cursor-pointer p-5 border dark:border-none drop-shadow-lg rounded-md"
				>
					<option value="SCORE_DESC">Sort by Most Highest Score</option>
					<option value="SCORE">Sort by Most Lowest Score</option>
					<option value="POPULARITY_DESC">Sort by Most Popular</option>
					<option value="POPULARITY">Sort by Least Popular</option>
					<option value="TRENDING_DESC">Sort by Most Trending</option>
				</select>
			</div>
		</>
	);
}
