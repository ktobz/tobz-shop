// Mock API service for simulating data fetching

// Mock product data
const mockProducts = [
    {
        id: 1,
        name: 'Wireless Headphones',
        price: 199.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        description: 'High-quality wireless headphones with noise cancellation.',
        rating: 4.5,
        inStock: true,
        stock: 45
    },
    {
        id: 2,
        name: 'Smart Watch',
        price: 299.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
        description: 'Feature-packed smart watch with health monitoring.',
        rating: 4.7,
        inStock: true,
        stock: 12
    },
    {
        id: 3,
        name: 'Laptop Stand',
        price: 49.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
        description: 'Adjustable laptop stand for ergonomic working.',
        rating: 4.2,
        inStock: true,
        stock: 85
    },
    {
        id: 4,
        name: 'Bluetooth Speaker',
        price: 79.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1608156639585-34a0a56ee6c9?auto=format&fit=crop&w=800&q=80',
        description: 'Portable Bluetooth speaker with excellent sound quality.',
        rating: 4.3,
        inStock: true,
        stock: 5
    },
    {
        id: 5,
        name: 'Gaming Mouse',
        price: 59.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
        description: 'High-precision gaming mouse with customizable buttons.',
        rating: 4.6,
        inStock: false,
        stock: 0
    },
    {
        id: 6,
        name: 'Wireless Keyboard',
        price: 89.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83bac1?auto=format&fit=crop&w=800&q=80',
        description: 'Ergonomic wireless keyboard for comfortable typing.',
        rating: 4.4,
        inStock: true,
        stock: 18
    },
    {
        id: 7,
        name: 'Smartphone Case',
        price: 19.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
        description: 'Protective case for smartphones with stylish design.',
        rating: 4.1,
        inStock: true,
        stock: 150
    },
    {
        id: 8,
        name: 'Tablet',
        price: 399.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
        description: 'High-performance tablet for work and entertainment.',
        rating: 4.8,
        inStock: true,
        stock: 7
    },
    {
        id: 9,
        name: 'VR Headset',
        price: 499.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=800&q=80',
        description: 'Immersive virtual reality headset for gaming.',
        rating: 4.5,
        inStock: false,
        stock: 0
    },
    {
        id: 10,
        name: 'Charging Cable',
        price: 9.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
        description: 'Durable charging cable compatible with multiple devices.',
        rating: 4.0,
        inStock: true,
        stock: 300
    },
    {
        id: 11,
        name: 'Cotton T-Shirt',
        price: 14.99,
        category: 'Fashion',
        image: 'https://placehold.co/400x400/1e1e1e/white?text=Cotton+T-Shirt',
        description: 'Comfortable cotton t-shirt in various colors.',
        rating: 4.2,
        inStock: true
    },
    {
        id: 12,
        name: 'Jeans',
        price: 49.99,
        category: 'Fashion',
        image: 'https://placehold.co/400x400/1e1e1e/white?text=Jeans',
        description: 'Classic denim jeans with a perfect fit.',
        rating: 4.4,
        inStock: true
    },
    {
        id: 13,
        name: 'Sneakers',
        price: 79.99,
        category: 'Fashion',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Sneakers',
        description: 'Stylish sneakers for everyday wear.',
        rating: 4.6,
        inStock: true
    },
    {
        id: 14,
        name: 'Dress',
        price: 39.99,
        category: 'Fashion',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Dress',
        description: 'Elegant dress for special occasions.',
        rating: 4.3,
        inStock: false
    },
    {
        id: 15,
        name: 'Jacket',
        price: 89.99,
        category: 'Fashion',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Jacket',
        description: 'Warm jacket for cold weather.',
        rating: 4.5,
        inStock: true
    },
    {
        id: 16,
        name: 'Hat',
        price: 19.99,
        category: 'Fashion',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Hat',
        description: 'Fashionable hat to complete your look.',
        rating: 4.1,
        inStock: true
    },
    {
        id: 17,
        name: 'Scarf',
        price: 24.99,
        category: 'Fashion',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Scarf',
        description: 'Soft scarf for added style and warmth.',
        rating: 4.2,
        inStock: true
    },
    {
        id: 18,
        name: 'Sunglasses',
        price: 29.99,
        category: 'Fashion',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Sunglasses',
        description: 'UV-protective sunglasses with trendy design.',
        rating: 4.4,
        inStock: false
    },
    {
        id: 19,
        name: 'Belt',
        price: 34.99,
        category: 'Fashion',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Belt',
        description: 'Leather belt for a polished appearance.',
        rating: 4.0,
        inStock: true
    },
    {
        id: 20,
        name: 'Watch',
        price: 149.99,
        category: 'Fashion',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Watch',
        description: 'Stylish watch to accessorize your outfit.',
        rating: 4.5,
        inStock: true
    },
    {
        id: 21,
        name: 'Throw Pillow',
        price: 24.99,
        category: 'Home',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Throw%20Pillow',
        description: 'Soft throw pillow to enhance your home decor.',
        rating: 4.3,
        inStock: true
    },
    {
        id: 22,
        name: 'Table Lamp',
        price: 39.99,
        category: 'Home',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Table%20Lamp',
        description: 'Modern table lamp for ambient lighting.',
        rating: 4.4,
        inStock: true
    },
    {
        id: 23,
        name: 'Curtains',
        price: 49.99,
        category: 'Home',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Curtains',
        description: 'Beautiful curtains to decorate your windows.',
        rating: 4.2,
        inStock: true
    },
    {
        id: 24,
        name: 'Plant Pot',
        price: 14.99,
        category: 'Home',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Plant%20Pot',
        description: 'Ceramic plant pot for indoor plants.',
        rating: 4.1,
        inStock: false
    },
    {
        id: 25,
        name: 'Blanket',
        price: 29.99,
        category: 'Home',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Blanket',
        description: 'Cozy blanket for comfortable nights.',
        rating: 4.6,
        inStock: true
    },
    {
        id: 26,
        name: 'Picture Frame',
        price: 19.99,
        category: 'Home',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Picture%20Frame',
        description: 'Elegant picture frame to display memories.',
        rating: 4.0,
        inStock: true
    },
    {
        id: 27,
        name: 'Rug',
        price: 79.99,
        category: 'Home',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Rug',
        description: 'Soft rug to add warmth to your floor.',
        rating: 4.5,
        inStock: true
    },
    {
        id: 28,
        name: 'Candles',
        price: 12.99,
        category: 'Home',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Candles',
        description: 'Scented candles for a relaxing atmosphere.',
        rating: 4.3,
        inStock: true
    },
    {
        id: 29,
        name: 'Wall Art',
        price: 34.99,
        category: 'Home',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Wall%20Art',
        description: 'Artistic wall decor to personalize your space.',
        rating: 4.4,
        inStock: false
    },
    {
        id: 30,
        name: 'Vase',
        price: 22.99,
        category: 'Home',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Vase',
        description: 'Decorative vase for flowers or display.',
        rating: 4.2,
        inStock: true
    },
    {
        id: 31,
        name: 'Lipstick',
        price: 19.99,
        category: 'Beauty',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Lipstick',
        description: 'Long-lasting lipstick in vibrant colors.',
        rating: 4.4,
        inStock: true
    },
    {
        id: 32,
        name: 'Foundation',
        price: 29.99,
        category: 'Beauty',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Foundation',
        description: 'Smooth foundation for flawless skin.',
        rating: 4.3,
        inStock: true
    },
    {
        id: 33,
        name: 'Shampoo',
        price: 14.99,
        category: 'Beauty',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Shampoo',
        description: 'Nourishing shampoo for healthy hair.',
        rating: 4.5,
        inStock: true
    },
    {
        id: 34,
        name: 'Moisturizer',
        price: 24.99,
        category: 'Beauty',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Moisturizer',
        description: 'Hydrating moisturizer for daily use.',
        rating: 4.6,
        inStock: false
    },
    {
        id: 35,
        name: 'Eyeliner',
        price: 9.99,
        category: 'Beauty',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Eyeliner',
        description: 'Precise eyeliner for defined eyes.',
        rating: 4.2,
        inStock: true
    },
    {
        id: 36,
        name: 'Perfume',
        price: 49.99,
        category: 'Beauty',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Perfume',
        description: 'Elegant perfume with a captivating scent.',
        rating: 4.7,
        inStock: true
    },
    {
        id: 37,
        name: 'Nail Polish',
        price: 7.99,
        category: 'Beauty',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Nail%20Polish',
        description: 'Quick-drying nail polish in various shades.',
        rating: 4.1,
        inStock: true
    },
    {
        id: 38,
        name: 'Hair Brush',
        price: 12.99,
        category: 'Beauty',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Hair%20Brush',
        description: 'Gentle hair brush for detangling.',
        rating: 4.3,
        inStock: true
    },
    {
        id: 39,
        name: 'Face Mask',
        price: 18.99,
        category: 'Beauty',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Face%20Mask',
        description: 'Revitalizing face mask for glowing skin.',
        rating: 4.5,
        inStock: false
    },
    {
        id: 40,
        name: 'Body Lotion',
        price: 16.99,
        category: 'Beauty',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Body%20Lotion',
        description: 'Soothing body lotion for smooth skin.',
        rating: 4.4,
        inStock: true
    },
    {
        id: 41,
        name: 'Yoga Mat',
        price: 39.99,
        category: 'Sports',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Yoga%20Mat',
        description: 'Non-slip yoga mat for fitness routines.',
        rating: 4.5,
        inStock: true
    },
    {
        id: 42,
        name: 'Dumbbells',
        price: 59.99,
        category: 'Sports',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Dumbbells',
        description: 'Adjustable dumbbells for strength training.',
        rating: 4.6,
        inStock: true
    },
    {
        id: 43,
        name: 'Running Shoes',
        price: 89.99,
        category: 'Sports',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Running%20Shoes',
        description: 'Comfortable running shoes for athletes.',
        rating: 4.7,
        inStock: true
    },
    {
        id: 44,
        name: 'Basketball',
        price: 24.99,
        category: 'Sports',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Basketball',
        description: 'Durable basketball for outdoor play.',
        rating: 4.3,
        inStock: false
    },
    {
        id: 45,
        name: 'Tennis Racket',
        price: 79.99,
        category: 'Sports',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Tennis%20Racket',
        description: 'Lightweight tennis racket for precision.',
        rating: 4.4,
        inStock: true
    },
    {
        id: 46,
        name: 'Swimming Goggles',
        price: 14.99,
        category: 'Sports',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Swimming%20Goggles',
        description: 'Anti-fog swimming goggles for clear vision.',
        rating: 4.2,
        inStock: true
    },
    {
        id: 47,
        name: 'Bike Helmet',
        price: 49.99,
        category: 'Sports',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Bike%20Helmet',
        description: 'Safety bike helmet for cycling.',
        rating: 4.5,
        inStock: true
    },
    {
        id: 48,
        name: 'Golf Clubs',
        price: 199.99,
        category: 'Sports',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Golf%20Clubs',
        description: 'Professional golf clubs set.',
        rating: 4.6,
        inStock: true
    },
    {
        id: 49,
        name: 'Soccer Ball',
        price: 29.99,
        category: 'Sports',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Soccer%20Ball',
        description: 'High-quality soccer ball for matches.',
        rating: 4.4,
        inStock: false
    },
    {
        id: 50,
        name: 'Fitness Tracker',
        price: 149.99,
        category: 'Sports',
        image: 'https://placehold.co/800x800/1e1e1e/white?text=Fitness%20Tracker',
        description: 'Wearable fitness tracker to monitor activity.',
        rating: 4.8,
        inStock: true
    }
];

