<?php
class auth extends Controller {
    // initiate variables
    private $uname;
    private $unameFinal;
    private $upass;
    private $upassFinal;

    function __construct() {
        parent::__construct();

        // initiate test variables values
        // delete later
        $this->uname = 'Eric';
        $this->upass = 'hi';

        // immitate database uname
        $ctx = hash_init('sha256');
        hash_update($ctx, $this->uname);
        $unameIDMiddle = hash_final($ctx);
        $mctx = hash_init('sha256');
        hash_update($mctx, $unameIDMiddle);
        $this->unameFinal = hash_final($mctx);

        // immitate database upass
        $ctx = hash_init('sha256');
        hash_update($ctx, $this->upass);
        $upassIDMiddle = hash_final($ctx);
        $mctx = hash_init('sha256');
        hash_update($mctx, $upassIDMiddle);
        $this->upassFinal = hash_final($mctx);
    }
    
    function Index() {
        // start session
        session_start();
        
        if ($_GET['uname']) {
            $userName = $_GET['uname'];

            // Hashes uname and saves to uname session
            $ctx = hash_init('sha256');
            hash_update($ctx, $userName);
            $userNameMiddle = hash_final($ctx);
            $_SESSION['uname'] = $userNameMiddle;
        }
        if ($_GET['upass']) {
            $userPassword = $_GET['upass'];

            // Hashes upass and saves to upass session
            $ctx = hash_init('sha256');
            hash_update($ctx, $userPassword);
            $userPasswordMiddle = hash_final($ctx);
            $_SESSION['upass'] = $userPasswordMiddle;
        }
        
        if(!$_GET['uname'] && !$_GET['upass']) {
            $this->Logout();
            echo 'no uname and no upass';
        }
    }
    
    function Logout() {
        // start session
        session_start();

        // reset session variable to be empty
        $_SESSION = array();
        
        // delete the session cookie
        if (ini_get('session.use_cookies')) {
            $params = session_get_cookie_params();
            setcookie(
                session_name(),
                '',
                time() - 42000,
                $params['path'],
                $params['domain'],
                $params['secure'],
                $params['httponly']
            );
        }

        // destroys the session
        session_destroy();
    }

    function Redir() {
        // test
        echo 'redirected';
    }

    function CheckAuth() {
        // start session
        session_start();

        // check the uname session
        if ($_SESSION['uname']) {
            // test value
            echo $_SESSION['uname'];
        }
        // check the upass session
        if ($_SESSION['upass']) {
            // test value
            echo $_SESSION['upass'];
        }

        // no sessions remove the cookie using logout
        if(!$_SESSION['uname'] && !$_SESSION['upass']) {
            $this->Logout();
            echo 'no uname and no upass session';
        }
    }

    function Authorized() {
        // start session
        session_start();
        
        // no sessions remove the cookie using logout
        if(!$_SESSION['uname'] && !$_SESSION['upass']) {
            $this->Logout();
            header('Location: redir');
        }

        if($_SESSION['uname']) {
            $userName = $_SESSION['uname'];
            
            // gets the hashed uname and hashes it again
            $ctx = hash_init('sha256');
            hash_update($ctx, $userName);
            $userNameFinal = hash_final($ctx);
        }
        if($_SESSION['upass']) {
            $userPassword = $_SESSION['upass'];

            // gets the hashed upass and hashes it again
            $ctx = hash_init('sha256');
            hash_update($ctx, $userPassword);
            $userPasswordFinal = hash_final($ctx);
        }

        // checks the final hashes against the "database"
        if($userNameFinal === $this->unameFinal && $userPasswordFinal === $this->upassFinal) {
            // echo test message if authorized
            echo 'You Are Authorized';
        } else {
            // logout and redirect if not authorized
            $this->Logout();
            header('Location: redir');
        }
    }
}
