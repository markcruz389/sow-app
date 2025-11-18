const { PrismaClient } = require("@prisma/client");
const crypto = require("crypto");
const { TRANSLATIONS, LANGUAGES } = require("../translation-data");

const prisma = new PrismaClient();

function generateSalt(length = 16) {
  return crypto.randomBytes(length).toString("hex");
}

function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
}

async function seedUser() {
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

async function seedTranslations() {
  for (const item of TRANSLATIONS) {
    const translationKey = await prisma.translationKeys.upsert({
      where: { key: item.key },
      update: {},
      create: { key: item.key },
    });

    for (const lang of LANGUAGES) {
      await prisma.translations.upsert({
        where: {
          key_id_language: {
            key_id: translationKey.id,
            language: lang,
          },
        },
        update: {},
        create: {
          key_id: translationKey.id,
          language: lang,
          value: item[lang],
        },
      });
    }
  }
}

async function main() {
  await Promise.all([seedUser(), seedTranslations()]);
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
  });
