const Auth = require("../models/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Lütfen geçerli bir e-posta adresi girin." });
    }

    const user = await Auth.findOne({ email });

    if (user) {
      return res
        .status(500)
        .json({ message: "Bu email hesabi zaten kullanilmaktadir!" });
    }
    if (password.length < 6) {
      return res
        .status(500)
        .json({ message: "Parolaniz 6 karakterden kucuk olmamalii...." });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const newUser = await Auth.create({
      username,
      email,
      password: passwordHash,
    });

    const userToken = await jwt.sign(
      { id: newUser.id },
      process.env.SECRET_TOKEN,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      status: "OK",
      newUser,
      userToken,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });

    if (!user) {
      return res
        .status(500)
        .json({ message: "Boyle bir kullanici bulunamadi...." });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(500).json({ messsage: "Parolaniz yanlis.." });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });
    res.status(200).json({
      status: "OK",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
};
