const { PrismaClient } = require("@prisma/client");
const crypto = require("crypto");

const prisma = new PrismaClient();

function generateSalt(length = 16) {
  return crypto.randomBytes(length).toString("hex");
}

function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
}

async function main() {
  const email = process.env.TEST_EMAIL;
  const password = process.env.TEST_PASSWORD;

  const salt = generateSalt();
  const passwordHash = hashPassword(password, salt);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password_hash: passwordHash,
      salt,
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
  });
