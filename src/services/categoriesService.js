
import { categories } from '../utils/mockData';
import { toast } from 'react-toastify';

// Mock delay to simulate API call
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getCategories = async () => {
  await delay(500);
  return [...categories];
};

const getCategoryById = async (id) => {
  await delay(300);
  const category = categories.find(c => c.id === parseInt(id));
  if (!category) throw new Error('Category not found');
  return {...category};
};

const createCategory = async (categoryData) => {
  await delay(800);
  const newId = Math.max(...categories.map(c => c.id), 0) + 1;
  const newCategory = { id: newId, ...categoryData };
  categories.push(newCategory);
  toast.success('Kategori başarıyla eklendi');
  return { data: newCategory, status: 201 };
};

const updateCategory = async (id, updatedData) => {
  await delay(600);
  const index = categories.findIndex(c => c.id === parseInt(id));
  
  if (index === -1) {
    toast.error('Kategori bulunamadı');
    throw new Error('Category not found');
  }
  
  categories[index] = { ...categories[index], ...updatedData, id: parseInt(id) };
  toast.success('Kategori başarıyla güncellendi');
  return { data: categories[index], status: 200 };
};

const deleteCategory = async (id) => {
  await delay(500);
  const index = categories.findIndex(c => c.id === parseInt(id));
  
  if (index === -1) {
    toast.error('Kategori bulunamadı');
    throw new Error('Category not found');
  }
  
  categories.splice(index, 1);
  toast.success('Kategori başarıyla silindi');
  return { status: 204 };
};

export default {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
