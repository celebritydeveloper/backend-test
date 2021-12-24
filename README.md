# Backend Interview Test

## Installation

Clone the project into your preferred directory in your local computer.
```bash
git clone https://github.com/celebritydeveloper/backend-test.git
```

Use the package manager [npm](https://npmjs.com) to install this project.
```bash
npm install
```

## API Endpoints


### Product
[Create Product - https://backend-test-interview.herokuapp.com/products](https://backend-test-interview.herokuapp.com/products)

[Fetch a Single Product - https://backend-test-interview.herokuapp.com/products](https://backend-test-interview.herokuapp.com/products/:product_id)

[Fetch all Product - https://backend-test-interview.herokuapp.com/products](https://backend-test-interview.herokuapp.com/products)

[Edit Product - https://backend-test-interview.herokuapp.com/products](https://backend-test-interview.herokuapp.com/products/:product_id)

[Delete a Product - https://backend-test-interview.herokuapp.com/products](https://backend-test-interview.herokuapp.com/products/product_id)



### User
[Add Product to Cart - https://backend-test-interview.herokuapp.com/users/carts](https://backend-test-interview.herokuapp.com/users/carts)

#### Data
{
    "user"
}

[Fetch all Cart Items - https://backend-test-interview.herokuapp.com/users/carts](https://backend-test-interview.herokuapp.com/users/carts)

#### Data
{
    "user"
}

[Edit Single Cart Item - https://backend-test-interview.herokuapp.com/users/carts](https://backend-test-interview.herokuapp.com/users/carts/:single_id)

#### Data
{
    "user"
}

[Delete a Single Cart Item - https://backend-test-interview.herokuapp.com/users/carts](https://backend-test-interview.herokuapp.com/users/carts/item_id)

#### Data
{
    "user"
}

[Delete Cart - https://backend-test-interview.herokuapp.com/products](https://backend-test-interview.herokuapp.com/users/carts/cart_id)

#### Data
{
    "user"
}




## License
[MIT](https://choosealicense.com/licenses/mit/)