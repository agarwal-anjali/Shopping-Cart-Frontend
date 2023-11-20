export const getProducts = () => {
    return [
      { id: 1, name: 'Product 1', price: 10.99 },
      { id: 2, name: 'Product 2', price: 15.99 },
      // Add more products as needed
    ];
  };

// export const getProductsFromAPI = async () => {
//   try {
//     const response = await fetch('http://localhost:5000/api/user/products');
//     if (!response.ok) {
//       throw new Error('Failed to fetch products');
//     }
//     const data = await response.json();
//     return data.products;
//   } catch (error) {
//     console.error('Error fetching products:', error.message);
//     return [];
//   }
// };