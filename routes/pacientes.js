// routes/pacientes.js
const express = require('express');
const router = express.Router();
const sequelize = require('../models/db');
const Paciente = require('../models/paciente');

sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado');
});

router.get('/', (req, res) => {
  res.render('layout', {
    title: 'Clínica Sarará',
    body: 'paciente'
  });
});


// Listar todos os pacientes
router.get('/pacientes', async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    res.status(200);
    res.render('pacientes/pacientes', {
      title: 'Lista de pacientes',
      body: 'pacientes',
      pacientes: pacientes
    });}
  catch(error) {
    res.status(500);;
    return res.render('error', {title: 'Erro', message:error.message, error:error});
  }
});

// Formulário para adicionar paciente
router.get('/pacientes/add', (req, res) => {
  res.render('pacientes/addpaciente', { title: 'Adicionar Paciente' });
});

// Adicionar paciente
router.post('/pacientes/add', async (req, res) => {
  try {
    const paciente = await Paciente.create(req.body);
    res.status(201);
    res.redirect('/pacientes');
  } catch (error) {
    res.status(400);
    res.render('error', {
      title:'Erro',
      message:error.message,
      error:error});
  }
  });

router.get('/pacientes/update', async (req,res) => {
  try {
    const pacientes = await Paciente.findAll();
    res.render('pacientes/updatepaciente', {'pacientes': pacientes, 'title': 'Alterar paciente'});
  } catch (error) {
    res.status(500);
    return res.render('error', {'title': 'Erro', message:error.message, error:error});
  }
});

router.get('/pacientes/update/:cpf', async (req,res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.cpf);
    if (!paciente) {
      res.status(404);
      return res.render('error',{title:'Erro',message:error.message,error:error})
    }
    res.json(paciente);
  } catch (error) {
    res.status(500);
    return res.render('error',{title:'Erro',message:error.message,error:error})
  }
});

router.post('/pacientes/update', async (req,res) => {
  const { cpf, nome_completo, idade, dia_consulta, hora_consulta } = req.body;
  try {
    await Paciente.update({ nome_completo, idade, dia_consulta, hora_consulta  }, {
       where: {cpf: cpf}
    });
    
    res.status(204);
    res.redirect('/pacientes');
  } catch (error) {
    res.status(500);
    return res.render('error',{title:'Erro',message:error.message,error:error});
  }
});

// Formulário para apagar paciente
router.get('/pacientes/delete', (req, res) => {
  res.render('pacientes/deletepaciente', { title: 'Apagar Paciente' });
});

// Apagar paciente
router.post('/pacientes/delete', async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.body.cpf);
    if (!paciente) {
      res.status(404);
      return res.render('error', {
        title:'Erro',
        message:"Paciente não encontrado",
        error:""
      });
    }
    await paciente.destroy();
    res.status(204);
    res.redirect('/pacientes');
  } catch (error) {
    res.status(500);
    return res.render('error', {
      title:'Erro', 
      message: error.message,
      error: error
    });
  }
});

module.exports = router;
