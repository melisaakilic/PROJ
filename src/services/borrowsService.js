
import { borrows, books } from '../utils/mockData';
import { toast } from 'react-toastify';

// Mock delay to simulate API call
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getBorrows = async () => {
  await delay(500);
  return [...borrows];
};

const getBorrowById = async (id) => {
  await delay(300);
  const borrow = borrows.find(b => b.id === parseInt(id));
  if (!borrow) throw new Error('Borrow record not found');
  return {...borrow};
};

const createBorrow = async (borrowData) => {
  await delay(800);
  
  // İlişkili kitabı işle
  let processedBorrow = { ...borrowData };
  
  // bookForBorrowingRequest veya book ilişkisi
  const bookId = borrowData.bookForBorrowingRequest?.id || borrowData.book?.id;
  
  if (bookId) {
    const book = books.find(b => b.id === parseInt(bookId));
    if (book) {
      processedBorrow.book = { ...book };
    }
  }
  
  // Otomatik olarak bir ay sonrası için iade tarihi oluştur (eğer verilmemişse)
  if (!processedBorrow.returnDate) {
    const oneMonthLater = new Date();
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
    processedBorrow.returnDate = oneMonthLater.toISOString().split('T')[0];
  }
  
  const newId = Math.max(...borrows.map(b => b.id), 0) + 1;
  const newBorrow = { id: newId, ...processedBorrow };
  borrows.push(newBorrow);
  toast.success('Ödünç alma kaydı başarıyla eklendi');
  return { data: newBorrow, status: 201 };
};

const updateBorrow = async (id, updatedData) => {
  await delay(600);
  const index = borrows.findIndex(b => b.id === parseInt(id));
  
  if (index === -1) {
    toast.error('Ödünç alma kaydı bulunamadı');
    throw new Error('Borrow record not found');
  }
  
  // İlişkili kitabı işle (eğer varsa)
  let processedBorrow = { ...updatedData };
  
  // bookForBorrowingRequest veya book ilişkisi
  const bookId = updatedData.bookForBorrowingRequest?.id || updatedData.book?.id;
  
  if (bookId) {
    const book = books.find(b => b.id === parseInt(bookId));
    if (book) {
      processedBorrow.book = { ...book };
    }
  }
  
  borrows[index] = { ...borrows[index], ...processedBorrow, id: parseInt(id) };
  toast.success('Ödünç alma kaydı başarıyla güncellendi');
  return { data: borrows[index], status: 200 };
};

const deleteBorrow = async (id) => {
  await delay(500);
  const index = borrows.findIndex(b => b.id === parseInt(id));
  
  if (index === -1) {
    toast.error('Ödünç alma kaydı bulunamadı');
    throw new Error('Borrow record not found');
  }
  
  borrows.splice(index, 1);
  toast.success('Ödünç alma kaydı başarıyla silindi');
  return { status: 204 };
};

export default {
  getBorrows,
  getBorrowById,
  createBorrow,
  updateBorrow,
  deleteBorrow,
};
