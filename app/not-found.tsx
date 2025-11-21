import React from 'react';
import { Home, Search, Leaf, Sprout } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-100 px-6">
      <div className="max-w-md w-full text-center">
        {/* Health-conscious illustration */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-32 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center">
            <div className="text-4xl">🌱</div>
            <div className="absolute -top-2 -right-2 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              404
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Page not found
            </h1>
            <p className="text-gray-600 leading-relaxed">
              This path doesn't grow here. Let's find your way back to healthy choices.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              <Home className="w-4 h-4" />
              Home
            </a>
            <a
              href="/search"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white text-emerald-700 border border-emerald-200 rounded-lg font-medium hover:bg-emerald-50 transition-colors"
            >
              <Search className="w-4 h-4" />
              Explore
            </a>
          </div>

          {/* Quick links */}
          <div className="pt-6 border-t border-emerald-200">
            <p className="text-sm text-emerald-600 mb-3">Healthy paths</p>
            <div className="flex justify-center gap-4">
              <a
                href="/nutrition"
                className="inline-flex items-center gap-1 text-sm text-emerald-700 hover:text-emerald-900 transition-colors"
              >
                <Leaf className="w-4 h-4" />
                Nutrition
              </a>
              <a
                href="/recipes"
                className="inline-flex items-center gap-1 text-sm text-emerald-700 hover:text-emerald-900 transition-colors"
              >
                <Sprout className="w-4 h-4" />
                Recipes
              </a>
              <a
                href="/wellness"
                className="text-sm text-emerald-700 hover:text-emerald-900 transition-colors"
              >
                Wellness
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}