// Mock analytics data
const mockAnalytics = {
    totalSales: 125000,
    totalOrders: 2500,
    averageOrderValue: 50,
    topProducts: [
        { name: 'Wireless Headphones', sales: 150 },
        { name: 'Smart Watch', sales: 120 },
        { name: 'Laptop Stand', sales: 80 },
    ],
    salesOverTime: [
        { month: 'Jan', sales: 15000 },
        { month: 'Feb', sales: 20000 },
        { month: 'Mar', sales: 18000 },
        { month: 'Apr', sales: 25000 },
        { month: 'May', sales: 30000 },
        { month: 'Jun', sales: 28000 },
    ],
};

// Mock inventory data
const mockInventory = mockProducts.map(product => ({
    id: product.id,
    name: product.name,
    image: product.image,
    stock: product.stock,
    reorderPoint: 10,
    supplier: 'Mock Supplier',
}));

// Mock users data
const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'customer', address: '123 Main St' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin', address: '456 Elm St' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'customer', address: '789 Oak Ave' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'customer', address: '321 Pine Rd' },
];

// Mock orders data
const mockOrders = [
    {
        id: 1,
        userId: 1,
        items: [
            { productId: 1, quantity: 2, price: 199.99 },
            { productId: 2, quantity: 1, price: 299.99 }
        ],
        total: 699.97,
        status: 'completed',
        date: '2023-01-15T10:00:00Z'
    },
    {
        id: 2,
        userId: 2,
        items: [
            { productId: 3, quantity: 1, price: 49.99 },
            { productId: 4, quantity: 3, price: 79.99 }
        ],
        total: 289.96,
        status: 'pending',
        date: '2023-01-16T14:30:00Z'
    },
    {
        id: 3,
        userId: 3,
        items: [
            { productId: 5, quantity: 1, price: 59.99 }
        ],
        total: 59.99,
        status: 'shipped',
        date: '2023-01-17T09:15:00Z'
    }
];

