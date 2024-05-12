require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const allProgramAndFilter = require('./routes/api.program')
const allUserProgAddDeleteprog = require('./routes/api.user.programs')
const userMacros = require('./routes/api.user.macros')
const allUserProgExcersises = require('./routes/api.user.programs.exercises')
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: process.env.CLIENT_HOST,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/auth', authRoutes);
app.use('/api', allProgramAndFilter)
app.use('/api', allUserProgAddDeleteprog)
app.use('/api', userMacros)
app.use('/api', allUserProgExcersises)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});