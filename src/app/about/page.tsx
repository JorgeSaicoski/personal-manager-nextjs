"use client";

import { useState } from "react";
import styles from "./page.module.scss";

export default function About() {
  const [isPortuguese, setIsPortuguese] = useState(false);

  const toggleLanguage = () => {
    setIsPortuguese(!isPortuguese);
  };

  const content = {
    en: {
      pageTitle: "Mission, Vision & Values",
      missionTitle: "🎯 Our Mission",
      missionText: "Develop transparent and efficient technological solutions that promote digital independence for small and medium enterprises through open source software, intelligent hosting, and real knowledge transfer.",
      
      visionTitle: "🔭 Our Vision", 
      visionText: "To be the leading reference in ethical and transparent development in Latin America, creating an ecosystem where companies have total control over their technology, data, and operational costs.",
      
      valuesTitle: "💎 Our Values",
      
      absoluteTransparencyTitle: "🔍 Absolute Transparency",
      absoluteTransparencyText: "All code is open, every process is explained, every cost is justified. Clients always know exactly what they're paying for and receiving.",
      
      openSourceFirstTitle: "🌱 Open Source First",
      openSourceFirstText: "We believe knowledge should be shared. We develop with open technologies and make our code available to the community.",
      
      technicalMeritocracyTitle: "⚖️ Technical Meritocracy",
      technicalMeritocracyText: "Solutions based on real competence, not marketing. We measure success by efficiency of results, not size of contracts.",
      
      digitalProtectionTitle: "🛡️ Digital Protection",
      digitalProtectionText: "Like the Southern Lapwing protects its offspring, we protect our clients' data, investments, and technological independence against unnecessary dependencies.",
      
      smartEconomyTitle: "💰 Smart Economy",
      smartEconomyText: "We analyze each scenario individually to find the most efficient solution. Conscious investment generates sustainable results.",
      
      continuousEducationTitle: "🎓 Continuous Education",
      continuousEducationText: "We share knowledge through talks, documentation, and mentoring. An educated client is an independent and successful client.",
      
      globalMindsetTitle: "🌍 Global Mindset",
      globalMindsetText: "International thinking with local execution. Solutions that work in any culture, respecting regional specificities."
    },
    pt: {
      pageTitle: "Missão, Visão e Valores",
      missionTitle: "🎯 Nossa Missão",
      missionText: "Desenvolver soluções tecnológicas transparentes e eficientes que promovam a independência digital para pequenas e médias empresas através de software open source, hospedagem inteligente e transferência real de conhecimento.",
      
      visionTitle: "🔭 Nossa Visão",
      visionText: "Ser a referência líder em desenvolvimento ético e transparente na América Latina, criando um ecossistema onde as empresas tenham controle total sobre sua tecnologia, dados e custos operacionais.",
      
      valuesTitle: "💎 Nossos Valores",
      
      absoluteTransparencyTitle: "🔍 Transparência Absoluta",
      absoluteTransparencyText: "Todo código é aberto, cada processo é explicado, cada custo é justificado. Clientes sempre sabem exatamente pelo que estão pagando e recebendo.",
      
      openSourceFirstTitle: "🌱 Open Source First",
      openSourceFirstText: "Acreditamos que o conhecimento deve ser compartilhado. Desenvolvemos com tecnologias abertas e disponibilizamos nosso código para a comunidade.",
      
      technicalMeritocracyTitle: "⚖️ Meritocracia Técnica",
      technicalMeritocracyText: "Soluções baseadas em competência real, não marketing. Medimos sucesso pela eficiência dos resultados, não pelo tamanho dos contratos.",
      
      digitalProtectionTitle: "🛡️ Proteção Digital",
      digitalProtectionText: "Como o quero-quero protege suas crias, protegemos os dados, investimentos e independência tecnológica de nossos clientes contra dependências desnecessárias.",
      
      smartEconomyTitle: "💰 Economia Inteligente",
      smartEconomyText: "Analisamos cada cenário individualmente para encontrar a solução mais eficiente. Investimento consciente gera resultados sustentáveis.",
      
      continuousEducationTitle: "🎓 Educação Contínua",
      continuousEducationText: "Compartilhamos conhecimento através de palestras, documentação e mentoria. Um cliente educado é um cliente independente e bem-sucedido.",
      
      globalMindsetTitle: "🌍 Mentalidade Global",
      globalMindsetText: "Pensamento internacional com execução local. Soluções que funcionam em qualquer cultura, respeitando as especificidades regionais."
    }
  };

  const t = content[isPortuguese ? "pt" : "en"];

  return (
    <div className={styles.page}>
      {/* Language Toggle */}
      <button className={styles.languageToggle} onClick={toggleLanguage}>
        {isPortuguese ? "🇺🇸 English" : "🇧🇷 Português"}
      </button>

      <div className={styles.container}>
        <h1 className={styles.pageTitle}>{t.pageTitle}</h1>

        {/* Mission Section */}
        <section className={styles.section}>
          <div className={styles.missionCard}>
            <h2>{t.missionTitle}</h2>
            <p>{t.missionText}</p>
          </div>
        </section>

        {/* Vision Section */}
        <section className={styles.section}>
          <div className={styles.visionCard}>
            <h2>{t.visionTitle}</h2>
            <p>{t.visionText}</p>
          </div>
        </section>

        {/* Values Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t.valuesTitle}</h2>
          
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <h3>{t.absoluteTransparencyTitle}</h3>
              <p>{t.absoluteTransparencyText}</p>
            </div>

            <div className={styles.valueCard}>
              <h3>{t.openSourceFirstTitle}</h3>
              <p>{t.openSourceFirstText}</p>
            </div>

            <div className={styles.valueCard}>
              <h3>{t.technicalMeritocracyTitle}</h3>
              <p>{t.technicalMeritocracyText}</p>
            </div>

            <div className={styles.valueCard}>
              <h3>{t.digitalProtectionTitle}</h3>
              <p>{t.digitalProtectionText}</p>
            </div>

            <div className={styles.valueCard}>
              <h3>{t.smartEconomyTitle}</h3>
              <p>{t.smartEconomyText}</p>
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
        </section>
      </div>
    </div>
  );
}