// Dados simulados para os gráficos
const dadosSimulados = {
  vagas: {
    categorias: ["Desenvolvimento", "Design", "Marketing", "Vendas", "RH", "Financeiro"],
    valores: [45, 23, 18, 15, 12, 14],
  },
  candidatos: {
    status: ["Em Análise", "Aprovados", "Reprovados", "Em Teste"],
    valores: [620, 345, 278, 300],
  },
  evolucao: {
    meses: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    vagas: [15, 22, 18, 25, 30, 28, 35, 32, 38, 42, 45, 48],
    candidatos: [180, 220, 195, 280, 320, 295, 380, 350, 420, 460, 485, 520],
  },
}

// Inicialização quando a página carrega
document.addEventListener("DOMContentLoaded", () => {
  console.log("Dashboard carregado sem Chart.js")
  inicializarGraficosCustomizados()
  configurarEventos()
  configurarValidacaoFormulario()
  atualizarEstatisticas()
})

// Função para inicializar gráficos customizados
function inicializarGraficosCustomizados() {
  criarGraficoLinha()
  animarBarras()
}

// Criar gráfico de linha customizado
function criarGraficoLinha() {
  const container = document.getElementById("lineChartData")
  const meses = dadosSimulados.evolucao.meses.slice(-6)
  const vagasData = dadosSimulados.evolucao.vagas.slice(-6)
  const candidatosData = dadosSimulados.evolucao.candidatos.slice(-6)

  // Encontrar valores máximos para normalização
  const maxVagas = Math.max(...vagasData)
  const maxCandidatos = Math.max(...candidatosData)
  const maxGeral = Math.max(maxVagas, maxCandidatos)

  container.innerHTML = ""

  meses.forEach((mes, index) => {
    const pointContainer = document.createElement("div")
    pointContainer.className = "chart-point"

    const vagasHeight = (vagasData[index] / maxGeral) * 180
    const candidatosHeight = (candidatosData[index] / maxGeral) * 180

    pointContainer.innerHTML = `
            <div class="point-container">
                <div class="point-bar" style="--color: #667eea; height: ${vagasHeight}px;">
                    <div class="point-value">${vagasData[index]}</div>
                </div>
                <div class="point-bar" style="--color: #f5576c; height: ${candidatosHeight}px;">
                    <div class="point-value">${candidatosData[index]}</div>
                </div>
            </div>
            <div class="point-label">${mes}</div>
        `

    container.appendChild(pointContainer)
  })
}

// Animar barras do gráfico
function animarBarras() {
  setTimeout(() => {
    const barras = document.querySelectorAll(".chart-fill")
    barras.forEach((barra, index) => {
      setTimeout(() => {
        barra.style.width = barra.style.width || "0%"
      }, index * 200)
    })
  }, 500)
}

// Configurar todos os eventos
function configurarEventos() {
  // Modal de cadastro
  const btnCadastrarVaga = document.getElementById("btnCadastrarVaga")
  const btnFecharModal = document.getElementById("btnFecharModal")
  const btnCancelar = document.getElementById("btnCancelar")
  const modalOverlay = document.getElementById("modalOverlay")
  const formCadastroVaga = document.getElementById("formCadastroVaga")

  if (btnCadastrarVaga) {
    btnCadastrarVaga.addEventListener("click", abrirModal)
  }

  if (btnFecharModal) {
    btnFecharModal.addEventListener("click", fecharModal)
  }

  if (btnCancelar) {
    btnCancelar.addEventListener("click", fecharModal)
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        fecharModal()
      }
    })
  }

  if (formCadastroVaga) {
    formCadastroVaga.addEventListener("submit", cadastrarVaga)
  }

  // Controles dos gráficos
  document.querySelectorAll(".btn-chart").forEach((btn) => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".btn-chart").forEach((b) => b.classList.remove("active"))
      this.classList.add("active")

      const period = Number.parseInt(this.dataset.period)
      atualizarGraficoEvolucao(period)
    })
  })

  // Selects de período
  const periodoVagas = document.getElementById("periodoVagas")
  const periodoCandidatos = document.getElementById("periodoCandidatos")

  if (periodoVagas) {
    periodoVagas.addEventListener("change", function () {
      console.log("Período das vagas alterado:", this.value)
    })
  }

  if (periodoCandidatos) {
    periodoCandidatos.addEventListener("change", function () {
      console.log("Período dos candidatos alterado:", this.value)
    })
  }
}

// Funções do Modal
function abrirModal() {
  document.getElementById("modalOverlay").classList.add("active")
  document.body.style.overflow = "hidden"
}

function fecharModal() {
  document.getElementById("modalOverlay").classList.remove("active")
  document.body.style.overflow = "auto"
  document.getElementById("formCadastroVaga").reset()
}

// Função para cadastrar vaga
function cadastrarVaga(e) {
  e.preventDefault()

  const btnSalvar = document.getElementById("btnSalvarVaga")
  const originalText = btnSalvar.innerHTML
  btnSalvar.innerHTML = '<i class="fas fa-spinner"></i> Salvando...'
  btnSalvar.classList.add("loading")
  btnSalvar.disabled = true

  const formData = new FormData(e.target)
  const dadosVaga = Object.fromEntries(formData)

  setTimeout(() => {
    console.log("Dados da vaga:", dadosVaga)

    mostrarMensagemSucesso(`Vaga "${dadosVaga.titulo}" cadastrada com sucesso!`)
    atualizarEstatisticasAposCadastro()

    btnSalvar.innerHTML = originalText
    btnSalvar.classList.remove("loading")
    btnSalvar.disabled = false

    fecharModal()
    adicionarAtividadeRecente("Nova vaga cadastrada: " + dadosVaga.titulo)
  }, 1500)
}

