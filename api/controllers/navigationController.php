<?php
class navigation extends Controller {
    function __construct() {
        parent::__construct();
    }

    function Index() { }

    function GetSiteLinks() {
        /** json data format
          * [
          *    {
          *      "name": "page_title",
          *      "path": "page_slug"
          *    }
          * ]
          */
        $sql = "SELECT
                    CONCAT(
                        '[',
                        GROUP_CONCAT(
                            CONCAT(
                                '{',
                                    '^^^name^^^', ':', '^^^', `page`.`page_title`, '^^^', ',',
                                    '^^^path^^^', ':', '^^^', `page`.`page_slug`, '^^^',
                                '}'
                            )
                        ),
                        ']'
                    ) AS 'page'
                FROM `page`";
        
        $stmt = $this->conn->prepare($sql);
        if (!$stmt->execute([$slug])) {
           throw new Exception('Failed to execute');
        }

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $results[0]['page'] = str_replace('^^^', '"', $results[0]['page']);
        
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode(json_decode($results[0]['page'], false), JSON_PRETTY_PRINT);
    }
}
