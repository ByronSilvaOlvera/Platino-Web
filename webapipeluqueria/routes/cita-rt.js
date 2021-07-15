const { Router } = require('express');
const { addEntity, getAllEntity, getEntity,
    UpdateEntity, getCitaCliente } = require('../controller/cita-ctr');


const router = Router();

router.post('/add/', addEntity);
router.get('/all/page/:num/', getAllEntity);
router.get('/one/:id/', getEntity );
router.get('/cliente/:id/', getCitaCliente );
router.put('/edit/:id/', UpdateEntity );

module.exports = router;


