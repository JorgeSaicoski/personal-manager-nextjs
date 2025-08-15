# Personal Manager - Frontend

A modern Next.js frontend application for the Personal Manager system, providing a seamless user experience for personal task management with Keycloak SSO integration.

## 🏗️ Architecture

```
Frontend (Next.js 15) → API Gateway (Nginx) → Microservices:
├── Authentication      → Keycloak SSO (Port 8080)
├── Task Management     → Go Task Service (Port 8000)
└── Account Management  → Keycloak Account Console
```

## ✨ Current Features

### ✅ Authentication & Security
- [x] Keycloak SSO integration with JWT tokens
- [x] Automatic token refresh handling
- [x] Protected routes and components
- [x] Account management integration
- [x] Proper logout with session cleanup

### ✅ Task Management
- [x] Create, read, update, delete tasks
- [x] Task status management (pending, in-progress, completed)
- [x] Pagination with configurable page sizes
- [x] Filter tasks by completion status
- [x] Bulk task operations (select multiple, delete)
- [x] Real-time task editing with slide-out panel
- [x] Animated task interactions and transitions

### ✅ User Interface
- [x] Responsive design with mobile support
- [x] Custom SCSS styling with handwritten paper theme
- [x] Smooth animations and transitions
- [x] Loading states and error handling
- [x] Intuitive navigation with sidebar
- [x] Toast notifications for user feedback

### ✅ Developer Experience
- [x] TypeScript for type safety
- [x] SCSS modules for scoped styling
- [x] Environment variable configuration
- [x] Docker containerization
- [x] Hot reload in development

## 🔮 Planned Features

### 🚧 Task Management Enhancements
- [ ] Due date management with calendar integration
- [ ] Task categories and tags
- [ ] Task priorities and sorting
- [ ] Search and filter capabilities
- [ ] Task attachments and notes
- [ ] Recurring tasks

### 🚧 User Experience
- [ ] Dark/light theme toggle
- [ ] Customizable dashboard layouts
- [ ] Keyboard shortcuts
- [ ] Offline support with sync
- [ ] Progressive Web App (PWA) features
- [ ] Export tasks to different formats

### 🚧 Analytics & Insights
- [ ] Task completion statistics
- [ ] Productivity metrics dashboard
- [ ] Time tracking integration
- [ ] Personal insights and reports

### 🚧 Integration Features
- [ ] Calendar synchronization
- [ ] Email notifications
- [ ] Third-party integrations (Slack, Discord)
- [ ] API for external applications

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: SCSS with CSS Modules
- **Authentication**: Keycloak.js
- **State Management**: React Context API
- **HTTP Client**: Native Fetch API
- **Build Tool**: Turbopack (development)
- **Container**: Docker with multi-stage builds

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── tasks/             # Task management pages
│   │   ├── globals.scss       # Global styles
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable React components
│   │   ├── tasks/            # Task-specific components
│   │   └── styles/           # Component-specific styles
│   ├── context/              # React context providers
│   ├── services/             # API services and utilities
│   │   ├── auth/             # Authentication services
│   │   └── tasks/            # Task API services
├── public/                   # Static assets
├── Dockerfile               # Container configuration
├── docker-compose.yaml      # Development container setup
├── next.config.ts           # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (for local development)
- Podman/Docker (for containerized development)

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Container Development

```bash
# Start with docker-compose (from project root)
podman compose up frontend

# Or build and run manually
podman build -t personal-manager-frontend .
podman run -p 3000:3000 personal-manager-frontend
```

## 🔧 Configuration

### Environment Variables

```bash
# Required for authentication
NEXT_PUBLIC_KEYCLOAK_URL=http://localhost:8080
NEXT_PUBLIC_KEYCLOAK_REALM=master
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=frontend-app

# API endpoints
NEXT_PUBLIC_TASK_SERVICE_URL=http://localhost:8000

# Development settings
NODE_ENV=development
```

### Keycloak Client Configuration

The frontend requires a Keycloak client with these settings:
- **Client ID**: `frontend-app`
- **Client Type**: Public
- **Standard Flow**: Enabled
- **Valid Redirect URIs**: `http://localhost:3000/*`
- **Web Origins**: `http://localhost:3000`

## 🎨 Styling & Theming

### Design System
- **Typography**: Custom Google Fonts (Delius Swash Caps, Shadows Into Light)
- **Color Palette**: Green-based theme with paper textures
- **Layout**: Responsive grid with mobile-first approach
- **Components**: Modular SCSS with BEM methodology

### Custom Animations
- Task slide-out transitions
- Fade-in effects for modals
- Hover states and micro-interactions
- Loading skeleton animations

## 🔒 Security Features

### Authentication Flow
1. **SSO Check**: Silent authentication check on load
2. **Token Management**: Automatic refresh with fallback to login
3. **Route Protection**: Context-based authentication state
4. **Secure Logout**: Proper session cleanup and redirect

### API Security
- **JWT Tokens**: Automatic token attachment to requests
- **Error Handling**: 401/403 responses trigger re-authentication
- **CORS**: Configured for development and production

## 🧪 Testing & Quality

### Code Quality
- TypeScript strict mode enabled
- ESLint configuration for code consistency
- SCSS lint for style consistency
- Git hooks for pre-commit validation

### Testing Strategy (Planned)
- [ ] Unit tests with Jest and React Testing Library
- [ ] Integration tests for API services
- [ ] E2E tests with Playwright
- [ ] Visual regression testing

## 📱 Mobile & Accessibility

### Responsive Design
- Mobile-first CSS approach
- Touch-friendly interface elements
- Optimized for tablets and phones
- Progressive enhancement

### Accessibility (Planned)
- [ ] WCAG 2.1 AA compliance
- [ ] Screen reader support
- [ ] Keyboard navigation
- [ ] High contrast mode

## 🚀 Deployment

### Production Build
```bash
# Create optimized build
npm run build

# Analyze bundle size
npm run analyze
```

### Container Deployment
```bash
# Multi-stage Docker build
podman build -t personal-manager-frontend .

# Production container with nginx
podman run -p 80:80 personal-manager-frontend
```

## 🔍 Monitoring & Analytics

### Performance Monitoring (Planned)
- [ ] Core Web Vitals tracking
- [ ] Error boundary implementation
- [ ] Performance metrics dashboard
- [ ] User session analytics

### Logging
- [ ] Client-side error logging
- [ ] User interaction tracking
- [ ] API call monitoring

## 🤝 Contributing

For detailed setup steps and contribution guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

### Development Workflow
1. Clone the repository with submodules
2. Create a feature branch from `main`
3. Follow the existing code style and patterns
4. Test your changes locally
5. Submit a pull request with detailed description

### Code Standards
- Use TypeScript for all new code
- Follow the existing SCSS architecture
- Add proper error handling
- Document complex logic with comments

## 🆘 Troubleshooting

### Common Issues

**Keycloak Authentication Errors**
```bash
# Check Keycloak client configuration
# Verify environment variables
# Clear browser localStorage/cookies
```

**Build Errors**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Container Issues**
```bash
# Rebuild container
podman build --no-cache -t personal-manager-frontend .

# Check container logs
podman logs personal-manager-frontend
```

## 📚 Related Documentation

- [Main Project README](../README.md)
- [Task Service API](../go-todo-list/README.md)
- [Authentication Setup](../infra/sso/README.md)
- [Nginx Gateway](../infra/nginx/README.md)

## 📄 License

This project is part of the Personal Manager system and is licensed under the MIT License.