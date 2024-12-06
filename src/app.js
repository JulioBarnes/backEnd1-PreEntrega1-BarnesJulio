import express from "express";
import cartsRoutes from "./router/carts.routes.js";
import productsRoutes from "./router/products.routes.js";
//
import handlebars from "express-handlebars";
import { Server } from "socket.io";

const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

app.use("/api/carts", cartsRoutes);
app.use("/api/products", productsRoutes);
app.use(express.static("public"));

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Un usuario conectado");
});

app.get("/", (req, res) => {
  res.render("index");
});
