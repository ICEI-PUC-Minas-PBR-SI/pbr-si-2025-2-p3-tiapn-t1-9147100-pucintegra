// Funcionalidades JavaScript para o projeto Colmeia

// Validador de formulário (básico, reaproveitável)
class FormValidator {
    validateField(field) {
        if (!field) return true;
        // remover erros antigos
        this.removeError(field);

        const val = (field.value || '').trim();
        const name = field.name || field.id || '';

        if (field.hasAttribute('required') && (val === '' || val == null)) {
            this.showError(field, 'Campo obrigatório');
            return false;
        }

        if (name.toLowerCase().includes('email') && val) {
            if (!this.isValidEmail(val)) {
                this.showError(field, 'Email inválido');
                return false;
            }
        }

        if (name.toLowerCase().includes('cpf') && val) {
            if (!this.isValidCPF(val)) {
                this.showError(field, 'CPF inválido');
                return false;
            }
        }

        if (name.toLowerCase().includes('cnpj') && val) {
            if (!this.isValidCNPJ(val)) {
                this.showError(field, 'CNPJ inválido');
                return false;
            }
        }

        if (name.toLowerCase().includes('phone') && val) {
            if (!this.isValidPhone(val)) {
                this.showError(field, 'Telefone inválido');
                return false;
            }
        }

        if (name.toLowerCase().includes('password') && val) {
            if (!this.isValidPassword(val)) {
                this.showError(field, 'A senha deve ter pelo menos 8 caracteres');
                return false;
            }
        }

        this.showSuccess(field);
        return true;
    }

    validateForm(form) {
        const inputs = Array.from(form.querySelectorAll('input[required]'));
        let ok = true;
        for (const input of inputs) {
            if (input.offsetParent === null) continue; // hidden
            if (!this.validateField(input)) ok = false;
        }
        // senha + confirmação
        const pass = form.querySelector('input[name="password"]');
        const confirm = form.querySelector('#confirmPassword');
        if (pass && confirm && pass.value !== confirm.value) {
            alert('Senhas não coincidem.');
            return false;
        }
        return ok;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidCPF(cpf) {
        cpf = (cpf || '').replace(/\D/g, '');
        if (cpf.length !== 11) return false;
        if (/^(\d)\1{10}$/.test(cpf)) return false;
        let sum = 0;
        for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
        let d1 = 11 - (sum % 11);
        if (d1 >= 10) d1 = 0;
        sum = 0;
        for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
        let d2 = 11 - (sum % 11);
        if (d2 >= 10) d2 = 0;
        return d1 === parseInt(cpf.charAt(9)) && d2 === parseInt(cpf.charAt(10));
    }

    isValidCNPJ(cnpj) {
        cnpj = (cnpj || '').replace(/\D/g, '');
        if (cnpj.length !== 14) return false;
        if (/^(\d)\1{13}$/.test(cnpj)) return false;
        const w1 = [5,4,3,2,9,8,7,6,5,4,3,2];
        const w2 = [6].concat(w1);
        let sum = 0;
        for (let i=0;i<12;i++) sum += parseInt(cnpj.charAt(i)) * w1[i];
        let d1 = 11 - (sum % 11); if (d1 >= 10) d1 = 0;
        sum = 0;
        for (let i=0;i<13;i++) sum += parseInt(cnpj.charAt(i)) * w2[i];
        let d2 = 11 - (sum % 11); if (d2 >= 10) d2 = 0;
        return d1 === parseInt(cnpj.charAt(12)) && d2 === parseInt(cnpj.charAt(13));
    }

    isValidPhone(phone) {
        const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
        return phoneRegex.test(phone);
    }

    isValidPassword(password) {
        return (password || '').length >= 8;
    }

    showError(field, message) {
        field.classList.add('border-red-500', 'bg-red-50');
        field.classList.remove('border-green-500', 'bg-green-50');
        const existing = field.parentNode.querySelector('.error-message');
        if (existing) existing.remove();
        const div = document.createElement('div');
        div.className = 'text-red-500 text-sm mt-1 error-message';
        div.textContent = message;
        field.parentNode.appendChild(div);
    }

    showSuccess(field) {
        field.classList.remove('border-red-500', 'bg-red-50');
        field.classList.add('border-green-500', 'bg-green-50');
    }

    removeError(field) {
        const msg = field.parentNode.querySelector('.error-message');
        if (msg) msg.remove();
        field.classList.remove('border-red-500', 'bg-red-50', 'border-green-500', 'bg-green-50');
    }
}

// Máscaras de entrada
class InputMasks {
    static apply() {
        document.querySelectorAll('input[name="cpf"]').forEach(i => i.addEventListener('input', this.cpfMask));
        document.querySelectorAll('input[name="cnpj"]').forEach(i => i.addEventListener('input', this.cnpjMask));
        document.querySelectorAll('input[name="phone"]').forEach(i => i.addEventListener('input', this.phoneMask));
    }
    static cpfMask(e) {
        let v = e.target.value.replace(/\D/g, '');
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = v;
    }
    static cnpjMask(e) {
        let v = e.target.value.replace(/\D/g, '');
        v = v.replace(/(\d{2})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d)/, '$1/$2');
        v = v.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
        e.target.value = v;
    }
    static phoneMask(e) {
        let v = e.target.value.replace(/\D/g, '');
        v = v.replace(/(\d{2})(\d)/, '($1) $2');
        v = v.replace(/(\d{5})(\d{1,4})$/, '$1-$2');
        e.target.value = v;
    }
}

