let clientes = [];
let fornecedores = [];
let supabaseClient;

async function initSupabase() {
    try {
        supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.key);

        const { data: clientesData } = await supabaseClient.from('clientes').select('*');
        const { data: fornecedoresData } = await supabaseClient.from('fornecedores').select('*');

        clientes = clientesData || [];
        fornecedores = fornecedoresData || [];

        return true;
    } catch (error) {
        console.error('Erro:', error);
        return false;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await initSupabase();
    loadClientes('ordem');
    loadClientes('orcamento');
    loadFornecedores('ordem');
    loadFornecedores('orcamento');
    document.getElementById('document-form').addEventListener('submit', (e) => e.preventDefault());
});


// Exibe o formulário com base no tipo de documento selecionado
function showForm() {
    const docType = document.getElementById('document-type').value;
    document.getElementById('ordem-form').style.display = docType === 'ordem-compra' || docType === 'ordem-servico' ? 'block' : 'none';
    document.getElementById('solicitacao-orcamento-form').style.display = docType === 'solicitacao-orcamento' ? 'block' : 'none';
    document.getElementById('diario-obras-form').style.display = docType === 'diario-obras' ? 'block' : 'none';

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

    // ORDENAR EM ORDEM ALFABÉTICA
    const clientesOrdenados = [...clientes].sort((a, b) =>
        a.nome.localeCompare(b.nome, 'pt-BR')
    );

    clientesOrdenados.forEach(cliente => {
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

    // ORDENAR EM ORDEM ALFABÉTICA
    const fornecedoresOrdenados = [...fornecedores].sort((a, b) =>
        a.empresa.localeCompare(b.empresa, 'pt-BR')
    );

    fornecedoresOrdenados.forEach(fornecedor => {
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
            let infoTexto = fornecedor.empresa;
            if (fornecedor.pix) {
                infoTexto += `\nPIX: ${fornecedor.pix}`;
                if (fornecedor.tipoPagamento) {
                    infoTexto += ` (${fornecedor.tipoPagamento})`;
                }
            }
            if (fornecedor.nomePix) {
                infoTexto += `\nNome PIX: ${fornecedor.nomePix}`;
            }
            fornecedorManual.value = infoTexto;
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
    const container = document.getElementById(type === 'orcamento' ? 'items-container-orcamento' : type === 'diario' ? 'pessoal-container' : 'items-container');
    const newRow = document.createElement('div');
    newRow.className = 'item-row';
    if (type === 'orcamento') {
        newRow.innerHTML = `
            <input type="text" class="item-num" placeholder="Item (Ex: 1)">
            <input type="text" class="item-desc" placeholder="Descrição">
            <input type="text" class="item-desc-compl" placeholder="Descrição Complementar (opcional)">
            <input type="number" min="0" class="item-qty" placeholder="Quantidade">
            <input type="text" class="item-link" placeholder="Link (opcional)">
            <input type="text" class="item-medida" placeholder="Medida (opcional)">
            <div style="display:flex; flex-direction:column; gap:5px; flex:2;">
                <input type="text" class="item-imagem" placeholder="Ou URL da Imagem">
                <input type="file" class="item-imagem-file" accept="image/*">
            </div>
            <button type="button" onclick="removeItemRow(this)">Remover</button>
        `;
    } else if (type === 'diario') {
        newRow.innerHTML = `
            <input type="text" class="item-desc" placeholder="Descrição">
            <input type="number" min="0" class="item-qty" placeholder="Quantidade">
            <input type="text" class="item-nomes" placeholder="Nomes">
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

function removeItemRow(button) {
    const container = button.parentElement.parentElement;
    if (container.querySelectorAll('.item-row').length > 1) {
        button.parentElement.remove();
    }
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
        clienteManual,
        nomeArquivo: document.getElementById('nome-arquivo').value,
        numeroPedido: document.getElementById('numero-pedido').value,
        data: document.getElementById('data').value,
        obra: document.getElementById('obra').value,
        ref: document.getElementById('ref').value,
        items,
        fornecedor: document.getElementById('fornecedor-select-ordem').value === 'outro' ?
            document.getElementById('fornecedor-manual-ordem').value :
            document.getElementById('fornecedor-manual-ordem').value,
        fornecedorDetalhes: document.getElementById('fornecedor-detalhes-ordem').value
    };
}

// Coleta dados do formulário de Solicitação de Orçamento (com suporte a arquivos)
async function collectOrcamentoFormData() {
    const items = [];
    const itemRows = document.querySelectorAll('#items-container-orcamento .item-row');

    for (const row of itemRows) {
        const num = row.querySelector('.item-num').value;
        const desc = row.querySelector('.item-desc').value;
        const descCompl = row.querySelector('.item-desc-compl').value;
        const qty = row.querySelector('.item-qty').value;
        const link = row.querySelector('.item-link').value;
        const medida = row.querySelector('.item-medida').value;
        const imagemUrl = row.querySelector('.item-imagem').value;
        const imagemFile = row.querySelector('.item-imagem-file').files[0];

        let imagemFinal = imagemUrl;

        // Se houver um arquivo, ele tem preferência
        if (imagemFile) {
            imagemFinal = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.onerror = () => resolve('');
                reader.readAsDataURL(imagemFile);
            });
        }

        if (num && desc && qty) {
            items.push({ num, desc, descCompl, qty, link, medida, imagem: imagemFinal });
        }
    }

    const clienteSelect = document.getElementById('cliente-orcamento').value;
    const clienteManual = document.getElementById('cliente-manual-orcamento').value;

    return {
        tipo: 'Solicitação de Orçamento',
        clienteId: clienteSelect === 'outro' ? 'manual' : clienteSelect,
        clienteManual,
        nomeArquivo: document.getElementById('nome-arquivo-orcamento').value,
        data: document.getElementById('data-orcamento').value,
        items,
        fornecedor: document.getElementById('fornecedor-manual-orcamento').value
    };
}

// Gera HTML do documento
function generateDocumentHTML(data) {
    const isDiario = data.tipo === 'Diário de Obras';
    const isOrdem = data.tipo === 'Ordem de Compra' || data.tipo === 'Ordem de Serviço';
    const isOrcamento = data.tipo === 'Solicitação de Orçamento';

    let clienteNome = '';
    if (data.clienteId === 'manual') {
        clienteNome = data.clienteManual;
    } else if (data.clienteId) {
        const cliente = clientes.find(c => c.id == data.clienteId);
        clienteNome = cliente ? cliente.nome : '';
    }

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr + 'T00:00:00');
        return date.toLocaleDateString('pt-BR');
    };

    const formatarMoeda = (valor) => {
        return 'R$ ' + Number(valor).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const campo = (label, valor) => valor ? `<label>${label}</label><p>${valor}</p>` : '';

    // Header HTML
    const headerHTML = `
        <div class="header">
            <img src="data:image/png;base64,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" alt="Logo Empresa">
            <h1>${data.tipo}</h1>
            ${isDiario ? `<p>Página ${data.pagina || ''}</p>` : ''}
            <p>Data: ${formatDate(data.data)}</p>
        </div>
    `;

    // Tabelas HTML
    let tablesHTML = '';
    let grandTotal = 0;

    if (isOrdem) {
        tablesHTML += '<div class="table-section"><table><thead><tr><th>Item</th><th>Descrição</th><th>Quantidade</th><th>Valor Unitário</th><th>Total</th></tr></thead><tbody>';
        data.items.forEach(item => {
            tablesHTML += `<tr><td>${item.num}</td><td>${item.desc}</td><td>${item.qty}</td><td>${formatarMoeda(item.unitPrice)}</td><td>${formatarMoeda(item.total)}</td></tr>`;
            grandTotal += parseFloat(item.total);
        });
        tablesHTML += '</tbody></table></div>';

        if (data.fornecedor) {
            tablesHTML += `
                <div class="fornecedor-box">
                    <h4>Informações do Fornecedor</h4>
                    <p>${data.fornecedor.replace(/\n/g, '<br>')}</p>
                    ${data.fornecedorDetalhes ? `<p style="margin-top: 10px;">${data.fornecedorDetalhes.replace(/\n/g, '<br>')}</p>` : ''}
                </div>
            `;
        }
    } else if (isOrcamento) {
        data.items.forEach((item, index) => {
            tablesHTML += `
                <div class="item-table">
                    <div class="table-header">
                        <strong>Item ${item.num}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; gap: 20px; align-items: flex-start;">
                        <div style="flex: 1;">
                            <p><strong>Descrição:</strong> ${item.desc}</p>
                            ${item.descCompl ? `<p><strong>Descrição Complementar:</strong> ${item.descCompl}</p>` : ''}
                            <p><strong>Quantidade:</strong> ${item.qty}</p>
                            ${item.medida ? `<p><strong>Medida:</strong> ${item.medida}</p>` : ''}
                            ${item.link ? `<p><strong>Link:</strong> <a href="${item.link}" target="_blank">${item.link}</a></p>` : ''}
                        </div>
                        ${item.imagem ? `
                        <div style="flex-shrink: 0;">
                            <img src="${item.imagem}" alt="Imagem do item" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); margin-top: 5px;">
                        </div>` : ''}
                    </div>
                </div>
            `;
        });

        if (data.fornecedor) {
            const fornecedorDisplay = isOrcamento ? data.fornecedor.split('\n')[0] : data.fornecedor.replace(/\n/g, '<br>');
            tablesHTML += `
                <div class="fornecedor-box">
                    <h4>${isOrcamento ? 'Fornecedor' : 'Informações do Fornecedor'}</h4>
                    <p>${fornecedorDisplay}</p>
                </div>
            `;
        }
    } else if (isDiario) {
        // Tabela de Pessoal
        tablesHTML += '<div class="table-section"><h3>Pessoal</h3><table><thead><tr><th>Descrição</th><th>Quantidade</th><th>Nomes</th></tr></thead><tbody>';
        data.pessoal.forEach(p => {
            tablesHTML += `<tr><td>${p.desc}</td><td>${p.qty}</td><td>${p.nomes}</td></tr>`;
        });
        tablesHTML += '</tbody></table></div>';

        // Serviços Executados
        tablesHTML += '<div class="table-section"><h3>Serviços Executados</h3>';
        if (data.servicosObra) tablesHTML += `<label>Obra</label><p>${data.servicosObra.replace(/\n/g, '<br>')}</p>`;
        if (data.servicosAdministrativo) tablesHTML += `<label>Administrativo</label><p>${data.servicosAdministrativo.replace(/\n/g, '<br>')}</p>`;
        tablesHTML += '</div>';

        // Observações
        tablesHTML += '<div class="table-section"><h3>Observações</h3>';
        if (data.observacoesAnotacoes) tablesHTML += `<label>Anotações</label><p>${data.observacoesAnotacoes.replace(/\n/g, '<br>')}</p>`;
        if (data.observacoesProdutos) tablesHTML += `<label>Solicitação de Produtos</label><p>${data.observacoesProdutos.replace(/\n/g, '<br>')}</p>`;
        tablesHTML += '</div>';
    }

    return `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${data.tipo}</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: 'Inter', 'Century Gothic', Arial, sans-serif;
                    background-color: #ffffff;
                    color: #333;
                    line-height: 1.6;
                }
                
                .container {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 40px;
                    background: #fff;
                }
                
                .header {
                    text-align: center;
                    border-bottom: 3px solid #d4a373;
                    padding-bottom: 20px;
                    margin-bottom: 30px;
                }
                
                .header img {
                    max-width: 180px;
                    height: auto;
                    margin-bottom: 15px;
                }
                
                .header h1 {
                    font-size: 28px;
                    font-weight: 700;
                    color: #2c2c2c;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    margin: 10px 0;
                }
                
                .header p {
                    font-size: 14px;
                    color: #666;
                    margin: 5px 0;
                }
                
                .info-section {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 30px;
                    margin-bottom: 35px;
                    padding: 25px;
                    background: #fafafa;
                    border-radius: 8px;
                    border-left: 4px solid #d4a373;
                }
                
                .info-section label {
                    font-weight: 600;
                    color: #555;
                    display: block;
                    margin-bottom: 8px;
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                
                .info-section p {
                    font-size: 15px;
                    color: #333;
                    line-height: 1.8;
                    word-wrap: break-word;
                    margin-bottom: 15px;
                }
                
                .table-section {
                    margin-bottom: 35px;
                }
                
                .table-section h3 {
                    font-size: 20px;
                    color: #b88a5a;
                    margin-bottom: 15px;
                    font-weight: 600;
                    border-bottom: 2px solid #e0e0e0;
                    padding-bottom: 8px;
                }
                
                .table-section label {
                    font-weight: 600;
                    color: #555;
                    display: block;
                    margin: 15px 0 8px;
                    font-size: 13px;
                    text-transform: uppercase;
                }
                
                .table-section p {
                    font-size: 14px;
                    color: #444;
                    line-height: 1.8;
                    word-wrap: break-word;
                    margin: 5px 0;
                }
                
                .checkbox-list {
                    font-size: 14px;
                    color: #444;
                    line-height: 1.8;
                    margin-top: 5px;
                }
                
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 15px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                    border-radius: 8px;
                    overflow: hidden;
                }
                
                th, td {
                    padding: 14px 16px;
                    text-align: left;
                    font-size: 14px;
                    border-bottom: 1px solid #e8e8e8;
                }
                
                th {
                    background: linear-gradient(135deg, #d4a373 0%, #b88a5a 100%);
                    color: #fff;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.8px;
                    font-size: 12px;
                }
                
                tr:last-child td {
                    border-bottom: none;
                }
                
                tr:nth-child(even) {
                    background-color: #f9f9f9;
                }
                
                tr:hover {
                    background-color: #f5f5f5;
                }
                
                td a {
                    color: #d4a373;
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.2s;
                }
                
                td a:hover {
                    color: #b88a5a;
                    text-decoration: underline;
                }
                
                .fornecedor-box {
                    background: linear-gradient(135deg, #faf5f0 0%, #f5ebe0 100%);
                    border-left: 5px solid #d4a373;
                    padding: 20px;
                    margin-top: 25px;
                    border-radius: 8px;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
                }
                
                .fornecedor-box h4 {
                    margin: 0 0 12px;
                    font-size: 17px;
                    color: #b88a5a;
                    font-weight: 600;
                }
                
                .fornecedor-box p {
                    font-size: 14px;
                    color: #444;
                    line-height: 1.8;
                }
                
                .total {
                    font-size: 22px;
                    font-weight: 700;
                    color: #2c2c2c;
                    text-align: right;
                    margin-top: 25px;
                    padding: 20px;
                    background: #fafafa;
                    border-radius: 8px;
                    border-left: 4px solid #d4a373;
                }
                
                .item-table {
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    padding: 20px;
                    margin-bottom: 25px;
                    background-color: #fafafa;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
                }
                
                .item-table a {
                    word-break: break-all;
                    color: #d4a373;
                    text-decoration: none;
                }
                
                .item-table a:hover {
                    text-decoration: underline;
                }
                
                .table-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                    padding-bottom: 12px;
                    border-bottom: 2px solid #d4a373;
                }
                
                .table-header strong {
                    font-size: 16px;
                    color: #b88a5a;
                }
                
                .table-footer {
                    margin-top: 20px;
                    padding-top: 15px;
                    border-top: 1px solid #e0e0e0;
                }
                
                @media print {
                    body {
                        background: white;
                    }
                    .container {
                        padding: 20px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                ${headerHTML}
                <div class="info-section">
                    <div>
                        ${isDiario ? campo('Obra', data.obra) : clienteNome ? campo('Cliente', clienteNome) : ''}
                        ${isDiario ? campo('Referência', data.ref) : isOrdem ? campo('Número do Pedido', data.numeroPedido) : ''}
                        ${isDiario ? campo('Prazo Decorrido', data.prazoDecorrido) : ''}
                        ${isDiario ? campo('Prazo Restante', data.prazoRestante) : ''}
                    </div>
                    <div>
                        ${isDiario ? campo('Prazo da Obra', data.prazoObra) : isOrdem ? `<label>Obra</label><p>${data.obra.replace(/\n/g, '<br>')}</p>` : ''}
                        ${isDiario ? campo('Horário de Trabalho', data.horarioTrabalho) : isOrdem ? campo('Referência', data.ref) : ''}
                        ${isDiario && data.tempo ? `<label>Tempo</label><div class="checkbox-list">${data.tempo.join(', ')}</div>` : ''}
                        ${isDiario && data.turno ? `<label>Turno</label><div class="checkbox-list">${data.turno.join(', ')}</div>` : ''}
                    </div>
                </div>
                ${tablesHTML}
                ${isOrdem ? `
                    <div class="total">
                        Valor Total Geral: ${formatarMoeda(grandTotal)}
                    </div>
                ` : ''}
            </div>
        </body>
        </html>
    `;
}

function formatarMoeda(valor) {
    return 'R$ ' + Number(valor).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Gera e salva HTML
async function generateAndSaveHTML(type) {
    let data;
    if (type === 'orcamento') {
        data = await collectOrcamentoFormData();
        if (!data.items.length) {
            alert('Por favor, adicione pelo menos um item.');
            return;
        }
        if (!data.fornecedor) {
            alert('Por favor, preencha as informações do fornecedor.');
            return;
        }
    } else if (type === 'diario') {
        data = collectDiarioFormData();
        if (!data.pessoal.length) {
            alert('Por favor, adicione pelo menos um item na seção Pessoal.');
            return;
        }
        if (!data.servicosObra || data.servicosObra.length < 50) {
            alert('Por favor, preencha a seção de Serviços Executados - Obra com pelo menos 50 caracteres.');
            return;
        }
    } else {
        data = collectOrdemFormData();
        if (!data.items.length) {
            alert('Por favor, adicione pelo menos um item.');
            return;
        }
        if (!data.fornecedor) {
            alert('Por favor, preencha as informações do fornecedor.');
            return;
        }
        if (!data.clienteId && !data.clienteManual) {
            alert('Por favor, selecione um cliente ou insira o nome manualmente.');
            return;
        }
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

// NOVA FUNÇÃO: Gera e salva PDF com texto selecionável
async function generateAndSavePDF(type) {
    let data;
    if (type === 'orcamento') {
        data = await collectOrcamentoFormData();
        if (!data.items.length) {
            alert('Por favor, adicione pelo menos um item.');
            return;
        }
        if (!data.fornecedor) {
            alert('Por favor, preencha as informações do fornecedor.');
            return;
        }
    } else if (type === 'diario') {
        data = collectDiarioFormData();
        if (!data.pessoal.length) {
            alert('Por favor, adicione pelo menos um item na seção Pessoal.');
            return;
        }
        if (!data.servicosObra || data.servicosObra.length < 50) {
            alert('Por favor, preencha a seção de Serviços Executados - Obra com pelo menos 50 caracteres.');
            return;
        }
    } else {
        data = collectOrdemFormData();
        if (!data.items.length) {
            alert('Por favor, adicione pelo menos um item.');
            return;
        }
        if (!data.fornecedor) {
            alert('Por favor, preencha as informações do fornecedor.');
            return;
        }
        if (!data.clienteId && !data.clienteManual) {
            alert('Por favor, selecione um cliente ou insira o nome manualmente.');
            return;
        }
    }

    // Mostra indicador de loading
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'pdf-loading';
    loadingDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        color: white;
        font-family: 'Century Gothic', Arial, sans-serif;
    `;
    loadingDiv.innerHTML = `
        <div style="text-align: center;">
            <div style="border: 4px solid rgba(255, 255, 255, 0.3); border-top: 4px solid white; border-radius: 50%; width: 60px; height: 60px; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
            <p style="font-size: 18px; font-weight: 600;">Gerando PDF profissional...</p>
            <p style="font-size: 14px; margin-top: 10px; opacity: 0.8;">Isso pode levar alguns segundos</p>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    document.body.appendChild(loadingDiv);

    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const isDiario = data.tipo === 'Diário de Obras';
        const isOrdem = data.tipo === 'Ordem de Compra' || data.tipo === 'Ordem de Serviço';
        const isOrcamento = data.tipo === 'Solicitação de Orçamento';

        let clienteNome = '';
        if (data.clienteId === 'manual') {
            clienteNome = data.clienteManual;
        } else if (data.clienteId) {
            const cliente = clientes.find(c => c.id == data.clienteId);
            clienteNome = cliente ? cliente.nome : '';
        }

        const formatDate = (dateStr) => {
            if (!dateStr) return '';
            const date = new Date(dateStr + 'T00:00:00');
            return date.toLocaleDateString('pt-BR');
        };

        const formatarMoeda = (valor) => {
            return 'R$ ' + Number(valor).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        };

        // Configurações
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 20;
        let yPos = margin;

        // Cores
        const primaryColor = [212, 163, 115]; // #d4a373
        const darkColor = [44, 44, 44]; // #2c2c2c
        const grayColor = [85, 85, 85]; // #555

        // Função para adicionar logo
        const addLogo = async () => {
            try {
                const logoUrl = 'logo.png';
                const imgData = await loadImageAsBase64(logoUrl);
                const logoWidth = 30;
                const logoHeight = 30;
                const logoX = (pageWidth - logoWidth) / 2;
                pdf.addImage(imgData, 'PNG', logoX, yPos, logoWidth, logoHeight);
                yPos += logoHeight + 5;
            } catch (error) {
                console.log('Logo não encontrada, continuando sem logo');
            }
        };

        // Função para carregar imagem como base64
        const loadImageAsBase64 = (url) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = 'Anonymous';
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    resolve(canvas.toDataURL('image/png'));
                };
                img.onerror = reject;
                img.src = url;
            });
        };

        await addLogo();

        yPos += 5;

        // Título
        pdf.setFontSize(20);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(...darkColor);
        const titleWidth = pdf.getTextWidth(data.tipo);
        pdf.text(data.tipo, (pageWidth - titleWidth) / 2, yPos);
        yPos += 10;

        // Data e página (se diário)
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(102, 102, 102);
        if (isDiario && data.pagina) {
            const pageText = `Página ${data.pagina}`;
            const pageTextWidth = pdf.getTextWidth(pageText);
            pdf.text(pageText, (pageWidth - pageTextWidth) / 2, yPos);
            yPos += 5;
        }
        const dateText = `Data: ${formatDate(data.data)}`;
        const dateWidth = pdf.getTextWidth(dateText);
        pdf.text(dateText, (pageWidth - dateWidth) / 2, yPos);
        yPos += 10;

        // Linha separadora
        pdf.setDrawColor(...primaryColor);
        pdf.setLineWidth(1);
        pdf.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 10;

        // Seção de informações
        const addInfoSection = (label, value, x, y) => {
            if (!value) return y;
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(...grayColor);
            pdf.text(label.toUpperCase(), x, y);
            y += 5;
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(...darkColor);

            const lines = pdf.splitTextToSize(value, (pageWidth / 2) - margin - 10);
            pdf.text(lines, x, y);
            return y + (lines.length * 5) + 3;
        };

        const leftX = margin;
        const rightX = pageWidth / 2 + 5;
        let leftY = yPos;
        let rightY = yPos;

        if (isDiario) {
            leftY = addInfoSection('Obra', data.obra, leftX, leftY);
            leftY = addInfoSection('Referência', data.ref, leftX, leftY);
            leftY = addInfoSection('Prazo Decorrido', data.prazoDecorrido, leftX, leftY);
            leftY = addInfoSection('Prazo Restante', data.prazoRestante, leftX, leftY);

            rightY = addInfoSection('Prazo da Obra', data.prazoObra, rightX, rightY);
            rightY = addInfoSection('Horário de Trabalho', data.horarioTrabalho, rightX, rightY);
            if (data.tempo) rightY = addInfoSection('Tempo', data.tempo.join(', '), rightX, rightY);
            if (data.turno) rightY = addInfoSection('Turno', data.turno.join(', '), rightX, rightY);
        } else if (isOrdem || isOrcamento) {
            if (clienteNome) leftY = addInfoSection('Cliente', clienteNome, leftX, leftY);
            if (isOrdem) {
                leftY = addInfoSection('Número do Pedido', data.numeroPedido, leftX, leftY);
                rightY = addInfoSection('Obra', data.obra, rightX, rightY);
                rightY = addInfoSection('Referência', data.ref, rightX, rightY);
            }
        }

        yPos = Math.max(leftY, rightY) + 5;

        // Função para verificar espaço e adicionar nova página
        const checkPageBreak = (neededSpace) => {
            if (yPos + neededSpace > pageHeight - margin) {
                pdf.addPage();
                yPos = margin;
                return true;
            }
            return false;
        };

        // Tabelas
        if (isOrdem && data.items.length > 0) {
            checkPageBreak(50);

            pdf.setFontSize(12);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(...primaryColor);
            pdf.text('ITENS', margin, yPos);
            yPos += 7;

            // Cabeçalho da tabela
            const colWidths = [15, 60, 25, 30, 30];
            const headers = ['Item', 'Descrição', 'Qtd', 'Vlr Unit.', 'Total'];

            pdf.setFillColor(...primaryColor);
            pdf.rect(margin, yPos - 5, pageWidth - 2 * margin, 8, 'F');

            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(255, 255, 255);

            let xPos = margin + 2;
            headers.forEach((header, i) => {
                pdf.text(header, xPos, yPos);
                xPos += colWidths[i];
            });
            yPos += 8;

            // Linhas da tabela
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(...darkColor);
            let grandTotal = 0;

            data.items.forEach((item, index) => {
                checkPageBreak(10);

                if (index % 2 === 0) {
                    pdf.setFillColor(249, 249, 249);
                    pdf.rect(margin, yPos - 5, pageWidth - 2 * margin, 8, 'F');
                }

                xPos = margin + 2;
                pdf.text(item.num, xPos, yPos);
                xPos += colWidths[0];

                const descLines = pdf.splitTextToSize(item.desc, colWidths[1] - 4);
                pdf.text(descLines[0], xPos, yPos);
                xPos += colWidths[1];

                pdf.text(item.qty, xPos, yPos);
                xPos += colWidths[2];

                pdf.text(formatarMoeda(item.unitPrice), xPos, yPos);
                xPos += colWidths[3];

                pdf.text(formatarMoeda(item.total), xPos, yPos);

                grandTotal += parseFloat(item.total);
                yPos += 8;
            });

            // Total
            yPos += 5;
            pdf.setFontSize(14);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(...darkColor);
            const totalText = `Valor Total Geral: ${formatarMoeda(grandTotal)}`;
            const totalWidth = pdf.getTextWidth(totalText);
            pdf.text(totalText, pageWidth - margin - totalWidth, yPos);
            yPos += 10;

            // Fornecedor
            if (data.fornecedor) {
                checkPageBreak(30);
                pdf.setFillColor(250, 245, 240);
                const boxHeight = 25;
                pdf.rect(margin, yPos, pageWidth - 2 * margin, boxHeight, 'F');

                pdf.setDrawColor(...primaryColor);
                pdf.setLineWidth(2);
                pdf.line(margin, yPos, margin, yPos + boxHeight);

                yPos += 7;
                pdf.setFontSize(11);
                pdf.setFont('helvetica', 'bold');
                pdf.setTextColor(...primaryColor);
                pdf.text('INFORMAÇÕES DO FORNECEDOR', margin + 5, yPos);

                yPos += 6;
                pdf.setFontSize(9);
                pdf.setFont('helvetica', 'normal');
                pdf.setTextColor(...darkColor);
                const fornecedorLines = pdf.splitTextToSize(data.fornecedor, pageWidth - 2 * margin - 10);
                pdf.text(fornecedorLines, margin + 5, yPos);

                if (data.fornecedorDetalhes) {
                    yPos += fornecedorLines.length * 4 + 3;
                    const detalhesLines = pdf.splitTextToSize(data.fornecedorDetalhes, pageWidth - 2 * margin - 10);
                    pdf.text(detalhesLines, margin + 5, yPos);
                }
            }
        } else if (isOrcamento && data.items.length > 0) {
            for (const item of data.items) {
                checkPageBreak(30);

                const boxStartY = yPos;

                // Cabeçalho do item
                pdf.setFillColor(250, 250, 250);
                pdf.rect(margin, yPos, pageWidth - 2 * margin, 6, 'F');
                pdf.setFontSize(11);
                pdf.setFont('helvetica', 'bold');
                pdf.setTextColor(...primaryColor);
                pdf.text(`ITEM ${item.num}`, margin + 3, yPos + 4.5);
                yPos += 10;

                const contentStartX = margin + 3;
                const imageWidth = 40;
                const imageHeight = 40;
                const textWidthLimit = item.imagem ? (pageWidth - 2 * margin - imageWidth - 10) : (pageWidth - 2 * margin - 6);

                let currentItemY = yPos;

                // Texto (Lado Esquerdo se houver imagem)
                pdf.setFontSize(9);
                pdf.setFont('helvetica', 'bold');
                pdf.setTextColor(...grayColor);
                pdf.text('Descrição:', contentStartX, currentItemY);
                currentItemY += 4;

                pdf.setFont('helvetica', 'normal');
                pdf.setTextColor(...darkColor);
                const descLines = pdf.splitTextToSize(item.desc, textWidthLimit);
                pdf.text(descLines, contentStartX, currentItemY);
                currentItemY += descLines.length * 4 + 2;

                if (item.descCompl) {
                    pdf.setFont('helvetica', 'bold');
                    pdf.setTextColor(...grayColor);
                    pdf.text('Descrição Complementar:', contentStartX, currentItemY);
                    currentItemY += 4;

                    pdf.setFont('helvetica', 'normal');
                    pdf.setTextColor(...darkColor);
                    const complLines = pdf.splitTextToSize(item.descCompl, textWidthLimit);
                    pdf.text(complLines, contentStartX, currentItemY);
                    currentItemY += complLines.length * 4 + 2;
                }

                pdf.setFont('helvetica', 'bold');
                pdf.setTextColor(...grayColor);
                pdf.text(`Quantidade: `, contentStartX, currentItemY);
                pdf.setFont('helvetica', 'normal');
                pdf.setTextColor(...darkColor);
                pdf.text(item.qty, contentStartX + 22, currentItemY);
                currentItemY += 5;

                if (item.medida) {
                    pdf.setFont('helvetica', 'bold');
                    pdf.setTextColor(...grayColor);
                    pdf.text(`Medida: `, contentStartX, currentItemY);
                    pdf.setFont('helvetica', 'normal');
                    pdf.setTextColor(...darkColor);
                    pdf.text(item.medida, contentStartX + 15, currentItemY);
                    currentItemY += 5;
                }

                if (item.link) {
                    pdf.setFont('helvetica', 'bold');
                    pdf.setTextColor(...grayColor);
                    pdf.text(`Link: `, contentStartX, currentItemY);

                    pdf.setFont('helvetica', 'normal');
                    pdf.setTextColor(212, 163, 115);

                    const linkLines = pdf.splitTextToSize(item.link, textWidthLimit - 10);
                    linkLines.forEach((line, i) => {
                        pdf.textWithLink(line, contentStartX + 10, currentItemY + (i * 4), { url: item.link });
                    });
                    currentItemY += linkLines.length * 4 + 1;
                }

                // Imagem (Lado Direito)
                if (item.imagem) {
                    try {
                        const imgData = item.imagem.startsWith('data:') ? item.imagem : await loadImageAsBase64(item.imagem);
                        const imgX = pageWidth - margin - imageWidth - 3;
                        pdf.addImage(imgData, 'PNG', imgX, yPos, imageWidth, imageHeight);

                        // O yPos final do item deve considerar a altura da imagem se for maior que o texto
                        yPos = Math.max(currentItemY, yPos + imageHeight) + 5;
                    } catch (err) {
                        console.error('Erro ao renderizar imagem no PDF:', err);
                        yPos = currentItemY + 5;
                    }
                } else {
                    yPos = currentItemY + 5;
                }

                // Desenha borda sutil ao redor do item
                pdf.setDrawColor(230, 230, 230);
                pdf.setLineWidth(0.1);
                pdf.rect(margin, boxStartY, pageWidth - 2 * margin, yPos - boxStartY);
                yPos += 5;
            }

            // Fornecedor
            if (data.fornecedor) {
                checkPageBreak(20);
                pdf.setFillColor(250, 245, 240);
                const boxHeight = 20;
                pdf.rect(margin, yPos, pageWidth - 2 * margin, boxHeight, 'F');

                pdf.setDrawColor(...primaryColor);
                pdf.setLineWidth(2);
                pdf.line(margin, yPos, margin, yPos + boxHeight);

                yPos += 7;
                pdf.setFontSize(11);
                pdf.setFont('helvetica', 'bold');
                pdf.setTextColor(...primaryColor);
                pdf.text('FORNECEDOR', margin + 5, yPos);

                yPos += 6;
                pdf.setFontSize(9);
                pdf.setFont('helvetica', 'normal');
                pdf.setTextColor(...darkColor);
                const fornecedorText = isOrcamento ? data.fornecedor.split('\n')[0] : data.fornecedor;
                const fornecedorLines = pdf.splitTextToSize(fornecedorText, pageWidth - 2 * margin - 10);
                pdf.text(fornecedorLines, margin + 5, yPos);
            }
        } else if (isDiario) {
            // Tabela de Pessoal
            if (data.pessoal.length > 0) {
                checkPageBreak(50);

                pdf.setFontSize(12);
                pdf.setFont('helvetica', 'bold');
                pdf.setTextColor(...primaryColor);
                pdf.text('PESSOAL', margin, yPos);
                yPos += 7;

                const colWidths = [60, 30, 70];
                const headers = ['Descrição', 'Quantidade', 'Nomes'];

                pdf.setFillColor(...primaryColor);
                pdf.rect(margin, yPos - 5, pageWidth - 2 * margin, 8, 'F');

                pdf.setFontSize(9);
                pdf.setFont('helvetica', 'bold');
                pdf.setTextColor(255, 255, 255);

                let xPos = margin + 2;
                headers.forEach((header, i) => {
                    pdf.text(header, xPos, yPos);
                    xPos += colWidths[i];
                });
                yPos += 8;

                pdf.setFont('helvetica', 'normal');
                pdf.setTextColor(...darkColor);

                data.pessoal.forEach((p, index) => {
                    checkPageBreak(10);

                    if (index % 2 === 0) {
                        pdf.setFillColor(249, 249, 249);
                        pdf.rect(margin, yPos - 5, pageWidth - 2 * margin, 8, 'F');
                    }

                    xPos = margin + 2;
                    const descLines = pdf.splitTextToSize(p.desc, colWidths[0] - 4);
                    pdf.text(descLines[0], xPos, yPos);
                    xPos += colWidths[0];

                    pdf.text(p.qty, xPos, yPos);
                    xPos += colWidths[1];

                    const nomesLines = pdf.splitTextToSize(p.nomes, colWidths[2] - 4);
                    pdf.text(nomesLines[0], xPos, yPos);

                    yPos += 8;
                });
                yPos += 5;
            }

            // Serviços Executados
            checkPageBreak(30);
            pdf.setFontSize(12);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(...primaryColor);
            pdf.text('SERVIÇOS EXECUTADOS', margin, yPos);
            yPos += 7;

            if (data.servicosObra) {
                pdf.setFontSize(9);
                pdf.setFont('helvetica', 'bold');
                pdf.setTextColor(...grayColor);
                pdf.text('OBRA', margin, yPos);
                yPos += 5;

                pdf.setFont('helvetica', 'normal');
                pdf.setTextColor(...darkColor);
                const obraLines = pdf.splitTextToSize(data.servicosObra, pageWidth - 2 * margin);
                pdf.text(obraLines, margin, yPos);
                yPos += obraLines.length * 4 + 5;
            }

            if (data.servicosAdministrativo) {
                checkPageBreak(20);
                pdf.setFont('helvetica', 'bold');
                pdf.setTextColor(...grayColor);
                pdf.text('ADMINISTRATIVO', margin, yPos);
                yPos += 5;

                pdf.setFont('helvetica', 'normal');
                pdf.setTextColor(...darkColor);
                const adminLines = pdf.splitTextToSize(data.servicosAdministrativo, pageWidth - 2 * margin);
                pdf.text(adminLines, margin, yPos);
                yPos += adminLines.length * 4 + 5;
            }

            // Observações
            if (data.observacoesAnotacoes || data.observacoesProdutos) {
                checkPageBreak(30);
                pdf.setFontSize(12);
                pdf.setFont('helvetica', 'bold');
                pdf.setTextColor(...primaryColor);
                pdf.text('OBSERVAÇÕES', margin, yPos);
                yPos += 7;

                if (data.observacoesAnotacoes) {
                    pdf.setFontSize(9);
                    pdf.setFont('helvetica', 'bold');
                    pdf.setTextColor(...grayColor);
                    pdf.text('ANOTAÇÕES', margin, yPos);
                    yPos += 5;

                    pdf.setFont('helvetica', 'normal');
                    pdf.setTextColor(...darkColor);
                    const anotLines = pdf.splitTextToSize(data.observacoesAnotacoes, pageWidth - 2 * margin);
                    pdf.text(anotLines, margin, yPos);
                    yPos += anotLines.length * 4 + 5;
                }

                if (data.observacoesProdutos) {
                    checkPageBreak(20);
                    pdf.setFont('helvetica', 'bold');
                    pdf.setTextColor(...grayColor);
                    pdf.text('SOLICITAÇÃO DE PRODUTOS', margin, yPos);
                    yPos += 5;

                    pdf.setFont('helvetica', 'normal');
                    pdf.setTextColor(...darkColor);
                    const prodLines = pdf.splitTextToSize(data.observacoesProdutos, pageWidth - 2 * margin);
                    pdf.text(prodLines, margin, yPos);
                    yPos += prodLines.length * 4 + 5;
                }
            }
        }

        // Salva o PDF
        const fileName = data.nomeArquivo ?
            `${data.nomeArquivo}.pdf` :
            `${data.tipo.replace(/ /g, '_')}_${data.numeroPedido || data.data || 'SemNumero'}.pdf`;

        pdf.save(fileName);

        // Remove o loading
        document.body.removeChild(loadingDiv);

        // Mostra mensagem de sucesso
        alert('PDF gerado e salvo com sucesso!');

    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        document.body.removeChild(loadingDiv);
        alert('Erro ao gerar PDF. Por favor, tente novamente.');
    }
}

// Pré-visualiza documento
async function previewDocument(type) {
    let data;
    if (type === 'orcamento') {
        data = await collectOrcamentoFormData();
        if (!data.items.length) {
            alert('Por favor, adicione pelo menos um item.');
            return;
        }
        if (!data.fornecedor) {
            alert('Por favor, preencha as informações do fornecedor.');
            return;
        }
    } else if (type === 'diario') {
        data = collectDiarioFormData();
        if (!data.pessoal.length) {
            alert('Por favor, adicione pelo menos um item na seção Pessoal.');
            return;
        }
        if (!data.servicosObra || data.servicosObra.length < 50) {
            alert('Por favor, preencha a seção de Serviços Executados - Obra com pelo menos 50 caracteres.');
            return;
        }
    } else {
        data = collectOrdemFormData();
        if (!data.items.length) {
            alert('Por favor, adicione pelo menos um item.');
            return;
        }
        if (!data.fornecedor) {
            alert('Por favor, preencha as informações do fornecedor.');
            return;
        }
        if (!data.clienteId && !data.clienteManual) {
            alert('Por favor, selecione um cliente ou insira o nome manualmente.');
            return;
        }
    }

    const documentHTML = generateDocumentHTML(data);
    document.getElementById('preview-title').textContent = `Pré-visualização da ${data.tipo}`;
    document.getElementById('preview-content').innerHTML = documentHTML;
    document.getElementById('preview-modal').style.display = 'block';
}

// Coleta dados do formulário de Diário de Obras
function collectDiarioFormData() {
    const pessoal = [];
    document.querySelectorAll('#pessoal-container .item-row').forEach(row => {
        const desc = row.querySelector('.item-desc').value;
        const qty = row.querySelector('.item-qty').value;
        const nomes = row.querySelector('.item-nomes').value;
        if (desc && qty && nomes) {
            pessoal.push({ desc, qty, nomes });
        }
    });

    const tempo = [];
    document.querySelectorAll('input[name="tempo"]:checked').forEach(checkbox => {
        tempo.push(checkbox.value);
    });

    const turno = [];
    document.querySelectorAll('input[name="turno"]:checked').forEach(checkbox => {
        turno.push(checkbox.value);
    });

    return {
        tipo: 'Diário de Obras',
        nomeArquivo: document.getElementById('nome-arquivo-diario').value,
        data: document.getElementById('data-diario').value,
        pagina: document.getElementById('pagina-diario').value,
        obra: document.getElementById('obra-diario').value,
        ref: document.getElementById('ref-diario').value,
        prazoDecorrido: document.getElementById('prazo-decorrido').value,
        prazoRestante: document.getElementById('prazo-restante').value,
        prazoObra: document.getElementById('prazo-obra').value,
        horarioTrabalho: document.getElementById('horario-trabalho').value,
        tempo: tempo.length > 0 ? tempo : null,
        turno: turno.length > 0 ? turno : null,
        pessoal,
        servicosObra: document.getElementById('servicos-obra').value,
        servicosAdministrativo: document.getElementById('servicos-administrativo').value,
        observacoesAnotacoes: document.getElementById('observacoes-anotacoes').value,
        observacoesProdutos: document.getElementById('observacoes-produtos').value,
        fornecedor: '' // Diário de Obras não usa fornecedor, mas incluído para compatibilidade
    };
}

// Valida o comprimento mínimo do textarea
function validateMinLength(textarea, minLength) {
    const value = textarea.value;
    if (value.length < minLength) {
        textarea.style.border = '2px solid red';
        textarea.title = `Mínimo de ${minLength} caracteres requerido`;
    } else {
        textarea.style.border = '';
        textarea.title = '';
    }
}

// Fecha o modal
function closeModal() {
    document.getElementById('preview-modal').style.display = 'none';
    document.getElementById('preview-content').innerHTML = '';
}
