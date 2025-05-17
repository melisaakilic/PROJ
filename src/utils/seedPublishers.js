
import publishersService from '../services/publishersService';

const publishersData = [
  // Yayıncı verileri
];

const seedPublishers = async () => {
  try {
    const existingPublishers = await publishersService.getPublishers();
    if (existingPublishers.length === 0) {
      for (const publisher of publishersData) {
        await publishersService.createPublisher(publisher);
      }
      console.log("Yayıncılar eklendi!");
    }
  } catch (error) {
    console.error("Yayıncıları eklerken hata oluştu:", error);
  }
};

export default seedPublishers;
