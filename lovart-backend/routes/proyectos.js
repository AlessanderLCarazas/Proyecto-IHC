const express = require('express');
const Proyecto = require('../models/Proyecto');
const router = express.Router();

// Obtener todos los proyectos
router.get('/', async (req, res) => {
    const proyectos = await Proyecto.find();
    res.json(proyectos);
});

// Agregar un nuevo proyecto
router.post('/', async (req, res) => {
    const nuevoProyecto = new Proyecto(req.body);
    await nuevoProyecto.save();
    res.status(201).json(nuevoProyecto);
});

module.exports = router;
