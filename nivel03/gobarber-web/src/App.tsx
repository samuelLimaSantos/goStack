import React from 'react';
import AuthContext from './context/AuthContext';
import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <AuthContext.Provider
        value={{
          name: 'Samuel',
        }}
      >
        <SignIn />
      </AuthContext.Provider>
      <GlobalStyle />
    </>
  );
};

export default App;
