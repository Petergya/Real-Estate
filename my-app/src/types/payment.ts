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