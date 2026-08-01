const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', getAllProducts);                       // Public
router.get('/:id', getProductById);                   // Public
router.post('/', authenticateToken, createProduct);    // Protected
router.put('/:id', authenticateToken, updateProduct);  // Protected (owner/admin)
router.delete('/:id', authenticateToken, deleteProduct); // Protected (owner/admin)

module.exports = router;
