'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Property } from '@/modals/property';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

const paymentSchema = z.object({
  cardNumber: z.string().min(16, 'Card number must be 16 digits'),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Invalid expiry date'),
  cardCvc: z.string().min(3, 'CVC must be at least 3 digits'),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

interface PaymentModalProps {
  property: Property;
}

export function PaymentModal({ property }: PaymentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
  });

  const onSubmit = async (data: PaymentFormValues) => {
    try {
      setLoading(true);
      // Process payment
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsOpen(false);
      // Show success message
    } catch (error) {
      console.error('Payment failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="w-full">
        Proceed to Payment
      </Button>
      
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Payment Details">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Card Number"
            placeholder="1234 5678 9012 3456"
            {...register('cardNumber')}
            error={errors.cardNumber?.message}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Expiry Date"
              placeholder="MM/YY"
              {...register('cardExpiry')}
              error={errors.cardExpiry?.message}
            />
            <Input
              label="CVC"
              placeholder="123"
              {...register('cardCvc')}
              error={errors.cardCvc?.message}
            />
          </div>
          
          <Input
            label="Name on Card"
            {...register('name')}
            error={errors.name?.message}
          />
          
          <Input
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
          
          <div className="pt-4 border-t">
            <div className="flex justify-between mb-4">
              <span>Total</span>
              <span className="font-bold">${property.price.toLocaleString()}</span>
            </div>
            
            <Button type="submit" loading={loading} className="w-full">
              Confirm Payment
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}