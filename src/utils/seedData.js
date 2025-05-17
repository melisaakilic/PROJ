import publishersService from '../services/publishersService';
import categoriesService from '../services/categoriesService';
import authorsService from '../services/authorsService';
import booksService from '../services/booksService';
import borrowsService from '../services/borrowsService';


 const publishersData = [
  {
    id: 1,
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

 const categories = [
  {
    id: 1,
    name: "Roman",
    description: "Kurgu edebiyat eserleri"
  },
  {
    id: 2,
    name: "Bilim",
    description: "Bilimsel araştırma ve popüler bilim kitapları"
  },
  {
    id: 3,
    name: "Tarih",
    description: "Tarihi olaylar ve kişiler hakkında kitaplar"
  },
  {
    id: 4,
    name: "Felsefe",
    description: "Düşünce ve felsefe alanındaki eserler"
  },
  {
    id: 5,
    name: "Çocuk Kitapları",
    description: "Çocuklar için hazırlanmış edebi eserler"
  }
];
const authorsData = [
  {
    id: 1,
    name: "Orhan Pamuk",
    birthDate: "1952-06-07",
    country: "Türkiye",
    biography: "Nobel ödüllü Türk yazar, İstanbul temalı eserleriyle tanınır."
  },
  {
    id: 2,
    name: "Elif Şafak",
    birthDate: "1971-10-25",
    country: "Türkiye",
    biography: "Uluslararası üne sahip, çok dilli Türk yazar."
  },
  {
    id: 3,
    name: "Yaşar Kemal",
    birthDate: "1923-10-06",
    country: "Türkiye",
    biography: "Anadolu halk kültürünü eserlerine taşıyan usta yazar."
  },
  {
    id: 4,
    name: "Sabahattin Ali",
    birthDate: "1907-02-25",
    country: "Türkiye",
    biography: "Kürk Mantolu Madonna'nın yazarı, Türk edebiyatının klasikleşmiş ismi."
  },
  {
    id: 5,
    name: "Ayşe Kulin",
    birthDate: "1941-08-26",
    country: "Türkiye",
    biography: "Tarihi romanlarıyla tanınan çağdaş Türk yazar."
  }
];

// Her entitynin zaten var olup olmadığını kontrol eden ve
// gerekirse yeni verileri ekleyen fonksiyon
const seedData = async () => {
  try {
    // Mevcut entityleri kontrol edin
    const existingPublishers = await publishersService.getPublishers();
    const existingCategories = await categoriesService.getCategories();
    const existingAuthors = await authorsService.getAuthors();
    
    // Eğer veri yoksa, ekleyin
    if (existingPublishers.length === 0) {
      console.log("Yayıncıları ekliyorum...");
      for (const publisher of publishersData) {
        await publishersService.createPublisher(publisher);
      }
    }
    
    if (existingCategories.length === 0) {
      console.log("Kategorileri ekliyorum...");
      for (const category of categoriesData) {
        await categoriesService.createCategory(category);
      }
    }
    
    if (existingAuthors.length === 0) {
      console.log("Yazarları ekliyorum...");
      for (const author of authorsData) {
        await authorsService.createAuthor(author);
      }
    }
    
    // Kitaplar ve ödünç kayıtları için önce diğer entitylerin ID'lerini almalıyız
    // Bu kısmı, yukarıdaki işlemler tamamlandıktan sonra eklemelisiniz
    const updatedPublishers = await publishersService.getPublishers();
    const updatedCategories = await categoriesService.getCategories();
    const updatedAuthors = await authorsService.getAuthors();
    
const booksData = [
  {
    id: 1,
    title: "Masumiyet Müzesi",
    authorId: 1, // Orhan Pamuk
    publisherId: 1, // YKY
    categoryId: 1, // Roman
    publicationYear: 2008,
    isbn: "9789750817748",
    pageCount: 592
  },
  {
    id: 2,
    title: "İstanbul Hatırası",
    authorId: 6, // (Ahmet Ümit - ekstra yazar ekleyin)
    publisherId: 5, // Epsilon Yayınevi
    categoryId: 1, // Roman
    publicationYear: 2010,
    isbn: "9789944829304",
    pageCount: 424
  },
  {
    id: 3,
    title: "Aşk",
    authorId: 2, // Elif Şafak
    publisherId: 2, // Can Yayınları
    categoryId: 1, // Roman
    publicationYear: 2009,
    isbn: "9789750726392",
    pageCount: 420
  },
  {
    id: 4,
    title: "İnce Memed",
    authorId: 3, // Yaşar Kemal
    publisherId: 1, // YKY
    categoryId: 1, // Roman
    publicationYear: 2017,
    isbn: "9789750836152",
    pageCount: 352
  },
  {
    id: 5,
    title: "Saatleri Ayarlama Enstitüsü",
    authorId: 7, 
    publisherId: 3, 
    categoryId: 1, 
    publicationYear: 2015,
    isbn: "9789754706093",
    pageCount: 382
  }
];

     const existingBooks = await booksService.getBooks();
    if (existingBooks.length === 0) {
      console.log("Kitapları ekliyorum...");
      for (const book of booksData) {
        await booksService.createBook(book);
      }
    }
    
    // Kitapların ID'lerini alın
    const updatedBooks = await booksService.getBooks();
    
const borrowsData = [
  {
    id: 1,
    borrowerName: "Mehmet Yılmaz",
    bookId: 1, // Masumiyet Müzesi
    borrowDate: "2025-04-20",
    returnDate: "2025-05-20",
    status: "Active" // veya sisteminizdeki karşılığı: "Aktif", "1" vb.
  },
  {
    id: 2,
    borrowerName: "Ayşe Demir",
    bookId: 3, // Aşk
    borrowDate: "2025-04-15",
    returnDate: "2025-05-15",
    status: "Active"
  },
  {
    id: 3,
    borrowerName: "Ali Kaya",
    bookId: 4, // İnce Memed
    borrowDate: "2025-04-10",
    returnDate: "2025-05-10",
    status: "Active"
  },
  {
    id: 4,
    borrowerName: "Zeynep Öztürk",
    bookId: 2, // İstanbul Hatırası
    borrowDate: "2025-04-05",
    returnDate: "2025-05-05",
    status: "Active"
  },
  {
    id: 5,
    borrowerName: "Hüseyin Şahin",
    bookId: 5, // Saatleri Ayarlama Enstitüsü
    borrowDate: "2025-04-01",
    returnDate: "2025-05-01",
    status: "Returned" // veya sisteminizdeki karşılığı: "İade Edildi", "0" vb.
  }
];


    const existingBorrows = await borrowsService.getBorrows();
    if (existingBorrows.length === 0) {
      console.log("Ödünç kayıtlarını ekliyorum...");
    for (const borrow of borrowsData) {
        await borrowsService.createBorrow(borrow);
      }
    }
    
    console.log("Veri ekleme işlemi tamamlandı!");
  } catch (error) {
    console.error("Veri ekleme sırasında hata oluştu:", error);
  }
};
// ID 6 ve 7 olarak eklenmesi gereken ek yazarlar
const extraAuthors = [
  {
    id: 6,
    name: "Ahmet Ümit",
    birthDate: "1960-09-30",
    country: "Türkiye",
    biography: "Polisiye roman türünün Türkiye'deki önemli temsilcilerinden."
  },
  {
    id: 7,
    name: "Ahmet Hamdi Tanpınar",
    birthDate: "1901-06-23",
    country: "Türkiye",
    biography: "Türk edebiyatında modernizmin öncülerinden, şair ve romancı."
  }
];

export default seedData;
