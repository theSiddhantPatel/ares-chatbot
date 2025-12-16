// (function () {
//   // -------- SESSION SETUP --------
//   const SESSION_KEY = "ai_chatbot_session";

//   let sessionId = localStorage.getItem(SESSION_KEY);
//   if (!sessionId) {
//     sessionId = crypto.randomUUID();
//     localStorage.setItem(SESSION_KEY, sessionId);
//   }
//   // Create container
//   const container = document.createElement("div");
//   container.id = "ai-chatbot-container";
//   container.innerHTML = `
//     <style>
//       #ai-chatbot-box {
//         position: fixed;
//         bottom: 20px;
//         right: 20px;
//         width: 320px;
//         height: 420px;
//         background: white;
//         border-radius: 10px;
//         box-shadow: 0 0 15px rgba(0,0,0,0.2);
//         display: flex;
//         flex-direction: column;
//         font-family: Arial, sans-serif;
//         z-index: 9999;
//       }
//       #ai-chatbot-header {
//         background: #4f46e5;
//         color: white;
//         padding: 10px;
//         text-align: center;
//         font-weight: bold;
//       }
//       #ai-chatbot-messages {
//         flex: 1;
//         padding: 10px;
//         overflow-y: auto;
//         font-size: 14px;
//       }
//       .ai-msg-user { text-align: right; margin-bottom: 8px; }
//       .ai-msg-bot { text-align: left; margin-bottom: 8px; color: #4f46e5; }
//       #ai-chatbot-input {
//         display: flex;
//         border-top: 1px solid #ddd;
//       }
//       #ai-chatbot-input input {
//         flex: 1;
//         border: none;
//         padding: 10px;
//         outline: none;
//       }
//       #ai-chatbot-input button {
//         border: none;
//         padding: 10px;
//         background: #4f46e5;
//         color: white;
//         cursor: pointer;
//       }
//     </style>

//     <div id="ai-chatbot-box">
//       <div id="ai-chatbot-header">AI Chatbot</div>
//       <div id="ai-chatbot-messages"></div>
//       <div id="ai-chatbot-input">
//         <input id="ai-chatbot-text" placeholder="Type a message..." />
//         <button id="ai-chatbot-send">Send</button>
//       </div>
//     </div>
//   `;

//   document.body.appendChild(container);

//   const input = document.getElementById("ai-chatbot-text");
//   const messages = document.getElementById("ai-chatbot-messages");
//   const sendBtn = document.getElementById("ai-chatbot-send");

//   async function sendMessage() {
//     const text = input.value.trim();
//     if (!text) return;

//     messages.innerHTML += `<div class="ai-msg-user"><b>You:</b> ${text}</div>`;
//     input.value = "";
//     messages.scrollTop = messages.scrollHeight;

//     const res = await fetch("http://127.0.0.1:8000/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         message: text,
//         session_id: sessionId,
//       }),
//     });

//     const data = await res.json();
//     if (data.session_id) {
//       sessionId = data.session_id;
//       localStorage.setItem(SESSION_KEY, sessionId);
//     }

//     messages.innerHTML += `<div class="ai-msg-bot"><b>Bot:</b> ${data.reply}</div>`;
//     messages.scrollTop = messages.scrollHeight;
//   }

//   sendBtn.onclick = sendMessage;
//   input.addEventListener("keypress", (e) => {
//     if (e.key === "Enter") sendMessage();
//   });
// })();

//code 2 chatgpt

// (function () {
//   /* ---------------- SESSION SETUP ---------------- */
//   const SESSION_KEY = "ai_chatbot_session";

//   let sessionId = localStorage.getItem(SESSION_KEY);
//   if (!sessionId) {
//     sessionId = crypto.randomUUID();
//     localStorage.setItem(SESSION_KEY, sessionId);
//   }

//   /* ---------------- STYLES ---------------- */
//   const style = document.createElement("style");
//   style.innerHTML = `
//     #ai-chatbot-button {
//       position: fixed;
//       bottom: 20px;
//       right: 20px;
//       width: 60px;
//       height: 60px;
//       background: #4f46e5;
//       border-radius: 50%;
//       cursor: pointer;
//       box-shadow: 0 4px 12px rgba(0,0,0,0.3);
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       z-index: 9999;
//     }

//     #ai-chatbot-button img {
//       width: 50px;
//       height: 50px;
//     }

//     #ai-chatbot-box {
//       position: fixed;
//       bottom: 90px;
//       right: 20px;
//       width: 350px;
//       height: 450px;
//       background: white;
//       border-radius: 12px;
//       box-shadow: 0 10px 30px rgba(0,0,0,0.25);
//       display: none;
//       flex-direction: column;
//       font-family: Arial, sans-serif;
//       z-index: 9999;
//       overflow: hidden;
//     }

//     #ai-chatbot-header {
//       background: #4f46e5;
//       color: white;
//       padding: 12px;
//       font-weight: bold;
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//     }

//     #ai-chatbot-close {
//       cursor: pointer;
//       font-size: 18px;
//     }

//     #ai-chatbot-messages {
//       flex: 1;
//       padding: 10px;
//       overflow-y: auto;
//       font-size: 14px;
//     }

