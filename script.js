// Dados estáticos de clientes e fornecedores
const clientes = [
    { id: 1, nome: 'Condomínio Edifício Fabimar', documento: 'CNPJ', numeroDocumento: '03.688.491/0001-10', pix: '', chavePix: '', telefone: '(47) 99230-4695', endereco: 'Rua 902, número 178 , Centro, Balneário Camboriú (SC)' },
    { id: 2, nome: 'Francisca Celia Spanholi', documento: 'CPF', numeroDocumento: '555.419.099-53', pix: '', chavePix: '', telefone: '(71) 99956-8082', endereco: 'Av. Brasil 3551 / edif. Le majestic apto 3203, Balneário Camboriú (SC)', endereco2: 'Rua Praia de Mucuripe Qd.16 lote 4, Bairro: vilas do Atlantico / Lauro de Freitas /BA, CEP 42707800' },
    { id: 3, nome: 'Silvana Mussi', documento: 'CPF', numeroDocumento: '371.640.749-68', pix: '', chavePix: '', telefone: '(42) 99971-3819', endereco: 'Rua 1950, número 40, Centro, Balneário Camboriú (SC)' },
    { id: 4, nome: 'Cristiano Gonzaga da Silva', documento: 'CPF', numeroDocumento: '910.914.629-68', pix: '', chavePix: '', telefone: '(41) 99993-5573', endereco: 'Rua Morretes, número 236, bairro Ipanema, Pontal do Paraná (PR)' },
    { id: 5, nome: 'Tatiane Daniela Rodrigues Corrêa', documento: 'CPF', numeroDocumento: '003.441.699-44', pix: '', chavePix: '', telefone: '(47) 99922-8958', endereco: 'Rua 3130, 112- Centro BC, Ap. 2402 Ed. Peniche' },
    { id: 6, nome: 'Jumar Batista Terciotti', documento: 'CPF', numeroDocumento: '467.186.309-00', pix: '', chavePix: '', telefone: '(45) 99971-0389', endereco: '3ª Avenida, 1150 - Centro, Balneário Camboriú - SC, Ed. Rosamonte ap.801', endereco2: 'Av. Tancredo Neves 854, Cascavel PR' },
    { id: 7, nome: 'Gerdelina Juvina Marochi', documento: 'CPF', numeroDocumento: '168.078.209-68', pix: '', chavePix: '', telefone: '(42) 99918-9233', endereco: 'Av. Central, 46 Calçadão Centro BC, Ed. Imperador ap.1609' },
    { id: 8, nome: 'Roberto Mafra', documento: 'CPF', numeroDocumento: '600.878.389-15', pix: '', chavePix: '', telefone: '(47) 98473-2610', endereco: 'Rua Basílio Pedro da silva 126 Centro Camboriú SC, Ed Villa formosa 903' },
    { id: 9, nome: 'Roberta Voltolini', documento: '', numeroDocumento: '', pix: '', chavePix: '', telefone: '(47) 98418-3786', endereco: 'Rua Santo Antônio, 269– Bairro São Francisco–Camboriú SC' },
    { id: 10, nome: 'Juan Carlo Boggino e Adriana de Boggino', documento: 'CPF', numeroDocumento: '011.241.729-98', pix: '', chavePix: '', telefone: '595 981 406096', endereco: 'Av Brasil 2285 - Ed Alliança, Apto 803' },
    { id: 11, nome: 'Luiz Sussumo Tomimasu', documento: 'CPF', numeroDocumento: '851.732.408-06', pix: '', chavePix: '', telefone: '(47) 99245-2366', endereco: 'Av. Alvin Bauer 119 – ap. 1201 – Centro BC' },
    { id: 12, nome: 'Máricia Isabel Pereira', documento: 'CPF', numeroDocumento: '545.972.501-15', pix: '', chavePix: '', telefone: '(47) 99918-6946', endereco: 'Rua 3700 nº 194 Centro BC - ED. Rossini cob 01' },
    { id: 13, nome: 'Célia Wagner', documento: '', numeroDocumento: '', pix: '', chavePix: '', telefone: '(41) 99974-1443', endereco: 'Av. Atlântica 2320 Centro BC, Ed. Apollo 11 ap.923' },
    { id: 14, nome: 'Jacira Pinheiro Seger', documento: 'CPF', numeroDocumento: '787.787.949-00', pix: '', chavePix: '', telefone: '(47) 99912-7305', endereco: 'Av. Atlântica, 4380 apartamento 902' }
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
    { id: 25, empresa: 'Volare Acabamentos', tipoPagamento: '', pix: '', nomePix: '' },
    { id: 26, empresa: 'Instalação de eletrodomésticos Essencial', tipoPagamento: 'CNPJ', pix: '40.777.363/0001-52', nomePix: 'EMERSON VELASQUE' }
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
            <input type="text" class="item-imagem" placeholder="URL da Imagem (opcional)">
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
        const descCompl = row.querySelector('.item-desc-compl').value;
        const qty = row.querySelector('.item-qty').value;
        const link = row.querySelector('.item-link').value;
        const medida = row.querySelector('.item-medida').value;
        const imagem = row.querySelector('.item-imagem').value;
        if (num && desc) {
            items.push({ num, desc, descCompl, qty, link, medida, imagem });
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
    const isOrdem = data.tipo === 'Ordem de Compra' || data.tipo === 'Ordem de Serviço';
    const isDiario = data.tipo === 'Diário de Obras';
    let grandTotal = null;
    let headers = [];
    let tableData = [];

    if (isOrdem) {
        grandTotal = data.items.reduce((sum, item) => sum + parseFloat(item.total), 0).toFixed(2);
        headers = ['Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Valor Total'];
        tableData = data.items.map(item => [
            item.num,
            item.desc,
            item.qty,
            `R$ ${parseFloat(item.unitPrice).toFixed(2).replace('.', ',')}`,
            `R$ ${item.total.replace('.', ',')}`
        ]);
    } else if (isDiario) {
        headers = ['Descrição', 'Quantidade', 'Nomes'];
        tableData = data.pessoal.map(item => [
            item.desc,
            item.qty,
            item.nomes
        ]);
    } else {
        headers = ['Item', 'Descrição'];
        const hasDescCompl = data.items.some(item => item.descCompl);
        const hasQty = data.items.some(item => item.qty);
        const hasLink = data.items.some(item => item.link);
        const hasMedida = data.items.some(item => item.medida);
        const hasImagem = data.items.some(item => item.imagem);
        if (hasDescCompl) headers.splice(2, 0, 'Descrição Complementar');
        if (hasQty) headers.push('Quantidade');
        if (hasLink) headers.push('Link');
        if (hasMedida) headers.push('Medida');
        if (hasImagem) headers.push('Imagem');
        tableData = data.items.map(item => {
            const row = [item.num, item.desc];
            if (hasDescCompl) row.push(item.descCompl || '');
            if (hasQty) row.push(item.qty || '');
            if (hasLink) row.push(item.link ? `<a href="${item.link}" target="_blank">Link</a>` : '');
            if (hasMedida) row.push(item.medida || '');
            if (hasImagem) row.push(item.imagem ? `<img src="${item.imagem}" alt="Imagem" style="max-width: 100px; max-height: 100px;" />` : '');
            return row;
        });
    }

    // Obter nome do cliente (se aplicável)
    let clienteNome = '';
    if (data.clienteId === 'manual' && data.clienteManual) {
        clienteNome = data.clienteManual;
    } else if (data.clienteId) {
        const cliente = clientes.find(c => c.id == data.clienteId);
        clienteNome = cliente ? cliente.nome : '';
    }

    // Montar HTML da tabela
    let tablesHTML = '';
    if (!isDiario) {
        tablesHTML = `
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
                <div class="fornecedor-box">
                    <h4>Fornecedor</h4>
                    <div>${data.fornecedor.replace(/\n/g, '<br>')}</div>
                    ${isOrdem && data.fornecedorDetalhes ? `<div>Detalhes Adicionais: ${data.fornecedorDetalhes.replace(/\n/g, '<br>')}</div>` : ''}
                    ${isOrdem ? `<div class="total">Subtotal: R$ ${grandTotal.replace('.', ',')}</div>` : ''}
                </div>
            </div>
        `;
    } else {
        tablesHTML = `
            <div class="table-section">
                <h3>Pessoal</h3>
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
            </div>
            <div class="table-section">
                <h3>Serviços Executados</h3>
                ${data.servicosObra ? `<label>Obra</label><div class="text-box">${data.servicosObra.replace(/\n/g, '<br>')}</div>` : ''}
                ${data.servicosAdministrativo ? `<label>Administrativo</label><div class="text-box">${data.servicosAdministrativo.replace(/\n/g, '<br>')}</div>` : ''}
            </div>
            <div class="table-section">
                <h3>Observações</h3>
                ${data.observacoesAnotacoes ? `<label>Anotações</label><div class="text-box">${data.observacoesAnotacoes.replace(/\n/g, '<br>')}</div>` : ''}
                ${data.observacoesProdutos ? `<label>Solicitação de Produtos</label><div class="text-box">${data.observacoesProdutos.replace(/\n/g, '<br>')}</div>` : ''}
            </div>
        `;
    }

    // Função auxiliar para renderizar campos
    const campo = (label, valor) => valor ? `<label>${label}</label><span>${valor}</span>` : '';

    // HTML do cabeçalho
    let headerHTML = '';
    if (isDiario) {
        headerHTML = `
            <div class="header">
                <img src="data:image/webp;base64,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" alt="Logo da Empresa">
                <h1>Diário de Obras</h1>
                <p>Jeanete Beduschi Arquitetura e Interiores</p>
                <p>Responsável Técnico: Jeanete Beduschi - CAU: 17020/8</p>
                ${data.data ? `<p>Data: ${data.data.split('-').reverse().join('/')}</p>` : ''}
                ${data.pagina ? `<p>Página: ${data.pagina}</p>` : '<p>Página: 1</p>'}
            </div>
        `;
    } else {
        headerHTML = `
            <div class="header">
                <img src="data:image/webp;base64,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" alt="Logo da Empresa">
                <h1>${data.tipo}</h1>
            </div>
        `;
    }

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
                    padding-bottom: 10px;
                    margin-bottom: 20px;
                }
                .header img {
                    max-width: 120px;
                    height: auto;
                }
                .header h1 {
                    font-size: 22px;
                    color: #333;
                    margin: 5px 0;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                }
                .header p {
                    font-size: 12px;
                    color: #333;
                    margin: 3px 0;
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
                .table-section h3 {
                    font-size: 18px;
                    color: #b88a5a;
                    margin-bottom: 10px;
                }
                .table-section p {
                    font-size: 14px;
                    color: #333;
                    line-height: 1.6;
                    word-wrap: break-word;
                    margin: 5px 0;
                }
                .checkbox-list {
                    font-size: 14px;
                    color: #333;
                    line-height: 1.6;
                    word-wrap: break-word;
                    margin-top: 5px;
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
                .text-box {
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    padding: 10px;
                    background-color: #f9f9f9;
                    font-size: 14px;
                    color: #333;
                    line-height: 1.6;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    margin-top: 5px;
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
    let data;
    if (type === 'orcamento') {
        data = collectOrcamentoFormData();
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

// Pré-visualiza documento
function previewDocument(type) {
    let data;
    if (type === 'orcamento') {
        data = collectOrcamentoFormData();
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



