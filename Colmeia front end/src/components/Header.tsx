import React from 'react';
import { Button } from './ui/button';
import { Hexagon } from 'lucide-react';

interface HeaderProps {
  onLoginClick: () => void;
}

export function Header({ onLoginClick }: HeaderProps) {
  return (
    <header className="border-b border-amber-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Hexagon className="w-8 h-8 text-amber-500 fill-amber-100" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse cx="6" cy="5" rx="3" ry="3.5" fill="#f59e0b" />
                <ellipse cx="4" cy="4" rx="0.8" ry="1" fill="#fbbf24" />
                <circle cx="3.5" cy="3.5" r="0.5" fill="white" />
                <path
                  d="M3 3L1.5 2M9 3L10.5 2M3 6.5L1.5 7.5M9 6.5L10.5 7.5"
                  stroke="#f59e0b"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <span className="text-amber-800">Colmeia</span>
        </div>

        {/* Botão de Login */}
        <Button
          variant="ghost"
          onClick={onLoginClick}
          className="text-amber-700 hover:text-amber-800 hover:bg-amber-50"
        >
          Já possuo uma conta
        </Button>
      </div>
    </header>
  );
}