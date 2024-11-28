class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    const { title, description, price, thumbnail, code, stock } = product;

    const newProduct = {
      id: this.products.length + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    const productExist = this.products.find((product) => product.code === code);
    if (productExist) {
      return console.log(
        `El producto con el código ${code} ingresado ya existe`
      );
    }

    const propertiesValues = Object.values(newProduct);
    if (propertiesValues.includes(undefined)) {
      return console.log("Todos los campos del producto son obligatorios!");
    }
    this.products.push(newProduct);
  }

  getProduct() {
    console.log(this.products);
  }

  getProductById(id) {
    const getProductId = this.products.find((product) => product.id === id);
    if (!getProductId) {
      console.log("Producto no encontrado");
    } else {
      console.log(getProductId);
    }
  }
}

const products = new ProductManager();

products.addProduct({
  title: "Producto 1",
  description: "Descripción del producto 1",
  price: 100,
  thumbnail: "https://example.com/thumbnail1.jpg",
  code: "001",
  stock: 10,
});

products.addProduct({
  title: "Producto 2",
  description: "Descripción del producto 2",
  price: 100,
  thumbnail: "https://example.com/thumbnail2.jpg",
  code: "002",
  stock: 10,
});

products.addProduct({
  title: "Producto 2",
  description: "Descripción del producto 2",
  price: 100,
  thumbnail: "https://example.com/thumbnail2.jpg",
  code: "002",
  stock: 10,
});

products.addProduct({
  title: "Producto 3",
  description: "Descripción del producto 3",
  price: 100,
  thumbnail: "https://example.com/thumbnail3.jpg",
  code: "003",
  stock: 10,
});

products.addProduct({
  title: "Producto 4",
  description: "Descripción del producto 4",
  price: 100,
  thumbnail: "https://example.com/thumbnail4.jpg",
  code: "004",
});

products.addProduct({
  title: "Producto 5",
  description: "Descripción del producto 5",
  price: 100,
  thumbnail: "https://example.com/thumbnail5.jpg",
  code: "005",
  stock: 10,
});

products.getProduct();
