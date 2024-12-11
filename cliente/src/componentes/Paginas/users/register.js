import React, { useState, useEffect } from 'react';
import './register.css';

const Register = ({ currentUser, onUserCreated, onUserUpdated }) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    cpf: '',
    rg: '',
    rgIssuedDate: '',
    rgIssuer: '',
    password: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    if (currentUser) {
      setUserData({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        cpf: currentUser.cpf,
        rg: currentUser.rg,
        rgIssuedDate: currentUser.rgIssuedDate.split('T')[0], // Formato date
        rgIssuer: currentUser.rgIssuer,
        password: '',
        phone: currentUser.phone,
        email: currentUser.email,
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = currentUser ? 'PUT' : 'POST';
    const url = currentUser
      ? `http://localhost:3000/users/${currentUser._id}`
      : 'http://localhost:3000/users';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        if (currentUser) {
          onUserUpdated(); // Chama a função para atualizar a lista
        } else {
          onUserCreated(updatedUser); // Chama a função para adicionar o novo usuário
        }
        alert(currentUser ? 'Usuário atualizado com sucesso!' : 'Usuário cadastrado com sucesso!');
      } else {
        const data = await response.json();
        alert(`Erro: ${data.message}`);
      }
    } catch (error) {
      console.log(error);
      alert('Erro ao cadastrar ou atualizar usuário');
    }
  };

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="Nome"
          value={userData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Sobrenome"
          value={userData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          value={userData.cpf}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="rg"
          placeholder="RG"
          value={userData.rg}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="rgIssuedDate"
          placeholder="Data RG"
          value={userData.rgIssuedDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="rgIssuer"
          placeholder="Expeditor RG"
          value={userData.rgIssuer}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={userData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Telefone"
          value={userData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
          required
        />
        <button type="submit">{currentUser ? 'Atualizar' : 'Cadastrar'}</button>
      </form>
    </div>
  );
};

export default Register;
