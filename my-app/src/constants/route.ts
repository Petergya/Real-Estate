export const ROUTES = {
    // Public routes
    HOME: '/',
    ABOUT: '/about',
    CONTACT: '/contact',
    PROPERTIES: '/properties',
    PROPERTY_DETAIL: (id: string) => `/properties/${id}`,
    PROPERTY_PAYMENT: (id: string) => `/properties/${id}/payment`,
  
    // Auth routes
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  
    // User routes
    ACCOUNT: '/account',
    FAVORITES: '/favorites',
    SETTINGS: '/settings',
  
    // Admin routes
    ADMIN: '/admin',
    ADMIN_DASHBOARD: '/admin/dashboard',
    ADMIN_PROPERTIES: '/admin/properties',
    ADMIN_PROPERTY_CREATE: '/admin/properties/new',
    ADMIN_PROPERTY_EDIT: (id: string) => `/admin/properties/${id}`,
    ADMIN_USERS: '/admin/users',
  
    // API routes
    API: {
      AUTH: '/api/auth',
      PROPERTIES: '/api/properties',
      FAVORITES: '/api/favorites',
      PAYMENTS: '/api/payments',
      USERS: '/api/users',
    },
  
    // External routes
    EXTERNAL: {
      FACEBOOK: 'https://facebook.com',
      TWITTER: 'https://twitter.com',
      INSTAGRAM: 'https://instagram.com',
      LINKEDIN: 'https://linkedin.com',
      PRIVACY_POLICY: 'https://example.com/privacy',
      TERMS_OF_SERVICE: 'https://example.com/terms',
    },
  } as const;
  
  export type AppRoute = keyof typeof ROUTES;
  
  // Helper type for route params
  export type RouteParams = {
    [K in keyof typeof ROUTES]: typeof ROUTES[K] extends (param: any) => string 
      ? Parameters<typeof ROUTES[K]>[0]
      : never;
  };
  
  // Navigation items for different parts of the app
  export const NAV_ITEMS = {
    MAIN: [
      { name: 'Home', href: ROUTES.HOME },
      { name: 'Properties', href: ROUTES.PROPERTIES },
      { name: 'About', href: ROUTES.ABOUT },
      { name: 'Contact', href: ROUTES.CONTACT },
    ],
    AUTH: [
      { name: 'Login', href: ROUTES.LOGIN },
      { name: 'Register', href: ROUTES.REGISTER },
    ],
    USER: [
      { name: 'Account', href: ROUTES.ACCOUNT },
      { name: 'Favorites', href: ROUTES.FAVORITES },
      { name: 'Settings', href: ROUTES.SETTINGS },
    ],
    ADMIN: [
      { name: 'Dashboard', href: ROUTES.ADMIN_DASHBOARD },
      { name: 'Properties', href: ROUTES.ADMIN_PROPERTIES },
      { name: 'Users', href: ROUTES.ADMIN_USERS },
    ],
  } as const;
  
  // Route protection configuration
  export const ROUTE_CONFIG = {
    PUBLIC: [
      ROUTES.HOME,
      ROUTES.ABOUT,
      ROUTES.CONTACT,
      ROUTES.PROPERTIES,
      ROUTES.LOGIN,
      ROUTES.REGISTER,
      ROUTES.FORGOT_PASSWORD,
      ROUTES.RESET_PASSWORD,
    ],
    PRIVATE: [
      ROUTES.ACCOUNT,
      ROUTES.FAVORITES,
      ROUTES.SETTINGS,
    ],
    ADMIN: [
      ROUTES.ADMIN,
      ROUTES.ADMIN_DASHBOARD,
      ROUTES.ADMIN_PROPERTIES,
      ROUTES.ADMIN_PROPERTY_CREATE,
      ROUTES.ADMIN_USERS,
    ],
  } as const;
  
  // Utility functions for route generation
  export const getRoute = (route: AppRoute, params?: any): string => {
    const routeValue = ROUTES[route];
    return typeof routeValue === 'function' ? routeValue(params) : routeValue;
  };
  
  // Type-safe route matching
  export const isRoute = (path: string, route: AppRoute): boolean => {
    const routePattern = ROUTES[route];
    if (typeof routePattern === 'string') {
      return path === routePattern;
    }
    // For dynamic routes, we'd need more sophisticated matching
    return path.startsWith(routePattern('').split('[')[0]);
  };