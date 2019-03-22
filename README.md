# mumsched-front

Our project includes two different parts, a restful API and a front-end client that reads from it. 
This is the front-end and the back-end project can be found at https://github.com/manelmiq/mumsched-api.git

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
    3) Run the command "composer install" from your terminal (If you don't have composer installed: https://getcomposer.org/download/)
    4) Create a database called "mumsched" and run the mumsched.sql script inside the folder.
    5) Rename the file .env.example to .env and change the envinroment variables to connect to your database: 
            DB_DATABASE=mumsched
            DB_USERNAME={your_db_username}
            DB_PASSWORD={your_db_password}
    6) Run the command "php artisan serve" from your terminal.
    7) You now can access the API at: http://127.0.0.1:8000 
    
    ## Installing the front-end project:
    1) Download the file mumsched-front.zip for API code.
    2) Unzip the folder
    3) Access the folder via terminal.
    3) Run the command "composer install" from your terminal (If you don't have composer installed: https://getcomposer.org/download/)
