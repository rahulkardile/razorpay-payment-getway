import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import razorpay from 'razorpay'
import crypto from 'crypto'

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

dotenv.config();
const MONGO_URL = process.env.MONGO_DB_URL

mongoose.connect(MONGO_URL)
.then(()=> console.log("Database is connected"))
.catch((e)=>console.log("database is not connected " + e));

const instance = new razorpay({
    key_id: process.env.Key_Id,
    key_secret: process.env.Key_Secret,
})

const paymentSchema = new mongoose.Schema({
    razorpay_order_id: {
        type: String,
        required: true
    },
    razorpay_payment_id: {
        type: String,
        required: true
    },
    razorpay_signature: {
        type: String,
        required: true
    },
})

const Payment = mongoose.model("Payment", paymentSchema);

app.post("/checkout", async(req,res)=>{
    const options ={
        amount:Number(req.body.amount*100),
        currency:"INR",
    };
    const order = await instance.orders.create(options);
    console.log(order);
    res.status(200).json({
        success:true,order
    })
})

app.post("/paymentverification", async(req,res)=>{
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedsignature = crypto.createHmac('sha256', process.env.Key_Secret).update(body.toString()).digest('hex')
    const isauth = expectedsignature ===razorpay_signature;

    if(isauth){
        await Payment.create({
            razorpay_order_id,razorpay_payment_id,razorpay_signature
        })
        res.redirect(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`)
    }
    else{
        res.status(400).json({success:false})
    }
})

app.get('/api/getkey', (req, res)=> {
    return res.status(200).json({key: process.env.Key_Id})
})

app.listen(3000, ()=>{
    console.log('server is running on 3000');
})