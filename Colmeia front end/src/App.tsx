import { useState } from 'react';
import { StepOne } from './components/StepOne';
import { StepTwo } from './components/StepTwo';
import { StepThree } from './components/StepThree';
import { StepFour } from './components/StepFour';
import { Header } from './components/Header';
import { Login } from './components/landlord/Login';
import { Dashboard } from './components/landlord/Dashboard';
import { PropertyForm, PropertyData } from './components/landlord/PropertyForm';
import { PropertyConfirmation } from './components/landlord/PropertyConfirmation';
import { PropertySuccess } from './components/landlord/PropertySuccess';
import { BookingManagement } from './components/landlord/BookingManagement';
import { TenantLogin } from './components/tenant/TenantLogin';
import { PropertyListing } from './components/tenant/PropertyListing';
import { BookingForm, BookingData } from './components/tenant/BookingForm';
import { BookingSuccess } from './components/tenant/BookingSuccess';
import { Property } from './components/tenant/PropertyCard';

export interface UserData {
  userType: 'locatario' | 'locador';
  nome: string;
  email: string;
  telefone: string;
  cpfCnpj: string;
  endereco: string;
  senha: string;
  confirmarSenha: string;
  foto?: string;
  codigoVerificacao: string;
  aceitoTermos: boolean;
}

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    userType: 'locatario',
    nome: '',
    email: '',
    telefone: '',
    cpfCnpj: '',
    endereco: '',
    senha: '',
    confirmarSenha: '',
    foto: undefined,
    codigoVerificacao: '',
    aceitoTermos: false,
  });

  // Estados para o fluxo de login e cadastro de local
  const [currentFlow, setCurrentFlow] = useState<'signup' | 'login' | 'dashboard' | 'property' | 'bookings' | 'tenant-login' | 'tenant-listing' | 'tenant-booking' | 'tenant-booking-success'>('signup');
  const [propertyStep, setPropertyStep] = useState<'form' | 'confirmation' | 'success'>('form');
  const [propertyData, setPropertyData] = useState<PropertyData>({
    name: '',
    address: '',
    propertyType: '',
    rentPrice: '',
    description: '',
    photos: [],
  });
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  // Handlers para o fluxo de login/dashboard (Locador)
  const handleLogin = (email: string, password: string) => {
    // Mock login - em produção, validar com backend
    console.log('Login:', email, password);
    setCurrentFlow('dashboard');
  };

  const handleLogout = () => {
    setCurrentFlow('login');
  };

  // Handlers para o fluxo de login/busca (Locatário)
  const handleTenantLogin = (email: string, password: string) => {
    // Mock login - em produção, validar com backend
    console.log('Tenant Login:', email, password);
    setCurrentFlow('tenant-listing');
  };

  const handleTenantLogout = () => {
    setCurrentFlow('tenant-login');
  };

  const handleGoToSignup = () => {
    setCurrentFlow('signup');
    setCurrentStep(1);
  };

  const handleGoToLogin = () => {
    // Se o usuário é locatário, vai para o login de locatário
    // Se é locador, vai para o login de locador
    if (userData.userType === 'locatario') {
      setCurrentFlow('tenant-login');
    } else {
      setCurrentFlow('login');
    }
  };

  const handleGoToDashboard = () => {
    // Redirecionar para o fluxo correto baseado no tipo de usuário
    if (userData.userType === 'locatario') {
      setCurrentFlow('tenant-listing');
    } else {
      setCurrentFlow('dashboard');
    }
  };

  const handleCreateProperty = () => {
    setCurrentFlow('property');
    setPropertyStep('form');
  };

  const handleCancelProperty = () => {
    setCurrentFlow('dashboard');
    setPropertyStep('form');
  };

  const handlePropertyFormSubmit = (data: PropertyData) => {
    setPropertyData(data);
    setPropertyStep('confirmation');
  };

  const handlePropertyConfirm = () => {
    setPropertyStep('success');
  };

  const handlePropertyBack = () => {
    setPropertyStep('form');
  };

  const handlePropertySuccess = () => {
    setCurrentFlow('dashboard');
    setPropertyStep('form');
  };

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    setCurrentFlow('tenant-booking');
  };

  const handleBookingFormSubmit = (data: BookingData) => {
    setBookingData(data);
    setCurrentFlow('tenant-booking-success');
  };

  const handleBookingSuccess = () => {
    setCurrentFlow('tenant-listing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 relative overflow-hidden">
      {/* Textura de colmeia no fundo */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23f59e0b' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10">
        <Header onLoginClick={handleGoToLogin} />
        
        <main className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="w-full">
            {currentFlow === 'signup' && (
              <div className="w-full max-w-xl mx-auto">
                {currentStep === 1 && (
                  <StepOne
                    userType={userData.userType}
                    onNext={(userType) => {
                      updateUserData({ userType });
                      nextStep();
                    }}
                  />
                )}
                
                {currentStep === 2 && (
                  <StepTwo
                    userData={userData}
                    onBack={prevStep}
                    onNext={(data) => {
                      updateUserData(data);
                      nextStep();
                    }}
                  />
                )}
                
                {currentStep === 3 && (
                  <StepThree
                    codigoVerificacao={userData.codigoVerificacao}
                    aceitoTermos={userData.aceitoTermos}
                    onBack={prevStep}
                    onConfirm={(data) => {
                      updateUserData(data);
                      nextStep();
                    }}
                  />
                )}
                
                {currentStep === 4 && (
                  <StepFour
                    nome={userData.nome}
                    onDashboard={handleGoToDashboard}
                    onClose={handleGoToSignup}
                  />
                )}
              </div>
            )}

            {currentFlow === 'login' && (
              <div className="w-full max-w-xl mx-auto">
                <Login
                  onLogin={handleLogin}
                  onCreateAccount={handleGoToSignup}
                  onCancel={handleGoToSignup}
                />
              </div>
            )}

            {currentFlow === 'dashboard' && (
              <Dashboard
                userName={userData.nome || 'Usuário'}
                onCreateProperty={handleCreateProperty}
                onManageBookings={() => setCurrentFlow('bookings')}
                onLogout={handleLogout}
              />
            )}

            {currentFlow === 'bookings' && (
              <BookingManagement
                onBack={() => setCurrentFlow('dashboard')}
              />
            )}

            {currentFlow === 'property' && (
              <>
                {propertyStep === 'form' && (
                  <PropertyForm
                    onSubmit={handlePropertyFormSubmit}
                    onCancel={handleCancelProperty}
                  />
                )}
                
                {propertyStep === 'confirmation' && (
                  <PropertyConfirmation
                    propertyData={propertyData}
                    onConfirm={handlePropertyConfirm}
                    onBack={handlePropertyBack}
                  />
                )}
                
                {propertyStep === 'success' && (
                  <PropertySuccess
                    onGoToDashboard={handlePropertySuccess}
                  />
                )}
              </>
            )}

            {currentFlow === 'tenant-login' && (
              <div className="w-full max-w-xl mx-auto">
                <TenantLogin
                  onLogin={handleTenantLogin}
                  onCreateAccount={handleGoToSignup}
                  onCancel={handleGoToSignup}
                />
              </div>
            )}

            {currentFlow === 'tenant-listing' && (
              <PropertyListing
                userName={userData.nome || 'Usuário'}
                onLogout={handleTenantLogout}
                onSelectProperty={handleSelectProperty}
              />
            )}

            {currentFlow === 'tenant-booking' && (
              <BookingForm
                property={selectedProperty!}
                onSubmit={handleBookingFormSubmit}
                onBack={() => setCurrentFlow('tenant-listing')}
              />
            )}

            {currentFlow === 'tenant-booking-success' && (
              <BookingSuccess
                onBackToListing={handleBookingSuccess}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}