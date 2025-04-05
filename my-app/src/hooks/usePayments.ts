


"use client"

import { useState } from 'react';
import { 
  createPaymentIntent as apiCreatePaymentIntent,
  confirmPayment as apiConfirmPayment,
  getPaymentMethods,
  getSubscriptionPlans,
  type PaymentIntent,
  type PaymentMethod,
  type SubscriptionPlan
} from "@/lib/api/payments";

export function usePayments() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPayment = async (propertyId: string, amount: number): Promise<PaymentIntent> => {
    setLoading(true);
    setError(null);
    try {
      return await apiCreatePaymentIntent(propertyId, amount);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Payment creation failed';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const confirmPayment = async (
    paymentIntentId: string, 
    paymentMethodId: string
  ): Promise<PaymentIntent> => {
    setLoading(true);
    setError(null);
    try {
      return await apiConfirmPayment(paymentIntentId, paymentMethodId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Payment confirmation failed';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentMethods = async (): Promise<PaymentMethod[]> => {
    setLoading(true);
    try {
      return await getPaymentMethods();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load payment methods';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscriptionPlans = async (): Promise<SubscriptionPlan[]> => {
    setLoading(true);
    try {
      return await getSubscriptionPlans();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load subscription plans';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { 
    createPayment, 
    confirmPayment,
    fetchPaymentMethods,
    fetchSubscriptionPlans,
    loading, 
    error 
  };
}