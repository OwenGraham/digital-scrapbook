# Ensure npm is in the PATH
$env:PATH += ";C:\Program Files\nodejs"

# Get the script directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition

# Start the backend server
Start-Process -NoNewWindow -FilePath "powershell" -ArgumentList "cd `"$scriptDir\backend`"; mvn spring-boot:run"

# Start the frontend server
Start-Process -NoNewWindow -FilePath "powershell" -ArgumentList "cd `"$scriptDir\frontend`"; npm start"
