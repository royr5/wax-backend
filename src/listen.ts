import app from "./app";
import cors from "cors"

const {PORT = 3000} = process.env

app.use(cors());

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}...`)
}) 
