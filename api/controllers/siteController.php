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
        $sql = "SELECT
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
                WHERE `page`.`page_slug` = ?";

        $stmt = $this->conn->prepare($sql);
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
        }
        header('Content-Type: application/json; charset=UTF-8');
        // send json header and convert to proper json
        echo json_encode( $json, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
    }

    function __destruct() {
        $conn = null;
    }
}
