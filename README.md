# Backend Interview Test

## Installation

Clone the project into your preferred directory in your local computer.
```bash
git clone https://github.com/celebritydeveloper/backend-test.git
```

Use the node package manager [npm](https://npmjs.com) to install this project dependencies.
```bash
npm install
```


## Live API URL

Use this url to access the [Live API URL](https://backend-test-interview.herokuapp.com/) of the project 




## API Endpoints


### Products

##### Create Product
```bash
https://backend-test-interview.herokuapp.com/products
```

#### Fetch a Single Product
```bash
https://backend-test-interview.herokuapp.com/products/:product_id
```

##### Fetch all Product 
```bash
https://backend-test-interview.herokuapp.com/products
```

##### Edit a Product
```bash
https://backend-test-interview.herokuapp.com/products/:product_id
```

##### Delete a Product
```bash
https://backend-test-interview.herokuapp.com/products/:product_id
```



### Users


##### Create a User

{
    "firstname": String,
    "lastname": String,
    "email": String,
    "phone": String
}

```bash
https://backend-test-interview.herokuapp.com/users
```

##### Add Product to Cart

{
    "user": String,
    "product_id": String,
    "quantity": Number
}

```bash
https://backend-test-interview.herokuapp.com/users/carts
```

##### Fetch all Cart Items

{
    "user": String
}

```bash
https://backend-test-interview.herokuapp.com/users/carts
```

###### Edit Single Cart Item 

{
    "user": String,
    "quantity": Number
}

```bash
https://backend-test-interview.herokuapp.com/users/carts/:item_id
```

###### Delete a Single Cart Item 

{
    "user": String
}

```bash
https://backend-test-interview.herokuapp.com/users/carts/item_id
```

##### Delete Cart

```bash
https://backend-test-interview.herokuapp.com/users/carts/cart_id
```



## License
[MIT](https://choosealicense.com/licenses/mit/)