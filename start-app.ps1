# Ensure npm is in the PATH
$env:PATH += ";C:\Program Files\nodejs"

# Get the script directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition

# Start the backend server
Start-Process -NoNewWindow -WorkingDirectory "$scriptDir\backend" -FilePath "powershell" -ArgumentList "mvn spring-boot:run"

# Start the frontend server
Start-Process -NoNewWindow -WorkingDirectory "$scriptDir\frontend" -FilePath "powershell" -ArgumentList "npm start"
