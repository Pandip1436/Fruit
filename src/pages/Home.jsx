import ProductList from "../components/ProductList";

function Home({ products, setProducts, showToast }) {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ProductList
        products={products}
        setProducts={setProducts}
        showToast={showToast}
      />
    </div>
  );
}

export default Home;
