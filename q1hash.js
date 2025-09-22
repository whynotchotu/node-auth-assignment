// Q1: Demonstrate password hashing and verification with bcrypt
const bcrypt = require("bcryptjs");

async function run() {
  const password = "mySecret123";

  // Hash password
  const hashed = await bcrypt.hash(password, 10);
  console.log("Original:", password);
  console.log("Hashed:", hashed);

  // Verify
  const isMatch = await bcrypt.compare("mySecret123", hashed);
  console.log("Password Match:", isMatch);
}

run();
