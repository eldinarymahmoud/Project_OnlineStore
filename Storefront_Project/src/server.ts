import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import usersRoute from "./handlers/users";
import productsRoute from "./handlers/products";
import ordersRoute from "./handlers/orders";

const app: express.Application = express();
const address: string = "0.0.0.0:8000";

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.listen(8000, function () {
  console.log(`starting app on: ${address}`);
});

productsRoute(app);
ordersRoute(app);
usersRoute(app);

export default app;
