var nodemailer = require('nodemailer');
const User = require("../models/User")
const dotenv = require("dotenv")
dotenv.config()

const Email = async(_id) =>{

  const user = await User.findOne({_id:_id})

  const htmlEmail = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              text-align: center;
              background-image: url("image1.jpg"); /* Replace with your image URL */
              background-size: cover;
              background-repeat: no-repeat;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: rgba(255, 255, 255, 0.8); /* Add transparency to the container */
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #333;
            }
            p {
              color: #555;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Zerotime Solutions</h1>
            <p>You have Successfully Registered. Thank You for visiting us.</p>
            <p>
                Your Details : <br>
                Name : ${user.name} <br>
                Email : ${user.email} <br>
                Phone : ${user.phone} <br>
                Role : ${user.role}
            </p>
          </div>
        </body>
      </html>
    `;

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.user,
        pass: process.env.pass
      }
    });

    var mailOptions = {
      from: process.env.user,
      to: user.email,
      subject: 'Sending Email using Node.js',
      html: htmlEmail,
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    })
  }

  

module.exports = Email;