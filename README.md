# mumsched-front

Our project includes two different parts, a restful API and a front-end client that reads from it.

The technologies used in this project are: 

* The MVC Laravel 5 in PHP for the server side.
* AngularJS and Bootstrap for the front-end. 
* MySQL for the database. 
* PHPUnit for unit tests.
* Git for code version control system.
* [Trello.com](https://trello.com) as kanban for managing tasks during all the phases of the project.

    ## Requirements for the project: 
    * PHP version > 7.1 
    * MySql Server
    * Gulp v3.9.1
    * Node v11.5.0 
    * npm v6.9.0
    
    ## Installing the beck-end project:
    1) Download the file mumsched-api.zip for API code.
    2) Unzip the folder
    3) Access the folder via terminal.
    4) Run the command "composer install" from your terminal (If you don't have composer installed: https://getcomposer.org/download/)
    5) Create a database called "mumsched" and run the mumsched.sql script inside the folder.
    6) Rename the file .env.example to .env and change the envinroment variables to connect to your database: 
            DB_DATABASE=mumsched
            DB_USERNAME={your_db_username}
            DB_PASSWORD={your_db_password}
    7) Run the command "php artisan serve" from your terminal.
    8) Now you can access the API at: http://localhost:8000 
    
    ## Installing the front-end project:
    1) Download the file mumsched-front.zip for API code.
    2) Unzip the folder
    3) Access the folder via terminal.
    5) Run the command "npm install gulp"
    4) Run the command "gulp serve" from your terminal (If you don't have Gulp installed: https://libraries.io/npm/gulp/3.9.1)
    5) That is it! Now you can access the user interface at: http://localhost:3000