//     .ai-user { text-align: right; margin: 6px 0; }
//     .ai-bot { text-align: left; margin: 6px 0; color: #4f46e5; }

//     #ai-chatbot-input {
//       display: flex;
//       border-top: 1px solid #ddd;
//     }

//     #ai-chatbot-input input {
//       flex: 1;
//       border: none;
//       padding: 10px;
//       outline: none;
//     }

//     #ai-chatbot-input button {
//       background: #4f46e5;
//       color: white;
//       border: none;
//       padding: 10px 15px;
//       cursor: pointer;
//     }
//   `;
//   document.head.appendChild(style);

//   /* ---------------- CHAT BUTTON ---------------- */
//   const button = document.createElement("div");
//   button.id = "ai-chatbot-button";
//   button.innerHTML = `
//     <img src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png" />
//   `;
//   document.body.appendChild(button);

//   /* ---------------- CHAT BOX ---------------- */
//   const box = document.createElement("div");
//   box.id = "ai-chatbot-box";
//   box.innerHTML = `
//     <div id="ai-chatbot-header">
//       AI Chatbot
//       <span id="ai-chatbot-close">✖</span>
//     </div>
//     <div id="ai-chatbot-messages"></div>
//     <div id="ai-chatbot-input">
//       <input id="ai-chatbot-text" placeholder="Type a message..." />
//       <button id="ai-chatbot-send">Send</button>
//     </div>
//   `;
//   document.body.appendChild(box);

//   /* ---------------- TOGGLE LOGIC ---------------- */
//   button.onclick = () => {
//     box.style.display = "flex";
//     button.style.display = "none";
//   };

//   document.getElementById("ai-chatbot-close").onclick = () => {
//     box.style.display = "none";
//     button.style.display = "flex";
//   };

//   /* ---------------- CHAT LOGIC ---------------- */
//   const input = document.getElementById("ai-chatbot-text");
//   const messages = document.getElementById("ai-chatbot-messages");
//   const sendBtn = document.getElementById("ai-chatbot-send");

//   async function sendMessage() {
//     const text = input.value.trim();
//     if (!text) return;

//     messages.innerHTML += `<div class="ai-user"><b>You:</b> ${text}</div>`;
//     input.value = "";
//     messages.scrollTop = messages.scrollHeight;

//     const res = await fetch("http://127.0.0.1:8000/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         message: text,
//         session_id: sessionId,
//       }),
//     });

//     const data = await res.json();

//     if (data.session_id) {
//       sessionId = data.session_id;
//       localStorage.setItem(SESSION_KEY, sessionId);
//     }

//     messages.innerHTML += `<div class="ai-bot"><b>Bot:</b> ${data.reply}</div>`;
//     messages.scrollTop = messages.scrollHeight;
//   }

//   sendBtn.onclick = sendMessage;
//   input.addEventListener("keypress", (e) => {
//     if (e.key === "Enter") sendMessage();
//   });
// })();

//code 3 gemini

// (function () {
//   /* ---------------- SESSION SETUP ---------------- */
//   const SESSION_KEY = "ai_chatbot_session";
//   // The functionality code remains the same
//   let sessionId = localStorage.getItem(SESSION_KEY);
//   if (!sessionId) {
//     sessionId = crypto.randomUUID();
//     localStorage.setItem(SESSION_KEY, sessionId);
//   }

//   /* ---------------- STYLES: MODERN & POLISHED UI ---------------- */
//   const style = document.createElement("style");
//   style.innerHTML = `
//     /* Variables for easy color/size changes */
//     :root {
//       --primary-color: #0d9488; /* Teal/Emerald - more professional than deep purple */
//       --secondary-color: #f0fdfa; /* Lightest background for header/bot messages */
//       --chat-bg: #ffffff;
//       --user-bubble-color: #0d9488;
//       --user-text-color: #ffffff;
//       --bot-bubble-color: #e5e7eb; /* Light gray */
//       --bot-text-color: #1f2937; /* Dark gray */
//       --shadow-lg: 0 10px 20px rgba(0,0,0,0.15);
//       --border-radius-lg: 16px;
//       --border-radius-sm: 8px;
//     }

//     /* CHAT BUTTON STYLING */
//     #ai-chatbot-button {
//       position: fixed;
//       bottom: 24px;
//       right: 24px;
//       width: 64px;
//       height: 64px;
//       background: var(--primary-color);
//       border-radius: 50%;
//       cursor: pointer;
//       box-shadow: var(--shadow-lg);
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       z-index: 9999;
//       transition: transform 0.2s ease, box-shadow 0.2s ease;
//     }

//     #ai-chatbot-button:hover {
//       transform: scale(1.05);
//       box-shadow: 0 15px 30px rgba(0,0,0,0.2);
//     }

//     #ai-chatbot-button svg {
//       width: 32px;
//       height: 32px;
//       fill: white;
//     }

