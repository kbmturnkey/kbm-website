
async function register() {
    const company_name = document.getElementById("company_name").value.trim();
    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!company_name || !name || !mobile || !email || !password) {
        alert("All fields are required ❌");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                company_name,
                name,
                mobile,
                email,
                password
            })
        });

        const data = await response.json();

        console.log(data); // 👈 IMPORTANT

        if (data.success) {
            alert("Registered Successfully ✅");
            window.location.href = "login.html";
        } else {
            alert(data.message || "Registration failed ❌");
        }

    } catch (error) {
        console.error("ERROR:", error);
        alert("Server not running or connection failed ❌");
    }
}
