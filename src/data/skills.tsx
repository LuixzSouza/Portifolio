import type { LocalizedText } from "@/lib/i18n";

export interface Skill {
  name: string;
  /** Proficiência de 1 a 5. */
  level: number;
}

export interface SkillGroup {
  category: LocalizedText;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: { pt: "Front-end", en: "Front-end", es: "Front-end", fr: "Front-end", de: "Front-end", it: "Front-end", zh: "前端", ja: "フロントエンド", ru: "Front-end", ar: "الواجهة الأمامية", hi: "फ्रंट-एंड", ko: "프론트엔드", id: "Front-end" },
    skills: [
      { name: "HTML5", level: 5 },
      { name: "CSS3", level: 5 },
      { name: "JavaScript", level: 5 },
      { name: "React", level: 4 },
      { name: "Next.js", level: 4 },
      { name: "Sass", level: 5 },
      { name: "Styled Components", level: 5 },
      { name: "Bootstrap", level: 3 },
    ],
  },
  {
    category: { pt: "Back-end & Dados", en: "Back-end & Data", es: "Back-end y Datos", fr: "Back-end et Données", de: "Back-end & Daten", it: "Back-end & Dati", zh: "后端和数据", ja: "バックエンドとデータ", ru: "Back-end и данные", ar: "الواجهة الخلفية والبيانات", hi: "बैक-एंड और डेटा", ko: "백엔드 및 데이터", id: "Back-end dan Data" },
    skills: [
      { name: "Node.js", level: 4 },
      { name: "PHP", level: 3 },
      { name: "MySQL", level: 4 },
      { name: "Java", level: 4 },
      { name: "Python", level: 2 },
      { name: "C", level: 2 },
    ],
  },
  {
    category: { pt: "Design & UI", en: "Design & UI", es: "Diseño e IU", fr: "Conception et IU", de: "Design & UI", it: "Design e UI", zh: "设计和用户界面", ja: "デザインとUI", ru: "Дизайн и UI", ar: "التصميم والواجهة", hi: "डिजाइन और यूआई", ko: "디자인 및 UI", id: "Desain dan UI" },
    skills: [
      { name: "Figma", level: 5 },
      { name: "UI/UX", level: 4 },
      { name: "Prototipação", level: 4 },
    ],
  },
  {
    category: { pt: "Ferramentas & Infra", en: "Tools & Infra", es: "Herramientas e Infraestructura", fr: "Outils et Infrastructure", de: "Werkzeuge und Infrastruktur", it: "Strumenti e Infrastruttura", zh: "工具和基础设施", ja: "ツールとインフラ", ru: "Инструменты и инфраструктура", ar: "الأدوات والبنية الأساسية", hi: "टूल्स और बुनियादी ढांचा", ko: "도구 및 인프라", id: "Alat dan Infrastruktur" },
    skills: [
      { name: "Git", level: 4 },
      { name: "VS Code", level: 5 },
      { name: "Linux", level: 3 },
      { name: "Netlify", level: 5 },
      { name: "AWS", level: 3 },
      { name: "WordPress", level: 3 },
    ],
  },
];
