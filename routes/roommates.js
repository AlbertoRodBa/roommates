import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getRandomUser } from './randomUser.js' // Corregir la ruta de importación

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta para agregar un nuevo roommate
router.post('/', async (req, res) => {
  try {
    const newRoommate = await getRandomUser()
    const dataPath = path.join(__dirname, '../data/roommates.json')
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
    data.roommates.push(newRoommate)
    fs.writeFileSync(dataPath, JSON.stringify(data))
    res.status(201).json(newRoommate)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
});

// Ruta para obtener todos los roommates
router.get('/', (req, res) => {
  try {
    const dataPath = path.join(__dirname, '../data/roommates.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { router };
