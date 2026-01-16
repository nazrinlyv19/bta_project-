import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    // Minimum 8 characters
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    
    // At least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    
    // At least one special character
    if (!/[!@#$%^&*(),.?":{}|<>=\-_+]/.test(password)) {
      return 'Password must contain at least one special character';
    }
    
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validate username
    if (!username) {
      setError('Please enter your username');
      return;
    }

    // Validate password
    if (!password) {
      setError('Please enter your password');
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    // Successful login - redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="flex h-screen">
      {/* LEFT SIDE - Dark section with logo */}
      <div className="w-[45%] bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 flex items-center justify-center p-12 relative overflow-hidden">
        {/* Logo container */}
        <div className="z-10 w-full max-w-md">
          <img 
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyOC4zLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCA2ODUgMjQ4LjIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDY4NSAyNDguMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6I0ZGMDAzOTt9DQo8L3N0eWxlPg0KPGc+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTU5LjgsMzkuNWMwLTMuNi0yLTQuMy00LjQtMi45TDcuNyw2NC4yYy0zLjIsMS44LTQuNCw0LjktNC40LDcuOXYxMzYuNmMwLDMuNiwyLDQuMyw0LjQsMi45TDU1LjQsMTg0DQoJCWMzLjItMS44LDQuNC00LjksNC40LTcuOVYzOS41eiIvPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMTYuMiwxMjguOXYtNzRoMTcuOXYzOS45YzUuOS03LjMsMTUuNS0xMi4yLDI2LjktMTIuMmMyMS44LDAsMzkuMywxNy4zLDM5LjMsNDEuNnY1LjQNCgkJYzAsMjQtMTcuOCw0MS40LTQyLjQsNDEuNEMxMzQuNiwxNzAuOSwxMTYuMiwxNTUuMywxMTYuMiwxMjguOUwxMTYuMiwxMjguOXogTTE4Mi4zLDEyOS4ydi00LjRjMC0xNi05LjUtMjYuMi0yNC4xLTI2LjINCgkJYy0xNC43LDAtMjQuMSwxMC4zLTI0LjEsMjYuMnY0LjRjMCwxNS43LDkuNSwyNS43LDI0LjEsMjUuN0MxNzIuOSwxNTUsMTgyLjMsMTQ0LjUsMTgyLjMsMTI5LjJ6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTIyMy45LDUyLjljNi41LDAsMTEuNCw0LjEsMTEuNCwxMC4zdjEuMWMwLDYuMi00LjksMTAuMy0xMS40LDEwLjNzLTExLjYtNC4xLTExLjYtMTAuM3YtMS4xDQoJCUMyMTIuMyw1NywyMTcuNCw1Mi45LDIyMy45LDUyLjl6IE0yMzIuOSwxNjlIMjE1Vjg0LjZoMTcuOVYxNjl6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTMxMy44LDEyOC45di03NGgxNy45djM5LjljNS45LTcuMywxNS41LTEyLjIsMjYuOS0xMi4yYzIxLjgsMCwzOS4zLDE3LjMsMzkuMyw0MS42djUuNA0KCQljMCwyNC0xNy44LDQxLjQtNDIuNCw0MS40QzMzMi4yLDE3MC45LDMxMy44LDE1NS4zLDMxMy44LDEyOC45TDMxMy44LDEyOC45eiBNMzc5LjksMTI5LjJ2LTQuNGMwLTE2LTkuNS0yNi4yLTI0LjEtMjYuMg0KCQljLTE0LjcsMC0yNC4xLDEwLjMtMjQuMSwyNi4ydjQuNGMwLDE1LjcsOS41LDI1LjcsMjQuMSwyNS43QzM3MC41LDE1NSwzNzkuOSwxNDQuNSwzNzkuOSwxMjkuMnoiLz4NCgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzAzLjYsODZsLTQuMiwxNi4zYy0zLjMtMS41LTYuNS0yLjQtMTAuNC0yLjRjLTExLjQsMC0yMCw4LjgtMjAsMjMuNVYxNjlIMjUxVjg0LjZoMTcuOXYxMS43DQoJCWM0LjktOS45LDEzLTEzLjcsMjEuOC0xMy43QzI5NS42LDgyLjYsMzAwLDgzLjcsMzAzLjYsODZMMzAzLjYsODZ6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTQwOS4xLDEyOS41VjEyNGMwLTI0LjEsMTcuNC00MS40LDM5LjMtNDEuNGMxMS40LDAsMjEsNC45LDI2LjksMTIuMlY4NC42aDE3LjlWMTY5aC0xNy45di0xMC4zDQoJCWMtNS45LDcuMy0xNS41LDEyLjItMjYuOSwxMi4yQzQyNi41LDE3MC45LDQwOS4xLDE1My43LDQwOS4xLDEyOS41eiBNNDc1LjMsMTI4Ljd2LTMuOWMwLTE2LTkuMy0yNi4yLTI0LTI2LjINCgkJYy0xNC43LDAtMjQsMTAuMy0yNCwyNi4ydjMuOWMwLDE2LDkuMywyNi4yLDI0LDI2LjJDNDY2LDE1NSw0NzUuMywxNDQuNyw0NzUuMywxMjguN3oiLz4NCgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNTI5LDEyMC4zVjE2OWgtMTcuOVY4NC42SDUyOXYxMC42YzQuNC02LjUsMTIuNC0xMi41LDI0LjgtMTIuNWMxOS4xLDAsMzEuNiwxMy41LDMxLjYsMzYuM3Y1MGgtMTcuOXYtNDguOQ0KCQljMC0xNC4yLTctMjEuNS0xOC40LTIxLjVDNTM4LjMsOTguNiw1MjksMTA2LjcsNTI5LDEyMC4zTDUyOSwxMjAuM0w1MjksMTIwLjN6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTYyMSwxNjloLTE3LjlWNTQuOUg2MjF2NjUuOGwzNC4xLTM2LjJoMjMuM2wtMzMuOSwzNC4ybDM3LjIsNTAuMmgtMjJsLTI3LjQtMzhMNjIxLDE0Mi4zTDYyMSwxNjlMNjIxLDE2OXoiDQoJCS8+DQo8L2c+DQo8L3N2Zz4NCg==" 
            alt="Bibirank Logo" 
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* RIGHT SIDE - White section with login form */}
      <div className="w-[55%] bg-white flex flex-col h-full overflow-y-auto">
        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-[400px] flex flex-col gap-10">
            {/* Title */}
            <div className="flex flex-col gap-2">
              <h1 className="text-gray-900 text-[32px] font-bold leading-tight tracking-tight">
                Sign in to your account
              </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Username Input */}
              <label className="flex flex-col gap-2">
                <span className="text-gray-900 text-sm font-semibold">Username</span>
                <div className="relative">
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[#E31E24] focus:ring-1 focus:ring-[#E31E24] focus:outline-none h-14 text-base shadow-sm transition-all"
                  />
                  <div className="absolute right-4 top-4 text-gray-500 pointer-events-none">
                    <svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                      />
                    </svg>
                  </div>
                </div>
              </label>

              {/* Password Input */}
              <label className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 text-sm font-semibold">Password</span>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[#E31E24] focus:ring-1 focus:ring-[#E31E24] focus:outline-none h-14 text-base shadow-sm transition-all pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-gray-500 hover:text-[#E31E24] transition-colors cursor-pointer"
                  >
                    {showPassword ? (
                      <svg 
                        className="w-5 h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" 
                        />
                      </svg>
                    ) : (
                      <svg 
                        className="w-5 h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                        />
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                        />
                      </svg>
                    )}
                  </button>
                </div>
                
                {/* Password Requirements */}
                {password && (
                  <div className="mt-2 space-y-1 text-xs">
                    <div className={`flex items-center gap-1 ${password.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}>
                      <span>{password.length >= 8 ? '✓' : '○'}</span>
                      <span>At least 8 characters</span>
                    </div>
                    <div className={`flex items-center gap-1 ${/[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                      <span>{/[A-Z]/.test(password) ? '✓' : '○'}</span>
                      <span>One uppercase letter</span>
                    </div>
                    <div className={`flex items-center gap-1 ${/[!@#$%^&*(),.?":{}|<>=\-_+]/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                      <span>{/[!@#$%^&*(),.?":{}|<>=\-_+]/.test(password) ? '✓' : '○'}</span>
                      <span>One special character</span>
                    </div>
                  </div>
                )}
              </label>

              {/* Error Message */}
              {error && (
                <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                  {error}
                </div>
              )}

              {/* Sign In Button */}
              <button
                type="submit"
                className="mt-4 w-full bg-[#E31E24] hover:bg-[#C5191F] text-white font-semibold rounded-xl h-14 flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#E31E24]/20 focus:ring-4 focus:ring-[#E31E24]/10 active:scale-[0.98] cursor-pointer"
              >
                <span className="text-lg">Sign In</span>
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" 
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
