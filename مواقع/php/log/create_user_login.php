<?php
$conn = pg_connect("host=localhost dbname=emperor_school user=postgres password=كلمة_المرور");
if (!$conn) {
    die("فشل الاتصال بقاعدة البيانات.");
}

$username = trim($_POST['username']);
$password = $_POST['password'];
$academic_number = $_POST['academic_number'];
$student_id = $_POST['student_id'];

// التحقق من التكرار
$check = pg_query_params($conn, "SELECT * FROM users WHERE username = $1 OR academic_number = $2", array($username, $academic_number));
if (pg_num_rows($check) > 0) {
    die("الاسم أو الرقم الأكاديمي مستخدم مسبقًا.");
}

// إدخال البيانات
$query = "INSERT INTO users (username, password, academic_number, student_id) VALUES ($1,$2,$3,$4)";
$result = pg_query_params($conn, $query, array($username, $password, $academic_number, $student_id));

if ($result) {
    header("Location: ../../page/log/index.html");
    exit();
} else {
    echo "حدث خطأ أثناء إنشاء الحساب.";
}
?>