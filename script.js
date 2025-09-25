// Message box for login status
function showMessage(message, isSuccess) {
    const msgBox = document.createElement('div');
    msgBox.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        background-color: ${isSuccess ? '#4CAF50' : '#f44336'};
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: fadeOut 3s forwards;
    `;
    msgBox.innerText = message;
    document.body.appendChild(msgBox);

    const styleSheet = document.createElement('style');
    styleSheet.innerText = `
        @keyframes fadeOut {
            0% { opacity: 1; transform: translateY(0); }
            80% { opacity: 1; }
            100% { opacity: 0; transform: translateY(-20px); }
        }
    `;
    document.head.appendChild(styleSheet);

    setTimeout(() => {
        msgBox.remove();
        styleSheet.remove();
    }, 3000);
}

// Student login logic
document.getElementById("student-login-btn").addEventListener("click", function(event) {
  event.preventDefault();

  let email = document.getElementById("student-email").value;
  let password = document.getElementById("student-password").value;

  // Hardcoded credentials for demonstration
  if (email === "student@example.com" && password === "password123") {
    showMessage("Login Successful ✅", true);
    window.location.href = "web.html"; // Redirect to student portal
  } else {
    showMessage("Invalid student credentials ❌", false);
  }
});

// Admin login logic (redirects to the demo.html)
document.getElementById("admin-login-btn").addEventListener("click", function(event) {
    event.preventDefault();

    let email = document.getElementById("admin-email").value;
    let password = document.getElementById("admin-password").value;

    // Hardcoded credentials for demonstration
    if (email === "admin@example.com" && password === "admin123") {
        showMessage("Admin Login Successful ✅", true);
        window.location.href = "admin.html"; // Redirect to admin portal
    } else {
        showMessage("Invalid admin credentials ❌", false);
    }
});

// Function to handle logout from other pages
function logout() {
  showMessage("Logged out successfully!", true);
  // This function is called from other pages to redirect to the login page
  setTimeout(() => {
      window.location.href = "index.html";
  }, 1000);
}

// Tab switching logic (already provided)
const studentTab = document.getElementById("studentTab");
const adminTab = document.getElementById("adminTab");
const studentForm = document.getElementById("studentForm");
const adminForm = document.getElementById("adminForm");

studentTab.addEventListener("click", () => {
  studentTab.classList.add("active");
  adminTab.classList.remove("active");
  studentForm.classList.add("active");
  adminForm.classList.remove("active");
});

adminTab.addEventListener("click", () => {
  adminTab.classList.add("active");
  studentTab.classList.remove("active");
  adminForm.classList.add("active");
  studentForm.classList.remove("active");
});
