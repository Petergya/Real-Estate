// export interface PaymentIntent {
//     id: string;
//     clientSecret: string;
//     amount: number;
//     currency: string;
//     status: 'requires_payment_method' | 'requires_confirmation' | 'succeeded' | 'canceled';
//     propertyId: string;
//     createdAt: string;
//   }
  
//   export interface PaymentMethod {
//     id: string;
//     type: 'card' | 'bank_account';
//     card?: {
//       brand: string;
//       last4: string;
//       expMonth: number;
//       expYear: number;
//     };
//     bankAccount?: {
//       bankName: string;
//       last4: string;
//     };
//     isDefault: boolean;
//   }
  
//   export interface SubscriptionPlan {
//     id: string;
//     name: string;
//     description: string;
//     price: number;
//     interval: 'month' | 'year';
//     features: string[];
//   }


import axios from 'axios'; // or your preferred HTTP client

export const createPaymentIntent = async (
  propertyId: string, 
  amount: number
): Promise<PaymentIntent> => {
  const response = await axios.post('/api/payments/intents', {
    propertyId,
    amount
  });
  return response.data;
};

export const confirmPayment = async (
  paymentIntentId: string, 
  paymentMethodId: string
): Promise<PaymentIntent> => {
  const response = await axios.post(`/api/payments/${paymentIntentId}/confirm`, {
    paymentMethodId
  });
  return response.data;
};

// Optional: Add more payment-related methods
export const getPaymentMethods = async (): Promise<PaymentMethod[]> => {
  const response = await axios.get('/api/payments/methods');
  return response.data;
};

export const getSubscriptionPlans = async (): Promise<SubscriptionPlan[]> => {
  const response = await axios.get('/api/payments/plans');
  return response.data;
};

// Export interfaces
export interface PaymentIntent {
  id: string;
  clientSecret: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'succeeded' | 'canceled';
  propertyId: string;
  createdAt: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank_account';
  card?: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };
  bankAccount?: {
    bankName: string;
    last4: string;
  };
  isDefault: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
}