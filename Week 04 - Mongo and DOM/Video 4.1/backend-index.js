import express from 'express';
import cors from 'cors';

const PORT = 8080;
const app = express();
app.use(cors());

app.get('/sum', (req, res) => {
  const num1 = parseInt(req.query.a);
  const num2 = parseInt(req.query.b);

  if (isNaN(num1) || isNaN(num2)) {
    return res
      .status(400)
      .send({ success: false, message: 'Invalid numbers provided' });
  }

  const sum = num1 + num2;
  console.log(`Received numbers: ${num1} and ${num2}. Their sum is: ${sum}`);
  res.status(200).send({ sum });
});

app.get('/hello', (req, res) => {
  console.log('Hello, World');
  res.status(200).send('Hello, World');
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
