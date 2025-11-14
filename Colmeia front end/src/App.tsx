import React, { useState, useEffect } from 'react';
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
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import { login, logout, onAuthStateChangedListener, getCurrentUser, createUser } from './services/firebase-auth';
import { createLocation, LocationData } from './services/firebase-locals';
import { getUserProfile, UserProfile, createUserProfile, uploadUserPhoto, base64ToFile } from './services/firebase-users';
import { User } from 'firebase/auth';

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
  // Estados de autenticação
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

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
    photoFiles: [],
  });
  const [isSubmittingProperty, setIsSubmittingProperty] = useState(false);
  const [isSubmittingSignup, setIsSubmittingSignup] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  // Monitorar mudanças no estado de autenticação
  useEffect(() => {
    setIsCheckingAuth(true);
    
    const unsubscribe = onAuthStateChangedListener(async (user: User | null) => {
      if (user) {
        // Usuário autenticado
        setCurrentUser(user);
        
        try {
          // Buscar perfil do usuário no Firestore
          const profile = await getUserProfile(user.uid);
          if (profile) {
            setUserProfile(profile);
            // Atualizar userData com informações do perfil
            setUserData(prev => ({
              ...prev,
              userType: profile.userType,
              nome: profile.nome,
              email: profile.email,
              telefone: profile.telefone,
              cpfCnpj: profile.cpfCnpj,
              endereco: profile.endereco,
              foto: profile.foto,
            }));
            
            // Redirecionar baseado no tipo de usuário
            if (profile.userType === 'locador') {
              setCurrentFlow('dashboard');
            } else {
              setCurrentFlow('tenant-listing');
            }
          } else {
            // Perfil não encontrado - pode ser um usuário novo
            console.warn('Perfil do usuário não encontrado no Firestore');
            setUserProfile(null);
          }
        } catch (error) {
          console.error('Erro ao buscar perfil do usuário:', error);
          setUserProfile(null);
        }
      } else {
        // Usuário não autenticado
        setCurrentUser(null);
        setUserProfile(null);
        // O segundo useEffect vai lidar com o redirecionamento
      }
      
      setIsCheckingAuth(false);
    });

    // Cleanup: desinscrever quando o componente for desmontado
    return () => unsubscribe();
  }, []); // Executar apenas uma vez na montagem

  // Proteger rotas que requerem autenticação
  useEffect(() => {
    if (isCheckingAuth) return; // Aguardar verificação inicial

    const protectedFlows = ['dashboard', 'property', 'bookings', 'tenant-listing', 'tenant-booking', 'tenant-booking-success'];
    const publicFlows = ['signup', 'login', 'tenant-login'];

    if (!currentUser && protectedFlows.includes(currentFlow)) {
      // Usuário não autenticado tentando acessar rota protegida
      // Redirecionar para login apropriado baseado no fluxo
      if (currentFlow === 'tenant-listing' || currentFlow === 'tenant-booking' || currentFlow === 'tenant-booking-success') {
        setCurrentFlow('tenant-login');
      } else {
        setCurrentFlow('login');
      }
    } else if (currentUser && publicFlows.includes(currentFlow)) {
      // Usuário autenticado tentando acessar página de login/signup
      // Redirecionar para dashboard apropriado baseado no userType
      if (userProfile) {
        if (userProfile.userType === 'locador') {
          setCurrentFlow('dashboard');
        } else {
          setCurrentFlow('tenant-listing');
        }
      }
    }
  }, [currentUser, currentFlow, isCheckingAuth, userProfile]);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  // Handlers para o fluxo de login/dashboard (Locador)
  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      toast.success('Login realizado com sucesso!');
      setCurrentFlow('dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao fazer login');
      console.error('Erro no login:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logout realizado com sucesso!');
      // O useEffect vai detectar a mudança de autenticação e redirecionar automaticamente
      setCurrentUser(null);
      setUserProfile(null);
      setCurrentFlow('signup');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao fazer logout');
      console.error('Erro no logout:', error);
    }
  };

  // Handlers para o fluxo de login/busca (Locatário)
  const handleTenantLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      toast.success('Login realizado com sucesso!');
      setCurrentFlow('tenant-listing');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao fazer login');
      console.error('Erro no login:', error);
    }
  };

  const handleTenantLogout = async () => {
    try {
      await logout();
      toast.success('Logout realizado com sucesso!');
      // O useEffect vai detectar a mudança de autenticação e redirecionar automaticamente
      setCurrentUser(null);
      setUserProfile(null);
      setCurrentFlow('signup');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao fazer logout');
      console.error('Erro no logout:', error);
    }
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

  const handleSignup = async () => {
    setIsSubmittingSignup(true);
    try {
      // Validar dados obrigatórios
      if (!userData.email || !userData.senha || !userData.nome) {
        toast.error('Por favor, preencha todos os campos obrigatórios');
        setIsSubmittingSignup(false);
        return;
      }

      // Criar usuário no Firebase Auth
      toast.loading('Criando sua conta...', { id: 'signup' });
      const userCredential = await createUser(userData.email, userData.senha, userData.nome);
      const uid = userCredential.user.uid;

      // Fazer upload da foto se houver
      let photoURL: string | undefined = undefined;
      if (userData.foto) {
        try {
          toast.loading('Fazendo upload da foto...', { id: 'signup' });
          const photoFile = base64ToFile(userData.foto, 'user-photo.jpg');
          photoURL = await uploadUserPhoto(uid, photoFile);
        } catch (error: any) {
          console.warn('Erro ao fazer upload da foto:', error);
          // Continuar mesmo se o upload da foto falhar
          toast.warning('Conta criada, mas houve um problema ao fazer upload da foto');
        }
      }

      // Criar perfil do usuário no Firestore
      toast.loading('Finalizando cadastro...', { id: 'signup' });
      const profileData = {
        userType: userData.userType,
        nome: userData.nome,
        email: userData.email,
        telefone: userData.telefone,
        cpfCnpj: userData.cpfCnpj,
        endereco: userData.endereco,
        foto: photoURL,
        aceitoTermos: userData.aceitoTermos,
      };

      await createUserProfile(uid, profileData);

      toast.success('Cadastro realizado com sucesso!', { id: 'signup' });

      // Após cadastro bem-sucedido, fazer logout e redirecionar para login
      await logout();
      setCurrentUser(null);
      setUserProfile(null);
      
      // Redirecionar para tela de login baseado no tipo de usuário
      if (userData.userType === 'locatario') {
        setCurrentFlow('tenant-login');
      } else {
        setCurrentFlow('login');
      }
      
      // Resetar dados do formulário
      setCurrentStep(1);
      setUserData({
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
    } catch (error: any) {
      console.error('Erro no cadastro:', error);
      toast.error(error.message || 'Erro ao realizar cadastro. Tente novamente.', { id: 'signup' });
    } finally {
      setIsSubmittingSignup(false);
    }
  };

  const handleCreateProperty = () => {
    setCurrentFlow('property');
    setPropertyStep('form');
  };

  const handleCancelProperty = () => {
    setCurrentFlow('dashboard');
    setPropertyStep('form');
    // Reset form data
    setPropertyData({
      name: '',
      address: '',
      propertyType: '',
      rentPrice: '',
      description: '',
      photos: [],
      photoFiles: [],
    });
  };

  const handlePropertyFormSubmit = (data: PropertyData) => {
    setPropertyData(data);
    setPropertyStep('confirmation');
  };

  const handlePropertyConfirm = async () => {
    setIsSubmittingProperty(true);
    try {
      // Prepare location data for Firebase
      const locationData: LocationData = {
        name: propertyData.name,
        address: propertyData.address,
        type: propertyData.propertyType,
        rentPrice: propertyData.rentPrice,
        description: propertyData.description,
      };

      // Create location in Firebase with photos
      await createLocation(locationData, propertyData.photoFiles);
      
      toast.success('Local cadastrado com sucesso!');
      setPropertyStep('success');
    } catch (error: any) {
      console.error('Erro ao cadastrar local:', error);
      toast.error(error.message || 'Erro ao cadastrar local. Tente novamente.');
    } finally {
      setIsSubmittingProperty(false);
    }
  };

  const handlePropertyBack = () => {
    setPropertyStep('form');
  };

  const handlePropertySuccess = () => {
    setCurrentFlow('dashboard');
    setPropertyStep('form');
    // Reset form data after successful submission
    setPropertyData({
      name: '',
      address: '',
      propertyType: '',
      rentPrice: '',
      description: '',
      photos: [],
      photoFiles: [],
    });
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
        <Toaster />
        
        <main className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-80px)]">
          {isCheckingAuth ? (
            <div className="w-full flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mb-4"></div>
                <p className="text-amber-800 text-lg">Verificando autenticação...</p>
              </div>
            </div>
          ) : (
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
                    isSubmitting={isSubmittingSignup}
                    onConfirm={async (data) => {
                      updateUserData(data);
                      // Executar cadastro quando confirmar o código
                      await handleSignup();
                    }}
                  />
                )}
                
                {currentStep === 4 && (
                  <StepFour
                    nome={userData.nome}
                    onDashboard={handleGoToLogin}
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
                    isSubmitting={isSubmittingProperty}
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
          )}
        </main>
      </div>
    </div>
  );
}