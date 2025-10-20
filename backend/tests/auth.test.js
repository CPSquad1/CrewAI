const request = require("supertest");
const mongoose = require("mongoose");
const { app } = require("../app");
const User = require("../src/models/User");

jest.setTimeout(30000);

describe("Authentication API", () => {
  describe("POST /api/auth/register", () => {
    const validUserData = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      skills: ["JavaScript", "Node.js"],
      availability: "available",
    };

    it("should register a new user successfully", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send(validUserData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("User registered successfully");
      expect(response.body.data.user.name).toBe(validUserData.name);
      expect(response.body.data.user.email).toBe(
        validUserData.email.toLowerCase()
      );
      expect(response.body.data.user.password).toBeUndefined();
      expect(response.body.data.user.skills).toEqual(validUserData.skills);
      expect(response.body.data.user.availability).toBe(
        validUserData.availability
      );
      expect(response.body.data.token).toBeDefined();
      expect(typeof response.body.data.token).toBe("string");
    });

    it("should fail with duplicate email", async () => {
      // Register first user
      await request(app).post("/api/auth/register").send(validUserData);

      // Try to register with same email
      const response = await request(app)
        .post("/api/auth/register")
        .send(validUserData)
        .expect(409);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("already exists");
      expect(response.body.errors.email).toBeDefined();
    });

    it("should fail with invalid email format", async () => {
      const invalidData = {
        ...validUserData,
        email: "invalid-email",
      };

      const response = await request(app)
        .post("/api/auth/register")
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors.email).toBeDefined();
    });

    it("should fail with short password", async () => {
      const invalidData = {
        ...validUserData,
        password: "123",
      };

      const response = await request(app)
        .post("/api/auth/register")
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors.password).toBeDefined();
    });

    it("should fail with missing required fields", async () => {
      const invalidData = {
        name: "",
        email: "",
        password: "",
      };

      const response = await request(app)
        .post("/api/auth/register")
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors.name).toBeDefined();
      expect(response.body.errors.email).toBeDefined();
      expect(response.body.errors.password).toBeDefined();
    });
  });

  describe("POST /api/auth/login", () => {
    const userCredentials = {
      email: "test@example.com",
      password: "password123",
    };

    beforeEach(async () => {
      // Create a user for login tests
      await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: userCredentials.email,
        password: userCredentials.password,
      });
    });

    it("should login successfully with valid credentials", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send(userCredentials)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Login successful");
      expect(response.body.data.user.email).toBe(userCredentials.email);
      expect(response.body.data.user.password).toBeUndefined();
      expect(response.body.data.token).toBeDefined();
      expect(typeof response.body.data.token).toBe("string");
    });

    it("should fail with incorrect password", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: userCredentials.email,
          password: "wrongpassword",
        })
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Invalid credentials");
      expect(response.body.errors.password).toBeDefined();
    });

    it("should fail with non-existent email", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "nonexistent@example.com",
          password: userCredentials.password,
        })
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Invalid credentials");
      expect(response.body.errors.email).toBeDefined();
    });

    it("should fail with missing credentials", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "",
          password: "",
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors.email).toBeDefined();
      expect(response.body.errors.password).toBeDefined();
    });
  });

  describe("GET /api/auth/profile", () => {
    let authToken;

    beforeEach(async () => {
      // Register and login to get token
      const registerResponse = await request(app)
        .post("/api/auth/register")
        .send({
          name: "Profile Test User",
          email: "profile@example.com",
          password: "password123",
        });

      authToken = registerResponse.body.data.token;
    });

    it("should return user profile with valid token", async () => {
      const response = await request(app)
        .get("/api/auth/profile")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe("profile@example.com");
      expect(response.body.data.user.name).toBe("Profile Test User");
      expect(response.body.data.user.password).toBeUndefined();
    });

    it("should return 401 without authorization header", async () => {
      const response = await request(app).get("/api/auth/profile").expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("No token provided");
    });

    it("should return 401 with invalid token", async () => {
      const response = await request(app)
        .get("/api/auth/profile")
        .set("Authorization", "Bearer invalid-token-here")
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("Invalid token");
    });

    it("should return 401 with malformed token", async () => {
      const response = await request(app)
        .get("/api/auth/profile")
        .set("Authorization", "InvalidFormat")
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe("PUT /api/auth/profile", () => {
    let authToken;

    beforeEach(async () => {
      const registerResponse = await request(app)
        .post("/api/auth/register")
        .send({
          name: "Original Name",
          email: "original@example.com",
          password: "password123",
          skills: ["JavaScript"],
          availability: "available",
        });

      authToken = registerResponse.body.data.token;
    });

    it("should update profile successfully", async () => {
      const updateData = {
        name: "Updated Name",
        skills: ["JavaScript", "React", "Node.js"],
        availability: "partially-available",
      };

      const response = await request(app)
        .put("/api/auth/profile")
        .set("Authorization", `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Profile updated successfully");
      expect(response.body.data.user.name).toBe(updateData.name);
      expect(response.body.data.user.skills).toEqual(updateData.skills);
      expect(response.body.data.user.availability).toBe(
        updateData.availability
      );
    });

    it("should prevent duplicate email when updating", async () => {
      // Create another user
      await request(app).post("/api/auth/register").send({
        name: "Another User",
        email: "another@example.com",
        password: "password123",
      });

      // Try to update email to existing one
      const response = await request(app)
        .put("/api/auth/profile")
        .set("Authorization", `Bearer ${authToken}`)
        .send({ email: "another@example.com" })
        .expect(409);

      expect(response.body.success).toBe(false);
      expect(response.body.errors.email).toBeDefined();
    });

    it("should allow updating to same email", async () => {
      const response = await request(app)
        .put("/api/auth/profile")
        .set("Authorization", `Bearer ${authToken}`)
        .send({ email: "original@example.com" })
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it("should validate update data", async () => {
      const invalidData = {
        email: "invalid-email",
        availability: "invalid-status",
      };

      const response = await request(app)
        .put("/api/auth/profile")
        .set("Authorization", `Bearer ${authToken}`)
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors.email).toBeDefined();
      expect(response.body.errors.availability).toBeDefined();
    });
  });
});
