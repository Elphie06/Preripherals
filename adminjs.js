document.addEventListener("DOMContentLoaded", () => {
    loadAccounts(); // Load accounts on page load

    const accountForm = document.getElementById("account-form");
    const accountList = document.getElementById("account-list");
    const formTitle = document.getElementById("form-title");

    let editMode = false;
    let editId = null;

    // Handle form submit
    accountForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const userName = document.getElementById("userName").value;
        const email = document.getElementById("email").value;
        const gender = document.getElementById("gender").value;
        const password = document.getElementById("password").value;

        if (editMode) {
            // Update account
            fetch(`crud.php?id=${editId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, userName, email, gender, password })
            })
            .then(response => response.json())
            .then(() => {
                loadAccounts();  // Reload all data
                resetForm();
            });
        } else {
            // Create new account
            fetch('crud.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, userName, email, gender, password })
            })
            .then(response => response.json())
            .then(() => {
                loadAccounts();  // Reload all data
                resetForm();
            });
        }
    });

    // Function to fetch and load accounts into the table
    function loadAccounts() {
        fetch('crud.php')
            .then(response => response.json())
            .then(accounts => {
                accountList.innerHTML = ''; // Clear table
                accounts.forEach(account => addAccountRow(account));
            })
            .catch(error => console.error("Error fetching accounts:", error));
    }

    // Function to add a new account row in the table
    function addAccountRow(account) {
        const row = document.createElement("tr");
        row.dataset.id = account.id;
        row.innerHTML = `
            <td>${account.id}</td>
            <td>${account.firstName}</td>
            <td>${account.lastName}</td>
            <td>${account.userName}</td>
            <td>${account.email}</td>
            <td>${account.gender}</td>
            <td>
                <a href="#" class="edit">Edit</a>
                <a href="#" class="delete">Delete</a>
            </td>
        `;
        accountList.appendChild(row);
    }

    // Click event listener for Edit and Delete
    accountList.addEventListener("click", (e) => {
        e.preventDefault();

        if (e.target.classList.contains("edit")) {
            editMode = true;
            const row = e.target.closest("tr");
            editId = row.dataset.id;
            document.getElementById("firstName").value = row.cells[1].textContent;
            document.getElementById("lastName").value = row.cells[2].textContent;
            document.getElementById("userName").value = row.cells[3].textContent;
            document.getElementById("email").value = row.cells[4].textContent;
            document.getElementById("gender").value = row.cells[5].textContent;
            formTitle.textContent = "Edit Account";
        }

        if (e.target.classList.contains("delete")) {
            const id = e.target.closest("tr").dataset.id;
            fetch(`crud.php?id=${id}`, { method: 'DELETE' })
                .then(response => response.json())
                .then(() => loadAccounts());  // Reload all datdocument.addEventListener("DOMContentLoaded", () => {
                    loadAccounts(); // Load accounts on page load
                
                    const accountForm = document.getElementById("account-form");
                    const accountList = document.getElementById("account-list");
                    const formTitle = document.getElementById("form-title");
                
                    let editMode = false;
                    let editId = null;
                
                    // Handle form submit
                    accountForm.addEventListener("submit", (e) => {
                        e.preventDefault();
                
                        const firstName = document.getElementById("firstName").value;
                        const lastName = document.getElementById("lastName").value;
                        const userName = document.getElementById("userName").value;
                        const email = document.getElementById("email").value;
                        const gender = document.getElementById("gender").value;
                        const password = document.getElementById("password").value;
                
                        if (editMode) {
                            // Update account
                            fetch(`crud.php?id=${editId}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ firstName, lastName, userName, email, gender, password })
                            })
                            .then(response => response.json())
                            .then(data => {
                                if (data.error) {
                                    console.error("Update Error:", data.error);
                                } else {
                                    loadAccounts();  // Reload all data
                                    resetForm();
                                }
                            });
                        } else {
                            // Create new account
                            fetch('crud.php', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ firstName, lastName, userName, email, gender, password })
                            })
                            .then(response => response.json())
                            .then(data => {
                                if (data.error) {
                                    console.error("Creation Error:", data.error);
                                } else {
                                    loadAccounts();  // Reload all data
                                    resetForm();
                                }
                            });
                        }
                    });
                
                    // Function to fetch and load accounts into the table
                    function loadAccounts() {
                        fetch('crud.php')
                            .then(response => response.json())
                            .then(accounts => {
                                accountList.innerHTML = ''; // Clear table
                                accounts.forEach(account => addAccountRow(account));
                            })
                            .catch(error => console.error("Error fetching accounts:", error));
                    }
                
                    // Function to add a new account row in the table
                    function addAccountRow(account) {
                        const row = document.createElement("tr");
                        row.dataset.id = account.id;
                        row.innerHTML = `
                            <td>${account.id}</td>
                            <td>${account.firstName}</td>
                            <td>${account.lastName}</td>
                            <td>${account.userName}</td>
                            <td>${account.email}</td>
                            <td>${account.gender}</td>
                            <td>
                                <a href="#" class="edit">Edit</a>
                                <a href="#" class="delete">Delete</a>
                            </td>
                        `;
                        accountList.appendChild(row);
                    }
                
                    // Click event listener for Edit and Delete
                    accountList.addEventListener("click", (e) => {
                        e.preventDefault();
                
                        if (e.target.classList.contains("edit")) {
                            editMode = true;
                            const row = e.target.closest("tr");
                            editId = row.dataset.id;
                            document.getElementById("firstName").value = row.cells[1].textContent;
                            document.getElementById("lastName").value = row.cells[2].textContent;
                            document.getElementById("userName").value = row.cells[3].textContent;
                            document.getElementById("email").value = row.cells[4].textContent;
                            document.getElementById("gender").value = row.cells[5].textContent;
                            formTitle.textContent = "Edit Account";
                        }
                
                        if (e.target.classList.contains("delete")) {
                            const id = e.target.closest("tr").dataset.id;
                            fetch(`crud.php?id=${id}`, { method: 'DELETE' })
                                .then(response => response.json())
                                .then(data => {
                                    if (data.error) {
                                        console.error("Deletion Error:", data.error);
                                    } else {
                                        loadAccounts();  // Reload all data
                                    }
                                });
                        }
                    });
                
                    function resetForm() {
                        editMode = false;
                        editId = null;
                        formTitle.textContent = "Add Account";
                        accountForm.reset();
                    }
                });
                a
        }
    });

    function resetForm() {
        editMode = false;
        editId = null;
        formTitle.textContent = "Add Account";
        accountForm.reset();
    }
});
