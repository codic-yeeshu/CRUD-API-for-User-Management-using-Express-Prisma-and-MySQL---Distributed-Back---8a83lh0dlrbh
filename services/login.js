const { prisma } = require("../db/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //   input validation
    if (!email || !password)
      return res.status(400).json({ error: `Email and password are required` });

    // looking for existing user
    const user = await prisma.user.findFirst({ where: { email } });

    // if user not found
    if (!user)
      return res.status(404).json({
        error: "User not found",
      });

    // checking for password
    const passCheck = await bcrypt.compare(password, user.password);

    if (!passCheck) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    // generating jwt token
    const token = jwt.sign(
      {
        email: user.email,
        userId: user.id,
      },
      secret,
      { expiresIn: "1d" }
    );
    return res.status(200).json({
      userdata: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      accesstoken: token,
    });
  } catch (err) {
    console.error(`Error occurred in file: login.js, function: login -`, err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = { login };
