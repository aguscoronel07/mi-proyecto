import 'dotenv/config';
import express from "express";
import { sequelize } from "./db/connections";
import bookRoutes from "./routes/books";
import userRoutes from "./routes/User";



const app = express();
app.use(express.json());


app.use("/books", bookRoutes);
app.use("/users", userRoutes);

sequelize.sync().then(() => {
  console.log("Base de datos sincronizada");
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
  );
});

export default app;
