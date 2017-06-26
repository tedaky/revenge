<?php
class Bootstrap {
    function __construct() {
        // get the url reference
        $url = $_SERVER['REQUEST_URI'];

        // strip away '/api/' from the beginning of url and strip away '/' at the end of url
        $url = ltrim( ltrim( ltrim( rtrim( $url, '/' ), '/' ), 'api' ), '/' );

        // if the result is empty set the initial value to index
        if ( $url === '' ) {
            $url = 'index';
        }
        // set the controller functions
        $url = explode( '/', $url );
        // set the controller file to use
        $controllerFile = ROOT . '/controllers/' . $url[0] . 'Controller.php';
        // check if the controller file exists
        if ( !file_exists( $controllerFile ) ) {
            $url = 'error';
            $url = explode( '/', $url );
        }

        // get the controller
        $controllerCall = array_shift( $url );
        if ( @$url[0] ) {
            // get the method
            $method = array_shift( $url );
            if ( @$url[0] ) {
                // get the param
                $param = implode( '/', $url );
            }
        }

        // use the controller file
        require_once( ROOT . '/controllers/' . $controllerCall . 'Controller.php' );
        // call the controller
        $controller = new $controllerCall;
        // check if there are values for the controller method
        if ( isset( $param ) ) {
            $method = ucfirst( $method );
            if( method_exists( $controller, $method ) ) {
                $controller->{ $method }( $param );
            }
        } else {
            // check the controller method
            if ( isset( $method ) ) {
                $method = ucfirst( $method );
                if( method_exists( $controller, $method ) ) {
                    $controller->{ $method }( );
                }
            } else {
                $controller->{ 'Index' }( );
            }
        }
    }
}
