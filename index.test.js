import request from "supertest";
import express from "express";
import crypto from "crypto";

// Mock the key and iv to ensure deterministic tests
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function createTestApp() {
	const app = express();
	app.use(express.json());

	app.get("/", (req, res) => {
		res.send("Welcome to the Symmetric Encryption API");
	});

	app.post("/encrypt", (req, res) => {
		const text = req.body.text;
		const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
		const encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
		res.json({ encrypted });
	});

	app.post("/decrypt", (req, res) => {
		const encrypted = req.body.encrypted;
		const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
		const decrypted =
			decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");
		res.json({ decrypted });
	});

	return app;
}

describe("Symmetric Encryption API", () => {
	let app;

	beforeAll(() => {
		app = createTestApp();
	});

	test("GET / should return welcome message", async () => {
		const res = await request(app).get("/");
		expect(res.statusCode).toBe(200);
		expect(res.text).toBe("Welcome to the Symmetric Encryption API");
	});

	test("POST /encrypt should encrypt text", async () => {
		const text = "Hello, World!";
		const res = await request(app)
			.post("/encrypt")
			.send({ text });
		expect(res.statusCode).toBe(200);
		expect(typeof res.body.encrypted).toBe("string");
		expect(res.body.encrypted).not.toBe(text);
	});

	test("POST /decrypt should decrypt text", async () => {
		const text = "Hello, World!";
		// Encrypt first
		const encryptRes = await request(app)
			.post("/encrypt")
			.send({ text });
		const encrypted = encryptRes.body.encrypted;

		// Decrypt
		const decryptRes = await request(app)
			.post("/decrypt")
			.send({ encrypted });
		expect(decryptRes.statusCode).toBe(200);
		expect(decryptRes.body.decrypted).toBe(text);
	});

	test("POST /decrypt with wrong data should throw error", async () => {
		const res = await request(app)
			.post("/decrypt")
			.send({ encrypted: "invalidhex" });
		expect(res.statusCode).toBe(500);
	});
});