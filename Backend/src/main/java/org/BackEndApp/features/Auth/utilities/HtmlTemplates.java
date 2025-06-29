package org.BackEndApp.features.Auth.utilities;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class HtmlTemplates {


    public static String getSignupHtmlTemplate(int otp) {
        return String.format("""
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Email Verification Code</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
              background-color: #f4f4f4;
            }
            .container {
              max-width: 600px;
              margin: 40px auto;
              background: #ffffff;
              padding: 30px;
              border-radius: 10px;
              box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
              text-align: center;
            }
            img {
              max-width: 100%%;
              border-radius: 8px;
              margin-bottom: 20px;
            }
            h1 {
              color: #333333;
              font-size: 24px;
            }
            p {
              font-size: 16px;
              color: #555555;
              margin: 10px 0 20px;
            }
            .otp {
              display: inline-block;
              font-size: 32px;
              font-weight: bold;
              letter-spacing: 10px;
              padding: 12px 20px;
              background-color: #f0f0f0;
              border-radius: 8px;
              margin-bottom: 20px;
              color: #222;
            }
            .footer {
              margin-top: 30px;
              font-size: 12px;
              color: #999;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Email Verification Code</h1>
            <p>Please use the following code to verify your email address:</p>
            <div class="otp">%06d</div>
            <p>This code will expire in 10 minutes. Please do not share it with anyone.</p>
            <div class="footer">
              If you didn’t request this, you can safely ignore this email.
            </div>
          </div>
        </body>
        </html>
        """,otp);
    }
}
