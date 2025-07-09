// ------------------- IndexedDB Setup -------------------

let db;
const dbRequest = indexedDB.open('documentosDB', 1);

dbRequest.onupgradeneeded = function(event) {
    db = event.target.result;
    if (!db.objectStoreNames.contains('clientes')) {
        const clientesStore = db.createObjectStore('clientes', { keyPath: 'id' });
        clientesStore.createIndex('nome', 'nome', { unique: false });
    }
    if (!db.objectStoreNames.contains('fornecedores')) {
        db.createObjectStore('fornecedores', { keyPath: 'id' });
    }
    if (!db.objectStoreNames.contains('documentos')) {
        const documentosStore = db.createObjectStore('documentos', { keyPath: 'id' });
        documentosStore.createIndex('clienteId', 'clienteId', { unique: false });
    }
};

dbRequest.onsuccess = function(event) {
    db = event.target.result;
    initStorage();
    loadClientes('ordem');
    loadClientes('orcamento');
    loadClientes('documentos');
    loadFornecedores('ordem');
    loadFornecedores('orcamento');
    listClientes();
};

dbRequest.onerror = function(event) {
    console.error('Erro ao abrir IndexedDB:', event.target.error);
};

// ------------------- Funções Comuns -------------------

// Alterna entre seções do menu
function showSection(section) {
    document.getElementById('gerar-section').style.display = section === 'gerar' ? 'block' : 'none';
    document.getElementById('documentos-section').style.display = section === 'documentos' ? 'block' : 'none';
    document.getElementById('clientes-section').style.display = section === 'clientes' ? 'block' : 'none';
    if (section === 'clientes') listClientes();
}

// Exibe o formulário com base no tipo de documento selecionado
function showForm() {
    const docType = document.getElementById('document-type').value;
    document.getElementById('ordem-form').style.display = docType === 'ordem-compra' || docType === 'ordem-servico' ? 'block' : 'none';
    document.getElementById('solicitacao-orcamento-form').style.display = docType === 'solicitacao-orcamento' ? 'block' : 'none';
    
    if (docType === 'ordem-compra' || docType === 'ordem-servico') {
        document.getElementById('ordem-title').textContent = docType === 'ordem-compra' ? 'Ordem de Compra' : 'Ordem de Serviço';
    }
}

// Dados iniciais
const initialClientes = [
    { id: 1, nome: 'Márcia Marlene Marczewski', documento: 'CNPJ', numeroDocumento: '23.296.579.0001-87', pix: '23.296.579.0001-87', chavePix: '', telefone: '(47)99649-5006', endereco: '' },
    { id: 2, nome: 'Condomínio Edifício Fabimar', documento: 'CNPJ', numeroDocumento: '03.688.491/0001-10', pix: '', chavePix: '', telefone: '', endereco: 'Rua 902, número 178 , Centro, Balneário Camboriú (SC)' },
    { id: 3, nome: 'Francisca Celia Spanholi', documento: 'CPF', numeroDocumento: '555.419.099-53', pix: '', chavePix: '', telefone: '', endereco: 'Av. Brasil 3551 / edif. Le majestic apto 3203, Balneário Camboriú (SC)' },
    { id: 4, nome: 'Silvana Mussi', documento: 'CPF', numeroDocumento: '371.640.749-68', pix: '', chavePix: '', telefone: '', endereco: 'Rua 1950, número 40, Centro, Balneário Camboriú (SC)' },
    { id: 5, nome: 'Cristiano Gonzaga da Silva', documento: 'CPF', numeroDocumento: '910.914.629-68', pix: '', chavePix: '', telefone: '', endereco: 'Rua Morretes, número 236, bairro Ipanema, Pontal do Paraná (PR)' },
    { id: 6, nome: 'Tatiane Daniela Rodrigues Corrêa', documento: 'CPF', numeroDocumento: '003.441.699-44', pix: '', chavePix: '', telefone: '', endereco: '' },
    { id: 7, nome: 'Condomínio Alliança', documento: '', numeroDocumento: '', pix: '', chavePix: '', telefone: '', endereco: '' },
    { id: 8, nome: 'Condomínio Fabimar', documento: '', numeroDocumento: '', pix: '', chavePix: '', telefone: '', endereco: '' },
    { id: 9, nome: 'Jumar', documento: '', numeroDocumento: '', pix: '', chavePix: '', telefone: '', endereco: '' },
    { id: 10, nome: 'Gerdelina', documento: '', numeroDocumento: '', pix: '', chavePix: '', telefone: '', endereco: '' },
    { id: 11, nome: 'Collina di Napoli', documento: '', numeroDocumento: '', pix: '', chavePix: '', telefone: '', endereco: '' },
    { id: 12, nome: 'Mont Blanc', documento: '', numeroDocumento: '', pix: '', chavePix: '', telefone: '', endereco: '' },
    { id: 13, nome: 'Rossini', documento: '', numeroDocumento: '', pix: '', chavePix: '', telefone: '', endereco: '' },
    { id: 14, nome: 'Apollo', documento: '', numeroDocumento: '', pix: '', chavePix: '', telefone: '', endereco: '' },
    { id: 15, nome: 'Maiara', documento: '', numeroDocumento: '', pix: '', chavePix: '', telefone: '', endereco: '' },
    { id: 16, nome: 'Roberto Mafra', documento: '', numeroDocumento: '', pix: '', chavePix: '', telefone: '', endereco: '' },
    { id: 17, nome: 'Roberta Voltolini', documento: '', numeroDocumento: '', pix: '', chavePix: '', telefone: '', endereco: '' },
    { id: 18, nome: 'Le Majestic', documento: '', numeroDocumento: '', pix: '', chavePix: '', telefone: '', endereco: '' }
];