//     /* CHAT BOX CONTAINER STYLING */
//     #ai-chatbot-box {
//       position: fixed;
//       bottom: 100px;
//       right: 24px;
//       width: 380px; /* Slightly wider */
//       height: 500px; /* Slightly taller */
//       background: var(--chat-bg);
//       border-radius: var(--border-radius-lg);
//       box-shadow: var(--shadow-lg);
//       display: none;
//       flex-direction: column;
//       font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//       z-index: 9999;
//       overflow: hidden;
//       transform-origin: bottom right;
//       animation: fadeInScale 0.3s ease-out;
//     }

//     @keyframes fadeInScale {
//       from { opacity: 0; transform: scale(0.95); }
//       to { opacity: 1; transform: scale(1); }
//     }

//     /* HEADER STYLING */
//     #ai-chatbot-header {
//       background: var(--primary-color);
//       color: white;
//       padding: 16px;
//       font-weight: 600; /* Semi-bold */
//       font-size: 16px;
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       border-top-left-radius: var(--border-radius-lg);
//       border-top-right-radius: var(--border-radius-lg);
//     }

//     #ai-chatbot-close {
//       cursor: pointer;
//       font-size: 20px;
//       padding: 2px 5px;
//       transition: opacity 0.2s;
//     }

//     #ai-chatbot-close:hover {
//         opacity: 0.8;
//     }

//     /* MESSAGES AREA */
//     #ai-chatbot-messages {
//       flex: 1;
//       padding: 15px;
//       overflow-y: auto;
//       font-size: 15px;
//       line-height: 1.5;
//       background-color: #f9fafb; /* Very light background for messages area */
//       /* Scrollbar styling for a cleaner look */
//       scrollbar-width: thin; /* Firefox */
//       scrollbar-color: var(--primary-color) #f9fafb; /* Firefox */
//     }

//     /* Custom Webkit scrollbar for Chrome/Safari */
//     #ai-chatbot-messages::-webkit-scrollbar {
//         width: 8px;
//     }
//     #ai-chatbot-messages::-webkit-scrollbar-thumb {
//         background-color: var(--primary-color);
//         border-radius: 10px;
//         border: 2px solid #f9fafb;
//     }
//     #ai-chatbot-messages::-webkit-scrollbar-track {
//         background: #f9fafb;
//     }

//     /* MESSAGE BUBBLE STYLING */
//     .ai-message {
//         display: flex;
//         margin-bottom: 15px;
//         max-width: 85%;
//     }

//     .ai-message-content {
//         padding: 10px 14px;
//         border-radius: var(--border-radius-sm);
//         word-wrap: break-word;
//         box-shadow: 0 1px 3px rgba(0,0,0,0.05);
//     }

//     .ai-user {
//         justify-content: flex-end;
//         margin-left: auto;
//     }

//     .ai-user .ai-message-content {
//         background-color: var(--user-bubble-color);
//         color: var(--user-text-color);
//         border-bottom-right-radius: 2px; /* Pointed corner simulation */
//     }

//     .ai-bot {
//         justify-content: flex-start;
//     }

//     .ai-bot .ai-message-content {
//         background-color: var(--bot-bubble-color);
//         color: var(--bot-text-color);
//         border-bottom-left-radius: 2px; /* Pointed corner simulation */
//     }

//     /* INPUT AREA STYLING */
//     #ai-chatbot-input {
//       display: flex;
//       border-top: 1px solid #e5e7eb; /* Lighter separator */
//       background-color: white;
//       padding: 8px;
//     }

//     #ai-chatbot-text {
//       flex: 1;
//       border: 1px solid #d1d5db; /* Subtle border on input field */
//       border-radius: var(--border-radius-sm);
//       padding: 12px;
//       outline: none;
//       font-size: 15px;
//       transition: border-color 0.2s;
//     }

//     #ai-chatbot-text:focus {
//         border-color: var(--primary-color);
//         box-shadow: 0 0 0 1px var(--primary-color);
//     }

//     #ai-chatbot-send {
//       background: var(--primary-color);
//       color: white;
//       border: none;
//       border-radius: var(--border-radius-sm);
//       padding: 0 15px;
//       margin-left: 8px;
//       cursor: pointer;
//       font-weight: 500;
//       transition: background-color 0.2s, transform 0.1s;
//       white-space: nowrap; /* Prevent button text wrap */
//     }

//     #ai-chatbot-send:hover {
//         background-color: #065f46; /* Darker on hover */
//     }

//     #ai-chatbot-send:active {
//         transform: scale(0.98);
//     }
//   `;
//   document.head.appendChild(style);

//   /* ---------------- CHAT BUTTON (with SVG Icon) ---------------- */
//   const button = document.createElement("div");
//   button.id = "ai-chatbot-button";
//   // Replaced image with a simple SVG for better scaling and performance
//   button.innerHTML = `
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//         <path d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H17L23 23V6C23 4.89543 22.1046 4 21 4ZM10 12V14H14V12H10ZM7 9V14H8.5V9H7ZM15.5 9V14H17V9H15.5Z"/>
//     </svg>
//   `;
//   document.body.appendChild(button);

