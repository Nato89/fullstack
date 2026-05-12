import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products';

export const getProducts = async () => {
  try {
    // Petición a la API para todos los productos
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    return []; // Retorna un array vacío si falla para que la app no se rompa
  }
};

export const getProductById = async (id) => {
  try {
    // Petición a la API para un producto específico por su ID
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo el producto ${id}:`, error);
    return null;
  }
};