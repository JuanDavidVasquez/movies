import { Category } from "../models/Category";

export const seedCategories = async () => {
  try {
    const categories = ["Terror", "Suspenso", "Drama", "Comedia"];

    for (const name of categories) {
      await Category.findOrCreate({ where: { name } });
    }

    console.log("✅ Categorías precargadas en la base de datos.");
  } catch (error) {
    console.error("❌ Error al precargar categorías:", error);
  }
};
