import Profile, { IProfile } from "../models/profile";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";

const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

const validatePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (user: IProfile): string => {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, role } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new Profile({
      email,
      password: hashedPassword,
      role: role || "basic",
    });
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    newUser.accessToken = accessToken;
    await newUser.save();
    res.send({
      data: newUser,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IProfile = await Profile.findOne({ email: req.body.email });
    if (!user) {
      return next(new Error("Email does not exist"));
    }
    const validPassword: boolean = await validatePassword(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return next(new Error("Password is not correct"));
    }
    const accessToken: string = generateToken(user);
    await Profile.findByIdAndUpdate(user._id, { accessToken });
    const { email, role, address, firstName, lastName } = user;
    res.send({
      data: { address, email, firstName, lastName, role },
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const editUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IProfile = await Profile.findById(req.params.id);
    if (!user) {
      return next(new Error("Email does not exist"));
    }
    const accessToken: string = generateToken(user);
    const updatedUser: IProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        accessToken,
      }
    );

    const { email, role, address, firstName, lastName } = updatedUser;
    res.send({
      data: { address, email, firstName, lastName, role },
      accessToken,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result: IProfile = await Profile.findByIdAndDelete(req.params.id);
    res.send({ message: "Profile successfully deleted" });
  } catch (err) {
    next(err);
  }
};
