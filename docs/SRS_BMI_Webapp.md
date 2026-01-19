# Software Requirements Specification (SRS) - Full Stack BMI Web Application

## 1. บทนำ (Introduction)
เอกสารนี้ระบุความต้องการของระบบสำหรับ **BMI Web Application (Full Stack Version)** ซึ่งเป็นเว็บแอปพลิเคชันที่ช่วยให้ผู้ใช้สามารถคำนวณ ติดตาม และวิเคราะห์แนวโน้มสุขภาพของตนเองผ่านดัชนีมวลกาย (BMI) โดยมีการบันทึกข้อมูลส่วนตัวและประวัติย้อนหลัง

## 2. ขอบเขตของโครงการ (Scope)
ระบบนี้เป็นเว็บแอปพลิเคชันแบบครบวงจร (Full Stack) ที่ผู้ใช้สามารถสมัครสมาชิกเพื่อบันทึกข้อมูลสุขภาพของตนเองได้ ระบบจะเก็บประวัติน้ำหนักและ BMI เพื่อแสดงผลในรูปแบบกราฟ ช่วยให้เห็นพัฒนาการสุขภาพตามช่วงเวลา

## 3. เทคโนโลยีที่ใช้ (Tech Stack)
เราจะใช้เทคโนโลยีที่ทันสมัยและเป็นมาตรฐานอุตสาหกรรม (Modern Stack):
*   **Frontend & Backend Framework:** [Next.js](https://nextjs.org/) (React Framework) - เพื่อประสิทธิภาพสูงและรวมทั้งหน้าบ้านและหลังบ้านในที่เดียว
*   **Database:** [PostgreSQL](https://www.postgresql.org/) - ฐานข้อมูล Relational Database ที่มีความเสถียรและนิยมใช้ในระดับ Enterprise
*   **ORM:** [Prisma](https://www.prisma.io/) - เครื่องมือ ORM ที่ทันสมัย ช่วยให้จัดการ Database ได้ง่ายและปลอดภัย (Type-safe)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) - เพื่อการตกแต่งที่สวยงามและรวดเร็ว
*   **Authentication:** NextAuth.js - ระบบยืนยันตัวตนที่ปลอดภัย
*   **Data Visualization:** [Recharts](https://recharts.org/) - สำหรับสร้างกราฟแสดงแนวโน้มน้ำหนัก

## 4. ความต้องการของระบบ (System Requirements)

### 4.1 ฟีเจอร์หลัก (Key Features)
1.  **ระบบสมาชิก (Authentication):**
    *   สมัครสมาชิก (Register) และ เข้าสู่ระบบ (Login)
    *   จัดการ Session ผู้ใช้ให้ปลอดภัย
2.  **การคำนวณและบันทึก (Calculation & Logging):**
    *   คำนวณ BMI จากน้ำหนักและส่วนสูง
    *   บันทึกผลการคำนวณลงฐานข้อมูล (PostgreSQL) ผ่าน Prisma
3.  **แดชบอร์ดสุขภาพ (Health Dashboard):**
    *   แสดงค่า BMI ล่าสุด และสถานะ (ผอม, ปกติ, อ้วน)
    *   แสดง **กราฟแนวโน้ม (Trend Graph)** ของน้ำหนักและ BMI ย้อนหลัง
    *   ดูประวัติรายการคำนวณทั้งหมด (History Log)
4.  **การจัดการข้อมูล (Data Management):**
    *   ผู้ใช้สามารถลบรายการประวัติที่ไม่ต้องการได้
5.  **ระบบสารสนเทศเพื่อการจัดการ (MIS Dashboard):**
    *   **สำหรับผู้ดูแลระบบ (Admin):** ดูภาพรวมของระบบได้
    *   **Statistical Reports:** แสดงสถิติเชิงลึก เช่น จำนวนผู้ใช้งานทั้งหมด, ค่าเฉลี่ย BMI ของผู้ใช้ทั้งหมด
    *   **Data Visualization:** แผนภูมิวงกลม (Pie Chart) แสดงสัดส่วนกลุ่ม BMI (เช่น กี่ % ผอม, กี่ % ปกติ, กี่ % อ้วน) เพื่อวิเคราะห์แนวโน้มสุขภาพของกลุ่มผู้ใช้
6.  **ความปลอดภัย (Security):**
    *   **Password Encryption:** เข้ารหัสรหัสผ่านด้วย bcrypt ก่อนบันทึกลงฐานข้อมูล
    *   **Authentication & Authorization:** ใช้ NextAuth.js จัดการ Session และตรวจสอบสิทธิ์การเข้าถึง (RBAC - Role Based Access Control) แยกสิทธิ์ระหว่าง User และ Admin
    *   **Input Validation:** ตรวจสอบความถูกต้องของข้อมูลที่รับเข้ามา (เช่น น้ำหนัก/ส่วนสูง ต้องเป็นตัวเลขบวก) เพื่อป้องกันการโจมตีแบบ Injection และข้อมูลผิดพลาด
    *   **API Protection:** ป้องกัน API Route ให้เรียกใช้ได้เฉพาะผู้ใช้ที่ Login แล้วเท่านั้น

### 4.2 แผนการพัฒนา (Development Roadmap)
สิ่งที่พวกเราจะทำในโปรเจกต์นี้ตามลำดับ:

1.  **Setup Project:**
    *   สร้าง Next.js Project
    *   ติดตั้ง Tailwind CSS
    *   ติดตั้งและตั้งค่า Prisma เชื่อมต่อกับ PostgreSQL
2.  **Database Modeling:**
    *   ออกแบบ Schema ใน Prisma (User, BMI Record, **Role**)
    *   Run Migration เพื่อสร้างตารางใน Database
3.  **Backend API Development:**
    *   สร้าง API สำหรับ Register/Login
    *   สร้าง API สำหรับ CRUD ข้อมูล BMI
    *   **สร้าง API สำหรับดึงข้อมูลสถิติ (MIS Stats)**
4.  **Frontend Implementation:**
    *   หน้า Login/Register
    *   หน้า User Dashboard (ส่วนตัว)
    *   **หน้า MIS Dashboard (สำหรับ Admin/Overview)**
4.  **Integration & Testing:**
    *   เชื่อมต่อหน้าบ้านกับหลังบ้าน
    *   ทดสอบการใช้งานจริง

---

**สถานะ:** รอการอนุมัติจากคุณเพื่อเริ่มดำเนินการตามแผนข้อที่ 1 (Setup Project)
