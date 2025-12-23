// Simulated backend data
export const loadProducts = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Apple", quantity: 200, price: 150 },
        { id: 2, name: "Orange", quantity: 600, price: 80 },
      ]);
    }, 600);
  });
};
