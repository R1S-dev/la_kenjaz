@echo off
cd /d "%~dp0"
where npm >nul 2>nul
if errorlevel 1 (
  echo Instaliraj Node.js 22 ili noviji, pa ponovo pokreni ovaj fajl.
  pause
  exit /b 1
)
if not exist node_modules (
  call npm ci
  if errorlevel 1 (
    echo Instalacija nije uspela. Proveri internet vezu i pokusaj ponovo.
    pause
    exit /b 1
  )
)
call npm run dev -- --open
pause
