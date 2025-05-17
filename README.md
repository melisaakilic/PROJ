# Library Management System


LİVE :https://projr.netlify.app/
## 📌 Project Description

Library Management System is a web-based application built to manage books, authors, publishers, and users efficiently in a digital library setting. The system allows CRUD operations, categorization of books, and easy navigation through different sections like Borrows, Analytics, and Dashboard.

## 🚀 Technologies Used

* **Frontend:** React, Vite, CSS 
* **Backend:** Spring Boot, Java
* **Database:** PostgreSQL
* **Styling:** TailwindCSS, Custom SCSS
* **Build Tools:** Vite, npm

---

## ⚙️ Installation and Setup

To run this project locally, follow the steps below:

```bash
# Clone the repository
git clone https://github.com/your-username/library-management-system.git

# Navigate into the project directory
cd library-management-system

# Install dependencies
npm install

# Run the frontend application
npm run dev

# Application will run on:
http://localhost:5173
```

If you encounter port issues, change the port in `vite.config.js`:

```js
// vite.config.js
export default defineConfig({
  server: {
    port: 5173, // Change this if needed
  },
});
```

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   ├── Modal.jsx
│   └── QRCodeGenerator.jsx
├── pages/
│   ├── BooksPage.jsx
│   ├── CategoriesPage.jsx
│   ├── DashboardPage.jsx
│   └── ReportsPage.jsx
├── services/
│   └── ApiService.js
├── styles/
│   ├── App.css
│   └── Sidebar.css
├── index.jsx
├── App.jsx
└── main.jsx
```

---

## ✨ Features

* **CRUD Operations:** Easily manage Books, Authors, and Publishers.
* **Analytics Dashboard:** Visualize key metrics and statistics.
* **Advanced Search:** Quickly find books, categories, and authors.
* **QR Code Generator:** Generate and download QR codes for book details.
* **Responsive Design:** Mobile-friendly interface.

---

## 🚀 Running the Application

1. Start the frontend:

   ```bash
   npm run dev
   ```

2. Visit:

   ```
   ```

[http://localhost:5173](http://localhost:5173)

```

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/your-username/library-management-system/issues).

---

## 📝 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
