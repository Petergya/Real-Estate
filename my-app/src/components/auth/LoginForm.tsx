// // src/components/auth/LoginForm.tsx
// 'use client';

// export default function LoginForm() {
//   return (
//     <form>
//       {/* Your login form fields */}
//       <input type="email" placeholder="Email" />
//       <input type="password" placeholder="Password" />
//       <button type="submit">Login</button>
//     </form>
//   );
// }


'use client';

interface LoginFormProps {
  onSuccess: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
    // On successful login:
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
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
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </form>
  );
}