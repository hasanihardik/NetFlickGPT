import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/slices/moviesSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
	const nowPlayingMovies = useSelector(
		(store) => store.movies.nowPlayingMovies
	);
	const dispatch = useDispatch();
	const getNowPlayingMovies = async () => {
		try {
			const response = await fetch(
				"https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
				{
					method: 'GET',
					headers: {
						accept: 'application/json',
						Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
					}
				}
			);
			const json = await response.json();
			dispatch(addNowPlayingMovies(json.results));
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		!nowPlayingMovies && getNowPlayingMovies();
	}, []);
};

export default useNowPlayingMovies;
