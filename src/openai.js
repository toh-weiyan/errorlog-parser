import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY
});

async function chatgptQuery( data, prompt) {
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are data analysis that pulls out the important points and summarises dataset for useful insights." },
                {role: 'user', content: `${prompt} \n ${JSON.stringify(data)}`}],
            model: "gpt-3.5-turbo",
            });
            
            return completion.choices[0].message;
    } catch (error) {
        console.error('OPENAI ERROR', error);
    }

  }

  export {chatgptQuery};

