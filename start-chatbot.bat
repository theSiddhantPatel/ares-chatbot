@echo off
echo Starting chatbot backend and tunnel...

REM Go to project directory
cd /d C:\achievement\localLLM

REM Start FastAPI backend using the CORRECT venv (chatbot)
start "" "C:\achievement\localLLM\chatbot\Scripts\python.exe" -m uvicorn app:app --host 0.0.0.0 --port 8000

REM Wait for backend to start
timeout /t 10 > nul

REM Start Cloudflare tunnel
start "" "C:\Program Files (x86)\cloudflared\cloudflared.exe" tunnel run fee46f4a-0247-46c5-98d1-64cdb84330aa"
