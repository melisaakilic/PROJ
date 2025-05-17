
import axios from 'axios';

const publishers = [
  {
    name: "YKY (Yapı Kredi Yayınları)",
    address: "İstiklal Caddesi No:142, Beyoğlu, İstanbul",
    phone: "0212 252 47 00",
    email: "info@ykykultur.com.tr",
    foundedYear: "1945"
  },
  {
    name: "Can Yayınları",
    address: "Hayriye Caddesi No:2, Galatasaray, İstanbul",
    phone: "0212 252 56 75",
    email: "info@canyayinlari.com",
    foundedYear: "1981"
  },
  {
    name: "İletişim Yayınları",
    address: "Binbirdirek Meydanı Sokak, Fatih, İstanbul",
    phone: "0212 516 22 60",
    email: "iletisim@iletisim.com.tr",
    foundedYear: "1982"
  },
  {
    name: "Pegasus Yayınları",
    address: "Ankara Caddesi No:40, Sirkeci, İstanbul",
    phone: "0212 513 90 00",
    email: "bilgi@pegasusyayinlari.com",
    foundedYear: "2005"
  },
  {
    name: "Epsilon Yayınevi",
    address: "Osmanağa Mah. Ali Suavi Sokak, Kadıköy, İstanbul",
    phone: "0216 449 49 79",
    email: "info@epsilonyayinevi.com",
    foundedYear: "2000"
  }
];


const API_URL = 'https://right-zorana-mephisto-0553475f.koyeb.app/api/v1';


const seedPublishers = async () => {
  try {
    for (const publisher of publishers) {
      await axios.post(API_URL, publisher);
      console.log(`${publisher.name} başarıyla eklendi.`);
    }
    console.log('Tüm yayımcılar başarıyla eklendi!');
  } catch (error) {
    console.error('Yayımcı eklerken hata oluştu:', error);
  }
};

export default seedPublishers;
