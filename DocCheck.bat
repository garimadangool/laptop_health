@echo off
echo Starting DocCheck...
where bash >nul 2>nul && (bash health.sh) || ("C:\Program Files\Git\bin\bash.exe" health.sh)
start "" index.html
