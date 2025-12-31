#!/bin/bash

# StudentsHub - Setup Script

echo "🚀 StudentsHub - Setup Script"
echo "=============================="
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16+"
    exit 1
fi
echo "✓ Node.js version: $(node -v)"
echo "✓ npm version: $(npm -v)"
echo ""

# Backend Setup
echo "📦 Setting up Backend..."
cd backend
echo "Installing backend dependencies..."
npm install
echo "✓ Backend setup complete"
cd ..
echo ""

# Frontend Setup
echo "📦 Setting up Frontend..."
cd frontend
echo "Installing frontend dependencies..."
npm install
echo "✓ Frontend setup complete"
cd ..
echo ""

echo "✅ Setup Complete!"
echo ""
echo "To start development:"
echo "  Terminal 1: cd backend && npm run dev"
echo "  Terminal 2: cd frontend && npm run dev"
echo ""
echo "Then open: http://localhost:3000"
echo ""
echo "Demo Credentials:"
echo "  Admin: admin / admin@123"
echo "  Student: john.doe / student@123"
