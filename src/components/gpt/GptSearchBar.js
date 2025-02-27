"use client"

import { useRef } from "react"
import lang from "../../utils/constants/langConstants"
import { useDispatch, useSelector } from "react-redux"
import getGeminiModel from "../../utils/gemini" // Import the Gemini model instead of OpenAI
import { setGptMoviesSearch, setGptSearchBtnClicked } from "../../utils/slices/gptSlice"

const GptSearchBar = () => {
  const langCode = useSelector((store) => store.config.lang)
  const searchText = useRef(null)
  const dispatch = useDispatch()

  // TMDB Movie Search
  const handletmdbMoviesSearch = async (movie) => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
          },
        },
      )
      const movies = await data.json()
      return movies.results
    } catch (err) {
      console.error("Error in TMDB Movie Search: ", err)
    }
  }

  // Gemini Movie Search
  const handleGeminiMoviesSearch = async () => {
    try {
      // Reset search state
      dispatch(setGptSearchBtnClicked())
      dispatch(
        setGptMoviesSearch({
          gptSearchNames: null,
          gptSearchMovies: null,
        }),
      )

      const query =
        "Act as a Movie Recommendation system and suggest some movies for the query : " +
        searchText.current.value +
        ". Only give me names of 5 movies, comma-separated like the example result given ahead. Example is : Koi mil gya, Hera feri, Kabhi kushi kabhi gam, Dilwale, Dune"

      // Call Gemini API for response
      const model = getGeminiModel()
      const geminiResponse = await model.generateContent(query)
      const responseText = geminiResponse.response.text()

      // Debugging the Gemini search result
      console.log("Gemini Response: ", responseText)

      const getMovies = responseText.split(",")
      if (!getMovies || getMovies.length === 0) {
        throw new Error("No movies found in Gemini response")
      }

      // Trim spaces and fetch each movie from TMDB
      const promisesMovies = getMovies.map((movie) => handletmdbMoviesSearch(movie.trim()))

      // Wait for all promises to resolve
      const tmdbMoviesSearch = await Promise.all(promisesMovies)

      // Dispatch the results to Redux
      dispatch(
        setGptMoviesSearch({
          gptSearchNames: getMovies,
          gptSearchMovies: tmdbMoviesSearch,
        }),
      )
    } catch (err) {
      console.error("Error in Gemini Movies Search: ", err)
      alert("Please try again in 20 seconds. If the problem persists, check your network connection or API limits.")
    }
  }

  return (
    <>
      <div className="h-28 sm:h-32 md:h-40"></div>
      <div className="flex justify-center sticky top-[70px] md:top-20 z-30 px-2 sm:p-0">
        <form
          className="grid grid-cols-12 w-full sm:w-[70%] md:w-[50%] bg-black/60 p-3 rounded-full font-normal text-base sm:text-lg"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={searchText}
            className="col-span-9 px-6 py-2 rounded-s-full text-center text-black outline-none"
            type="text"
            placeholder={lang[langCode].placeholder}
          />
          <button
            className="col-span-3 rounded-r-full bg-red-700 hover:border-red-800 active:bg-red-900 outline-none"
            onClick={handleGeminiMoviesSearch}
          >
            {lang[langCode].search}
          </button>
        </form>
      </div>
    </>
  )
}

export default GptSearchBar

