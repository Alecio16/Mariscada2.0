
const pesquisa = document.getElementById("searchInput");
const limpar = document.getElementById("clearSearch");
const filtros = document.querySelectorAll(".filtro");
const produtos = document.querySelectorAll(".produto");
const contador = document.getElementById("contador");
const semResultados = document.getElementById("semResultados");

let categoriaAtual = "todos";

function atualizarCardapio() {
    const termo = pesquisa.value.toLowerCase().trim();
    let quantidade = 0;

    produtos.forEach(produto => {
        const categoria = produto.dataset.categoria;

        const nome = produto.querySelector("h3")
            .textContent.toLowerCase();

        const descricao = produto.querySelector("p")
            .textContent.toLowerCase();

        const correspondeCategoria =
            categoriaAtual === "todos" ||
            categoria === categoriaAtual;

        const correspondePesquisa =
            nome.includes(termo) ||
            descricao.includes(termo);

        const mostrar =
            correspondeCategoria && correspondePesquisa;

        produto.hidden = !mostrar;

        if (mostrar) {
            quantidade++;
        }
    });

    contador.textContent =
        `${quantidade} produto(s) encontrado(s)`;

    semResultados.hidden = quantidade !== 0;
}

// PESQUISA

pesquisa.addEventListener("input", atualizarCardapio);

// LIMPAR PESQUISA

limpar.addEventListener("click", () => {
    pesquisa.value = "";
    atualizarCardapio();
    pesquisa.focus();
});

// FILTROS DE CATEGORIA

filtros.forEach(botao => {
    botao.addEventListener("click", () => {

        filtros.forEach(filtro => {
            filtro.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        categoriaAtual = botao.dataset.categoria;

        atualizarCardapio();
    });
});

// MENU PARA CELULAR

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
});

nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
    });
});

// INICIALIZAÇÃO

atualizarCardapio();
