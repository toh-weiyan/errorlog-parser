
import './dotenv.js'
import express from 'express';
import { poolPromise} from './database.js';
import { chatgptQuery } from './openai.js';

const port = process.env.PORT;
const app = express();

app.use(express.json());

app.listen(port, () => {
    console.log(`App is now listening on ${port}`);
    console.log(process.env.DATABASE_HOST)
})

app.get("/query", async (req, res) => {
    try {
    //    const pool = await poolPromise
       const openAICall = await chatgptQuery();
       res.json(openAICall);

    } catch (error) {
        console.error("Database Connection failed", error);
        res.status(500).send("Database connection failed");
    }
   });

app.post("/openai", async (req, res) => {
    try {
        const data = req.body?.data;
        const prompt = req.body?.prompt;

        const result = await chatgptQuery(data, prompt);
        res.json(result);

    } catch (error) {
        res.send("Error with POST")
        console.error('error', error);
    }
})


// setInterval(() => {
//     const currentTime = new Date().toLocaleTimeString(); // Gets the current time
//     console.log(`Hello, time elapsed: ${currentTime}`);
//   }, 6000); 

