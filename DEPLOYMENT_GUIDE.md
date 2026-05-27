# 🚀 Guia de Deployment - Portfólio Multilíngue para Hostinger

**Status:** 230 páginas HTML estáticas em 13 idiomas, pronto para upload  
**Tamanho:** 45MB  
**Data:** 27 de maio de 2026

---

## 📦 O que foi gerado

Estrutura em `/out/`:
```
out/
├── pt, en, es, fr, de, it, zh, ja, ru, ar, hi, ko, id/  (13 locales)
├── php/                          (backend API)
├── _next/                        (Next.js assets)
├── image/, icons/, projects/    (assets estáticos)
├── .htaccess                     (rewrite rules, cache, segurança)
├── index.html, pt.html, en.html (rotas raiz)
├── robots.txt                    (SEO)
├── sitemap.xml                   (sitemap multilíngue)
├── manifest.webmanifest         (PWA)
└── 404.html                      (página de erro)
```

**NÃO INCLUSOS (por segurança):**
- `php/config.php` (credenciais SMTP — criar no servidor)
- `php/sql/` (schema e seed — importar manualmente)

---

## 🔧 Passo 1: Preparar Hostinger

### Via SSH (recomendado) ou painel Hostinger:

```bash
# Backup do site atual
cd ~/public_html
mv . ../public_html_backup_$(date +%Y%m%d)

# Criar novo diretório
mkdir ~/public_html
cd ~/public_html
```

---

## 📤 Passo 2: Upload dos Arquivos

### Opção A: Via FTP/SFTP (FileZilla, WinSCP, etc.)

1. **Conectar ao servidor Hostinger:**
   - Host: `ftp.luixzsouza.com.br` (ou host Hostinger fornecido)
   - User: suas credenciais
   - Usar SFTP (porta 22) se disponível

2. **Fazer upload de `/out/` para `public_html/`:**
   - Selecionar todos os arquivos/pastas de `/out/`
   - Fazer upload recursivo para `~/public_html/`
   - Verificar que `.htaccess` foi uploaded (arquivos com `.` podem ser ocultos)

### Opção B: Via RSYNC (mais rápido para atualizações):

```bash
# Local (Windows com WSL/Git Bash):
rsync -avz --delete out/ seu-usuario@seu-host.com.br:~/public_html/
```

### Opção C: Via GitHub Actions (automático em futuro):

Possível adicionar workflow que faz deploy automático no push para main.

---

## ⚙️ Passo 3: Configurar Backend (no Servidor)

### 3.1 Criar `config.php` com credenciais reais:

```bash
# Via SSH:
cd ~/public_html/php
cp config.example.php config.php
nano config.php
```

**Preencher valores reais:**

```php
<?php
// Banco de dados Hostinger
define('DB_HOST', 'localhost');           // ou IP do servidor MySQL
define('DB_USER', 'seu_usuario_mysql');  // usuário do painel Hostinger
define('DB_PASS', 'sua_senha_mysql');    // senha do painel
define('DB_NAME', 'seu_nome_banco');     // ex: luixzsouza_portfolio

// SMTP para contato (PHPMailer)
define('SMTP_HOST', 'smtp.seu-provider.com');    // ex: smtp.hostinger.com
define('SMTP_PORT', 587);                        // ou 465 para SSL
define('SMTP_USER', 'seu-email@luixzsouza.com.br');
define('SMTP_PASS', 'sua-senha-email');          // ⚠️ usar app-specific password se 2FA ativo
define('SMTP_FROM', 'contato@luixzsouza.com.br');
define('SMTP_FROM_NAME', 'Luiz Souza');
```

**Credenciais Hostinger:**
- Usuário MySQL: encontrar em `Hosting > MySQL > Usuários`
- Email SMTP: sua conta email em `Meu Email > Configurações`
- Senha SMTP: usar app-specific password ou senha de email

### 3.2 Permissões de arquivo:

```bash
# Dar permissão ao PHP escrever em diretórios (upload de imagens, cache):
chmod 755 ~/public_html/php
chmod 755 ~/public_html/php/api
chmod 755 ~/public_html/php/uploads  # criar este diretório se não existir
```

---

## 🗄️ Passo 4: Importar Banco de Dados

### Via phpMyAdmin (painel Hostinger):

1. **Acessar phpMyAdmin:**
   - https://seu-host.com.br/phpmyadmin (Hostinger oferece no painel)
   - Login com credenciais MySQL

2. **Criar banco se não existir:**
   - Clique em "Novo"
   - Nome: `luixzsouza_portfolio` (ou o nome que escolheu em config.php)
   - Colação: `utf8mb4_unicode_ci`
   - Criar

3. **Importar schema (estrutura das tabelas):**
   - Selecionar banco recém-criado
   - Aba "Importar"
   - Upload: `out/php/sql/schema.sql`
   - Executar

4. **Importar seed (dados iniciais):**
   - Aba "Importar" (do banco já selecionado)
   - Upload: `out/php/sql/seed.sql`
   - Executar

**Resultado esperado:**
- 9 tabelas: `admin_users`, `projects`, `certificates`, `testimonials`, `skills`, `milestones`, `services`, `section_content`, `skill_groups`
- Dados de exemplo carregados (projetos, certificados, etc.)

