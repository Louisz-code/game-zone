/* =========================
   DADOS DOS JOGOS
========================= */

const jogos = {
    "cyberpunk": {
        nome: "Cyberpunk 2077",
        genero: "RPG",
        descricao: "Explore Night City, uma cidade futurista cheia de perigos, tecnologia e escolhas. Assuma o papel de V e mergulhe em uma história cheia de personagens, missões e possibilidades.",
        nota: "9.0",
        desenvolvedora: "CD Projekt Red",
        ano: "2020",
        plataformas: "PC, PlayStation e Xbox",
        modo: "Um jogador",
        destaques: "Mundo aberto, personalização de personagem, combates futuristas e uma história com escolhas."
    },

    "red-dead-redemption-2": {
        nome: "Red Dead Redemption 2",
        genero: "Ação e Aventura",
        descricao: "Viva uma jornada pelo Velho Oeste em um mundo aberto cheio de aventuras e escolhas. Acompanhe Arthur Morgan em uma história marcante.",
        nota: "9.7",
        desenvolvedora: "Rockstar Games",
        ano: "2018",
        plataformas: "PC, PlayStation e Xbox",
        modo: "Um jogador e online",
        destaques: "Mundo aberto detalhado, narrativa marcante, exploração, caça e atividades no Velho Oeste."
    },

    "resident-evil-4": {
        nome: "Resident Evil 4",
        genero: "Terror e Ação",
        descricao: "Enfrente criaturas aterrorizantes em uma missão perigosa cheia de ação e suspense. Leon precisa enfrentar uma ameaça misteriosa para resgatar Ashley.",
        nota: "9.5",
        desenvolvedora: "Capcom",
        ano: "2023 — Remake",
        plataformas: "PC, PlayStation e Xbox",
        modo: "Um jogador",
        destaques: "Combate intenso, exploração, gerenciamento de recursos e momentos de terror e suspense."
    },

    "hollow-knight": {
        nome: "Hollow Knight",
        genero: "Metroidvania",
        descricao: "Explore um reino misterioso repleto de criaturas, segredos e desafios. Descubra os mistérios de Hallownest enquanto enfrenta inimigos e chefes perigosos.",
        nota: "9.4",
        desenvolvedora: "Team Cherry",
        ano: "2017",
        plataformas: "PC, PlayStation, Xbox e Nintendo Switch",
        modo: "Um jogador",
        destaques: "Exploração, chefes desafiadores, arte desenhada à mão e trilha sonora atmosférica."
    },

    "the-last-of-us": {
        nome: "The Last of Us",
        genero: "Ação e Aventura",
        descricao: "Em um mundo devastado, Joel e Ellie enfrentam perigos enquanto atravessam os Estados Unidos. Uma jornada marcada por sobrevivência, escolhas e relações humanas.",
        nota: "9.8",
        desenvolvedora: "Naughty Dog",
        ano: "2013 — Jogo original",
        plataformas: "PlayStation e PC, dependendo da edição",
        modo: "Um jogador",
        destaques: "Narrativa emocional, sobrevivência, exploração, furtividade e personagens memoráveis."
    },

    "detroit-become-human": {
        nome: "Detroit: Become Human",
        genero: "Aventura e Drama",
        descricao: "Faça escolhas que podem mudar completamente o destino dos personagens e da história. Suas decisões influenciam os acontecimentos e os diferentes finais.",
        nota: "9.2",
        desenvolvedora: "Quantic Dream",
        ano: "2018",
        plataformas: "PC e PlayStation 4",
        modo: "Um jogador",
        destaques: "História interativa, escolhas importantes, múltiplos finais e consequências para as decisões."
    }
};


/* =========================
   ELEMENTOS DO HTML
========================= */

const campoPesquisa = document.getElementById("campoPesquisa");
const botaoPesquisa = document.getElementById("botaoPesquisa");
const botaoExplorar = document.getElementById("botaoExplorar");

const cardsJogos = document.querySelectorAll(".card-jogo");
const contadorJogos = document.getElementById("contadorJogos");
const semResultados = document.getElementById("semResultados");

const botoesCategoria = document.querySelectorAll(".categoria-btn");

const botaoMenu = document.getElementById("botaoMenu");
const menuPrincipal = document.getElementById("menuPrincipal");

const botaoTopo = document.getElementById("botaoTopo");

const modal = document.getElementById("modalDetalhes");
const fecharModal = document.getElementById("fecharModal");

const modalGenero = document.getElementById("modalGenero");
const modalTitulo = document.getElementById("modalTitulo");
const modalDescricao = document.getElementById("modalDescricao");
const modalGeneroInfo = document.getElementById("modalGeneroInfo");
const modalAvaliacao = document.getElementById("modalAvaliacao");

const modalDesenvolvedora = document.getElementById("modalDesenvolvedora");
const modalAno = document.getElementById("modalAno");
const modalPlataformas = document.getElementById("modalPlataformas");
const modalModo = document.getElementById("modalModo");
const modalDestaques = document.getElementById("modalDestaques");

const botoesDetalhes = document.querySelectorAll(".botao-detalhes");


/* =========================
   ESTADO DA PÁGINA
========================= */

let categoriaSelecionada = "todos";
let elementoAnteriorModal = null;


/* =========================
   NORMALIZAR TEXTO
========================= */

