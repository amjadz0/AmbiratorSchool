<?php
// إعداد الاتصال بقاعدة البيانات
$conn = pg_connect("host=localhost dbname=emperor_school user=postgres password=كلمة_المرور");
if (!$conn) {
    die("فشل الاتصال بقاعدة البيانات.");
}

// استقبال البيانات من الفورم
$full_name = trim($_POST['full_name']);
$birth_date = $_POST['birth_date'];
$birth_place = trim($_POST['birth_place']);
$address = trim($_POST['address']);
$school = trim($_POST['school']);
$gender = $_POST['gender'];
$contact_numbers = trim($_POST['contact_numbers']);
$specialization = trim($_POST['specialization']);
$guardian_number = trim($_POST['guardian_number']);
$email = trim($_POST['email']);

// التحقق من البيانات الأساسية (مثال بسيط)
if (empty($full_name) || empty($birth_date) || empty($birth_place) || empty($address) || empty($gender)) {
    die("الرجاء ملء جميع الحقول الأساسية.");
}

// تحضير الاستعلام
$query = "INSERT INTO students (full_name, birth_date, birth_place, address, school, gender, contact_numbers, specialization, guardian_number, email) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id";
$result = pg_query_params($conn, $query, array($full_name, $birth_date, $birth_place, $address, $school, $gender, $contact_numbers, $specialization, $guardian_number, $email));

if ($result) {
    $row = pg_fetch_assoc($result);
    $student_id = $row['id'];

    // هنا يمكنك إعادة توجيه المستخدم لصفحة hi.html لإنشاء اسم مستخدم وربطه بالرقم الأكاديمي
    header("Location: ../../page/log/hi.html?student_id=" . $student_id);
    exit();
} else {
    echo "حدث خطأ أثناء حفظ البيانات.";
}
?>