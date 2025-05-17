
import React, { useState, useEffect } from "react";
import Modal from "../../modals";
import CategoryForm from "./CategoryForm";
import categoriesService from "../../services/categoriesService";
import { toast } from 'react-toastify';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch categories
  useEffect(() => {
    setLoading(true);
    categoriesService
      .getCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        toast.error("Kategoriler yüklenirken hata oluştu");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCategoryAdded = (newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
  };

  const handleDeleteCategory = (id) => {
    categoriesService
      .deleteCategory(id)
      .then(() => {
        setCategories((prev) => prev.filter((category) => category.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
        toast.error('Kategori silinirken hata oluştu');
      });
  }

  const handleEditCategory = (id) => {
    const categoryToEdit = categories.find((category) => category.id === id);
    setSelectedCategory(categoryToEdit);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleCategoryUpdated = (updatedCategory) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="toolbar">
            <button id="add-btn" onClick={() => {
              setIsEditing(false);
              setIsModalOpen(true);
              setSelectedCategory(null);
            }}
            >
              Add Category
            </button>
          </div>
          <div className="content">
            {categories.length === 0 ? (
              <p>No categories found. Click "Add Category" to create a new entry.</p>
            ) : (
              <table className="authors-table">
                <thead>
                  <tr className="table-header">
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.id} className="content-item">
                      <td>{category.id}</td>
                      <td>{category.name}</td>
                      <td>{category.description}</td>
                      <td className="btn-group">
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleEditCategory(category.id)}
                        >
                          <span className="material-symbols-outlined edit-icon">
                            edit
                          </span>
                          Edit
                        </button>
                        <button
                          id="delete-btn"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          <span className="material-symbols-outlined delete-icon">
                            delete
                          </span>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? "Edit Category" : "Add New Category"}
      >
        <CategoryForm 
          onClose={() => setIsModalOpen(false)} 
          onCategoryAdded={handleCategoryAdded} 
          isEditing={!!selectedCategory} 
          category={selectedCategory} 
          onCategoryUpdated={handleCategoryUpdated} 
        />
      </Modal>
    </>
  );
}

export default Categories;
