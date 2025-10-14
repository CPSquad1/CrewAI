# 🤖 CrewAI

**Organized by CP Squad in association with HacktoberFest**

Welcome to the AI-Powered Team Collaboration Platform project! Build an intelligent project management system that uses AI to schedule meetings, break down tasks, assign work based on team skills, and track project progress.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features to Implement](#features-to-implement)
- [Technical Requirements](#technical-requirements)
- [Getting Started](#getting-started)
- [Project Architecture](#project-architecture)
- [Implementation Guidelines](#implementation-guidelines)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contribution Workflow](#contribution-workflow)
- [Code Standards](#code-standards)
- [Testing Requirements](#testing-requirements)
- [Submission Checklist](#submission-checklist)
- [Resources](#resources)
- [Support](#support)

---

## 🎯 Project Overview

Build a comprehensive team collaboration platform that leverages AI to automate meeting scheduling, intelligent task assignment, and project tracking. This system helps teams work smarter by analyzing availability, skills, and workload to optimize productivity.

**Difficulty Level:** Intermediate to Advanced

**Estimated Time:** 30-50 hours

**Tech Stack:** 
- **Frontend:** React.js
- **Backend:** Node.js with Express.js
- **Database:** MongoDB
- **AI/ML:** Google Gemini API

---

## ✨ Features to Implement

### 1. AI-Powered Meeting Scheduler
- [ ] User availability management (calendar integration)
- [ ] Team member time slot collection
- [ ] AI analyzes available slots across team members
- [ ] Suggests optimal meeting times
- [ ] Automatic meeting link generation
- [ ] Email/notification reminders
- [ ] Recurring meeting support
- [ ] Time zone handling
- [ ] Meeting agenda creation
- [ ] Meeting notes and action items

### 2. Team Chat & Video Conferencing
- [ ] Real-time text chat (project-specific channels)
- [ ] Direct messaging between team members
- [ ] File sharing in chat
- [ ] Video conference integration
- [ ] Screen sharing capability
- [ ] Chat history and search
- [ ] Message reactions and threading
- [ ] Online/offline status indicators
- [ ] Typing indicators
- [ ] Notification system

### 3. AI Task Breakdown & Assignment
- [ ] Project creation and description input
- [ ] AI analyzes project requirements
- [ ] Automatic task breakdown into subtasks
- [ ] Task complexity estimation
- [ ] Skill-based task assignment
- [ ] Availability-aware assignment
- [ ] Workload balancing across team
- [ ] Task priority suggestions
- [ ] Dependency mapping between tasks
- [ ] Task deadline recommendations

### 4. Project Tracking System
- [ ] Kanban board view (To Do, In Progress, Done)
- [ ] Task cards with details
- [ ] Drag-and-drop task movement
- [ ] Sprint planning and management
- [ ] Burndown charts
- [ ] Team velocity tracking
- [ ] Task filtering and search
- [ ] Custom task statuses
- [ ] Task comments and updates
- [ ] Activity timeline/history
- [ ] Progress percentage calculation
- [ ] Overdue task alerts

### 5. User & Team Management
- [ ] User authentication (signup/login)
- [ ] User profiles with skills
- [ ] Team creation and management
- [ ] Role-based access control (Admin, Manager, Member)
- [ ] Availability calendar per user
- [ ] Skill tags and proficiency levels
- [ ] User workload dashboard
- [ ] Team member invitation system

### 6. Dashboard & Analytics
- [ ] Project overview dashboard
- [ ] Team performance metrics
- [ ] Individual contribution stats
- [ ] Upcoming deadlines view
- [ ] Meeting schedule overview
- [ ] Task completion trends
- [ ] AI insights and recommendations

---

## 🛠 Technical Requirements

### Mandatory Stack

**Frontend (React.js)**
- React 18+
- React Router for navigation
- Context API or Redux for state management
- Axios for API calls
- Socket.io-client for real-time features
- React Beautiful DnD for drag-and-drop
- Chart.js or Recharts for analytics
- CSS Modules or Styled Components

**Backend (Node.js + Express.js)**
- Node.js 18+
- Express.js framework
- JWT for authentication
- Socket.io for real-time communication
- Multer for file uploads
- Node-cron for scheduled tasks
- Bcrypt for password hashing

**Database (MongoDB)**
- MongoDB 6+
- Mongoose ODM
- Proper indexing for performance
- Data validation schemas

**AI Integration**
- Google Gemini API only
- API key management via environment variables
- Rate limiting for API calls
- Error handling for AI responses

**Additional Requirements**
- RESTful API design
- WebSocket for real-time features
- Environment variable configuration
- CORS setup
- Input validation and sanitization
- Error handling middleware
- Logging system

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB installed locally or MongoDB Atlas account
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))
- Git and GitHub account
- Postman or similar API testing tool

### Initial Setup

1. **Fork the Repository**
   ```bash
   # Click the 'Fork' button on the repository page
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/REPO_NAME.git
   cd REPO_NAME
   ```

3. **Install Dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**
   
   **Backend (.env)**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/team-collab
   JWT_SECRET=your_jwt_secret_key
   GEMINI_API_KEY=your_gemini_api_key
   CLIENT_URL=http://localhost:3000
   NODE_ENV=development
   ```
   
   **Frontend (.env)**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_SOCKET_URL=http://localhost:5000
   ```

5. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

6. **Create a New Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # Example: git checkout -b feature/ai-task-breakdown
   ```

---

## 🏗 Project Architecture

### Folder Structure

```
project-root/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── gemini.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── projectController.js
│   │   │   ├── taskController.js
│   │   │   ├── meetingController.js
│   │   │   └── chatController.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Project.js
│   │   │   ├── Task.js
│   │   │   ├── Meeting.js
│   │   │   └── Message.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── projectRoutes.js
│   │   │   ├── taskRoutes.js
│   │   │   ├── meetingRoutes.js
│   │   │   └── chatRoutes.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   └── validation.js
│   │   ├── services/
│   │   │   ├── aiService.js
│   │   │   ├── meetingScheduler.js
│   │   │   └── taskAssigner.js
│   │   ├── utils/
│   │   │   ├── helpers.js
│   │   │   └── logger.js
│   │   └── socket/
│   │       └── socketHandler.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   ├── Dashboard/
│   │   │   ├── Projects/
│   │   │   ├── Tasks/
│   │   │   ├── Meetings/
│   │   │   ├── Chat/
│   │   │   └── Common/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Dashboard.js
│   │   │   ├── ProjectBoard.js
│   │   │   └── Profile.js
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── SocketContext.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── socket.js
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## 💡 Implementation Guidelines

### 1. AI Meeting Scheduler Implementation

**Flow:**
1. Collect availability from all team members
2. Send data to Gemini API with prompt
3. AI analyzes schedules and suggests optimal times
4. Present options to meeting organizer
5. Send confirmations to participants

**Example Gemini Prompt:**
```javascript
const prompt = `
Analyze the following team member availabilities and suggest the best 3 meeting times:

Team Members:
${teamMembers.map(m => `
- ${m.name}: Available ${m.availability.join(', ')}
  Timezone: ${m.timezone}
`).join('')}

Meeting Duration: ${duration} minutes
Date Range: ${startDate} to ${endDate}

Provide 3 optimal meeting time suggestions that work for all members, considering:
1. Maximum attendance
2. Reasonable working hours for all timezones
3. Avoid back-to-back meetings if possible

Format response as JSON:
{
  "suggestions": [
    {
      "datetime": "ISO datetime",
      "reason": "why this time works well",
      "attendees": ["list of available members"]
    }
  ]
}
`;
```

### 2. AI Task Breakdown & Assignment

**Task Breakdown Flow:**
1. User inputs project description
2. Send to Gemini API for analysis
3. AI breaks down into tasks and subtasks
4. Estimate complexity and time
5. Match tasks with team member skills
6. Consider current workload
7. Assign tasks automatically

**Example Gemini Prompt:**
```javascript
const prompt = `
Break down the following project into actionable tasks:

Project: ${projectName}
Description: ${projectDescription}
Team Skills Available: ${teamSkills.join(', ')}

Requirements:
1. Create a hierarchical task breakdown
2. Estimate complexity (Low/Medium/High)
3. Suggest time estimates
4. Identify task dependencies
5. Recommend skill requirements for each task

Team Members:
${teamMembers.map(m => `
- ${m.name}
  Skills: ${m.skills.join(', ')}
  Current Workload: ${m.currentTasks} tasks
  Availability: ${m.availableHours} hours/week
`).join('')}

Format response as JSON with task assignments.
`;
```

### 3. Real-time Chat Implementation

**Using Socket.io:**

**Backend (socketHandler.js):**
```javascript
const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
    // Join project room
    socket.on('join-project', (projectId) => {
      socket.join(`project-${projectId}`);
    });
    
    // Send message
    socket.on('send-message', async (data) => {
      const message = await saveMessage(data);
      io.to(`project-${data.projectId}`).emit('new-message', message);
    });
    
    // Typing indicator
    socket.on('typing', (data) => {
      socket.to(`project-${data.projectId}`).emit('user-typing', data);
    });
    
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
```

**Frontend:**
```javascript
// In component
useEffect(() => {
  socket.emit('join-project', projectId);
  
  socket.on('new-message', (message) => {
    setMessages(prev => [...prev, message]);
  });
  
  return () => {
    socket.off('new-message');
  };
}, [projectId]);
```

### 4. Kanban Board Implementation

Use React Beautiful DnD for drag-and-drop:

```javascript
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const onDragEnd = (result) => {
  if (!result.destination) return;
  
  const { source, destination, draggableId } = result;
  
  // Update task status
  updateTaskStatus(draggableId, destination.droppableId);
};

<DragDropContext onDragEnd={onDragEnd}>
  {columns.map(column => (
    <Droppable droppableId={column.id} key={column.id}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {column.tasks.map((task, index) => (
            <Draggable draggableId={task.id} index={index}>
              {/* Task card */}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  ))}
</DragDropContext>
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register        - Register new user
POST   /api/auth/login           - User login
GET    /api/auth/profile         - Get user profile
PUT    /api/auth/profile         - Update profile
```

### Projects
```
POST   /api/projects             - Create new project
GET    /api/projects             - Get all user projects
GET    /api/projects/:id         - Get project details
PUT    /api/projects/:id         - Update project
DELETE /api/projects/:id         - Delete project
POST   /api/projects/:id/members - Add team member
```

### Tasks
```
POST   /api/tasks                - Create task manually
POST   /api/tasks/ai-breakdown   - AI task breakdown
GET    /api/tasks/project/:id    - Get project tasks
PUT    /api/tasks/:id            - Update task
DELETE /api/tasks/:id            - Delete task
POST   /api/tasks/:id/assign     - Assign task
PUT    /api/tasks/:id/status     - Update task status
```

### Meetings
```
POST   /api/meetings/schedule    - AI schedule meeting
GET    /api/meetings             - Get user meetings
GET    /api/meetings/:id         - Get meeting details
PUT    /api/meetings/:id         - Update meeting
DELETE /api/meetings/:id         - Cancel meeting
POST   /api/meetings/availability - Submit availability
```

### Chat
```
GET    /api/chat/messages/:projectId  - Get chat history
POST   /api/chat/upload                - Upload file
```

---

## 🗄 Database Schema

### User Schema
```javascript
{
  name: String,
  email: { type: String, unique: true },
  password: String, // hashed
  skills: [String],
  availability: {
    timezone: String,
    workingHours: {
      start: String,
      end: String
    },
    daysAvailable: [String]
  },
  currentWorkload: Number,
  role: { type: String, enum: ['admin', 'manager', 'member'] },
  createdAt: Date
}
```

### Project Schema
```javascript
{
  name: String,
  description: String,
  owner: { type: ObjectId, ref: 'User' },
  team: [{
    user: { type: ObjectId, ref: 'User' },
    role: String
  }],
  status: { type: String, enum: ['planning', 'active', 'completed'] },
  startDate: Date,
  endDate: Date,
  createdAt: Date
}
```

### Task Schema
```javascript
{
  title: String,
  description: String,
  project: { type: ObjectId, ref: 'Project' },
  assignedTo: { type: ObjectId, ref: 'User' },
  status: { 
    type: String, 
    enum: ['todo', 'in-progress', 'review', 'done'],
    default: 'todo'
  },
  priority: { type: String, enum: ['low', 'medium', 'high'] },
  complexity: { type: String, enum: ['low', 'medium', 'high'] },
  estimatedHours: Number,
  actualHours: Number,
  dependencies: [{ type: ObjectId, ref: 'Task' }],
  requiredSkills: [String],
  dueDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Meeting Schema
```javascript
{
  title: String,
  project: { type: ObjectId, ref: 'Project' },
  organizer: { type: ObjectId, ref: 'User' },
  participants: [{ type: ObjectId, ref: 'User' }],
  scheduledTime: Date,
  duration: Number, // minutes
  meetingLink: String,
  agenda: String,
  notes: String,
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'] },
  aiSuggestions: [Object],
  createdAt: Date
}
```

### Message Schema
```javascript
{
  project: { type: ObjectId, ref: 'Project' },
  sender: { type: ObjectId, ref: 'User' },
  content: String,
  type: { type: String, enum: ['text', 'file', 'system'] },
  fileUrl: String,
  timestamp: Date
}
```

---

## 🔄 Contribution Workflow

### Step-by-Step Process

1. **Choose a Feature**
   - Check [Issues](link-to-issues) for available tasks
   - Look for labels: `frontend`, `backend`, `ai-integration`, `good-first-issue`
   - Comment to claim the issue
   - Wait for assignment confirmation

2. **Design First (for major features)**
   - Create a design doc if implementing complex feature
   - Discuss API contracts with team
   - Get approval before coding

3. **Development**
   - Write clean, modular code
   - Follow the code standards
   - Add comments for complex logic
   - Handle errors gracefully

4. **Testing**
   - Test all API endpoints with Postman
   - Test frontend components
   - Check responsive design
   - Verify AI integration works

5. **Commit & Push**
   ```bash
   git add .
   git commit -m "feat: add AI task breakdown service"
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Clear description of changes
   - Link related issue
   - Add screenshots/videos if UI changes
   - List testing steps

7. **Code Review**
   - Address feedback promptly
   - Make requested changes
   - Re-request review after updates

---

## 📏 Code Standards

### General Guidelines
- Write self-documenting code with meaningful names
- Keep functions small and focused (single responsibility)
- Avoid code duplication (DRY principle)
- Use async/await instead of callbacks
- Handle errors properly (try-catch blocks)

### Backend Standards

**File Naming:**
- Controllers: `camelCase` (e.g., `taskController.js`)
- Models: `PascalCase` (e.g., `Task.js`)
- Routes: `camelCase` with `Routes` suffix (e.g., `taskRoutes.js`)

**API Response Format:**
```javascript
// Success
{
  success: true,
  data: { ... },
  message: "Operation successful"
}

// Error
{
  success: false,
  error: "Error message",
  details: { ... } // optional
}
```

**Error Handling:**
```javascript
// Use try-catch in async functions
const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ 
        success: false, 
        error: 'Project not found' 
      });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};
```

### Frontend Standards

**Component Structure:**
```javascript
// 1. Imports
import React, { useState, useEffect } from 'react';
import styles from './Component.module.css';

// 2. Component
const Component = ({ prop1, prop2 }) => {
  // 3. State
  const [state, setState] = useState(null);
  
  // 4. Effects
  useEffect(() => {
    // effect logic
  }, []);
  
  // 5. Handlers
  const handleClick = () => {
    // handler logic
  };
  
  // 6. Render
  return (
    <div className={styles.container}>
      {/* JSX */}
    </div>
  );
};

// 7. Export
export default Component;
```

**State Management:**
- Use Context API for global state
- Keep component state local when possible
- Lift state up only when necessary

**API Calls:**
```javascript
// Create service functions
// services/api.js
export const getTasks = async (projectId) => {
  try {
    const response = await axios.get(`/api/tasks/project/${projectId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Use in components
const fetchTasks = async () => {
  try {
    const data = await getTasks(projectId);
    setTasks(data.data);
  } catch (error) {
    setError(error.error);
  }
};
```

### AI Integration Standards

**Gemini API Usage:**
```javascript
// services/aiService.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateAIResponse = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('AI Error:', error);
    throw new Error('AI service unavailable');
  }
};
```

**Best Practices:**
- Always validate AI responses
- Have fallback mechanisms
- Implement rate limiting
- Cache responses when appropriate
- Parse JSON responses safely

---

## 🧪 Testing Requirements

### Backend Testing
- Test all API endpoints manually with Postman
- Verify authentication middleware
- Test database operations
- Check error handling
- Validate input sanitization

### Frontend Testing
- Test all user flows
- Check responsive design (mobile, tablet, desktop)
- Verify form validations
- Test loading and error states
- Check browser compatibility (Chrome, Firefox, Safari)

### AI Integration Testing
- Test with various input scenarios
- Verify fallback behavior
- Check response parsing
- Test rate limiting
- Validate error handling

### Testing Checklist
```
□ All API endpoints return correct status codes
□ Authentication works (login, logout, protected routes)
□ Database operations succeed
□ Frontend displays data correctly
□ Forms validate input properly
□ Error messages are user-friendly
□ Loading states show appropriately
□ Real-time features work (chat, notifications)
□ AI features return sensible results
□ No console errors
```

---

## ✅ Submission Checklist

Before submitting your PR:

**Code Quality**
- [ ] Code follows project structure
- [ ] No console.log statements (or conditional)
- [ ] No commented-out code
- [ ] Proper error handling implemented
- [ ] Input validation added
- [ ] Code is well-commented

**Functionality**
- [ ] Feature works as expected
- [ ] No breaking changes to existing features
- [ ] All edge cases handled
- [ ] Database operations are efficient
- [ ] API responses follow standard format

**Testing**
- [ ] Manually tested all changes
- [ ] Tested on different screen sizes (if frontend)
- [ ] Tested error scenarios
- [ ] Verified with different user roles
- [ ] Checked browser console for errors

**Documentation**
- [ ] Updated API documentation if needed
- [ ] Added comments for complex logic
- [ ] Updated README if necessary
- [ ] Included setup instructions for new dependencies

**Git**
- [ ] Branch is up to date with main
- [ ] Meaningful commit messages
- [ ] No merge conflicts
- [ ] .env files not committed
- [ ] No unnecessary files included

**Pull Request**
- [ ] Clear title and description
- [ ] Linked to related issue
- [ ] Screenshots/videos included (if UI changes)
- [ ] Mentioned breaking changes (if any)
- [ ] Listed testing steps

---

## 📚 Resources

### MERN Stack Documentation
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Docs](https://nodejs.org/docs/)

### AI Integration
- [Google Gemini API Documentation](https://ai.google.dev/docs)
- [Gemini API Quickstart](https://ai.google.dev/tutorials/quickstart)
- [Prompt Engineering Guide](https://www.promptingguide.ai/)

### Real-time Features
- [Socket.io Documentation](https://socket.io/docs/)
- [Socket.io with React](https://socket.io/how-to/use-with-react)

### UI Libraries & Tools
- [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd)
- [Chart.js](https://www.chartjs.org/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)

### Authentication
- [JWT Authentication Guide](https://jwt.io/introduction)
- [Passport.js](http://www.passportjs.org/)

### Best Practices
- [REST API Design Guide](https://restfulapi.net/)
- [React Best Practices](https://react.dev/learn/thinking-in-react)
- [MongoDB Best Practices](https://www.mongodb.com/docs/manual/administration/production-notes/)
---

## 🆘 Support

### Getting Help

**Stuck on something?**
- Check the Documentation
- Search existing issues
- Ask other contributors

**Found a Bug?**
- Check if already reported
- Create detailed bug report with:
  - Steps to reproduce
  - Expected vs actual behavior
  - Screenshots/error messages
  - Environment details

**Have Questions?**
- Email: cpsquad@charusat.ac.in
- Or contact Sujal Parsana (7567180754) or Mit Jakasaniya (7990343887)

### Response Times
- General questions: 24-48 hours
- Bug reports: 48-72 hours
- PR reviews: 3-5 days

### Community Guidelines
- Be respectful and professional
- Help others when you can
- Ask questions clearly with context
- Share your learnings

---

## 🏆 Recognition

**All contributors will be:**
- Listed in the project README
- Mentioned in CP Squad's social media announcements

**Contribution Levels:**
- 🌟 **Beginner:** 1-3 PRs merged
- ⭐ **Intermediate:** 4-7 PRs merged
- 🌠 **Advanced:** 8+ PRs merged

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](link-to-license) file for details.

---

## 🎉 Let's Build Something Amazing!

This project will challenge you and help you grow as a developer. Don't worry about making mistakes - that's how we learn! Ask questions, help others, and enjoy the journey.

**Key Principles:**
- 💪 Code quality over quantity
- 🤝 Collaboration over competition  
- 📚 Learning over perfection
- 🎯 Impact over features

**Organized with ❤️ by CP Squad**

---

*Last Updated: October 2025*
