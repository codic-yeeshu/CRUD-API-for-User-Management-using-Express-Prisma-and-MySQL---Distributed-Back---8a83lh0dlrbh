const { prisma } = require("../db/config");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!email || !password)
      return res
        .status(400)
        .json({ error: `${email ? "Password" : "Email"} is required` });

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser)
      return res.status(400).json({
        error: "Email already in use",
      });

    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      name,
      email,
      password: hashedPass,
    });

    return res.status(201).json({
      message: "User created successfully",
      userId: newUser.id,
    });
  } catch (err) {
    console.error(`Error occurred in file: signup.js, function: signup -`, err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { signup };
