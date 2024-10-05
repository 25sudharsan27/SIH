## Initialize environment variables in this format

``` bash
// Database credentials
MONGODB_URI = your_mongodb_url

// tokens
TOKEN_SECRET_KEY = user_token_secret_key
ORG_TOKEN_SECRET_KEY = organization_token_secret_key

// URL
FRONTEND_URL = your_frontend_origin_url_for_cors

// Mail Services
HOST=smtp.gmail.com
SERVICE=gmail
EMAIL_USER=sample_gmail_id
EMAIL_PASSWORD=gmail_id_password

// Port number
PORT = your_backend_port_number (example : 5000)
```


## Start backend server

If you have nodemon then 

``` bash
    nodemon index
```

Otherwise 

``` bash
    node index.js
```