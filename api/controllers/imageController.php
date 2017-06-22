<?php
class image extends Controller {

    function __construct() {
        parent::__construct();
    }

    function src($arg = false) {
        if($_SERVER['REQUEST_METHOD'] === 'GET') {
            // query the selected image using stored procedure
            $sql = "call get_image(?)";
            $stmt = $this->conn->prepare($sql);

            if (!$stmt->execute([$arg])) {
                throw new Exception('Failed to execute');
            }

            $results = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($results) {
                // Getting headers sent by the client.
                $headers = apache_request_headers();

                header('Date: ' . date('D, d M Y H:i:s', time()));
                if ( isset( $headers['If-Modified-Since'] ) && ( date('D, d M Y H:i:s', strtotime( $headers['If-Modified-Since'] ) ) == date( 'D, d M Y H:i:s', strtotime( $results['image_modified'] ) ) ) ) {
                    header('Last-Modified: ' . date('D, d M Y H:i:s', strtotime($results['image_modified'])), true, 304);
                } else {
                    header('Last-Modified: ' . date('D, d M Y H:i:s', strtotime($results['image_modified'])), true, 200);
                }

                // set content type to the mime type of image
                header('Content-Type: ' . $results['image_mime_type']);
                // set the expiration date to the future from today
                header('Expires: ' . date('D, d M Y H:i:s', time() + ($results['image_cache'])));
                // read the image file from the true image folder
                echo file_get_contents(ROOT . '/img/' . $results['image_unique_name']);
            } else {
                header($_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
            }
        }
    }

    function getImageList() {
        if($_SERVER['REQUEST_METHOD'] === 'GET') {
            $sql = "call get_image_list();";
            $stmt = $this->conn->prepare($sql);

            if (!$stmt->execute()) {
                throw new Exception('Failed to execute');
            }

            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if ($results == null) {
                //header($_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
                $json = json_decode('[{"success": "", "error": "No images found"}]', true);
            } else {
                $json = $results;
            }
            header('Content-Type: application/json; charset=UTF-8');
            echo json_encode($json, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        }
    }

    function getImage($arg = false) {
        if($_SERVER['REQUEST_METHOD'] === 'GET') {
            // query stored procedure
            $sql = "CALL get_image_info(?)";

            // prepare the statement
            $stmt = $this->conn->prepare($sql);

            if (!$stmt->execute([$arg])) {
                throw new Exception('Failed to execute');
            }
            $results = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($results == null) {
                header($_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
                $json = json_decode('[{"success": "", "error": "No images found"}]', true);
            } else {
                $json = $results;
            }

            header('Content-Type: application/json; charset=UTF-8');
            echo json_encode($json, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        }
    }

    function deleteImage($arg = false) {
        if($_SERVER['REQUEST_METHOD'] === 'DELETE') {
            // query stored procedure
            $sql = "CALL delete_image(?);";

            // prepare the statement
            $stmt = $this->conn->prepare($sql);
            // throw error if fail
            if (!$stmt->execute([$arg])) {
                throw new Exception('Failed to execute');
            }
            $results = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($results == null) {
                header($_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
                $json = json_decode('[{"success": "", "error": "Failed to delete"}]', true);
            } else {
                // feedback
                unlink(ROOT . '/img/' . $results[image_unique_name]);
                $json = json_decode('[{"success": "image deleted successfully", "error": ""}]', true);
            }

            header('Content-Type: application/json; charset=UTF-8');
            echo json_encode( $json, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
        }
    }

    function insertImage() {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {

            // target directory
            $targetDir = ROOT . '/img/';
            // save original file name
            $imageFileName = basename($_FILES['image_original_name']['name']);
            // new file name
            $imageMD5Name = md5(time() . $imageFileName);
            // set the target
            $targetFile = $targetDir . $imageMD5Name;
            // get file info
            if ($_FILES['image_original_name']['type'] === 'image/svg+xml') {
                // svg
                $xml = simplexml_load_file($_FILES['image_original_name']['tmp_name']);
                $attr = $xml->attributes();
                $width = $attr->width;
                $height = $attr->height;
            } else {
                // others
                $check = getimagesize($_FILES['image_original_name']['tmp_name']);
                $width = $check[0];
                $height = $check[1];
            }
            // get mime type
            $imageMimeType = $_FILES['image_original_name']['type'];
            // get width
            $imageWidth = $width;
            // get height
            $imageHeight = $height;
            // sets the cache value
            if ($_POST['image_cache']) {
                $imageCache = $_POST['image_cache'];
            } else {
                $imageCache = 7889232;
            }
            // add created and modified at the same time
            $imageCM = date('Y-m-d h:m:s');
            // image alt tag
            $imageAlt = $_POST['image_alt'];
            // checks the success of upload
            if(move_uploaded_file($_FILES['image_original_name']['tmp_name'], $targetFile)) {

                // query stored procedure
                $sql = "CALL insert_image(?, ?, ?, ?, ?, ?, ?, ?);";

                // prepare the statement
                $stmt = $this->conn->prepare($sql);

                // throw error if fail
                if (!$stmt->execute([$imageFileName, $imageMD5Name, $imageMimeType, $imageCache, $imageWidth, $imageHeight, $imageCM, $imageAlt])) {
                    $json = json_decode('[{"success": "", "error": "Failed to execute"}]', true);
                } else {
                    // feedback
                    $json = json_decode('[{"success": "image uploaded successfully", "error": ""}]', true);
                }
            } else {
                $json = json_decode('[{"success": "", "error": "An error occurred during upload"}]', true);
            }
            header('Content-Type: application/json; charset=UTF-8');
            echo json_encode( $json, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
        }
    }

    function __destruct() {
        $conn = null;
    }
}
