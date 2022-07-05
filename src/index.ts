import logger from "jet-logger";
import server from "./server";
import "module-alias/register";

// Constants
const serverStartMsg = "Express server started on port: ",
  port = process.env.PORT || 5000;

// Start server
server.listen(port, () => {
  logger.info(serverStartMsg + port);
});
