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
					className="w-3/5 text-sm md:text-lg text-center cursor-pointer p-5 border dark:border-none drop-shadow-lg rounded-md"
				>
					<option value="SCORE_DESC">HIGHEST SCORING ANIME</option>
					{/* <option value="SCORE">Sort by Most Lowest Score</option> */}
					<option value="POPULARITY_DESC">ALL TIME POPULAR</option>
					<option value="POPULARITY">LEAST POPULAR ANIME</option>
					<option value="TRENDING_DESC">TRENDING RIGHT NOW</option>
					{/* PTS = Popular This Season */}
					<option value="PTS">POPULAR THIS SEASON</option>
					{/* PUS = Popular This Season */}
					<option value="PUS">UPCOMING POPULAR ANIME FOR NEXT SEASON</option>
				</select>
			</div>
		</>
	);
}
