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
    { id: 12, nome: 'Marcia Isabel Pereira', documento: 'CPF', numeroDocumento: '545.972.501-15', pix: '', chavePix: '', telefone: '(47) 99918-6946', endereco: 'Rua 3700 nº 194 Centro BC - ED. Rossini cob 01' },
    { id: 13, nome: 'Célia Wagner', documento: '', numeroDocumento: '', pix: '', chavePix: '', telefone: '(41) 99974-1443', endereco: 'Av. Atlântica 2320 Centro BC, Ed. Apollo 11 ap.923' },
    { id: 14, nome: 'Jacira Pinheiro Seger', documento: 'CPF', numeroDocumento: '787.787.949-00', pix: '', chavePix: '', telefone: '(47) 99912-7305', endereco: 'Av. Atlântica, 4380 apartamento 902' },
    { id: 15, nome: 'Condomínio Peniche', documento: 'CNPJ', numeroDocumento: '24.354.840/0001-10', pix: '', chavePix: '', telefone: '', endereco: 'Rua 3130, 112- Centro Balneário Camboriú 88.330-293' }
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
    { id: 26, empresa: 'Essencial', tipoPagamento: 'CNPJ', pix: '40.777.363/0001-52', nomePix: 'EMERSON VELASQUE' },
    { id: 27, empresa: 'BV Clean', tipoPagamento: 'Celular', pix: '47 992520402', nomePix: 'Nadia Bittencourt' },
    { id: 28, empresa: 'Boutique dos Varais', tipoPagamento: 'Celular', pix: '(47) 999960617', nomePix: 'ALTAIR VIEIRA BORGES' }
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
            formatarMoeda(item.unitPrice),
            formatarMoeda(item.total)
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
                    ${isOrdem ? `<div class="total">Subtotal: ${formatarMoeda(grandTotal)}</div>` : ''}
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
    // HTML do cabeçalho
let headerHTML = '';
if (isDiario) {
    headerHTML = `
        <div class="header">
            <img src="" alt="Logo da Empresa">
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
            <img src="" alt="Logo da Empresa">
            <h1>${data.tipo}</h1>
            ${data.data ? `<p>Data: ${data.data.split('-').reverse().join('/')}</p>` : ''}  <!-- ADICIONE ESSA LINHA AQUI -->
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







