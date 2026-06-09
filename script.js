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
            <img src="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" alt="Logo Empresa">
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
