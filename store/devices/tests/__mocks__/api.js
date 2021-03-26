export default {
  devices: {
    registerDevice: jest.fn(),
    getOne: jest.fn(),
  },
  storage: {
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
  },
};
