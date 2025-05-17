     
import React, { useState, useEffect } from "react";
import categoriesService from "../../services/categoriesService";
import { toast } from 'react-toastify';

function CategoryForm({ onClose, onCategoryAdded, onCategoryUpdated, isEditing, category }) {
    const [formData, setFormData] = useState({
        id: 0,
        name: "",
        description: ""
    });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Populate form when editing
    useEffect(() => {
        if (isEditing && category) {
            setFormData({
                id: category.id || 0,
                name: category.name || "",
                description: category.description || "",
            });
        } else {
            setFormData({
                id: 0,
                name: "",
                description: ""
            });
        }
        setError("");
    }, [isEditing, category]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.name) {
            setError("Category name is required");
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            if (isEditing) {
                // Update category
                const response = await categoriesService.updateCategory(category.id, formData);
                onCategoryUpdated(response.data);
                toast.success("Category updated successfully");
                onClose();
            } else {
                // Add new category
                const response = await categoriesService.createCategory(formData);
                onCategoryAdded(response.data);
                toast.success("Category added successfully");
                onClose();
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(error.message || "An error occurred");
            setError("An error occurred while saving the category. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="edit-form" onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}
            <div>
                <label>Category Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-actions">
                <button 
                    className="btn btn-secondary" 
                    type="button" 
                    onClick={onClose}
                    disabled={isSubmitting}
                >
                    Close
                </button>
                <button 
                    className="btn btn-primary" 
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Processing...' : isEditing ? "Save" : "Add"}
                </button>
            </div>
        </form>
    );
}

export default CategoryForm;
