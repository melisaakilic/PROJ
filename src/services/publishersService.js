
import { publishers } from '../utils/mockData';
import { toast } from 'react-toastify';

// Mock delay to simulate API call
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getPublishers = async () => {
  await delay(500);
  return [...publishers];
};

const getPublisherById = async (id) => {
  await delay(300);
  const publisher = publishers.find(p => p.id === parseInt(id));
  if (!publisher) throw new Error('Publisher not found');
  return {...publisher};
};

const createPublisher = async (publisherData) => {
  await delay(800);
  const newId = Math.max(...publishers.map(p => p.id), 0) + 1;
  const newPublisher = { id: newId, ...publisherData };
  publishers.push(newPublisher);
  toast.success('Yayımcı başarıyla eklendi');
  return { data: newPublisher, status: 201 };
};

const updatePublisher = async (id, updatedData) => {
  await delay(600);
  const index = publishers.findIndex(p => p.id === parseInt(id));
  
  if (index === -1) {
    toast.error('Yayımcı bulunamadı');
    throw new Error('Publisher not found');
  }
  
  publishers[index] = { ...publishers[index], ...updatedData, id: parseInt(id) };
  toast.success('Yayımcı başarıyla güncellendi');
  return { data: publishers[index], status: 200 };
};

const deletePublisher = async (id) => {
  await delay(500);
  const index = publishers.findIndex(p => p.id === parseInt(id));
  
  if (index === -1) {
    toast.error('Yayımcı bulunamadı');
    throw new Error('Publisher not found');
  }
  
  publishers.splice(index, 1);
  toast.success('Yayımcı başarıyla silindi');
  return { status: 204 };
};

export default {
  getPublishers,
  getPublisherById,
  createPublisher,
  updatePublisher,
  deletePublisher,
};
