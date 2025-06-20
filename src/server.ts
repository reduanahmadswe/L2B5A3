import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';


const PORT = 5000;

let server: Server;

async function main() {
  try {
    await mongoose.connect('mongodb+srv://mongodb:mongodb@cluster0.eteuyp6.mongodb.net/libraryManagementapi?retryWrites=true&w=majority&appName=Cluster0');
    server = app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error starting server:', error);
  }
}

main(); 
