const { Router } = require('express');
const { addEntity, getAllEntity, getEntity,
    UpdateEntity, getAllEntityOk, deleteEntity } = require('../controller/cliente-ctr');


const router = Router();

router.post('/add/', addEntity);
router.get('/all/page/:num/', getAllEntity);
router.get('/all/', getAllEntityOk);
router.get('/one/:id/', getEntity );
router.put('/edit/:id/', UpdateEntity );
router.delete('/delete/:id/', deleteEntity)

module.exports = router;


