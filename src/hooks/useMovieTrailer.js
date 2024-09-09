import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideos } from "../utils/slices/moviesSlice";

const useMovieTrailer = (videoId) => {
	const dispatch = useDispatch();
	const trailerVideos = useSelector((store) => store.movies.trailerVideos);
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
			dispatch(addTrailerVideos(trailer));
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		!trailerVideos && getVideo();
	}, []);
};
export default useMovieTrailer;
