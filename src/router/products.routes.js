import { Router } from "express";
import { ProductManager } from "../managers/ProductManager.js";

const router = Router();

const productsManager = new ProductManager();

router.get("/", async (req, res) => {
  const { limit } = req.query;
  try {
    const products = await productsManager.getProduct(limit);
    res.status(200).send(products);
  } catch (err) {
    console.error(err);
    res.send(err.message);
  }
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productsManager.getProductById(pid);
    res.status(200).send(product);
  } catch (err) {
    console.error(err);
    res.send(err.message);
  }
});

router.post("/", async (req, res) => {
  const body = req.body;
  try {
    const product = await productsManager.addProduct(body);
    res.status(201).send(product);
  } catch (err) {
    console.error(err);
    res.send(err.message);
  }
});

export default router;
