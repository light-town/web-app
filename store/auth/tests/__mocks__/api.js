export default {
  auth: {
    signUp: jest.fn(),
  },
  storage: {
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
  },
};
