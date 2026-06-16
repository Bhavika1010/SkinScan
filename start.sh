#!/bin/bash
# Starts both the Flask backend and Vite frontend in parallel

echo ""
echo "  Starting Skincare Ingredient Checker..."
echo ""

# Start Flask backend
echo "  [1/2] Starting Flask backend on http://localhost:5000"
cd backend && python app.py &
BACKEND_PID=$!
cd ..

# Give Flask a moment to start
sleep 1

# Start Vite frontend
echo "  [2/2] Starting React frontend on http://localhost:5173"
cd frontend && npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "  Both servers running."
echo "  Open http://localhost:5173 in your browser."
echo "  Press Ctrl+C to stop."
echo ""

# Wait and clean up on exit
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo ''; echo '  Stopped.'; exit" SIGINT SIGTERM
wait
