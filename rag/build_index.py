import os
import pickle
import faiss
from sentence_transformers import SentenceTransformer
from crawl_siddpatel import main as crawl_site

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
VECTOR_DIR = os.path.join(BASE_DIR, "vector_store")
os.makedirs(VECTOR_DIR, exist_ok=True)

# -------- Get website + resume data --------
documents = crawl_site()
print(f"Loaded {len(documents)} website documents")

# -------- Chunking --------
def chunk_text(text, chunk_size=300):
    words = text.split()
    return [" ".join(words[i:i+chunk_size]) for i in range(0, len(words), chunk_size)]

chunks = []
for doc in documents:
    chunks.extend(chunk_text(doc))

print(f"Created {len(chunks)} text chunks")

# -------- Embeddings --------
model = SentenceTransformer("all-MiniLM-L6-v2")
embeddings = model.encode(chunks)

# -------- FAISS --------
dimension = embeddings.shape[1]
index = faiss.IndexFlatL2(dimension)
index.add(embeddings)

faiss.write_index(index, os.path.join(VECTOR_DIR, "index.faiss"))

with open(os.path.join(VECTOR_DIR, "chunks.pkl"), "wb") as f:
    pickle.dump(chunks, f)

print("Website vector store created successfully")