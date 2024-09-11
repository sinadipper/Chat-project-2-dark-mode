export default function LoginModal({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 bg-opacity-70">
      <div className="bg-[#0f3460] rounded-lg shadow-lg p-8 max-w-sm w-full text-white">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#F0F4F8]">
          Login
        </h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 border border-[#16213e] bg-[#16213e] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BDC3C7]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-[#16213e] bg-[#16213e] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BDC3C7]"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-[#3498DB] text-white py-3 rounded-lg hover:bg-[#34badb] transition duration-200"
        >
          Login
        </button>
      </div>
    </div>
  );
}
// Background Color: #F0F4F8 (Light Gray)
// Text Color: #2C3E50 (Dark Blue)
// Accent Color: #3498DB (Bright Blue)
// Border Color: #BDC3C7 (Light Gray)
