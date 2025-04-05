// 'use client';

// import { useState } from 'react';
// import { Modal } from '@/components/ui/Modal';
// import { LoginForm } from '@/components/auth/LoginForm';
// import { RegisterForm } from '@/components/auth/RegisterForm';
// import { Button } from '@/components/ui/Button';

// type AuthMode = 'login' | 'register';

// export function AuthModal() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [mode, setMode] = useState<AuthMode>('login');

//   const toggleMode = () => {
//     setMode(mode === 'login' ? 'register' : 'login');
//   };

//   return (
//     <>
//       <Button onClick={() => setIsOpen(true)}>Sign In</Button>
      
//       <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={mode === 'login' ? 'Sign In' : 'Create Account'}>
//         {mode === 'login' ? (
//           <LoginForm onSuccess={() => setIsOpen(false)} />
//         ) : (
//           <RegisterForm onSuccess={() => setIsOpen(false)} />
//         )}
        
//         <div className="mt-4 text-center text-sm">
//           {mode === 'login' ? (
//             <>
//               Don't have an account?{' '}
//               <button 
//                 onClick={toggleMode}
//                 className="text-primary-600 hover:underline font-medium"
//               >
//                 Sign up
//               </button>
//             </>
//           ) : (
//             <>
//               Already have an account?{' '}
//               <button 
//                 onClick={toggleMode}
//                 className="text-primary-600 hover:underline font-medium"
//               >
//                 Sign in
//               </button>
//             </>
//           )}
//         </div>
//       </Modal>
//     </>
//   );
// }



'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import LoginForm from '@/components/auth/LoginForm'; // Default import
import RegisterForm from '@/components/auth/RegisterForm'; // Default import
import { Button } from '@/components/ui/Button';

type AuthMode = 'login' | 'register';

export function AuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>('login');

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Sign In</Button>
      
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={mode === 'login' ? 'Sign In' : 'Create Account'}>
        {mode === 'login' ? (
          <LoginForm onSuccess={() => setIsOpen(false)} />
        ) : (
          <RegisterForm onSuccess={() => setIsOpen(false)} />
        )}
        
        <div className="mt-4 text-center text-sm">
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button 
                onClick={toggleMode}
                className="text-primary-600 hover:underline font-medium"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button 
                onClick={toggleMode}
                className="text-primary-600 hover:underline font-medium"
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}