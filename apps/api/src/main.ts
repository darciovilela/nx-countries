import express from 'express';
import * as path from 'path';
import { allCountries } from './country';
import cors from 'cors';



const app = express();
app.use(cors());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api for countries Darcio!' });
});

app.get('/countries', (req, res) => {
  const q = ((req.query.q as string) ?? '').toLowerCase()
  res.send(allCountries.filter(({country}) => 
  country.toLowerCase().includes(q)));
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
