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

            $json = json_encode($results, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

            header('Content-Type: application/json; charset=UTF-8');
            echo $json;
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
                $results["page"] = $stmt->fetchAll(PDO::FETCH_ASSOC);
                // Close existing connection
                $stmt->closeCursor();

                $sql2 = "CALL get_page_info_part_2(?);";
                $stmt2 = $this->conn->prepare($sql2);

                if (!$stmt2->execute([$arg])) {
                    throw new Exception('Failed to execute');
                }

                $temp = $stmt2->fetchAll(PDO::FETCH_ASSOC);
                if($temp != null) {
                    $results["meta"] = $temp;
                }

                if ($results == null) {
                    header($_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
                    $json = json_decode('[{"success": "", "error": "No images found"}]', true);
                } else {
                    $json = $results;
                }

                header('Content-Type: application/json; charset=UTF-8');
                header('Expires: ' . date('D, d M Y H:i:s', time() + ($results["page"][0]["page_cache"])));
                echo json_encode($json, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
            }
        }
    }

    function deletePage($arg = false) {
        if($_SERVER['REQUEST_METHOD'] === 'DELETE') {
            // query stored procedure
            $sql = "CALL delete_page(?);";

            // prepare the statement
            $stmt = $this->conn->prepare($sql);
            // throw error if fail
            if (!$stmt->execute([$arg])) {
                throw new Exception('Failed to execute');
            }

            $json = json_decode('[{"success": "image deleted successfully", "error": ""}]', true);

            header('Content-Type: application/json; charset=UTF-8');
            echo json_encode( $json, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
        }
    }

    function insertPage() {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            $pageSlug = $_POST['page_slug'];
            $pageTitle = $_POST['page_title'];
            $pageBody = $_POST['page_body'];
            $pageCache = $_POST['page_cache'];

            // query stored procedure
            $sql = "CALL insert_page(?, ?, ?, ?);";

            // prepare the statement
            $stmt = $this->conn->prepare($sql);

            if (!$stmt->execute([$pageSlug, $pageTitle, $pageBody, $pageCache])) {
                $json = json_decode('[{"success": false, "error": "Failed to execute"}]', true);
            } else {
                // feedback
                $json = json_decode('[{"success": "Page added successfully", "error": false}]', true);
            }

            header('Content-Type: application/json; charset=UTF-8');
            echo json_encode( $json, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
        }
    }

    function __destruct() {
        $conn = null;
    }
}