//   /* ---------------- CHAT BOX ---------------- */
//   const box = document.createElement("div");
//   box.id = "ai-chatbot-box";
//   box.innerHTML = `
//     <div id="ai-chatbot-header">
//       AI Assistant
//       <span id="ai-chatbot-close">
//           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: block;">
//               <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
//           </svg>
//       </span>
//     </div>
//     <div id="ai-chatbot-messages"></div>
//     <div id="ai-chatbot-input">
//       <input id="ai-chatbot-text" placeholder="Ask a question..." />
//       <button id="ai-chatbot-send">
//         Send
//       </button>
//     </div>
//   `;
//   document.body.appendChild(box);

//   /* ---------------- TOGGLE LOGIC ---------------- */
//   button.onclick = () => {
//     box.style.display = "flex";
//     button.style.display = "none";
//   };

//   document.getElementById("ai-chatbot-close").onclick = () => {
//     box.style.display = "none";
//     button.style.display = "flex";
//   };

//   /* ---------------- CHAT LOGIC (Messages now use bubble classes) ---------------- */
//   const input = document.getElementById("ai-chatbot-text");
//   const messages = document.getElementById("ai-chatbot-messages");
//   const sendBtn = document.getElementById("ai-chatbot-send");

//   // Helper function to append message to the UI
//   function appendMessage(role, text) {
//     // Use the new, styled classes
//     messages.innerHTML += `
//         <div class="ai-message ai-${role}">
//             <div class="ai-message-content">
//                 ${text}
//             </div>
//         </div>
//       `;
//     messages.scrollTop = messages.scrollHeight;
//   }

//   async function sendMessage() {
//     const text = input.value.trim();
//     if (!text) return;

//     // Append User Message
//     appendMessage("user", text); // Simplified the output to just the message
//     input.value = "";

//     // Show a temporary loading indicator (optional but good for UX)
//     const loadingMessage = document.createElement("div");
//     loadingMessage.className = "ai-message ai-bot ai-loading";
//     loadingMessage.innerHTML = `<div class="ai-message-content" style="font-style: italic; opacity: 0.7;">Bot is typing...</div>`;
//     messages.appendChild(loadingMessage);
//     messages.scrollTop = messages.scrollHeight;

//     try {
//       const res = await fetch("http://127.0.0.1:8000/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           message: text,
//           session_id: sessionId,
//         }),
//       });

//       const data = await res.json();

//       // Remove loading indicator
//       loadingMessage.remove();

//       if (data.session_id) {
//         sessionId = data.session_id;
//         localStorage.setItem(SESSION_KEY, sessionId);
//       }

//       // Append Bot Message
//       appendMessage("bot", data.reply);
//     } catch (error) {
//       loadingMessage.remove();
//       appendMessage("bot", "Sorry, I ran into an error. Please try again.");
//       console.error("Chat API Error:", error);
//     }
//   }

//   sendBtn.onclick = sendMessage;
//   input.addEventListener("keypress", (e) => {
//     if (e.key === "Enter") sendMessage();
//   });
// })();

//code 4 gemini improved
// (function () {
//   /* ---------------- SESSION SETUP ---------------- */
//   const SESSION_KEY = "ai_chatbot_session";

//   let sessionId = localStorage.getItem(SESSION_KEY);
//   if (!sessionId) {
//     sessionId = crypto.randomUUID();
//     localStorage.setItem(SESSION_KEY, sessionId);
//   }

//   /* ---------------- EXTERNAL LIBRARIES & STYLES ---------------- */
//   // 1. Add Font Awesome CSS link
//   const faLink = document.createElement("link");
//   faLink.rel = "stylesheet";
//   faLink.href =
//     "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";
//   document.head.appendChild(faLink);

//   const style = document.createElement("style");
//   style.innerHTML = `
//     /* Variables for easy color/size changes */
//     :root {
//       --primary-color: #0d9488;
//       --chat-bg: #ffffff;
//       --user-bubble-color: #0d9488;
//       --user-text-color: #ffffff;
//       --bot-bubble-color: #e5e7eb;
//       --bot-text-color: #1f2937;
//       --shadow-lg: 0 10px 20px rgba(0,0,0,0.15);
//       --border-radius-lg: 16px;
//       --border-radius-sm: 8px;
//     }

//     /* CHAT BUTTON STYLING (Updated to use FA icons) */
//     #ai-chatbot-button {
//       position: fixed;
//       bottom: 24px;
//       right: 24px;
//       width: 64px;
//       height: 64px;
//       background: var(--primary-color);
//       border-radius: 50%;
//       cursor: pointer;
//       box-shadow: var(--shadow-lg);
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       z-index: 9999;
//       transition: transform 0.2s ease, box-shadow 0.2s ease;
//     }

//     #ai-chatbot-button:hover {
//       transform: scale(1.05);
//       box-shadow: 0 15px 30px rgba(0,0,0,0.2);
//     }

//     #ai-chatbot-button i {
//       color: white;
//       font-size: 28px;
//     }

