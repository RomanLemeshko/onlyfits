const express = require('express');
const bcrypt = require('bcrypt');
const { User, RefreshToken } = require('../db/models');
const { getTokens } = require('../middleware/jwt');
const router = express.Router();

const TOKEN_EXPIRATION = 7 * 24 * 60 * 60 * 1000;

// Регистрация пользователя
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send({ message: 'Email already used' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).send({ message: 'User created successfully', userId: newUser.id });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error registering user', error: error.message });
  }
});

// Вход пользователя
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }
    const tokens = getTokens(user.username);
    await RefreshToken.create({
      token: tokens.refreshToken,
      userId: user.id,
      expiryDate: new Date(Date.now() + TOKEN_EXPIRATION),
    });
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: TOKEN_EXPIRATION,
    });
    res.send({
      accessToken: tokens.accessToken,
      user: {
        id: user.id,
        name: user.username,
      },
    });
  } catch (error) {
    res.status(500).send({ message: 'Login failed', error: error.message });
  }
});

// Обновление токена
router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(401).send({message: 'No refresh token provided'})
  }
  try {
    const refreshTokenRecord = await RefreshToken.findOne({
      where: { token: refreshToken, isValid: true },
    });
    if (!refreshTokenRecord || new Date() > refreshTokenRecord.expiryDate) {
      return res
        .status(401)
        .send({ message: 'Invalid or expired refresh token' });
    }
    const user = await User.findByPk(refreshTokenRecord.userId);
    const newAccessToken = getTokens(user.username).accessToken;
    res.send({
      accessToken: newAccessToken,
      user: { id: user.id, name: user.username },
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Could not refresh token', error: error.message });
  }
});

// Выход пользователя
router.post('/logout', async (req, res) => {
  const { refreshToken } = req.cookies;
  try {
    const refreshTokenRecord = await RefreshToken.findOne({
      where: { token: refreshToken },
    });
    if (refreshTokenRecord) {
      await refreshTokenRecord.update({ isValid: false });
    }
    res.clearCookie('refreshToken');
    res.send({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).send({ message: 'Logout failed', error: error.message });
  }
});

module.exports = router;