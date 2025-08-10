import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";
import ApiUrl from "../config/apiUrl.js";

const DEFAULT_LANG = "en-US";
const DEFAULT_PAGE = 1;
const INCLUDE_ADULT = false;

export async function searchPerson(req, res) {
	const { query } = req.params;
	try {
		const url = `${ApiUrl.BASE_URL}/search/person?query=${encodeURIComponent(query)}&include_adult=${INCLUDE_ADULT}&language=${DEFAULT_LANG}&page=${DEFAULT_PAGE}`;
		const response = await fetchFromTMDB(url);

		if (!response.results?.length) {
			return res.status(404).send(null);
		}

		await User.findByIdAndUpdate(req.user._id, {
			$push: {
				searchHistory: {
					id: response.results[0].id,
					image: response.results[0].profile_path,
					title: response.results[0].name,
					searchType: "person",
					createdAt: new Date(),
				},
			},
		});

		res.status(200).json({ success: true, content: response.results });
	} catch (error) {
		console.error("Error in searchPerson controller:", error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function searchMovie(req, res) {
	const { query } = req.params;
	try {
		const url = `${ApiUrl.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=${INCLUDE_ADULT}&language=${DEFAULT_LANG}&page=${DEFAULT_PAGE}`;
		const response = await fetchFromTMDB(url);

		if (!response.results?.length) {
			return res.status(404).send(null);
		}

		await User.findByIdAndUpdate(req.user._id, {
			$push: {
				searchHistory: {
					id: response.results[0].id,
					image: response.results[0].poster_path,
					title: response.results[0].title,
					searchType: "movie",
					createdAt: new Date(),
				},
			},
		});

		res.status(200).json({ success: true, content: response.results });
	} catch (error) {
		console.error("Error in searchMovie controller:", error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function searchTv(req, res) {
	const { query } = req.params;
	try {
		const url = `${ApiUrl.BASE_URL}/search/tv?query=${encodeURIComponent(query)}&include_adult=${INCLUDE_ADULT}&language=${DEFAULT_LANG}&page=${DEFAULT_PAGE}`;
		const response = await fetchFromTMDB(url);

		if (!response.results?.length) {
			return res.status(404).send(null);
		}

		await User.findByIdAndUpdate(req.user._id, {
			$push: {
				searchHistory: {
					id: response.results[0].id,
					image: response.results[0].poster_path,
					title: response.results[0].name,
					searchType: "tv",
					createdAt: new Date(),
				},
			},
		});

		res.json({ success: true, content: response.results });
	} catch (error) {
		console.error("Error in searchTv controller:", error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function getSearchHistory(req, res) {
	try {
		res.status(200).json({ success: true, content: req.user.searchHistory });
	} catch (error) {
		console.error("Error getting search history:", error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function removeItemFromSearchHistory(req, res) {
	let { id } = req.params;
	id = parseInt(id, 10);

	try {
		await User.findByIdAndUpdate(req.user._id, {
			$pull: { searchHistory: { id } },
		});

		res.status(200).json({ success: true, message: "Item removed from search history" });
	} catch (error) {
		console.error("Error in removeItemFromSearchHistory controller:", error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}