//     /* WELCOME POPUP STYLING (New) */
//     #ai-chatbot-popup {
//         position: fixed;
//         bottom: 100px;
//         right: 100px; /* Positioned slightly away from the button */
//         background: #f0fdfa; /* Light accent color */
//         color: var(--bot-text-color);
//         padding: 12px 18px;
//         border-radius: var(--border-radius-sm);
//         box-shadow: 0 4px 12px rgba(0,0,0,0.1);
//         font-family: sans-serif;
//         font-size: 14px;
//         max-width: 250px;
//         opacity: 0; /* Starts hidden */
//         visibility: hidden;
//         transition: opacity 0.3s ease, right 0.3s ease;
//         z-index: 9998; /* Below the main chat box */
//         border-left: 4px solid var(--primary-color);
//     }

//     #ai-chatbot-popup.visible {
//         opacity: 1;
//         visibility: visible;
//         right: 90px; /* Slight movement animation */
//     }

//     /* CHAT BOX CONTAINER STYLING */
//     #ai-chatbot-box {
//       position: fixed;
//       bottom: 100px;
//       right: 24px;
//       width: 380px;
//       height: 500px;
//       background: var(--chat-bg);
//       border-radius: var(--border-radius-lg);
//       box-shadow: var(--shadow-lg);
//       display: none;
//       flex-direction: column;
//       font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//       z-index: 9999;
//       overflow: hidden;
//       transform-origin: bottom right;
//       animation: fadeInScale 0.3s ease-out;
//     }

//     @keyframes fadeInScale {
//       from { opacity: 0; transform: scale(0.95); }
//       to { opacity: 1; transform: scale(1); }
//     }

//     /* HEADER STYLING */
//     #ai-chatbot-header {
//       background: var(--primary-color);
//       color: white;
//       padding: 16px;
//       font-weight: 600;
//       font-size: 16px;
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       border-top-left-radius: var(--border-radius-lg);
//       border-top-right-radius: var(--border-radius-lg);
//     }

//     /* Close icon using Font Awesome */
//     #ai-chatbot-close i {
//       font-size: 20px;
//       cursor: pointer;
//       padding: 2px 5px;
//       transition: opacity 0.2s;
//     }

//     #ai-chatbot-close i:hover {
//         opacity: 0.8;
//     }

//     /* MESSAGES AREA */
//     #ai-chatbot-messages {
//       flex: 1;
//       padding: 15px;
//       overflow-y: auto;
//       font-size: 15px;
//       line-height: 1.5;
//       background-color: #f9fafb;
//       scrollbar-width: thin;
//       scrollbar-color: var(--primary-color) #f9fafb;
//     }

//     /* Custom Webkit scrollbar for Chrome/Safari */
//     #ai-chatbot-messages::-webkit-scrollbar {
//         width: 8px;
//     }
//     #ai-chatbot-messages::-webkit-scrollbar-thumb {
//         background-color: var(--primary-color);
//         border-radius: 10px;
//         border: 2px solid #f9fafb;
//     }
//     #ai-chatbot-messages::-webkit-scrollbar-track {
//         background: #f9fafb;
//     }

//     /* MESSAGE BUBBLE STYLING */
//     .ai-message {
//         display: flex;
//         margin-bottom: 15px;
//         max-width: 85%;
//     }

//     .ai-message-content {
//         padding: 10px 14px;
//         border-radius: var(--border-radius-sm);
//         word-wrap: break-word;
//         box-shadow: 0 1px 3px rgba(0,0,0,0.05);
//     }

//     .ai-user {
//         justify-content: flex-end;
//         margin-left: auto;
//     }

//     .ai-user .ai-message-content {
//         background-color: var(--user-bubble-color);
//         color: var(--user-text-color);
//         border-bottom-right-radius: 2px;
//     }

//     .ai-bot {
//         justify-content: flex-start;
//     }

//     .ai-bot .ai-message-content {
//         background-color: var(--bot-bubble-color);
//         color: var(--bot-text-color);
//         border-bottom-left-radius: 2px;
//     }

//     /* INPUT AREA STYLING */
//     #ai-chatbot-input {
//       display: flex;
//       border-top: 1px solid #e5e7eb;
//       background-color: white;
//       padding: 8px;
//     }

//     #ai-chatbot-text {
//       flex: 1;
//       border: 1px solid #d1d5db;
//       border-radius: var(--border-radius-sm);
//       padding: 12px;
//       outline: none;
//       font-size: 15px;
//       transition: border-color 0.2s;
//     }

//     #ai-chatbot-text:focus {
//         border-color: var(--primary-color);
//         box-shadow: 0 0 0 1px var(--primary-color);
//     }

//     #ai-chatbot-send {
//       background: var(--primary-color);
//       color: white;
//       border: none;
//       border-radius: var(--border-radius-sm);
//       padding: 0 15px;
//       margin-left: 8px;
//       cursor: pointer;
//       font-weight: 500;
//       transition: background-color 0.2s, transform 0.1s;
//       white-space: nowrap;
//     }

//     #ai-chatbot-send:hover {
//         background-color: #065f46;
//     }

//     #ai-chatbot-send:active {
//         transform: scale(0.98);
//     }
//   `;
//   document.head.appendChild(style);

//   /* ---------------- CHAT BUTTON ---------------- */
//   const button = document.createElement("div");
//   button.id = "ai-chatbot-button";
//   // Used Font Awesome icon for a modern look
//   button.innerHTML = `
//     <i class="fa-solid fa-comments"></i>
//   `;
//   document.body.appendChild(button);

