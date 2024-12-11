// UserManagement.js
import React, { useState, useEffect } from 'react';
import './userManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
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
  const [editMode, setEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      alert('Erro ao buscar usuários: ' + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const clearForm = () => {
    setUserData({
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
    setEditMode(false);
    setEditUserId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editMode 
        ? `http://localhost:3000/users/${editUserId}`
        : 'http://localhost:3000/users';
      
      const method = editMode ? 'PUT' : 'POST';
      const submitData = editMode 
        ? { ...userData, password: undefined }
        : userData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        alert(editMode ? 'Usuário atualizado com sucesso!' : 'Usuário cadastrado com sucesso!');
        clearForm();
        fetchUsers();
      } else {
        const data = await response.json();
        alert(`Erro: ${data.message}`);
      }
    } catch (error) {
      alert('Erro: ' + error.message);
    }
  };

  const handleEdit = (user) => {
    setUserData({
      firstName: user.firstName,
      lastName: user.lastName,
      cpf: user.cpf,
      rg: user.rg,
      rgIssuedDate: user.rgIssuedDate.split('T')[0],
      rgIssuer: user.rgIssuer,
      phone: user.phone,
      email: user.email,
    });
    setEditMode(true);
    setEditUserId(user.id);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Deseja realmente excluir este usuário?')) {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Usuário deletado com sucesso!');
          fetchUsers();
        } else {
          const data = await response.json();
          alert(`Erro: ${data.message}`);
        }
      } catch (error) {
        alert('Erro ao deletar usuário: ' + error.message);
      }
    }
  };

  return (
    <div className="user-management">
      <h2>{editMode ? 'Editar Usuário' : 'Cadastro de Usuário'}</h2>
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
        {!editMode && (
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={userData.password}
            onChange={handleChange}
            required
          />
        )}
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
        <button type="submit">{editMode ? 'Atualizar' : 'Cadastrar'}</button>
        {editMode && (
          <button type="button" onClick={clearForm}>Cancelar</button>
        )}
      </form>

      <div className="user-list">
        <h2>Lista de Usuários</h2>
        {users.length === 0 ? (
          <p>Nenhum usuário cadastrado.</p>
        ) : (
          <div className="users-grid">
            {users.map((user) => (
              <div key={user.id} className="user-card">
                <h3>{user.firstName} {user.lastName}</h3>
                <p>Email: {user.email}</p>
                <p>CPF: {user.cpf}</p>
                <p>Telefone: {user.phone}</p>
                <div className="button-group">
                  <button onClick={() => handleEdit(user)}>Editar</button>
                  <button onClick={() => handleDelete(user.id)}>Deletar</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