// Função para mostrar mensagem de sucesso
function mostrarMensagemSucesso(mensagem) {
  const successDiv = document.createElement("div")
  successDiv.className = "success-message"
  successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${mensagem}</span>
    `

  document.querySelector(".dashboard-container").insertBefore(successDiv, document.querySelector(".stats-section"))

  setTimeout(() => {
    successDiv.remove()
  }, 5000)
}

// Atualizar estatísticas após cadastro
function atualizarEstatisticasAposCadastro() {
  const totalVagasElement = document.getElementById("totalVagas")
  const currentTotal = Number.parseInt(totalVagasElement.textContent)
  totalVagasElement.textContent = currentTotal + 1

  totalVagasElement.style.transform = "scale(1.1)"
  totalVagasElement.style.color = "#667eea"

  setTimeout(() => {
    totalVagasElement.style.transform = "scale(1)"
    totalVagasElement.style.color = "#2d3748"
  }, 300)
}

// Adicionar atividade recente
function adicionarAtividadeRecente(atividade) {
  const activityList = document.getElementById("activityList")
  const novaAtividade = document.createElement("div")
  novaAtividade.className = "activity-item"
  novaAtividade.innerHTML = `
        <div class="activity-icon new">
            <i class="fas fa-plus"></i>
        </div>
        <div class="activity-content">
            <p><strong>${atividade}</strong></p>
            <span class="activity-time">Agora mesmo</span>
        </div>
    `

  activityList.insertBefore(novaAtividade, activityList.firstChild)

  if (activityList.children.length > 5) {
    activityList.removeChild(activityList.lastChild)
  }
}

// Atualizar gráfico de evolução baseado no período
function atualizarGraficoEvolucao(meses) {
  const container = document.getElementById("lineChartData")
  const mesesData = dadosSimulados.evolucao.meses.slice(-meses)
  const vagasData = dadosSimulados.evolucao.vagas.slice(-meses)
  const candidatosData = dadosSimulados.evolucao.candidatos.slice(-meses)

  const maxVagas = Math.max(...vagasData)
  const maxCandidatos = Math.max(...candidatosData)
  const maxGeral = Math.max(maxVagas, maxCandidatos)

  container.innerHTML = ""

  mesesData.forEach((mes, index) => {
    const pointContainer = document.createElement("div")
    pointContainer.className = "chart-point"

    const vagasHeight = (vagasData[index] / maxGeral) * 180
    const candidatosHeight = (candidatosData[index] / maxGeral) * 180

    pointContainer.innerHTML = `
            <div class="point-container">
                <div class="point-bar" style="--color: #667eea; height: ${vagasHeight}px;">
                    <div class="point-value">${vagasData[index]}</div>
                </div>
                <div class="point-bar" style="--color: #f5576c; height: ${candidatosHeight}px;">
                    <div class="point-value">${candidatosData[index]}</div>
                </div>
            </div>
            <div class="point-label">${mes}</div>
        `

    container.appendChild(pointContainer)
  })
}

// Atualizar estatísticas com animação
function atualizarEstatisticas() {
  const stats = [
    { id: "totalVagas", valor: 127 },
    { id: "totalCandidatos", valor: 1543 },
    { id: "totalTestes", valor: 89 },
    { id: "totalAprovados", valor: 45 },
  ]

  stats.forEach((stat) => {
    animarNumero(stat.id, stat.valor)
  })
}

// Animar números das estatísticas
function animarNumero(elementId, valorFinal) {
  const elemento = document.getElementById(elementId)
  if (!elemento) return

  const valorInicial = 0
  const duracao = 2000
  const incremento = valorFinal / (duracao / 16)
  let valorAtual = valorInicial

  const timer = setInterval(() => {
    valorAtual += incremento
    if (valorAtual >= valorFinal) {
      valorAtual = valorFinal
      clearInterval(timer)
    }

    if (elementId === "totalCandidatos") {
      elemento.textContent = Math.floor(valorAtual).toLocaleString("pt-BR")
    } else {
      elemento.textContent = Math.floor(valorAtual)
    }
  }, 16)
}

// Adicionar listener para tecla ESC fechar modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const modal = document.getElementById("modalOverlay")
    if (modal && modal.classList.contains("active")) {
      fecharModal()
    }
  }
})

// Validação em tempo real do formulário
function configurarValidacaoFormulario() {
  const form = document.getElementById("formCadastroVaga")
  if (!form) return

  const inputs = form.querySelectorAll("input[required], select[required], textarea[required]")

  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validarCampo(this)
    })

    input.addEventListener("input", function () {
      if (this.classList.contains("error")) {
        validarCampo(this)
      }
    })
  })
}

function validarCampo(campo) {
  if (campo.value.trim() === "") {
    campo.classList.add("error")
    campo.classList.remove("success")
  } else {
    campo.classList.remove("error")
    campo.classList.add("success")
  }
}
