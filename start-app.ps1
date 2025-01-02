# Start the backend server
Start-Process -NoNewWindow -FilePath "powershell" -ArgumentList "cd backend; mvn spring-boot:run"

# Start the frontend server
Start-Process -NoNewWindow -FilePath "powershell" -ArgumentList "cd frontend; npm start"
