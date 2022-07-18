const invalidCpfCnpjList = [
    '111.111.111-11',
    '222.222.222-22',
    '333.333.333-33',
    '444.444.444-44',
    '555.555.555-55',
    '666.666.666-66',
    '777.777.777-77',
    '888.888.888-88',
    '999.999.999-99',
    '11.111.111/1111-11',
    '22.222.222/2222-22',
    '33.333.333/3333-33',
    '44.444.444/4444-44',
    '55.555.555/5555-55',
    '66.666.666/6666-66',
    '77.777.777/7777-77',
    '88.888.888/8888-88',
    '99.999.999/9999-99'
];

const newEmployee = async (event) => {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var mail = document.getElementById('mail').value;
    var cpfCnpj = document.getElementById('cpf-cnpj').value;
    var cep = document.getElementById('cep').value;
    var street = document.getElementById('street').value;
    var district = document.getElementById('district').value;
    var city = document.getElementById('city').value;
    var state = document.getElementById('state').value;

    if (invalidCpfCnpjList.includes(cpfCnpj)) {
        alert(`${cpfCnpj.length > 14 ? 'CNPJ' : 'CPF' } inválido!`);
    } 

    else if (document.getElementById('cnpj').checked && cpfCnpj.length < 18) {
        alert('O campo CNPJ precisa conter 18 dígitos!');
    }
    else if (document.getElementById('cpf').checked && cpfCnpj.length < 14) {
        alert('O campo CPF precisa conter 14 dígitos!');
    }

    else if (cep.length < 9) {
        alert('O campo CEP precisa conter 9 dígitos!');
    }

    else {

        if (employeeId !== null) {

            await fetch('http://localhost:8080/employees', {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    id: employeeId,
                    name: name,
                    mail: mail,
                    cpfCnpj: cpfCnpj,
                    cep: cep,
                    street: street,
                    district: district,
                    city: city,
                    state: state
                })
            });

        } else {

            await fetch('http://localhost:8080/employees', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    mail: mail,
                    cpfCnpj: cpfCnpj,
                    cep: cep,
                    street: street,
                    district: district,
                    city: city,
                    state: state
                })
            });

        }
        location.href = '../index.html';
    }

}

const employeePut = async (id) => {
    var employees;

    document.getElementById('form-title').innerHTML = `Atualizar`;
    document.getElementById('form-button').innerHTML = `Atualizar`;

    await fetch('http://localhost:8080/employees')
        .then(response => response.json())
        .then(data => employees = data);

    var employee = employees.find(function (e) {
        return e.id == id;
    });

    var cpfCnpj = document.getElementById('cpf-cnpj').value = employee.cpfCnpj;
    if (cpfCnpj.length > 14) {
        document.getElementById('cnpj').checked = true;
    }

    var name = document.getElementById('name').value = employee.name;
    var mail = document.getElementById('mail').value = employee.mail;
    var cep = document.getElementById('cep').value = employee.cep;
    var street = document.getElementById('street').value = employee.street;
    var district = document.getElementById('district').value = employee.district;
    var city = document.getElementById('city').value = employee.city;
    var state = document.getElementById('state').value = employee.state;

}

const getCep = (event) => {
    if (event.target.value.length === 9) {
        getAddress(event.target.value.replace(/[^0-9]+/g, ''));
    }
}

const getAddress = async (cep) => {
    const apiUrl = `https://viacep.com.br/ws/${cep}/json`;
    const response = await fetch(apiUrl);
    const cepData = await response.json();

    if (cepData.erro === 'true') {
        document.getElementById('cep').value = '';
        alert('CEP inválido! Tente novamente.');
    } else {
        document.getElementById('street').value = cepData.logradouro;
        document.getElementById('district').value = cepData.bairro;
        document.getElementById('city').value = cepData.localidade;
        document.getElementById('state').value = cepData.uf;
    }
}

const setCnpj = () => {
    $(document).ready(function () {
        $('#cpf-cnpj').mask('00.000.000/0000-00');
        $('#cpf-cnpj').attr('placeholder', 'CNPJ');
        $('#cpf-cnpj').attr('minlength', '18');
    });
}
const setCpf = () => {
    $(document).ready(function () {
        $('#cpf-cnpj').mask('000.000.000-00');
        $('#cpf-cnpj').attr('placeholder', 'CPF');
        $('#cpf-cnpj').attr('minlength', '14');
    });
}


var urlEmployeePut = new URL(window.location.href);
var employeeId = urlEmployeePut.searchParams.get('employee');

if (employeeId !== null) {
    employeePut(employeeId);
}

$(document).ready(function () {
    $('#cpf-cnpj').mask('000.000.000-00');
    $('#cep').mask('00000-000');
});
