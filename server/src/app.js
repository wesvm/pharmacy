import express from "express";
import router from "./routes/index.js";
import errorMiddleware from "./middlewares/error.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.disable("x-powered-by");
app.use(express.json());
app.use(router);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
