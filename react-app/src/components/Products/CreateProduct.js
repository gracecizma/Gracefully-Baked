import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNewProduct } from "../../store/products";


export default function CreateProduct() {
  const dispatch = useDispatch()
  const history = useHistory()
  const currUser = useSelector((state) => state?.session?.user)

  if (!currUser) {
    history.push("/login")
  }

  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const validate = () => {
    const validationErrors = {};
    if (!name) validationErrors.name = "Name is required";
    if (!description) validationErrors.description = "Description is required";
    if (description && description.length < 20) validationErrors.description = "Description must be at least 20 characters";
    if (!price) validationErrors.price = "Price is required";
    if (!quantity) validationErrors.quantity = "Amount in stock is required";
    if (!imageUrl) validationErrors.imageUrl = "Preview image is required";
    if (imageUrl && !/\.(jpe?g|png)$/i.test(imageUrl)) {
      validationErrors.imageURL = 'Image URL must end in .png, .jpg, or .jpeg';
    }
    return validationErrors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors)

    if (!Object.values(validationErrors).length) {
      const product = {
        "name": name,
        "description": description,
        "price": parseFloat(price),
        "quantity": quantity,
        "seller_id": currUser.id,
        "image_url": imageUrl
      }

      const newProductObj = await dispatch(createNewProduct(product))
      if (newProductObj) history.push(`/products/${newProductObj.id}`)
    } else {
      return;
    }
  }


  return (
    <>
      <div className="create-product-container">
        <div className="create-product-form">
          <div className="create-header-container">
            <h1>Create a New Product</h1>
            <h2>Tell us about your recipe!</h2>
          </div>
          <form onSubmit={handleSubmit}>

            <div className="create-name-container">
              <label> Name {errors.name &&
                <span className="error-message">{errors.name}</span>}
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Name"
                />
              </label>
            </div>

            <div className="create-description-container">
              <label> Describe your recipe! Get creative and tell us what you love about it. {errors.description &&
                <span className="error-message">{errors.description}</span>}
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  placeholder="If your recipe will be ordered as multiples, for example a dozen cookies, please say so here."
                  className="description-input"
                />
              </label>
            </div>

            <div className="create-price-container">
              <label> Set a base price for your recipe {errors.price &&
                <span className="error-message">{errors.price}</span>}
                <input
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  type="text"
                  placeholder="Price"
                />
              </label>
            </div>

            <div className="create-quantity-container">
              <label> How many are available to be ordered at once? {errors.quantity &&
                <span className="error-message">{errors.quantity}</span>}
                <input
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  type="text"
                  placeholder="quantity"
                />
              </label>
            </div>

            <div className="create-photo-container">
              <label>Add a picture of your masterpiece! {errors.imageUrl &&
                <span className="error-message">{errors.imageUrl}</span>}
                <input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  type="text"
                  placeholder="must be .png, .jpg, or .jpeg file"
                />
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="submit-button"
              >
                Create Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )



}
