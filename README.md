# PixiBay Explorer

A feature-rich React application for exploring and interacting with the Pixabay image library.

## Features

### 🔒 **User Authentication**

- Secure login and registration system
- Form validation with inline error messages
- Age verification for registration
- Protected routes with automatic redirection

### 🖼️ **Image Discovery**

- Dynamic image gallery with infinite scrolling
- Powerful search and filtering capabilities
- Comprehensive image metadata display
- View counts, downloads, likes and other engagement metrics

### 🎭 **User Experience**

- Light/Dark mode toggle
- Optimized loading states with skeleton screens
- Responsive layout for all devices
- Smooth transitions between views

## Technology Stack

- ⚛️ React 19 with TypeScript
- 📦 Zustand for lightweight state management
- 🧭 React Router 7 for navigation
- 🎨 Tailwind CSS 4 for styling
- 🔄 TanStack Query for data fetching
- 🧪 MSW for API mocking during development
- 📋 React Hook Form with Zod validation
- 🧠 Custom hooks for business logic separation

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/pixibay-explorer.git
cd pixibay-explorer
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Configure environment variables:
   Create a .env file in the root directory:

```env
VITE_PIXABAY_API_KEY=your_pixabay_api_key_here
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:5173.

### Default Login Credentials

For testing and demo purposes, you can use these default credentials:

```
Email: test@example.com
Password: password123
```

## Project Structure

```
src/
├── assets/          # Static resources and images
├── components/      # Shared UI components
├── features/        # Feature-based code organization
│   ├── auth/        # Authentication related components
│   └── images/      # Image gallery and details
├── hooks/           # Custom React hooks
├── lib/             # Utilities and helpers
│   ├── api/         # API client
│   ├── mocks/       # MSW handlers
│   └── validators/  # Zod validation schemas
├── providers/       # Context providers
├── router/          # Routing configuration
├── services/        # API service implementations
├── store/           # Zustand state stores
├── test/            # Test utilities
└── types/           # TypeScript type definitions
```

## Implementation Details

### Authentication System

- Email and password validation with Zod schemas
- Age verification during registration (18+ requirement)
- JWT token storage and management
- Automatic redirection based on auth state

### Image Gallery Features

- Lazy-loaded images with placeholder skeletons
- Infinite scroll implementation using Intersection Observer
- Debounced search to minimize API requests
- Rich filtering options for image discovery

### Image Details View

- High-resolution image display
- Comprehensive metadata presentation
- User attribution information
- Technical image specifications
- Engagement metrics visualization

### Theme Support

- System preference detection for initial theme
- Manual light/dark mode toggle
- Persistent theme selection in localStorage
- Smooth transition between themes

## Development Guidelines

### Code Standards

- TypeScript for type safety throughout
- Component-based architecture
- Custom hooks for logic separation
- Context providers for shared state

### Testing Approach

- Component tests with React Testing Library
- Mock service worker for API testing
- Store testing with proper state manipulation
- Custom hook testing for behavior verification

### Performance Considerations

- React.memo for expensive renders
- Debounced inputs for search functionality
- Virtualized lists for large datasets
- Optimistic UI updates where appropriate

## API Integration

The application connects to the Pixabay API for image data:

1. Create a free account at Pixabay
2. Obtain your API key from your account settings
3. Add the key to your .env file as VITE_PIXABAY_API_KEY

## Testing

Run the test suite with:

```bash
# Run all tests
npx vitest

# Run tests with coverage
npx vitest --coverage
```

## Build for Production

```bash
npm run build
```

The build artifacts will be stored in the dist/ directory.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
