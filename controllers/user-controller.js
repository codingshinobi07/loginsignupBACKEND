import User from "../models/User.js";
import bcrypt from  'bcryptjs'
export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) return res.status(404).json({ message: "User not found" });
  return res.status(200).json(users);
};
export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let exis;
  try {
    exis = await User.findOne({ email });
  } catch {
    console.log(err);
  }
  if (exis) return res.status(400).json({ message: "User already exist" });
    const hashedpassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password:hashedpassword,
  });

  try {
   await user.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ user });
};
export const login = async (req, res, next) => {
  const {  email, password } = req.body;
  let exis;
  
  try {
    exis = await User.findOne({ email });
  } catch {
    console.log(err);
  }
  if (!exis) return res.status(404).json({ message: "User not exist" });

  const ispass = bcrypt.compareSync(password, exis.password);
  if (!ispass) {
    return res.status(400).json({message:"incorrect"});
  }
     return res.status(200).json({ message: "correct" });
};

export default getAllUser;
