# ModernTech HR System  
ModernTech HR System is a front-end simulation of a Human Resource Management System tailored for Modern Tech Solutions — a software company specializing in patient management and telemedicine platforms. This system allows company admins and HR personnel to manage employees, track attendance, process payroll, and handle time-off requests, using mock data.

---

# 🧰 Technologies Used  
* Vue.js CLI (Frontend Framework)  
* HTML5, CSS3 (Structure & Styling)  
* JavaScript (Dynamic Behavior)  
* Vue Router (Navigation)  
* Pinia or Vuex (State Management - optional depending on use)  
* LocalStorage (Data Persistence Simulation)  

---

# 💡 KEY FEATURES  
This HR system includes the following essential front-end features:

* **Login System:** Simulates secure access to the system for authorized users only.  
* **Employee Dashboard:** Displays employee information with options to add, update, and delete records using dummy data.  
* **Time-Off Requests & Attendance Tracker:** Allows client-side simulation of submitting leave and tracking daily attendance.  
* **Payroll Calculator:** Calculates monthly and annual salaries using mock data and displays detailed salary slips.  
* **Calendar Page:** Visual overview of important HR dates, leave schedules, or company holidays.  
* **Faceted Search:** Filter employee records by role, department, or status.  
* **Responsive User Interface:** Optimized layout for desktops, tablets, and mobile devices.  
* **State Management:** Uses component-level or global state for managing active data (e.g., selected employees, payroll records).  

---

## 🛠️ Setup Instructions  
### HOW TO USE?

Follow these steps to run the ModernTech HR System locally in a development environment:

1. **Prerequisites:**  
   - Node.js and npm installed  
   - Vue CLI installed globally  
     ```bash
     npm install -g @vue/cli
     ```

2. **Clone the Repository:**  
   ```bash
   git clone [repository URL]
   cd [repository name]
   ```

3. **Install Dependencies:**  
   ```bash
   npm install
   ```

4. **Run the Development Server:**  
   ```bash
   npm run serve
   ```
   Then open your browser and visit:  
   `http://localhost:8080`

5. **Mock Data Setup:**  
   - Employee, attendance, and payroll data are simulated using `localStorage`.  
   - You can find mock data files or view how it's initialized inside relevant Vue components like `Payroll.vue` and `Attendance.vue`.

---

# 🔐 Default Credentials (Simulation Only)

| Role         | Email                   | Password   |
|--------------|-------------------------|------------|
| Admin (HR)   | admin@moderntech.com    | admin123   |
| Staff/User   | user@moderntech.com     | user123    |

---

## 👥 Author  

### Names  
* Sibabalwe Lingani  
* Yandisa Khumalo 
* Azola Ndoda 

### Emails  
* sibabalwelingani17@gmail.com  
* yandisa235@gmail.com 
* azolah99@gmail.com

### GitHub Usernames  
* **Sibabalwelingani7**  
* **Yandisa-droid**  
* **AzolaNdoda**
