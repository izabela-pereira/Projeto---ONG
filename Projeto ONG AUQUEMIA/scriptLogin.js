const form1 = document.getElementById("form1");

const email = document.getElementById("inputemail");
const password = document.getElementById("inputpassword");


form1.addEventListener("submit", (event) => {
    event.preventDefault();

    checkForm1();
})

inputemail.addEventListener("blur", () => {
    checkInputEmail();
})

inputpassword.addEventListener("blur", () => {
    checkInputPassword();
})

function checkInputEmail() {
    const inputemailValue = inputemail.value;

    if (inputemailValue === "") {
        errorInput(inputemail, "Digite um usuário!")
    } else {
        const formItem = inputemail.parentElement;
        formItem.className = "form-floating"
    }
}

function checkInputPassword() {
    const inputpasswordValue = inputpassword.value;

    if (inputpasswordValue === "") {
        errorInput(inputpassword, "A senha é obrigatória!")
    } else if (inputpasswordValue.length < 6) {
        errorInput(inputpassword, "A senha precisa ter no mínimo 6 caracteres!")
    } else {
        const formItem = inputpassword.parentElement;
        formItem.className = "form-floating"
    }
}

function checkForm1() {

    checkInputEmail();
    checkInputPassword();


    const formItems = form.querySelectorAll(".form-floating")

    const isValid = [...formItems].every((item) => {
        return item.className === "form-floating"
    });

    if (isValid) {
        alert("CADASTRADO COM SUCESSO!")
    } else {
        alert("PREENCHA TODOS OS CAMPOS CORRETAMENTE")
    }
}


function errorInput(input, message) {
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("a")

    textMessage.innerText = message;

    formItem.className = "form-floating error"

}


function logar() {
    var inputemail = document.getElementById('inputemail').value;
    var inputpassword = document.getElementById('inputpassword').value;

    if (inputemail == "admin@email.com" && inputpassword == "adminadmin") {
        alert('Logado com sucesso');
        //location.href = "pagina.html";
        location.href ="indexPagina.html"
    }else{
        alert('Usuário ou senha inválidos');
    }
}
