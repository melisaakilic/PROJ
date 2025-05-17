
import { books, authors, publishers, categories } from '../utils/mockData';
import { toast } from 'react-toastify';

// Mock delay to simulate API call
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getBooks = async () => {
  await delay(500);
  return [...books];
};

const getBookById = async (id) => {
  await delay(300);
  const book = books.find(b => b.id === parseInt(id));
  if (!book) throw new Error('Book not found');
  return {...book};
};

const createBook = async (bookData) => {
  await delay(800);
  
  // İlişkili entity'leri işle
  let processedBook = { ...bookData };
  
  // Author ilişkisi
  if (bookData.author && bookData.author.id) {
    const authorId = parseInt(bookData.author.id);
    const author = authors.find(a => a.id === authorId);
    if (author) {
      processedBook.author = { ...author };
    }
  }
  
  // Publisher ilişkisi
  if (bookData.publisher && bookData.publisher.id) {
    const publisherId = parseInt(bookData.publisher.id);
    const publisher = publishers.find(p => p.id === publisherId);
    if (publisher) {
      processedBook.publisher = { ...publisher };
    }
  }
  
  // Categories ilişkisi
  if (bookData.categories) {
    // Eğer categories bir dizi ise
    if (Array.isArray(bookData.categories)) {
      const categoryIds = bookData.categories.map(c => 
        typeof c === 'object' ? parseInt(c.id) : parseInt(c)
      );
      processedBook.categories = categories.filter(c => 
        categoryIds.includes(c.id)
      );
    } 
    // Eğer categories bir obje ise (tek kategori seçilmişse)
    else if (typeof bookData.categories === 'object' && bookData.categories.id) {
      const categoryId = parseInt(bookData.categories.id);
      const category = categories.find(c => c.id === categoryId);
      if (category) {
        processedBook.categories = [{ ...category }];
      }
    }
  }
  
  const newId = Math.max(...books.map(b => b.id), 0) + 1;
  const newBook = { id: newId, ...processedBook };
  books.push(newBook);
  toast.success('Kitap başarıyla eklendi');
  return { data: newBook, status: 201 };
};

const updateBook = async (id, updatedData) => {
  await delay(600);
  const index = books.findIndex(b => b.id === parseInt(id));
  
  if (index === -1) {
    toast.error('Kitap bulunamadı');
    throw new Error('Book not found');
  }
  
  // İlişkili entity'leri işle (createBook ile aynı mantık)
  let processedBook = { ...updatedData };
  
  // Author ilişkisi
  if (updatedData.author && updatedData.author.id) {
    const authorId = parseInt(updatedData.author.id);
    const author = authors.find(a => a.id === authorId);
    if (author) {
      processedBook.author = { ...author };
    }
  }
  
  // Publisher ilişkisi
  if (updatedData.publisher && updatedData.publisher.id) {
    const publisherId = parseInt(updatedData.publisher.id);
    const publisher = publishers.find(p => p.id === publisherId);
    if (publisher) {
      processedBook.publisher = { ...publisher };
    }
  }
  
  // Categories ilişkisi
  if (updatedData.categories) {
    // Eğer categories bir dizi ise
    if (Array.isArray(updatedData.categories)) {
      const categoryIds = updatedData.categories.map(c => 
        typeof c === 'object' ? parseInt(c.id) : parseInt(c)
      );
      processedBook.categories = categories.filter(c => 
        categoryIds.includes(c.id)
      );
    } 
    // Eğer categories bir obje ise (tek kategori seçilmişse)
    else if (typeof updatedData.categories === 'object' && updatedData.categories.id) {
      const categoryId = parseInt(updatedData.categories.id);
      const category = categories.find(c => c.id === categoryId);
      if (category) {
        processedBook.categories = [{ ...category }];
      }
    }
  }
  
  books[index] = { ...books[index], ...processedBook, id: parseInt(id) };
  toast.success('Kitap başarıyla güncellendi');
  return { data: books[index], status: 200 };
};

const deleteBook = async (id) => {
  await delay(500);
  const index = books.findIndex(b => b.id === parseInt(id));
  
  if (index === -1) {
    toast.error('Kitap bulunamadı');
    throw new Error('Book not found');
  }
  
  books.splice(index, 1);
  toast.success('Kitap başarıyla silindi');
  return { status: 204 };
};

export default {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
