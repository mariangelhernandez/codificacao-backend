// ...existing code...
document.addEventListener('DOMContentLoaded', () => {
    const areaTexto = document.getElementById('notaInput');
    const listaContainer = document.getElementById('listaNotas');
    let btnSalvar = document.getElementById('btnSalvar');
    let btnCancelar = document.getElementById('btnCancelar');

    if (!listaContainer) {
        console.error('Elemento #listaNotas não encontrado em DOM');
        return;
    }
    if (!areaTexto) {
        console.error('Elemento #notaInput não encontrado em DOM');
        return;
    }

    // Cria os botões se não existirem no HTML
    if (!btnSalvar) {
        btnSalvar = document.createElement('button');
        btnSalvar.id = 'btnSalvar';
        btnSalvar.textContent = 'Salvar';
        areaTexto.insertAdjacentElement('afterend', btnSalvar);
    }
    if (!btnCancelar) {
        btnCancelar = document.createElement('button');
        btnCancelar.id = 'btnCancelar';
        btnCancelar.textContent = 'Cancelar';
        btnCancelar.style.display = 'none';
        btnSalvar.insertAdjacentElement('afterend', btnCancelar);
    }

    let editingId = null; // id da nota que está sendo editada (null = modo novo)

    btnSalvar.addEventListener('click', salvarNota);
    btnCancelar.addEventListener('click', cancelarEdicao);

    carregarNotas();

    function salvarNota() {
        const texto = areaTexto.value.trim();
        if (texto === '') {
            alert('Digite algo antes de salvar!');
            return;
        }

        const notas = JSON.parse(localStorage.getItem('notas') || '[]');

        if (editingId === null) {
            // Inserir nova nota
            const novaNota = { id: Date.now(), texto };
            notas.push(novaNota);
        } else {
            // Atualizar nota existente
            const idx = notas.findIndex(n => n.id === editingId);
            if (idx !== -1) {
                notas[idx].texto = texto;
            }
            editingId = null;
            btnSalvar.textContent = 'Salvar';
            btnCancelar.style.display = 'none';
        }

        localStorage.setItem('notas', JSON.stringify(notas));
        areaTexto.value = '';
        carregarNotas();
    }

    function carregarNotas() {
        const notas = JSON.parse(localStorage.getItem('notas') || '[]');
        listaContainer.innerHTML = '';

        notas.forEach(nota => {
            const card = document.createElement('div');
            card.className = 'nota-card';

            const span = document.createElement('span');
            span.textContent = nota.texto;
            card.appendChild(span);

            const btnEdit = document.createElement('button');
            btnEdit.className = 'btn-edit';
            btnEdit.textContent = 'Editar';
            btnEdit.addEventListener('click', () => iniciarEdicao(nota.id));
            card.appendChild(btnEdit);

            const btnDelete = document.createElement('button');
            btnDelete.className = 'btn-delete';
            btnDelete.textContent = 'Excluir';
            btnDelete.addEventListener('click', () => deletarNota(nota.id));
            card.appendChild(btnDelete);

            listaContainer.appendChild(card);
        });
    }

    function iniciarEdicao(id) {
        const notas = JSON.parse(localStorage.getItem('notas') || '[]');
        const nota = notas.find(n => n.id === id);
        if (!nota) return;

        areaTexto.value = nota.texto;
        editingId = id;
        btnSalvar.textContent = 'Salvar edição';
        btnCancelar.style.display = '';
        areaTexto.focus();
    }

    function cancelarEdicao() {
        editingId = null;
        areaTexto.value = '';
        btnSalvar.textContent = 'Salvar';
        btnCancelar.style.display = 'none';
    }

    function deletarNota(id) {
        let notas = JSON.parse(localStorage.getItem('notas') || '[]');
        notas = notas.filter(n => n.id !== id);
        localStorage.setItem('notas', JSON.stringify(notas));
        // se estivermos editando a nota deletada, cancelar edição
        if (editingId === id) cancelarEdicao();
        carregarNotas();
    }

    // expõe funções caso HTML use onclick inline (opcional)
    window.deletarNota = deletarNota;
    window.iniciarEdicao = iniciarEdicao;
});
// ...existing code...