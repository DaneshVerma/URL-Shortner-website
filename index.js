import express from "express"
import axios from "axios"
import bodyParser from "body-parser";

const app = express()
const port = 3000;
const APIurl = "https://cleanuri.com/api/v1/shorten"


// adding required middelware's 
app.use(express.static("public")) // this one for defining the location of my static files
app.use(bodyParser.urlencoded({extended: false})) // this one for getting the data from website input


app.get("/",(req, res)=>{
    // rendering home page when server start's
    res.render("index.ejs")
})


app.post('/shortning', async(req, res)=>{
    try{
        // taking client's entered URL
        var Longlink = req.body.Longlink.toString()
        // Passing the Clients link's as API request
        const response = await axios.post(APIurl, {url : Longlink}) 
        // Getting Hold the Result
        var resultURL =response.data.result_url
        // Beacuse the API convert's the shorter links wrong so this if statment is for minimizing it 
        // until the  user's link is smaller then 60 charectors user can't get output
        if(Longlink.length > 60){
            res.render("shortning.ejs", {shortlink : resultURL})
        }else{
            res.render("error.ejs", {error: "URL is not longer as needed for shorting try longer URL's"}) 
        }
    } catch (error){
        // catching error if client enter's nothing and submit
        console.log(JSON.stringify(error.message))
        res.render("error.ejs", {error: "Empty Input's are Not Accepted"}) 
    }
})

// rendering about page
app.get("/about" ,(req, res)=>{
    res.render("about.ejs")
})

// rendering shorting page if user wants to convert another link
app.get("/shortning", (req, res)=>{
    res.render("shortning.ejs")
})

app.listen(port, ()=>{
    console.log("server running on port :"+ port)
})