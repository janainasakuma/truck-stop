import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './componentes/Header';
import SecaoCapa from './componentes/SecaoCapa';
import Produtos from './componentes/Produtos';
import SecaoSobre from './componentes/SecaoSobre';
import Register from './componentes/Paginas/users/register';
import UserList from './componentes/Paginas/users/userList';
import UserManagement from './componentes/Paginas/users/UserManagement';

function App() {
   

  return (
    <div className="App">
      <Header />
      <SecaoCapa />
      <Produtos />
      <SecaoSobre />
      

      <UserManagement />

    </div>
  );
}

export default App;