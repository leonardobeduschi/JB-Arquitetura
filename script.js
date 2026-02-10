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
            <img src="data:image/webp;base64,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" alt="Logo Empresa">
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