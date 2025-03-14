# 🧑‍🔬 Scientific Day Management and Monitoring

Welcome to the **Scientific Day Management and Monitoring** project — an innovative web application designed to streamline the organization, management, and tracking of scientific events within your institution.

## 🌐 Technologies Used

- **Frontend:** [Next.js](https://nextjs.org) — A modern React framework for building high-performance web applications.
- **Backend:** [Laravel](https://laravel.com) — An elegant and powerful PHP framework for building robust APIs.
- **Database:** [PostgreSQL](https://www.postgresql.org) — A powerful and reliable relational database.

## ✨ Key Features

- 📅 **Event Management**:
  - Create new scientific day events.
  - Edit and delete existing events.
  - View the detailed program of events.

- 👥 **Participant Management**:
  - Register participants with complete tracking.
  - View and update personal information.

- 📄 **Scientific Work Submission**:
  - Submit proposals like papers, posters, or presentations.
  - Manage and track submitted works.

- ✅ **Work Validation and Approval**:
  - Review and validate submissions through a dedicated committee.
  - Notify decisions (accepted, rejected, under review).

- 📊 **Tracking and Statistics**:
  - Real-time visualization of key data:
    - Number of registered participants.
    - Statistics on submitted and accepted works.
    - Distribution of contribution types.

## 🚀 Installation and Setup

### Prerequisites
- [Node.js](https://nodejs.org) with [Bun](https://bun.sh)
- [PHP](https://www.php.net) with [Composer](https://getcomposer.org)
- [PostgreSQL](https://www.postgresql.org)

### Configuration

1. **Clone the repository**:

```bash
bun clone https://github.com/your-repo/scientific-day-management.git
cd scientific-day-management
```

2. **Set up environment variables**:

Create a `.env` file for the frontend:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

Create a `.env` file for the backend:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=your_db
DB_USERNAME=postgres
DB_PASSWORD=postgres
APP_KEY=your_app_key
```

3. **Install dependencies**:

```bash
# For the Next.js frontend
bun install

# For the Laravel backend
composer install
```

4. **Run the application**:

```bash
# Start the Laravel backend
php artisan serve

# Start the Next.js frontend
bun run dev
```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:8000`.

## 🛠️ Project Structure

```bash
src
|-- frontend        # Next.js application
|-- backend         # Laravel API
|-- database        # PostgreSQL scripts and migrations
```

## 📝 License

This project is licensed under the **MIT** License. See the [LICENSE](./LICENSE) file for more details.

---

🚀 **Ready to revolutionize scientific event management!**
