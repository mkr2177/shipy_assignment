# Task Management App - Campus Assessment

A modern, responsive task management web application built with React.js and Tailwind CSS.

## 🚀 Features

### Core Functionality
- **User Authentication**: Simple username/password login system
- **CRUD Operations**: Create, Read, Update, and Delete tasks
- **Task Management**: Comprehensive task tracking with multiple attributes
- **Filtering & Search**: Advanced filtering by category, priority, status, and urgency
- **Pagination**: Efficient data display with configurable items per page
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Task Schema
Each task includes the following fields:
- **Title** (Text Input): Task name/title
- **Description** (Text Area): Detailed task description
- **Category** (Dropdown): Work, Personal, Shopping, Health, Education, Other
- **Priority** (Dropdown): Low, Medium, High, Critical
- **Status** (Dropdown): Pending, In Progress, Completed, Cancelled
- **Is Urgent** (Boolean Checkbox): Mark tasks as urgent for priority handling
- **Due Date** (Date Input): Optional deadline for task completion
- **Timestamps**: Automatic creation and update timestamps

## 🛠️ Technology Stack

- **Frontend**: React.js 18.2.0
- **Styling**: Tailwind CSS 3.3.0
- **Routing**: React Router DOM 6.8.1
- **Icons**: Lucide React
- **State Management**: React Context API
- **Data Persistence**: Local Storage
- **Build Tool**: Create React App

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shipsy-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔐 Demo Credentials

The application includes three demo user accounts:

| Username | Password | Role |
|----------|----------|------|
| admin    | admin123 | Administrator |
| user     | user123  | Regular User |
| demo     | demo123  | Demo User |

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Dashboard.js      # Main dashboard with stats and recent tasks
│   ├── Login.js          # Authentication component
│   ├── Navbar.js         # Navigation bar
│   ├── TaskForm.js       # Create/Edit task form
│   └── TaskList.js       # Task listing with filters and pagination
├── contexts/
│   ├── AuthContext.js    # Authentication state management
│   └── TaskContext.js    # Task data management
├── App.js               # Main application component
├── index.js             # Application entry point
└── index.css            # Global styles and Tailwind imports
```

## 🎯 Key Features Implementation

### Authentication System
- Context-based authentication state
- Local storage persistence
- Protected routes
- Multiple demo accounts

### CRUD Operations
- **Create**: Add new tasks with validation
- **Read**: View tasks in dashboard and list views
- **Update**: Edit existing tasks
- **Delete**: Remove tasks with confirmation

### Advanced Filtering
- Search by title and description
- Filter by category, priority, status
- Urgent tasks filter
- Real-time filter application

### Pagination
- Configurable items per page (default: 10)
- Page navigation controls
- Dynamic page calculation
- Results count display

### Data Validation
- Required field validation
- Minimum length requirements
- Date validation (no past due dates)
- Real-time error feedback

## 🧪 Testing Strategy

### Positive Test Cases
1. **User Authentication**
   - Valid login credentials
   - Session persistence
   - Successful logout

2. **Task Creation**
   - Create task with all required fields
   - Create task with optional fields
   - Form validation success

3. **Task Management**
   - Edit existing tasks
   - Delete tasks
   - Status updates

4. **Filtering & Search**
   - Search functionality
   - Category filtering
   - Priority filtering
   - Pagination navigation

### Negative Test Cases
1. **Authentication**
   - Invalid credentials
   - Empty form submission
   - Unauthorized access attempts

2. **Task Validation**
   - Empty required fields
   - Invalid date inputs
   - Minimum length violations

3. **Edge Cases**
   - Large datasets
   - Special characters in inputs
   - Network connectivity issues

### Edge Test Cases
1. **Data Limits**
   - Maximum task count
   - Long text inputs
   - Special character handling

2. **Browser Compatibility**
   - Local storage availability
   - JavaScript disabled
   - Mobile responsiveness

## 🚀 Deployment

### Vercel Deployment
1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Configure build settings (automatic for Create React App)
   - Deploy with automatic CI/CD

### Environment Configuration
- No environment variables required for basic functionality
- All data stored in browser's local storage
- No external API dependencies

## 🔄 Future Improvements

Given more time, the following enhancements would be implemented:

### Backend Integration
- REST API with proper database
- User authentication with JWT tokens
- Real-time updates with WebSocket
- File attachment support

### Enhanced Features
- Task categories customization
- Team collaboration features
- Email notifications
- Calendar integration
- Export functionality (PDF, CSV)

### Performance Optimizations
- Virtual scrolling for large datasets
- Debounced search
- Lazy loading
- Caching strategies

### Security Enhancements
- Proper password hashing
- CSRF protection
- Input sanitization
- Rate limiting

### UI/UX Improvements
- Dark mode support
- Drag-and-drop task reordering
- Keyboard shortcuts
- Accessibility improvements
- Progressive Web App features

## 📝 AI Prompts Used

### Initial Setup
**Prompt**: "Create a React.js task management application with authentication, CRUD operations, and modern UI using Tailwind CSS"
**Reasoning**: Established the basic project structure and technology stack

### Component Architecture
**Prompt**: "Design a scalable component structure with Context API for state management and React Router for navigation"
**Reasoning**: Ensured proper separation of concerns and maintainable code structure

### Form Validation
**Prompt**: "Implement comprehensive form validation with real-time feedback and error handling"
**Reasoning**: Enhanced user experience and data integrity

### Responsive Design
**Prompt**: "Create a mobile-first responsive design using Tailwind CSS utilities and modern design patterns"
**Reasoning**: Ensured accessibility across all device types

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is created for educational purposes as part of a campus assessment.

---

**Built with ❤️ using React.js and Tailwind CSS**
