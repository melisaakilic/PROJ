// src/pages/books/BookDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import booksService from '../../services/booksService';
import './BookDetail.scss';

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await booksService.getBookById(id);
        setBook(data);
      } catch (error) {
        setError('Failed to load book details');
        console.error('Error fetching book:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <div className="loading"></div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!book) return <div className="not-found">Book not found</div>;

  return (
    <div className="book-detail-container">
      <div className="book-header">
        <h1>{book.name}</h1>
        <div className="book-meta">
          <span className="publication-year">{book.publicationYear}</span>
          <span className="stock">Stock: {book.stock}</span>
        </div>
      </div>
      
      <div className="book-content">
        <div className="book-info">
          <h2>Book Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <h3>Author</h3>
              <p>{book.author?.name || 'Unknown'}</p>
            </div>
            <div className="info-item">
              <h3>Publisher</h3>
              <p>{book.publisher?.name || 'Unknown'}</p>
            </div>
            <div className="info-item">
              <h3>Categories</h3>
              <div className="categories-list">
                {book.categories?.map(category => (
                  <span key={category.id} className="category-tag">
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="info-item">
              <h3>Status</h3>
              <p className={`status ${book.stock > 0 ? 'available' : 'unavailable'}`}>
                {book.stock > 0 ? 'Available' : 'Out of Stock'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="borrow-history">
          <h2>Borrowing History</h2>
          {/* Ödünç alma geçmişi burada gösterilecek */}
        </div>
      </div>
    </div>
  );
}

export default BookDetail;