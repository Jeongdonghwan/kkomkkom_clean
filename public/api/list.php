<?php
// 견적 문의 목록 조회 (관리자 전용, GET + 아이디/비밀번호 검증)
header("Content-Type: application/json; charset=utf-8");

$cfg = require __DIR__ . "/config.php";

$id = $_SERVER["HTTP_X_ADMIN_ID"] ?? "";
$pw = $_SERVER["HTTP_X_ADMIN_PW"] ?? "";
if (
  !is_string($id) || !is_string($pw) || $id === "" || $pw === "" ||
  !hash_equals($cfg["admin_id"], $id) || !hash_equals($cfg["admin_pw"], $pw)
) {
  http_response_code(401);
  echo json_encode(["ok" => false, "error" => "unauthorized"]);
  exit;
}

try {
  $pdo = new PDO(
    "mysql:host={$cfg['db_host']};dbname={$cfg['db_name']};charset=utf8mb4",
    $cfg["db_user"],
    $cfg["db_pass"],
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
  );
  $rows = $pdo->query(
    "SELECT id, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i') AS created_at,
            name, phone, addr, size, services,
            IFNULL(DATE_FORMAT(hope_date, '%Y-%m-%d'), '') AS hope_date, IFNULL(memo,'') AS memo
     FROM inquiries ORDER BY id DESC LIMIT 500"
  )->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode(["ok" => true, "rows" => $rows]);
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(["ok" => false, "error" => "db_error"]);
}