// Mock reviews data
const mockReviews = [
    { id: 1, productId: 1, userId: 1, rating: 5, comment: 'Excellent sound quality!', date: '2023-01-16T12:00:00Z' },
    { id: 2, productId: 1, userId: 2, rating: 4, comment: 'Good, but battery life could be better.', date: '2023-01-17T08:30:00Z' },
    { id: 3, productId: 2, userId: 1, rating: 5, comment: 'Love the health features!', date: '2023-01-18T15:45:00Z' },
    { id: 4, productId: 3, userId: 3, rating: 4, comment: 'Very useful for work.', date: '2023-01-19T11:20:00Z' },
    { id: 5, productId: 4, userId: 4, rating: 5, comment: 'Great sound, portable!', date: '2023-01-20T13:10:00Z' }
];

// Mock categories
const mockCategories = ['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports'];

// Mock settings
const mockSettings = {
    storeName: '1ShopApp Store',
    currency: 'USD',
    timezone: 'UTC',
    notifications: {
        email: true,
        push: false,
    },
};

// Simulate delay - fast for demo
const delay = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

// API functions
export const fetchProducts = async (params = {}) => {
    await delay();
    let filtered = mockProducts;

    if (params.category) {
        filtered = filtered.filter(p => p.category === params.category);
    }
    if (params.search) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(params.search.toLowerCase())
        );
    }

    const total = filtered.length;
    let paginated = filtered;

    if (params.page && params.limit) {
        const page = parseInt(params.page) || 1;
        const limit = parseInt(params.limit) || 10;
        const offset = (page - 1) * limit;
        paginated = filtered.slice(offset, offset + limit);
    }

    return { data: paginated, total };
};

