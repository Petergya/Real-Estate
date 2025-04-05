// // src/components/auth/RegisterForm.tsx
// 'use client';

// export default function RegisterForm() {
//   return (
//     <form>
//       {/* Your registration form fields */}
//       <input type="text" placeholder="Name" />
//       <input type="email" placeholder="Email" />
//       <input type="password" placeholder="Password" />
//       <button type="submit">Register</button>
//     </form>
//   );
// }


'use client';

interface RegisterFormProps {
  onSuccess: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your registration logic here
    // On successful registration:
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Name" 
        required 
        className="w-full p-2 mb-3 border rounded"
      />
      <input 
        type="email" 
        placeholder="Email" 
        required 
        className="w-full p-2 mb-3 border rounded"
      />
      <input 
        type="password" 
        placeholder="Password" 
        required 
        className="w-full p-2 mb-3 border rounded"
      />
      <button 
        type="submit" 
        className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
      >
        Register
      </button>
    </form>
  );
}