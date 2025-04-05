export interface Activity {
    id: string;
    type: 'login' | 'logout' | 'property_create' | 'property_update' | 'user_create' | 'user_update';
    message: string;
    timestamp: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
    property?: {
      id: string;
      title: string;
    };
  }