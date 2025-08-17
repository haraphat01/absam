export default function SimpleLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Simple Login Test</h1>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input 
                type="email" 
                className="w-full p-2 border rounded"
                placeholder="Enter email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Password</label>
              <input 
                type="password" 
                className="w-full p-2 border rounded"
                placeholder="Enter password"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}