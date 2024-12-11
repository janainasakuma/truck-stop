const express = require('express');
const cors = require('cors');
const prisma = require('@prisma/client');
const bcrypt = require('bcrypt');

const app = express();
const prismaClient = new prisma.PrismaClient();

app.use(cors());
app.use(express.json());

// Endpoint para criar usuário
app.post('/users', async (req, res) => {
  console.log("Dados recebidos no backend:", req.body);

  const {
    firstName, 
    lastName, 
    cpf, 
    rg, 
    rgIssuedDate, 
    rgIssuer, 
    password, 
    phone, 
    email 
  } = req.body;

  try {
    // Verifica se o CPF ou e-mail já existem
    const userExists = await prismaClient.user.findFirst({
      where: {
        OR: [
          { cpf: cpf },
          { email: email }
        ]
      }
    });

    if (userExists) {
      return res.status(400).json({ message: 'CPF ou email já cadastrados!' });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar novo usuário
    const user = await prismaClient.user.create({
      data: {
        firstName,
        lastName,
        cpf,
        rg,
        rgIssuedDate: new Date(rgIssuedDate),
        rgIssuer,
        password: hashedPassword,
        phone,
        email
      }
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao cadastrar usuário', error });
  }
});

// Endpoint para obter a lista de usuários
app.get('/users', async (req, res) => {
  try {
    const users = await prismaClient.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar usuários', error });
  }
});

// Endpoint para buscar um usuário por ID
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prismaClient.user.findUnique({
      where: { id: parseInt(id) }
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar usuário', error });
  }
});

// Endpoint para editar um usuário
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, cpf, rg, rgIssuedDate, rgIssuer, phone, email } = req.body;

  try {
    // Verifica se o usuário existe
    const user = await prismaClient.user.findUnique({
      where: { id: parseInt(id) }
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Atualiza os dados do usuário
    const updatedUser = await prismaClient.user.update({
      where: { id: parseInt(id) },
      data: {
        firstName,
        lastName,
        cpf,
        rg,
        rgIssuedDate: new Date(rgIssuedDate),
        rgIssuer,
        phone,
        email
      }
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao editar usuário', error });
  }
});

// Endpoint para deletar um usuário
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Verifica se o usuário existe
    const user = await prismaClient.user.findUnique({
      where: { id: parseInt(id) }
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Deleta o usuário
    await prismaClient.user.delete({
      where: { id: parseInt(id) }
    });

    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar usuário', error });
  }
});

// Roda o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