export const fetchProductById = async (id) => {
    await delay();
    const product = mockProducts.find(p => p.id === parseInt(id));
    return product || null;
};

export const fetchAnalytics = async () => {
    await delay();
    return mockAnalytics;
};

export const fetchInventory = async () => {
    await delay();
    return mockInventory;
};

export const updateInventory = async (id, updates) => {
    await delay();
    const index = mockInventory.findIndex(item => item.id === parseInt(id));
    if (index !== -1) {
        mockInventory[index] = { ...mockInventory[index], ...updates };
        return mockInventory[index];
    }
    throw new Error('Item not found');
};

export const fetchSettings = async () => {
    await delay();
    return mockSettings;
};

export const updateSettings = async (updates) => {
    await delay();
    Object.assign(mockSettings, updates);
    return mockSettings;
};

// User management functions
export const getUsers = async () => {
    await delay();
    return mockUsers;
};

export const getUserById = async (id) => {
    await delay();
    const user = mockUsers.find(u => u.id === parseInt(id));
    return user || null;
};

export const updateUser = async (id, updates) => {
    await delay();
    const index = mockUsers.findIndex(u => u.id === parseInt(id));
    if (index !== -1) {
        mockUsers[index] = { ...mockUsers[index], ...updates };
        return mockUsers[index];
    }
    throw new Error('User not found');
};

// Order functions
export const getOrders = async () => {
    await delay();
    return mockOrders;
};

export const getOrderById = async (id) => {
    await delay();
    const order = mockOrders.find(o => o.id === parseInt(id));
    return order || null;
};

export const createOrder = async (orderData) => {
    await delay();
    const newOrder = {
        id: mockOrders.length + 1,
        ...orderData,
        date: new Date().toISOString()
    };
    mockOrders.push(newOrder);
    return newOrder;
};

// Review functions
export const getProductReviews = async (productId) => {
    await delay();
    return mockReviews.filter(r => r.productId === parseInt(productId));
};

export const addReview = async (reviewData) => {
    await delay();
    const newReview = {
        id: mockReviews.length + 1,
        ...reviewData,
        date: new Date().toISOString()
    };
    mockReviews.push(newReview);
    return newReview;
};

// Categories function
export const getCategories = async () => {
    await delay();
    return mockCategories;
};

// Analytics functions
export const getSalesData = async () => {
    await delay();
    return mockAnalytics.salesOverTime;
};

export const getPopularProducts = async () => {
    await delay();
    return mockAnalytics.topProducts;
};