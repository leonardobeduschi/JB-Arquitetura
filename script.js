// Dados estáticos de clientes e fornecedores
const clientes = [
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

const fornecedores = [
    { id: 1, empresa: 'Jeanete Beduschi Arquitetura', tipoPagamento: 'Celular', pix: '47 999837654', nomePix: 'Jeanete Aparecida Beduschi Iunes' },
    { id: 2, empresa: 'BC Glass', tipoPagamento: 'CPF', pix: '020.382.689-24', nomePix: 'Sanchaine Bordin de Mello' },
    { id: 3, empresa: 'VIDRAÇARIA CATARINENSE', tipoPagamento: 'Celular', pix: '47 988165137', nomePix: 'Vidraçaria e Esquadria de Aluminio Catarinense LTDA' },
    { id: 4, empresa: 'Hidrovolt', tipoPagamento: 'CNPJ', pix: '27.267.942/0001-97', nomePix: 'Hidrowolt' },
    { id: 5, empresa: 'Spagnolo Serviços Elétricos', tipoPagamento: 'CNPJ', pix: '36.311.619/0001-64', nomePix: 'Spagnolo Serviços Elétricos' },
    { id: 6, empresa: 'AS Construções', tipoPagamento: 'CNPJ', pix: '36.425.926/0001-76', nomePix: 'Adalmir da Silva' },
    { id: 7, empresa: 'Gyakom', tipoPagamento: 'CNPJ', pix: '32.625.136/0001-83', nomePix: 'Giakom Climatização e Aquecimento de Água' },
    { id: 8, empresa: 'Norte Sul Pinturas', tipoPagamento: 'Celular', pix: '(47) 99655-4445', nomePix: 'Norte Sul Pinturas' },
    { id: 9, empresa: 'MK Cabeceiras', tipoPagamento: 'CNPJ', pix: '47 999198226', nomePix: '' },
    { id: 10, empresa: 'Mobiliarium', tipoPagamento: 'CPF', pix: '836.127.859-15', nomePix: 'Fábio Gradowski Bueno' },
    { id: 11, empresa: 'Essence decor', tipoPagamento: 'CNPJ', pix: '23.296.579/0001-87', nomePix: 'Essence decor' },
    { id: 12, empresa: 'Construcolor', tipoPagamento: 'Email', pix: 'pix.006@construcolor.com.br', nomePix: 'Construcolor Comercio de Tintas LTDA' },
    { id: 13, empresa: 'Materiais Silva', tipoPagamento: 'CNPJ', pix: '27.023.857/0001-83', nomePix: 'Silva Materiais de Construção' },
    { id: 14, empresa: 'RBM Impermeabilização LTDA', tipoPagamento: 'CNPJ', pix: '40.700.376/0001-23', nomePix: 'RBM Impermeabilização LTDA' },
    { id: 15, empresa: 'Maninho Terra e Planagem', tipoPagamento: 'CNPJ', pix: '49.799.492/0001-16', nomePix: 'Maninho Terra e Planagem' },
    { id: 16, empresa: 'Rova Iluminação LTDA', tipoPagamento: 'CNPJ', pix: '33.096.672/0001-00', nomePix: 'Rova Iluminação' },
    { id: 17, empresa: 'MR Portas', tipoPagamento: 'Email', pix: 'comprasmrportas@gmail.com', nomePix: 'Mr Portas' },
    { id: 18, empresa: 'SC Gesso', tipoPagamento: 'Celular', pix: '47 991189298', nomePix: 'Sidnei Arnaldo Rosa' },
    { id: 19, empresa: 'Casa dos Colchões', tipoPagamento: 'CNPJ', pix: '04.268.542/0001-09', nomePix: 'Casa dos Colchões' },
    { id: 20, empresa: 'Via Decore', tipoPagamento: 'CNPJ', pix: '13.904.631/0001-87', nomePix: 'Via Decore LTDA' },
    { id: 21, empresa: 'Marmoraria Vitoria', tipoPagamento: 'CNPJ', pix: '11.158.559/0001-60', nomePix: 'MARCELO DA SILVA MARMORARIA IMPORT. E EXPORT. LTDA ME' },
    { id: 22, empresa: 'I cut laser', tipoPagamento: 'CNPJ', pix: '32.493.346/0001-65', nomePix: 'Marilene Coelho' },
    { id: 23, empresa: 'Casas da Água', tipoPagamento: 'CNPJ', pix: '13.501.187/0001-59', nomePix: 'Casas da Água Materiais para Construção LTDA' },
    { id: 24, empresa: "Viecelli's Reformas", tipoPagamento: 'CNPJ', pix: '33.385.588/0001-06', nomePix: 'REVESTCOR COMÉRCIO LTDA' },
    { id: 25, empresa: 'Volare Acabamentos', tipoPagamento: '', pix: '', nomePix: '' }
];

// Inicializa os dropdowns ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado, inicializando...');
    loadClientes('ordem');
    loadClientes('orcamento');
    loadFornecedores('ordem');
    loadFornecedores('orcamento');

    // Prevenir comportamento padrão do formulário
    document.getElementById('document-form').addEventListener('submit', (e) => e.preventDefault());
});

