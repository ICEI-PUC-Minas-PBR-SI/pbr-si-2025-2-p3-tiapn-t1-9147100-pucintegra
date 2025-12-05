import { useState, useRef, useEffect } from 'react';
import { User, Star, Calendar, LogOut, ChevronDown, Hexagon } from 'lucide-react';
import { motion } from 'motion/react';

interface ProfileDropdownProps {
  userName: string;
  userType?: 'locatario' | 'locador';
  onViewProfile?: () => void;
  onViewReservations?: () => void;
  onViewRatings?: () => void;
  onLogout: () => void;
}

export function ProfileDropdown({
  userName,
  userType,
  onViewProfile,
  onViewReservations,
  onViewRatings,
  onLogout
}: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botão de Perfil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 hover:from-amber-100 hover:to-yellow-100 border border-amber-200 transition-all duration-200 group"
      >
        {/* Avatar Hexagonal */}
        <div className="relative w-10 h-10">
          <Hexagon className="w-10 h-10 text-amber-500 fill-amber-100 group-hover:fill-amber-200 transition-colors duration-200" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-amber-700 text-sm">
              {getInitials(userName)}
            </span>
          </div>
        </div>

        {/* Nome do Usuário */}
        <div className="text-left hidden md:block">
          <p className="text-amber-900 text-sm">
            {userName}
          </p>
          <p className="text-amber-600 text-xs">
            {userType === 'locatario' ? 'Locatário' : 'Locador'}
          </p>
        </div>

        {/* Ícone de Dropdown */}
        <ChevronDown
          className={`w-4 h-4 text-amber-600 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Menu Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-amber-200 overflow-hidden z-50"
        >
          {/* Header do Menu */}
          <div className="px-4 py-3 bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-200">
            <p className="text-amber-900">
              {userName}
            </p>
            <p className="text-amber-600 text-sm">
              {userType === 'locatario' ? 'Locatário' : 'Locador'}
            </p>
          </div>

          {/* Itens do Menu */}
          <div className="py-2">
            {onViewProfile && (
              <button
                onClick={() => {
                  onViewProfile();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-amber-50 transition-colors duration-200 text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <User className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-amber-900 text-sm">Meu Perfil</p>
                  <p className="text-amber-600 text-xs">Ver e editar informações</p>
                </div>
              </button>
            )}

            {onViewReservations && (
              <button
                onClick={() => {
                  onViewReservations();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50 transition-all duration-200 text-left border-l-4 border-amber-500 bg-amber-50/50"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center shadow-md">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-amber-600 font-bold">
                    {userType === 'locatario' ? 'Minhas Reservas' : 'Minhas Locações'}
                  </p>
                  <p className="text-amber-600/80 text-xs">
                    {userType === 'locatario' ? 'Histórico e avaliações' : 'Histórico de locações'}
                  </p>
                </div>
              </button>
            )}

            {onViewRatings && (
              <button
                onClick={() => {
                  onViewRatings();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-amber-50 transition-colors duration-200 text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Star className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-amber-900 text-sm">
                    {userType === 'locatario' ? 'Avaliar Locais' : 'Avaliar Locatários'}
                  </p>
                  <p className="text-amber-600 text-xs">Contribua com a comunidade</p>
                </div>
              </button>
            )}

            {/* Divisor */}
            <div className="my-2 border-t border-amber-100" />

            {/* Sair */}
            <button
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-50 transition-colors duration-200 text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                <LogOut className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p className="text-red-700 text-sm">Sair</p>
                <p className="text-red-600 text-xs">Desconectar da conta</p>
              </div>
            </button>
          </div>

          {/* Footer decorativo */}
          <div className="px-4 py-2 bg-gradient-to-r from-amber-50 to-yellow-50 border-t border-amber-200">
            <div className="flex items-center justify-center gap-2">
              <Hexagon className="w-3 h-3 text-amber-400 fill-amber-200" />
              <p className="text-amber-600 text-xs">Colmeia</p>
              <Hexagon className="w-3 h-3 text-amber-400 fill-amber-200" />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}