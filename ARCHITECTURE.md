# 🏗️ System Architecture - StudentsHub

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    USER BROWSER                         │
│              (http://localhost:3000)                     │
└──────────────────┬──────────────────────────────────────┘
                   │
                   │ HTTP/CORS
                   │
        ┌──────────▼──────────┐
        │   REACT FRONTEND    │
        │     (Vite)          │
        │                     │
        │  ├─ Components      │
        │  ├─ Pages           │
        │  ├─ Context API     │
        │  └─ Axios Client    │
        └──────────┬──────────┘
                   │
                   │ REST API
                   │
        ┌──────────▼──────────┐
        │  EXPRESS.JS BACKEND │
        │   (Node.js)         │
        │                     │
        │  ├─ /api/students   │
        │  ├─ /api/alumni     │
        │  ├─ /api/auth       │
        │  └─ CORS Middleware │
        └──────────┬──────────┘
                   │
                   │ File System
                   │
        ┌──────────▼──────────┐
        │   JSON DATABASE     │
        │                     │
        │  ├─ students.json   │
        │  ├─ alumni.json     │
        │  └─ users.json      │
        └─────────────────────┘
```

---

## 🎯 Component Hierarchy

### Frontend Tree
```
App.jsx
├── LoginPage.jsx
│   └── AuthContext (Login Form)
├── AdminPortal.jsx (Protected)
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── AdminDashboard.jsx
│   ├── ManageStudents.jsx
│   │   ├── StudentTable.jsx
│   │   ├── AddStudentForm.jsx
│   │   └── EditStudentForm.jsx
│   ├── ManageAlumni.jsx
│   │   ├── AlumniTable.jsx
│   │   ├── AddAlumniForm.jsx
│   │   └── EditAlumniForm.jsx
│   ├── AdminReports.jsx
│   └── Footer.jsx
└── StudentPortal.jsx (Protected)
    ├── Navbar.jsx
    ├── StudentProfile.jsx
    ├── StudentGrades.jsx
    ├── StudentAnnouncements.jsx
    ├── StudentDocuments.jsx
    ├── Sidebar.jsx
    └── Footer.jsx
```

---

## 📊 Data Flow

### Authentication Flow
```
1. User enters credentials
   └─> POST /api/auth/login
       └─> Server validates against users.json
           └─> Returns { user, token } or error
               └─> Frontend stores in Context + localStorage
                   └─> Route to appropriate portal
```

### CRUD Operations Flow
```
1. Admin clicks "Add Student"
   └─> AddStudentForm renders
       └─> User fills form
           └─> POST /api/students
               └─> Server validates
                   └─> Writes to students.json
                       └─> Returns updated list
                           └─> Frontend updates table
```

### Data Sync Flow
```
Frontend (React State)
   ↔ Context API (Global)
   ↔ Axios (HTTP)
   ↔ Express Routes
   ↔ db.js (CRUD)
   ↔ JSON Files (Persistence)
```

---

## 🔄 State Management

### Context Structure
```javascript
AuthContext {
  user: {
    id: string,
    name: string,
    email: string,
    role: 'admin' | 'student'
  },
  isAuthenticated: boolean,
  login(credentials) -> Promise,
  logout() -> void
}
```

### Component Local State
```javascript
// Example: ManageStudents.jsx
const [students, setStudents] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
const [formData, setFormData] = useState(null)
```

---

## 🌐 API Endpoints

### Authentication
```
POST /api/auth/login
Request: { email, password }
Response: { user, success }
```

### Students (CRUD)
```
GET    /api/students           - Get all students
GET    /api/students/:id       - Get one student
POST   /api/students           - Create student
PUT    /api/students/:id       - Update student
DELETE /api/students/:id       - Delete student
```

### Alumni (CRUD)
```
GET    /api/alumni             - Get all alumni
GET    /api/alumni/:id         - Get one alumni
POST   /api/alumni             - Create alumni
PUT    /api/alumni/:id         - Update alumni
DELETE /api/alumni/:id         - Delete alumni
```

---

## 📁 File Structure Details

### Backend File System
```
backend/
├── server.js              # Main Express app
│   ├── Express setup
│   ├── CORS middleware
│   ├── Routes definition
│   └── Error handling
├── db.js                  # Database layer
│   ├── readFile()
│   ├── writeFile()
│   ├── Students CRUD
│   ├── Alumni CRUD
│   └── Auth operations
└── data/                  # JSON database
    ├── students.json      # [{ id, name, email, ... }]
    ├── alumni.json        # [{ id, name, company, ... }]
    └── users.json         # [{ id, email, password, role }]
```

### Frontend File System
```
frontend/
├── src/
│   ├── context/
│   │   └── AuthContext.jsx    # Global auth state
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── AdminPortal.jsx
│   │   └── StudentPortal.jsx
│   ├── components/
│   │   ├── admin/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Footer.jsx
│   │   ├── StudentTable.jsx
│   │   └── Forms
│   ├── App.jsx            # Main component
│   ├── main.jsx           # Entry point
│   ├── index.css          # Global styles
│   └── api.js             # Axios instance
├── vite.config.js
├── tailwind.config.js
└── index.html
```

---

## 🔐 Authentication & Authorization

### Roles
```
┌──────────────┐         ┌──────────────┐
│    ADMIN     │         │   STUDENT    │
├──────────────┤         ├──────────────┤
│ View all     │         │ View own     │
│ students     │         │ profile      │
│              │         │              │
│ Add student  │         │ View grades  │
│ Edit student │         │              │
│ Delete       │         │ View         │
│ student      │         │ announcements│
│              │         │              │
│ Manage       │         │ Download     │
│ alumni       │         │ certificates │
│              │         │              │
│ View reports │         │              │
└──────────────┘         └──────────────┘
```

### Permission Check Flow
```
1. User logs in
   └─> JWT token stored in localStorage
       └─> App reads context
           └─> Role-based routing
               ├─> admin -> AdminPortal
               └─> student -> StudentPortal
```

---

## 💾 Database Schema

### students.json
```javascript
[
  {
    "id": "uuid",
    "name": "string",
    "email": "email",
    "phone": "string",
    "rollNumber": "string",
    "class": "string",
    "gpa": "number",
    "dateJoined": "date",
    "status": "active|inactive"
  }
]
```

### alumni.json
```javascript
[
  {
    "id": "uuid",
    "name": "string",
    "email": "email",
    "rollNumber": "string",
    "graduationYear": "number",
    "company": "string",
    "designation": "string",
    "dateGraduated": "date"
  }
]
```

### users.json
```javascript
[
  {
    "id": "uuid",
    "name": "string",
    "email": "email",
    "password": "hashed|plaintext",
    "role": "admin|student",
    "createdAt": "date"
  }
]
```

---

## 🎨 Styling Architecture

### Tailwind CSS Layers
```
┌─────────────────────────────┐
│      Global Styles          │
│    (index.css)              │
│  ├─ Fonts                   │
│  ├─ Base styles             │
│  └─ Animations              │
└──────────────┬──────────────┘
               │
┌──────────────▼──────────────┐
│  Tailwind Utilities         │
│  (tailwind.config.js)       │
│  ├─ Color scheme            │
│  ├─ Typography              │
│  ├─ Spacing                 │
│  └─ Shadows                 │
└──────────────┬──────────────┘
               │
┌──────────────▼──────────────┐
│  Component Styles           │
│  (JSX className)            │
│  ├─ Layout                  │
│  ├─ Responsive              │
│  └─ Interactions            │
└─────────────────────────────┘
```

### Color Palette
```
Primary Blue        #0369a1
├─ Lighter: #0284c7
└─ Darker:  #075985

Secondary Purple    #7c3aed
├─ Lighter: #a855f7
└─ Darker:  #6d28d9
```

---

## 🚀 Deployment Architecture

### Development
```
Localhost:3000 (Frontend)  ←→  Localhost:5000 (Backend)
    (Hot Reload)                (Auto-restart)
```

### Production
```
CDN / Static Hosting        ←→  Cloud Server / API Gateway
  (frontend/dist/)                  (backend)
  - Vercel                      - Heroku
  - Netlify                      - AWS EC2
  - GitHub Pages                 - DigitalOcean
```

---

## 📈 Performance Considerations

### Code Splitting
```javascript
// Vite automatically creates chunks:
vendor.js       (React, Axios)
app.js          (Application code)
admin.chunk.js  (Admin portal - lazy loaded)
student.chunk.js (Student portal - lazy loaded)
```

### Caching Strategy
```
// Browser Cache (Production)
├─ Static assets: 1 year
├─ JS/CSS: 30 days
├─ API calls: 5 minutes
└─ HTML: No cache
```

### Bundle Optimization
```
Before Optimization: ~500 KB
├─ React: 150 KB
├─ App Code: 250 KB
└─ Other: 100 KB

After Optimization: ~150 KB (gzipped)
├─ Vendor chunk: 100 KB
├─ App chunk: 40 KB
└─ Styles: 10 KB
```

---

## 🔄 Development Workflow

### Daily Workflow
```
1. Pull latest code (git pull)
2. Install dependencies (npm install)
3. Start backend (npm run dev in /backend)
4. Start frontend (npm run dev in /frontend)
5. Make changes (hot reload active)
6. Test changes (browser + console)
7. Commit changes (git commit)
8. Push to repository (git push)
```

### Feature Implementation
```
1. Create feature branch
   └─> git checkout -b feature/new-feature
2. Implement changes
   └─> Add components
   └─> Update API endpoints
   └─> Update database
3. Test thoroughly
   └─> Manual testing
   └─> Check console
   └─> Verify API calls
4. Code review
   └─> Review code style
   └─> Check for errors
5. Merge to main
   └─> git merge feature/new-feature
```

---

## 🐛 Error Handling

### Frontend Error Handling
```javascript
try {
  const response = await api.get('/students')
  setStudents(response.data)
} catch (error) {
  setError(error.message)
  console.error(error)
}
```

### Backend Error Handling
```javascript
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  })
})
```

---

## 📊 Monitoring & Logging

### Development Logging
```javascript
// Frontend
console.log('[API]', method, url)
console.error('[Error]', error)
console.warn('[Warning]', message)

// Backend
console.log('[Request]', method, path)
console.error('[Error]', error)
```

### Production Monitoring
```
Metrics to track:
├─ API response time
├─ Error rate
├─ User authentication rate
├─ Database query time
└─ Server uptime
```

---

## 🔗 Integration Points

### Frontend ↔ Backend
```
Axios Instance (frontend/src/api.js)
   ↓
Express Middleware (backend/server.js)
   ↓
Route Handlers (backend/server.js)
   ↓
Database Layer (backend/db.js)
   ↓
JSON Files (backend/data/)
```

### React ↔ API
```
Component
   ↓
useEffect / Event Handler
   ↓
Axios API Call
   ↓
useState to Update
   ↓
Component Re-render
```

---

**Last Updated**: December 30, 2025  
**Status**: ✅ Production Ready
