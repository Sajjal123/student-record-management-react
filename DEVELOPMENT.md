# Development Guide for StudentsHub

## Quick Start

### Prerequisites
- Node.js v16+
- npm v8+
- VS Code (recommended)

### First Time Setup
```bash
# Clone/navigate to project
cd my-app

# Install backend dependencies
cd backend && npm install && cd ..

# Install frontend dependencies
cd frontend && npm install && cd ..
```

### Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Open http://localhost:3000 in your browser.

## File Structure Explanation

### Backend (`backend/`)
- **server.js**: Main Express server with API routes
- **db.js**: Database operations (CRUD for students, alumni, users)
- **data/**: JSON files for data persistence
  - students.json: Student records
  - alumni.json: Alumni records
  - users.json: User credentials

### Frontend (`frontend/src/`)
- **App.jsx**: Main component with routing logic
- **context/AuthContext.jsx**: Authentication state management
- **pages/**: Full page components
- **components/**: Reusable UI components
- **api.js**: Axios instance for API calls

## Authentication Flow

1. User opens app → LoginPage
2. Enters credentials → API /auth/login
3. Server validates → Returns user data
4. Frontend stores in context + localStorage
5. Redirects to Admin/Student portal based on role

## Adding New Features

### Adding a Student Field
1. Update `backend/db.js` - Add field to student object
2. Update `backend/server.js` - Add validation if needed
3. Update form components - Add input field
4. Update table component - Add column

### Adding a New Route
1. Add function in `backend/db.js`
2. Add endpoint in `backend/server.js`
3. Add API call in `frontend/src/api.js`
4. Create component to use it

## Debugging Tips

### Backend Issues
- Check console for errors
- Verify data files exist in `backend/data/`
- Test API with Postman/Insomnia
- Check CORS settings

### Frontend Issues
- Open browser DevTools (F12)
- Check Network tab for API calls
- Check Console for JavaScript errors
- Test with different browsers

## Testing Checklist

- [ ] Login with admin credentials
- [ ] Login with student credentials
- [ ] Add a new student
- [ ] Edit student details
- [ ] Delete a student
- [ ] View student table
- [ ] Add alumni record
- [ ] View reports
- [ ] Check responsive design on mobile
- [ ] Test all hover effects

## Deployment Checklist

- [ ] Build frontend: `npm run build`
- [ ] Test production build: `npm run preview`
- [ ] Set environment variables
- [ ] Configure API endpoint for production
- [ ] Deploy frontend to hosting
- [ ] Deploy backend to server
- [ ] Test all features in production
- [ ] Set up HTTPS
- [ ] Configure database backups

## Performance Tips

- Use React DevTools Profiler
- Check Network tab for large assets
- Minimize bundle size with code splitting
- Use lazy loading for routes
- Optimize images

## Common Issues & Solutions

### Issue: CORS Error
**Solution**: Ensure backend runs on :5000 and frontend CORS config is correct

### Issue: Port Already in Use
**Solution**: Kill the process on that port or use different port

### Issue: Data Not Saving
**Solution**: Check file permissions and JSON syntax

### Issue: Slow Performance
**Solution**: Clear node_modules and reinstall, check for console errors

## Code Style

- Use functional components with hooks
- Use meaningful variable names
- Add comments for complex logic
- Keep components under 300 lines
- Follow Tailwind CSS conventions

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push to remote
git push origin feature/new-feature

# Create pull request
```

## Resources

- [React Hooks API](https://react.dev/reference/react)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Express.js Guide](https://expressjs.com/en/starter/basic-routing.html)
- [Vite Documentation](https://vitejs.dev/guide/)

## Support

For questions or issues:
1. Check this guide first
2. Search in browser console
3. Check terminal for backend errors
4. Ask in team chat/email
