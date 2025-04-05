
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// 1. Extended AxiosRequestConfig interface
declare module 'axios' {
  interface InternalAxiosRequestConfig<D = any> {
    _retry?: boolean;
  }
}

// 2. Type Definitions
type UserCredentials = {
  email: string;
  password: string;
};

type UserRegistration = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

type AuthResponse = {
  token: string;
  refreshToken?: string;
  user: {
    id: string;
    name: string;
    email: string;
    role?: string;
  };
};

type ApiResponse<T> = {
  data?: T;
  error?: string;
  statusCode?: number;
};

type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

type ErrorResponse = {
  message?: string;
  error?: string;
  statusCode?: number;
};

type PasswordResetRequest = {
  email: string;
};

type PasswordResetConfirm = {
  token: string;
  newPassword: string;
};

// 3. Configure Axios Instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 4. Request/Response Interceptors
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ErrorResponse>) => {
    if (typeof window === 'undefined') {
      return Promise.reject(error);
    }

    const originalRequest = error.config;
    
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token available');
        
        const { data } = await api.post<RefreshTokenResponse>('/auth/refresh', { refreshToken });
        localStorage.setItem('accessToken', data.accessToken);
        if (data.refreshToken) {
          localStorage.setItem('refreshToken', data.refreshToken);
        }
        
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// 5. Error Handling Utilities
function isError(error: unknown): error is Error {
  return error instanceof Error;
}

function isAxiosError(error: unknown): error is AxiosError<ErrorResponse> {
  return (error as AxiosError).isAxiosError !== undefined;
}

function handleApiError(error: unknown): never {
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

// 6. Authentication Functions
export async function loginUser(
  credentials: UserCredentials
): Promise<ApiResponse<AuthResponse>> {
  try {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', response.data.token);
      if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
    }
    return { data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
}

export async function registerUser(
  userData: UserRegistration
): Promise<ApiResponse<AuthResponse>> {
  try {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    if (typeof window !== 'undefined' && response.data.token) {
      localStorage.setItem('accessToken', response.data.token);
      if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
    }
    return { data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
}

export async function logoutUser(): Promise<ApiResponse<void>> {
  try {
    await api.post('/auth/logout');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
    return {};
  } catch (error) {
    return handleApiError(error);
  }
}

export async function refreshToken(): Promise<ApiResponse<RefreshTokenResponse>> {
  try {
    if (typeof window === 'undefined') {
      throw new Error('Refresh token is only available on client side');
    }

    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token available');
    
    const response = await api.post<RefreshTokenResponse>('/auth/refresh', { refreshToken });
    localStorage.setItem('accessToken', response.data.accessToken);
    if (response.data.refreshToken) {
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    
    return { data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getCurrentUser(): Promise<ApiResponse<AuthResponse['user']>> {
  try {
    const response = await api.get<AuthResponse['user']>('/auth/me');
    return { data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
}

export async function requestPasswordReset(
  email: string
): Promise<ApiResponse<{ message: string }>> {
  try {
    const response = await api.post<{ message: string }>('/auth/forgot-password', { email });
    return { data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
}

export async function resetPassword(
  token: string,
  newPassword: string
): Promise<ApiResponse<{ message: string }>> {
  try {
    const response = await api.post<{ message: string }>('/auth/reset-password', { token, newPassword });
    return { data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
}

export async function verifyEmail(
  token: string
): Promise<ApiResponse<{ message: string }>> {
  try {
    const response = await api.post<{ message: string }>('/auth/verify-email', { token });
    return { data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
}

// 7. Utility Functions
export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePassword(password: string): {
  valid: boolean;
  message?: string;
} {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  return { valid: true };
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('accessToken');
}

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
}

export function setAuthTokens(accessToken: string, refreshToken?: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', accessToken);
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  }
}

export function clearAuthTokens(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}