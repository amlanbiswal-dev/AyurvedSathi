@echo off
cd /d "%~dp0"
echo Starting AyurvedSathi frontend...
node .\node_modules\vite\bin\vite.js --host 0.0.0.0 --port 4173
