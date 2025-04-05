'use client';

import { Toaster as HotToaster, toast as hotToast } from 'react-hot-toast';
import { cn } from '@/lib/utils';
import { CheckCircleIcon, InfoIcon, XCircleIcon } from 'lucide-react';

export const Toaster = () => (
  <HotToaster
    position="bottom-right"
    toastOptions={{
      className: '!bg-white !text-gray-900 dark:!bg-gray-800 dark:!text-white',
    }}
  />
);

interface ToastOptions {
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info';
}

export const toast = ({ title, message, type = 'info' }: ToastOptions) => {
  const iconClasses = {
    success: 'text-green-500',
    error: 'text-red-500',
    info: 'text-blue-500',
  };

  return hotToast.custom((t) => (
    <div
      className={cn(
        'max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 p-4',
        t.visible ? 'animate-enter' : 'animate-leave',
        'dark:bg-gray-800'
      )}
    >
      <div className="flex-1 w-0 p-2">
        <div className="flex items-start">
          <div className={cn('flex-shrink-0 pt-0.5', iconClasses[type])}>
            {type === 'success' ? (
              <CheckCircleIcon className="h-6 w-6" />
            ) : type === 'error' ? (
              <XCircleIcon className="h-6 w-6" />
            ) : (
              <InfoIcon className="h-6 w-6" />
            )}
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium">{title}</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {message}
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200 dark:border-gray-700">
        <button
          onClick={() => hotToast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  ));
};