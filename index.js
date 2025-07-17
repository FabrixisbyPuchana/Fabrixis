{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const express = require('express');\
const Stripe = require('stripe');\
const app = express();\
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);\
const cors = require('cors');\
\
app.use(express.json());\
app.use(cors());\
\
app.post('/create-checkout-session', async (req, res) => \{\
  try \{\
    const session = await stripe.checkout.sessions.create(\{\
      line_items: [\
        \{\
          price_data: \{\
            currency: 'aud',\
            product_data: \{\
              name: 'Plano General',\
            \},\
            unit_amount: 40000, // 400 AUD en centavos\
          \},\
          quantity: 1,\
        \},\
      ],\
      mode: 'payment',\
      success_url: 'https://fabrixis.com/gracias/',\
      cancel_url: 'https://fabrixis.com/error/',\
    \});\
\
    res.json(\{ url: session.url \});\
  \} catch (error) \{\
    res.status(500).json(\{ error: error.message \});\
  \}\
\});\
\
app.listen(3000, () => console.log('Servidor en puerto 3000'));\
}