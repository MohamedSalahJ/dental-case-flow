
@echo off
echo Starting DentalFlow Application...

REM Check if Java is installed
java -version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Java is not installed. Please install Java 17 or higher.
    exit /b
)

REM Check if Node.js is installed
npm -v >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Please install Node.js.
    exit /b
)

REM Start backend in a new window
echo Starting backend server...
start cmd /k "cd backend && mvn clean package -DskipTests && java -jar target\dentalflow-0.0.1-SNAPSHOT.jar"

REM Wait for backend to start
echo Waiting for backend to start...
timeout /t 10 /nobreak

REM Start frontend in a new window
echo Starting frontend server...
start cmd /k "npm install && npm run dev"

echo Both servers are starting. Close the windows to stop the servers.
