# ACCPT ERP Blueprint

## 1. Vision

ACCPT ERP คือระบบ ERP สำหรับสำนักงานบัญชีและลูกค้า SME รองรับหลายบริษัท แยกข้อมูลตามบริษัท และต่อยอดเป็น SaaS ได้

## 2. Core Modules

- Dashboard
- Company Management
- User & Role
- Permission
- Petty Cash
- Document Center
- Reports
- Settings
- AI Assistant

## 3. Architecture

Frontend: Next.js + TypeScript + Tailwind  
Backend/Database: Supabase  
Auth: Supabase Auth  
Storage: Supabase Storage / Google Drive  
Version Control: GitHub

## 4. Multi-Tenant Rule

ทุกข้อมูลสำคัญต้องมี company_id

ตัวอย่าง:

- petty_cash_transactions.company_id
- documents.company_id
- users.company_id
- audit_logs.company_id

## 5. User Roles

- owner
- admin
- manager
- accountant
- staff
- viewer

## 6. Core Tables

### companies
เก็บข้อมูลบริษัท

### company_members
เชื่อม user กับ company

### profiles
ข้อมูลผู้ใช้

### roles
บทบาทผู้ใช้

### permissions
สิทธิ์การใช้งาน

### audit_logs
ประวัติการทำรายการ

### attachments
ไฟล์แนบ

### petty_cash_transactions
รายการเงินสดย่อย

### petty_cash_funds
กองเงินสดย่อย

### petty_cash_settings
ตั้งค่าเงินสดย่อย

## 7. Workflow: Petty Cash

1. Staff สร้างรายการเบิก
2. Manager อนุมัติ
3. Accounting ตรวจเอกสาร
4. Finance จ่ายเงิน
5. ปิดรายการ
6. บันทึก Audit Log

## 8. Navigation

- Dashboard
- Company
- Users
- Permission
- Petty Cash
- Documents
- Reports
- Settings
- AI Assistant

## 9. Sprint Roadmap

### Sprint 1
Setup infrastructure

### Sprint 2
Login + Dashboard

### Sprint 3
Shared Layout

### Sprint 4
Navigation

### Sprint 5
Company Module

### Sprint 6
Users & Roles

### Sprint 7
Petty Cash CRUD

### Sprint 8
Approval Workflow

### Sprint 9
Reports

### Sprint 10
AI / OCR