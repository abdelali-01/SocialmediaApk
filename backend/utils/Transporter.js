import  nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();


const transporter = nodemailer.createTransport({
  host : "smtp.gmail.com" ,
  port : 465 ,
  secure : true ,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify if the transporter works without errors
transporter.verify((error, success) => {
  if (error) {
    console.log({ error });
  } else {
    console.log(success);
  }
});

const emailVerificationSender = async (email, OTP) => {
  return await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Verify Your Email",
    html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
            text-align: center;
        }
        .container {
            max-width: 400px;
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin: auto;
        }
        .code {
            font-size: 24px;
            font-weight: bold;
            color: #3498db;
            margin: 20px 0;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Email Verification</h2>
        <p>Hello,</p>
        <p>Your verification code is:</p>
        <p class="code">${OTP}</p>
        <p>This code is valid for 10 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
        <div class="footer">
            <p>© 2025 YourApp. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`,
  });
};


export default emailVerificationSender ;