import { Router } from "express";
import { CartManager } from "../managers/CartManager.js";
import { ProductManager } from "../managers/ProductManager.js";

const router = Router();

const cartsManager = new CartManager();
const productsManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const carts = await cartsManager.getCart();
    res.status(200).send(carts);
  } catch (err) {
    console.error(err);
    res.send(err.message);
  }
});
router.post("/", async (req, res) => {
  const body = req.body;
  try {
    const cart = await cartsManager.createCart(body);
    res.status(201).send(cart);
  } catch (err) {
    console.error(err);
    res.send(err.message);
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartsManager.getCartById(cid);
    res.status(200).send(cart);
  } catch (err) {
    console.error(err);
    res.send(err.message);
  }
});

//Utilizo el PUT porque pienso que es más lógico al estar 'añadiendo' antes que 'creando'
router.put("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const product = await productsManager.getProductById(pid);
    if (!product) throw new Error(`Product id ${pid} not found`);

    const cart = await cartsManager.addProductToCart(cid, pid);
    res.status(200).send(cart);
  } catch (err) {
    console.error(err);
    res.send(err.message);
  }
});

export default router;
