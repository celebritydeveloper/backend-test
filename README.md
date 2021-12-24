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

## API Endpoints


### Products
[Create Product - https://backend-test-interview.herokuapp.com/products](https://backend-test-interview.herokuapp.com/products)

[Fetch a Single Product - https://backend-test-interview.herokuapp.com/products](https://backend-test-interview.herokuapp.com/products/:product_id)

[Fetch all Product - https://backend-test-interview.herokuapp.com/products](https://backend-test-interview.herokuapp.com/products)

[Edit Product - https://backend-test-interview.herokuapp.com/products](https://backend-test-interview.herokuapp.com/products/:product_id)

[Delete a Product - https://backend-test-interview.herokuapp.com/products](https://backend-test-interview.herokuapp.com/products/product_id)



### Users
[Add Product to Cart - https://backend-test-interview.herokuapp.com/users/carts](https://backend-test-interview.herokuapp.com/users/carts)

##### data
{
    "user": String,
    "product_id": String,
    "quantity": Number
}

[Fetch all Cart Items - https://backend-test-interview.herokuapp.com/users/carts](https://backend-test-interview.herokuapp.com/users/carts)

##### data
{
    "user": String
}

[Edit Single Cart Item - https://backend-test-interview.herokuapp.com/users/carts](https://backend-test-interview.herokuapp.com/users/carts/:single_id)

##### data
{
    "user": String,
    "quantity": Number
}

[Delete a Single Cart Item - https://backend-test-interview.herokuapp.com/users/carts](https://backend-test-interview.herokuapp.com/users/carts/item_id)

##### data
{
    "user": String
}

[Delete Cart - https://backend-test-interview.herokuapp.com/products](https://backend-test-interview.herokuapp.com/users/carts/cart_id)





## License
[MIT](https://choosealicense.com/licenses/mit/)