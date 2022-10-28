import express from 'express';
import process from 'node:process';
import userRouter from './routes/users.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('users', []);

app.use(express.json());
app.use('/users', userRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    Message: 'Hello World!',
  });
});

app.get('users');

app.listen(PORT);
