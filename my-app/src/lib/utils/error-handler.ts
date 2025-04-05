// // src/lib/utils/error-handler.ts
// import { AxiosError } from 'axios';

// export function handleError(error: unknown): never {
//   if (error instanceof AxiosError) {
//     throw new Error(error.response?.data?.message || 'Request failed');
//   }
//   if (error instanceof Error) {
//     throw error;
//   }
//   throw new Error('Unknown error occurred');
// }

// // Then in your auth.ts
// import { errorhandler } from "@/lib/utils/error-handler"

// export async function loginUser(credentials: { email: string; password: string }) {
//   try {
//     // your logic
//   } catch (error) {
//     handleError(error);
//   }
// }

// export { errorhandler };



// src/lib/utils/error-handler.ts
import { AxiosError } from 'axios';

type ErrorResponse = {
  message?: string;
  error?: string;
  statusCode?: number;
};

export function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export function isAxiosError(error: unknown): error is AxiosError<ErrorResponse> {
  return (error as AxiosError).isAxiosError !== undefined;
}

export function handleApiError(error: unknown): never {
  if (isAxiosError(error)) {
    const message = error.response?.data?.message || 
                   error.response?.data?.error || 
                   error.message || 
                   'API request failed';
    const statusCode = error.response?.status;
    
    console.error(`API Error [${statusCode}]:`, message);
    throw new Error(message);
  }
  
  if (isError(error)) {
    console.error('Error:', error.message);
    throw error;
  }
  
  console.error('Unknown error occurred:', error);
  throw new Error('An unknown error occurred');
}

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}