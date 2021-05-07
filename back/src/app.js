const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
var helmet = require('helmet');
const app = express();
const port = 5000;
const authRoutes = require('./routes/auth');
const welcomeRoutes =  require('./routes/welcome');

app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

app.use('/auth',authRoutes);
app.use('/welcome', welcomeRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});