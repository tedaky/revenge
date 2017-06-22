<?php
class Controller {
    // Load your own database credentials
    private $host = 'localhost'; // probably localhost
    private $dbname = 'revenge'; // choose a database name
    private $username = 'user'; // select database user
    private $password = 'password'; // database password for user

    public $conn = '';

    function __construct() {

        // try to connect or throw an error
        try {

            $this->conn = new PDO("mysql:host=$this->host;dbname=$this->dbname;charset=UTF8;", $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        }
        catch(PDOException $e) {

            throw new Exception('failed connection' . $e->getMessage());

        }
    }
}
