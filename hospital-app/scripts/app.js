const addPacienteBtn = document.getElementById("addPaciente");
const modal = document.getElementById("modal-container");
const mFecharBtn = document.getElementById("m-fechar");
let pacientesArr = [];

mFecharBtn.addEventListener("click", () => {
  modal.close();
});

addPacienteBtn.addEventListener("click", () => {
  modal.show();
});

// Tabela de Pacientes

const tabelaDePacientes = document.getElementById("tabelaDePacientes");
const addBtn = document.getElementById("m-Add");
const nome = document.getElementById("m-nome");
const atendimento = document.getElementById("m-atendimento");
const errorSpan = document.getElementById("error");

addBtn.addEventListener("click", () => {
  errorSpan.style.display = "none";
  let senha = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0"); // Gera uma nova senha para cada paciente

  // Cria uma nova linha de paciente
  let linhaPaciente = document.createElement("tr");

  // Cria células para cada coluna na linha
  let colunaNome = document.createElement("td");
  colunaNome.textContent = nome.value;

  let colunaSenha = document.createElement("td");
  colunaSenha.textContent = senha;

  let colunaAtendimento = document.createElement("td");
  colunaAtendimento.textContent = atendimento.value;

  let paciente = {
    nome: nome.value,
    senha: senha,
    atendimento: atendimento.value,
  };

  if (nome.value && atendimento.value !== "") {
    tabelaDePacientes.appendChild(linhaPaciente);
    linhaPaciente.append(colunaNome, colunaSenha, colunaAtendimento);
    pacientesArr.push(paciente);

    let pacientesSalvos = localStorage.getItem("pacientes");
    if (pacientesSalvos) {
      let listaPacientes = JSON.parse(pacientesSalvos);
      listaPacientes.push(paciente);
      localStorage.setItem("pacientes", JSON.stringify(listaPacientes));
    } else {
      localStorage.setItem("pacientes", JSON.stringify([paciente]));
    }

    nome.value = "";
    atendimento.value = "";
    modal.close();
  } else {
    errorSpan.style.display = "block";
  }
});

function carregarPacientesSalvos() {
  let pacientesSalvos = localStorage.getItem("pacientes");

  if (pacientesSalvos) {
    let listaPacientes = JSON.parse(pacientesSalvos);

    listaPacientes.forEach((paciente) => {
      let linhaPaciente = document.createElement("tr");
      linhaPaciente.innerHTML = `<td>${paciente.nome}</td>
              <td>${paciente.senha}</td>
              <td>${paciente.atendimento}</td>`;
      tabelaDePacientes.appendChild(linhaPaciente);
      pacientesArr.push(paciente);
    });
  }
}

// Chama a função para carregar os pacientes ao carregar a página
carregarPacientesSalvos();

// Remover os pacientes

const modalRemover = document.getElementById("modal-remover");
const removerBtn = document.getElementById("removerBtn");
const modalRemoverFecharBtn = document.getElementById("m-remover-fechar");

removerBtn.addEventListener("click", () => {
  modalRemover.show();
});

modalRemoverFecharBtn.addEventListener("click", () => {
  modalRemover.close();
});

const removerDalistaBtn = document.getElementById("m-remover-Btn");
const inputSenhaRemover = document.getElementById("inputSenhaRemover");

const errorSpanRemover = document.getElementById("error-remover");

removerDalistaBtn.addEventListener("click", () => {
  const senhaParaRemover = inputSenhaRemover.value.trim(); // Removendo espaços em branco do início e do fim
  errorSpanRemover.style.display = "none";

  let index = -1;

  pacientesArr.forEach((paciente, i) => {
    if (paciente.senha === senhaParaRemover) {
      index = i;
      return;
    }
  });

  if (index !== -1) {
    // Remove da tabela
    console.log(index);

    tabelaDePacientes.deleteRow(index + 1); // +1 para considerar o cabeçalho da tabela

    // Remove do armazenamento local
    let pacientesSalvos = localStorage.getItem("pacientes");
    if (pacientesSalvos) {
      let listaPacientes = JSON.parse(pacientesSalvos);
      listaPacientes.splice(index, 1); // Remove o paciente do array
      localStorage.setItem("pacientes", JSON.stringify(listaPacientes));
    }

    // Remove do array pacientesArr
    pacientesArr.splice(index, 1);
    modalRemover.close();
  } else {
    // Caso a senha não corresponda a nenhum paciente
    errorSpanRemover.style.display = "block";
    console.log("Senha inválida ou paciente não encontrado.");
  }

  // Fechar o modal de remover após a operação
});

// CHAMANDO A PESSOA PARA SER ATENDIDA

const modalChamar = document.getElementById("modal-chamar");

const chamarBtn = document.getElementById("chamarBtn");

const modalChamarFecharBtn = document.getElementById("m-chamar-fechar");

const errorSpanChamar = document.getElementById("error-chamar");

const chamarSenhaBtn = document.getElementById("m-chamar-Btn");

export const senhaParaChamar = document.getElementById("inputSenhachamar");

chamarBtn.addEventListener("click", () => {
  modalChamar.show();
});

modalChamarFecharBtn.addEventListener("click", () => {
  modalChamar.close();
});

chamarSenhaBtn.addEventListener("click", () => {
  const senhaChamada = senhaParaChamar.value.trim(); // Removendo espaços em branco do início e do fim
  errorSpanRemover.style.display = "none";

  let index = -1;

  pacientesArr.forEach((paciente, i) => {
    if (paciente.senha === senhaChamada) {
      index = i;
      return;
    }
  });

  if (index !== -1) {
    // Remove da tabela
    console.log(index);

    tabelaDePacientes.deleteRow(index + 1); // +1 para considerar o cabeçalho da tabela

    // Remove do armazenamento local
    let pacientesSalvos = localStorage.getItem("pacientes");
    if (pacientesSalvos) {
      let listaPacientes = JSON.parse(pacientesSalvos);
      listaPacientes.splice(index, 1); // Remove o paciente do array
      localStorage.setItem("pacientes", JSON.stringify(listaPacientes));
    }

    // Remove do array pacientesArr
    pacientesArr.splice(index, 1);
    modalChamar.close();
    localStorage.setItem("senhaChamada", senhaParaChamar.value);

    localStorage.setItem("senhaRemovida", "true");
    // window.open("chamada.html", "_blank");

  } else {
    // Caso a senha não corresponda a nenhum paciente
    errorSpanChamar.style.display = "block";
    console.log("Senha inválida ou paciente não encontrado.");
  }
});