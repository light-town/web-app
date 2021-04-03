export default {
  auth: {
    signUp: jest.fn(),
    createSession: jest.fn(),
    startSession: jest.fn(),
  },
  storage: {
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
  },
  devices: {
    registerDevice: jest.fn(),
    getOne: jest.fn(),
  },
};
