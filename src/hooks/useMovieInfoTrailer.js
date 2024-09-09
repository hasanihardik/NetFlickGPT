import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMovieInfoTrailer } from "../utils/slices/moviesSlice";

const useMovieInfoTrailer = (videoId) => {
	const dispatch = useDispatch();
	const getVideo = async () => {
		try {
			const response = await fetch(
				`https://api.themoviedb.org/3/movie/${videoId}/videos?language=en-US`,
				{
					method: 'GET',
					headers: {
						accept: 'application/json',
						Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
					}
				}
			);
			const data = await response.json();
			const filterData = data.results?.filter(
				(data) => data.type === "Trailer"
			);
			const trailer = filterData.length ? filterData[0] : data.results[0];
			dispatch(addMovieInfoTrailer(trailer));
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getVideo();
	}, []);
};
export default useMovieInfoTrailer;
