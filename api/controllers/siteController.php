<?php
class site extends Controller {

    function __construct() {
        parent::__construct();
    }

    function Index() { }

    function Page($slug = '') {
        /** json data format
          * [
          *    {
          *      "title": "page_title",
          *      "body": "page_body",
          *      "meta": [
          *          {
          *              "name": "meta_name",
          *              "content": "meta_content"
          *          }
          *      ]
          *    }
          * ]
          */
        /*$sql = "SELECT
                    CONCAT(
                        '[{',
                        '^^^title^^^', ':', '^^^', `page`.`page_title`, '^^^', ',',
                        '^^^body^^^', ':', '^^^', `page`.`page_body`, '^^^', ',',

                        '^^^meta^^^', ':',
                            CONCAT(
                                '[',
                                GROUP_CONCAT(
                                    CONCAT(
                                        '{',
                                            '^^^name^^^', ':', '^^^', `meta`.`meta_name`, '^^^', ',',
                                            '^^^content^^^', ':', '^^^', `meta`.`meta_content`, '^^^',
                                        '}'
                                    )
                                ),
                                ']'
                            ),
                        '}]'
                    ) AS 'page'
                FROM `page`
                LEFT OUTER JOIN `page_meta`
                ON `page`.`page_id` = `page_meta`.`page_meta_pid`
                LEFT OUTER JOIN `meta`
                ON `meta`.`meta_id` = `page_meta`.`page_meta_mid`
                WHERE `page`.`page_slug` = ?";*/


        $results = array();

        $sql = "CALL get_page_part_1(?);";
        $stmt = $this->conn->prepare($sql);

        if (!$stmt->execute([$slug])) {
            throw new Exception('Failed to execute');
        }
        $results["page"] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        // Close existing connection
        $stmt->closeCursor();

        $sql2 = "CALL get_page_part_2(?);";
        $stmt2 = $this->conn->prepare($sql2);

        if (!$stmt2->execute([$slug])) {
            throw new Exception('Failed to execute');
        }

        $temp = $stmt2->fetchAll(PDO::FETCH_ASSOC);
        if($temp != null) {
            $results["meta"] = $temp;
        }



        /*$stmt = $this->conn->prepare($sql);
        if (!$stmt->execute([$slug])) {
           throw new Exception('Failed to execute');
        }
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        // converts content quotes (") to (\")
        $results[0]['page'] = str_replace('"', '\\"', $results[0]['page']);
        // converts content line breaks to (\n)
        $results[0]['page'] = preg_replace('/\n/m', '\\n', $results[0]['page']);
        // converts beginning and ending of json to (")
        $results[0]['page'] = str_replace('^^^', '"', $results[0]['page']);

        if ( $results[0]['page'] == null) {
            header($_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
            $json = json_decode('[{"body": "page not found"}]', true);
        } else {
            // decode json query string
            $json = json_decode($results[0]['page'], true);
        }*/



        if ($results == null) {
            header($_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
            $json = json_decode('[{"body": "Page Not Found"}]', true);
        } else {
            $json = $results;
        }

        header('Content-Type: application/json; charset=UTF-8');
        header('Expires: ' . date('D, d M Y H:i:s', time() + ($results["page"][0]["page_cache"])));
        // send json header and convert to proper json
        echo json_encode( $json, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
    }

    function __destruct() {
        $conn = null;
    }
}
