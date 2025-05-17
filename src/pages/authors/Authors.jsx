import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import AuthorForm from "./AuthorForm";
import authorsService from "../../services/authorsService";
import { toast } from 'react-toastify';

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [confirmDelete, setConfirmDelete] = useState({ show: false, id: null });

  // Fetch authors
  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    setLoading(true);
    try {
      const data = await authorsService.getAuthors();
      setAuthors(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching authors:", error);
      setError("Failed to load authors. Please try again later.");
      toast.error("Error loading authors");
    } finally {
      setLoading(false);
    }
  };

  const handleAuthorAdded = (newAuthor) => {
    setAuthors((prev) => [...prev, newAuthor]);
  };

  const handleDeleteClick = (id) => {
    setConfirmDelete({ show: true, id });
  };

  const handleDeleteConfirm = async () => {
    const { id } = confirmDelete;
    
    if (!id) return;
    
    try {
      await authorsService.deleteAuthor(id);
      setAuthors((prev) => prev.filter((author) => author.id !== id));
      toast.success('Author deleted successfully');
      setConfirmDelete({ show: false, id: null });
    } catch (error) {
      console.error("Error deleting author:", error);
      toast.error('Error deleting author');
    }
  };

  const handleDeleteCancel = () => {
    setConfirmDelete({ show: false, id: null });
  };

  const handleEditAuthor = (id) => {
    const authorToEdit = authors.find((author) => author.id === id);
    setSelectedAuthor(authorToEdit);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleAuthorUpdated = (updatedAuthor) => {
    if (!updatedAuthor || !updatedAuthor.id) {
      console.error('Updated Author is invalid:', updatedAuthor);
      return;
    }
    setAuthors((prevAuthors) =>
      prevAuthors.map((author) =>
        author.id === updatedAuthor.id ? updatedAuthor : author
      )
    );
  };

  const showSuccessToast = (message) => {
    toast.success(message);
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Get sorted and filtered authors
  const getSortedAndFilteredAuthors = () => {
    const filteredAuthors = authors.filter((author) => 
      author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      author.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (sortConfig.key !== '') {
      filteredAuthors.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filteredAuthors;
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Get sort indicator
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) {
      return <span className="sort-icon">↕</span>;
    }
    return sortConfig.direction === 'asc' 
      ? <span className="sort-icon">↑</span> 
      : <span className="sort-icon">↓</span>;
  };

  return (
    <div className="authors-container">
      {error && <div className="error-message">{error}</div>}
      
      <div className="toolbar">
        <div className="search-box">
          <span className="material-symbols-outlined">search</span>
          <input
            type="text"
            placeholder="Search authors..."
            value={searchTerm}
            onChange={handleSearch}
          />
          {searchTerm && (
            <button 
              className="clear-search" 
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
        </div>
        
        <button 
          id="add-btn" 
          onClick={() => {
            setIsEditing(false);
            setIsModalOpen(true);
            setSelectedAuthor(null);
          }}
        >
          <span className="material-symbols-outlined">add</span>
          Add Author
        </button>
      </div>
      
      <div className="content-section">
        {loading ? (
          <div className="loading"></div>
        ) : getSortedAndFilteredAuthors().length === 0 ? (
          <div className="empty-state">
            <span className="material-symbols-outlined">person_off</span>
            <h3>No authors found</h3>
            <p>
              {searchTerm 
                ? `No authors matching "${searchTerm}". Try a different search term.` 
                : 'Your library does not have any authors yet. Click "Add Author" to create one.'}
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th onClick={() => requestSort('id')}>
                    ID {getSortIndicator('id')}
                  </th>
                  <th onClick={() => requestSort('name')}>
                    Name {getSortIndicator('name')}
                  </th>
                  <th onClick={() => requestSort('birthDate')}>
                    Birth Date {getSortIndicator('birthDate')}
                  </th>
                  <th onClick={() => requestSort('country')}>
                    Country {getSortIndicator('country')}
                  </th>
                  <th>Books</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {getSortedAndFilteredAuthors().map((author) => (
                  <tr key={author.id} className="content-item">
                    <td>{author.id}</td>
                    <td>{author.name}</td>
                    <td>{formatDate(author.birthDate)}</td>
                    <td>{author.country}</td>
                    <td>{author.books?.length || 0}</td>
                    <td className="btn-group">
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleEditAuthor(author.id)}
                        title="Edit author"
                      >
                        <span className="material-symbols-outlined">edit</span>
                        <span className="btn-text">Edit</span>
                      </button>
                      <button
                        id="delete-btn"
                        onClick={() => handleDeleteClick(author.id)}
                        title="Delete author"
                      >
                        <span className="material-symbols-outlined">delete</span>
                        <span className="btn-text">Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? "Edit Author" : "Add New Author"}
      >
        <AuthorForm 
          onClose={() => setIsModalOpen(false)} 
          onAuthorAdded={handleAuthorAdded} 
          isEditing={!!selectedAuthor} 
          author={selectedAuthor} 
          onAuthorUpdated={handleAuthorUpdated} 
          showSuccessToast={showSuccessToast}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={confirmDelete.show}
        onClose={handleDeleteCancel}
        title="Confirm Delete"
        size="small"
      >
        <div className="confirm-modal-content">
          <p>Are you sure you want to delete this author?</p>
          <p className="warning-text">This action cannot be undone.</p>
          
          <div className="form-actions">
            <button 
              className="btn btn-secondary" 
              onClick={handleDeleteCancel}
            >
              Cancel
            </button>
            <button 
              className="btn btn-danger" 
              onClick={handleDeleteConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Authors;