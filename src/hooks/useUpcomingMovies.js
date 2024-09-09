import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../utils/slices/moviesSlice";
import { useEffect } from "react";

const useUpcomingMovies = () => {
	const dispatch = useDispatch();
	const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);
	const getUpcomingMovies = async () => {
		try {
			const response = await fetch(
				"https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
				{
					method: 'GET',
					headers: {
						accept: 'application/json',
						Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
					}
				}
			);
			const json = await response.json();
			dispatch(addUpcomingMovies(json.results));
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		!upcomingMovies && getUpcomingMovies();
	}, []);
};

export default useUpcomingMovies;
