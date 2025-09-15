# 🎬 RAG-Based Movie Recommendation App  

An interactive **movie recommendation web application** powered by **Retrieval-Augmented Generation (RAG)**.  
Built with **Node.js + Express** for the backend, **Together.ai** for embeddings & LLM responses, and a clean, responsive frontend.  

---

##  Features  
 **Personalized Recommendations** – Get movie suggestions based on user input.  
**RAG Pipeline** – Retrieves relevant movie data, then generates context-aware recommendations.  
**Node.js + Express API** – Handles embeddings, similarity search, and response generation.  
**Together.ai Integration** – Uses LLMs and embeddings for natural language recommendations.  
**Responsive UI** – Simple, user-friendly interface for smooth experience.  

---

##  Tech Stack  
- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js, Express  
- **AI & RAG:** Together.ai API (Embeddings + Chat Model)  
- **Libraries:** Dotenv,Express,@supabase/supabase-js,cors  
- **Development:** Nodemon for auto-restart  

---

## 📂 Project Structure
RAG/
├─ utils/
│ ├─ chat.js
│ ├─ embed.js
│ └─ supabaseclient.js
├─ .env
├─ content.js
├─ frontend.html
├─ main.js
├─ rag.js
├─ server.js
├─ style.css
├─ package.json
└─ package-lock.json
---

## 🔄 Project Flow


**flowchart LR**
    **A**[User Query] --> B[Generate Embeddings (Together.ai)]
    **B** --> C[Vector Search (Find Similar Movies)]
    **C** --> D[Retrieve Relevant Movie Data]
    **D** --> E[LLM (Together.ai)]
    **E** --> F[Generate Natural Language Recommendation]
    **F** --> G[Send Response to Frontend]
    **G** --> H[Display Movie Suggestions]
---
