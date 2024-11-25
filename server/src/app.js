import express from "express";
import router from "./routes/index.js";
import errorHandler from "./middlewares/error.js";
import cors from "cors";
import "./lib/utils.js"

const app = express();
const PORT = process.env.PORT || 3000;
app.disable("x-powered-by");
app.use(express.json());
app.use(cors());
app.use("/api", router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
