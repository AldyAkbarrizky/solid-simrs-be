import { Response } from "express";

export const successResponse = (
  res: Response,
  message: string,
  data: any,
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
  res: Response,
  message: string,
  statusCode = 500
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export const paginatedResponse = (
  res: Response,
  message: string,
  data: { count: number; rows: any[] },
  page: number,
  limit: number
) => {
  const { count, rows } = data;
  return res.status(200).json({
    success: true,
    message,
    data: rows,
    pagination: {
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      itemsPerPage: limit,
    },
  });
};
