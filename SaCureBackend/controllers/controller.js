const User = require("../models/profile");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json({ 
        "data": newUser,
        msg: "User account successfully created",
     });
  } else {
    res.json({
      msg: "User already exists",
      success: false,
    });
  }
});

const getAllUsers = asyncHandler (async (req, res) =>{
  try{
    const all = await User.find();
    res.json(all);
  }catch (error) {
    throw new Error(error);
  }
});

const getaUser = asyncHandler (async (req, res) =>{
    const { id } = req.params;
    try{
      const findUser = await User.findById(id);
      res.json({ findUser });
    }catch (error) {
      throw new Error(error);
    }
  });

const update = asyncHandler (async (req, res) =>{
    const { id } = req.params;
    try{
      const updateUser = await User.findByIdAndUpdate(id,
        {
           name: req?.body.name,
           email: req?.body.email,
           mobile: req?.body.mobile
        }, {new: true});
      res.json({updateUser});
    }catch (error) {
      throw new Error(error);
    }
  });

const deletedUser = asyncHandler (async (req, res) =>{
  const { id } = req.params;
    try{
      const find = await User.findByIdAndUpdate(id);
      res.json({find});
    }catch (error) {
      throw new Error(error);
    }
  });

module.exports = { createUser, getAllUsers, getaUser, update, deletedUser };