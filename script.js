/*====================================================
    KM LUCRATIVO
    Script.js
    Versão 1.0
====================================================*/

/*====================================================
    ELEMENTOS
====================================================*/

const btnCalcular = document.getElementById("btnCalcular");
const btnSimular = document.getElementById("btnSimular");
const btnModoEscuro = document.getElementById("modoEscuro");

const painel = document.getElementById("painelFinanceiro");
const diagnostico = document.getElementById("diagnostico");
const resultadoCorrida = document.getElementById("resultadoCorrida");

/*====================================================
    CARDS
====================================================*/

const txtCustoMensal = document.getElementById("custoMensal");
const txtCustoReal = document.getElementById("custoReal");
const txtCombustivelKm = document.getElementById("combustivelKm");
const txtMetaDiaria = document.getElementById("metaDiaria");
const txtMetaSemanal = document.getElementById("metaSemanal");
const txtMetaMensal = document.getElementById("metaMensal");
const txtValorKm = document.getElementById("valorKm");

const txtDiagnostico =
document.getElementById("mensagemDiagnostico");

const txtCustoCorrida =
document.getElementById("custoCorrida");

const txtLucroCorrida =
document.getElementById("lucroCorrida");

const txtLucroKm =
document.getElementById("lucroKm");

const txtStatus =
document.getElementById("statusCorrida");

/*====================================================
    VARIÁVEIS GLOBAIS
====================================================*/

let custoMensal = 0;
let combustivelKm = 0;
let custoRealKm = 0;
let valorMinimoKm = 0;

/*====================================================
    EVENTOS
====================================================*/

btnCalcular.addEventListener("click", calcular);

btnSimular.addEventListener("click", simularCorrida);

btnModoEscuro.addEventListener("click", alternarModoEscuro);

/*====================================================
    FUNÇÕES AUXILIARES
====================================================*/

function numero(id){

    const campo = document.getElementById(id);

    if(!campo) return 0;

    return Number(campo.value) || 0;

}

function moeda(valor){

    return valor.toLocaleString("pt-BR",{

        style:"currency",

        currency:"BRL"

    });

}

function atualizarCard(card,valor){

    card.textContent = moeda(valor);

}

/*====================================================
    MODO ESCURO
====================================================*/

function alternarModoEscuro(){

    document.body.classList.toggle("dark");

    const icone =
    btnModoEscuro.querySelector("i");

    if(document.body.classList.contains("dark")){

        icone.className =
        "fa-solid fa-sun";

    }else{

        icone.className =
        "fa-solid fa-moon";

    }

}
/*====================================================
    FUNÇÃO CALCULAR
====================================================*/

function calcular(){

    // ===== Custos Mensais =====

    const parcela = numero("parcela");
    const seguro = numero("seguro");
    const ipva = numero("ipva") / 12;
    const internet = numero("internet");
    const lavagem = numero("lavagem");
    const extras = numero("extras");
    const lucroDesejado = numero("lucro");

    // ===== Rotina =====

    const diasMes = numero("diasMes");
    const kmDia = numero("kmDia");

    const kmMes = diasMes * kmDia;

    // ===== Alimentação =====

    const alimentacaoDia = numero("alimentacao");
    const alimentacao = alimentacaoDia * diasMes;

    // ===== Custo Mensal =====

    custoMensal =
        parcela +
        seguro +
        ipva +
        internet +
        lavagem +
        extras +
        alimentacao;

    // ===== Combustível =====

    const precoCombustivel = numero("valorCombustivel");
    const consumo = numero("consumo");

    combustivelKm = 0;

    if(consumo > 0){

        combustivelKm = precoCombustivel / consumo;

    }

    // ===== Óleo =====

    let oleoKm = 0;

    const valorOleo = numero("valorOleo");
    const trocaOleoKm = numero("trocaOleoKm");

    if(trocaOleoKm > 0){

        oleoKm = valorOleo / trocaOleoKm;

    }

    // ===== Pneus =====

    let pneusKm = 0;

    const valorPneus = numero("valorPneus");
    const vidaPneus = numero("vidaPneus");

    if(vidaPneus > 0){

        pneusKm = valorPneus / vidaPneus;

    }

    // ===== Pastilhas =====

    let pastilhasKm = 0;

    const valorPastilhas = numero("valorPastilhas");
    const vidaPastilhas = numero("vidaPastilhas");

    if(vidaPastilhas > 0){

        pastilhasKm = valorPastilhas / vidaPastilhas;

    }

    // ===== Custo Fixo por Km =====

    let custoFixoKm = 0;

    if(kmMes > 0){

        custoFixoKm = custoMensal / kmMes;

    }

    // ===== Custo Total =====

    custoRealKm =
        custoFixoKm +
        combustivelKm +
        oleoKm +
        pneusKm +
        pastilhasKm;

    // ===== Metas =====

    const metaMensal = custoMensal + lucroDesejado;

    const metaSemanal = metaMensal / 4.33;

    const metaDiaria =
        diasMes > 0
        ? metaMensal / diasMes
        : 0;

    valorMinimoKm =
        kmMes > 0
        ? metaMensal / kmMes
        : 0;

    // ===== Atualiza Cards =====

    atualizarCard(txtCustoMensal,custoMensal);
    atualizarCard(txtCombustivelKm,combustivelKm);
    atualizarCard(txtCustoReal,custoRealKm);
    atualizarCard(txtMetaDiaria,metaDiaria);
    atualizarCard(txtMetaSemanal,metaSemanal);
    atualizarCard(txtMetaMensal,metaMensal);
    atualizarCard(txtValorKm,valorMinimoKm);

    painel.classList.remove("oculto");
    diagnostico.classList.remove("oculto");

    txtDiagnostico.textContent =
        "Custos calculados com sucesso.";

}

