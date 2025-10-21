const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { connectDB } = require("../app");

let mongoServer;

// Global setup
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  process.env.MONGODB_URI = mongoUri;
  process.env.JWT_SECRET = "test-jwt-secret";

  await connectDB();
}, 30000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Clean database between tests
afterEach(async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany();
  }
});
