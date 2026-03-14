document.addEventListener('DOMContentLoaded', function() {
    initializeSmoothScroll();
    initializeAnimations();
    initializeScrollProgress();
    initializeScrollToTop();
    setActiveNav();
    initializeToasts();
});

// Função para inicializar o scroll suave para âncoras
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Função para inicializar as animações de fade-in
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .endpoint-card, .security-card, .step-card').forEach(el => {
        observer.observe(el);
    });
}

// Barra de progresso de scroll
function initializeScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Função para inicializar o botão de scroll para o topo
function initializeScrollToTop() {
    const scrollBtn = document.createElement('a');
    scrollBtn.href = '#';
    scrollBtn.className = 'scroll-top';
    scrollBtn.innerHTML = '↑';
    scrollBtn.setAttribute('aria-label', 'Voltar ao topo');
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    
    scrollBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Função para abrir o modal de tutorial
window.openTutorial = function(tutorialId) {
    const modal = document.getElementById('tutorialModal');
    const tutorialTitle = document.getElementById('tutorialTitle');
    const tutorialContent = document.getElementById('tutorialContent');
    
    if (!modal || !tutorialContent) {
        console.error('Modal de tutorial não encontrado');
        return;
    }
    
    const tutorialData = getTutorialContent(tutorialId);
    tutorialTitle.textContent = tutorialData.title;
    tutorialContent.innerHTML = tutorialData.content;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

window.closeTutorialModal = function() {
    const modal = document.getElementById('tutorialModal');
    
    if (!modal) return;
    
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function getTutorialContent(tutorialId) {
    const tutorials = {
        'tutorial-geracao': {
            title: '📝 Tutorial: Geração de Chaves RSA',
            content: `
                <div class="tutorial-section">
                    <h4>Pré-requisitos</h4>
                    <ul class="tutorial-steps">
                        <li class="tutorial-step">
                            <span class="tutorial-step-number">1</span>
                            <div class="tutorial-step-text">
                                <strong>OpenSSL instalado</strong>
                                <p>Verifique se o OpenSSL está instalado no seu sistema</p>
                                <pre>openssl version</pre>
                            </div>
                        </li>
                        <li class="tutorial-step">
                            <span class="tutorial-step-number">2</span>
                            <div class="tutorial-step-text">
                                <strong>Acesso ao terminal</strong>
                                <p>Você precisará de um terminal/command prompt com permissões adequadas</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="tutorial-section">
                    <h4>Passo 1: Gerar Chave Privada</h4>
                    <div class="tutorial-code-block">
                        <button class="copy-btn" onclick="copyText(this, 'openssl genrsa -out private_key.pem 1024')">Copiar</button>
                        <pre>openssl genrsa -out private_key.pem 1024</pre>
                    </div>
                    <p>Este comando gera uma chave privada RSA de 1024 bits e salva no arquivo <code>private_key.pem</code></p>
                </div>

                <div class="tutorial-section">
                    <h4>Passo 2: Extrair Chave Pública</h4>
                    <div class="tutorial-code-block">
                        <button class="copy-btn" onclick="copyText(this, 'openssl rsa -in private_key.pem -pubout -out public_key.pem')">Copiar</button>
                        <pre>openssl rsa -in private_key.pem -pubout -out public_key.pem</pre>
                    </div>
                    <p>Extrai a chave pública do arquivo de chave privada</p>
                </div>

                <div class="tutorial-section">
                    <h4>Passo 3: Verificar as Chaves</h4>
                    <div class="tutorial-code-block">
                        <button class="copy-btn" onclick="copyText(this, 'cat private_key.pem')">Copiar</button>
                        <pre>cat private_key.pem</pre>
                    </div>
                    <div class="tutorial-code-block">
                        <button class="copy-btn" onclick="copyText(this, 'cat public_key.pem')">Copiar</button>
                        <pre>cat public_key.pem</pre>
                    </div>
                </div>

                <div class="tutorial-note">
                    <p><strong>🔒 Importante:</strong> Mantenha sua chave privada em local seguro! Nunca compartilhe ou exponha publicamente.</p>
                </div>

                <div class="tutorial-warning">
                    <p><strong>⚠️ Atenção:</strong> Certifique-se de usar o formato correto da chave ao fazer upload no portal PAYPAY.</p>
                </div>
            `
        },
        'tutorial-upload': {
            title: '🔧 Tutorial: Configuração no Portal',
            content: `
                <div class="tutorial-section">
                    <h4>Passo 1: Acessar o Portal</h4>
                    <div class="tutorial-step-text">
                        <p>Acesse <a href="https://portal.paypayafrica.com" target="_blank">portal.paypayafrica.com</a> e faça login com suas credenciais</p>
                    </div>
                </div>

                <div class="tutorial-section">
                    <h4>Passo 2: Acessar Configuração da API</h4>
                    <div class="tutorial-step-text">
                        <p>Depois de se logar com sucesso, acesse diretamente a área de configuração da API através do link:</p>
                        <div class="tutorial-code-block">
                            <button class="copy-btn" onclick="copyText(this, 'https://portal.paypayafrica.com/passport/apisetting')">Copiar Link</button>
                            <pre>https://portal.paypayafrica.com/passport/apisetting</pre>
                        </div>
                    </div>
                </div>

                <div class="tutorial-section">
                    <h4>Passo 3: Formatar a Chave Pública</h4>
                    <div class="tutorial-step-text">
                        <p><strong>Descrição importante do portal:</strong></p>
                        <div class="tutorial-note">
                            <p><strong>Formato original de chave pública RSA:</strong></p>
                            <pre>-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5DQ6tn9fg9T/I9yguoSj4Bd9j
EBBtBzH8A3Z0q0HuxkvjpydHK4t57sA4l3UM02wDd7Csnm/4W8zUUJFs+uqy3+Ms
UxEElBrXWiDVw9LRn/nuXeF0rZ0MQwFcqNvvvNM64+QubBOAfFleSu8PgsVbVAzw
GG4KQnPvGmOmzpPjLwIDAQAB
-----END PUBLIC KEY-----</pre>
                        </div>
                        <p><strong>⚠️ É necessário remover os cabeçalhos e substituir as quebras de linha antes de carregar:</strong></p>
                        <div class="tutorial-code-block">
                            <button class="copy-btn" onclick="copyText(this, 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5DQ6tn9fg9T/I9yguoSj4Bd9jEBBtBzH8A3Z0q0HuxkvjpydHK4t57sA4l3UM02wDd7Csnm/4W8zUUJFs+uqy3+MsUxEElBrXWiDVw9LRn/nuXeF0rZ0MQwFcqNvvvNM64+QubBOAfFleSu8PgsVbVAzwGG4KQnPvGmOmzpPjLwIDAQAB')">Copiar Chave Formatada</button>
                            <pre>MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5DQ6tn9fg9T/I9yguoSj4Bd9jEBBtBzH8A3Z0q0HuxkvjpydHK4t57sA4l3UM02wDd7Csnm/4W8zUUJFs+uqy3+MsUxEElBrXWiDVw9LRn/nuXeF0rZ0MQwFcqNvvvNM64+QubBOAfFleSu8PgsVbVAzwGG4KQnPvGmOmzpPjLwIDAQAB</pre>
                        </div>
                        <p>A chave deve ser uma linha contínua, sem quebras e sem os cabeçalhos <code>-----BEGIN PUBLIC KEY-----</code> e <code>-----END PUBLIC KEY-----</code>.</p>
                    </div>
                </div>
                <div class="tutorial-warning">
                    <p><strong>⚠️ Importante:</strong> Guarde suas credenciais em local seguro! Nunca compartilhe sua Secret Key.</p>
                </div>

                <div class="tutorial-note">
                    <p><strong>✅ Próximo passo:</strong> Após configurar, você já pode começar a testar os endpoints da API.</p>
                </div>
            `
        },
        'tutorial-testes': {
            title: '🚀 Tutorial: Testando a API',
            content: `
                <div class="tutorial-section">
                    <h4>Ambiente de Testes</h4>
                    <p>A PAYPAY oferece um ambiente de sandbox para testes:</p>
                    <div class="tutorial-code-block">
                        <pre>API Base URL: https://gateway.paypayafrica.com/gateway/recv.do</pre>
                    </div>
                </div>

                <div class="tutorial-section">
                    <h4>Passo 1: Autenticação</h4>
                    <p>Todas as requisições precisam incluir um token de autenticação:</p>
                    <div class="tutorial-code-block">
                        <button class="copy-btn" onclick="copyText(this, 'Authorization: Bearer SEU_TOKEN_AQUI')">Copiar</button>
                        <pre>Authorization: Bearer SEU_TOKEN_AQUI</pre>
                    </div>
                </div>

                <div class="tutorial-section">
                    <h4>Passo 2: Exemplo em JavaScript (Node.js)</h4>
                    <div class="tutorial-code-block">
                        <button class="copy-btn" onclick="copyText(this, 'const crypto = require(\"crypto\");\nconst fs = require(\"fs\");\n\nconst privateKey = fs.readFileSync(\"private_key.pem\");\nconst data = \"SEU_BIZ_CONTENT\";\nconst sign = crypto.createSign(\"SHA1\");\nsign.update(data);\nconst signature = sign.sign(privateKey, \"base64\");')">Copiar</button>
                        <pre>const crypto = require("crypto");
const fs = require("fs");

const privateKey = fs.readFileSync("private_key.pem");
const data = "SEU_BIZ_CONTENT";
const sign = crypto.createSign("SHA1");
sign.update(data);
const signature = sign.sign(privateKey, "base64");</pre>
                    </div>
                </div>

                <div class="tutorial-section">
                    <h4>Passo 3: Testar Endpoint de Pagamento</h4>
                    <p>Exemplo de requisição para criar um pagamento:</p>
                    <div class="tutorial-code-block">
                        <button class="copy-btn" onclick="copyText(this, 'curl -X POST https://sandbox-api.paypayafrica.com/v1/payment/app \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Authorization: Bearer SEU_TOKEN\" \\\n  -d \'{\n    \"request_no\": \"' + Date.now() + '\",\n    \"service\": \"instant_trade\",\n    \"partner_id\": \"200001835716\",\n    \"sign\": \"SUA_ASSINATURA_AQUI\",\n    \"sign_type\": \"RSA\",\n    \"timestamp\": \"' + new Date().toISOString().slice(0,19).replace('T', ' ') + '\",\n    \"biz_content\": \"SEU_BIZ_CONTENT_CRIPTOGRAFADO\"\n  }\'')">Copiar</button>
                        <pre>curl -X POST https://sandbox-api.paypayafrica.com/v1/payment/app \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "request_no": "' + Date.now() + '",
    "service": "instant_trade",
    "partner_id": "200001835716",
    "sign": "SUA_ASSINATURA_AQUI",
    "sign_type": "RSA",
    "timestamp": "' + new Date().toISOString().slice(0,19).replace('T', ' ') + '",
    "biz_content": "SEU_BIZ_CONTENT_CRIPTOGRAFADO"
  }'</pre>
                    </div>
                </div>

                <div class="tutorial-section">
                    <h4>Passo 4: Interpretar Respostas</h4>
                    <p>Exemplo de resposta de sucesso:</p>
                    <div class="tutorial-code-block">
                        <pre>{
  "code": "S0001",
  "msg": "success",
  "sub_code": "S0001",
  "sub_msg": "success",
  "sign": "g+DCRRN1s3sf+gD6kVk0IEHeJBL7pO0KeW...",
  "biz_content": {
    "out_trade_no": "2022011812364864515635551",
    "trade_no": "101164267909194269883",
    "status": "P",
    "trade_token": "3b189ff399db4de4a24bae47bdadf4ef"
  }
}</pre>
                    </div>
                </div>

                <div class="tutorial-section">
                    <h4>Passo 5: Códigos de Status</h4>
                    <table class="return-codes-table">
                        <tr><th>Código</th><th>Significado</th></tr>
                        <tr><td><span class="code-badge success">S0001</span></td><td>Sucesso</td></tr>
                        <tr><td><span class="code-badge error">F11</span></td><td>Erro de autenticação</td></tr>
                        <tr><td><span class="code-badge error">F31</span></td><td>Assinatura inválida</td></tr>
                        <tr><td><span class="code-badge error">F41</span></td><td>Formato da chave pública inválido</td></tr>
                        <tr><td><span class="code-badge warning">P11</span></td><td>Pagamento pendente</td></tr>
                        <tr><td><span class="code-badge warning">U11</span></td><td>Processando</td></tr>
                    </table>
                </div>

                <div class="tutorial-note">
                    <p><strong>📚 Documentação completa:</strong> Consulte nossa documentação para detalhes de todos os endpoints e parâmetros.</p>
                </div>

                <div class="tutorial-warning">
                    <p><strong>⚠️ Ambiente de Produção:</strong> Quando estiver pronto para produção, lembre-se de alterar a URL para api.paypayafrica.com/v1 e usar suas credenciais de produção.</p>
                </div>
            `
        }
    };
    
    return tutorials[tutorialId] || {
        title: 'Tutorial não encontrado',
        content: '<p>Desculpe, o tutorial solicitado não está disponível.</p>'
    };
}

// Função para inicializar o sistema de toasts
function initializeToasts() {
    if (!document.querySelector('.toast')) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
}

function showToast(message, duration = 3000) {
    const toast = document.querySelector('.toast');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }
}

// COPY CODE FUNCTION
function copyCode(elementId, btn) {
    const codeElement = document.getElementById(elementId);
    if (codeElement) {
        const code = codeElement.innerText;
        
        navigator.clipboard.writeText(code).then(() => {
            showToast('Código copiado!');
            
            const originalText = btn.textContent;
            btn.style.background = 'var(--success)';
            btn.textContent = 'Copiado!';
            
            setTimeout(() => {
                btn.style.background = '#0e639c';
                btn.textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Erro ao copiar:', err);
            showToast(' Erro ao copiar código');
        });
    }
}

window.copyText = function(btn, text) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'Copiado!';
        btn.style.background = 'var(--success)';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '#0e639c';
        }, 2000);
        
        showToast('Texto copiado!');
    }).catch(err => {
        console.error('Erro ao copiar:', err);
        showToast('Erro ao copiar texto');
    });
}

// ACTIVE NAVIGATION 
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Fechar com a tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeTutorialModal();
    }
});

// EXPORT GLOBAL FUNCTIONS 
window.showToast = showToast;
window.copyCode = copyCode;
window.openTutorial = openTutorial;
window.closeTutorialModal = closeTutorialModal;
window.copyText = copyText;