// Exibe o formulário com base no tipo de documento selecionado
function showForm() {
    const docType = document.getElementById('document-type').value;
    document.getElementById('ordem-form').style.display = docType === 'ordem-compra' || docType === 'ordem-servico' ? 'block' : 'none';
    document.getElementById('solicitacao-orcamento-form').style.display = docType === 'solicitacao-orcamento' ? 'block' : 'none';
    
    if (docType === 'ordem-compra' || docType === 'ordem-servico') {
        document.getElementById('ordem-title').textContent = docType === 'ordem-compra' ? 'Ordem de Compra' : 'Ordem de Serviço';
    }
}

// Carrega clientes no dropdown
function loadClientes(prefix) {
    const select = document.getElementById(`cliente-${prefix}`);
    select.innerHTML = prefix === 'orcamento' ? 
        '<option value="">Selecione um cliente (opcional)</option>' : 
        '<option value="">Selecione um cliente</option>';
    clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.id;
        option.textContent = cliente.nome;
        select.appendChild(option);
    });
    const outroOption = document.createElement('option');
    outroOption.value = 'outro';
    outroOption.textContent = 'Outro';
    select.appendChild(outroOption);
}

// Carrega fornecedores no dropdown
function loadFornecedores(prefix) {
    const select = document.getElementById(`fornecedor-select-${prefix}`);
    select.innerHTML = '<option value="">Selecione um fornecedor</option>';
    fornecedores.forEach(fornecedor => {
        const option = document.createElement('option');
        option.value = fornecedor.id;
        option.textContent = fornecedor.empresa;
        select.appendChild(option);
    });
    const outroOption = document.createElement('option');
    outroOption.value = 'outro';
    outroOption.textContent = 'Outro';
    select.appendChild(outroOption);
}

// Atualiza as informações do fornecedor
function updateFornecedorInfo(prefix) {
    const select = document.getElementById(`fornecedor-select-${prefix}`);
    const fornecedorManual = document.getElementById(`fornecedor-manual-${prefix}`);
    const selectedValue = select.value;

    if (selectedValue === 'outro') {
        fornecedorManual.style.display = 'block';
        fornecedorManual.value = '';
    } else {
        fornecedorManual.style.display = 'none';
        const fornecedor = fornecedores.find(f => f.id == selectedValue);
        if (fornecedor) {
            fornecedorManual.value = prefix === 'orcamento' ? 
                fornecedor.empresa : 
                `${fornecedor.empresa}${fornecedor.pix ? `\nPIX: ${fornecedor.pix} (${fornecedor.tipoPagamento})` : ''}${fornecedor.nomePix ? `\nNome PIX: ${fornecedor.nomePix}` : ''}`;
        } else {
            fornecedorManual.value = '';
        }
    }
}

// Atualiza o campo de cliente manual
function updateClienteInfo(prefix) {
    const select = document.getElementById(`cliente-${prefix}`);
    const clienteManual = document.getElementById(`cliente-manual-${prefix}`);
    const selectedValue = select.value;

    if (selectedValue === 'outro') {
        clienteManual.style.display = 'block';
        clienteManual.value = '';
    } else {
        clienteManual.style.display = 'none';
        clienteManual.value = '';
    }
}

// Adiciona nova linha de item
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

// Remove uma linha de item
function removeItemRow(button) {
    button.parentElement.remove();
}



// Coleta dados do formulário de Ordem de Compra/Serviço
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

    const clienteSelect = document.getElementById('cliente-ordem').value;
    const clienteManual = document.getElementById('cliente-manual-ordem').value;

    return {
        tipo: document.getElementById('document-type').value === 'ordem-compra' ? 'Ordem de Compra' : 'Ordem de Serviço',
        clienteId: clienteSelect === 'outro' ? 'manual' : clienteSelect,
        clienteManual: clienteSelect === 'outro' ? clienteManual : '',
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

// Coleta dados do formulário de Solicitação de Orçamento
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

    const clienteSelect = document.getElementById('cliente-orcamento').value;
    const clienteManual = document.getElementById('cliente-manual-orcamento').value;

    return {
        tipo: 'Solicitação de Orçamento',
        clienteId: clienteSelect === 'outro' ? 'manual' : clienteSelect,
        clienteManual: clienteSelect === 'outro' ? clienteManual : '',
        nomeArquivo: document.getElementById('nome-arquivo-orcamento').value,
        data: document.getElementById('data-orcamento').value,
        fornecedor: document.getElementById('fornecedor-manual-orcamento').value,
        items
    };
}

