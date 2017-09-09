DROP DATABASE IF EXISTS bamazondb;

CREATE DATABASE bamazondb;

USE bamazondb;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
	prod_name VARCHAR(80) NULL,
    depart_nam VARCHAR(80) NULL,
	price DECIMAL(10,2) NULL,
	stk_qty INT NULL,
	PRIMARY KEY (item_id)
);

USE bamazondb;

INSERT INTO products (prod_name, depart_nam, price, stk_qty)
VALUES ("High Tops", "Shoes", 20.51, 50);

INSERT INTO products (prod_name, depart_nam, price, stk_qty)
VALUES("Hot Rod", "Automotive", 120000.95, 5);

INSERT INTO products (prod_name, depart_nam, price, stk_qty)
VALUES ("Puzzle", "Games", 19.99, 2000);

INSERT INTO products (prod_name, depart_nam, price, stk_qty)
VALUES ("Video Games", "Electronics", 60.75, 10000);

INSERT INTO products (prod_name, depart_nam, price, stk_qty)
VALUES ("Tires", "Automotive", 211.32, 500);

INSERT INTO products (prod_name, depart_nam, price, stk_qty)
VALUES ("Coloring Book", "Books", 5.50, 99);

INSERT INTO products (prod_name, depart_nam, price, stk_qty)
VALUES ("Movie", "Electronics", 29.50, 175);

INSERT INTO products (prod_name, depart_nam, price, stk_qty)
VALUES ("Blouse", "Clothing", 20.25, 50);

INSERT INTO products (prod_name, depart_nam, price, stk_qty)
VALUES ("Loafers", "Shoes", 22.55, 50);

INSERT INTO products (prod_name, depart_nam, price, stk_qty)
VALUES ("Pants", "Clothing", 35.50, 75);

INSERT INTO products (prod_name, depart_nam, price, stk_qty)
VALUES ("Board Game", "Games", 19.95, 150);

