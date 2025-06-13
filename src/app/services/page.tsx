"use client";

import { useState } from "react";
import styles from "./page.module.scss";

export default function ServicesPage() {
  const [isPortuguese, setIsPortuguese] = useState(false);

  const toggleLanguage = () => {
    setIsPortuguese(!isPortuguese);
  };

  const content = {
    en: {
      title: "Our Services",
      subtitle: "Professional software solutions tailored to your business needs",
      
      fullDevelopmentTitle: "🏢 Full Software Development",
      fullDevelopmentDesc: "Complete custom software development where your company owns 100% of the code. Perfect for competitive advantages and proprietary solutions.",
      fullDevelopmentFeatures: [
        "100% code ownership",
        "Custom architecture design", 
        "Scalable microservices",
        "Enterprise security",
        "Complete documentation"
      ],

      deploymentTitle: "🚀 Deployment & Cost Optimization",
      deploymentDesc: "Expert consultancy to reduce your hosting costs and optimize deployment strategies. We help you choose the most efficient infrastructure.",
      deploymentFeatures: [
        "Infrastructure audit",
        "Cost reduction strategies",
        "Deployment automation",
        "Performance optimization",
        "Monitoring setup"
      ],

      corporateAccountsTitle: "👥 Corporate Personal Manager",
      corporateAccountsDesc: "Extend our Personal Manager for your team with collaboration tools, e-commerce integration, and business-specific features.",
      corporateAccountsFeatures: [
        "Team collaboration tools",
        "E-commerce management",
        "Restaurant/inventory systems",
        "Multi-user permissions",
        "Business analytics"
      ],

      customFeaturesTitle: "🔧 Custom Feature Development",
      customFeaturesDesc: "Develop specific features for the Personal Manager to meet your unique business requirements. Choose private ownership or shared ecosystem.",
      customFeaturesFeatures: [
        "Business-specific modules",
        "Integration capabilities",
        "Custom workflows",
        "Reporting systems",
        "API extensions"
      ],

      integrationTitle: "🔗 Frontend Integration Services",
      integrationDesc: "Connect your existing frontend with Personal Manager's backend. Manage your e-commerce, portfolio, or any system through our unified platform.",
      integrationFeatures: [
        "API integration",
        "Real-time synchronization",
        "Custom dashboards",
        "Multi-platform support",
        "Data consistency"
      ],

      backendOnlyTitle: "⚙️ Backend-Only Development",
      backendOnlyDesc: "Pure backend development services. We build robust, scalable APIs and services that integrate with your existing frontend solutions.",
      backendOnlyFeatures: [
        "RESTful APIs",
        "Database design",
        "Authentication systems",
        "Payment processing",
        "Third-party integrations"
      ],

      ctaTitle: "Ready to Start Your Project?",
      ctaDesc: "Contact us to discuss your specific needs and get a customized solution proposal.",
      ctaButton: "Get Started",
      
      pricingNote: "All services include transparent pricing with no hidden fees. You know exactly what you're paying for: our costs + our fair profit."
    },
    pt: {
      title: "Nossos Serviços",
      subtitle: "Soluções de software profissionais sob medida para seu negócio",
      
      fullDevelopmentTitle: "🏢 Desenvolvimento Completo de Software",
      fullDevelopmentDesc: "Desenvolvimento completo de software customizado onde sua empresa possui 100% do código. Perfeito para vantagens competitivas e soluções proprietárias.",
      fullDevelopmentFeatures: [
        "100% propriedade do código",
        "Design de arquitetura customizada",
        "Microserviços escaláveis", 
        "Segurança empresarial",
        "Documentação completa"
      ],

      deploymentTitle: "🚀 Deploy & Otimização de Custos",
      deploymentDesc: "Consultoria especializada para reduzir custos de hospedagem e otimizar estratégias de deployment. Ajudamos você a escolher a infraestrutura mais eficiente.",
      deploymentFeatures: [
        "Auditoria de infraestrutura",
        "Estratégias de redução de custos",
        "Automação de deployment",
        "Otimização de performance",
        "Configuração de monitoramento"
      ],

      corporateAccountsTitle: "👥 Personal Manager Corporativo",
      corporateAccountsDesc: "Estenda nosso Personal Manager para sua equipe com ferramentas de colaboração, integração e-commerce e recursos específicos para negócios.",
      corporateAccountsFeatures: [
        "Ferramentas de colaboração",
        "Gestão de e-commerce",
        "Sistemas de restaurante/estoque",
        "Permissões multi-usuário",
        "Analytics empresarial"
      ],

      customFeaturesTitle: "🔧 Desenvolvimento de Features Customizadas",
      customFeaturesDesc: "Desenvolva recursos específicos para o Personal Manager para atender suas necessidades únicas de negócio. Escolha propriedade privada ou ecossistema compartilhado.",
      customFeaturesFeatures: [
        "Módulos específicos do negócio",
        "Capacidades de integração",
        "Workflows customizados",
        "Sistemas de relatório",
        "Extensões de API"
      ],

      integrationTitle: "🔗 Serviços de Integração Frontend",
      integrationDesc: "Conecte seu frontend existente com o backend do Personal Manager. Gerencie seu e-commerce, portfólio ou qualquer sistema através da nossa plataforma unificada.",
      integrationFeatures: [
        "Integração de API",
        "Sincronização em tempo real",
        "Dashboards customizados",
        "Suporte multi-plataforma",
        "Consistência de dados"
      ],

      backendOnlyTitle: "⚙️ Desenvolvimento Apenas Backend",
      backendOnlyDesc: "Serviços puros de desenvolvimento backend. Construímos APIs e serviços robustos e escaláveis que se integram com suas soluções frontend existentes.",
      backendOnlyFeatures: [
        "APIs RESTful",
        "Design de banco de dados",
        "Sistemas de autenticação",
        "Processamento de pagamentos",
        "Integrações com terceiros"
      ],

      ctaTitle: "Pronto para Começar Seu Projeto?",
      ctaDesc: "Entre em contato para discutir suas necessidades específicas e receber uma proposta de solução customizada.",
      ctaButton: "Começar Agora",
      
      pricingNote: "Todos os serviços incluem preços transparentes sem taxas ocultas. Você sabe exatamente pelo que está pagando: nossos custos + nosso lucro justo."
    }
  };

  const t = content[isPortuguese ? "pt" : "en"];

  const services = [
    {
      title: t.fullDevelopmentTitle,
      desc: t.fullDevelopmentDesc,
      features: t.fullDevelopmentFeatures,
      icon: "🏢"
    },
    {
      title: t.deploymentTitle,
      desc: t.deploymentDesc,
      features: t.deploymentFeatures,
      icon: "🚀"
    },
    {
      title: t.corporateAccountsTitle,
      desc: t.corporateAccountsDesc,
      features: t.corporateAccountsFeatures,
      icon: "👥"
    },
    {
      title: t.customFeaturesTitle,
      desc: t.customFeaturesDesc,
      features: t.customFeaturesFeatures,
      icon: "🔧"
    },
    {
      title: t.integrationTitle,
      desc: t.integrationDesc,
      features: t.integrationFeatures,
      icon: "🔗"
    },
    {
      title: t.backendOnlyTitle,
      desc: t.backendOnlyDesc,
      features: t.backendOnlyFeatures,
      icon: "⚙️"
    }
  ];

  return (
    <div className={styles.page}>
      <button className={styles.languageToggle} onClick={toggleLanguage}>
        {isPortuguese ? "🇺🇸 English" : "🇧🇷 Português"}
      </button>

      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>{t.title}</h1>
          <p className={styles.subtitle}>{t.subtitle}</p>
        </header>

        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <div key={index} className={styles.serviceCard}>
              <div className={styles.serviceIcon}>{service.icon}</div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDesc}>{service.desc}</p>
              <ul className={styles.featureList}>
                {service.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.pricingNote}>
          <p>{t.pricingNote}</p>
        </div>

        <div className={styles.cta}>
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaDesc}</p>
          <button className={styles.ctaButton}>{t.ctaButton}</button>
        </div>
      </div>
    </div>
  );
}