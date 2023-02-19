import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchMain from './components/SearchMain';
import { Create } from './components/Create';
import { useArticlesContext } from './context';
import Home from './components/Home';
import axios from 'axios';

const App = () => {
  const { setArticles } = useArticlesContext();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:4000/articles');
      setArticles(response.data);
    }
    fetchData();
  }, [setArticles]);

  return (
    <main>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<SearchMain />} />
          <Route path='/create' element={<Create />} />
        </Routes>
      </Router>
    </main>
  );
};


export default App;