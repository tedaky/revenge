<?php
// Load authController
require_once(ROOT . '/controllers/auth/authController.php');

class admin extends auth {
    private $auth;

    function __construct() {
        parent::__construct();
        $this->auth = new auth;
    }

    function Index() {
        // sample to call methods from authController
        $this->auth->index();
    }

    function __destruct() {
        $conn = null;
    }
}
