#!/bin/bash

# 🚀 Script de Deployment para Hostinger
# Uso: ./scripts/deploy.sh <host> <usuario> <senha>
# Exemplo: ./scripts/deploy.sh ftp.luixzsouza.com.br seu-usuario sua-senha

set -e

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Validar argumentos
if [ $# -lt 3 ]; then
  echo -e "${RED}❌ Erro: argumentos faltando${NC}"
  echo "Uso: $0 <host> <usuario> <senha>"
  echo "Exemplo: $0 ftp.luixzsouza.com.br seu-usuario sua-senha"
  exit 1
fi

HOST=$1
USER=$2
PASS=$3
REMOTE_PATH="public_html"

echo -e "${YELLOW}🚀 Iniciando deployment...${NC}"
echo "Host: $HOST"
echo "Usuário: $USER"
echo "Caminho remoto: $REMOTE_PATH"
echo ""

# 1. Verificar que /out/ existe
if [ ! -d "out" ]; then
  echo -e "${RED}❌ Erro: diretório 'out' não encontrado${NC}"
  echo "Execute 'npm run build:deploy' primeiro"
  exit 1
fi

echo -e "${GREEN}✓ Build validado${NC}"

# 2. Criar arquivo de comandos FTP
echo -e "${YELLOW}📝 Preparando comandos FTP...${NC}"

FTP_SCRIPT="__deploy_ftp.txt"

cat > "$FTP_SCRIPT" << EOF
open $HOST
$USER
$PASS
bin
cd $REMOTE_PATH
prompt off
mput -R out/*
quit
EOF

echo -e "${GREEN}✓ Script FTP preparado${NC}"

# 3. Executar upload (requer ftp disponível)
if command -v ftp &> /dev/null; then
  echo -e "${YELLOW}📤 Iniciando upload FTP...${NC}"
  ftp -n -s:"$FTP_SCRIPT"

  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Upload concluído com sucesso${NC}"
  else
    echo -e "${RED}❌ Erro no upload FTP${NC}"
    exit 1
  fi

  rm "$FTP_SCRIPT"
else
  # Fallback: usar rsync se disponível
  if command -v rsync &> /dev/null; then
    echo -e "${YELLOW}📤 Usando RSYNC (alternativa FTP)...${NC}"
    rsync -avz --delete out/ ${USER}@${HOST}:${REMOTE_PATH}/
    echo -e "${GREEN}✓ Upload via RSYNC concluído${NC}"
  else
    echo -e "${RED}❌ Erro: ftp ou rsync não disponível${NC}"
    echo "Faça upload manualmente de 'out/' para 'public_html/' no servidor"
    rm "$FTP_SCRIPT"
    exit 1
  fi
fi

echo ""
echo -e "${GREEN}✓ Deployment concluído!${NC}"
echo ""
echo "Próximos passos:"
echo "1. Via SSH, criar config.php em ~/public_html/php/"
echo "   cp ~/public_html/php/config.example.php ~/public_html/php/config.php"
echo "   nano ~/public_html/php/config.php"
echo ""
echo "2. Via phpMyAdmin, importar banco de dados:"
echo "   - Criar banco 'luixzsouza_portfolio'"
echo "   - Importar schema.sql"
echo "   - Importar seed.sql"
echo ""
echo "3. Testar em: https://luixzsouza.com.br/pt"
echo ""
