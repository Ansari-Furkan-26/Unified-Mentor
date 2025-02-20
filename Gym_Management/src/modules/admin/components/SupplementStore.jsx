import { useEffect, useState } from 'react';
import { ref, push, set, update, remove, onValue } from 'firebase/database';
import { database } from '../../../firebase/firebase';
import { FaEdit, FaTrash } from 'react-icons/fa';

const SupplementStore = () => {
  const [products, setProducts] = useState({});
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    quantity: '',
    price: '',
    imageUrl: '',
  });

  const [updatingProductId, setUpdatingProductId] = useState(null);

  useEffect(() => {
    const productsRef = ref(database, 'products');
    const unsubscribe = onValue(productsRef, (snapshot) => {
      if (snapshot.exists()) {
        setProducts(snapshot.val());
      } else {
        setProducts({});
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleAddProduct = async () => {
    const productsRef = ref(database, 'products');
    const newProductRef = push(productsRef);

    await set(newProductRef, { ...productData });

    resetForm();
  };

  const handleUpdateProduct = async () => {
    if (!updatingProductId) return;

    const productRef = ref(database, `products/${updatingProductId}`);
    await update(productRef, { ...productData });

    setUpdatingProductId(null);
    resetForm();
  };

  const handleDeleteProduct = async (id) => {
    const productRef = ref(database, `products/${id}`);
    await remove(productRef);
  };

  const startUpdatingProduct = (id, product) => {
    setUpdatingProductId(id);
    setProductData(product);
  };

  const resetForm = () => {
    setProductData({
      name: '',
      description: '',
      quantity: '',
      price: '',
      imageUrl: '',
    });
    setUpdatingProductId(null);
  };

  return (
    <div className="px-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 mt-1 md:ml-0 ml-8">Supplement Store</h1>

      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={productData.name}
            onChange={handleChange}
            className="border p-2 w-full rounded text-sm sm:text-base"
          />
          <textarea
            name="description"
            placeholder="Product Description"
            value={productData.description}
            onChange={handleChange}
            className="border p-2 w-full rounded text-sm sm:text-base"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={productData.quantity}
            onChange={handleChange}
            className="border p-2 w-full rounded text-sm sm:text-base"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={productData.price}
            onChange={handleChange}
            className="border p-2 w-full rounded text-sm sm:text-base"
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={productData.imageUrl}
            onChange={handleChange}
            className="border p-2 w-full rounded text-sm sm:text-base"
          />
          {updatingProductId ? (
            <button
              onClick={handleUpdateProduct}
              className="bg-blue-500 text-white px-4 py-2 rounded text-sm sm:text-base"
            >
              Update Product
            </button>
          ) : (
            <button
              onClick={handleAddProduct}
              className="bg-green-500 text-white px-4 py-2 rounded text-sm sm:text-base">
              Add Product
            </button>
          )}
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        {Object.keys(products).length > 0 ? (
          <ul className="space-y-4">
            {Object.keys(products).map((key) => (
              <li key={key} className="border-b pb-4 last:border-none">
                <div className="flex sm:flex-row sm:items-center sm:space-x-4">
                  <img
                    src={products[key].imageUrl}
                    className="w-20 h-20 object-cover rounded"/>

                  <div className="flex-1 text-sm sm:text-base">
                    <p className="font-semibold text-gray-800">{products[key].name}</p>                    
                    <p className="text-gray-600  line-clamp-1">{products[key].description}</p>
                    <p className="text-gray-700">Quantity: {products[key].quantity}</p>
                    <p className="text-gray-700">Price: ₹{products[key].price}</p>
                  </div>
                  <div className="space-x-2 mt-3 sm:mt-0">
                    <button
                      onClick={() => startUpdatingProduct(key, products[key])}
                      className="bg-yellow-500 text-white px-3 py-2 rounded text-xs sm:text-sm">
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDeleteProduct(key)}
                      className="bg-red-500 text-white px-3 py-2 rounded text-xs sm:text-sm">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No products available. Add some!</p>
        )}
      </div>
    </div>
  );
};

export default SupplementStore;
