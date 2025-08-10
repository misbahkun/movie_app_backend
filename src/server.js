import app from "./app.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const PORT = ENV_VARS.PORT;

app.listen(PORT, () => {
	console.log(`Environment: ${ENV_VARS.NODE_ENV}`)
	console.log("Server started at http://localhost:" + PORT);
	connectDB();
});
