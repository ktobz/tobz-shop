'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('Password123!', 10);

    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        username: 'admin_user',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        username: 'john_doe',
        email: 'john@example.com',
        password: hashedPassword,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    await queryInterface.bulkInsert('Products', [
      { title: 'Modern Ergonomic Chair', description: 'Premium desk chair with adjustable lumbar support and velvet finish.', price: 299.99, category: 'Furniture', stock: 15, imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80', userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Wireless Mechanical Keyboard', description: 'Low-profile RGB mechanical keyboard with hot-swappable switches.', price: 149.50, category: 'Electronics', stock: 30, imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83bac1?auto=format&fit=crop&w=800&q=80', userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Noise Cancelling Headphones', description: 'Premium over-ear headphones with active noise cancellation and 30hr battery life.', price: 349.99, category: 'Electronics', stock: 22, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Smart Fitness Watch', description: 'Track your health, workouts, and sleep with this advanced smartwatch.', price: 249.99, category: 'Electronics', stock: 18, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80', userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Portable Bluetooth Speaker', description: 'Waterproof portable speaker with 360-degree sound and 20hr battery.', price: 79.99, category: 'Electronics', stock: 40, imageUrl: 'https://images.unsplash.com/photo-1608156639585-34a0a56ee6c9?auto=format&fit=crop&w=800&q=80', userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Ultra HD Webcam', description: '4K webcam with auto-focus, built-in microphone, and privacy shutter.', price: 129.99, category: 'Electronics', stock: 12, imageUrl: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?auto=format&fit=crop&w=800&q=80', userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Graphic Design Tablet', description: 'Professional drawing tablet with 8192 pressure levels and tilt support.', price: 399.99, category: 'Electronics', stock: 8, imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80', userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Slim Laptop Stand', description: 'Adjustable aluminum laptop stand for ergonomic desk setup.', price: 49.99, category: 'Electronics', stock: 55, imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80', userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Organic Cotton T-Shirt', description: 'Soft, breathable organic cotton tee available in multiple colors.', price: 29.99, category: 'Fashion', stock: 100, imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80', userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Classic Denim Jacket', description: 'Timeless denim jacket with a modern slim-fit cut.', price: 89.99, category: 'Fashion', stock: 25, imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80', userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Running Sneakers', description: 'Lightweight cushioned running shoes with responsive bounce technology.', price: 129.99, category: 'Fashion', stock: 35, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Leather Crossbody Bag', description: 'Genuine leather crossbody bag with adjustable strap and multiple compartments.', price: 79.99, category: 'Fashion', stock: 20, imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80', userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Aviator Sunglasses', description: 'Classic aviator sunglasses with UV400 protection and polarized lenses.', price: 59.99, category: 'Fashion', stock: 45, imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80', userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Wool Blend Scarf', description: 'Soft wool blend scarf perfect for layering in colder weather.', price: 34.99, category: 'Fashion', stock: 60, imageUrl: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=800&q=80', userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Luxury Scented Candle Set', description: 'Set of 3 hand-poured soy wax candles with essential oils.', price: 44.99, category: 'Home', stock: 30, imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80', userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Ceramic Plant Pot', description: 'Handcrafted matte ceramic pot with drainage hole, perfect for indoor plants.', price: 24.99, category: 'Home', stock: 50, imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80', userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Minimalist Wall Clock', description: 'Silent sweep wall clock with a modern minimalist design.', price: 39.99, category: 'Home', stock: 28, imageUrl: 'https://images.unsplash.com/photo-1507646227500-4d389b0012be?auto=format&fit=crop&w=800&q=80', userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Throw Blanket', description: 'Ultra-soft microfiber throw blanket in neutral tones.', price: 49.99, category: 'Home', stock: 35, imageUrl: 'https://images.unsplash.com/photo-1580301762395-21ce84e00ca6?auto=format&fit=crop&w=800&q=80', userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Yoga Mat Premium', description: 'Extra thick non-slip yoga mat with carrying strap included.', price: 44.99, category: 'Sports', stock: 42, imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80', userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Adjustable Dumbbell Set', description: 'Space-saving adjustable dumbbells from 5 to 52.5 lbs each.', price: 299.99, category: 'Sports', stock: 10, imageUrl: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?auto=format&fit=crop&w=800&q=80', userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Protein Powder - Whey Isolate', description: '25g protein per serving, low carb, chocolate flavor.', price: 54.99, category: 'Sports', stock: 65, imageUrl: 'https://images.unsplash.com/photo-1579722821273-0f67c7c2a6c7?auto=format&fit=crop&w=800&q=80', userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Resistance Bands Set', description: '5-piece resistance band set with different tension levels and door anchor.', price: 24.99, category: 'Sports', stock: 80, imageUrl: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=800&q=80', userId: 2, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
