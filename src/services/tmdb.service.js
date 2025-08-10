import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const fetchFromTMDB = async (url) => {
	// Add API key as query parameter for TMDB v3 API
	const separator = url.includes('?') ? '&' : '?';
	const urlWithApiKey = `${url}${separator}api_key=${ENV_VARS.TMDB_API_KEY}`;

	try {
		if (ENV_VARS.NODE_ENV === 'development-proxy') {
			// Development: Use curl command for proxy compatibility
			const curlCommand = `curl -s -H "Accept: application/json" "${urlWithApiKey}"`;
			const { stdout, stderr } = await execAsync(curlCommand);

			if (stderr) {
				console.error("Curl stderr:", stderr);
				throw new Error(`Curl error: ${stderr}`);
			}

			const data = JSON.parse(stdout);
			return data;
		} else {
			// Production: Use axios directly (no proxy required)
			const response = await axios.get(urlWithApiKey, {
				headers: {
					'Accept': 'application/json',
				},
				timeout: 15000,
			});

			if (response.status !== 200) {
				throw new Error("Failed to fetch data from TMDB: " + response.statusText);
			}

			return response.data;
		}
	} catch (error) {
		console.error("TMDB Error:", error.message);
		throw error;
	}
};
