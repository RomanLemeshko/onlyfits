const express = require('express');
const bcrypt = require('bcrypt');
const { User, RefreshToken } = require('../db/models');
const { getTokens } = require('../middleware/jwt');
const router = express.Router();

// Регистрация пользователя
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res
      .status(201)
      .send({ message: 'User created successfully', userId: newUser.id });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Error registering user', error: error.message });
  }
});

// Вход пользователя
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }
    const tokens = getTokens(user.username);
    await RefreshToken.create({
      token: tokens.refreshToken,
      userId: user.id,
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.send({ accessToken: tokens.accessToken, userId: user.id });
  } catch (error) {
    res.status(500).send({ message: 'Login failed', error: error.message });
  }
});

// Обновление токена
router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.cookies;
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
    const tokens = getTokens(user.username);
    refreshTokenRecord.update({
      token: tokens.refreshToken,
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.send({ accessToken: tokens.accessToken });
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
