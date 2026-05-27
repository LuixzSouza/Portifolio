import type { LocalizedText } from "@/lib/i18n";
import { slugify } from "@/lib/slug";

export interface Certificate {
  /** Nome oficial do curso (mantido no idioma original — não traduzir). */
  course: string;
  issuer: string;
  date: string;
  /** Caminho do PDF em /public. */
  file: string;
  /** Imagem (preview) do certificado em /public. */
  image: string;
  /** Descrição do que foi aprendido (bilíngue). */
  description: LocalizedText;
  /** Tópicos/competências abordados. */
  skills: string[];
}

export const certificates: Certificate[] = [
  {
    course: "Especialista PHP",
    issuer: "Rocketseat",
    date: "2024",
    file: "/certificates/Certificado_php_Luiz.pdf",
    image: "/certificates/certificatesImg/Certificado_php_Luiz.webp",
    description: {
      pt: "Formação focada em desenvolvimento back-end com PHP: fundamentos da linguagem, programação orientada a objetos, integração com banco de dados MySQL e boas práticas para construir aplicações web seguras e organizadas.",
      en: "Back-end development training focused on PHP: language fundamentals, object-oriented programming, MySQL database integration and best practices to build secure, well-organized web applications.",
      es: "Formación de desarrollo back-end enfocada en PHP: fundamentos del lenguaje, programación orientada a objetos, integración con base de datos MySQL y mejores prácticas para construir aplicaciones web seguras y bien organizadas.",
      fr: "Formation au développement back-end axée sur PHP: fondamentaux du langage, programmation orientée objet, intégration de base de données MySQL et meilleures pratiques pour construire des applications web sécurisées et bien organisées.",
      de: "Back-End-Entwicklungsschulung mit Fokus auf PHP: Sprachgrundlagen, objektorientierte Programmierung, MySQL-Datenbankintegration und Best Practices zum Erstellen sicherer, gut organisierter Webanwendungen.",
      it: "Formazione di sviluppo back-end focalizzata su PHP: fondamenti del linguaggio, programmazione orientata agli oggetti, integrazione del database MySQL e best practice per costruire applicazioni web sicure e ben organizzate.",
      zh: "以PHP为重点的后端开发培训：语言基础、面向对象编程、MySQL数据库集成以及构建安全、组织良好的Web应用程序的最佳实践。",
      ja: "PHPに焦点を当てたバックエンド開発トレーニング：言語の基礎、オブジェクト指向プログラミング、MySQLデータベース統合、およびセキュアで組織化されたWebアプリケーションを構築するためのベストプラクティス。",
      ru: "Обучение разработке back-end с акцентом на PHP: основы языка, объектно-ориентированное программирование, интеграция базы данных MySQL и лучшие практики для создания безопасных, хорошо организованных веб-приложений.",
      ar: "تدريب تطوير النهاية الخلفية مع التركيز على PHP: أساسيات اللغة، البرمجة الموجهة للكائنات، تكامل قاعدة البيانات MySQL وأفضل الممارسات لبناء تطبيقات ويب آمنة وجيدة التنظيم.",
      hi: "PHP पर केंद्रित बैक-एंड विकास प्रशिक्षण: भाषा के मूल सिद्धांत, ऑब्जेक्ट-ओरिएंटेड प्रोग्रामिंग, MySQL डेटाबेस एकीकरण और सुरक्षित, अच्छी तरह से संगठित वेब एप्लिकेशन बनाने के लिए सर्वोत्तम प्रथाएं।",
      ko: "PHP에 중점을 둔 백엔드 개발 교육: 언어 기초, 객체 지향 프로그래밍, MySQL 데이터베이스 통합 및 안전하고 잘 구성된 웹 응용 프로그램을 구축하기 위한 모범 사례.",
      id: "Pelatihan pengembangan back-end yang fokus pada PHP: fondasi bahasa, pemrograman berorientasi objek, integrasi basis data MySQL dan praktik terbaik untuk membangun aplikasi web yang aman dan terorganisir dengan baik."
    },
    skills: ["PHP", "POO", "MySQL", "Back-end", "Web"],
  },
  {
    course: "AWS Academy Cloud Foundations",
    issuer: "AWS Academy",
    date: "2024",
    file: "/certificates/Certificado_AWS.pdf",
    image: "/certificates/certificatesImg/Certificado_AWS.webp",
    description: {
      pt: "Fundamentos de computação em nuvem com a Amazon Web Services: principais serviços, segurança, arquitetura, precificação e o modelo de responsabilidade compartilhada da AWS.",
      en: "Cloud computing fundamentals with Amazon Web Services: core services, security, architecture, pricing and the AWS shared responsibility model.",
      es: "Fundamentos de computación en la nube con Amazon Web Services: servicios principales, seguridad, arquitectura, precios y el modelo de responsabilidad compartida de AWS.",
      fr: "Principes fondamentaux de l'informatique en nuage avec Amazon Web Services: services principaux, sécurité, architecture, tarification et modèle de responsabilité partagée d'AWS.",
      de: "Cloud-Computing-Grundlagen mit Amazon Web Services: Kernservices, Sicherheit, Architektur, Preisgestaltung und das AWS-Modell der gemeinsamen Verantwortung.",
      it: "Fondamenti del cloud computing con Amazon Web Services: servizi principali, sicurezza, architettura, prezzi e modello di responsabilità condivisa di AWS.",
      zh: "使用Amazon Web Services的云计算基础：核心服务、安全性、架构、定价和AWS共享责任模型。",
      ja: "Amazon Web Servicesを使用したクラウドコンピューティングの基礎：コアサービス、セキュリティ、アーキテクチャ、価格設定、およびAWSの共有責任モデル。",
      ru: "Основы облачных вычислений с Amazon Web Services: основные сервисы, безопасность, архитектура, ценообразование и модель общей ответственности AWS.",
      ar: "أساسيات حوسبة السحابة مع خدمات الويب الأمازون: الخدمات الأساسية والأمان والهندسة المعمارية والأسعار ونموذج المسؤولية المشتركة لـ AWS.",
      hi: "Amazon Web Services के साथ क्लाउड कंप्यूटिंग के मूलतत्व: मुख्य सेवाएं, सुरक्षा, आर्किटेक्चर, मूल्य निर्धारण और AWS साझा जिम्मेदारी मॉडल।",
      ko: "Amazon Web Services를 사용한 클라우드 컴퓨팅 기초: 핵심 서비스, 보안, 아키텍처, 가격 및 AWS 공유 책임 모델.",
      id: "Fondasi komputasi cloud dengan Amazon Web Services: layanan inti, keamanan, arsitektur, penetapan harga dan model tanggung jawab bersama AWS."
    },
    skills: ["AWS", "Cloud", "Infraestrutura", "Segurança"],
  },
  {
    course: "Criação de Sites",
    issuer: "Bradesco",
    date: "2024",
    file: "/certificates/Certificado-Bradesco.pdf",
    image: "/certificates/certificatesImg/Certificado-Bradesco.webp",
    description: {
      pt: "Curso sobre os fundamentos da criação de sites: estruturação com HTML, estilização com CSS e os princípios essenciais para colocar uma página no ar de forma profissional.",
      en: "A course on the fundamentals of website creation: structuring with HTML, styling with CSS and the essential principles to launch a page professionally.",
      es: "Un curso sobre los fundamentos de la creación de sitios web: estructuración con HTML, estilo con CSS y los principios esenciales para lanzar una página profesionalmente.",
      fr: "Un cours sur les fondamentaux de la création de sites web: structuration avec HTML, style avec CSS et les principes essentiels pour lancer une page professionnellement.",
      de: "Ein Kurs über die Grundlagen der Website-Erstellung: Strukturierung mit HTML, Styling mit CSS und die wesentlichen Prinzipien zum professionellen Starten einer Seite.",
      it: "Un corso sui fondamenti della creazione di siti web: strutturazione con HTML, stile con CSS e i principi essenziali per lanciare una pagina professionalmente.",
      zh: "关于网站创建基础的课程：使用HTML进行结构化、使用CSS进行样式设置以及以专业方式启动页面的基本原则。",
      ja: "Webサイト作成の基礎に関するコース：HTMLで構造化、CSSでスタイリング、およびページをプロフェッショナルに起動するための基本原則。",
      ru: "Курс по основам создания веб-сайтов: структурирование с помощью HTML, стилизация с помощью CSS и основные принципы профессионального запуска страницы.",
      ar: "دورة عن أساسيات إنشاء مواقع الويب: البنية مع HTML والأسلوب مع CSS والمبادئ الأساسية لإطلاق صفحة احترافية.",
      hi: "वेबसाइट निर्माण की बुनियादी बातों पर एक पाठ्यक्रम: HTML के साथ संरचना, CSS के साथ स्टाइलिंग और एक पृष्ठ को पेशेवर तरीके से लॉन्च करने के लिए आवश्यक सिद्धांत।",
      ko: "웹사이트 작성의 기초에 관한 과정: HTML로 구조화, CSS로 스타일링 및 페이지를 전문적으로 출시하기 위한 필수 원칙.",
      id: "Kursus tentang fondasi pembuatan situs web: strukturisasi dengan HTML, styling dengan CSS dan prinsip-prinsip penting untuk meluncurkan halaman secara profesional."
    },
    skills: ["HTML", "CSS", "Web Design"],
  },
  {
    course: "Melhor Arte Visual — Game Jam",
    issuer: "Game Jam",
    date: "2024",
    file: "/certificates/Certificado_GameJam.pdf",
    image: "/certificates/certificatesImg/Certificado_GameJam.webp",
    description: {
      pt: "Reconhecimento de Melhor Arte Visual em uma Game Jam — uma maratona de desenvolvimento onde uma equipe cria um jogo do zero em tempo limitado, com destaque para a direção visual do projeto.",
      en: "Best Visual Art award at a Game Jam — a development marathon where a team builds a game from scratch in limited time, recognized here for the project's visual direction.",
      es: "Premio a Mejor Arte Visual en una Game Jam — una maratona de desarrollo donde un equipo crea un juego desde cero en tiempo limitado, reconocido aquí por la dirección visual del proyecto.",
      fr: "Prix de la meilleure art visuel lors d'une Game Jam — un marathon de développement où une équipe crée un jeu à partir de zéro dans un temps limité, reconnu ici pour la direction visuelle du projet.",
      de: "Best Visual Art Award bei einer Game Jam — ein Entwicklungsmarathon, bei dem ein Team ein Spiel von Grund auf in begrenzter Zeit erstellt und hier für die visuelle Leitung des Projekts ausgezeichnet wird.",
      it: "Premio Best Visual Art a una Game Jam — una maratona di sviluppo in cui un team costruisce un gioco da zero in tempo limitato, riconosciuto qui per la direzione visiva del progetto.",
      zh: "在Game Jam中获得最佳视觉艺术奖——一个开发马拉松，团队在有限的时间内从零开始创建游戏，在这里因项目的视觉指导而获得认可。",
      ja: "Game Jamでの最優秀ビジュアルアート賞——限られた時間内でチームがゼロからゲームを構築する開発マラソン、プロジェクトのビジュアルディレクションで認識されています。",
      ru: "Премия Best Visual Art на Game Jam — марафон разработки, где команда создает игру с нуля в ограниченное время, здесь признана за визуальное направление проекта.",
      ar: "جائزة أفضل فن بصري في Game Jam — ماراثون تطوير حيث يقوم الفريق ببناء لعبة من الصفر في وقت محدود، معترف به هنا لاتجاهه البصري للمشروع.",
      hi: "Game Jam में सर्वश्रेष्ठ विजुअल आर्ट पुरस्कार — एक विकास मैराथन जहां एक टीम सीमित समय में शून्य से एक गेम बनाती है, यहां परियोजना की दृश्य दिशा के लिए मान्यता प्राप्त है।",
      ko: "Game Jam에서의 최우수 비주얼 아트상 — 팀이 제한된 시간 내에 처음부터 게임을 만드는 개발 마라톤으로, 프로젝트의 시각적 방향으로 인정받고 있습니다.",
      id: "Penghargaan Best Visual Art di Game Jam — maraton pengembangan di mana tim membangun game dari nol dalam waktu terbatas, diakui di sini karena arah visual proyek."
    },
    skills: ["Design", "Arte Visual", "UI", "Trabalho em equipe"],
  },
  {
    course: "CodeBoost Front-End",
    issuer: "William Moreira",
    date: "2023",
    file: "/certificates/Certificado_Boost_Luiz.pdf",
    image: "/certificates/certificatesImg/Certificado_Boost_Luiz.webp",
    description: {
      pt: "Imersão prática em desenvolvimento front-end, reforçando HTML, CSS e JavaScript com foco na construção de interfaces modernas, responsivas e fiéis ao design.",
      en: "Hands-on front-end development bootcamp, reinforcing HTML, CSS and JavaScript with a focus on building modern, responsive interfaces faithful to the design.",
      es: "Bootcamp práctico de desarrollo front-end, reforzando HTML, CSS y JavaScript con enfoque en la construcción de interfaces modernas, responsivas y fieles al diseño.",
      fr: "Bootcamp pratique de développement front-end, renforçant HTML, CSS et JavaScript avec un accent sur la création d'interfaces modernes, réactives et fidèles au design.",
      de: "Praktisches Front-End-Entwicklungs-Bootcamp, das HTML, CSS und JavaScript mit Fokus auf die Erstellung moderner, responsiver Schnittstellen verstärkt, die dem Design treu sind.",
      it: "Bootcamp pratico di sviluppo front-end, rafforzando HTML, CSS e JavaScript con focus sulla costruzione di interfacce moderne, responsive e fedeli al design.",
      zh: "实践性前端开发训练营，加强HTML、CSS和JavaScript，重点是构建现代、响应式且忠于设计的界面。",
      ja: "実践的なフロントエンド開発ブートキャンプ、HTML、CSS、JavaScriptを強化し、設計に忠実な最新のレスポンシブインターフェースの構築に焦点を当てています。",
      ru: "Практический бутлегерский лагерь разработки переднего конца, укреплении HTML, CSS и JavaScript с акцентом на создание современных, отзывчивых интерфейсов, верных дизайну.",
      ar: "معسكر تطوير الواجهة الأمامية العملي، مما يقوي HTML و CSS و JavaScript مع التركيز على بناء واجهات حديثة وسريعة الاستجابة وأمينة للتصميم.",
      hi: "फ्रंटएंड विकास बूटकैंप, HTML, CSS और JavaScript को मजबूत करते हुए डिजाइन के अनुरूप आधुनिक, उत्तरदायी इंटरफेस बनाने पर ध्यान केंद्रित करते हुए।",
      ko: "실습 프런트엔드 개발 부트캠프로 HTML, CSS 및 JavaScript를 강화하고 디자인에 충실한 현대적이고 반응형 인터페이스 구축에 중점을 두고 있습니다.",
      id: "Bootcamp pengembangan front-end hands-on, memperkuat HTML, CSS dan JavaScript dengan fokus pada pembangunan antarmuka modern, responsif dan setia dengan desain."
    },
    skills: ["HTML", "CSS", "JavaScript", "Front-end", "Responsivo"],
  },
  {
    course: "Normas da ABNT (Módulo I)",
    issuer: "Univas Virtual",
    date: "2023",
    file: "/certificates/Certificado_ABNT_Univas_Luiz.pdf",
    image: "/certificates/certificatesImg/Certificado_ABNT_Univas_Luiz.webp",
    description: {
      pt: "Curso sobre as normas da ABNT para trabalhos acadêmicos: formatação, citações, referências e a estrutura padrão exigida em documentos técnicos e científicos.",
      en: "A course on Brazil's ABNT standards for academic work: formatting, citations, references and the standard structure required in technical and scientific documents.",
      es: "Un curso sobre las normas ABNT de Brasil para trabajos académicos: formato, citas, referencias y la estructura estándar requerida en documentos técnicos y científicos.",
      fr: "Un cours sur les normes ABNT du Brésil pour les travaux académiques: mise en forme, citations, références et la structure standard requise dans les documents techniques et scientifiques.",
      de: "Ein Kurs über Brasiliens ABNT-Standards für wissenschaftliche Arbeiten: Formatierung, Zitate, Referenzen und die in technischen und wissenschaftlichen Dokumenten erforderliche Standardstruktur.",
      it: "Un corso sugli standard ABNT del Brasile per lavori accademici: formattazione, citazioni, riferimenti e la struttura standard richiesta nei documenti tecnici e scientifici.",
      zh: "关于巴西ABNT学术工作标准的课程：格式、引用、参考文献以及技术和科学文档中所需的标准结构。",
      ja: "ブラジルのABNT学術論文の標準に関するコース：形式、引用、参考文献、および技術および科学文書で必要な標準構造。",
      ru: "Курс по бразильским стандартам ABNT для академических работ: форматирование, цитирование, ссылки и стандартная структура, требуемая в технических и научных документах.",
      ar: "دورة حول معايير ABNT البرازيلية للعمل الأكاديمي: التنسيق والاقتباسات والمراجع والهيكل القياسي المطلوب في الوثائق التقنية والعلمية.",
      hi: "ब्राजील की ABNT अकादमिक कार्य मानकों पर एक पाठ्यक्रम: स्वरूपण, उद्धरण, संदर्भ और तकनीकी और वैज्ञानिक दस्तावेजों में आवश्यक मानक संरचना।",
      ko: "브라질의 ABNT 학술 작업 표준에 관한 과정: 형식, 인용, 참고문헌 및 기술 및 과학 문서에 필요한 표준 구조.",
      id: "Kursus tentang standar ABNT Brasil untuk pekerjaan akademik: pemformatan, kutipan, referensi dan struktur standar yang diperlukan dalam dokumen teknis dan ilmiah."
    },
    skills: ["ABNT", "Documentação", "Escrita técnica"],
  },
];

export const certificateSlugs = certificates.map((c) => slugify(c.course));

export function getCertificate(slug: string): Certificate | undefined {
  return certificates.find((c) => slugify(c.course) === slug);
}
