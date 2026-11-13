const form = document.getElementById("userForm");
const userList = document.getElementById("userList");

// Retrieve users from backend
async function loadUsers() {

    const response = await fetch("/api/users");
    const users = await response.json();

    userList.innerHTML = "";

    users.forEach(user => {

        const li = document.createElement("li");

        li.textContent = `$DIL2 - $DIL3`;

        userList.appendChild(li);

    });
}

// Add new user
form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    const response = await fetch("/api/users", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({ name, email })

    });

    if (!response.ok) {
        alert("Could not add user");
        return;
    }

    form.reset();

    loadUsers();

});

loadUsers();