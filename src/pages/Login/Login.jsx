
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const { login } = useAuth();  // Ensure login function is being used from context

//   const handleLogin = async (event) => {
//     event.preventDefault();
    
//     try {
//       const response = await fetch('http://localhost:8000/users');
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const users = await response.json();
//       const user = users.find((user) => user.email === email && user.password === password);

//       if (user) {
//         // Pass the user's role along with email to the login function
//         login(email, user.role); 
//         navigate('/Team-Service-UI/', { replace: true });
//       } else {
//         setError('Invalid email or password');
//       }
//     } catch (error) {
//       setError('Failed to login: ' + error.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
    
//         <form onSubmit={handleLogin} className="space-y-4">
//           {error && <p style={{ color: 'red' }}>{error}</p>}
//           <div>
//             <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
//             <input
//               type="text"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password:</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
//               required
//             />
//           </div>
          
//           <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const users = await response.json();
      const user = users.find((user) => user.email === email);

      if (!user) {
        setError('Email not found');
      } else if (user.password !== password) {
        setError('Incorrect password');
      } else {
        login(email, user.role);
        navigate('/Team-Service-UI/', { replace: true });
      }
    } catch (error) {
      setError('Failed to login: ' + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;




