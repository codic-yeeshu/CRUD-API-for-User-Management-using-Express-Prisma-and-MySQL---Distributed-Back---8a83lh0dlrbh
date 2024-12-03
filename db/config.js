const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to db");
  } catch (error) {
    console.log("Error while connecting to db", error);
  }
};

module.exports = { prisma, connectDB };
