import app from "./app.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const PORT = ENV_VARS.PORT;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
	console.log(`Environment: ${ENV_VARS.NODE_ENV}`);
	console.log(`Server started and listening on ${HOST}:${PORT}`);
	console.log(`Access locally at http://localhost:${PORT}`);
	connectDB();
});