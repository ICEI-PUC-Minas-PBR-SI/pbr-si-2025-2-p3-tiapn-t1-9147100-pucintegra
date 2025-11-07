# 🍯 Projeto Colmeia

Um sistema de login e cadastro com tema inspirado em colmeia e mel, desenvolvido com HTML puro e CSS (Tailwind CSS).

## 📋 Características

### 🎨 Design
- **Tema Colmeia/Mel**: Paleta de cores em tons de âmbar, dourado e mel
- **Interface Responsiva**: Adaptável a diferentes tamanhos de tela
- **Efeitos Visuais**: Gradientes, glassmorphism e animações suaves
- **Tipografia**: Clean e legível com hierarquia visual clara

### 🔐 Funcionalidades

#### Página de Login (`index.html`)
- Campo de email com validação
- Campo de senha
- Opção "Lembrar-me"
- Link para recuperação de senha
- Link para página de cadastro
- Validação em tempo real

#### Página de Cadastro (`cadastro.html`)
- **Seleção de Tipo de Usuário**:
  - 🏠 **Locatário**: Pessoas que procuram imóveis
  - 🏢 **Locador**: Pessoas que possuem imóveis para alugar
- **Campos Comuns**:
  - Nome e sobrenome
  - Email
  - Telefone (com máscara)
  - CPF (com máscara e validação)
  - Senha e confirmação
- **Campo Específico**:
  - CNPJ (opcional, apenas para locatários)
- **Validações**:
  - CPF válido
  - CNPJ válido (quando preenchido)
  - Email válido
  - Senhas coincidentes
  - Telefone no formato correto

### 🛠 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **Tailwind CSS**: Framework CSS utilitário
- **JavaScript Vanilla**: Funcionalidades interativas
- **CSS3**: Animações e efeitos personalizados

## 🎨 Paleta de Cores

```css
Honey Colors:
- honey-50: #fefbf0  (Muito claro)
- honey-100: #fef3c7 (Claro)
- honey-200: #fde68a (Claro médio)
- honey-300: #fcd34d (Médio)
- honey-400: #fbbf24 (Médio escuro)
- honey-500: #f59e0b (Padrão)
- honey-600: #d97706 (Escuro)
- honey-700: #b45309 (Muito escuro)
- honey-800: #92400e (Extremamente escuro)
- honey-900: #78350f (Quase preto)
```

## 📁 Estrutura do Projeto

```
colmeia/
├── index.html              # Página principal (login)
├── package.json            # Configurações do projeto
├── .gitignore             # Arquivos ignorados pelo Git
├── assets/                # Recursos estáticos
│   ├── css/
│   │   └── main.css       # Estilos personalizados
│   ├── js/
│   │   └── main.js        # JavaScript funcional
│   └── images/            # Imagens do projeto
├── pages/                 # Páginas adicionais
│   ├── cadastro.html      # Página de cadastro
│   └── dashboard.html     # Dashboard de usuário
└── docs/                  # Documentação
    └── README.md          # Este arquivo
```

## 🚀 Como Usar

1. **Abrir o projeto**: Abra o arquivo `index.html` em um navegador web
2. **Navegar**: Use os links para alternar entre login e cadastro
3. **Cadastro**: 
   - Selecione se você é locatário ou locador
   - Preencha os dados solicitados
   - Para locatários, o campo CNPJ aparecerá opcionalmente
4. **Validação**: Os campos são validados em tempo real
5. **Máscaras**: CPF, CNPJ e telefone têm máscaras automáticas

## ✨ Funcionalidades JavaScript

### Validação de Formulários
- **Email**: Formato válido
- **CPF**: Algoritmo de validação real
- **CNPJ**: Algoritmo de validação real (para locatários)
- **Telefone**: Formato brasileiro
- **Senhas**: Mínimo 8 caracteres e confirmação

### Máscaras de Input
- **CPF**: 000.000.000-00
- **CNPJ**: 00.000.000/0000-00
- **Telefone**: (00) 00000-0000

### Interatividade
- Radio buttons customizados
- Campo CNPJ aparece/desaparece conforme tipo de usuário
- Feedback visual em tempo real
- Animações suaves
- Efeitos hover e focus

## 🎯 Diferenças Entre Locatário e Locador

| Característica | Locatário | Locador |
|----------------|-----------|---------|
| **Objetivo** | Procura imóvel para alugar | Possui imóveis para alugar |
| **CNPJ** | ✅ Opcional (para empresas) | ❌ Não disponível |
| **Outros campos** | Idênticos | Idênticos |

## 🔧 Personalização

### Cores
Para alterar as cores do tema, modifique a configuração do Tailwind no `<script>` das páginas HTML:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                honey: {
                    // Suas cores personalizadas aqui
                }
            }
        }
    }
}
```

### Estilos
Adicione estilos personalizados no arquivo `src/styles.css`.

### Funcionalidades
Modifique ou adicione funcionalidades no arquivo `src/script.js`.

## 📱 Responsividade

O projeto é totalmente responsivo e se adapta a:
- 📱 **Mobile**: 320px+
- 📊 **Tablet**: 768px+
- 💻 **Desktop**: 1024px+
- 🖥 **Large Desktop**: 1280px+

## 🐛 Debugging

Para debug, abra o Console do navegador (F12) para ver:
- Validações em tempo real
- Erros de JavaScript
- Logs de desenvolvimento

## 🔮 Próximas Funcionalidades

- [ ] Integração com backend
- [ ] Recuperação de senha
- [ ] Dashboard pós-login
- [ ] Upload de documentos
- [ ] Verificação de email
- [ ] Autenticação em duas etapas

---

**Desenvolvido com 🍯 e ❤️**