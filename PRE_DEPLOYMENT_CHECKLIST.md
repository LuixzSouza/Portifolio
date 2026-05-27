# ✅ Checklist Pré-Deployment

Verifique todos os itens antes de fazer deploy para Hostinger.

---

## 🔍 Verificação Local

### Build & Código

- [ ] `npm run build` executa sem erros
  ```bash
  npm run build
  # Esperado: "Exporting (2/2)" seguido de resumo das rotas
  ```

- [ ] `tsc --noEmit` sem erros TypeScript
  ```bash
  tsc --noEmit
  # Esperado: sem output (silêncio = sucesso)
  ```

- [ ] `npm run lint` sem erros críticos
  ```bash
  npm run lint
  # Avisos de unused vars são OK, erros = bloqueador
  ```

- [ ] 230+ páginas HTML geradas em `/out/`
  ```bash
  find out -name "*.html" | wc -l
  # Esperado: ≥230
  ```

- [ ] Todos os 13 locales presentes
  ```bash
  ls out/ | grep -E "^(pt|en|es|fr|de|it|zh|ja|ru|ar|hi|ko|id)$"
  # Esperado: 13 diretórios listados
  ```

### Traduções

- [ ] Data files traduzidos para 13 idiomas:
  - [ ] `src/data/skills.tsx` — 4 categorias em 13 langs
  - [ ] `src/data/timeline.tsx` — 6 marcos em 13 langs
  - [ ] `src/data/services.ts` — 3 serviços em 13 langs
  - [ ] `src/data/about.tsx` — 6 seções em 13 langs

- [ ] UI dictionaries com 13 idiomas:
  ```bash
  grep "const [a-z][a-z]: Dictionary = {" src/content/dictionaries.ts | wc -l
  # Esperado: 13
  ```

### Features

- [ ] Locale routing funciona (`/pt`, `/en`, `/ar`, etc.)
  ```bash
  grep 'lang="ar"' out/ar.html
  # Esperado: encontrar atributo lang="ar"
  grep 'dir="rtl"' out/ar.html
  # Esperado: encontrar dir="rtl" para árabe
  ```

- [ ] SEO multilíngue presente
  ```bash
  grep 'hreflang' out/pt.html
  # Esperado: encontrar links hreflang para alternativas
  grep 'sitemap.xml' out/robots.txt
  # Esperado: sitemap.xml referenciado
  ```

- [ ] Assets estáticos otimizados
  ```bash
  ls out/image/*.webp | wc -l
  # Esperado: imagens em WebP (comprimidas)
  ```

- [ ] `.htaccess` está presente
  ```bash
  [ -f out/.htaccess ] && echo "OK" || echo "FALTANDO"
  # Esperado: OK
  ```

### Backend

- [ ] `config.example.php` presente (sem config.php real)
  ```bash
  [ -f out/php/config.example.php ] && echo "OK" || echo "FALTANDO"
  [ ! -f out/php/config.php ] && echo "OK (não versionado)" || echo "ERRO"
  ```

- [ ] Arquivos SQL para banco de dados
  ```bash
  [ -f out/php/sql/schema.sql ] && echo "OK" || echo "FALTANDO"
  [ -f out/php/sql/seed.sql ] && echo "OK" || echo "FALTANDO"
  ```

- [ ] API PHP pronta
  ```bash
  ls out/php/api/
  # Esperado: auth.php, projects.php, testimonials.php, etc.
  ```

---

## 🖥️ Credenciais & Configuração

Antes de fazer deployment, tenha em mãos:

### Hostinger
- [ ] Host FTP: `ftp.luixzsouza.com.br` (ou fornecido)
- [ ] Usuário FTP/SFTP: _______________
- [ ] Senha FTP/SFTP: _______________

### MySQL (painel Hostinger)
- [ ] Usuário MySQL: _______________
- [ ] Senha MySQL: _______________
- [ ] Host MySQL: `localhost` (ou IP fornecido)
- [ ] Nome do banco (escolher): _______________

### Email SMTP (para contato)
- [ ] Email: _______________
- [ ] Senha ou app-password: _______________
- [ ] Host SMTP: _______________
- [ ] Porta SMTP: `587` (TLS) ou `465` (SSL)

### Admin (painel admin `/admin`)
- [ ] Email admin: _______________
- [ ] Senha admin temporária: _______________
  *(Será criada em primeira vez via setup-admin.php)*

---

## 📋 Plano de Execução

### Passo 1: Upload para Hostinger (30 minutos)

