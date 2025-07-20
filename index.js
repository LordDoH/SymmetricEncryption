import express from "express";
import crypto from "crypto";
import fs from "fs";

const app = express();

app.use(express.json());

const key = crypto.randomBytes(32); // Generate a 256-bit key
const iv = crypto.randomBytes(16); // Generate a 128-bit initialization vector
const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

app.get("/", (req, res) => {
  res.send("Welcome to the Symmetric Encryption API");
});

app.post("/encrypt", (req, res) => {
  const text = req.body.text;
  /**
   * Encrypts the provided text using the specified cipher and returns the encrypted data as a hexadecimal string.
   *
   * @type {string}
   */
  const encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
  res.json({ encrypted });
});

app.post("/decrypt", (req, res) => {
  const encrypted = req.body.encrypted;
  /**
   * Decrypted plaintext obtained from the encrypted input using the decipher instance.
   *
   * @type {string}
   */
  const decrypted =
    decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");
  res.json({ decrypted });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

fs.writeFileSync("key.bin", key);
fs.writeFileSync("iv.bin", iv);
