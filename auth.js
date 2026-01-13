/**
 * Sistema de Autenticação para Gerador de Documentos
 * Jeanete Beduschi Arquitetura
 */

// Constantes
const AUTH_KEY = 'doc_generator_auth_v1';
const AUTH_TIMESTAMP_KEY = 'doc_generator_auth_time';
const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 dias em millisegundos

// SENHA ATUAL (ALTERE AQUI PARA MUDAR A SENHA)
// Para gerar um novo hash, execute no console: hashPassword("sua_nova_senha")
const CURRENT_PASSWORD_HASH = 'TkRJd01sOW9ZM0poWDJKcUl6VTJPVEVqY1hKaExXSnFqYl9hcmNoXzIwMjQ='; 

/**
 * Função para criar hash da senha
 * Usa uma técnica simples mas efetiva para proteção básica
 */
function hashPassword(password) {
    // Adiciona salt e reverte a string
    const salted = password + 'jb_arch_2024';
    const reversed = salted.split('').reverse().join('');
    
    // Codifica em base64
    let hash = btoa(reversed);
    
    // Adiciona uma segunda camada
    hash = btoa(hash + 'jb_arch_2024');
    
    return hash;
}

/**
 * Verifica se o usuário está autenticado
 */
function checkAuth() {
    const authToken = localStorage.getItem(AUTH_KEY);
    const authTime = localStorage.getItem(AUTH_TIMESTAMP_KEY);
    
    if (!authToken || !authTime) {
        return false;
    }
    
    // Verifica se a sessão expirou
    const currentTime = new Date().getTime();
    const loginTime = parseInt(authTime);
    
    if (currentTime - loginTime > SESSION_DURATION) {
        // Sessão expirada
        logout();
        return false;
    }
    
    // Verifica se o token é válido
    return authToken === CURRENT_PASSWORD_HASH;
}

/**
 * Realiza o login
 */
function login(password) {
    if (!password || password.trim() === '') {
        return false;
    }
    
    const hashedPassword = hashPassword(password);
    
    if (hashedPassword === CURRENT_PASSWORD_HASH) {
        // Salva o token e o timestamp
        localStorage.setItem(AUTH_KEY, hashedPassword);
        localStorage.setItem(AUTH_TIMESTAMP_KEY, new Date().getTime().toString());
        
        // Log de sucesso (pode ser removido em produção)
        console.log('Login realizado com sucesso!');
        
        return true;
    }
    
    // Log de falha (pode ser removido em produção)
    console.log('Senha incorreta');
    
    return false;
}

/**
 * Realiza o logout
 */
function logout() {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_TIMESTAMP_KEY);
    window.location.href = 'login.html';
}

/**
 * Renova a sessão (atualiza o timestamp)
 */
function renewSession() {
    if (checkAuth()) {
        localStorage.setItem(AUTH_TIMESTAMP_KEY, new Date().getTime().toString());
    }
}

/**
 * Proteção automática de páginas
 * Adicione este script em todas as páginas que precisam de autenticação
 */
(function protectPage() {
    // Lista de páginas públicas (não requerem autenticação)
    const publicPages = ['login.html', 'login'];
    
    // Verifica se a página atual é pública
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const isPublicPage = publicPages.some(page => currentPage.includes(page));
    
    // Se não for página pública, verifica autenticação
    if (!isPublicPage && !checkAuth()) {
        window.location.href = 'login.html';
    }
    
    // Renova a sessão a cada 5 minutos se o usuário estiver ativo
    if (!isPublicPage && checkAuth()) {
        setInterval(renewSession, 5 * 60 * 1000);
    }
})();

/**
 * Adiciona botão de logout na interface (opcional)
 */
function addLogoutButton() {
    if (!checkAuth()) return;
    
    // Verifica se já existe um botão de logout
    if (document.getElementById('logout-btn')) return;
    
    const logoutBtn = document.createElement('button');
    logoutBtn.id = 'logout-btn';
    logoutBtn.innerHTML = '🚪 Sair';
    logoutBtn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #d4a373 0%, #b88a5a 100%);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
        font-family: 'Century Gothic', Arial, sans-serif;
        font-size: 14px;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
    `;
    
    logoutBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    });
    
    logoutBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    });
    
    logoutBtn.addEventListener('click', function() {
        if (confirm('Deseja realmente sair do sistema?')) {
            logout();
        }
    });
    
    document.body.appendChild(logoutBtn);
}

// Adiciona o botão de logout quando a página carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addLogoutButton);
} else {
    addLogoutButton();
}

/**
 * INSTRUÇÕES PARA ALTERAR A SENHA:
 * 
 * 1. Abra o console do navegador (F12)
 * 2. Digite: hashPassword("sua_nova_senha")
 * 3. Copie o resultado
 * 4. Cole o resultado na constante CURRENT_PASSWORD_HASH acima
 * 5. Faça commit e push para o GitHub
 * 
 * Exemplo:
 * hashPassword("minhasenha123")
 * Resultado: "MTMyMzIzMTNsYXMxYWhubmltPQ=="
 * 
 * Depois substitua:
 * const CURRENT_PASSWORD_HASH = "MTMyMzIzMTNsYXMxYWhubmltPQ==";
 */