const initialFornecedores = [
    { id: 1, empresa: 'BC Glass', tipoPagamento: '', pix: '' },
    { id: 2, empresa: 'VIDRAÇARIA CATARINENSE', tipoPagamento: '', pix: '' },
    { id: 3, empresa: 'Hidrovolt', tipoPagamento: '', pix: '' },
    { id: 4, empresa: 'Spagnolo Serviços Elétricos', tipoPagamento: 'CNPJ', pix: '36.311.619/0001-64' },
    { id: 5, empresa: 'AS Construções', tipoPagamento: 'CNPJ', pix: '36.425.926/0001-76' },
    { id: 6, empresa: 'Gyakom', tipoPagamento: 'CNPJ', pix: '32.625.136/0001-83' },
    { id: 7, empresa: 'Norte Sul Pinturas', tipoPagamento: 'Celular', pix: '(47) 99655-4445' },
    { id: 8, empresa: 'MK Cabeceiras', tipoPagamento: 'Celular', pix: '(47) 99919-8226' },
    { id: 9, empresa: 'Mobiliarium', tipoPagamento: 'CPF', pix: '836.127.859-15' },
    { id: 10, empresa: 'Essence decor', tipoPagamento: 'CNPJ', pix: '23.296.579/0001-87' },
    { id: 11, empresa: 'Construcolor', tipoPagamento: '', pix: '' },
    { id: 12, empresa: 'Materiais Silva', tipoPagamento: 'CNPJ', pix: '27.023.857/0001-83' },
    { id: 13, empresa: 'RBM Impermeabilização LTDA', tipoPagamento: 'CNPJ', pix: '40.700.376/0001-16' },
    { id: 14, empresa: 'Maninho Terra e Planagem', tipoPagamento: 'CNPJ', pix: '49.799.492/0001-16' },
    { id: 15, empresa: 'Rova Iluminação LTDA', tipoPagamento: 'CNPJ', pix: '33.096.672/0001-00' },
    { id: 16, empresa: 'MR Portas', tipoPagamento: 'Email', pix: 'comprasmrportas@gmail.com' },
    { id: 17, empresa: 'Sidnei Arnaldo Rosa', tipoPagamento: '', pix: '' },
    { id: 18, empresa: 'Casa dos Colchões', tipoPagamento: 'CNPJ', pix: '04.268.542/0001-09' },
    { id: 19, empresa: 'Via Decore', tipoPagamento: '', pix: '' }
];

