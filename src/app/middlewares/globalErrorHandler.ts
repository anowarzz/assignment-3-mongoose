import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  // Global error handler

  if (error) {
    // For validation errors remove 2 extra properties from error object -> path & value
    if (error.name === "ValidationError") {
      if (error.errors) {
        Object.keys(error.errors).forEach((field) => {
          if (error.errors[field].properties) {
            // Remove path and value from properties if they exist
            if (error.errors[field].properties.path !== undefined) {
              delete error.errors[field].properties.path;
            }
            if (error.errors[field].properties.value !== undefined) {
              delete error.errors[field].properties.value;
            }
          }
        });
      }

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: {
          name: error.name,
          errors: error.errors,
        },
      });
    }

    // creating duplicate error message
    const duplicateError = (error: any) => {
      const duplicateField = Object.keys(error.keyPattern)[0];
      const errorMessage = `${duplicateField} must be unique.`;

      return {
        success: false,
        message: "Duplicate Value Error",
        error: errorMessage,
      };
    };

    // sending duplicate error response
    if (error.code === 11000) {
      const duplicateErrorResponse = duplicateError(error);
      return res.status(400).json(duplicateErrorResponse);
    }

    res.status(400).json({
      success: false,
      message: error.customMessage || error.message || "something went wrong",
      error: {
        message: error.message || "An error occurred",
      },
    });
    return;
  }
};

export default globalErrorHandler;
