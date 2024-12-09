import React, { useState } from "react";
import { createWidget } from "../lib/apiService";
import {validateName, validateDescription, validatePrice} from "../lib/Validator";

const CreateWidget = () => {
    const [widget, setWidget] = useState({ name: "", description: "", price: "" });
    const [errors, setErrors] = useState({ name: "", description: "", price: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWidget((prevWidget) => ({ ...prevWidget, [name]: value }));

        // Validate the input on change
        let error = "";
        if (name === "name") error = validateName(value);
        if (name === "description") error = validateDescription(value);
        if (name === "price") error = validatePrice(value);

        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform final validation
        const nameError = validateName(widget.name);
        const descriptionError = validateDescription(widget.description);
        const priceError = validatePrice(widget.price);

        setErrors({ name: nameError, description: descriptionError, price: priceError });

        if (nameError || descriptionError || priceError) {
            console.error("Validation failed. Please correct the errors and try again.");
            return;
        }

        try {
            await createWidget(widget);
            console.log("Widget created successfully!");
            setWidget({ name: "", description: "", price: "" });
        } catch (error) {
            console.error("Error creating widget", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create Widget</h1>

            <div>
                <input
                    name="name"
                    value={widget.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            </div>

            <div>
                <input
                    name="description"
                    value={widget.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                />
                {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}
            </div>

            <div>
                <input
                    name="price"
                    type="number"
                    value={widget.price}
                    onChange={handleChange}
                    placeholder="Price"
                    required
                />
                {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
            </div>

            <button type="submit">Create</button>
        </form>
    );
};

export default CreateWidget;
