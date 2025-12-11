/**
 * Sistema de Atualização Automática
 * Verifica se há novas versões disponíveis e notifica o usuário
 */

// Constantes
const VERSION_KEY = 'doc_generator_version';
const LAST_CHECK_KEY = 'doc_generator_last_check';
const VERSION_FILE = 'version.txt';
const CHECK_INTERVAL = 60 * 60 * 1000; // Verificar a cada 1 hora

/**
 * Verifica se há atualizações disponíveis
 */
async function checkForUpdates(forceCheck = false) {
    try {
        const now = new Date().getTime();
        const lastCheck = localStorage.getItem(LAST_CHECK_KEY);
        
        // Se não for verificação forçada, verifica o intervalo
        if (!forceCheck && lastCheck) {
            const timeSinceLastCheck = now - parseInt(lastCheck);
            if (timeSinceLastCheck < CHECK_INTERVAL) {
                console.log('Verificação de atualização agendada para mais tarde...');
                return;
            }
        }
        
        // Adiciona timestamp para evitar cache
        const response = await fetch(VERSION_FILE + '?t=' + now);
        
        if (!response.ok) {
            console.log('Não foi possível verificar atualizações');
            return;
        }
        
        const latestVersion = (await response.text()).trim();
        const currentVersion = localStorage.getItem(VERSION_KEY);
        
        // Atualiza o timestamp da última verificação
        localStorage.setItem(LAST_CHECK_KEY, now.toString());
        
        if (!currentVersion) {
            // Primeira vez que o sistema de versão é usado
            localStorage.setItem(VERSION_KEY, latestVersion);
            console.log('Versão inicial registrada:', latestVersion);
        } else if (currentVersion !== latestVersion) {
            // Nova versão disponível
            console.log('Nova versão disponível!', {
                atual: currentVersion,
                nova: latestVersion
            });
            showUpdateNotification(latestVersion);
        } else {
            console.log('Sistema atualizado! Versão:', currentVersion);
        }
    } catch (error) {
        console.error('Erro ao verificar atualizações:', error);
    }
}

/**
 * Mostra notificação de atualização disponível
 */
function showUpdateNotification(newVersion) {
    // Remove notificação anterior se existir
    const existingNotification = document.getElementById('update-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Cria a notificação
    const notification = document.createElement('div');
    notification.id = 'update-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-family: 'Century Gothic', Arial, sans-serif;
        display: flex;
        align-items: center;
        gap: 15px;
        animation: slideDown 0.5s ease-out;
        max-width: 90%;
        width: 500px;
    `;
    
    notification.innerHTML = `
        <style>
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
            
            @keyframes pulse {
                0%, 100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.1);
                }
            }
        </style>
        
        <div style="flex: 1;">
            <div style="font-weight: bold; font-size: 16px; margin-bottom: 5px;">
                ✨ Nova Atualização Disponível!
            </div>
            <div style="font-size: 13px; opacity: 0.9;">
                Versão ${newVersion} está pronta para ser instalada
            </div>
        </div>
        
        <button id="update-now-btn" style="
            background: white;
            color: #4CAF50;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            font-size: 14px;
            transition: all 0.3s ease;
        ">
            Atualizar Agora
        </button>
        
        <button id="update-later-btn" style="
            background: transparent;
            color: white;
            border: 2px solid white;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s ease;
        ">
            Mais Tarde
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Adiciona eventos aos botões
    document.getElementById('update-now-btn').addEventListener('click', function() {
        performUpdate(newVersion);
    });
    
    document.getElementById('update-now-btn').addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    });
    
    document.getElementById('update-now-btn').addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
    
    document.getElementById('update-later-btn').addEventListener('click', function() {
        notification.style.animation = 'slideDown 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    });
    
    document.getElementById('update-later-btn').addEventListener('mouseenter', function() {
        this.style.background = 'rgba(255, 255, 255, 0.2)';
    });
    
    document.getElementById('update-later-btn').addEventListener('mouseleave', function() {
        this.style.background = 'transparent';
    });
}

/**
 * Realiza a atualização
 */
function performUpdate(newVersion) {
    // Mostra mensagem de loading
    const notification = document.getElementById('update-notification');
    notification.innerHTML = `
        <div style="text-align: center; width: 100%;">
            <div style="margin-bottom: 10px; font-weight: bold; font-size: 16px;">
                Atualizando...
            </div>
            <div style="
                border: 3px solid rgba(255, 255, 255, 0.3);
                border-top: 3px solid white;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                margin: 0 auto;
                animation: spin 1s linear infinite;
            "></div>
        </div>
        
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    
    // Atualiza a versão no localStorage
    localStorage.setItem(VERSION_KEY, newVersion);
    
    // Aguarda um momento e recarrega a página
    setTimeout(() => {
        window.location.reload(true);
    }, 1500);
}

/**
 * Força verificação de atualização (pode ser chamado manualmente)
 */
function forceCheckUpdate() {
    checkForUpdates(true);
}

/**
 * Adiciona botão de verificação manual de atualização
 */
function addUpdateCheckButton() {
    // Verifica se está em página de login
    if (window.location.pathname.includes('login')) return;
    
    // Verifica se já existe
    if (document.getElementById('manual-update-btn')) return;
    
    const updateBtn = document.createElement('button');
    updateBtn.id = 'manual-update-btn';
    updateBtn.innerHTML = '🔄 Verificar Atualizações';
    updateBtn.title = 'Clique para verificar se há atualizações disponíveis';
    updateBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 8px;
        cursor: pointer;
        font-family: 'Century Gothic', Arial, sans-serif;
        font-size: 13px;
        font-weight: 600;
        z-index: 999;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
    `;
    
    updateBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    });
    
    updateBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    });
    
    updateBtn.addEventListener('click', async function() {
        this.innerHTML = '⏳ Verificando...';
        this.disabled = true;
        
        await checkForUpdates(true);
        
        // Se não houver atualização, mostra mensagem
        setTimeout(() => {
            if (!document.getElementById('update-notification')) {
                this.innerHTML = '✓ Atualizado!';
                setTimeout(() => {
                    this.innerHTML = '🔄 Verificar Atualizações';
                    this.disabled = false;
                }, 2000);
            } else {
                this.innerHTML = '🔄 Verificar Atualizações';
                this.disabled = false;
            }
        }, 1000);
    });
    
    document.body.appendChild(updateBtn);
}

/**
 * Inicialização automática
 */
(function initVersionSystem() {
    // Não executa na página de login
    if (window.location.pathname.includes('login')) return;
    
    // Verifica atualizações ao carregar a página
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            checkForUpdates();
            addUpdateCheckButton();
        });
    } else {
        checkForUpdates();
        addUpdateCheckButton();
    }
    
    // Verifica periodicamente
    setInterval(() => checkForUpdates(), CHECK_INTERVAL);
})();

/**
 * Expõe funções globais para uso manual
 */
window.docGeneratorVersion = {
    check: checkForUpdates,
    forceCheck: forceCheckUpdate,
    getCurrentVersion: () => localStorage.getItem(VERSION_KEY)
};