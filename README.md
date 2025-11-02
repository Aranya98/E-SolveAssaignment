Debt Collection Dashboard

Login credentials---

Admin: Username: admin@demo.com, Password: admin
Agent: Username: agent@demo.com, Password: agent


Overview---

The Debt Collection Dashboard is a modular, fully responsive web application designed to simulate real-world debt management workflows. It demonstrates a complete frontend architecture that integrates state management, role-based routing, mock APIs, analytics visualization, and performance optimization.

This project is developed as part of the Frontend Engineer Assignment for Esolve, mirroring production-grade dashboard standards.


Objective---

Design and develop a fully functional debt collection dashboard that provides:

Real-time case analytics and performance tracking.

Role-based user experiences (Admin vs. Agent).

CRUD operations for cases and agents.

Integrated mock APIs to simulate backend functionality.

Efficient, maintainable, and scalable frontend architecture.


User Experience---

The user experience has been carefully structured to reflect a modern enterprise-grade interface. The flow is intuitive, responsive, and accessible across screen sizes.

Login and Role-Based Access

Admin Users have full access to dashboards, agent management, analytics, and case tracking.

Agent Users have restricted access, limited to assigned cases and case updates.

Authentication uses mock JWT tokens for seamless local simulation.

Login provides instant feedback with smooth UI transitions and role-based redirection.


Dashboard Overview---

Displays key performance indicators such as Total Cases, Resolved Cases, Pending Amount, and Agent Efficiency.

Includes real-time visual analytics through responsive bar and line charts.

Live data updates occur using mock polling, providing a near real-time user experience.


Case Management---


Comprehensive table listing all cases with search, sort, and pagination capabilities.

Each record can be expanded via a modal showing case details, borrower information, and payment history.

Status updates are supported directly from the modal. Changes are instantly reflected and logged in the Activity Log.

Clean layout ensures clarity and quick navigation between hundreds of records.


Agent Management (Admin Only)---

Full CRUD (Create, Read, Update, Delete) functionality for managing agents.

Displays individual workload summaries with real-time recovery rates and assigned case counts.

Modal-driven forms make it easy to add or edit agents without leaving the page.

Activity logs record every management operation for audit visibility.


Activity Log / Audit Trail---

Tracks every significant user action (logins, case updates, agent changes).

Displays entries in a collapsible timeline view, grouped by date.

Smooth animations enhance visibility of chronological events.

Filter and search tools make it easy to trace historical actions.


Performance and Responsiveness---

Lazy loading and code splitting are implemented for faster load times.

Tailwind CSS ensures consistent styling and responsiveness across all devices.

Large tables are handled efficiently with optimized rendering logic.

The layout maintains accessibility and visual balance, supporting users on both desktop and mobile.


Core Features (Mandatory)---

Authentication & Role-Based Access

Secure login using JWT (mock token).

Separate route access for Admin and Agent roles.

Dashboard Overview

Real-time KPIs and visual analytics using Recharts.

Dynamic updates using simulated polling.
