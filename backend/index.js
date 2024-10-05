const express = require("express")
const cors = require("cors")
require("dotenv").config();
const connectDB = require("./config/db")

const router = require("./routes/index");
const user = require("./routes/user") 
const bodyparser = require("body-parser");
const public = require("./routes/public");
const organization = require("./routes/organization");
const hr = require('./routes/hr');
const app = express();


app.use(cors({
    origin : "https://frontend-sih-swart.vercel.app",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials : true
}
)) ;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.use("/api",router);
app.use(bodyparser.json());
app.use("/user",user);
app.use("/public",public);
app.use("/organization",organization);
// app.use("/hr",hr);
app.options('*', cors()); // This will respond to preflight requests



connectDB().then(()=>{
    app.listen(  process.env.PORT  || 8000,()=>{
        console.log(process.env.FRONTEND_URL);
        console.log(process.env.HOST);
        console.log("connected to DB");
        console.log(`server running in http://localhost:${8000}`);
    })
});