// Inicializa dados no IndexedDB
function initStorage() {
    const transaction = db.transaction(['clientes', 'fornecedores'], 'readwrite');
    const clientesStore = transaction.objectStore('clientes');
    const fornecedoresStore = transaction.objectStore('fornecedores');

    initialClientes.forEach(cliente => {
        clientesStore.put(cliente);
    });
    initialFornecedores.forEach(fornecedor => {
        fornecedoresStore.put(fornecedor);
    });
}

// Função para carregar clientes no dropdown
function loadClientes(prefix) {
    const select = document.getElementById(`cliente-${prefix}`);
    select.innerHTML = '<option value="">Selecione um cliente</option>';
    const transaction = db.transaction(['clientes'], 'readonly');
    const store = transaction.objectStore('clientes');
    const request = store.getAll();

    request.onsuccess = function() {
        request.result.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.id;
            option.textContent = cliente.nome;
            select.appendChild(option);
        });
    };
}

// Função para carregar fornecedores no dropdown
function loadFornecedores(prefix) {
    const select = document.getElementById(`fornecedor-select-${prefix}`);
    select.innerHTML = '<option value="">Selecione um fornecedor</option>';
    const transaction = db.transaction(['fornecedores'], 'readonly');
    const store = transaction.objectStore('fornecedores');
    const request = store.getAll();

    request.onsuccess = function() {
        request.result.forEach(fornecedor => {
            const option = document.createElement('option');
            option.value = fornecedor.id;
            option.textContent = fornecedor.empresa;
            select.appendChild(option);
        });
        const outroOption = document.createElement('option');
        outroOption.value = 'outro';
        outroOption.textContent = 'Outro';
        select.appendChild(outroOption);
    };
}

// Função para atualizar as informações do fornecedor
function updateFornecedorInfo(prefix) {
    const select = document.getElementById(`fornecedor-select-${prefix}`);
    const fornecedorManual = document.getElementById(`fornecedor-manual-${prefix}`);
    const selectedValue = select.value;

    if (selectedValue === 'outro') {
        fornecedorManual.style.display = 'block';
        fornecedorManual.value = '';
    } else {
        fornecedorManual.style.display = 'none';
        const transaction = db.transaction(['fornecedores'], 'readonly');
        const store = transaction.objectStore('fornecedores');
        const request = store.get(Number(selectedValue));

        request.onsuccess = function() {
            const fornecedor = request.result;
            if (fornecedor) {
                if (prefix === 'orcamento') {
                    fornecedorManual.value = fornecedor.empresa;
                } else {
                    fornecedorManual.value = `${fornecedor.empresa}${fornecedor.pix ? `\nPIX: ${fornecedor.pix} (${fornecedor.tipoPagamento})` : ''}`;
                }
            } else {
                fornecedorManual.value = '';
            }
        };
    }
}

// Função para adicionar nova linha de item
function addItemRow(type) {
    const container = document.getElementById(`items-container${type === 'orcamento' ? '-orcamento' : ''}`);
    const newRow = document.createElement('div');
    newRow.className = 'item-row';
    if (type === 'orcamento') {
        newRow.innerHTML = `
            <input type="text" class="item-num" placeholder="Item (Ex: 1)">
            <input type="text" class="item-desc" placeholder="Descrição">
            <input type="number" min="0" class="item-qty" placeholder="Quantidade">
            <input type="text" class="item-link" placeholder="Link (opcional)">
            <input type="text" class="item-medida" placeholder="Medida (opcional)">
            <input type="text" class="item-imagem" placeholder="URL da Imagem (opcional)">
            <button type="button" onclick="removeItemRow(this)">Remover</button>
        `;
    } else {
        newRow.innerHTML = `
            <input type="text" class="item-num" placeholder="Item (Ex: 1)">
            <input type="text" class="item-desc" placeholder="Descrição">
            <input type="number" min="0" class="item-qty" placeholder="Quantidade">
            <input type="number" step="0.01" min="0" class="item-unit-price" placeholder="Valor Unitário">
            <button type="button" onclick="removeItemRow(this)">Remover</button>
        `;
    }
    container.appendChild(newRow);
}

