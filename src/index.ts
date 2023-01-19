import Express from "express";
import path from "path";

import routes from "./routes/routes";

// EJS setup

const app = Express();
const port = 8080;
app.use(Express.json());
app.set("views", path.join(__dirname, "/views"));
app.use(
  Express.static(__dirname + "./public", {
    extensions: ["ejs", "css"],
  })
);
app.set("view engine", "ejs");
app.use(Express.urlencoded({ extended: true }));

app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
