import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="  flex flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-900 text-center py-16 mt-2 sm:py-20 ">
      {/* Shake animation using Tailwind's inline custom keyframes */}
      <div
        className="text-8xl mb-6 animate-[shake_0.5s_ease-in-out_infinite]"
        style={{
          '@keyframes shake': `
            0% { transform: translateX(0); }
            25% { transform: translateX(-4px); }
            50% { transform: translateX(4px); }
            75% { transform: translateX(-4px); }
            100% { transform: translateX(0); }
          `
        }}
      >
        🚫
      </div>

      <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-2">Page Not Found</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg max-w-md">
        The page you're looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/admin/dashboard/"
        className="px-6 py-3 bg-amber-300  text-sm font-semibold rounded-full hover:bg-amber-400 transition"
      >
        🔙 Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
