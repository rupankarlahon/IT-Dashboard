# IT Management Portal
The IT Management Portal is a modular, web-based application designed to centralize and streamline the management of IT infrastructure, assets, contracts, servers, and related resources for an organization. The portal provides a unified dashboard for IT administrators to efficiently track, update, and report on various IT operations, ensuring transparency, accountability, and ease of access to critical information.
Project Objectives
•	Centralize IT Data: Provide a single platform for managing assets, contracts, servers, and more.
•	Improve Efficiency: Automate and simplify IT tracking, reporting, and maintenance tasks.
•	Enhance Visibility: Offer real-time insights into IT inventory, contract status, and server health.
•	Support Compliance: Help maintain standards and compliance (e.g., ISO 27000).
•	Scalability: Modular design allows easy addition of new IT management modules.
# System Architecture
A. Frontend  
•	HTML5: Semantic markup for all pages (e.g., asset-management.html, contracts-management.html, server-management.html, DEVELOPED.html).  
•	CSS3: Custom stylesheets (assetstyle.css, contract.css, serverstyle.css, style.css) for a modern, dark-themed, responsive UI.  
•	JavaScript (Vanilla): Handles dynamic rendering, form submissions, and API communication.  
B. Backend  
•	Node.js: JavaScript runtime for server-side logic.  
•	Express.js: RESTful API framework.  
•	Sequelize ORM: Object-Relational Mapping for MySQL database operations.  
•	CORS: Middleware for cross-origin requests.  
C. Database  
•	MySQL: Relational database for storing all IT data.  
•	Sequelize Models: Define schema and validation for each entity (Asset, Contract, Server, etc.).  
# How to Use the Portal
1.	Start the Backend  
o	Run npm install and npm start in the backend folder.  
o	Ensure MySQL is running and credentials in src/config/db.js are correct.  
2.	Open the Frontend  
o	Open DEVELOPED.html in your browser for the dashboard.  
o	Navigate to modules like asset-management.html, contracts-management.html, or server-management.html.  
3.	Perform Operations  
o	Use forms to add new records.  
o	Use Edit/Delete buttons to update or remove records.  
o	View server details by clicking on server cards.  

