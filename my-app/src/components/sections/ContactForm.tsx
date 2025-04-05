'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/TextArea';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log('Form submitted:', data);
    // Add your form submission logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Your Name"
        {...register('name')}
        error={errors.name?.message}
      />
      
      <Input
        label="Email Address"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />
      
      <Input
        label="Phone Number (Optional)"
        {...register('phone')}
        error={errors.phone?.message}
      />
      
      <Textarea
        label="Your Message"
        rows={5}
        {...register('message')}
        error={errors.message?.message}
      />
      
      <Button type="submit" className="w-full">
        Send Message
      </Button>
    </form>
  );
}