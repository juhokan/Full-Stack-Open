import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import { UserContext } from './context';

const USER_JSON = 'user_json';

const App = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    initUser();
  }, []);

  const setAndSaveUser = (newJSON) => {
    setUser(newJSON)
    if (newJSON !== null) {
      window.localStorage.setItem(USER_JSON, JSON.stringify(newJSON));
    } else {
      window.localStorage.removeItem(USER_JSON);
    }
  };

  const initUser = () => {
    const userJSON = window.localStorage.getItem(USER_JSON);
    if (userJSON !== undefined) {
      setUser(JSON.parse(userJSON));
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser: setAndSaveUser }}>
      <main>
        {user ? <Blogs /> : <LoginForm />}
      </main>
    </UserContext.Provider>
  );
};

export default App;
