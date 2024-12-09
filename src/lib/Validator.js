const validateName = (name) => {
    const nameRegex = /^[0-9_a-zA-Z\s]{3,100}$/;
    if (!nameRegex.test(name)) {
        return "Name must be a string between 3 and 100 characters.";
    }
    return "";
};

const validateDescription = (description) => {
    if (description.length < 5 || description.length > 1000) {
        return "Description must be between 5 and 1000 characters.";
    }
    return "";
};

const validatePrice = (price) => {
    const priceRegex = /^(?!0\d)\d{1,5}(\.\d{1,2})?$/;
    const priceValue = parseFloat(price);
    if (!priceRegex.test(price) || priceValue < 1 || priceValue > 20000) {
        return "Price must be a number between 1 and 20,000 with up to 2 decimal places.";
    }
    return "";
};

export {validateName, validateDescription, validatePrice};