
let publishers = [
  {
    id: 1,
    name: "Yapı Kredi Yayınları",
    establishmentYear: 1945,
    address: "İstiklal Cad. No:142, Beyoğlu, İstanbul"
  },
  {
    id: 2,
    name: "Can Yayınları",
    establishmentYear: 1981,
    address: "Hayriye Cad. No:2, Galatasaray, İstanbul"
  },
  {
    id: 3,
    name: "İletişim Yayınları",
    establishmentYear: 1982,
    address: "Binbirdirek Meydanı Sokak, Fatih, İstanbul"
  },
  {
    id: 4,
    name: "Doğan Kitap",
    establishmentYear: 1996,
    address: "Balmumcu Mah. Barbaros Blv., Beşiktaş, İstanbul"
  },
  {
    id: 5,
    name: "Everest Yayınları",
    establishmentYear: 1999,
    address: "Asmalı Mescit Mah. İstiklal Cad., Beyoğlu, İstanbul"
  }
];

let categories = [
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

let authors = [
  {
    id: 1,
    name: "Orhan Pamuk",
    birthDate: "1952-06-07",
    country: "Türkiye"
  },
  {
    id: 2,
    name: "Elif Şafak",
    birthDate: "1971-10-25",
    country: "Türkiye"
  },
  {
    id: 3,
    name: "Yaşar Kemal",
    birthDate: "1923-10-06",
    country: "Türkiye"
  },
  {
    id: 4,
    name: "Sabahattin Ali",
    birthDate: "1907-02-25",
    country: "Türkiye"
  },
  {
    id: 5,
    name: "Ahmet Ümit",
    birthDate: "1960-09-30",
    country: "Türkiye"
  }
];

let books = [
  {
    id: 1,
    name: "Masumiyet Müzesi",
    publicationYear: 2008,
    stock: 15,
    author: authors[0],
    publisher: publishers[0],
    categories: [categories[0]]
  },
  {
    id: 2,
    name: "Aşk",
    publicationYear: 2009,
    stock: 10,
    author: authors[1],
    publisher: publishers[1],
    categories: [categories[0]]
  },
  {
    id: 3,
    name: "İnce Memed",
    publicationYear: 2017,
    stock: 8,
    author: authors[2],
    publisher: publishers[0],
    categories: [categories[0]]
  },
  {
    id: 4,
    name: "Kürk Mantolu Madonna",
    publicationYear: 2016,
    stock: 20,
    author: authors[3],
    publisher: publishers[1],
    categories: [categories[0]]
  },
  {
    id: 5,
    name: "İstanbul Hatırası",
    publicationYear: 2010,
    stock: 12,
    author: authors[4],
    publisher: publishers[3],
    categories: [categories[0]]
  }
];

const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD formatında bugünün tarihi
const oneMonthLater = new Date();
oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
const returnDate = oneMonthLater.toISOString().split('T')[0];

let borrows = [
  {
    id: 1,
    borrowerName: "Mehmet Yılmaz",
    borrowerMail: "mehmet@example.com",
    borrowingDate: today,
    returnDate: returnDate,
    book: books[0]
  },
  {
    id: 2,
    borrowerName: "Ayşe Demir",
    borrowerMail: "ayse@example.com",
    borrowingDate: today,
    returnDate: returnDate,
    book: books[1]
  },
  {
    id: 3,
    borrowerName: "Ali Kaya",
    borrowerMail: "ali@example.com",
    borrowingDate: today,
    returnDate: returnDate,
    book: books[2]
  },
  {
    id: 4,
    borrowerName: "Zeynep Öztürk",
    borrowerMail: "zeynep@example.com",
    borrowingDate: today,
    returnDate: returnDate,
    book: books[3]
  },
  {
    id: 5,
    borrowerName: "Hüseyin Şahin",
    borrowerMail: "huseyin@example.com",
    borrowingDate: today,
    returnDate: returnDate,
    book: books[4]
  }
];

export {
  publishers,
  categories,
  authors,
  books,
  borrows
};
