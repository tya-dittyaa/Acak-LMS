<?php
try {
    $pdo = new PDO('sqlite:AcakLMS.db');

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $statement = $pdo->query("SELECT * FROM MsTasks");

    $rows = $statement->fetchAll(PDO::FETCH_ASSOC);

    echo "<pre>";
    var_dump($rows);
    echo "</pre>";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
