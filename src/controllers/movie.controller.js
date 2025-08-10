import { fetchFromTMDB } from "../services/tmdb.service.js";
import ApiUrl from "../config/apiUrl.js";

export async function getTrendingMovie(_, res) {
	try {
		const data = await fetchFromTMDB(`${ApiUrl.BASE_URL}/trending/movie/day?language=en-US`);
		const limited = data.results.slice(0, 5);
		res.json({ success: true, content: limited });
	} catch (error) {
		console.error("Error fetching trending movies:", error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function getNowPlayingMovies(_, res) {
	try {
		const data = await fetchFromTMDB(`${ApiUrl.BASE_URL}/movie/now_playing`);
		res.json({ success: true, content: data.results });
	} catch (error) {
		console.error("Error fetching now playing movies:", error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function getMovieTrailer(req, res) {
	const { id } = req.params;
	try {
		const data = await fetchFromTMDB(`${ApiUrl.BASE_URL}/movie/${id}/videos?language=en-US`);
		res.json({ success: true, trailer: data.results[0] });
	} catch (error) {
		if (String(error.message).includes("404")) {
			console.error("Movie trailer not found:", { id, error: error.message });
			return res.status(404).send(null);
		}
		console.error("Error fetching movie trailer:", error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function getMovieDetails(req, res) {
	const { id } = req.params;
	try {
		const data = await fetchFromTMDB(`${ApiUrl.BASE_URL}/movie/${id}?language=en-US`);
		res.status(200).json({ success: true, content: data });
	} catch (error) {
		if (String(error.message).includes("404")) {
			console.error("Movie details not found:", { id, error: error.message });
			return res.status(404).send(null);
		}
		console.error("Error fetching movie details:", error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function getSimilarMovies(req, res) {
	const { id } = req.params;
	try {
		const data = await fetchFromTMDB(`${ApiUrl.BASE_URL}/movie/${id}/similar?language=en-US&page=1`);
		res.status(200).json({ success: true, content: data.results });
	} catch (error) {
		console.error("Error fetching similar movies:", { id, error });
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function getRecommendationMovies(req, res) {
	const { id } = req.params;
	try {
		const data = await fetchFromTMDB(`${ApiUrl.BASE_URL}/movie/${id}/recommendations?language=en-US&page=1`);
		res.status(200).json({ success: true, content: data.results });
	} catch (error) {
		console.error("Error fetching recommendation movies:", { id, error });
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function getMoviesByCategory(req, res) {
	const { category } = req.params;
	try {
		const data = await fetchFromTMDB(`${ApiUrl.BASE_URL}/movie/${category}?language=en-US&page=1`);
		res.status(200).json({ success: true, content: data.results });
	} catch (error) {
		console.error("Error fetching movies by category:", { category, error });
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}