---

## ✅ Passo 5: Validar Configuração

### Testar endpoints da API:

```bash
# Via curl ou browser:
curl https://luixzsouza.com.br/php/api/projects.php?action=list

# Resposta esperada:
{
  "success": true,
  "data": [
    { "id": 1, "title": "Casa Pronta", "slug": "casa-pronta", ... },
    ...
  ]
}
```

### Testar login (painel admin):

```bash
# POST https://luixzsouza.com.br/php/api/auth.php
# Body: { "action": "login", "email": "admin@example.com", "password": "..." }
```

Credencial admin padrão (criar via `setup-admin.php` na primeira vez):
- Email: `admin@luixzsouza.com.br` (ou seu email)
- Senha: gerada durante setup

---

## 🌐 Passo 6: Validar Rotas Multilíngues

O `.htaccess` está configurado para:
- Redirecionar `/` → `/pt` (português padrão)
- Aceitar qualquer locale: `/en`, `/es`, `/ar`, etc.
- Servir arquivos estáticos sem rewrite
- Servir `/php/*.php` direto (API)

**URLs para testar:**

| URL | Esperado |
|-----|----------|
| https://luixzsouza.com.br | Redireciona para `/pt` |
| https://luixzsouza.com.br/pt | Home em português |
| https://luixzsouza.com.br/en | Home em inglês |
| https://luixzsouza.com.br/ar | Home em árabe (RTL) |
| https://luixzsouza.com.br/pt/about | Sobre em português |
| https://luixzsouza.com.br/en/work | Projetos em inglês |
| https://luixzsouza.com.br/es/contact | Contato em espanhol |

---

## 🔐 Passo 7: Configurações de Segurança

Todas já estão em `.htaccess`:
- ✅ HTTPS enforce (redireciona HTTP → HTTPS)
- ✅ Gzip/Brotli compression
- ✅ Cache headers para assets estáticos (`_next`, `image`, etc.)
- ✅ Segurança (disable script execution em `/image`, `/mockup`)
- ✅ XSS/Clickjacking headers

**Verificar no servidor (opcional):**
```bash
# Confirmar HTTPS:
curl -I https://luixzsouza.com.br/pt | grep Strict-Transport-Security
```

---

## 🧪 Passo 8: Testes de Produção

### Checklist:

- [ ] Frontend carrega em `https://luixzsouza.com.br/pt`
- [ ] RTL funciona em `/ar` (layout da direita para esquerda)
- [ ] Idiomas alternam corretamente (selector de idioma no header)
- [ ] API `/php/api/projects.php?action=list` retorna dados
- [ ] Formulário de contato envia email
- [ ] Painel admin `/admin` acessa e faz login
- [ ] CRUD do painel funciona (criar/editar/deletar projetos)
- [ ] Imagens carregam (verificar performance em DevTools)
- [ ] SEO tags presentes (title, meta, og, hreflang)
- [ ] 404 e 500 pages renderizam corretamente

### Comando para teste rápido:

```bash
# Verificar que os arquivos estáticos estão sendo servidos:
curl -I https://luixzsouza.com.br/_next/static/chunks/main-app.js | head -5

# Verificar compressão:
curl -I https://luixzsouza.com.br/pt | grep -i content-encoding
# Esperado: gzip ou br
```

---

## 📝 Troubleshooting

### Erro 404 em `/ar`, `/en`, etc.

**Causa:** `.htaccess` não está sendo lido ou mod_rewrite não está ativo  
**Solução:**
```bash
# Verificar se `.htaccess` foi uploaded (pode ser oculto no FTP)
# Verificar no painel Hostinger > Configurações > Mod_Rewrite está ativo
```

### API retorna erro 500

**Verificar:**
```bash
# Credenciais MySQL em config.php
# Banco de dados foi importado (schema + seed)
# Permissões de arquivo (755 em /php)
# PHP 8.0+ está habilitado (conforme CLAUDE.md)
```

### Email de contato não funciona

**Verificar em config.php:**
- SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS corretos
- Usar app-specific password se 2FA ativo
- Porta 587 (TLS) vs 465 (SSL) conforme seu provider

### Imagens não carregam

**Verificar:**
```bash
# Se URLs apontam para paths corretos:
# - `/image/MySelf.webp` (relativo)
# - Não iniciam com http (são caminhos locais)
# DevTools > Network para ver se há 404
```

---

## 🎯 Resultado Final

Após completar todos os passos:

✅ Site em produção: `https://luixzsouza.com.br`  
✅ 13 idiomas funcionando (PT, EN, ES, FR, DE, IT, ZH, JA, RU, AR, HI, KO, ID)  
✅ Árabe com RTL ativado  
✅ API PHP funcionando e conectada ao banco  
✅ Painel admin acessível em `/admin`  
✅ Formulário de contato enviando emails  
✅ SEO multilíngue completo  

---

## 📞 Suporte

**Dúvidas sobre Hostinger?**
- Acessar: https://suporte.hostinger.com.br
- Chat de suporte no painel

**Dúvidas sobre o código?**
- Consultar CLAUDE.md no repositório
- Issues no GitHub: https://github.com/LuixzSouza/portifolio

---

**Deploy completado! 🚀**