// Função para remover uma linha de item
function removeItemRow(button) {
    button.parentElement.remove();
}

// ------------------- Gerenciamento de Clientes -------------------

function addCliente() {
    const nome = document.getElementById('cliente-nome').value;
    if (!nome) {
        alert('Por favor, preencha o nome do cliente.');
        return;
    }

    const cliente = {
        id: Date.now(), // ID único baseado no timestamp
        nome,
        documento: document.getElementById('cliente-documento').value,
        numeroDocumento: document.getElementById('cliente-numero-documento').value,
        pix: document.getElementById('cliente-pix').value,
        chavePix: document.getElementById('cliente-chave-pix').value,
        telefone: document.getElementById('cliente-telefone').value,
        endereco: document.getElementById('cliente-endereco').value
    };

    const transaction = db.transaction(['clientes'], 'readwrite');
    const store = transaction.objectStore('clientes');
    store.put(cliente);

    transaction.oncomplete = function() {
        document.getElementById('cliente-form').reset();
        loadClientes('ordem');
        loadClientes('orcamento');
        loadClientes('documentos');
        listClientes();
        alert('Cliente adicionado com sucesso!');
    };
}

function listClientes() {
    const lista = document.getElementById('clientes-lista');
    lista.innerHTML = '';
    const transaction = db.transaction(['clientes'], 'readonly');
    const store = transaction.objectStore('clientes');
    const request = store.getAll();

    request.onsuccess = function() {
        const clientes = request.result;
        const ul = document.createElement('ul');
        clientes.forEach(cliente => {
            const li = document.createElement('li');
            li.textContent = cliente.nome;
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.onclick = () => editCliente(cliente.id);
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.onclick = () => deleteCliente(cliente.id);
            li.appendChild(editButton);
            li.appendChild(deleteButton);
            ul.appendChild(li);
        });
        lista.appendChild(ul);
    };
}

function editCliente(id) {
    const transaction = db.transaction(['clientes'], 'readwrite');
    const store = transaction.objectStore('clientes');
    const request = store.get(id);

    request.onsuccess = function() {
        const cliente = request.result;
        document.getElementById('cliente-nome').value = cliente.nome;
        document.getElementById('cliente-documento').value = cliente.documento;
        document.getElementById('cliente-numero-documento').value = cliente.numeroDocumento;
        document.getElementById('cliente-pix').value = cliente.pix;
        document.getElementById('cliente-chave-pix').value = cliente.chavePix;
        document.getElementById('cliente-telefone').value = cliente.telefone;
        document.getElementById('cliente-endereco').value = cliente.endereco;

        const addButton = document.getElementById('cliente-form').querySelector('button');
        addButton.textContent = 'Salvar Alterações';
        addButton.onclick = () => saveEditedCliente(id);
    };
}

function saveEditedCliente(id) {
    const cliente = {
        id,
        nome: document.getElementById('cliente-nome').value,
        documento: document.getElementById('cliente-documento').value,
        numeroDocumento: document.getElementById('cliente-numero-documento').value,
        pix: document.getElementById('cliente-pix').value,
        chavePix: document.getElementById('cliente-chave-pix').value,
        telefone: document.getElementById('cliente-telefone').value,
        endereco: document.getElementById('cliente-endereco').value
    };

    if (!cliente.nome) {
        alert('Por favor, preencha o nome do cliente.');
        return;
    }

    const transaction = db.transaction(['clientes'], 'readwrite');
    const store = transaction.objectStore('clientes');
    store.put(cliente);

    transaction.oncomplete = function() {
        document.getElementById('cliente-form').reset();
        const addButton = document.getElementById('cliente-form').querySelector('button');
        addButton.textContent = 'Adicionar Cliente';
        addButton.onclick = addCliente;
        loadClientes('ordem');
        loadClientes('orcamento');
        loadClientes('documentos');
        listClientes();
        alert('Cliente atualizado com sucesso!');
    };
}

