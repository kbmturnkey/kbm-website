
async function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            alert("Login Successful ✅");

            // store user session
            localStorage.setItem("user", JSON.stringify(data.user));

            // redirect
            window.location.href = "dashboard.html";
        } else {
            alert(data.message || "Invalid Email or Password ❌");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Server not responding ❌");
    }
}
