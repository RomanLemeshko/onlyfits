const jwt = require('jsonwebtoken');

const signatureAccess = process.env.ACCESS_TOKEN_SECRET; // Секретный ключ для access токена
const signatureRefresh = process.env.REFRESH_TOKEN_SECRET; // Секретный ключ для refresh токена

const accessTokenAge = 30; // 15 минут (900 секунд)
const refreshTokenAge = 7 * 24 * 60 * 60; // 7 дней (604800 секунд)
const getTokens = (login) => ({
  accessToken: jwt.sign({ login }, signatureAccess, {
    expiresIn: `${accessTokenAge}s`,
  }),
  refreshToken: jwt.sign({ login }, signatureRefresh, {
    expiresIn: `${refreshTokenAge}s`,
  }),
});

module.exports = {
  getTokens,
};
