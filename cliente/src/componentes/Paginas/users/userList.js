import React from 'react';
import './userList.css';

const UserList = ({ users, onUserDeleted, onUserUpdated }) => {
  const handleDelete = (userId) => {
    onUserDeleted(userId);
  };

  const handleEdit = (user) => {
    onUserUpdated(user);
  };

  return (
    <div className="user-list">
      {users.length === 0 ? (
        <p>Nenhum usuário cadastrado.</p>
      ) : (
        users.map((user) => (
          <div key={user._id} className="user-card"> {/* Garantindo que _id seja único */}
            <h3>{user.firstName} {user.lastName}</h3>
            <p>Email: {user.email}</p>
            <button onClick={() => handleEdit(user)}>Editar</button>
            <button onClick={() => handleDelete(user._id)}>Deletar</button>
          </div>
        ))
      )}
    </div>
  );
};

export default UserList;
