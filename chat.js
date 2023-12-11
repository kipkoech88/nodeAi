import readline from 'node:readline'
import {openai} from './openai.js'
import 'dotenv/config.js'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const newMessage = async (history, message)=>{
    const result =await openai.chat.completions.create({
        model:'gpt-3.5-turbo',
        messages:[...history, message]
    })

    return result.choices[0].message
}

const formatMessage = (userInput)=>({
    role: 'user',
    content: userInput
})

const chat = ()=>{
    const history = [{
        role: 'system',
        content: 'You are an AI assistant. Answer questions accordingly'
    },]

    const start = ()=>{
        rl.question('You: ', async (userInput)=>{
            if ((userInput.toLowerCase) === 'exit'){
                rl.close()
                return
            }

            const userMessage = formatMessage(userInput)
            const response = await newMessage(history, userMessage)

            history.push(userMessage, response)
            console.log(`\n\n AI:, ${response.content}`)
            start()
        })
        
    }
    start()
}

console.log("Chatbot initialized, use exit() to end the chat")

chat()