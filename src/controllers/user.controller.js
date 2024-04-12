const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const { User } = require("../models");
const response = require("../utils/response");
const pick = require("../utils/pick");

const getUsers = catchAsync(async (req, res) => {
  console.log("run");
  const users = await User.find();

  res.status(200).json(response(200, "Thành công", users));
});

const createUser = catchAsync(async (req, res) => {
  await User.create(req.body);

  res.status(201).json(response(201, "Thành công"));
});

const getUserById = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(response(200, "Thành công", user));
});

const updateUserById = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  Object.assign(user, dataUpdate);

  await user.save();

  res.status(200).json(response(200, "Thành công", user));
});

const deleteUserById = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const deletedUser = await User.findByIdAndDelete(userId);
  if (!deletedUser) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(response(200, "Thành công"));
});

const updateProfile = catchAsync(async (req, res) => {
  const user = req.user;

  const dataUpdate = pick(req.body, ["username", "address", "phone", "avatar"]);

  Object.assign(user, dataUpdate);

  await user.save();

  res.status(200).json(response(200, "Thành công", user));
});

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  updateProfile,
};
