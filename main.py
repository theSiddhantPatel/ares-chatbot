from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
template="""
Answer the following question as best you can.

Here is the conversation history:{context}

Question: {question}

Answer:

"""

model = OllamaLLM(model="phi3")
prompt=ChatPromptTemplate.from_template(template)
chain=prompt | model

def handle_conversation():
    context = ""
    context = context[-2000:] # keep last 2000 characters of context (to avoid infinite context growth) for short convesrations
    print("Welcome to the AI chatBot! Type 'exit' to quit.")
    while True:
        user_input = input("You: ")
        if (user_input.lower() == 'exit'or user_input.lower()=='quit'):
            break

        result=chain.invoke({"context":"", "question":"Hey, How are you?"})
        print("bot:", result)
        context += f"\nUser: {user_input}\nAI: {result}"

if __name__ == "__main__":
 handle_conversation()