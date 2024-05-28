const express = require('express');
const {
  getAllArea,
  createArea,
  updateArea,
  deleteArea,
  getAreaById,
} = require('../controller/area_controller');

const { verifyToken } = require('../middlewares/verifyToken');
const router = express.Router();

router.get('/api/getAllArea', verifyToken, getAllArea);
router.post('/api/createArea', verifyToken, createArea);
router.patch('/api/updateArea/:id', verifyToken, updateArea);
router.get('/api/getAreaById/:id', getAreaById);
router.delete('/api/deleteArea/:id', verifyToken, deleteArea);

module.exports = router;