function deleteCliente(id) {
    if (!confirm('Tem certeza que deseja excluir este cliente? Os documentos associados não serão excluídos.')) return;

    const transaction = db.transaction(['clientes'], 'readwrite');
    const store = transaction.objectStore('clientes');
    store.delete(id);

    transaction.oncomplete = function() {
        loadClientes('ordem');
        loadClientes('orcamento');
        loadClientes('documentos');
        listClientes();
        alert('Cliente excluído com sucesso!');
    };
}

// ------------------- Coleta de Dados -------------------

function collectOrdemFormData() {
    const items = [];
    document.querySelectorAll('#items-container .item-row').forEach(row => {
        const num = row.querySelector('.item-num').value;
        const desc = row.querySelector('.item-desc').value;
        const qty = row.querySelector('.item-qty').value;
        const unitPrice = row.querySelector('.item-unit-price').value;
        if (num && desc && qty && unitPrice) {
            const total = (parseFloat(qty) * parseFloat(unitPrice)).toFixed(2);
            items.push({ num, desc, qty, unitPrice, total });
        }
    });

    return {
        tipo: document.getElementById('document-type').value === 'ordem-compra' ? 'Ordem de Compra' : 'Ordem de Serviço',
        clienteId: document.getElementById('cliente-ordem').value,
        nomeArquivo: document.getElementById('nome-arquivo').value,
        numeroPedido: document.getElementById('numero-pedido').value,
        data: document.getElementById('data').value,
        obra: document.getElementById('obra').value,
        ref: document.getElementById('ref').value,
        fornecedor: document.getElementById('fornecedor-manual-ordem').value,
        fornecedorDetalhes: document.getElementById('fornecedor-detalhes-ordem').value,
        items
    };
}

function collectOrcamentoFormData() {
    const items = [];
    document.querySelectorAll('#items-container-orcamento .item-row').forEach(row => {
        const num = row.querySelector('.item-num').value;
        const desc = row.querySelector('.item-desc').value;
        const qty = row.querySelector('.item-qty').value;
        const link = row.querySelector('.item-link').value;
        const medida = row.querySelector('.item-medida').value;
        const imagem = row.querySelector('.item-imagem').value;
        if (num && desc) {
            items.push({ num, desc, qty, link, medida, imagem });
        }
    });

    return {
        tipo: 'Solicitação de Orçamento',
        clienteId: document.getElementById('cliente-orcamento').value,
        nomeArquivo: document.getElementById('nome-arquivo-orcamento').value,
        data: document.getElementById('data-orcamento').value,
        fornecedor: document.getElementById('fornecedor-manual-orcamento').value,
        items
    };
}

// ------------------- Geração de Documentos -------------------

