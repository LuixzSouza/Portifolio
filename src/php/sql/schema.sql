-- Schema do CMS do portfólio — importar via phpMyAdmin (Hostinger).
-- Charset utf8mb4 para acentos/emoji. Idiomas em colunas _pt/_en (espelha LocalizedText).

SET NAMES utf8mb4;

-- Usuário(s) do painel admin. Senha SEMPRE como hash bcrypt (password_hash).
CREATE TABLE IF NOT EXISTS admin_users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  username      VARCHAR(80)  NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  criado_em     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Projetos do portfólio.
CREATE TABLE IF NOT EXISTS projects (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  slug             VARCHAR(160) NOT NULL UNIQUE,
  nome             VARCHAR(160) NOT NULL,
  imagem           VARCHAR(255) NULL,
  -- Array de strings em JSON (ex.: ["Next.js","PHP"]). MySQL 5.7+/MariaDB 10.2+.
  tecnologias      JSON         NULL,
  link_linkedin    VARCHAR(500) NULL,
  link_github      VARCHAR(500) NULL,
  link_ver_projeto VARCHAR(500) NULL,
  descricao_pt     TEXT         NULL,
  descricao_en     TEXT         NULL,
  data_pt          VARCHAR(80)  NULL,
  data_en          VARCHAR(80)  NULL,
  ordem            INT          NOT NULL DEFAULT 0,
  publicado        TINYINT(1)   NOT NULL DEFAULT 1,
  criado_em        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_projects_publicado_ordem (publicado, ordem)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Certificados. `course` é o nome oficial (não traduzir); slug derivado dele.
CREATE TABLE IF NOT EXISTS certificates (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  slug          VARCHAR(180) NOT NULL UNIQUE,
  course        VARCHAR(200) NOT NULL,
  issuer        VARCHAR(160) NOT NULL,
  data_curso    VARCHAR(40)  NULL,          -- ano/período, ex.: "2024"
  file          VARCHAR(255) NULL,          -- caminho do PDF em /public
  image         VARCHAR(255) NULL,          -- preview do certificado
  descricao_pt  TEXT         NULL,
  descricao_en  TEXT         NULL,
  skills        JSON         NULL,          -- ["PHP","MySQL"]
  ordem         INT          NOT NULL DEFAULT 0,
  publicado     TINYINT(1)   NOT NULL DEFAULT 1,
  criado_em     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_certificates_publicado_ordem (publicado, ordem)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Depoimentos.
CREATE TABLE IF NOT EXISTS testimonials (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  nome          VARCHAR(160) NOT NULL,
  role_pt       VARCHAR(160) NULL,
  role_en       VARCHAR(160) NULL,
  quote_pt      TEXT         NULL,
  quote_en      TEXT         NULL,
  image         VARCHAR(255) NULL,
  ordem         INT          NOT NULL DEFAULT 0,
  publicado     TINYINT(1)   NOT NULL DEFAULT 1,
  criado_em     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_testimonials_publicado_ordem (publicado, ordem)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Grupos de skills (categorias) e suas skills (1:N).
CREATE TABLE IF NOT EXISTS skill_groups (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  category_pt   VARCHAR(80) NOT NULL,
  category_en   VARCHAR(80) NOT NULL,
  ordem         INT         NOT NULL DEFAULT 0,
  criado_em     TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS skills (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  group_id  INT         NOT NULL,
  name      VARCHAR(80) NOT NULL,
  level     TINYINT     NOT NULL DEFAULT 3,  -- 1..5
  ordem     INT         NOT NULL DEFAULT 0,
  INDEX idx_skills_group (group_id, ordem),
  FOREIGN KEY (group_id) REFERENCES skill_groups(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Marcos da trajetória (timeline). `year` é bilíngue ("Hoje"/"Today").
CREATE TABLE IF NOT EXISTS milestones (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  year_pt       VARCHAR(40)  NOT NULL,
  year_en       VARCHAR(40)  NOT NULL,
  title_pt      VARCHAR(200) NULL,
  title_en      VARCHAR(200) NULL,
  desc_pt       TEXT         NULL,
  desc_en       TEXT         NULL,
  techs         JSON         NULL,          -- ["React","Next.js"]
  ordem         INT          NOT NULL DEFAULT 0,
  publicado     TINYINT(1)   NOT NULL DEFAULT 1,
  criado_em     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_milestones_publicado_ordem (publicado, ordem)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Serviços (páginas /services/[slug]). Estruturas aninhadas em JSON.
CREATE TABLE IF NOT EXISTS services (
  id                  INT AUTO_INCREMENT PRIMARY KEY,
  slug                VARCHAR(160) NOT NULL UNIQUE,
  n                   VARCHAR(8)   NULL,     -- "01", "02"...
  image               VARCHAR(255) NULL,
  accent              VARCHAR(16)  NULL,     -- cor de acento (#hex)
  title_pt            VARCHAR(200) NULL,
  title_en            VARCHAR(200) NULL,
  tagline_pt          VARCHAR(300) NULL,
  tagline_en          VARCHAR(300) NULL,
  intro_pt            TEXT         NULL,
  intro_en            TEXT         NULL,
  forwho_pt           TEXT         NULL,
  forwho_en           TEXT         NULL,
  process             JSON         NULL,     -- [{title:{pt,en},desc:{pt,en}}]
  includes            JSON         NULL,     -- [{pt,en}]
  tags                JSON         NULL,     -- ["..."]
  meta_title_pt       VARCHAR(200) NULL,
  meta_title_en       VARCHAR(200) NULL,
  meta_description_pt VARCHAR(300) NULL,
  meta_description_en VARCHAR(300) NULL,
  ordem               INT          NOT NULL DEFAULT 0,
  publicado           TINYINT(1)   NOT NULL DEFAULT 1,
  criado_em           TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_services_publicado_ordem (publicado, ordem)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Textos de seção (chave/valor). Conteúdo livre bilíngue (about, hero, etc.).
-- `tipo` indica como o front interpreta `valor`:
--   text  -> {"pt":"...","en":"..."}
--   list  -> {"pt":["..."],"en":["..."]}
--   facts -> [{"label":{pt,en},"value":{pt,en}}]
CREATE TABLE IF NOT EXISTS section_content (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  chave         VARCHAR(120) NOT NULL UNIQUE,  -- ex.: "about.bio"
  tipo          VARCHAR(20)  NOT NULL DEFAULT 'text',
  valor         JSON         NULL,
  atualizado_em TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
