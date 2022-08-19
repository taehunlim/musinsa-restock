import { Response, NextFunction } from 'express';

function errorHandler(
   err: Error,
   _req: Request,
   res: Response,
   _next: NextFunction,
) {
   switch (true) {
      case typeof err === 'string':
         const is404 = err.toString().endsWith('Not Found');
         const statusCode = is404 ? 404 : 400;
         return res.status(statusCode).json({
            message: err,
         });

      //mongoose error
      case err.name === 'ValidationError':
         return res.status(400).json({
            message: err.message,
         });

      case err.name === 'UnauthorizedError':
         return res.status(401).json({
            message: err.message,
         });

      default:
         return res.status(500).json({
            message: err.message,
         });
   }
}

module.exports = errorHandler;
