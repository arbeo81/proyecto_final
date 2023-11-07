const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const obj = {};

    data.forEach((value, key) => (obj[key] = value));

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(obj.email)) {
        const errorDiv = document.getElementById("error");
        errorDiv.innerHTML = "Por favor, introduzca un correo electrónico válido";
        return;
    }

    let response = await fetch("/api/sessions/login", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
        },
    });

    let result = await response.json();
    console.log(result);

    
    if (result.status === "success") {
        window.location.href = "/products";
    } else {
        const errorDiv = document.getElementById("error");
        if (result.error.toLowerCase().includes("contraseña")) {
            errorDiv.innerHTML = "Contraseña incorrecta, por favor intente de nuevo";
        } else {
            errorDiv.innerHTML = result.error;
        }
    }
});

function redirectToPasswordReset() {
    window.location.href = 'http://localhost:5000/solicitud';
}