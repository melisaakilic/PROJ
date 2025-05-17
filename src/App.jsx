// src/App.jsx
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load pages
const Home = lazy(() => import('./pages/home'));
const Books = lazy(() => import('./pages/books'));
const Categories = lazy(() => import('./pages/categories'));
const Publishers = lazy(() => import('./pages/publisher'));
const Authors = lazy(() => import('./pages/authors'));
const Borrows = lazy(() => import('./pages/borrowing-book'));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/publishers" element={<Publishers />} />
            <Route path="/authors" element={<Authors />} />
            <Route path="/borrows" element={<Borrows />} />
          </Routes>
        </Layout>
      </Suspense>
    </Router>
  );
}

export default App;