//   /* ---------------- WELCOME POPUP (New Element) ---------------- */
//   const popup = document.createElement("div");
//   popup.id = "ai-chatbot-popup";
//   popup.innerHTML = `
//     Hello! I'm your AI Assistant. I can help you find information about this page and our services. Ask me anything!
//   `;
//   document.body.appendChild(popup);

//   // Show the popup automatically after a short delay (e.g., 2 seconds)
//   setTimeout(() => {
//     popup.classList.add("visible");
//   }, 2000);

//   // Hide the popup after a longer delay (e.g., 8 seconds) or when clicked
//   setTimeout(() => {
//     popup.classList.remove("visible");
//   }, 8000);

//   popup.onclick = () => {
//     popup.classList.remove("visible");
//     // Also trigger the main chat window when the popup is clicked
//     box.style.display = "flex";
//     button.style.display = "none";
//   };

//   /* ---------------- CHAT BOX ---------------- */
//   const box = document.createElement("div");
//   box.id = "ai-chatbot-box";
//   box.innerHTML = `
//     <div id="ai-chatbot-header">
//       AI Assistant
//       <span id="ai-chatbot-close">
//           <i class="fa-solid fa-xmark"></i>
//       </span>
//     </div>
//     <div id="ai-chatbot-messages"></div>
//     <div id="ai-chatbot-input">
//       <input id="ai-chatbot-text" placeholder="Ask a question..." />
//       <button id="ai-chatbot-send">
//         <i class="fa-solid fa-paper-plane"></i>
//       </button>
//     </div>
//   `;
//   document.body.appendChild(box);

//   /* ---------------- TOGGLE LOGIC ---------------- */

//   // Function to add the initial greeting message inside the chat box
//   function addInitialGreeting() {
//     // Check if the greeting already exists to prevent duplication
//     if (!messages.querySelector(".ai-initial-greeting")) {
//       const greeting = `
//         <div class="ai-message ai-bot ai-initial-greeting">
//             <div class="ai-message-content">
//                 **Welcome!** I'm ready to help you navigate this page. What can I assist you with today?
//             </div>
//         </div>
//       `;
//       messages.innerHTML += greeting;
//       messages.scrollTop = messages.scrollHeight;
//     }
//   }

//   button.onclick = () => {
//     // When button is clicked:
//     box.style.display = "flex";
//     button.style.display = "none";
//     popup.classList.remove("visible"); // Hide popup immediately
//     addInitialGreeting(); // Add the greeting inside the chat box
//   };

//   document.getElementById("ai-chatbot-close").onclick = () => {
//     // When chat box is closed:
//     box.style.display = "none";
//     button.style.display = "flex";
//     // You might want to re-show the popup here, but generally best practice is to keep it hidden after the first interaction
//   };

//   /* ---------------- CHAT LOGIC ---------------- */
//   const input = document.getElementById("ai-chatbot-text");
//   const messages = document.getElementById("ai-chatbot-messages");
//   const sendBtn = document.getElementById("ai-chatbot-send");

//   // Helper function to append message to the UI
//   function appendMessage(role, text) {
//     messages.innerHTML += `
//         <div class="ai-message ai-${role}">
//             <div class="ai-message-content">
//                 ${text}
//             </div>
//         </div>
//       `;
//     messages.scrollTop = messages.scrollHeight;
//   }

//   async function sendMessage() {
//     const text = input.value.trim();
//     if (!text) return;

//     // Append User Message
//     appendMessage("user", text);
//     input.value = "";

//     // Show a temporary loading indicator
//     const loadingMessage = document.createElement("div");
//     loadingMessage.className = "ai-message ai-bot ai-loading";
//     loadingMessage.innerHTML = `<div class="ai-message-content" style="font-style: italic; opacity: 0.7;">Bot is typing...</div>`;
//     messages.appendChild(loadingMessage);
//     messages.scrollTop = messages.scrollHeight;

//     try {
//       const res = await fetch("http://127.0.0.1:8000/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           message: text,
//           session_id: sessionId,
//         }),
//       });

//       const data = await res.json();

//       // Remove loading indicator
//       loadingMessage.remove();

//       if (data.session_id) {
//         sessionId = data.session_id;
//         localStorage.setItem(SESSION_KEY, sessionId);
//       }

//       // Append Bot Message
//       appendMessage("bot", data.reply);
//     } catch (error) {
//       loadingMessage.remove();
//       appendMessage("bot", "Sorry, I ran into an error. Please try again.");
//       console.error("Chat API Error:", error);
//     }
//   }

//   // Update send button to use the new icon
//   sendBtn.onclick = sendMessage;
//   input.addEventListener("keypress", (e) => {
//     if (e.key === "Enter") sendMessage();
//   });
// })();

//gemini improved with welcome popup and better icon

