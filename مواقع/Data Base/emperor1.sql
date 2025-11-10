-- قاعدة بيانات إمبراطور (مرة واحدة)



-- 1. جدول students (بيانات التسجيل الحقيقية من صفحة إنشاء الحساب)
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL, -- الاسم الرباعي
    birth_date DATE NOT NULL,
    birth_place VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    school VARCHAR(150),
    gender VARCHAR(10) CHECK (gender IN ('ذكر', 'أنثى')),
    contact_numbers VARCHAR(100), -- يمكن حفظها كقائمة مفصولة بفواصل
    specialization VARCHAR(150),
    guardian_number VARCHAR(20),
    email VARCHAR(100),
    UNIQUE(email)
);

-- 2. جدول users (صفحة hi لتسجيل الدخول)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL CHECK (username ~ '^[\\p{Arabic} ]+$'),
    password VARCHAR(255) NOT NULL,
    academic_number CHAR(10) UNIQUE NOT NULL,
    student_id INTEGER UNIQUE NOT NULL REFERENCES students(id) ON DELETE CASCADE
);

-- 3. جدول subscriptions (الاشتراك)
CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subscription_name VARCHAR(100) NOT NULL,
    subscription_price NUMERIC(10,2) NOT NULL,
    payment_method VARCHAR(20) NOT NULL CHECK (payment_method IN ('حوالة', 'كرت')),
    subscription_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. جدول cards (كروت الدفع)
CREATE TABLE cards (
    card_number CHAR(12) PRIMARY KEY CHECK (card_number ~ '^[0-9]{12}$'),
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- 5. جدول transfers (الحوالات)
CREATE TABLE transfers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    sender_name VARCHAR(150) NOT NULL,
    bank_account VARCHAR(100) NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    transfer_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- فهارس للأداء
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_transfers_user ON transfers(user_id);
CREATE INDEX idx_students_email ON students(email);