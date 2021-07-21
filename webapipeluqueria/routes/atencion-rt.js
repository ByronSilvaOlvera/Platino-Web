const { Router } = require('express');
const { addEntity, getAllEntity, getEntity,
    UpdateEntity, getAllEntityFilter,
    deleteEntity } = require('../controller/atencion-ctr');


const router = Router();

router.post('/add/', addEntity);
router.get('/all/page/:num/', getAllEntity);
router.get('/one/:id/', getEntity );
router.put('/edit/:id/', UpdateEntity );
router.put('/edit/:id/', UpdateEntity );
router.post('/all/fecha/', getAllEntityFilter );
router.delete('/delete/:id/', deleteEntity)

module.exports = router;


