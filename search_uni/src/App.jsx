import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import { Create } from './components/Create';
import { useArticlesContext } from './context';

const App = () => {
  const { setArticles } = useArticlesContext();

  useEffect(() => {
    fetch('http://localhost:5000/articles').then((res) => res.json()).then((articles) => {
      setArticles(articles);
    });
  });
  return (
    <main>
      <Router>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/create' element={<Create />} />
        </Routes>
      </Router>
    </main>
  );
};


export default App;