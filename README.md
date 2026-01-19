# BMI Tracker System

A modern, full-stack BMI (Body Mass Index) Tracking application built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, and **PostgreSQL**.

This system allows users to track their BMI over time, visualize their progress, and provides an administrative dashboard for system-wide health statistics.

## 🚀 Features

### 👤 User Features
-   **Secure Authentication**: User registration and login powered by NextAuth.js.
-   **BMI Calculator**: Instant BMI calculation based on weight (kg) and height (cm).
-   **History Tracking**: Saves all BMI records to track health progress over time.
-   **Data Visualization**: Interactive charts (Recharts) to visualize weight and BMI trends.
-   **Health Categories**: Automatic classification (Underweight, Normal, Overweight, Obese) with color-coded indicators.

### 🛡️ Admin Features
-   **Admin Dashboard**: Dedicated portal for system administrators.
-   **System Statistics**: Overview of total users, total records, and average BMI.
-   **Data Analytics**: Pie charts showing the distribution of BMI categories across the user base.
-   **Role-Based Access Control**: Protected routes ensuring only admins can access sensitive data.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Database**: [PostgreSQL](https://www.postgresql.org/)
-   **ORM**: [Prisma v7](https://www.prisma.io/)
-   **Authentication**: [NextAuth.js v4](https://next-auth.js.org/)
-   **Charts**: [Recharts](https://recharts.org/)

## 🏁 Getting Started

### Prerequisites
-   Node.js (v18 or higher)
-   PostgreSQL installed and running

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/bmi-tracker.git
    cd bmi-tracker
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add the following:
    ```env
    # Database connection string (PostgreSQL)
    DATABASE_URL="postgresql://user:password@localhost:5432/bmi_db"

    # NextAuth Configuration
    NEXTAUTH_URL="http://localhost:3000"
    NEXTAUTH_SECRET="your-super-secret-key-change-this"
    ```

4.  **Setup Database**
    Push the schema to your database:
    ```bash
    npx prisma db push
    ```

5.  **Seed the Database (Create Admin)**
    Run the seed script to create the default admin user:
    ```bash
    node prisma/seed.mjs
    ```
    > **Note:** This creates an admin user with:
    > - **Email:** `admin@example.com`
    > - **Password:** `adminpassword`

6.  **Run the Development Server**
    ```bash
    npm run dev
    ```

7.  **Open the App**
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage Guide

### Regular User
1.  **Register**: Create a new account via the Sign Up page.
2.  **Login**: Sign in with your credentials.
3.  **Calculate**: Enter your weight and height in the dashboard.
4.  **Track**: View your latest result and history graph below the calculator.

### Administrator
1.  **Login**: Sign in using the admin credentials (see above).
2.  **Redirect**: You will be automatically redirected to the Admin Dashboard.
3.  **Monitor**: View system-wide statistics and BMI distribution charts.
4.  **Navigation**: Use the "Admin Dashboard" link in the navbar if you are on the main user dashboard.

## 🔒 Security Measures
-   **Input Validation**: Strict validation on registration and BMI calculation inputs.
-   **Role-Based Protection**: Middleware ensures non-admins cannot access `/admin` routes.
-   **Password Hashing**: Passwords are securely hashed using `bcrypt` before storage.
-   **Type Safety**: Full TypeScript implementation to prevent runtime errors.

## 📂 Project Structure
```
├── app/
│   ├── admin/         # Admin dashboard pages
│   ├── api/           # API routes (Auth, BMI, Admin Stats)
│   ├── auth/          # Authentication pages (SignIn, Register)
│   ├── dashboard/     # User dashboard
│   └── page.tsx       # Landing page
├── components/        # Reusable UI components
├── lib/               # Utility functions (Prisma client, Auth options)
├── prisma/            # Database schema and seed scripts
├── public/            # Static assets
└── middleware.ts      # Authentication middleware
```

## 📄 License
This project is open-source and available under the MIT License.