/*====================================================
    SIMULADOR (TEMPORÁRIO)
====================================================*/

function simularCorrida(){

    alert("Simulador em desenvolvimento.");

}
/*====================================================
    SIMULADOR DE CORRIDA
====================================================*/

function simularCorrida(){

    const valorCorrida = numero("valorCorrida");
    const kmCorrida = numero("kmCorrida");

    if(valorCorrida <= 0 || kmCorrida <= 0){

        alert("Informe o valor e a distância da corrida.");

        return;

    }

    const custoCorrida = custoRealKm * kmCorrida;

    const lucro = valorCorrida - custoCorrida;

    const lucroPorKm = lucro / kmCorrida;

    atualizarCard(txtCustoCorrida,custoCorrida);

    atualizarCard(txtLucroCorrida,lucro);

    atualizarCard(txtLucroKm,lucroPorKm);

    resultadoCorrida.classList.remove("oculto");

    diagnostico.classList.remove("oculto");

    diagnostico.className = "container";

  if(lucro <= 0){

    diagnostico.className = "container erro";

    txtStatus.textContent = "🔴 PREJUÍZO";

    txtDiagnostico.innerHTML = `
        <strong>❌ Corrida não recomendada</strong><br><br>
        Você terá um prejuízo de <strong>${moeda(Math.abs(lucro))}</strong>.<br>
        O custo desta corrida é maior que o valor recebido.<br><br>
        <strong>Recomendação:</strong> recuse essa corrida.
    `;

}

    else if(lucroPorKm < custoRealKm){

    diagnostico.className = "container alerta";

    txtStatus.textContent = "🟠 MUITO RUIM";

    txtDiagnostico.innerHTML = `
        <strong>⚠ Lucro muito baixo</strong><br><br>
        Você ganhará apenas <strong>${moeda(lucro)}</strong> nesta corrida.<br>
        O retorno por quilômetro está abaixo do ideal.<br><br>
        <strong>Recomendação:</strong> aceite somente se ajudar no seu posicionamento.
    `;

}

   else if(lucroPorKm < valorMinimoKm){

    diagnostico.className = "container alerta";

    txtStatus.textContent = "🟡 ACEITÁVEL";

    txtDiagnostico.innerHTML = `
        <strong>👍 Corrida aceitável</strong><br><br>
        Lucro estimado: <strong>${moeda(lucro)}</strong>.<br>
        Está abaixo da sua meta por quilômetro, mas ainda gera lucro.<br><br>
        <strong>Recomendação:</strong> aceite se estiver com pouca demanda.
    `;

}

    else if(lucroPorKm < valorMinimoKm * 1.30){

    diagnostico.className = "container sucesso";

    txtStatus.textContent = "🟢 BOA CORRIDA";

    txtDiagnostico.innerHTML = `
        <strong>✅ Boa escolha</strong><br><br>
        Lucro estimado: <strong>${moeda(lucro)}</strong>.<br>
        Essa corrida atende sua meta de ganho.<br><br>
        <strong>Recomendação:</strong> vale a pena aceitar.
    `;

}

else{

    diagnostico.className = "container excelente";

    txtStatus.textContent = "🔵 EXCELENTE";

    txtDiagnostico.innerHTML = `
        <strong>🚀 Excelente oportunidade</strong><br><br>
        Lucro estimado: <strong>${moeda(lucro)}</strong>.<br>
        Excelente retorno por quilômetro.<br><br>
        <strong>Recomendação:</strong> aceite sem pensar duas vezes.
    `;

}

const btnPDF = document.getElementById("btnPDF");

btnPDF.addEventListener("click", exportarPDF);


async function exportarPDF() {


    document.getElementById("pdfCustoMensal").textContent =
    "💰 Custo Mensal: " + document.getElementById("custoMensal").textContent;


    document.getElementById("pdfCustoKm").textContent =
    "🚗 Custo por Km: " + document.getElementById("custoReal").textContent;


    document.getElementById("pdfCombustivel").textContent =
    "⛽ Combustível por Km: " + document.getElementById("combustivelKm").textContent;


    document.getElementById("pdfMetaDiaria").textContent =
    "📅 Meta Diária: " + document.getElementById("metaDiaria").textContent;


    document.getElementById("pdfMetaSemanal").textContent =
    "📅 Meta Semanal: " + document.getElementById("metaSemanal").textContent;


    document.getElementById("pdfMetaMensal").textContent =
    "📅 Meta Mensal: " + document.getElementById("metaMensal").textContent;


    document.getElementById("pdfValorKm").textContent =
    "🎯 Valor Mínimo por Km: " + document.getElementById("valorKm").textContent;

    const agora = new Date();

    document.getElementById("pdfData").textContent =
    "Data de geração: " + agora.toLocaleString("pt-BR");

    const original = document.getElementById("relatorioPDF");


    const clone = original.cloneNode(true);


    clone.style.position = "absolute";

    clone.style.left = "0";

    clone.style.top = "0";

    clone.style.width = "900px";

    clone.style.background = "#ffffff";


    document.body.appendChild(clone);



    const canvas = await html2canvas(clone, {

        scale:2,

        backgroundColor:"#ffffff"

    });



    const imagem = canvas.toDataURL("image/png");


    const { jsPDF } = window.jspdf;


    const pdf = new jsPDF("p","mm","a4");



    const largura = 180;


    const altura = canvas.height * largura / canvas.width;


    pdf.addImage(imagem,"PNG",15,15,largura,altura);



    pdf.save("KM-Lucrativo.pdf");



    clone.remove();

}
}