import React, { useEffect, useState } from "react";
import { getWidgets, deleteWidget } from "../lib/apiService";

const WidgetsList = () => {
    const [widgets, setWidgets] = useState([]);

    const fetchWidgets = async () => {
        try {
            const response = await getWidgets();
            setWidgets(response.data);
        } catch (error) {
            console.error("Error fetching widgets", error);
        }
    };

    const handleDelete = async (name) => {
        try {
            await deleteWidget(name);
            fetchWidgets();
        } catch (error) {
            console.error("Error deleting widget", error);
        }
    };

    useEffect(() => {
        fetchWidgets();
    }, []);

    return (
        <div>
            <h1>Widgets List</h1>
            <ul>
                {widgets.map((widget) => (
                    <li key={widget.name}>
                        <strong>{widget.name}</strong>: {widget.description} - ${widget.price}
                        <span>   </span><button onClick={() => handleDelete(widget.name)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WidgetsList;
