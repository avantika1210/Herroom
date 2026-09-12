import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/product/${id}`);

      setName(res.data.name);
      setDescription(res.data.description);
      setPrice(res.data.price);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/product/${id}`, {
        name,
        description,
        price,
      });

      alert("Product Updated Successfully 🎉");

      navigate(-1);
    } catch (error) {
      console.log(error.response?.data);
      alert("Failed to Update Product ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>✏️ Edit Product</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Update Product
        </button>

      </form>
    </div>
  );
}

export default EditProduct;