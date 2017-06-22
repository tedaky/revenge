<?php
class auth extends Controller {
    // initiate variables

    private $stmt;

    function __construct() {
        parent::__construct();

        //$user = $_POST['user'];

        //$sql = "SELECT *
        //        FROM `user`
        //        WHERE `user`.`user_email` = ?";
        
        //$this->stmt = $this->conn->prepare($sql);

        //if (!$this->stmt->execute($user)) {
        //   throw new Exception('Failed to execute');
        //}

        //$results = $this->stmt->fetchAll(PDO::FETCH_ASSOC);
        
    }
    
    function Index() {
        echo 'hi from auth';
    }
}
