// API Service for communicating with the backend
const API_BASE_URL = 'http://localhost:5000/api';

// Token management
const getToken = () => localStorage.getItem('authToken');
const setToken = (token) => localStorage.setItem('authToken', token);
const removeToken = () => localStorage.removeItem('authToken');

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorMessage = 'API request failed';
      try {
        const error = await response.json();
        errorMessage = error.message || errorMessage;
      } catch (e) {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Failed to connect to backend server. Please ensure the backend is running on http://localhost:5000');
    }
    throw error;
  }
};

// Auth endpoints
export const authAPI = {
  register: async (username, email, password) => {
    const data = await apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
    if (data.token) setToken(data.token);
    return data;
  },

  login: async (email, password) => {
    const data = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.token) setToken(data.token);
    return data;
  },

  logout: () => {
    removeToken();
  },

  getProfile: async () => {
    return apiCall('/auth/profile');
  },

  googleLogin: async (accessToken) => {
    const data = await apiCall('/auth/social-login', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
    if (data.token) setToken(data.token);
    return data;
  },

  isAuthenticated: () => !!getToken(),
};

// Product endpoints
export const productAPI = {
  getProducts: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `/products?${queryString}` : '/products';
      const data = await apiCall(endpoint);
      
      // Transform API response to match frontend expectations
      const products = data.data.products || [];
      return {
        data: products.map(product => ({
          id: product.id,
          name: product.title,
          title: product.title,
          price: parseFloat(product.price),
          originalPrice: null,
          category: product.category,
          image: product.imageUrl,
          description: product.description,
          rating: 4.5,
          inStock: product.stock > 0,
          stock: product.stock,
          isNew: false,
        })),
        total: data.data.total || 0,
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  getProductById: async (id) => {
    const data = await apiCall(`/products/${id}`);
    const product = data.data;
    
    return {
      id: product.id,
      name: product.title,
      title: product.title,
      price: parseFloat(product.price),
      originalPrice: null,
      category: product.category,
      image: product.imageUrl,
      description: product.description,
      rating: 4.5,
      inStock: product.stock > 0,
      stock: product.stock,
      isNew: false,
    };
  },

  createProduct: async (productData) => {
    return apiCall('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  updateProduct: async (id, productData) => {
    return apiCall(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  deleteProduct: async (id) => {
    return apiCall(`/products/${id}`, {
      method: 'DELETE',
    });
  },

  getCategories: async () => {
    // Extract unique categories from products or return default categories
    const data = await productAPI.getProducts({ limit: 100 });
    const categories = [...new Set(data.data.map(p => p.category))];
    return categories.length > 0 ? categories : ['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports'];
  },
};

export default { authAPI, productAPI, getToken, setToken, removeToken };
