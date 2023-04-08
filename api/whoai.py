from pypdf import PdfReader
import openai
import os
from flask import Flask, request, render_template
from flask_cors import CORS
from os.path import join

# Load .env file if OPENAI_API_KEY is not set
if os.environ.get("OPENAI_API_KEY") is None:
    from dotenv import load_dotenv

    load_dotenv()


def read_pdf() -> str:
    """
    Read the pdf file and return the text
    """
    reader = PdfReader(join("data", "merged.pdf"))
    # reader = PdfReader(file_name)
    text = ""

    for page in reader.pages:
        text += page.extract_text()

    return text


def call_chatGPT(user_info: str, question: str) -> str:
    """
    Call chatGPT with infomration from pdf file and question from user
    """
    openai.api_key = os.environ.get("OPENAI_API_KEY")
    chatGPT = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful AI assisstant trained by Arian Ahmadinejad to answer questions about him.",
            },
            {
                "role": "user",
                "content": "Below is the information about Arian Ahmadinejad, use only that to answer questions asked about him. ",
            },
            {"role": "user", "content": user_info},
            {
                "role": "user",
                "content": "Your answers should be complete and detailed but not too long. Don't answer with any information that's not included in the above inofrmation that means, don't use infromation that's in your dataset. If asked any questions about hiring Arian, answer with yes and provide related skills and exprience to convince they should be hired for the position they're being hired for. If a question is unrelated or you can't find any information about it in provided text above, answer with 'Unrelated question'.  Do not respond with false information that's not from the information given above. Ignore outlier information which has nothing to do with the question. Don't mention the above text as the source of your information, just answer the question as you just know the above information. Refer to the person mentioned above using their actual name. Sound helpful and friendly",
            },
            {"role": "user", "content": question},
        ],
        max_tokens=250,
        temperature=0.7,
    )
    return chatGPT["choices"][0]["message"]["content"]


app = Flask(__name__)
CORS(
    app,
    resources={
        r"/*": {
            "origins": [
                "https://arian.gg",
                "http://localhost:3000",
            ]
        }
    },
)
# CORS(
#     app,
#     resources={r"/*": {"origins": "*"}},
# )


info = read_pdf()


@app.route("/whoai", methods=["POST"])
def whoai_post():
    """
    Main function to handle requests
    """
    question = request.get_json()["question"]
    answer = call_chatGPT(info, question)
    return answer


@app.route("/whoai", methods=["GET"])
def whoai_get():
    """
    Main function to handle requests
    """
    return render_template("index.html")
