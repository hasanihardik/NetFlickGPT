import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/slices/moviesSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
	const popularMovies = useSelector((store) => store.movies.popularMovies);
	const dispatch = useDispatch();
	const getPopularMovies = async () => {
		try {
			const response = await fetch(
				"https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
				{
					method: 'GET',
					headers: {
						accept: 'application/json',
						Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
					}
				}
			);
			const json = await response.json();
			dispatch(addPopularMovies(json.results));
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		!popularMovies && getPopularMovies();
	}, []);
};

export default usePopularMovies;
