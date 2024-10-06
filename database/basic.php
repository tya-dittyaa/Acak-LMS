<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
try {
    $pdo = new PDO('sqlite:AcakLMS.db');

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $statement = $pdo->query("SELECT b.Priority, a.Task, a.CreatedAt, c.MemberName, a.UpdatedAt, a.Deadline, d.Action
    FROM MsTasks a
    JOIN MsPriority b ON a.PriorityId = b.PriorityId
    JOIN MsMember c ON a.MemberId = c.MemberId
    JOIN MsActions d ON a.ActionId = d.ActionId
    ");

    $rows = $statement->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($rows);
} catch (PDOException $e) {
   echo json_encode(["error" => "Connection failed: " . $e->getMessage()]);
}
?>
