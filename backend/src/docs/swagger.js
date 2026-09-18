const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Uomo Commerce API",
      version: "1.0.0",
      description: "Authentication, profile and admin catalog APIs for Uomo Commerce.",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Local development server",
      },
    ],
    tags: [
      { name: "Health", description: "API availability" },
      { name: "Auth", description: "Registration and authentication" },
      { name: "Profile", description: "Authenticated user profile" },
      { name: "Users", description: "Admin user management" },
      { name: "Categories", description: "Admin category CRUD" },
      { name: "Products", description: "Admin product CRUD" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Paste the access token returned by POST /auth/login.",
        },
      },
      schemas: {
        Category: {
          type: "object",
          properties: {
            _id: { type: "string", example: "66ad7a7520e20b37247b2f7b" },
            name: { type: "string", example: "T-Shirts" },
            slug: { type: "string", example: "t-shirts" },
            description: { type: "string", example: "Everyday t-shirts" },
            isActive: { type: "boolean", example: true },
          },
        },
        Product: {
          type: "object",
          properties: {
            _id: { type: "string", example: "66ad7b42d2ab8747f2b7da8" },
            name: { type: "string", example: "Classic Black T-Shirt" },
            description: { type: "string", example: "Premium cotton t-shirt" },
            price: { type: "number", example: 29.99 },
            compareAtPrice: { type: "number", nullable: true, example: 39.99 },
            image: { type: "string", example: "https://example.com/shirt.jpg" },
            stock: { type: "integer", example: 20 },
            status: { type: "string", enum: ["active", "draft"], example: "active" },
            category: { type: "string", example: "66ad7a7520e20b37247b2f7b" },
          },
        },
        Error: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Validation failed" },
          },
        },
      },
    },
    paths: {
      "/health": {
        get: {
          tags: ["Health"],
          summary: "Check API status",
          responses: { 200: { description: "API is running" } },
        },
      },
      "/auth/register": {
        post: {
          tags: ["Auth"],
          summary: "Register a customer account",
          requestBody: {
            required: true,
            content: { "application/json": { schema: { type: "object", required: ["name", "email", "password"], properties: { name: { type: "string", example: "Test User" }, email: { type: "string", format: "email", example: "test@example.com" }, password: { type: "string", format: "password", example: "Test@12345" } } } } },
          },
          responses: { 201: { description: "Account created" }, 409: { description: "Email already registered" } },
        },
      },
      "/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Login and receive an access token",
          requestBody: {
            required: true,
            content: { "application/json": { schema: { type: "object", required: ["email", "password"], properties: { email: { type: "string", format: "email", example: "admin@uomo.demo" }, password: { type: "string", format: "password", example: "Admin@12345" } } } } },
          },
          responses: { 200: { description: "Logged in" }, 401: { description: "Invalid credentials" } },
        },
      },
      "/auth/refresh": { post: { tags: ["Auth"], summary: "Refresh the access token", responses: { 200: { description: "Token refreshed" }, 401: { description: "Invalid refresh cookie" } } } },
      "/auth/logout": { post: { tags: ["Auth"], summary: "Logout and clear refresh cookie", responses: { 200: { description: "Logged out" } } } },
      "/me": {
        get: { tags: ["Profile"], summary: "Get current profile", security: [{ bearerAuth: [] }], responses: { 200: { description: "Profile returned" }, 401: { description: "Authentication required" } } },
        patch: { tags: ["Profile"], summary: "Update current profile", security: [{ bearerAuth: [] }], requestBody: { required: true, content: { "application/json": { schema: { type: "object", properties: { name: { type: "string", example: "Updated Name" } } } } } }, responses: { 200: { description: "Profile updated" }, 401: { description: "Authentication required" } } },
      },
      "/admin/users": {
        get: { tags: ["Users"], summary: "List all users", security: [{ bearerAuth: [] }], responses: { 200: { description: "Users returned" }, 403: { description: "Admin access required" } } },
      },
      "/admin/users/{id}": {
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        patch: { tags: ["Users"], summary: "Update a user", security: [{ bearerAuth: [] }], requestBody: { content: { "application/json": { schema: { type: "object", properties: { name: { type: "string" }, role: { type: "string", enum: ["customer", "admin"] }, status: { type: "string", enum: ["active", "suspended"] } } } } } }, responses: { 200: { description: "User updated" }, 404: { description: "User not found" } } },
        delete: { tags: ["Users"], summary: "Delete a user", security: [{ bearerAuth: [] }], responses: { 200: { description: "User deleted" }, 400: { description: "Cannot delete own account" } } },
      },
      "/admin/categories": {
        get: { tags: ["Categories"], summary: "List categories", security: [{ bearerAuth: [] }], responses: { 200: { description: "Categories returned" } } },
        post: { tags: ["Categories"], summary: "Create a category", security: [{ bearerAuth: [] }], requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["name"], properties: { name: { type: "string", example: "T-Shirts" }, description: { type: "string" }, isActive: { type: "boolean", default: true } } } } } }, responses: { 201: { description: "Category created" }, 409: { description: "Category already exists" } } },
      },
      "/admin/categories/{id}": {
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        patch: { tags: ["Categories"], summary: "Update a category", security: [{ bearerAuth: [] }], requestBody: { content: { "application/json": { schema: { $ref: "#/components/schemas/Category" } } } }, responses: { 200: { description: "Category updated" }, 404: { description: "Category not found" } } },
        delete: { tags: ["Categories"], summary: "Delete a category", security: [{ bearerAuth: [] }], responses: { 200: { description: "Category deleted" }, 409: { description: "Category is used by products" } } },
      },
      "/admin/products": {
        get: { tags: ["Products"], summary: "List products", security: [{ bearerAuth: [] }], responses: { 200: { description: "Products returned" } } },
        post: { tags: ["Products"], summary: "Create a product", security: [{ bearerAuth: [] }], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Product" } } } }, responses: { 201: { description: "Product created" }, 422: { description: "Name, price and valid category are required" } } },
      },
      "/admin/products/{id}": {
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        patch: { tags: ["Products"], summary: "Update a product", security: [{ bearerAuth: [] }], requestBody: { content: { "application/json": { schema: { $ref: "#/components/schemas/Product" } } } }, responses: { 200: { description: "Product updated" }, 404: { description: "Product not found" } } },
        delete: { tags: ["Products"], summary: "Delete a product", security: [{ bearerAuth: [] }], responses: { 200: { description: "Product deleted" }, 404: { description: "Product not found" } } },
      },
    },
  },
  apis: [],
};

module.exports = swaggerJSDoc(options);