// Theme/visual niceties
class ThemeManager {
    constructor() { this.setupParticles(); }
    setupParticles() {
        const container = document.createElement('div');
        container.className = 'fixed inset-0 pointer-events-none z-0';
        document.body.appendChild(container);
        for (let i=0;i<10;i++){
            const p = document.createElement('div');
            p.className = 'absolute w-2 h-2 bg-honey-300 rounded-full opacity-20';
            p.style.left = Math.random()*100 + '%';
            p.style.top = Math.random()*100 + '%';
            p.style.animationDelay = Math.random()*5 + 's';
            p.style.animation = 'float 10s infinite ease-in-out';
            container.appendChild(p);
        }
    }
}

// Utilitários
class Utils {
    static showToast(message, type='success'){
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 transition-all duration-300 ${type==='success' ? 'bg-green-500' : 'bg-red-500'}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(()=>{ toast.style.transform = 'translateX(100%)'; setTimeout(()=>toast.remove(),300); }, 3000);
    }
    static debounce(fn, wait){ let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a), wait); }; }
}

// Funções globais de interação (serão definidas/associadas quando necessário)

document.addEventListener('DOMContentLoaded', () => {
    window.formValidator = new FormValidator();
    InputMasks.apply();
    new ThemeManager();

    const style = document.createElement('style');
    style.textContent = `@keyframes float { 0%,100%{transform:translateY(0) rotate(0);} 33%{transform:translateY(-20px) rotate(120deg);} 66%{transform:translateY(10px) rotate(240deg);} }`;
    document.head.appendChild(style);

    const userNameSpan = document.getElementById("userName");
    window.listenToUserChanges((user) => {
        console.log("User state changed:", user);
        userNameSpan.textContent = user.displayName.split(" ")[0];
    });

    // Setup página de cadastro
    function setupCadastroPage(){
        const form = document.querySelector('form');
        const openBtn = document.getElementById('openConfirmBtn');
        const modal = document.getElementById('confirmModal');
        const overlay = document.getElementById('confirmOverlay');
        const modalCancel = document.getElementById('modalCancel');
        const modalConfirm = document.getElementById('modalConfirm');
        const modalTerms = document.getElementById('modalTerms');
        const cnpjField = document.getElementById('cnpjField');

        window.goBack = function(){ if (window.history.length>1) window.history.back(); else window.location.href = '../index.html'; };

        function showModal(){ if(!modal) return; modal.classList.remove('hidden'); modal.classList.add('flex'); if(modalTerms){ modalTerms.checked=false; modalTerms.focus(); } if(modalConfirm) modalConfirm.disabled = true; }
        function closeModal(){ if(!modal) return; modal.classList.add('hidden'); modal.classList.remove('flex'); }

        function toggleCNPJ(){ const selected = document.querySelector('input[name="userType"]:checked'); if (!cnpjField) return; if (selected && selected.value === 'locador') cnpjField.classList.remove('hidden'); else { cnpjField.classList.add('hidden'); const cnpj = document.getElementById('cnpj'); if (cnpj) cnpj.value=''; } }

        // radio styling
        const radioInputs = document.querySelectorAll('input[type="radio"][name="userType"]');
        radioInputs.forEach(input=>{
            const label = input.closest('label');
            const indicator = label?.querySelector('.radio-indicator div');
            function refresh(){ if(input.checked){ label?.classList.remove('border-honey-200'); label?.classList.add('border-honey-500','bg-honey-50'); if(indicator) indicator.classList.remove('opacity-0'); } else { label?.classList.remove('border-honey-500','bg-honey-50'); label?.classList.add('border-honey-200'); if(indicator) indicator.classList.add('opacity-0'); } }
            refresh();
            input.addEventListener('change', ()=>{ radioInputs.forEach(r=>{ const lbl = r.closest('label'); const ind = lbl?.querySelector('.radio-indicator div'); lbl?.classList.remove('border-honey-500','bg-honey-50'); lbl?.classList.add('border-honey-200'); if(ind) ind.classList.add('opacity-0'); }); if(input.checked){ const lbl = input.closest('label'); const ind = lbl?.querySelector('.radio-indicator div'); lbl?.classList.remove('border-honey-200'); lbl?.classList.add('border-honey-500','bg-honey-50'); if(ind) ind.classList.remove('opacity-0'); } toggleCNPJ(); });
        });

        if (openBtn) openBtn.addEventListener('click', (e)=>{ e.preventDefault(); if (!form) return; const ok = window.formValidator.validateForm(form); if (ok) showModal(); else Utils.showToast('Corrija os campos obrigatórios', 'error'); });

        modalCancel?.addEventListener('click', (e)=>{ e.preventDefault(); closeModal(); });
        overlay?.addEventListener('click', closeModal);
        document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) closeModal(); });

        if (modalTerms && modalConfirm) modalTerms.addEventListener('change', ()=>{ modalConfirm.disabled = !modalTerms.checked; });

        if (modalConfirm) modalConfirm.addEventListener('click', (e)=>{ e.preventDefault(); if (modalTerms && !modalTerms.checked){ alert('Você precisa concordar com os termos para continuar.'); modalTerms.focus(); return; } closeModal(); window.cadastrar(); });

        // Expor a função cadastrar (usa helpers do firebase-init se disponíveis)
        window.cadastrar = async function cadastrar(){
            if (!form) return;
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.textContent : '';
            if (submitBtn){ submitBtn.disabled = true; submitBtn.innerHTML = '<div class="honey-loading"></div> Processando...'; }
            try{
                const userType = form.querySelector('input[name="userType"]:checked')?.value || '';
                const fullName = (form.querySelector('#firstName')?.value || '').trim();
                const email = (form.querySelector('#email')?.value || '').trim();
                const phone = (form.querySelector('#phone')?.value || '').trim();
                const cpf = (form.querySelector('#cpf')?.value || '').trim();
                const cnpjEl = form.querySelector('#cnpj');
                const cnpj = cnpjEl && cnpjEl.offsetParent !== null ? (cnpjEl.value || '').trim() : '';
                const address = (form.querySelector('#address')?.value || '').trim();
                const password = (form.querySelector('#password')?.value || '').trim();
                const profileInput = form.querySelector('#profilePicture');
                const photoFile = (profileInput && profileInput.files && profileInput.files.length) ? profileInput.files[0] : null;

                const profile = { userType, fullName, email, phone, cpf, cnpj, address };

                if (typeof window.createAuthUserAndProfile === 'function'){
                    await window.createAuthUserAndProfile(email, password, fullName, profile, photoFile);

                    Utils.showToast('Conta criada com sucesso', 'success');
                    setTimeout(()=> window.location.href = '../index.html', 1000);
                } else if (typeof window.addUserToFirestore === 'function'){
                    await window.addUserToFirestore(Object.assign({}, profile));
                    Utils.showToast('Cadastro salvo com sucesso (sem Auth)', 'success');
                    setTimeout(()=> window.location.href = '../index.html', 1000);
                } else {
                    throw new Error('Serviço de backend não disponível');
                }
            } catch (err){ console.error('Error creating user/profile:', err); Utils.showToast('Erro ao criar conta: ' + (err && err.message ? err.message : String(err)), 'error'); }
            finally{ if (submitBtn){ submitBtn.disabled = false; submitBtn.textContent = originalText; } }
        };
    }

    // Se estamos na página de cadastro, inicializa o setup
    if (document.getElementById('confirmModal') || document.querySelector('input[name="userType"]')){
        setupCadastroPage();
    }

    // Login helper: usado pelo botão em index.html
    window.logar = async function logar(){
        try{
            const email = document.querySelector('#email')?.value || '';
            const password = document.querySelector('#password')?.value || '';
            if (!email || !password) { Utils.showToast('Preencha email e senha', 'error'); return; }
            if (typeof window.signIn !== 'function') { Utils.showToast('Serviço de autenticação não disponível', 'error'); return; }
            await window.signIn(email, password);
            Utils.showToast('Login realizado com sucesso', 'success');
            setTimeout(()=> { window.location.href = 'pages/dashboard.html'; }, 700);
        } catch (err){ console.error('Login failed:', err); Utils.showToast('Erro no login: ' + (err && err.message ? err.message : String(err)), 'error'); }
    };

    window.logoutUser = async function logoutUser(){
        try {
            if (typeof window.logout !== 'function') { Utils.showToast('Serviço de logout não disponível', 'error'); return; }
            await window.logout();
            Utils.showToast('Logout realizado com sucesso', 'success');
            setTimeout(()=> { window.location.href = '../index.html'; }, 700);
        } catch (err){ console.error('Logout failed:', err); Utils.showToast('Erro no logout: ' + (err && err.message ? err.message : String(err)), 'error'); }
    };

    // Setup página de cadastro de local
    function setupLocationPage() {
        const form = document.getElementById('locationForm');
        if (!form) return; // Retorna se não estiver na página correta

        const nameInput = document.getElementById('locationName');
        const addressInput = document.getElementById('address');
        const typeInput = document.getElementById('propertyType');
        const rentInput = document.getElementById('rentValue');
        const descInput = document.getElementById('description');
        const photosInput = document.getElementById('photos');

        const nameError = document.getElementById('nameError');
        const addressError = document.getElementById('addressError');
        const typeError = document.getElementById('typeError');
        const rentError = document.getElementById('rentError');
        const photosError = document.getElementById('photosError');
        const descCount = document.getElementById('descCount');
        const previews = document.getElementById('previews');

        const MAX_FILES = 5;
        const MAX_SIZE = 2 * 1024 * 1024; // 2MB

        window.goBack = function(){ if (window.history.length>1) window.history.back(); else window.location.href = '../pages/dashboard.html'; };

        // Event Listeners
        descInput?.addEventListener('input', () => {
            descCount.textContent = `${descInput.value.length}/500`;
        });

        rentInput?.addEventListener('input', e => {
            const raw = e.target.value.replace(/[^\d]/g, '');
            const cents = raw.padStart(3, '0');
            const integer = cents.slice(0, -2);
            const decimals = cents.slice(-2);
            const formatted = new Intl.NumberFormat('pt-BR').format(integer) + ',' + decimals;
            e.target.value = 'R$ ' + formatted.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        });

        photosInput?.addEventListener('change', () => {
            photosError.classList.add('hidden');
            previews.innerHTML = '';
            const files = Array.from(photosInput.files);

            if (files.length > MAX_FILES) {
                photosError.textContent = `Escolha no máximo ${MAX_FILES} imagens.`;
                photosError.classList.remove('hidden');
                photosInput.value = '';
                return;
            }

            let invalid = false;
            files.forEach((file, idx) => {
                if (!file.type.startsWith('image/')) invalid = true;
                if (file.size > MAX_SIZE) invalid = true;
            });

            if (invalid) {
                photosError.textContent = 'Arquivos inválidos. Use imagens ≤ 2MB.';
                photosError.classList.remove('hidden');
                photosInput.value = '';
                return;
            }

            files.forEach(file => {
                const reader = new FileReader();
                const container = document.createElement('div');
                container.className = 'flex items-center gap-2';
                reader.onload = e => {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.className = 'preview-img';
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = 'text-xs text-red-600';
                    btn.textContent = 'Remover';
                    btn.addEventListener('click', () => removeFile(file.name));
                    container.appendChild(img);
                    container.appendChild(btn);
                    previews.appendChild(container);
                };
                reader.readAsDataURL(file);
            });
        });

        function removeFile(name) {
            const files = Array.from(photosInput.files).filter(f => f.name !== name);
            const dataTransfer = new DataTransfer();
            files.forEach(f => dataTransfer.items.add(f));
            photosInput.files = dataTransfer.files;
            photosInput.dispatchEvent(new Event('change'));
        }

        function clearErrors() {
            nameError.classList.add('hidden');
            addressError.classList.add('hidden');
            typeError.classList.add('hidden');
            rentError.classList.add('hidden');
            photosError.classList.add('hidden');
        }

        form.addEventListener('submit', async (ev) => {
            ev.preventDefault();
            clearErrors();

            let valid = true;

            if (!nameInput.value || nameInput.value.trim().length < 3) {
                nameError.classList.remove('hidden');
                valid = false;
            }
            if (!addressInput.value || addressInput.value.trim().length === 0) {
                addressError.classList.remove('hidden');
                valid = false;
            }
            if (!typeInput.value) {
                typeError.classList.remove('hidden');
                valid = false;
            }

            const rawNum = rentInput.value.replace(/[^\d]/g, '');
            if (!rawNum || Number(rawNum) <= 0) {
                rentError.classList.remove('hidden');
                valid = false;
            }

            const files = Array.from(photosInput.files || []);
            if (files.length > MAX_FILES) {
                photosError.textContent = `Máximo ${MAX_FILES} imagens.`;
                photosError.classList.remove('hidden');
                valid = false;
            }
            if (files.some(f => f.size > MAX_SIZE)) {
                photosError.textContent = `Cada imagem deve ter até 2MB.`;
                photosError.classList.remove('hidden');
                valid = false;
            }

            if (!valid) return;

            const formData = new FormData();
            formData.append('name', nameInput.value.trim());
            formData.append('address', addressInput.value.trim());
            formData.append('type', typeInput.value);
            const cents = parseInt(rawNum, 10);
            formData.append('rentCents', String(cents));
            formData.append('description', descInput.value.trim());

            files.forEach((f, i) => formData.append('photos', f, f.name));

            try {
                const submitBtn = form.querySelector('button[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<div class="honey-loading"></div> Salvando...';

                await window.createLocation(formData);
                
                Utils.showToast('Local cadastrado com sucesso', 'success');
                form.reset();
                previews.innerHTML = '';
                descCount.textContent = '0/500';
                setTimeout(()=> window.location.href = '../pages/dashboard.html', 1000);
            } catch (err) {
                console.error('Erro ao criar local:', err);
                Utils.showToast('Erro ao cadastrar local: ' + (err.message || 'Erro desconhecido'), 'error');
            } finally {
                const submitBtn = form.querySelector('button[type="submit"]');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Criar anúncio';
            }
        });
    }

    // Se estamos na página de cadastro de local, inicializa o setup
    if (document.getElementById('locationForm')) {
        setupLocationPage();
    }
});