<?php
class index extends Controller {
    
    function __construct() {
        parent::__construct();
    }

    function Index($arg = false) {
        phpinfo();
    }

    function __destruct() {
        $conn = null;
    }
}
