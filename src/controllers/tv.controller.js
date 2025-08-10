import { fetchFromTMDB } from "../services/tmdb.service.js";
import ApiUrl from "../config/apiUrl.js";

const DEFAULT_LANG = "en-US";
const DEFAULT_PAGE = 1;

export async function getTrendingTv(req, res) {
	try {
		const data = await fetchFromTMDB(`${ApiUrl.BASE_URL}/trending/tv/day?language=${DEFAULT_LANG}`);
		const results = (data?.results ?? []).slice(0, 5);
		if (!results.length) return res.status(404).send(null);

		const trendingTv = results[Math.floor(Math.random() * results.length)];
		res.json({ success: true, content: trendingTv });
	} catch (error) {
		console.error("Error fetching trending TV:", error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function getPopularTv(req, res) {
	try {
		const data = await fetchFromTMDB(`${ApiUrl.BASE_URL}/tv/popular?language=${DEFAULT_LANG}&page=${DEFAULT_PAGE}`);
		res.json({ success: true, content: data.results });
	} catch (error) {
		console.error("Error fetching popular TV:", error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function getTvTrailers(req, res) {
	const { id } = req.params;
	try {
		const data = await fetchFromTMDB(`${ApiUrl.BASE_URL}/tv/${id}/videos?language=${DEFAULT_LANG}`);
		res.json({ success: true, trailers: data.results });
	} catch (error) {
		if (String(error.message).includes("404")) {
			console.error("TV trailers not found:", { id, error: error.message });
			return res.status(404).send(null);
		}
		console.error("Error fetching TV trailers:", error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function getTvDetails(req, res) {
	const { id } = req.params;
	try {
		const data = await fetchFromTMDB(`${ApiUrl.BASE_URL}/tv/${id}?language=${DEFAULT_LANG}`);
		res.status(200).json({ success: true, content: data });
	} catch (error) {
		if (String(error.message).includes("404")) {
			console.error("TV details not found:", { id, error: error.message });
			return res.status(404).send(null);
		}
		console.error("Error fetching TV details:", error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function getSimilarTvs(req, res) {
	const { id } = req.params;
	try {
		const data = await fetchFromTMDB(`${ApiUrl.BASE_URL}/tv/${id}/similar?language=${DEFAULT_LANG}&page=${DEFAULT_PAGE}`);
		res.status(200).json({ success: true, content: data.results });
	} catch (error) {
		console.error("Error fetching similar TVs:", { id, error });
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function getRecommendationTvs(req, res) {
	const { id } = req.params;
	try {
		const data = await fetchFromTMDB(`${ApiUrl.BASE_URL}/tv/${id}/recommendations?language=${DEFAULT_LANG}&page=${DEFAULT_PAGE}`);
		res.status(200).json({ success: true, content: data.results });
	} catch (error) {
		console.error("Error fetching recommendation TVs:", { id, error });
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function getTvsByCategory(req, res) {
	const { category } = req.params;
	try {
		const data = await fetchFromTMDB(`${ApiUrl.BASE_URL}/tv/${category}?language=${DEFAULT_LANG}&page=${DEFAULT_PAGE}`);
		res.status(200).json({ success: true, content: data.results });
	} catch (error) {
		console.error("Error fetching TVs by category:", { category, error });
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function getTvKeywords(req, res) {
	const { id } = req.params;
	try {
		const data = await fetchFromTMDB(`${ApiUrl.BASE_URL}/tv/${id}/keywords`);
		res.status(200).json({ success: true, content: data.results });
	} catch (error) {
		console.error("Error fetching TV keywords:", { id, error });
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}
