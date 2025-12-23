import ProductForm from "../components/ProductForm";

function AddProduct({ products, setProducts, showToast }) {
  return (
    <div className="page">
      <center><h2>Add Product</h2>
      <ProductForm products={products} setProducts={setProducts}  showToast={showToast} /></center>
    </div>
  );
}

export default AddProduct;
