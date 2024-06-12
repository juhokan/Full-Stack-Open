import React, { useState, useEffect } from 'react';

import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import { UserContext } from './context';

const TOKEN_KEY = 'token';

const App = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    initToken();
  }, []);

  const setAndSaveToken = (newToken) => {
    if (newToken) {
      window.localStorage.setItem(TOKEN_KEY, newToken);
      setToken(newToken);
    } else {
      window.localStorage.removeItem(TOKEN_KEY);
    }
  };

  const initToken = () => {
    const t = window.localStorage.getItem(TOKEN_KEY);
    if (t) {
      setToken(t);
    }
  };

  return (
    <UserContext.Provider value={{ token, setToken: setAndSaveToken }}>
      <main>
        {token ? <Blogs /> : <LoginForm />}
      </main>
    </UserContext.Provider>
  );
};

export default App;