function normalizarTexto(texto) {
    return String(texto || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}


/* =========================
   CONTADOR DE JOGOS
========================= */

function atualizarContador(quantidade) {
    if (!contadorJogos) return;

    contadorJogos.textContent =
        quantidade === 1
            ? "1 jogo encontrado"
            : `${quantidade} jogos encontrados`;
}


/* =========================
   FILTRAR JOGOS
========================= */

function filtrarJogos() {
    const termo = normalizarTexto(
        campoPesquisa ? campoPesquisa.value : ""
    );

    const categoria = normalizarTexto(categoriaSelecionada);
    let encontrados = 0;

    cardsJogos.forEach((card) => {
        const nome = normalizarTexto(card.dataset.nome);
        const genero = normalizarTexto(card.dataset.genero);

        const generosSeparados = genero
            .split(/\s+e\s+/)
            .map((item) => item.trim());

        const combinaPesquisa =
            nome.includes(termo) ||
            genero.includes(termo);

        const combinaCategoria =
            categoria === "todos" ||
            generosSeparados.includes(categoria) ||
            genero === categoria;

        const mostrar = combinaPesquisa && combinaCategoria;

        card.hidden = !mostrar;

        if (mostrar) encontrados++;
    });

    atualizarContador(encontrados);

    if (semResultados) {
        semResultados.hidden = encontrados !== 0;
    }
}


/* =========================
   PESQUISA
========================= */

if (campoPesquisa) {
    campoPesquisa.addEventListener("input", filtrarJogos);

    campoPesquisa.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            filtrarJogos();
        }
    });
}

if (botaoPesquisa) {
    botaoPesquisa.addEventListener("click", filtrarJogos);
}


/* =========================
   CATEGORIAS
========================= */

botoesCategoria.forEach((botao) => {
    botao.addEventListener("click", () => {
        categoriaSelecionada =
            botao.dataset.categoria || "todos";

        botoesCategoria.forEach((item) => {
            item.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        filtrarJogos();

        const secaoJogos = document.getElementById("jogos");

        if (secaoJogos) {
            secaoJogos.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


/* =========================
   EXPLORAR JOGOS
========================= */

if (botaoExplorar) {
    botaoExplorar.addEventListener("click", () => {
        const secaoJogos = document.getElementById("jogos");

        if (secaoJogos) {
            secaoJogos.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
}


/* =========================
   MENU MOBILE
========================= */

function fecharMenu() {
    if (!botaoMenu || !menuPrincipal) return;

    menuPrincipal.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu");
    botaoMenu.textContent = "☰";
}

if (botaoMenu && menuPrincipal) {
    botaoMenu.addEventListener("click", () => {
        const menuAberto =
            menuPrincipal.classList.toggle("aberto");

        botaoMenu.setAttribute(
            "aria-expanded",
            String(menuAberto)
        );

        botaoMenu.setAttribute(
            "aria-label",
            menuAberto ? "Fechar menu" : "Abrir menu"
        );

        botaoMenu.textContent = menuAberto ? "×" : "☰";
    });

    menuPrincipal.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", fecharMenu);
    });
}


/* =========================
   ABRIR MODAL DE DETALHES
========================= */

function abrirModal(idJogo, botaoOrigem) {
    if (!modal) return;

    const jogo = jogos[idJogo];

    if (!jogo) {
        console.error("Jogo não encontrado:", idJogo);
        return;
    }

    if (
        !modalGenero ||
        !modalTitulo ||
        !modalDescricao ||
        !modalGeneroInfo ||
        !modalAvaliacao
    ) {
        console.error(
            "Não foi possível encontrar todos os elementos do modal."
        );
        return;
    }

    elementoAnteriorModal =
        botaoOrigem || document.activeElement;

    // Informações originais
    modalGenero.textContent = jogo.genero;
    modalTitulo.textContent = jogo.nome;
    modalDescricao.textContent = jogo.descricao;
    modalGeneroInfo.textContent = jogo.genero;
    modalAvaliacao.textContent = `★ ${jogo.nota}`;

    // Informações extras
    if (modalDesenvolvedora) {
        modalDesenvolvedora.textContent =
            jogo.desenvolvedora || "Não informado";
    }

    if (modalAno) {
        modalAno.textContent =
            jogo.ano || "Não informado";
    }

    if (modalPlataformas) {
        modalPlataformas.textContent =
            jogo.plataformas || "Não informado";
    }

    if (modalModo) {
        modalModo.textContent =
            jogo.modo || "Não informado";
    }

    if (modalDestaques) {
        modalDestaques.textContent =
            jogo.destaques || "Não informado";
    }

    modal.classList.add("ativo");
    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    if (fecharModal) {
        fecharModal.focus();
    }
}

botoesDetalhes.forEach((botao) => {
    botao.addEventListener("click", () => {
        abrirModal(botao.dataset.jogo, botao);
    });
});


/* =========================
   FECHAR MODAL
========================= */

function fecharModalDetalhes() {
    if (!modal || !modal.classList.contains("ativo")) return;

    modal.classList.remove("ativo");
    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    if (
        elementoAnteriorModal &&
        typeof elementoAnteriorModal.focus === "function"
    ) {
        elementoAnteriorModal.focus();
    }

    elementoAnteriorModal = null;
}

if (fecharModal) {
    fecharModal.addEventListener(
        "click",
        fecharModalDetalhes
    );
}


/* =========================
   CLICAR FORA DO MODAL
========================= */

if (modal) {
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            fecharModalDetalhes();
        }
    });
}


/* =========================
   TECLA ESCAPE
========================= */

document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    fecharMenu();
    fecharModalDetalhes();
});


/* =========================
   BOTÃO VOLTAR AO TOPO
========================= */

function atualizarBotaoTopo() {
    if (!botaoTopo) return;

    botaoTopo.classList.toggle(
        "visivel",
        window.scrollY > 300
    );
}

window.addEventListener("scroll", atualizarBotaoTopo, {
    passive: true
});

if (botaoTopo) {
    botaoTopo.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* =========================
   INICIALIZAÇÃO
========================= */

cardsJogos.forEach((card) => {
    card.hidden = false;
});

filtrarJogos();
atualizarBotaoTopo();