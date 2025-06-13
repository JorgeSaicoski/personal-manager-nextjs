"use client";

import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isPortuguese, setIsPortuguese] = useState(false);

  const handleGetStarted = () => {
    router.push("/personal-manager");
  };

  const handleViewServices = () => {
    router.push("/services");
  };

  const toggleLanguage = () => {
    setIsPortuguese(!isPortuguese);
  };

  /**
   * Content translations for the homepage
   * Organized by sections for better maintainability
   */
  const content = {
    en: {
      // === HEADER SECTION ===
      birdEmoji: "🐦",
      title: "Sarkis.dev",
      tagline: "Like the Southern Lapwing, protecting your digital offspring",

      // === MAIN CTA BUTTONS ===
      ctaButton: "Access Personal Manager Free",

      // === BENEFITS SECTION ===
      benefitsTitle: "Smart Technology for Your Business",
      benefitsSubtitle:
        "We develop efficient solutions that grow with your business",

      economyTitle: "💰 Smart Economy",
      economyText:
        "We analyze your real needs and develop solutions with the best cost-benefit. Every dollar invested generates value.",

      flexibilityTitle: "🔧 Total Flexibility",
      flexibilityText:
        "Custom software for your business. Changed your mind? Want new functionality? We adapt quickly.",

      controlTitle: "🎯 Complete Control",
      controlText:
        "You have full access to the code and can decide how and where to host. Your company, your rules, your decisions.",

      // === SOLUTION SECTION ===
      solutionTitle: "Our Solution: Collaborative Digital Independence",
      solutionSubtitle:
        "Choose your development model - private ownership or shared ecosystem",

      personalManagerTitle: "Free Personal Manager",
      personalManagerText:
        "Complete life control: finances, tasks, studies, calendar. Free forever for personal use. The foundation that powers our business solutions.",

      corporateTitle: "Custom Corporate Software",
      corporateText:
        "We develop exactly what your company needs. No unnecessary features, focus on what generates value.",

      hostingTitle: "Efficient Hosting",
      hostingText:
        "Local deployment or economic providers (Hetzner, DigitalOcean). We choose the best option for your budget.",

      openSourceTitle: "100% Open Source",
      openSourceText:
        "All code is yours. Complete access via self-hosted Gitea. Want to modify? Want to hire another developer? No problem.",

      transparencyTitle: "Total Transparency",
      transparencyText:
        "Employees know exactly what data is collected and can deny access. Privacy always respected.",

      performanceTitle: "Golang Performance",
      performanceText:
        "Go backend = lower resource usage, higher speed, lower server costs. Maximum efficiency.",

      // === SERVICES SECTION ===
      servicesTitle: "Ways to Work with Us",
      servicesSubtitle:
        "From personal solutions to enterprise software - choose what fits your needs",
      servicesDesc:
        "We offer flexible solutions for every stage of your digital journey. Start free with Personal Manager or get custom enterprise software.",
      servicesButton: "Explore All Services",

      servicesPersonalTitle: "Personal Use",
      servicesPersonalDesc: "Free Personal Manager for life",
      servicesPersonalFeatures: [
        "Task management",
        "Finance tracking",
        "Calendar",
        "100% free forever",
      ],

      servicesBusinessTitle: "Business Solutions",
      servicesBusinessDesc: "Custom software for your company",
      servicesBusinessFeatures: [
        "Full code ownership",
        "Custom development",
        "Deployment consulting",
        "Integration services",
      ],

      servicesExtensionTitle: "Extend Personal Manager",
      servicesExtensionDesc: "Add business features to proven base",
      servicesExtensionFeatures: [
        "Team collaboration",
        "E-commerce tools",
        "Custom modules",
        "Choose private or shared",
      ],

      // === DEVELOPMENT MODEL SECTION ===
      developmentModelTitle: "Two Development Paths for Your Business",
      developmentModelSubtitle:
        "You choose how to invest in your software development",

      privateOwnershipTitle: "🔒 Private Ownership",
      privateOwnershipText:
        "You pay full development costs. Code belongs 100% to your company. Feature stays exclusive to you. Perfect for competitive advantages.",

      sharedEcosystemTitle: "🌱 Shared Ecosystem",
      sharedEcosystemText:
        "You pay only monthly maintenance. We develop the feature and add it to the open source ecosystem. Everyone benefits, costs are shared.",

      hostingModelTitle: "🖥️ Hosting & Infrastructure",
      hostingModelText:
        "Personal Manager: Already deployed and maintained by us. Private software: You choose your hosting, we provide free deployment consultancy.",

      transparentCostsTitle: "💰 Transparent Costs Always",
      transparentCostsText:
        "Whether private or shared, you know exactly what you're paying for: our costs + our profit. No hidden fees, no surprises.",

      collaborativeDevelopmentTitle: "🤝 Collaborative Development",
      collaborativeDevelopmentText:
        "Companies choose to share development costs and benefit from each other's investments, or keep features private. Your choice, your control.",

      // === WHAT THIS MEANS SECTION ===
      whatThisMeansTitle: "What This Means for You",
      whatThisMeansSubtitle: "Simple explanations of our technical approach",

      openSourceMeaning: "You own your code completely",
      openSourceExplanation:
        "No vendor lock-in. You can modify, extend, or hire any developer to work on your software. Complete ownership and freedom.",

      customSoftwareMeaning: "Built exactly for your business needs",
      customSoftwareExplanation:
        "No paying for features you don't use. No workarounds. Software that fits your workflow like a glove.",

      microservicesMeaning: "If one part breaks, everything else keeps working",
      microservicesExplanation:
        "Your business keeps running even if one component has issues. Updates happen without downtime. Maximum reliability.",

      containersMeaning: "Runs the same everywhere",
      containersExplanation:
        "Works identically on your laptop, your server, or the cloud. Easy to move, backup, and scale up when you grow.",

      keycloakMeaning: "Enterprise-level security you control",
      keycloakExplanation:
        "Bank-level authentication system. Your employees log in once and access everything. You control all security settings.",

      golangMeaning: "Lower costs, higher performance",
      golangExplanation:
        "Uses less server resources than other technologies. Your software runs faster and costs less to operate long-term.",

      // === VALUES SECTION ===
      valuesTitle: "Our Values",

      absoluteTransparencyTitle: "🎯 Absolute Transparency",
      absoluteTransparencyText:
        "You know exactly how your software works, how much it costs and where your data is. No fine print, no tricks.",

      smartEconomyTitle: "💰 Smart Economy",
      smartEconomyText:
        "We analyze each case individually to find the most efficient solution. Conscious investment in technology.",

      openSourceFirstTitle: "🌱 Open Source First",
      openSourceFirstText:
        "We believe in free software. We use open technologies and make our code available. Knowledge should be shared.",

      digitalProtectionTitle: "🛡️ Digital Protection",
      digitalProtectionText:
        "Like the Southern Lapwing protects its offspring, we protect your data, your money and your technological independence.",
      technicalMeritocracyTitle: "⚖️ Technical Meritocracy",
      technicalMeritocracyText:
        "Results over marketing promises. We measure success by efficiency and real outcomes, not contract size or feature quantity. Our solutions are built on proven competence, delivering exactly what your business needs without unnecessary complexity.",

      continuousEducationTitle: "🎓 Continuous Education",
      continuousEducationText:
        "We teach as we build. Knowledge sharing is integral to our development process - through comprehensive documentation, mentoring, and clear explanations. An educated client is an independent and successful client.",

      globalMindsetTitle: "🌍 Global Mindset",
      globalMindsetText:
        "International thinking with local execution. We bring world-class development standards to Latin America, understanding both global best practices and regional business realities. Solutions that work anywhere, built with local expertise.",

      // === TECHNOLOGY STACK SECTION ===
      techStackTitle: "Technology Stack",

      golangTitle: "🚀 Golang Backend",
      golangText:
        "Maximum performance, low resource consumption, minimal server costs.",

      keycloakTitle: "🔐 Keycloak SSO",
      keycloakText:
        "Enterprise authentication, self-hosted, no third-party dependencies.",

      containersTitle: "🐳 Containers",
      containersText:
        "Docker/Podman for consistent deployment in any environment.",

      reactTitle: "⚛️ React/Next.js",
      reactText: "Modern frontend, TypeScript, responsive and fast interfaces.",

      nginxTitle: "🌐 NGINX Gateway",
      nginxText:
        "Efficient reverse proxy, automatic SSL, load balancing across microservices.",

      giteaTitle: "📁 Gitea Self-Hosted",
      giteaText:
        "Your code, your server, your control. Independent Git hosting.",

      // === FINAL CTA SECTION ===
      finalCtaTitle: "Ready for Your Digital Independence?",
      finalCtaText:
        "Start free with our Personal Manager and discover what it's like to have complete control of your technology.",
      finalCtaButton: "Test Personal Manager Free",
      finalCtaSubtext: "100% free • Open Source • Immediate browser access",

      // === FOOTER ===
      footerText: "© 2024 Sarkis.dev - Protecting your digital offspring",
      footerSubtext: "Developed in Uruguay 🇺🇾 • Gaucho Heart 💙",
    },
    pt: {
      // === HEADER SECTION ===
      birdEmoji: "🐦",
      title: "Sarkis.dev",
      tagline: "Como o quero-quero, protegemos suas crias digitais",

      // === MAIN CTA BUTTONS ===
      ctaButton: "Acesse Personal Manager Grátis",

      // === BENEFITS SECTION ===
      benefitsTitle: "Tecnologia Inteligente para sua Empresa",
      benefitsSubtitle:
        "Desenvolvemos soluções eficientes que crescem com seu negócio",

      economyTitle: "💰 Economia Inteligente",
      economyText:
        "Analisamos sua necessidade real e desenvolvemos soluções com o melhor custo-benefício. Cada real investido gera valor.",

      flexibilityTitle: "🔧 Flexibilidade Total",
      flexibilityText:
        "Software feito sob medida para seu negócio. Mudou de ideia? Quer nova funcionalidade? Adaptamos rapidamente.",

      controlTitle: "🎯 Controle Completo",
      controlText:
        "Você tem acesso total ao código e pode decidir como e onde hospedar. Sua empresa, suas regras, suas decisões.",

      // === SOLUTION SECTION ===
      solutionTitle: "Nossa Solução: Independência Digital Colaborativa",
      solutionSubtitle:
        "Escolha seu modelo de desenvolvimento - propriedade privada ou ecossistema compartilhado",

      personalManagerTitle: "Personal Manager Gratuito",
      personalManagerText:
        "Controle total da vida: finanças, tarefas, estudos, calendário. Grátis para sempre para uso pessoal. A base que alimenta nossas soluções empresariais.",

      corporateTitle: "Software Corporativo Sob Medida",
      corporateText:
        "Desenvolvemos exatamente o que sua empresa precisa. Sem funcionalidades desnecessárias, foco no que gera valor.",

      hostingTitle: "Hospedagem Eficiente",
      hostingText:
        "Deploy local ou em provedores econômicos (Hetzner, DigitalOcean). Escolhemos a melhor opção para seu orçamento.",

      openSourceTitle: "100% Open Source",
      openSourceText:
        "Todo código é seu. Acesso completo via Gitea self-hosted. Quer modificar? Quer contratar outro desenvolvedor? Sem problemas.",

      transparencyTitle: "Transparência Total",
      transparencyText:
        "Funcionários sabem exatamente quais dados são coletados e podem negar acesso. Privacidade respeitada sempre.",

      performanceTitle: "Performance Golang",
      performanceText:
        "Backend em Go = menor uso de recursos, maior velocidade, menores custos de servidor. Eficiência máxima.",

      // === SERVICES SECTION ===
      servicesTitle: "Formas de Trabalhar Conosco",
      servicesSubtitle:
        "De soluções pessoais a software empresarial - escolha o que se encaixa nas suas necessidades",
      servicesDesc:
        "Oferecemos soluções flexíveis para cada etapa da sua jornada digital. Comece grátis com o Personal Manager ou tenha software empresarial customizado.",
      servicesButton: "Explorar Todos os Serviços",

      servicesPersonalTitle: "Uso Pessoal",
      servicesPersonalDesc: "Personal Manager gratuito para sempre",
      servicesPersonalFeatures: [
        "Gestão de tarefas",
        "Controle financeiro",
        "Calendário",
        "100% gratuito para sempre",
      ],

      servicesBusinessTitle: "Soluções Empresariais",
      servicesBusinessDesc: "Software customizado para sua empresa",
      servicesBusinessFeatures: [
        "Propriedade total do código",
        "Desenvolvimento customizado",
        "Consultoria de deployment",
        "Serviços de integração",
      ],

      servicesExtensionTitle: "Estender Personal Manager",
      servicesExtensionDesc: "Adicione recursos empresariais à base comprovada",
      servicesExtensionFeatures: [
        "Colaboração em equipe",
        "Ferramentas e-commerce",
        "Módulos customizados",
        "Escolha privado ou compartilhado",
      ],

      // === DEVELOPMENT MODEL SECTION ===
      developmentModelTitle:
        "Dois Caminhos de Desenvolvimento para seu Negócio",
      developmentModelSubtitle:
        "Você escolhe como investir no desenvolvimento do seu software",

      privateOwnershipTitle: "🔒 Propriedade Privada",
      privateOwnershipText:
        "Você paga custos completos de desenvolvimento. Código pertence 100% à sua empresa. Funcionalidade fica exclusiva sua. Perfeito para vantagens competitivas.",

      sharedEcosystemTitle: "🌱 Ecossistema Compartilhado",
      sharedEcosystemText:
        "Você paga apenas manutenção mensal. Desenvolvemos a funcionalidade e adicionamos ao ecossistema open source. Todos se beneficiam, custos são compartilhados.",

      hostingModelTitle: "🖥️ Hosting & Infraestrutura",
      hostingModelText:
        "Personal Manager: Já deployado e mantido por nós. Software privado: Você escolhe sua hospedagem, oferecemos consultoria gratuita de deployment.",

      transparentCostsTitle: "💰 Custos Transparentes Sempre",
      transparentCostsText:
        "Seja privado ou compartilhado, você sabe exatamente pelo que está pagando: nossos custos + nosso lucro. Sem taxas ocultas, sem surpresas.",

      collaborativeDevelopmentTitle: "🤝 Desenvolvimento Colaborativo",
      collaborativeDevelopmentText:
        "Empresas escolhem compartilhar custos de desenvolvimento e se beneficiar dos investimentos umas das outras, ou manter funcionalidades privadas. Sua escolha, seu controle.",

      // === WHAT THIS MEANS SECTION ===
      whatThisMeansTitle: "O Que Isso Significa para Você",
      whatThisMeansSubtitle: "Explicações simples da nossa abordagem técnica",

      openSourceMeaning: "Você é dono do seu código completamente",
      openSourceExplanation:
        "Sem dependência de fornecedor. Você pode modificar, estender ou contratar qualquer desenvolvedor para trabalhar no seu software. Propriedade e liberdade completas.",

      customSoftwareMeaning:
        "Construído exatamente para as necessidades do seu negócio",
      customSoftwareExplanation:
        "Não paga por recursos que não usa. Sem gambiarras. Software que se encaixa no seu fluxo de trabalho como uma luva.",

      microservicesMeaning:
        "Se uma parte quebra, todo o resto continua funcionando",
      microservicesExplanation:
        "Seu negócio continua rodando mesmo se um componente tiver problemas. Atualizações acontecem sem parar o sistema. Máxima confiabilidade.",

      containersMeaning: "Roda igual em qualquer lugar",
      containersExplanation:
        "Funciona identicamente no seu notebook, no seu servidor ou na nuvem. Fácil de mover, fazer backup e escalar quando você crescer.",

      keycloakMeaning: "Segurança nível enterprise que você controla",
      keycloakExplanation:
        "Sistema de autenticação nível bancário. Seus funcionários fazem login uma vez e acessam tudo. Você controla todas as configurações de segurança.",

      golangMeaning: "Menores custos, maior performance",
      golangExplanation:
        "Usa menos recursos do servidor que outras tecnologias. Seu software roda mais rápido e custa menos para operar a longo prazo.",
      technicalMeritocracyTitle: "⚖️ Meritocracia Técnica",
      technicalMeritocracyText:
        "Resultados acima de promessas de marketing. Medimos sucesso por eficiência e resultados reais, não por tamanho de contratos ou quantidade de funcionalidades. Nossas soluções são construídas com competência comprovada, entregando exatamente o que seu negócio precisa sem complexidade desnecessária.",

      continuousEducationTitle: "🎓 Educação Contínua",
      continuousEducationText:
        "Ensinamos enquanto construímos. Compartilhamento de conhecimento é parte integral do nosso processo de desenvolvimento - através de documentação abrangente, mentoria e explicações claras. Um cliente educado é um cliente independente e bem-sucedido.",

      globalMindsetTitle: "🌍 Mentalidade Global",
      globalMindsetText:
        "Pensamento internacional com execução local. Trazemos padrões de desenvolvimento mundial para a América Latina, entendendo tanto as melhores práticas globais quanto as realidades empresariais regionais. Soluções que funcionam em qualquer lugar, construídas com expertise local.",

      // === VALUES SECTION ===
      valuesTitle: "Nossos Valores",

      absoluteTransparencyTitle: "🎯 Transparência Absoluta",
      absoluteTransparencyText:
        "Você sabe exatamente como seu software funciona, quanto custa e onde seus dados estão. Sem letras miúdas, sem pegadinhas.",

      smartEconomyTitle: "💰 Economia Inteligente",
      smartEconomyText:
        "Analisamos cada caso individualmente para encontrar a solução mais eficiente. Investimento consciente em tecnologia.",

      openSourceFirstTitle: "🌱 Open Source First",
      openSourceFirstText:
        "Acreditamos em software livre. Usamos tecnologias abertas e disponibilizamos nosso código. Conhecimento deve ser compartilhado.",

      digitalProtectionTitle: "🛡️ Proteção Digital",
      digitalProtectionText:
        "Como o quero-quero protege suas crias, protegemos seus dados, seu dinheiro e sua independência tecnológica.",

      // === TECHNOLOGY STACK SECTION ===
      techStackTitle: "Stack Tecnológico",

      golangTitle: "🚀 Golang Backend",
      golangText:
        "Performance máxima, baixo consumo de recursos, custos mínimos de servidor.",

      keycloakTitle: "🔐 Keycloak SSO",
      keycloakText:
        "Autenticação enterprise, self-hosted, sem dependência de terceiros.",

      containersTitle: "🐳 Containers",
      containersText:
        "Docker/Podman para deploy consistente em qualquer ambiente.",

      reactTitle: "⚛️ React/Next.js",
      reactText:
        "Frontend moderno, TypeScript, interfaces responsivas e rápidas.",

      nginxTitle: "🌐 NGINX Gateway",
      nginxText:
        "Proxy reverso eficiente, SSL automático, load balancing entre microserviços.",

      giteaTitle: "📁 Gitea Self-Hosted",
      giteaText:
        "Seu código, seu servidor, seu controle. Git hosting independente.",

      // === FINAL CTA SECTION ===
      finalCtaTitle: "Pronto para sua Independência Digital?",
      finalCtaText:
        "Comece gratuitamente com nosso Personal Manager e descubra como é ter controle total da sua tecnologia.",
      finalCtaButton: "Teste Personal Manager Grátis",
      finalCtaSubtext:
        "100% gratuito • Open Source • Acesso imediato no navegador",

      // === FOOTER ===
      footerText: "© 2024 Sarkis.dev - Protegendo suas crias digitais",
      footerSubtext: "Desenvolvido no Uruguai 🇺🇾 • Coração Gaúcho 💙",
    },
  };

  const t = content[isPortuguese ? "pt" : "en"];

  return (
    <div className={styles.page}>
      {/* Language Toggle */}
      <button className={styles.languageToggle} onClick={toggleLanguage}>
        {isPortuguese ? "🇺🇸 English" : "🇧🇷 Português"}
      </button>

      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.title}>
          <span className={styles.birdEmoji}>{t.birdEmoji}</span>
          {t.title}
        </h1>
        <p className={styles.subtitle}>{t.tagline}</p>
        <div className={styles.cta}>
          <button onClick={handleGetStarted}>{t.ctaButton}</button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.benefits}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{t.benefitsTitle}</h2>
          <p className={styles.sectionSubtitle}>{t.benefitsSubtitle}</p>

          <div className={styles.grid}>
            <div className={styles.benefitCard}>
              <h3>{t.economyTitle}</h3>
              <p>{t.economyText}</p>
            </div>

            <div className={styles.benefitCard}>
              <h3>{t.flexibilityTitle}</h3>
              <p>{t.flexibilityText}</p>
            </div>

            <div className={styles.benefitCard}>
              <h3>{t.controlTitle}</h3>
              <p>{t.controlText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className={styles.solution}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{t.solutionTitle}</h2>
          <p className={styles.sectionSubtitle}>{t.solutionSubtitle}</p>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📊</div>
              <h3>{t.personalManagerTitle}</h3>
              <p>{t.personalManagerText}</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🏢</div>
              <h3>{t.corporateTitle}</h3>
              <p>{t.corporateText}</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💾</div>
              <h3>{t.hostingTitle}</h3>
              <p>{t.hostingText}</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔓</div>
              <h3>{t.openSourceTitle}</h3>
              <p>{t.openSourceText}</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🛡️</div>
              <h3>{t.transparencyTitle}</h3>
              <p>{t.transparencyText}</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⚡</div>
              <h3>{t.performanceTitle}</h3>
              <p>{t.performanceText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Development Model Section */}
      <section className={styles.developmentModel}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{t.developmentModelTitle}</h2>
          <p className={styles.sectionSubtitle}>{t.developmentModelSubtitle}</p>

          <div className={styles.modelGrid}>
            <div className={styles.modelCard}>
              <div className={styles.modelIcon}>🔒</div>
              <h3>{t.privateOwnershipTitle}</h3>
              <p>{t.privateOwnershipText}</p>
              <div className={styles.modelDetails}>
                <span className={styles.cost}>Full Development Cost</span>
                <span className={styles.ownership}>100% Your Code</span>
                <span className={styles.exclusivity}>Exclusive Feature</span>
              </div>
            </div>

            <div className={styles.modelCard}>
              <div className={styles.modelIcon}>🌱</div>
              <h3>{t.sharedEcosystemTitle}</h3>
              <p>{t.sharedEcosystemText}</p>
              <div className={styles.modelDetails}>
                <span className={styles.cost}>Maintenance Only</span>
                <span className={styles.ownership}>Open Source</span>
                <span className={styles.exclusivity}>Shared Benefit</span>
              </div>
            </div>

            <div className={styles.modelCard}>
              <div className={styles.modelIcon}>🖥️</div>
              <h3>{t.hostingModelTitle}</h3>
              <p>{t.hostingModelText}</p>
              <div className={styles.modelDetails}>
                <span className={styles.cost}>Personal: Hosted by Us</span>
                <span className={styles.ownership}>Private: Your Choice</span>
                <span className={styles.exclusivity}>Free Consultancy</span>
              </div>
            </div>

            <div className={styles.modelCard}>
              <div className={styles.modelIcon}>💰</div>
              <h3>{t.transparentCostsTitle}</h3>
              <p>{t.transparentCostsText}</p>
              <div className={styles.modelDetails}>
                <span className={styles.cost}>No Hidden Fees</span>
                <span className={styles.ownership}>Clear Breakdown</span>
                <span className={styles.exclusivity}>Your Decision</span>
              </div>
            </div>
          </div>

          <div className={styles.exampleScenario}>
            <h4>Example: Company A wants employee time tracking</h4>
            <div className={styles.scenarioOptions}>
              <div className={styles.option}>
                <strong>Private:</strong> Pay $5,000 development + hosting costs
                → Feature belongs only to Company A, deployed on their
                infrastructure
              </div>
              <div className={styles.option}>
                <strong>Shared:</strong> Pay $200/month maintenance → We develop
                it, everyone gets it, hosted on our infrastructure
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.values}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{t.valuesTitle}</h2>

          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <h3>{t.absoluteTransparencyTitle}</h3>
              <p>{t.absoluteTransparencyText}</p>
            </div>

            <div className={styles.valueCard}>
              <h3>{t.smartEconomyTitle}</h3>
              <p>{t.smartEconomyText}</p>
            </div>

            <div className={styles.valueCard}>
              <h3>{t.openSourceFirstTitle}</h3>
              <p>{t.openSourceFirstText}</p>
            </div>

            <div className={styles.valueCard}>
              <h3>{t.digitalProtectionTitle}</h3>
              <p>{t.digitalProtectionText}</p>
            </div>
            <div className={styles.valueCard}>
              <h3>{t.technicalMeritocracyTitle}</h3>
              <p>{t.technicalMeritocracyText}</p>
            </div>

            <div className={styles.valueCard}>
              <h3>{t.continuousEducationTitle}</h3>
              <p>{t.continuousEducationText}</p>
            </div>

            <div className={styles.valueCard}>
              <h3>{t.globalMindsetTitle}</h3>
              <p>{t.globalMindsetText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className={styles.technology}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{t.techStackTitle}</h2>

          <div className={styles.techGrid}>
            <div className={styles.techCard}>
              <h4>{t.golangTitle}</h4>
              <p>{t.golangText}</p>
            </div>

            <div className={styles.techCard}>
              <h4>{t.keycloakTitle}</h4>
              <p>{t.keycloakText}</p>
            </div>

            <div className={styles.techCard}>
              <h4>{t.containersTitle}</h4>
              <p>{t.containersText}</p>
            </div>

            <div className={styles.techCard}>
              <h4>{t.reactTitle}</h4>
              <p>{t.reactText}</p>
            </div>

            <div className={styles.techCard}>
              <h4>{t.nginxTitle}</h4>
              <p>{t.nginxText}</p>
            </div>

            <div className={styles.techCard}>
              <h4>{t.giteaTitle}</h4>
              <p>{t.giteaText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* What This Means for You Section */}
      <section className={styles.whatThisMeans}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{t.whatThisMeansTitle}</h2>
          <p className={styles.sectionSubtitle}>{t.whatThisMeansSubtitle}</p>

          <div className={styles.explanationsGrid}>
            <div className={styles.explanationCard}>
              <div className={styles.technicalTerm}>
                <span className={styles.termIcon}>🔓</span>
                <h4>100% Open Source</h4>
              </div>
              <div className={styles.businessMeaning}>
                <h5>{t.openSourceMeaning}</h5>
                <p>{t.openSourceExplanation}</p>
              </div>
            </div>

            <div className={styles.explanationCard}>
              <div className={styles.technicalTerm}>
                <span className={styles.termIcon}>🏢</span>
                <h4>Custom Software</h4>
              </div>
              <div className={styles.businessMeaning}>
                <h5>{t.customSoftwareMeaning}</h5>
                <p>{t.customSoftwareExplanation}</p>
              </div>
            </div>

            <div className={styles.explanationCard}>
              <div className={styles.technicalTerm}>
                <span className={styles.termIcon}>🔧</span>
                <h4>Microservices</h4>
              </div>
              <div className={styles.businessMeaning}>
                <h5>{t.microservicesMeaning}</h5>
                <p>{t.microservicesExplanation}</p>
              </div>
            </div>

            <div className={styles.explanationCard}>
              <div className={styles.technicalTerm}>
                <span className={styles.termIcon}>🐳</span>
                <h4>Containers & Docker</h4>
              </div>
              <div className={styles.businessMeaning}>
                <h5>{t.containersMeaning}</h5>
                <p>{t.containersExplanation}</p>
              </div>
            </div>

            <div className={styles.explanationCard}>
              <div className={styles.technicalTerm}>
                <span className={styles.termIcon}>🔐</span>
                <h4>Keycloak SSO</h4>
              </div>
              <div className={styles.businessMeaning}>
                <h5>{t.keycloakMeaning}</h5>
                <p>{t.keycloakExplanation}</p>
              </div>
            </div>

            <div className={styles.explanationCard}>
              <div className={styles.technicalTerm}>
                <span className={styles.termIcon}>🚀</span>
                <h4>Golang Performance</h4>
              </div>
              <div className={styles.businessMeaning}>
                <h5>{t.golangMeaning}</h5>
                <p>{t.golangExplanation}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{t.servicesTitle}</h2>
          <p className={styles.sectionSubtitle}>{t.servicesSubtitle}</p>
          <p className={styles.servicesDesc}>{t.servicesDesc}</p>

          <div className={styles.servicesGrid}>
            <div className={styles.serviceOption}>
              <div className={styles.serviceIcon}>👤</div>
              <h3>{t.servicesPersonalTitle}</h3>
              <p>{t.servicesPersonalDesc}</p>
              <ul className={styles.serviceFeatures}>
                {t.servicesPersonalFeatures.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <button
                onClick={handleGetStarted}
                className={styles.serviceButton}
              >
                Try Free Now
              </button>
            </div>

            <div className={styles.serviceOption}>
              <div className={styles.serviceIcon}>🏢</div>
              <h3>{t.servicesBusinessTitle}</h3>
              <p>{t.servicesBusinessDesc}</p>
              <ul className={styles.serviceFeatures}>
                {t.servicesBusinessFeatures.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <button
                onClick={handleViewServices}
                className={styles.serviceButton}
              >
                Learn More
              </button>
            </div>

            <div className={styles.serviceOption}>
              <div className={styles.serviceIcon}>🔧</div>
              <h3>{t.servicesExtensionTitle}</h3>
              <p>{t.servicesExtensionDesc}</p>
              <ul className={styles.serviceFeatures}>
                {t.servicesExtensionFeatures.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <button
                onClick={handleViewServices}
                className={styles.serviceButton}
              >
                Explore Options
              </button>
            </div>
          </div>

          <div className={styles.servicesCtaCenter}>
            <button
              onClick={handleViewServices}
              className={styles.allServicesButton}
            >
              {t.servicesButton}
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className={styles.finalCta}>
        <div className={styles.container}>
          <h2>{t.finalCtaTitle}</h2>
          <p>{t.finalCtaText}</p>
          <button className={styles.ctaButton} onClick={handleGetStarted}>
            {t.finalCtaButton}
          </button>
          <p className={styles.ctaSubtext}>{t.finalCtaSubtext}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerText}>{t.footerText}</div>
        <div className={styles.footerSubtext}>{t.footerSubtext}</div>
      </footer>
    </div>
  );
}
