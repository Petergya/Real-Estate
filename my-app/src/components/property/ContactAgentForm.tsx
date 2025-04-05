


'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/TextArea';
import { Button } from '@/components/ui/Button';
import { toast } from 'react-hot-toast';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactAgentFormProps {
  propertyId: string;
  agentName?: string;
  onSuccess?: () => void;
}

export function ContactAgentForm({ 
  propertyId, 
  agentName = 'the agent',
  onSuccess 
}: ContactAgentFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      message: `I'm interested in the property (ID: ${propertyId}). Please contact me with more information.`,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`Message sent! ${agentName} will contact you soon.`);
      reset();
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
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
        label="Phone Number"
        type="tel"
        {...register('phone')}
        error={errors.phone?.message}
      />
      
      <Textarea
        label="Your Message"
        rows={4}
        {...register('message')}
        error={errors.message?.message}
      />
      
      <Button 
        type="submit" 
        className="w-full"
        loading={isSubmitting}
      >
        Contact {agentName}
      </Button>
      
      <p className="text-xs text-gray-500 dark:text-gray-400">
        By submitting this form, you agree to our privacy policy and consent to being contacted by {agentName}.
      </p>
    </form>
  );
}