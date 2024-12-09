import React, { useState } from "react";
import { updateWidget, getWidgetByName } from "../lib/apiService";
import {validateName, validateDescription, validatePrice} from "../lib/Validator";

const UpdateWidget = () => {
    //const [name, setName] = useState("");
    const [widget, setWidget] = useState({ name: "", description: "", price: "" });
    const [errors, setErrors] = useState({ name: "", description: "", price: "" });

    const handleFetch = async () => {
        try {
            const response = await getWidgetByName(widget.name);
            setWidget(response.data);
        } catch (error) {
            console.error("Widget not found", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWidget((prevWidget) => ({ ...prevWidget, [name]: value }));

        // Validate the input on change
        let error = "";
        if (name === "name") error = validateName(value);
        if (name === "description") error = validateDescription(value);
        if (name === "price") error = validatePrice(value);

        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
        setWidget((prevWidget) => ({ ...prevWidget, [name]: value }));
    };
/*
    const handleChange = (e) => {
        const { name, value } = e.target;
        setWidget((prevWidget) => ({ ...prevWidget, [name]: value }));
    };
*/
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
            await updateWidget(widget.name, widget);
            console.log("Widget updated successfully!");
        } catch (error) {
            console.error("Error updating widget", error);
        }
    };

    return (
        <div>
            <h1>Update Widget</h1>
            <input name="name" value={widget.name} onChange={handleChange} placeholder="Widget Name" />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            <button onClick={handleFetch}>Fetch Widget</button>
            <form onSubmit={handleSubmit}>
                <input
                    name="description"
                    value={widget.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                />
                {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}
                <input
                    name="price"
                    type="number"
                    value={widget.price}
                    onChange={handleChange}
                    placeholder="Price"
                    required
                />
                {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateWidget;
