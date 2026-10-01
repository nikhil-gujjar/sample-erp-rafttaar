import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./db.js";

const port = Number(process.env.PORT || 5000);

try {
  await connectDatabase();
  app.listen(port, () => console.log(`ERP running at http://localhost:${port}`));
} catch (error) {
  console.error("Failed to start ERP:", error);
  process.exit(1);
}
