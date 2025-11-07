// Resposta.js - versão robusta e testada (toolbar clicável corrigida)
document.addEventListener('DOMContentLoaded', () => {
  try {
    // ===== criar editor =====
    const editorArea = document.createElement('div');
    editorArea.contentEditable = 'true';
    editorArea.className = 'editor-area';
    editorArea.setAttribute('spellcheck','true');
    // transparente e herdando cor
    editorArea.style.cssText = `
      background: transparent;
      color: inherit;
      min-height: 220px;
      padding: 10px;
      border-radius: 6px;
      outline: none;
      border: 1px solid transparent;
      font-family: 'Poppins', sans-serif;
    `;

    // encontra placeholder e substitui
    const placeholder = document.querySelector('section.col-right div[style*="height:300px"]');
    if (!placeholder) {
      console.error('Placeholder não encontrado: verifique o HTML (selector para placeholder).');
      return;
    }
    placeholder.replaceWith(editorArea);

    // ===== area de anexos =====
    const anexosWrap = document.createElement('div');
    anexosWrap.className = 'anexos-wrap';
    anexosWrap.style.marginTop = '8px';
    anexosWrap.style.fontSize = '14px';
    if (editorArea.parentNode) editorArea.parentNode.appendChild(anexosWrap);

    // ===== input de arquivo invisível =====
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.style.display = 'none';
    fileInput.multiple = false;
    document.body.appendChild(fileInput);

    // armazena anexos localmente (para envio futuro)
    const anexos = [];

    // ===== util: execCommand com foco =====
    function execCmd(cmd, value = null) {
      document.execCommand(cmd, false, value);
      editorArea.focus();
    }

    // ===== toolbar: event delegation (corrigido para capturar ícone corretamente) =====
    const toolbar = document.querySelector('.toolbar');
    if (!toolbar) console.warn('Toolbar não encontrada');

    toolbar && toolbar.addEventListener('click', (ev) => {
      // evita comportamento padrão, mas mantém foco no editor
      ev.preventDefault();

      // 1) se o usuário clicou diretamente no <i>, captura-o
      let iconEl = ev.target.closest && ev.target.closest('i');

      // 2) se não foi no <i>, procura o botão/bolha mais próximo e obtém o <i> dentro dele
      if (!iconEl) {
        const clicked = ev.target.closest && ev.target.closest('.toolbar-btn, .tool-bubble');
        iconEl = clicked ? clicked.querySelector('i') : null;
      }

      // nada a fazer se não houver ícone identificado
      if (!iconEl) return;

      const cls = iconEl.classList;

      if (cls.contains('fa-bold')) execCmd('bold');
      else if (cls.contains('fa-italic')) execCmd('italic');
      else if (cls.contains('fa-underline')) execCmd('underline');
      else if (cls.contains('fa-text-height')) {
        // alterna tamanhos simples: pergunta pro usuário
        const size = prompt('Tamanho da fonte');
        if (size) execCmd('fontSize', size);
      }
      else if (cls.contains('fa-font')) {
        const color = prompt('Cor do texto (nome ou hex). Ex: #c00 ou red', '#000000');
        if (color) execCmd('foreColor', color);
      }
      else if (cls.contains('fa-list-ul')) execCmd('insertUnorderedList');
      else if (cls.contains('fa-list-ol')) execCmd('insertOrderedList');
      else if (cls.contains('fa-square-root-variable')) alert('Editor de fórmulas: recurso futuro.');
      else if (cls.contains('fa-link')) {
        // abrir diálogo de arquivo (anexar)
        fileInput.click();
      }
    });

    // ===== quando escolher arquivo =====
    fileInput.addEventListener('change', (e) => {
      const f = e.target.files && e.target.files[0];
      if (!f) return;

      // adicionar ao array
      anexos.push(f);

      // criar elemento visual do anexo
      const linha = document.createElement('div');
      linha.className = 'anexo-item';
      linha.style.display = 'flex';
      linha.style.alignItems = 'center';
      linha.style.gap = '8px';
      linha.style.marginTop = '6px';
      linha.style.opacity = '0.95';

      const icone = document.createElement('span');
      icone.textContent = '📎';
      linha.appendChild(icone);

      const nome = document.createElement('span');
      nome.textContent = f.name;
      linha.appendChild(nome);

      const tamanho = document.createElement('small');
      const kb = Math.round(f.size / 1024);
      tamanho.textContent = ` (${kb} KB)`;
      linha.appendChild(tamanho);

      const btnRem = document.createElement('button');
      btnRem.type = 'button';
      btnRem.textContent = 'Remover';
      btnRem.style.marginLeft = '8px';
      btnRem.style.cursor = 'pointer';
      btnRem.addEventListener('click', () => {
        const idx = anexos.indexOf(f);
        if (idx !== -1) anexos.splice(idx, 1);
        linha.remove();
        fileInput.value = ''; // permite re-anexar o mesmo arquivo depois
      });
      linha.appendChild(btnRem);

      anexosWrap.appendChild(linha);
    });

    // ===== botões principais =====
    const btnCancelar = document.querySelector('.btn.cancel');
    const btnEnviar = document.querySelector('.btn.send');

    btnCancelar && btnCancelar.addEventListener('click', (e) => {
      e.preventDefault();
      // redirecionamento pronto - ajuste se quiser
      window.location.href = 'index.html';
    });

    btnEnviar && btnEnviar.addEventListener('click', (e) => {
      e.preventDefault();
      const conteudo = editorArea.innerHTML.trim();
      if (!conteudo && anexos.length === 0) {
        alert('Digite algo ou anexe um arquivo antes de enviar.');
        editorArea.focus();
        return;
      }

      // Exemplo de preparo do envio (você substitui pela chamada real)
      // const form = new FormData();
      // form.append('resposta', conteudo);
      // anexos.forEach((f, i) => form.append('anexo' + i, f));

      // para esta versão, só mostramos alerta e redirecionamos
      alert('Resposta preparada para envio!');
      window.location.href = 'perguntas.html';
    });

    // ===== nav links =====
    document.querySelectorAll('nav a').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const txt = link.textContent.trim().toLowerCase();
        if (txt === 'tela inicial') window.location.href = 'index.html';
        else if (txt === 'perguntas') window.location.href = 'perguntas.html';
        else if (txt === 'disciplinas') window.location.href = 'disciplinas.html';
        else if (txt === 'comunidades') window.location.href = 'comunidades.html';
        else if (txt === 'tutoria') window.location.href = 'tutoria.html';
      });
    });

    // ===== acessibilidade: foco no editor ao carregar =====
    setTimeout(() => editorArea.focus(), 150);
    console.log('Resposta.js carregado com sucesso.');

  } catch (err) {
    console.error('Erro em Resposta.js:', err);
  }
});
