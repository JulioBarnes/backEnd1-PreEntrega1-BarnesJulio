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
    this.products.push(newProduct);
  }

  getProduct() {}

  getProductById() {}
}

const products = new ProductManager();

products.addProduct({
  title: "Producto 1",
  description: "Descripción del producto 1",
  price: 100,
  thumbnail: "https://example.com/thumbnail1.jpg",
  code: "123456789",
  stock: 10,
});

console.log(products.products);
