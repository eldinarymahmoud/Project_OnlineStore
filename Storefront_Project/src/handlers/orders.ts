import express, { Request, Response , NextFunction } from "express";
import { order, orders } from "../models/orders";
import jwt from "jsonwebtoken";

const orderstore = new orders();
/*************************************************************************/
// handler functions
const index = async (_req: Request, res: Response) => {
  try {
    const order = await orderstore.index();
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await orderstore.show(req.params.id as unknown as string);
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order: order = {
      id: req.body.id,
      user_id: req.body.user_id,
      orderstatus: req.body.orderstatus,
    };
    const newOrder = await orderstore.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await orderstore.delete(req.params.id as unknown as string);
    res.json(deleted);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const destroyOrder_products = async (req: Request, res: Response) => {
  try {
    const deleted = await orderstore.deleteOrder_products(
      req.params.id as unknown as string
    );
    res.json(deleted);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const addProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.id.toString();
  const productId: string = _req.body.productId;
  const quantity: number = parseInt(_req.body.quantity);

  try {
    const addedProduct = await orderstore.addProduct(
      quantity,
      orderId,
      productId
    );
    const failToObtainID = addedProduct.id;
    const failToObtainUser_ID = addedProduct.user_id;
    const failToObtainOrderStatus = addedProduct.orderstatus;

    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = req.get("Authorization");

    if (auth) {
      const bearer = auth.split(" ")[0].toLowerCase();
      const tok = auth.split(" ")[1];
      if (tok && bearer === "bearer") {
        const decode = jwt.verify(
          tok,
          process.env.TOKEN_SECRET as unknown as string
        );

        if (decode) {
          next();
        } else {
          res
            .status(401)
            .json({ status: 401, message: "Authentication failed" });
        }
      } else {
        res.status(401).json({ status: 401, message: "Authentication failed" });
      }
    } else {
      res.status(401).json({ status: 401, message: "Authentication failed" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, message: "Authentication failed" });
  }
};

const ordersRoute = (app: express.Application) => {
  app.route("/orders").get(validateToken, index);
  app.route("/orders/:id").get(validateToken, show);
  app.route("/orders").post(validateToken, create);
  app.route("/orders/:id").delete(validateToken, destroy);
  app.route("/orderproducts/:id").delete(validateToken, destroyOrder_products);
  app.route("/orders/:id/products").post(validateToken, addProduct);
  
};
/************************************************************************ */
export default ordersRoute;
