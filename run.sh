
#!/bin/bash

# Function to handle script termination
cleanup() {
    echo "Stopping servers..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID
    fi
    exit 0
}

# Set up trap to catch Ctrl+C
trap cleanup SIGINT SIGTERM

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "Java is not installed. Please install Java 17 or higher."
    exit 1
fi

# Check if Node.js is installed
if ! command -v npm &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js."
    exit 1
fi

# Check if MySQL is running
if ! command -v mysqladmin &> /dev/null || ! mysqladmin ping --silent; then
    echo "MySQL is not running. Please start MySQL."
    exit 1
fi

# Start backend
echo "Building and starting the backend server..."
cd backend
mvn clean package -DskipTests
java -jar target/dentalflow-0.0.1-SNAPSHOT.jar &
BACKEND_PID=$!
cd ..

# Wait for backend to start
echo "Waiting for backend to start..."
sleep 10

# Start frontend
echo "Starting the frontend development server..."
npm install
npm run dev &
FRONTEND_PID=$!

# Keep the script running
echo "Servers are running. Press Ctrl+C to stop."
wait $FRONTEND_PID

# Clean up when frontend stops
cleanup
