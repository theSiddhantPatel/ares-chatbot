# Self-Hosted AI Chatbot (FastAPI + Cloudflare Tunnel)

## Overview

This project is a **self-hosted AI chatbot** that runs locally on my machine and is securely exposed to the internet using a **permanent Cloudflare Tunnel**.  
The chatbot is embedded into websites as a **script-based widget**, similar to real-world support chatbots.

The goal of this project is to demonstrate:

- Backend engineering
- Secure API exposure without public servers
- Real-world deployment patterns
- Clean separation of secrets and code

---

## Key Features

- FastAPI-based backend
- AI chatbot with retrieval (RAG) pipeline
- Session-based conversation memory
- Script-based embeddable chatbot widget
- Permanent Cloudflare Tunnel with custom domain
- HTTPS access without EC2 / VPS
- API-key protected endpoints
- Environment-based secret management
- CORS-based domain restriction
- Auto-start capable on Windows
- No cloud compute cost

---

## High-Level Architecture

User Browser
↓
Website / Portfolio
↓
chatbot.js (embedded script)
↓
Cloudflare Tunnel (HTTPS)
↓
Local FastAPI Backend
↓
RAG + LLM Pipeline

yaml
Copy code

---

## Chatbot API

### Endpoint

POST /chat

shell
Copy code

### Production URL

https://chatbot.siddpatel.com/chat

bash
Copy code

### Request Body

```json
{
  "message": "Hello",
  "session_id": "optional"
}
Response
json
Copy code
{
  "reply": "Hello! How can I help you? 😊",
  "session_id": "generated_or_existing_id"
}
Embedding the Chatbot
To add the chatbot to any website, include the following script:

html
Copy code
<script src="https://chatbot.siddpatel.com/static/chatbot.js"></script>
The UI, API calls, and session handling are fully managed by the script.

Security Design
This project intentionally follows real-world security practices:

API endpoints are protected using an API key

Secrets are stored in a .env file (never committed)

No hardcoded credentials in source code

Backend access restricted using CORS

Cloudflare Tunnel prevents direct IP exposure

HTTPS enforced end-to-end

Environment Variable
Create a .env file locally (not committed):

env
Copy code
CHATBOT_API_KEY=your_secret_key_here
Secrets are loaded using python-dotenv.

Running Locally (Development)
bash
Copy code
pip install -r requirements.txt
uvicorn app:app --reload
Note:
app.py is currently excluded from this repository while refactoring and security hardening is in progress.
The repository focuses on architecture, frontend integration, and deployment strategy.

Why Cloudflare Tunnel?
Cloudflare Tunnel was chosen because it:

Eliminates the need for EC2 / VPS

Provides HTTPS automatically

Requires no open inbound ports

Supports custom domains

Is ideal for self-hosted demos and portfolios

This mirrors how many internal tools and zero-trust systems are deployed in production.

Repository Hygiene
The following are intentionally excluded via .gitignore:

Virtual environments

Cloudflare credentials

.env files

Local-only configuration

This ensures:

No secrets are leaked

Repository remains clean and portable

Code is safe to publish on GitHub

Use Cases
Portfolio chatbot

Personal AI assistant

Knowledge-base chatbot

Interview demonstration project

Secure self-hosted AI service

Future Improvements
Rate limiting per IP / API key

Persistent session storage (Redis)

Enhanced UI/UX (animations, typing indicator)

API versioning

Multi-model support

Deployment automation scripts

Author
Siddhant Patel
Portfolio: https://siddpatel.com

License
This project is intended for educational and portfolio purposes.

markdown
Copy code

---

## ✅ What this README does for you

- Looks **professional and complete**
- Safe even without `app.py`
- Explains **why** decisions were made
- Interview-ready
- Recruiter-friendly
- GitHub-safe

If you want next, I can:
- write **resume bullet points**
- prepare a **1-minute interview explanation**
- or review your repo **before final push**
```
