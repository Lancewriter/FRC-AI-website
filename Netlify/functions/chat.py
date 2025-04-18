import json

def handler(event, context):
    return {
        "statusCode": 200,
        "body": json.dumps({"reply": "✅ Beacon function is working!"})
    }

  
  
""" import json
import os
import openai

client = openai.OpenAI(api_key=os.environ["OPENAI_API_KEY"])

def handler(event, context):
    body = json.loads(event.get("body", "{}"))
    message = body.get("message")

    if not message:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "No message provided."})
        }

    chat_response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are Beacon, a professional and financial risk assistant created by Fraicly. "
                    "Introduce yourself, ask for the user's company name, market and country, and then give tailored insights."
                )
            },
            {"role": "user", "content": message}
        ]
    )

    reply = chat_response.choices[0].message.content
    return {
        "statusCode": 200,
        "body": json.dumps({"reply": reply})
    }"""
