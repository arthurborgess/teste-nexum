listEmployees();
async function listEmployees() {
    var employees;

    await fetch('http://localhost:8080/employees')
        .then(response => response.json())
        .then(data => employees = data);

    if (employees !== null) {
        document.querySelector('.employees-table-content').innerHTML =
            employees.map((employee, index) => {
                return `<div class="employees-table-data" style="background-color: ${(index % 2 == 0) && '#F5F5F5'}">
                    <span class="name">${employee.name}</span>
                    <span class="cpf-cnpj">${employee.cpfCnpj}</span>
                    <span class="mail">${employee.mail}</span>
                    <span class="city">${employee.city}</span>
                    <span class="uf">${employee.state}</span>
                    <div class="actions-svg">
                        <img class="edit-icon" src="src/assets/edit.svg" alt="Edit" onclick="editEmployee(${employee.id})">
                        <img class="delete-icon" src="src/assets/delete.svg" alt="Delete" onclick="deleteEmployee(${employee.id})">
                    </div>
                </div>`
            }).join('');
    }
}

async function deleteEmployee(employee) {
    
    await fetch('http://localhost:8080/employees', {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }, 
        body: JSON.stringify({
            id: employee
        })
    });

    listEmployees();

}

function editEmployee(employee) {
    window.location.href = "./src/form.html?employee=" + employee;
}