(function () {
  "use strict";

  /* ---------------- CONFIGURATION ---------------- */
  const API_ENDPOINT = "http://127.0.0.1:8000/chat";

  const SESSION_KEY = "ai_chatbot_session";

  /* ---------------- SESSION SETUP ---------------- */
  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, sessionId);
  }

  /* ---------------- EXTERNAL LIBRARIES (Font Awesome) ---------------- */
  const faLink = document.createElement("link");
  faLink.rel = "stylesheet";
  faLink.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";
  document.head.appendChild(faLink);

  /* ---------------- STYLES: MODERN, RESPONSIVE & PROFESSIONAL ---------------- */
  const style = document.createElement("style");
  style.innerHTML = `
    /* CSS Variables for easy maintenance */
    :root {
      --primary-color: #0d9488; /* Teal/Emerald */
      --chat-bg: #ffffff;
      --user-bubble-color: #0d9488;
      --user-text-color: #ffffff;
      --bot-bubble-color: #e5e7eb;
      --bot-text-color: #1f2937;
      --shadow-lg: 0 10px 20px rgba(0,0,0,0.15);
      --border-radius-lg: 16px;
      --border-radius-sm: 8px;
    }
    
    /* Global Font Smoothing for crisp text */
    #ai-chatbot-box, #ai-chatbot-button, #ai-chatbot-popup {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    /* CHAT BUTTON STYLING */
    #ai-chatbot-button {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 64px;
      height: 64px;
      background: var(--primary-color);
      border-radius: 50%;
      cursor: pointer;
      box-shadow: var(--shadow-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      user-select: none;
    }

    #ai-chatbot-button:hover {
      transform: scale(1.05);
      box-shadow: 0 15px 30px rgba(0,0,0,0.2);
    }
    
    #ai-chatbot-button i {
      color: white;
      font-size: 28px;
    }

    /* WELCOME POPUP STYLING */
    #ai-chatbot-popup {
        position: fixed;
        bottom: 100px;
        right: 90px;
        background: #f0fdfa;
        color: var(--bot-text-color);
        padding: 12px 18px;
        border-radius: var(--border-radius-sm);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        font-size: 14px;
        max-width: 250px;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, right 0.3s ease;
        z-index: 9998;
        border-left: 4px solid var(--primary-color);
        cursor: pointer;
    }

    #ai-chatbot-popup.visible {
        opacity: 1;
        visibility: visible;
        right: 90px;
    }

    /* CHAT BOX CONTAINER STYLING */
    #ai-chatbot-box {
      position: fixed;
      bottom: 24px; 
      right: 24px;
      width: 380px;
      height: 400px; 
      background: var(--chat-bg);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-lg);
      display: none;
      flex-direction: column;
      z-index: 9999;
      overflow: hidden;
      transform-origin: bottom right;
      animation: fadeInScale 0.3s ease-out;
    }
    
    @keyframes fadeInScale {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }

    /* HEADER STYLING */
    #ai-chatbot-header {
      background: var(--primary-color);
      color: white;
      padding: 16px;
      font-weight: 600;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top-left-radius: var(--border-radius-lg);
      border-top-right-radius: var(--border-radius-lg);
      user-select: none;
    }

    #ai-chatbot-close i {
      font-size: 20px;
      cursor: pointer;
      padding: 2px 5px;
      transition: opacity 0.2s;
    }
    
    #ai-chatbot-close i:hover {
        opacity: 0.8;
    }

    /* MESSAGES AREA */
    #ai-chatbot-messages {
      flex: 1;
      padding: 15px;
      overflow-y: auto;
      font-size: 15px;
      line-height: 1.5;
      background-color: #f9fafb; 
      scrollbar-width: thin; 
      scrollbar-color: var(--primary-color) #f9fafb;
    }

    /* Custom Webkit scrollbar for Chrome/Safari */
    #ai-chatbot-messages::-webkit-scrollbar {
        width: 8px;
    }
    #ai-chatbot-messages::-webkit-scrollbar-thumb {
        background-color: var(--primary-color);
        border-radius: 10px;
        border: 2px solid #f9fafb;
    }
    #ai-chatbot-messages::-webkit-scrollbar-track {
        background: #f9fafb;
    }

    /* MESSAGE BUBBLE STYLING */
    .ai-message {
        display: flex;
        margin-bottom: 15px;
        max-width: 85%;
    }
    
    .ai-message-content {
        padding: 10px 14px;
        border-radius: var(--border-radius-sm);
        word-wrap: break-word;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }

    .ai-user { 
        justify-content: flex-end; 
        margin-left: auto;
    }
    
    .ai-user .ai-message-content {
        background-color: var(--user-bubble-color);
        color: var(--user-text-color);
        border-bottom-right-radius: 2px;
    }

    .ai-bot { 
        justify-content: flex-start;
    }

    .ai-bot .ai-message-content {
        background-color: var(--bot-bubble-color);
        color: var(--bot-text-color);
        border-bottom-left-radius: 2px;
    }

    /* INPUT AREA STYLING */
    #ai-chatbot-input {
      display: flex;
      border-top: 1px solid #e5e7eb;
      background-color: white;
      padding: 8px;
    }

    #ai-chatbot-text {
      flex: 1;
      border: 1px solid #d1d5db;
      border-radius: var(--border-radius-sm);
      padding: 12px;
      outline: none;
      font-size: 15px;
      transition: border-color 0.2s;
    }
    
    #ai-chatbot-text:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 1px var(--primary-color);
    }

    #ai-chatbot-send {
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: var(--border-radius-sm);
      padding: 0 15px;
      margin-left: 8px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s, transform 0.1s;
      white-space: nowrap;
    }
    
    #ai-chatbot-send i {
        font-size: 16px;
    }

    #ai-chatbot-send:hover {
        background-color: #065f46;
    }
    
    #ai-chatbot-send:active {
        transform: scale(0.98);
    }

    /* ---------------- RESPONSIVENESS (Mobile Full Screen) ---------------- */
    @media (max-width: 600px) {
        #ai-chatbot-box {
            bottom: 0; 
            right: 0;
            left: 0; 
            width: 100%;
            height: 100%;
            max-height: 100vh;
            border-radius: 0;
        }
        
        #ai-chatbot-button {
            bottom: 16px;
            right: 16px;
        }

        #ai-chatbot-popup {
             bottom: 80px;
             right: 80px;
        }
    }
  `;
  document.head.appendChild(style);

  /* ---------------- HTML STRUCTURE ---------------- */

  // 1. CHAT BUTTON
  const button = document.createElement("div");
  button.id = "ai-chatbot-button";
  button.innerHTML = `<i class="fa-solid fa-comments"></i>`;
  document.body.appendChild(button);

  // 2. WELCOME POPUP
  const popup = document.createElement("div");
  popup.id = "ai-chatbot-popup";
  popup.innerHTML = `
    Hello! I'm your AI Assistant. I can help you find information about this page and our services. Ask me anything!
  `;
  document.body.appendChild(popup);

  // 3. CHAT BOX
  const box = document.createElement("div");
  box.id = "ai-chatbot-box";
  box.innerHTML = `
    <div id="ai-chatbot-header">
      AI Assistant
      <span id="ai-chatbot-close">
          <i class="fa-solid fa-xmark"></i>
      </span>
    </div>
    <div id="ai-chatbot-messages"></div>
    <div id="ai-chatbot-input">
      <input id="ai-chatbot-text" placeholder="Ask a question..." />
      <button id="ai-chatbot-send">
        <i class="fa-solid fa-paper-plane"></i>
      </button>
    </div>
  `;
  document.body.appendChild(box);

  /* ---------------- DYNAMIC ELEMENTS & HELPERS ---------------- */
  const input = document.getElementById("ai-chatbot-text");
  const messages = document.getElementById("ai-chatbot-messages");
  const sendBtn = document.getElementById("ai-chatbot-send");

  function appendMessage(role, text) {
    messages.innerHTML += `
        <div class="ai-message ai-${role}">
            <div class="ai-message-content">
                ${text}
            </div>
        </div>
      `;
    messages.scrollTop = messages.scrollHeight;
  }

  function addInitialGreeting() {
    if (!messages.querySelector(".ai-initial-greeting")) {
      const greeting = `
        <div class="ai-message ai-bot ai-initial-greeting">
            <div class="ai-message-content">
                **Welcome!** I'm ready to help you navigate this page. What can I assist you with today?
            </div>
        </div>
      `;
      messages.innerHTML += greeting;
      messages.scrollTop = messages.scrollHeight;
    }
  }

  /* ---------------- TOGGLE AND POPUP LOGIC ---------------- */

  // Popup Visibility Control
  setTimeout(() => {
    popup.classList.add("visible");
  }, 2000);
  setTimeout(() => {
    popup.classList.remove("visible");
  }, 8000);

  // Open Chatbox from Popup Click
  popup.onclick = () => {
    popup.classList.remove("visible");
    box.style.display = "flex";
    button.style.display = "none";
    addInitialGreeting();
  };

  // Open Chatbox from Button Click
  button.onclick = () => {
    box.style.display = "flex";
    button.style.display = "none";
    popup.classList.remove("visible");
    addInitialGreeting();
  };

  // Close Chatbox
  document.getElementById("ai-chatbot-close").onclick = () => {
    box.style.display = "none";
    button.style.display = "flex";
  };

  /* ---------------- CHAT LOGIC (UNMODIFIED FUNCTIONALITY) ---------------- */
  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    appendMessage("user", text);
    input.value = "";

    const loadingMessage = document.createElement("div");
    loadingMessage.className = "ai-message ai-bot ai-loading";
    loadingMessage.innerHTML = `<div class="ai-message-content" style="font-style: italic; opacity: 0.7;">Bot is typing...</div>`;
    messages.appendChild(loadingMessage);
    messages.scrollTop = messages.scrollHeight;

    try {
      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          session_id: sessionId,
        }),
      });

      const data = await res.json();

      loadingMessage.remove();

      if (data.session_id) {
        sessionId = data.session_id;
        localStorage.setItem(SESSION_KEY, sessionId);
      }

      appendMessage("bot", data.reply);
    } catch (error) {
      loadingMessage.remove();
      appendMessage("bot", "Sorry, I ran into an error. Please try again.");
      console.error("Chat API Error:", error);
    }
  }

  // Event Listeners
  sendBtn.onclick = sendMessage;
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
})();
