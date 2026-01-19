import ProductForm from "../components/ProductForm";

function AddProduct({ products, setProducts, showToast }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-xl">
        <ProductForm
          products={products}
          setProducts={setProducts}
          showToast={showToast}
        />
      </div>
    </div>
  );
}

export default AddProduct;
