document.addEventListener("DOMContentLoaded", () => {
    const resultsSection = document.querySelector(".results-section");
    const searchButton = document.querySelector(".filter-btn");
    const specialtySelect = document.querySelector(".filter-select");
    const profileModal = document.getElementById("profileModal");
    const closeModalBtn = document.getElementById("closeModal");

    // Função para buscar profissionais
    async function searchProfessionals(termo) {
        resultsSection.innerHTML = "<h2>Buscando profissionais...</h2>";
        try {
            const response = await fetch(`/api/busca?termo=${encodeURIComponent(termo)}`);
            const profissionais = await response.json();

            if (response.ok) {
                renderResults(profissionais);
            } else {
                resultsSection.innerHTML = `<h2>Erro na busca: ${profissionais.error}</h2>`;
            }
        } catch (error) {
            console.error("Erro ao buscar profissionais:", error);
            resultsSection.innerHTML = "<h2>Erro de conexão ao buscar profissionais.</h2>";
        }
    }

    // Função para renderizar os resultados
    function renderResults(profissionais) {
        resultsSection.innerHTML = ""; // Limpa resultados anteriores

        if (profissionais.length === 0) {
            resultsSection.innerHTML = "<h2>Nenhum profissional encontrado.</h2>";
            return;
        }

        profissionais.forEach(prof => {
            const card = document.createElement("div");
            card.classList.add("professional-card");
            card.innerHTML = `
                <div class="professional-photo">
                    <img src="https://randomuser.me/api/portraits/medlar/${prof.id_profissional % 100}.jpg" alt="${prof.nome}">
                </div>
                <div class="professional-info">
                    <h3 class="professional-name">${prof.nome}</h3>
                    <p class="professional-specialty">${prof.especialidade || "Especialidade não informada"}</p>
                    <div class="professional-rating">
                        <span class="stars">★★★★★</span>
                        <span class="rating-number">50 avaliações</span>
                    </div>
                    <div class="button-group">
                        <button class="btn-primary profile-btn" data-id="${prof.id_profissional}">Ver Perfil</button>
                        <a href="/public/html/solicitar-atendimento.html?prof_id=${prof.id_profissional}&prof_nome=${encodeURIComponent(prof.nome)}" class="btn-secondary schedule-btn">Agendar Consulta</a>
                    </div>
                </div>
            `;
            resultsSection.appendChild(card);
        });

        // Adiciona evento para abrir modal de perfil
        document.querySelectorAll(".profile-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                const id = e.target.dataset.id;
                // Aqui você faria uma busca mais detalhada pelo ID, mas por enquanto, vamos simular
                const prof = profissionais.find(p => p.id_profissional == id);
                if (prof) {
                    document.getElementById("modalFoto").src = `https://randomuser.me/api/portraits/medlar/${prof.id_profissional % 100}.jpg`;
                    document.getElementById("modalNome").textContent = prof.nome.split(" ")[0];
                    document.getElementById("modalSobrenome").textContent = prof.nome.split(" ").slice(1).join(" ");
                    document.getElementById("modalRegistro").textContent = prof.registro_profissional || "Não informado";
                    document.getElementById("modalEmail").textContent = prof.email;
                    document.getElementById("modalTelefone").textContent = prof.telefone;
                    document.getElementById("modalExperiencia").textContent = "Experiência simulada.";
                    document.getElementById("modalDescricao").textContent = "Descrição simulada.";
                    profileModal.style.display = "flex";
                }
            });
        });
    }

    // Evento de clique no botão de busca
    searchButton.addEventListener("click", () => {
        const termo = specialtySelect.value === "Todos" ? "" : specialtySelect.value;
        if (termo) {
            searchProfessionals(termo);
        } else {
            // Se "Todos" estiver selecionado, busca por um termo genérico ou lista todos
            searchProfessionals("Enfermagem"); // Exemplo inicial
        }
    });

    // Evento para fechar o modal
    closeModalBtn.addEventListener("click", () => {
        profileModal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if(e.target === profileModal) profileModal.style.display = "none";
    });

    // Carregar resultados iniciais (simulados ou uma busca inicial)
    searchProfessionals("Enfermagem"); // Busca inicial ao carregar a página
});