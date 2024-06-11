import express from 'express'
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { fileURLToPath } from 'url'

const router = express.Router();
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

// Obtener todos los gastos
router.get('/', (req, res) => {
  try {
    const dataPath = path.join(__dirname, '../data/gastos.json')
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
});

// agregar un nuevo gasto
router.post('/', (req, res) => {
  try {
    const newGasto = { id: uuidv4(), ...req.body };
    const dataPath = path.join(__dirname, '../data/gastos.json')
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
    data.gastos.push(newGasto);
    fs.writeFileSync(dataPath, JSON.stringify(data));
    res.status(201).json(newGasto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// actualizar un gasto
router.put('/', (req, res) => {
  try {
    const updatedGasto = req.body;
    const dataPath = path.join(__dirname, '../data/gastos.json')
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
    const index = data.gastos.findIndex(gasto => gasto.id === updatedGasto.id)
    if (index !== -1) {
      // Imprimir los datos antes de la actualización
      console.log('Datos antes de la actualización:', data.gastos[index])

      // Actualizar los datos
      data.gastos[index] = updatedGasto;
      fs.writeFileSync(dataPath, JSON.stringify(data))

      // Imprimir los datos después de la actualización
      console.log('Datos después de la actualización:', data.gastos[index])

      res.status(200).json(updatedGasto);
    } else {
      res.status(404).json({ error: 'Gasto no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
});


// eliminar un gasto
router.delete('/', (req, res) => {
  try {
    const { id } = req.query;
    const dataPath = path.join(__dirname, '../data/gastos.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const newGastos = data.gastos.filter(gasto => gasto.id !== id);
    if (data.gastos.length === newGastos.length) {
      return res.status(404).json({ error: 'Gasto no encontrado' });
    }
    data.gastos = newGastos;
    fs.writeFileSync(dataPath, JSON.stringify(data));
    res.status(200).json({ message: 'Gasto eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { router }
