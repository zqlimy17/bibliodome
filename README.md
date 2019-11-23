# GAProject2: [BIBLIODOME](https://bibliodome.herokuapp.com/)

![Screenshot of the Bibliodome Library](https://raw.githubusercontent.com/zqlimy17/bibliodome/master/bibliodome-homepage.png)

## About the App

[Bibliodome] is a RESTful API online library application that allow users to search for books and rate them. Their ratings will be available to the public and can be edited or deleted.

## MVC
[Bibliodome] makes use of 4 controllers and 3 models; Reviews, Books, Users, and Sessions.

### Reviews
Most of the app is dependent on Reviews as it is the connection between the Books and Users. The Reviews mongoose schema model takes in the Books and Users as ObjectId, hence allowing easy references to these 2 models when necessay. Reviews can be created, edited, and deleted. 

### Books
Whenever a book is rated for the first time, a copy of the book is stored in the MongoDB. The Book model does not directly reference to any Users or Reviews. The main purpose of these book objects is to populate data on the front-end. Books can only be created. 

### Users
Users are for storing users data, such as name, username, password, and how many reviews the user has given. The Users model also does not directly reference to the Reviews or Books. A user is created during sign-up, and each user can edit or delete their reviews. Users can edit their profile. 

### Sessions (Controller only)
Solely for authentication purposes and to keep track of each user's session.


## Technologies and Resources
- MongoDB, HTML, CSS (Materialize), JavaScript (jQuery).
- Google Books API. 
- Node Modules: bcrypt, dotenv, ejs, express, express-static, method-override, mongoose, and request. 
- Published on Heroku.

## Approach 
1. After signing up, a user can search for a book (called through Google Books API) and browse/rate/review them. 
2. Currently, the search only takes in the book title and author as variables. 
3. After reviewing a book, the review will be made availble to the public on each individial book's page. 
4. Each review can be edited or deleted either on the user's profile page or on the reivewed book page directly. 
5. On the books page, users will be able to see other people's reviews. Users are able to browse these other people's profile and view all the other books that they have rated. 

## More To Do
This list is definitely inexhaustive, but here are some of the features that I'd like to include/improve:

- More Google Book API parameters.
- Possibly change to another book API library. 
- Showcasing top users. 
- Book categories. 
- Random book search. 
- New releases / Best sellers columns. 
- Better UI (currently, each book is displayed as a card). 
- Displaying book information (such as ISBN, published date, etc). 
- Badges/Goals/Rewards.
- Reviewed date. 
- Recommended books.
- Related books (on search results page and individual books page, which requries calling the API). 
- Sorting and filters.