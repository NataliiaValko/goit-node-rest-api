import mongoose from "mongoose";

import app from "./app.js";
import { getValueEnv } from "./helpers/env.js";

mongoose
  .connect(getValueEnv("DB_HOST"))
  .then(() =>
    app.listen(getValueEnv("PORT"), () => {
      console.log("Database connection successful");
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
