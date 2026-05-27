import type { LocalizedText } from "@/lib/i18n";

export interface Testimonial {
  name: string;
  role: LocalizedText;
  quote: LocalizedText;
  image?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Eduardo Souza",
    role: {
      pt: "Visual Design",
      en: "Visual Design",
      es: "Diseño Visual",
      fr: "Design Visuel",
      de: "Visuelles Design",
      it: "Design Visivo",
      zh: "视觉设计",
      ja: "ビジュアルデザイン",
      ru: "Визуальный дизайн",
      ar: "التصميم البصري",
      hi: "दृश्य डिजाइन",
      ko: "시각 디자인",
      id: "Desain Visual"
    },
    quote: {
      pt: "Estou impressionado com o crescimento e a evolução do Luiz como desenvolvedor. Ele tem uma dedicação incrível e resolve tarefas complexas com eficiência e clareza. Destaca-se pela atenção aos detalhes, entregando resultados pixel perfect e seguindo com precisão os projetos de design. Apesar de iniciar sua jornada, tenho certeza de que tem um futuro brilhante pela frente.",
      en: "I'm impressed by Luiz's growth and evolution as a developer. He has incredible dedication and solves complex tasks with efficiency and clarity. He stands out for his attention to detail, delivering pixel-perfect results and faithfully following the design files. Even though he's early in his journey, I'm sure he has a bright future ahead.",
      es: "Estoy impresionado con el crecimiento y la evolución de Luiz como desarrollador. Tiene una dedicación increíble y resuelve tareas complejas con eficiencia y claridad. Se destaca por su atención al detalle, entregando resultados pixel perfect y siguiendo fielmente los archivos de diseño. Aunque está al principio de su carrera, estoy seguro de que tiene un futuro brillante por delante.",
      fr: "Je suis impressionné par la croissance et l'évolution de Luiz en tant que développeur. Il a une dédication incroyable et résout des tâches complexes avec efficacité et clarté. Il se distingue par son souci des détails, livrant des résultats parfaits au pixel et suivant fidèlement les fichiers de conception. Même s'il en est au début de son parcours, je suis sûr qu'il a un bel avenir devant lui.",
      de: "Ich bin beeindruckt von Luizs Wachstum und Entwicklung als Entwickler. Er hat unglaublichen Einsatz und löst komplexe Aufgaben mit Effizienz und Klarheit. Er zeichnet sich durch sein Auge für Details aus, liefert pixelgenaue Ergebnisse und folgt den Design-Dateien gewissenhaft. Obwohl er gerade am Anfang seiner Reise steht, bin ich sicher, dass er eine glänzende Zukunft vor sich hat.",
      it: "Sono impressionato dalla crescita e dall'evoluzione di Luiz come sviluppatore. Ha una dedizione incredibile e risolve compiti complessi con efficienza e chiarezza. Si distingue per la sua attenzione ai dettagli, fornendo risultati pixel-perfect e seguendo fedelmente i file di design. Anche se è all'inizio del suo percorso, sono sicuro che ha un futuro brillante davanti a sé.",
      zh: "我对Luiz作为开发人员的增长和发展印象深刻。他拥有不可思议的奉献精神，能够高效清晰地解决复杂任务。他以对细节的关注而著称，提供像素完美的结果并忠实地遵循设计文件。尽管他处于职业生涯的早期阶段，我相信他前面有光明的未来。",
      ja: "Luizが開発者として成長し進化していることに感銘を受けています。彼は信じられないほどの献身を持ち、複雑なタスクを効率と明確さで解決します。彼は細部への注意で際立ち、ピクセルパーフェクトな結果を提供し、デザインファイルに忠実に従っています。彼のキャリアの初期段階にあるにもかかわらず、彼は前に輝く未来があると確信しています。",
      ru: "Я впечатлен ростом и развитием Луиза как разработчика. Он имеет невероятную преданность и решает сложные задачи с эффективностью и ясностью. Он выделяется своим вниманием к деталям, обеспечивая идеальные результаты в пикселях и верно следуя файлам дизайна. Несмотря на то, что он находится в начале своего пути, я уверен, что у него светлое будущее впереди.",
      ar: "أنا معجب بنمو وتطور لويز كمطور. لديه تفاني لا يصدق ويحل المهام المعقدة بكفاءة ووضوح. يتميز بانتباهه للتفاصيل، وتقديم نتائج مثالية بكسل واتباع ملفات التصميم بأمانة. على الرغم من أنه في بداية رحلته، أنا متأكد من أن له مستقبل مشرق في المستقبل.",
      hi: "मुझे Luiz के एक डेवलपर के रूप में वृद्धि और विकास से प्रभावित किया गया है। उसके पास अविश्वसनीय समर्पण है और जटिल कार्यों को दक्षता और स्पष्टता से हल करता है। वह विवरण पर ध्यान देने के लिए खड़ा होता है, पिक्सेल-सही परिणाम देता है और डिजाइन फ़ाइलों का वफादारी से पालन करता है। हालांकि वह अपनी यात्रा की शुरुआत में है, मुझे यकीन है कि उसके सामने एक उज्ज्वल भविष्य है।",
      ko: "나는 Luiz가 개발자로서 성장하고 발전하는 것에 감탄했습니다. 그는 놀라운 헌신을 가지고 있으며 복잡한 작업을 효율성과 명확성으로 해결합니다. 그는 세부 사항에주의를 기울여 픽셀 완벽한 결과를 제공하고 디자인 파일을 충실하게 따릅니다. 그의 여정의 초기 단계에도 불구하고 그의 앞에는 밝은 미래가 있다고 확신합니다.",
      id: "Saya terkesan dengan pertumbuhan dan evolusi Luiz sebagai pengembang. Dia memiliki dedikasi yang luar biasa dan menyelesaikan tugas-tugas kompleks dengan efisiensi dan kejelasan. Dia menonjol karena perhatiannya terhadap detail, memberikan hasil yang sempurna piksel dan dengan setia mengikuti file desain. Meskipun dia masih di awal perjalanannya, saya yakin dia memiliki masa depan yang cerah di depannya."
    },
    image: "/image/edu.webp",
  },
  {
    name: "Lennon Mauricio",
    role: {
      pt: "Produtor de Vídeo",
      en: "Video Producer",
      es: "Productor de Vídeo",
      fr: "Producteur Vidéo",
      de: "Videoproduzent",
      it: "Produttore Video",
      zh: "视频制作人",
      ja: "ビデオプロデューサー",
      ru: "Видеопродюсер",
      ar: "منتج الفيديو",
      hi: "वीडियो निर्माता",
      ko: "비디오 제작자",
      id: "Produser Video"
    },
    quote: {
      pt: "Trabalhei com Luiz em um projeto e fiquei impressionado com sua dedicação e profissionalismo. Ele é muito aberto a feedbacks, sempre disposto a fazer os ajustes necessários para garantir o melhor resultado. Além de dominar boas práticas, é colaborativo e tornou o trabalho em equipe mais fluido. Seu comprometimento foi fundamental para a entrega do projeto.",
      en: "I worked with Luiz on a project and was impressed by his dedication and professionalism. He's very open to feedback, always willing to make the adjustments needed to ensure the best result. Beyond mastering good practices, he's collaborative and made teamwork smoother. His commitment was key to delivering the project.",
      es: "Trabajé con Luiz en un proyecto y quedé impresionado por su dedicación y profesionalismo. Es muy abierto a retroalimentación, siempre dispuesto a hacer los ajustes necesarios para garantizar el mejor resultado. Más allá de dominar buenas prácticas, es colaborativo e hizo el trabajo en equipo más fluido. Su compromiso fue clave para la entrega del proyecto.",
      fr: "J'ai travaillé avec Luiz sur un projet et j'ai été impressionné par son dévouement et son professionnalisme. Il est très ouvert aux retours, toujours disposé à faire les ajustements nécessaires pour assurer le meilleur résultat. Au-delà de maîtriser les bonnes pratiques, il est collaboratif et a rendu le travail d'équipe plus fluide. Son engagement a été clé pour la livraison du projet.",
      de: "Ich habe mit Luiz an einem Projekt gearbeitet und war von seinem Engagement und Professionalismus beeindruckt. Er ist sehr offen für Feedback und immer bereit, die notwendigen Anpassungen vorzunehmen, um das beste Ergebnis zu gewährleisten. Über das Beherrschen bewährter Verfahren hinaus ist er kooperativ und hat die Teamarbeit flüssiger gestaltet. Sein Engagement war der Schlüssel zur Projektabwicklung.",
      it: "Ho lavorato con Luiz su un progetto e sono rimasto impressionato dalla sua dedizione e professionalità. È molto aperto ai feedback, sempre disposto a fare gli aggiustamenti necessari per garantire il miglior risultato. Oltre a padroneggiare le buone pratiche, è collaborativo e ha reso il lavoro di squadra più fluido. Il suo impegno è stato fondamentale per la consegna del progetto.",
      zh: "我与Luiz在一个项目上合作，对他的敬业精神和专业精神印象深刻。他非常愿意接受反馈，总是愿意做出必要的调整以确保最佳结果。除了掌握良好的实践外，他还很协作，使团队合作更加顺利。他的承诺是项目交付的关键。",
      ja: "私はLuizとプロジェクトで働き、彼の献身と専門性に感銘を受けました。彼はフィードバックに非常にオープンで、常に最良の結果を確保するために必要な調整を行うために活動しています。良い慣行をマスターすることを超えて、彼は協調的で、チームワークをよりスムーズにしました。彼の約束はプロジェクトを配信するための鍵でした。",
      ru: "Я работал с Луизом над проектом и был впечатлен его преданностью и профессионализмом. Он очень открыт для обратной связи, всегда готов вносить необходимые корректировки для получения наилучшего результата. Помимо овладения передовыми практиками, он сотрудничает и сделал командную работу более гладкой. Его приверженность была ключом к реализации проекта.",
      ar: "عملت مع Luiz في مشروع وتأثرت بتفانيه واحترافيته. إنه منفتح جداً على ردود الفعل، وعلى استعداد دائماً لإجراء التعديلات اللازمة لضمان أفضل نتيجة. بما يتجاوز إتقان الممارسات الجيدة، فهو يتعاون وجعل العمل الجماعي أكثر سلاسة. كان التزامه مفتاحاً لتسليم المشروع.",
      hi: "मैंने Luiz के साथ एक परियोजना पर काम किया और उनकी समर्पण और व्यावसायिकता से प्रभावित हुआ। वह प्रतिक्रिया के लिए बहुत खुला है, हमेशा सर्वोत्तम परिणाम सुनिश्चित करने के लिए आवश्यक समायोजन करने के लिए तैयार है। अच्छे प्रथाओं में महारत हासिल करने से परे, वह सहयोगी है और टीमवर्क को आसान बनाता है। उनकी प्रतिबद्धता परियोजना को सौंपने के लिए महत्वपूर्ण थी।",
      ko: "나는 Luiz와 프로젝트를 함께 일했으며 그의 헌신과 전문성에 감탄했습니다. 그는 피드백에 매우 개방적이며 항상 최선의 결과를 보장하기 위해 필요한 조정을 하려고합니다. 좋은 관행을 마스터하는 것 이상으로, 그는 협력적이고 팀워크를 더 부드럽게 만들었습니다. 그의 헌신은 프로젝트 전달의 핵심이었습니다.",
      id: "Saya bekerja dengan Luiz pada sebuah proyek dan terkesan dengan dedikasi dan profesionalisme mereka. Dia sangat terbuka untuk umpan balik, selalu bersedia membuat penyesuaian yang diperlukan untuk memastikan hasil terbaik. Selain menguasai praktik yang baik, dia kooperatif dan membuat pekerjaan tim lebih lancar. Komitmennya adalah kunci untuk pengiriman proyek."
    },
    image: "/image/lennon.webp",
  },
  {
    name: "Renan Carlos",
    role: {
      pt: "Estudante de SI",
      en: "IS Student",
      es: "Estudiante de SI",
      fr: "Étudiant en SI",
      de: "IS-Student",
      it: "Studente di SI",
      zh: "SI学生",
      ja: "IS学生",
      ru: "Студент информационных систем",
      ar: "طالب SI",
      hi: "IS छात्र",
      ko: "IS 학생",
      id: "Siswa SI"
    },
    quote: {
      pt: "O Luiz é um cara que eu admiro muito. São nítidos os seus esforços e a vontade de se tornar um profissional cada vez melhor — sempre motivando os colegas com sua transparência e bondade.",
      en: "Luiz is someone I really admire. His effort and his drive to become an ever-better professional are clear — always motivating his colleagues with his transparency and kindness.",
      es: "Luiz es alguien que realmente admiro. Su esfuerzo y su deseo de convertirse en un profesional cada vez mejor son claros — siempre motivando a sus colegas con su transparencia y amabilidad.",
      fr: "Luiz est quelqu'un que j'admire vraiment. Son effort et sa volonté de devenir un professionnel de plus en plus meilleur sont clairs — motivant toujours ses collègues par sa transparence et sa bienveillance.",
      de: "Luiz ist jemand, den ich wirklich bewundere. Seine Bemühungen und sein Streben, ein immer besserer Profi zu werden, sind klar — er motiviert seine Kollegen immer mit seiner Transparenz und Güte.",
      it: "Luiz è qualcuno che ammiro davvero. Il suo sforzo e la sua spinta a diventare un professionista sempre migliore sono evidenti — sempre motivando i suoi colleghi con la sua trasparenza e gentilezza.",
      zh: "Luiz是我真正钦佩的人。他的努力和成为越来越好的专业人士的动力是显而易见的——总是以他的透明度和善良激励同事。",
      ja: "Luizは私が本当に尊敬している人です。彼の努力と、ますます優れた専門家になることへの彼の欲求は明らかです——常に彼の透明性と親切さで同僚を動機付けています。",
      ru: "Луиз — это человек, которого я действительно очень уважаю. Его усилия и стремление стать все лучше и лучше профессионалом очевидны — всегда мотивируя своих коллег своей прозрачностью и добротой.",
      ar: "Luiz هو شخص أحترمه حقاً. جهوده ورغبته في أن يصبح محترفاً أفضل فأفضل واضحة — يحفز دائماً زملاءه بشفافيته ولطفه.",
      hi: "Luiz वह व्यक्ति हैं जिसकी मुझे वास्तव में प्रशंसा है। उनकी मेहनत और एक बेहतर पेशेवर बनने की उनकी चाहत स्पष्ट है — हमेशा अपनी पारदर्शिता और दयालुता से सहकर्मियों को प्रेरित करते हैं।",
      ko: "Luiz는 제가 정말 존경하는 사람입니다. 그의 노력과 점점 더 나은 전문가가 되려는 그의 열망은 분명합니다 — 항상 그의 투명성과 친절로 동료들을 격려합니다.",
      id: "Luiz adalah seseorang yang benar-benar saya kagumi. Usaha dan dorongan dirinya untuk menjadi profesional yang semakin baik jelas — selalu memotivasi rekan kerjanya dengan transparansi dan kebaikannya."
    },
    image: "/image/renan.webp",
  },
];