```bash
# A. Via FTP/SFTP (FileZilla, WinSCP):
#    - Upload /out/* para public_html/
#    - Confirmar .htaccess foi uploaded

# B. Ou via script (requer SFTP):
chmod +x scripts/deploy.sh
./scripts/deploy.sh ftp.luixzsouza.com.br seu-usuario sua-senha
```

- [ ] Upload concluído
- [ ] `.htaccess` presente no servidor

### Passo 2: Configurar Backend (20 minutos)

```bash
# Via SSH ou painel Hostinger:
cd ~/public_html/php
cp config.example.php config.php

# Editar config.php com credenciais reais:
# - DB_USER, DB_PASS, DB_NAME
# - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
```

- [ ] `config.php` criado com credenciais corretas
- [ ] Sem erros de sintaxe PHP

### Passo 3: Importar Banco (15 minutos)

```bash
# Via phpMyAdmin (painel Hostinger):
# 1. Criar banco luixzsouza_portfolio
# 2. Importar: out/php/sql/schema.sql
# 3. Importar: out/php/sql/seed.sql
```

- [ ] Banco criado
- [ ] Schema importado (9 tabelas)
- [ ] Seed importado (dados iniciais)

### Passo 4: Testar APIs (10 minutos)

```bash
# Testar leitura de projetos:
curl https://luixzsouza.com.br/php/api/projects.php?action=list

# Esperado: JSON com lista de projetos
```

- [ ] API retorna dados sem erro
- [ ] Formulário de contato envia emails
- [ ] Painel admin acessa

### Passo 5: Validar Frontend (10 minutos)

```bash
# Testar cada locale:
# - https://luixzsouza.com.br/pt (português)
# - https://luixzsouza.com.br/en (inglês)
# - https://luixzsouza.com.br/ar (árabe, RTL)
# - https://luixzsouza.com.br/zh (chinês)
```

- [ ] Home carrega em português
- [ ] Árabe renderiza com RTL (layout da direita)
- [ ] Selector de idioma funciona
- [ ] Links de navegação funcionam
- [ ] SEO tags presentes (title, meta, og)

---

## 🚨 Possíveis Problemas

### Problema: "404 Not Found" em /ar, /en, etc.

**Diagnóstico:**
- [ ] `.htaccess` foi uploaded?
- [ ] Mod_Rewrite está ativo no painel?
- [ ] Arquivo `.htaccess` não foi comprimido no FTP?

**Solução:**
```bash
# SSH:
cat ~/public_html/.htaccess | head -5
# Deve mostrar conteúdo legível, não comprimido
```

### Problema: API retorna erro 500

**Diagnóstico:**
```bash
# Verificar config.php:
cat ~/public_html/php/config.php | grep "define"
# Todos os valores preenchidos?

# Verificar conexão MySQL:
# Via phpMyAdmin: pode conectar ao banco?
```

**Solução:**
- [ ] Credenciais MySQL corretas em `config.php`
- [ ] Banco foi importado (schema + seed)
- [ ] Permissões de arquivo corretas: `chmod 755 ~/public_html/php`

### Problema: Email não funciona

**Diagnóstico:**
```bash
# Verificar credenciais SMTP em config.php
# Teste manualmente ou via log do servidor
```

**Solução:**
- [ ] SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS corretos
- [ ] Porta 587 (TLS) vs 465 (SSL) conforme seu provider
- [ ] Usar app-specific password se 2FA ativo no email
- [ ] Firewall/ISP não bloqueando porta de email

---

## 📊 Resumo Final

**Quando todos os items estão marcados (☑️):**

✅ Frontend multilíngue funcionando (13 idiomas)  
✅ Backend API conectado ao banco de dados  
✅ Painel admin acessível e funcional  
✅ Email de contato funcionando  
✅ RTL (árabe) renderizando corretamente  
✅ SEO multilíngue completo  

**Site pronto para uso em produção! 🚀**

---

## 📞 Troubleshooting Final

Se algo não funcionar:

1. **Verificar logs no servidor:**
   ```bash
   # SSH:
   tail -50 ~/logs/error.log
   tail -50 ~/logs/access.log
   ```

2. **Testar conectividade MySQL:**
   ```bash
   # Via SSH:
   mysql -u seu-usuario -p -h localhost seu-banco -e "SELECT 1;"
   ```

3. **Testar SMTP:**
   ```bash
   # Via painel Hostinger > Meu Email > Teste de conexão
   ```

4. **Consultar suporte Hostinger:**
   - Chat: https://suporte.hostinger.com.br
   - Tickets via painel

---

**Data de deployment:** _______________  
**Responsável:** _______________  
**Observações:** _______________

---

Boa sorte! 🚀
