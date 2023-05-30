import mongoose from 'mongoose';
import config from './config/config';

mongoose.connect(config.DB_URI);

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('Mongodb connection stablished');
});

connection.on('error', (error) => {
  console.log('Mongodb connection error:', error.message);
  process.exit();
});