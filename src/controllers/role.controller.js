const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const { Role } = require("../models");
const response = require("../utils/response");
const pick = require("../utils/pick");

const getRoles = catchAsync(async (req, res) => {
  const roles = await Role.find();
  res.status(200).json(response(200, "Thành công", roles));
});

const createRole = catchAsync(async (req, res) => {
  await Role.create(req.body);

  res.status(201).json(response(201, "Thành công"));
});

const getRoleById = catchAsync(async (req, res) => {
  const { roleId } = req.params;

  const role = await Role.findById(roleId);

  if (!role) {
    throw new ApiError(404, "Role not found");
  }

  res.status(200).json(response(200, "Thành công", role));
});

const updateRoleById = catchAsync(async (req, res) => {
  const { roleId } = req.params;

  const role = await Role.findById(roleId);
  Object.assign(role, dataUpdate);

  await role.save();

  res.status(200).json(response(200, "Thành công", role));
});

const deleteRoleById = catchAsync(async (req, res) => {
  const { roleId } = req.params;

  const deletedRole = await Role.findByIdAndDelete(roleId);
  if (!deletedRole) {
    throw new ApiError(404, "Role not found");
  }

  res.status(200).json(response(200, "Thành công", role));
});

module.exports = {
  getRoles,
  createRole,
  getRoleById,
  updateRoleById,
  deleteRoleById,
};
