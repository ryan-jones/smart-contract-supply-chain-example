import { Response } from "express";

export const unauthorized = (message: string) => {
  return { status: 401, message };
};

export const forbidden = (message: string) => {
  return { status: 403, message };
};

export const serverError = (message: string) => {
  return { status: 500, message };
};
