import React from 'react'
import Card from './card.jsx'
import axios from 'axios'

const data = [
  {
    id: 1,
    img: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2022/02/lemon-rice-recipe-500x375.jpg',
    title: 'Poha with Hari Chatani',
    price: 50
  },
  {
    id: 1,
    img: 'https://thewoksoflife.com/wp-content/uploads/2022/12/Thai-fried-rice-21.jpg',
    title: 'Thai Fried Rice',
    price: 250,
  }
]

const Home = () => {

  const handleClick = async () => {
    const amount = 100;
    const { data: { key } } = await axios.get("http://localhost:3000/api/getkey")
    const { data: { order } } = await axios.post('http://localhost:3000/checkout',{amount});

    const options = {
      key,
      amount: order.amount,
      currency: 'INR',
      name: 'rahulkardile',
      description: 'prototype payment model',
      image: 'https://avatars.githubusercontent.com/u/122984037?s=400&u=1177639fbbf64cb0e3d8aa320ca3e1db9ed0bfa4&v=4',
      order_id: order.id,
      callback_url: "http://localhost:3000/paymentverification",
      prefill:{
        name: 'suraj mate',
        email: 'surajmate01@gmail.com',
        contact: '1234567890'
      },
      notes: {
        'address': 'razorpay official'
      },
      theme: {
        'color': '#000'
      }
    };
    const razor = new window.Razorpay(options);
    razor.open();

  }
  return (
    <div>
      {data?.map(item => (
        <Card item={item} checkouthandler={() => handleClick()} key={item.id} />
      ))}
    </div>
  )
}

export default Home