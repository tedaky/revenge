<?php
class error extends Controller {
    function __construct() {
        parent::__construct();
    }
    
    function Index() {
        header($_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
        echo ROOT;
    }
}
