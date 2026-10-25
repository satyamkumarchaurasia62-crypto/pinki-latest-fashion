<?php
// save-order.php - Customer Order Data Saver
header("Content-Type: application/json");

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if ($data) {
    $time = date("d-M-Y H:i:s");
    $name = htmlspecialchars($data['name'] ?? 'N/A');
    $phone = htmlspecialchars($data['phone'] ?? 'N/A');
    $address = htmlspecialchars($data['address'] ?? 'N/A');
    $product = htmlspecialchars($data['product'] ?? 'N/A');
    $size = htmlspecialchars($data['size'] ?? 'N/A');
    $amount = htmlspecialchars($data['amount'] ?? 'N/A');

    // आर्डर की जानकारी टेक्स्ट फाइल में जोड़ना
    $log = "[$time] | Name: $name | Phone: $phone | Item: $product ($size) | Amount: Rs.$amount | Address: $address\n";

    file_put_contents("orders.txt", $log, FILE_APPEND | LOCK_EX);

    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error"]);
}
?>
