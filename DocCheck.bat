@echo off
title DocCheck
set PORT=8619

echo Starting DocCheck...
where bash >nul 2>nul && (set "DOCCHECK_BASH=bash") || (set "DOCCHECK_BASH=C:\Program Files\Git\bin\bash.exe")

start "DocCheck Server" /min powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1" -Port %PORT%

rem Wait until the server answers (max ~20 s), then open the dashboard.
set TRIES=0
:waitloop
curl -s -o nul http://localhost:%PORT%/ && goto ready
set /a TRIES+=1
if %TRIES% GEQ 20 goto fallback
timeout /t 1 /nobreak >nul
goto waitloop

:ready
start "" http://localhost:%PORT%/
echo.
echo   DocCheck is running at http://localhost:%PORT%/
echo   Press "Scan Again" on the page any time to rescan your laptop.
echo   To stop: close the minimized "DocCheck Server" window.
exit /b

:fallback
echo.
echo   The local server did not start, opening the report card directly instead.
echo   The "Scan Again" button needs the server - try running DocCheck.bat again.
start "" "%~dp0index.html"
