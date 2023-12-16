window.onload = function () {
  function verificarSenhaRemovida() {
    const senhaRemovida = localStorage.getItem("senhaRemovida");
    if (senhaRemovida === "true") {
      const senhaChamada = localStorage.getItem("senhaChamada");
      document.getElementById("senha-numero").innerText = senhaChamada;

      // Limpa o sinalizador, indicando que a senha foi tratada
      localStorage.removeItem("senhaRemovida");
    }
  }

  // Verifica se uma senha foi removida a cada intervalo de tempo (por exemplo, a cada segundo)
  setInterval(verificarSenhaRemovida, 1000);
};