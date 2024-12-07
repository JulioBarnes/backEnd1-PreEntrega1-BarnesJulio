import express from "express";
//import cartsRoutes from "./router/carts.routes.js";
//import productsRoutes from "./router/products.routes.js";
//
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import fs from "fs/promises";

const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("index");
});

//app.use("/api/carts", cartsRoutes);
//app.use("/api/products", productsRoutes);
app.use(express.static("public"));

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

const messagesFilePath = "./src/managers/data/messages.json";

const loadMessages = async () => {
  try {
    const data = await fs.readFile(messagesFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error al cargar mensajes:", error);
    return [];
  }
};

const saveMessages = async (messages) => {
  try {
    await fs.writeFile(messagesFilePath, JSON.stringify(messages));
  } catch (error) {
    console.error("Error al guardar mensajes:", error);
  }
};

let messages = [];

loadMessages().then((loadedMessages) => {
  messages = loadedMessages;
});

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log(`Un nuevo usuario conectado con id ${socket.id}`);

  socket.emit("messageLogs", messages);

  socket.on("newUser", (data) => {
    socket.broadcast.emit("newUser", data);
  });

  socket.on("message", async (data) => {
    messages.push(data);
    await saveMessages(messages);
    io.emit("messageLogs", messages);
  });
});
