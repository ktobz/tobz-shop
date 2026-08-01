const { Product, User } = require('../models');
const { Op } = require('sequelize');

/**
 * GET /api/products
 * Public — list all products with pagination, search, category filter
 */
const getAllProducts = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 10);
    const offset = (page - 1) * limit;
    const { search, category } = req.query;

    const where = {};
    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }
    if (category) where.category = category;

    const { count, rows: products } = await Product.findAndCountAll({
      where,
      include: [{ model: User, as: 'user', attributes: ['id', 'username', 'email'] }],
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json({
      status: 'success',
      data: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
        products
      }
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/products/:id
 * Public — get single product
 */
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: User, as: 'user', attributes: ['id', 'username', 'email'] }]
    });
    if (!product) return res.status(404).json({ status: 'error', message: 'Product not found.' });
    return res.status(200).json({ status: 'success', data: product });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/products
 * Protected — create product (JWT auth required)
 */
const createProduct = async (req, res, next) => {
  try {
    const { title, description, price, category, stock } = req.body;

    if (!title || price === undefined) {
      return res.status(400).json({ status: 'error', message: 'title and price are required.' });
    }

    const product = await Product.create({
      title,
      description: description || '',
      price,
      category: category || 'General',
      stock: stock || 0,
      userId: req.user.id
    });

    const result = await Product.findByPk(product.id, {
      include: [{ model: User, as: 'user', attributes: ['id', 'username', 'email'] }]
    });

    return res.status(201).json({ status: 'success', message: 'Product created.', data: result });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/products/:id
 * Protected — update product (owner or admin only)
 */
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: User, as: 'user' }]
    });

    if (!product) return res.status(404).json({ status: 'error', message: 'Product not found.' });

    const isOwner = product.userId === req.user.id;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ status: 'error', message: 'Forbidden. You do not own this product.' });
    }

    const { title, description, price, category, stock } = req.body;
    if (title !== undefined) product.title = title;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (category !== undefined) product.category = category;
    if (stock !== undefined) product.stock = stock;
    await product.save();

    const updated = await Product.findByPk(product.id, {
      include: [{ model: User, as: 'user', attributes: ['id', 'username'] }]
    });

    return res.status(200).json({ status: 'success', message: 'Product updated.', data: updated });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/products/:id
 * Protected — delete product (owner or admin only)
 */
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: User, as: 'user' }]
    });

    if (!product) return res.status(404).json({ status: 'error', message: 'Product not found.' });

    const isOwner = product.userId === req.user.id;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ status: 'error', message: 'Forbidden. You do not own this product.' });
    }

    await product.destroy();
    return res.status(200).json({ status: 'success', message: `Product "${product.title}" deleted.` });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