function generateDocumentHTML(data) {
    const isOrdem = data.tipo !== 'Solicitação de Orçamento';
    const grandTotal = isOrdem ? data.items.reduce((sum, item) => sum + parseFloat(item.total), 0).toFixed(2) : null;

    // Obter nome do cliente
    let clienteNome = 'Cliente Não Especificado';
    const transaction = db.transaction(['clientes'], 'readonly');
    const store = transaction.objectStore('clientes');
    const request = store.get(Number(data.clienteId));

    request.onsuccess = function() {
        const cliente = request.result;
        if (cliente) clienteNome = cliente.nome;
    };

    let headers = isOrdem ? ['Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Valor Total'] : ['Item', 'Descrição'];
    let tableData = [];
    if (!isOrdem) {
        const hasQty = data.items.some(item => item.qty);
        const hasLink = data.items.some(item => item.link);
        const hasMedida = data.items.some(item => item.medida);
        const hasImagem = data.items.some(item => item.imagem);
        if (hasQty) headers.push('Quantidade');
        if (hasLink) headers.push('Link');
        if (hasMedida) headers.push('Medida');
        if (hasImagem) headers.push('Imagem');
        tableData = data.items.map(item => {
            const row = [item.num, item.desc];
            if (hasQty) row.push(item.qty || '');
            if (hasLink) row.push(item.link ? `<a href="${item.link}" target="_blank">${item.link}</a>` : '');
            if (hasMedida) row.push(item.medida || '');
            if (hasImagem) row.push(item.imagem ? `<img src="${item.imagem}" alt="Imagem" style="max-width: 100px; max-height: 100px;" />` : '');
            return row;
        });
    } else {
        tableData = data.items.map(item => [
            item.num,
            item.desc,
            item.qty,
            `R$ ${parseFloat(item.unitPrice).toFixed(2).replace('.', ',')}`,
            `R$ ${item.total.replace('.', ',')}`
        ]);
    }

    const tablesHTML = `
        <div class="table-section">
            <table>
                <thead>
                    <tr>
                        ${headers.map(h => `<th>${h}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${tableData.map(row => `
                        <tr>
                            ${row.map(cell => `<td>${cell}</td>`).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            ${isOrdem ? `
                <div class="fornecedor-box">
                    <h4>Fornecedor</h4>
                    <div>${data.fornecedor.replace(/\n/g, '<br>')}</div>
                    ${data.fornecedorDetalhes ? `<div>Detalhes Adicionais: ${data.fornecedorDetalhes.replace(/\n/g, '<br>')}</div>` : ''}
                    <div class="total">Subtotal: R$ ${grandTotal.replace('.', ',')}</div>
                </div>
            ` : `
                <div class="fornecedor-box">
                    <h4>Fornecedor</h4>
                    <div>${data.fornecedor}</div>
                </div>
            `}
        </div>
    `;

    const campo = (label, valor) => valor ? `<label>${label}</label><span>${valor}</span>` : '';
    const campoParagrafo = (label, valor) => valor ? `<label>${label}</label><p>${valor}</p>` : '';

    return `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>${data.tipo}</title>
            <style>
                body {
                    font-family: 'Century Gothic', Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                }
                .container {
                    background-color: #fff;
                    width: 800px;
                    padding: 40px;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                    border-radius: 10px;
                    margin: 20px;
                }
                .header {
                    text-align: center;
                    border-bottom: 2px solid #d4a373;
                    padding-bottom: 20px;
                    margin-bottom: 30px;
                }
                .header img {
                    max-width: 150px;
                    height: auto;
                }
                .header h1 {
                    font-size: 24px;
                    color: #333;
                    margin: 10px 0;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                }
                .info-section {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 30px;
                }
                .info-section div {
                    width: 45%;
                }
                .info-section label {
                    font-weight: bold;
                    color: #555;
                    display: block;
                    margin-bottom: 10px;
                }
                .info-section span, .info-section p {
                    font-size: 14px;
                    color: #333;
                    line-height: 1.6;
                }
                .table-section {
                    margin-bottom: 30px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 10px;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 12px;
                    text-align: left;
                    font-size: 14px;
                }
                th {
                    background-color: #d4a373;
                    color: #fff;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                tr:nth-child(even) {
                    background-color: #f9f9f9;
                }
                .fornecedor-box {
                    background: #faf5f0;
                    border-left: 5px solid #d4a373;
                    padding: 15px;
                    margin-top: 15px;
                    border-radius: 5px;
                }
                .fornecedor-box h4 {
                    margin: 0 0 5px;
                    font-size: 16px;
                    color: #b88a5a;
                }
                .total {
                    font-size: 18px;
                    font-weight: bold;
                    color: #333;
                    text-align: right;
                    margin-top: 10px;
                }
                @media print {
                    body { background-color: #fff; }
                    .container { box-shadow: none; margin: 0; width: 100%; }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="assets/logo-placeholder.png" alt="Logo da Empresa">
                    <h1>${data.tipo}</h1>
                </div>

                <div class="info-section">
                    <div>
                        ${isOrdem ? campo('Número do Pedido', data.numeroPedido) : ''}
                        ${campo('Data', data.data ? data.data.split('-').reverse().join('/') : '')}
                        ${campo('Cliente', clienteNome)}
                    </div>
                    <div>
                        ${isOrdem ? campoParagrafo('Obra', data.obra.replace(/\n/g, '<br>')) : ''}
                        ${isOrdem ? campo('Referência', data.ref) : ''}
                    </div>
                </div>

                ${tablesHTML}

                ${isOrdem ? `
                    <div class="total">
                        Valor Total Geral: R$ ${grandTotal.replace('.', ',')}
                    </div>
                ` : ''}
            </div>
        </body>
        </html>
    `;
}

// Função para salvar documento no IndexedDB
function saveDocument(data, html) {
    const transaction = db.transaction(['documentos'], 'readwrite');
    const store = transaction.objectStore('documentos');
    const documento = {
        id: Date.now(),
        clienteId: Number(data.clienteId),
        tipo: data.tipo,
        nomeArquivo: data.nomeArquivo || `${data.tipo.replace(/ /g, '_')}_${data.numeroPedido || data.data || 'SemNumero'}`,
        html,
        dataCriacao: new Date().toISOString()
    };
    store.put(documento);
}

// Função para gerar e salvar HTML
function generateAndSaveHTML(type) {
    const data = type === 'orcamento' ? collectOrcamentoFormData() : collectOrdemFormData();
    if (!data.items.length || !data.fornecedor || !data.clienteId) {
        alert('Por favor, preencha pelo menos um item, as informações do fornecedor e selecione um cliente.');
        return;
    }
    const documentHTML = generateDocumentHTML(data);
    saveDocument(data, documentHTML);
    const fileName = data.nomeArquivo ? `${data.nomeArquivo}.html` : `${data.tipo.replace(/ /g, '_')}_${data.numeroPedido || data.data || 'SemNumero'}.html`;
    const blob = new Blob([documentHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
}

// Função para abrir o modal de pré-visualização
function previewDocument(type) {
    const data = type === 'orcamento' ? collectOrcamentoFormData() : collectOrdemFormData();
    if (!data.items.length || !data.fornecedor || !data.clienteId) {
        alert('Por favor, preencha pelo menos um item, as informações do fornecedor e selecione um cliente.');
        return;
    }
    document.getElementById('preview-title').textContent = `Pré-visualização da ${data.tipo}`;
    const documentHTML = generateDocumentHTML(data);
    document.getElementById('preview-content').innerHTML = documentHTML;
    document.getElementById('preview-modal').style.display = 'block';
}

// Função para fechar o modal
function closeModal() {
    document.getElementById('preview-modal').style.display = 'none';
}

// Função para listar documentos por cliente
function listDocuments() {
    const clienteId = document.getElementById('cliente-documentos').value;
    const lista = document.getElementById('documentos-lista');
    lista.innerHTML = '';
    if (!clienteId) return;

    const transaction = db.transaction(['clientes', 'documentos'], 'readonly');
    const clientesStore = transaction.objectStore('clientes');
    const documentosStore = transaction.objectStore('documentos');
    const clienteRequest = clientesStore.get(Number(clienteId));
    const documentosRequest = documentosStore.index('clienteId').getAll(Number(clienteId));

    clienteRequest.onsuccess = function() {
        const cliente = clienteRequest.result;
        const clienteNome = cliente ? cliente.nome : 'Cliente Desconhecido';

        documentosRequest.onsuccess = function() {
            const documentos = documentosRequest.result;
            if (documentos.length === 0) {
                lista.innerHTML = `<p>Nenhum documento encontrado para ${clienteNome}.</p>`;
                return;
            }

            const ul = document.createElement('ul');
            documentos.forEach(doc => {
                const li = document.createElement('li');
                const link = document.createElement('a');
                link.href = '#';
                link.textContent = `${doc.tipo} - ${doc.nomeArquivo} (Criado em: ${new Date(doc.dataCriacao).toLocaleString('pt-BR')})`;
                link.onclick = (e) => {
                    e.preventDefault();
                    document.getElementById('preview-title').textContent = `Visualizando ${doc.tipo}`;
                    document.getElementById('preview-content').innerHTML = doc.html;
                    document.getElementById('preview-modal').style.display = 'block';
                };
                const downloadLink = document.createElement('a');
                downloadLink.href = URL.createObjectURL(new Blob([doc.html], { type: 'text/html' }));
                downloadLink.download = `${doc.nomeArquivo}.html`;
                downloadLink.textContent = ' [Baixar]';
                li.appendChild(link);
                li.appendChild(downloadLink);
                ul.appendChild(li);
            });
            lista.appendChild(ul);
        };
    };
}