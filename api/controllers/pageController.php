<?php
class page extends Controller {

    function __construct() {
        parent::__construct();
    }

    function Index() { }

    function getPageList() {
        if($_SERVER['REQUEST_METHOD'] === 'GET') {
            $sql = "call get_page_list();";
            $stmt = $this->conn->prepare($sql);

            if (!$stmt->execute()) {
                throw new Exception('Failed to execute');
            }

            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if ($results == null) {
                header($_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
                $json = json_decode('[{"success": "", "error": "No pages found"}]', true);
            } else {
                $json = json_encode($results, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
            }
            header('Content-Type: application/json; charset=UTF-8');
            echo $json;
            //echo json_encode( $json, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
        }
    }

    function getPageInfo($arg = false) {
        /*
        [{
            "page": [{
                "page_id": "1",
                "page_slug": "url,
                "page_title": "home page",
                "page_body": "html"
            }],
            "meta": [
                {
                    "meta_id": "1",
                    "meta_name": "description",
                    "meta_content": "description value"
                },
                {
                    "meta_id": "2",
                    "meta_name": "keywords",
                    "meta_content": "keywords value"
                }
            ]
        }]
        */
        if($_SERVER['REQUEST_METHOD'] === 'GET') {
            if($arg) {
                $results = array();

                $sql = "CALL get_page_info_part_1(?);";
                $stmt = $this->conn->prepare($sql);

                if (!$stmt->execute([$arg])) {
                    throw new Exception('Failed to execute');
                }
                $results[] = $stmt->fetchAll(PDO::FETCH_ASSOC);
                // Close existing connection
                $stmt->closeCursor();

                $sql2 = "CALL get_page_info_part_2(?);";
                $stmt2 = $this->conn->prepare($sql2);

                if (!$stmt2->execute([$arg])) {
                    throw new Exception('Failed to execute');
                }

                $results[] = $stmt2->fetchAll(PDO::FETCH_ASSOC);

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
    }

    function insertPage() {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {

        }
    }

    function __destruct() {
        $conn = null;
    }
}
