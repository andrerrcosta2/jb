import application from './src/index.js';
import mongoose from 'mongoose';

let server;

beforeAll(async () => {
  await new Promise((resolve, reject) => {
    server = application.server.listen(0, async () => {
      const { port } = server.address();
      process.env.TEST_PORT = port;
      global.testRequest = require('supertest')(`http://localhost:${port}`);

      // Waiting for MongoDB connection
      try {
        await new Promise((resolve, reject) => {
          if (application.dbConnection.readyState === 1) {
            resolve();
          } else {
            application.dbConnection.once('open', resolve);
            application.dbConnection.once('error', reject);
          }
        });
        resolve(); 
      } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        reject(error);
      }
    });

    server.on('error', error => {
      console.error('Server error:', error);
      reject(error);
    });
  });
});

afterAll(async () => {
  if (server) {
    await new Promise((resolve, reject) => {
      server.close(err => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  try {
    await mongoose.connection.close();
  } catch (error) {
    console.error('Failed to close MongoDB connection:', error);
  }
});
