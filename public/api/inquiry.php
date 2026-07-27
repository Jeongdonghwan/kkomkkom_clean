<?php
// 견적 문의 접수 (POST JSON)
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  echo json_encode(["ok" => false, "error" => "method_not_allowed"]);
  exit;
}

$cfg = require __DIR__ . "/config.php";

$d = json_decode(file_get_contents("php://input"), true);
if (!is_array($d)) {
  http_response_code(400);
  echo json_encode(["ok" => false, "error" => "bad_json"]);
  exit;
}

// honeypot: 봇이 채운 요청은 조용히 성공 처리
if (!empty($d["company"])) {
  echo json_encode(["ok" => true]);
  exit;
}

$name  = trim($d["name"] ?? "");
$phone = trim($d["phone"] ?? "");
if ($name === "" || $phone === "" || mb_strlen($name) > 50 || mb_strlen($phone) > 30) {
  http_response_code(400);
  echo json_encode(["ok" => false, "error" => "invalid_input"]);
  exit;
}

$hopeDate = trim($d["date"] ?? "");
if (!preg_match("/^\d{4}-\d{2}-\d{2}$/", $hopeDate)) $hopeDate = null;

try {
  $pdo = new PDO(
    "mysql:host={$cfg['db_host']};dbname={$cfg['db_name']};charset=utf8mb4",
    $cfg["db_user"],
    $cfg["db_pass"],
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
  );
  $stmt = $pdo->prepare(
    "INSERT INTO inquiries (name, phone, addr, size, services, hope_date, memo) VALUES (?,?,?,?,?,?,?)"
  );
  $stmt->execute([
    $name,
    $phone,
    mb_substr(trim($d["addr"] ?? ""), 0, 120),
    mb_substr(trim($d["size"] ?? ""), 0, 20),
    mb_substr(trim($d["services"] ?? ""), 0, 200),
    $hopeDate,
    mb_substr(trim($d["memo"] ?? ""), 0, 2000),
  ]);
  echo json_encode(["ok" => true]);
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(["ok" => false, "error" => "db_error"]);
}
