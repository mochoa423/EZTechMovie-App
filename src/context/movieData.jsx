const API_KEY = "56b92772faf635d8d434eaa65ef25eef";

// Helper to extract needed movie/show info
const parseResults = (results, type) => {
  return results.map((item) => ({
    id: item.id,
    title: type === "movie" ? item.title : item.name,
    poster_path: item.poster_path,
    release_year: (type === "movie" ? item.release_date : item.first_air_date || "").slice(0, 4),
  }));
};

export const fetchMovies = async () => {
  try {
    const responses = await Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`),
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=2`),
    ]);

    const results = await Promise.all(responses.map((res) => res.json()));
    const allMovies = [...results[0].results, ...results[1].results];
    return parseResults(allMovies, "movie");
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const fetchTVShows = async () => {
  try {
    const responses = await Promise.all([
      fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`),
      fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=2`),
    ]);

    const results = await Promise.all(responses.map((res) => res.json()));
    const allShows = [...results[0].results, ...results[1].results];
    return parseResults(allShows, "tv");
  } catch (error) {
    console.error("Error fetching TV shows:", error);
    return [];
  }
};