// Gera o HTML do documento
function generateDocumentHTML(data) {
    const isOrdem = data.tipo !== 'Solicitação de Orçamento';
    const grandTotal = isOrdem ? data.items.reduce((sum, item) => sum + parseFloat(item.total), 0).toFixed(2) : null;

    // Obter nome do cliente
    let clienteNome = '';
    if (data.clienteId === 'manual' && data.clienteManual) {
        clienteNome = data.clienteManual;
    } else if (data.clienteId) {
        const cliente = clientes.find(c => c.id == data.clienteId);
        clienteNome = cliente ? cliente.nome : '';
    }

    // Definir cabeçalhos da tabela
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
            if (hasLink) row.push(item.link ? `<a href="${item.link}" target="_blank">Link</a>` : '');
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

    // Montar HTML da tabela
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

    // Função auxiliar para renderizar campos
    const campo = (label, valor) => valor ? `<label>${label}</label><span>${valor}</span>` : '';
    const campoParagrafo = (label, valor) => valor ? `<label>${label}</label><p>${valor}</p>` : '';

    // HTML completo do documento
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
                    box-sizing: border-box;
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
                    word-wrap: break-word;
                }
                .table-section {
                    margin-bottom: 30px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 10px;
                    table-layout: fixed;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 12px;
                    text-align: left;
                    font-size: 14px;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                }
                th {
                    background-color: #d4a373;
                    color: #fff;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                tr {
                    min-height: 40px;
                }
                tr:nth-child(even) {
                    background-color: #f9f9f9;
                }
                td a {
                    color: #d4a373;
                    text-decoration: underline;
                    cursor: pointer;
                }
                td a:hover {
                    color: #b88a5a;
                }
                .fornecedor-box {
                    background: #faf5f0;
                    border-left: 5px solid #d4a373;
                    padding: 15px;
                    margin-top: 15px;
                    border-radius: 5px;
                    word-wrap: break-word;
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
                    <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAH0AfQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD6pooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiig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RQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH//2Q==" alt="Logo da Empresa">
                    <h1>${data.tipo}</h1>
                </div>

                <div class="info-section">
                    <div>
                        ${isOrdem ? campo('Número do Pedido', data.numeroPedido) : ''}
                        ${campo('Data', data.data ? data.data.split('-').reverse().join('/') : '')}
                        ${clienteNome ? campo('Cliente', clienteNome) : ''}
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

// Gera e salva HTML
function generateAndSaveHTML(type) {
    const data = type === 'orcamento' ? collectOrcamentoFormData() : collectOrdemFormData();
    if (!data.items.length) {
        alert('Por favor, adicione pelo menos um item.');
        return;
    }
    if (!data.fornecedor) {
        alert('Por favor, preencha as informações do fornecedor.');
        return;
    }
    if (type !== 'orcamento' && !data.clienteId && !data.clienteManual) {
        alert('Por favor, selecione um cliente ou insira o nome manualmente.');
        return;
    }

    const documentHTML = generateDocumentHTML(data);
    const fileName = data.nomeArquivo ? `${data.nomeArquivo}.html` : `${data.tipo.replace(/ /g, '_')}_${data.numeroPedido || data.data || 'SemNumero'}.html`;
    const blob = new Blob([documentHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    alert('Documento gerado e salvo com sucesso!');
}

// Pré-visualiza documento
function previewDocument(type) {
    const data = type === 'orcamento' ? collectOrcamentoFormData() : collectOrdemFormData();
    if (!data.items.length) {
        alert('Por favor, adicione pelo menos um item.');
        return;
    }
    if (!data.fornecedor) {
        alert('Por favor, preencha as informações do fornecedor.');
        return;
    }
    if (type !== 'orcamento' && !data.clienteId && !data.clienteManual) {
        alert('Por favor, selecione um cliente ou insira o nome manualmente.');
        return;
    }

    const documentHTML = generateDocumentHTML(data);
    document.getElementById('preview-title').textContent = `Pré-visualização da ${data.tipo}`;
    document.getElementById('preview-content').innerHTML = documentHTML;
    document.getElementById('preview-modal').style.display = 'block';
}

// Fecha o modal
function closeModal() {
    document.getElementById('preview-modal').style.display = 'none';
    document.getElementById('preview-content').innerHTML = '';
}
