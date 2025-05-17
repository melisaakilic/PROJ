
import { authors } from '../utils/mockData';
import { toast } from 'react-toastify';

// Mock delay to simulate API call
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getAuthors = async () => {
  await delay(500); // Simülasyon için 500ms gecikme
  return [...authors];
};

const getAuthorById = async (id) => {
  await delay(300);
  const author = authors.find(a => a.id === parseInt(id));
  if (!author) throw new Error('Author not found');
  return {...author};
};

const createAuthor = async (authorData) => {
  await delay(800);
  const newId = Math.max(...authors.map(a => a.id), 0) + 1;
  const newAuthor = { id: newId, ...authorData };
  authors.push(newAuthor);
  toast.success('Yazar başarıyla eklendi');
  return { data: newAuthor, status: 201 };
};

const updateAuthor = async (id, updatedData) => {
  await delay(600);
  const index = authors.findIndex(a => a.id === parseInt(id));
  
  if (index === -1) {
    toast.error('Yazar bulunamadı');
    throw new Error('Author not found');
  }
  
  authors[index] = { ...authors[index], ...updatedData, id: parseInt(id) };
  toast.success('Yazar başarıyla güncellendi');
  return { data: authors[index], status: 200 };
};

const deleteAuthor = async (id) => {
  await delay(500);
  const index = authors.findIndex(a => a.id === parseInt(id));
  
  if (index === -1) {
    toast.error('Yazar bulunamadı');
    throw new Error('Author not found');
  }
  
  authors.splice(index, 1);
  toast.success('Yazar başarıyla silindi');
  return { status: 204 };
};

export default {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
