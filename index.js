import OpenAI from 'openai'
import 'dotenv/config'

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY
})

const results = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages:[
        {
            role: 'system',
            content:'You are an AI assistant, answer every question to your best ability'
        },
        {
            role:'user',
            content:'Hi! teach me web assembly in one minute'
        }
    ]
})

console.log(results.choices[0].message.content)