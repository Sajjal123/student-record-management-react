# Student Records Manager

A modern web application for managing student records with a clean, responsive UI built with React and Express.js.

## Features

✨ **Student Management**
- 📋 View all student records
- ➕ Add new students
- ✏️ Edit student details
- 🗑️ Delete student records

🎨 **User Interface**
- Responsive design (mobile, tablet, desktop)
- Clean and intuitive UI with Tailwind CSS
- Real-time form validation
- Loading states and error handling

💾 **Data Persistence**
- JSON-based data storage
- RESTful API backend
- Express.js server

## Project Structure

```
my-app/
├── frontend/                  # React app
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── App.jsx           # Main app component
│   │   ├── api.js            # API integration
│   │   └── index.css         # Tailwind styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── backend/                   # Express server
    ├── server.js             # Main server file
    ├── db.js                 # Database operations
    ├── data/
    │   └── students.json     # Student data
    └── package.json
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
npm install
```

2. Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

1. Open `http://localhost:3000` in your browser
2. Click "Add New Student" to add a student
3. Fill in the required fields (Name, Email, Phone, Date of Birth)
4. View all students in the main list
5. Click "Edit" to update student details
6. Click "Delete" to remove a student

## API Endpoints

### Get all students
```
GET /api/students
```

### Get single student
```
GET /api/students/:id
```

### Create student
```
POST /api/students
Body: { name, email, phone, grade, dob, address }
```

### Update student
```
PUT /api/students/:id
Body: { name, email, phone, grade, dob, address }
```

### Delete student
```
DELETE /api/students/:id
```

## Technologies Used

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Axios

**Backend:**
- Express.js
- Node.js
- File System (fs) for JSON storage

## Responsive Design

The application is fully responsive:
- **Mobile**: Single column layout
- **Tablet**: Optimized card grid
- **Desktop**: 3-column layout with sidebar

## Data Format

Student records are stored in JSON with the following structure:

```json
{
  "id": "1",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-0101",
  "grade": "10",
  "dob": "2008-05-15",
  "address": "123 Main St, City"
}
```

## License

MIT
