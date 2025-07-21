export default function AuthLayout({children}) {
  return (
    <div className="min-h-screen bg-gray-950 flex">


      {/* Left side - Branding/Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
              <div className="w-8 h-8 bg-white rounded-sm transform rotate-12"></div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-300 text-lg">Login To VibeToLive Admin Panel</p>
          </div>

          <div className="space-y-4 text-gray-300">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Blog Creation</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Admin User Creation</span>
            </div>
          </div>
        </div>




        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-xl"></div>
      </div>




      {/* Right side - Auth forms */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  )
}
