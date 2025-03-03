import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import Product from "./models/product.model.js"; // Asegúrate de que la ruta sea correcta

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    // Leer productos desde el archivo JSON
    const productsPath = path.resolve("data", "products.json");
    const productsData = JSON.parse(fs.readFileSync(productsPath, "utf-8"));

    // Eliminar _id de cada producto para que Mongoose genere uno automáticamente
    productsData.forEach(product => {
      delete product._id;
    });

    // Limpiar productos anteriores
    await Product.deleteMany({});
    console.log("🗑️ Old products deleted");

    // Insertar productos
    await Product.insertMany(productsData);
    console.log("✅ Products inserted successfully");

    mongoose.connection.close();
  })
  .catch(err => {
    console.error("❌ Error connecting to MongoDB:", err);
  });
