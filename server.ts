import { App } from "./src/app";
import { ErrorHandler } from "./src/shared/utils/error-handler";
const PORT = process.env.PORT || 8000;

const app = new App().getApp();

app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
