import ProductList from "../components/ProductList";

function Home({ products, setProducts, showToast }) {
  return (
    <div className="page">
      <h2>Product List</h2>
      <ProductList products={products} setProducts={setProducts}  showToast={showToast} />
      
    </div>
  );
}

export default Home;
