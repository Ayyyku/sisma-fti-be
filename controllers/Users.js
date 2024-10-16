import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;
  if (password != confirmPassword) {
    return res.status(400).json({ msg: "Password does not match" });
  }

  const hashedPassword = await argon2.hash(password);
  try {
    await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    });
    res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  const { name, email, password, confirmPassword, role } = req.body;
  let hashedPassword;
  if (password === "" || password === null) {
    hashedPassword = user.password;
  } else {
    hashedPassword = await argon2.hash(password);
  }
  if (password != confirmPassword) {
    return res.status(400).json({ msg: "Password does not match" });
  }
  try {
    await User.update(
      {
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "User updated successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  try {
    await User.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
