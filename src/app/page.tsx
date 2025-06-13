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

  const toggleLanguage = () => {
    setIsPortuguese(!isPortuguese);
  };

  const content = {
    en: {
      birdEmoji: "🐦",
      title: "Sarkis.dev",
      tagline: "Like the Southern Lapwing, protecting your digital offspring",
      ctaButton: "Access Personal Manager Free",
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
      solutionTitle: "Our Solution: Real Digital Independence",
      solutionSubtitle: "Custom software, open source and with fair costs",
      personalManagerTitle: "Personal Manager Free",
      personalManagerText:
        "Complete control of your life: finances, tasks, studies, calendar. Completely free for personal use.",
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
      finalCtaTitle: "Ready for Your Digital Independence?",
      finalCtaText:
        "Start free with our Personal Manager and discover what it's like to have complete control of your technology.",
      finalCtaButton: "Test Personal Manager Free",
      finalCtaSubtext: "100% free • Open Source • Immediate browser access",
      footerText: "© 2024 Sarkis.dev - Protecting your digital offspring",
      footerSubtext: "Developed in Uruguay 🇺🇾 • Gaucho Heart 💙",
    },
    pt: {
      birdEmoji: "🐦",
      title: "Sarkis.dev",
      tagline: "Como o quero-quero, protegemos suas crias digitais",
      ctaButton: "Acesse Personal Manager Grátis",
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
      solutionTitle: "Nossa Solução: Independência Digital Real",
      solutionSubtitle:
        "Software personalizado, open source e com custos justos",
      personalManagerTitle: "Personal Manager Gratuito",
      personalManagerText:
        "Controle total da sua vida: finanças, tarefas, estudos, calendário. Completamente grátis para uso pessoal.",
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
      nginxText: "Proxy reverso eficiente, SSL automático, load balancing.",
      giteaTitle: "📁 Gitea Self-Hosted",
      giteaText:
        "Seu código, seu servidor, seu controle. Git hosting independente.",
      finalCtaTitle: "Pronto para sua Independência Digital?",
      finalCtaText:
        "Comece gratuitamente com nosso Personal Manager e descubra como é ter controle total da sua tecnologia.",
      finalCtaButton: "Teste Personal Manager Grátis",
      finalCtaSubtext:
        "100% gratuito • Open Source • Acesso imediato no navegador",
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
