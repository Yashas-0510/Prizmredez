export default function JsonLdSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://prizmstudio.in/#organization",
        "name": "PRIZM Studio",
        "url": "https://prizmstudio.in",
        "logo": "https://prizmstudio.in/prizmlogo-transparent.png",
        "image": "https://prizmstudio.in/prizm_og1.jpg",
        "email": "hello@prizmstudio.in",
        "description":
          "PRIZM is a high-end creative studio specializing in web design & development, cinematic motion, paid ad creatives, and creator engines.",
        "areaServed": "Worldwide",
        "founder": [
          {
            "@type": "Person",
            "name": "Rhea",
            "jobTitle": "Co-Founder"
          },
          {
            "@type": "Person",
            "name": "Yash",
            "jobTitle": "Co-Founder"
          }
        ],
        "knowsAbout": [
          "Web Design & Development",
          "Next.js Development",
          "Cinematic 3D Motion",
          "Paid Social Ad Creatives",
          "AI UGC Creator Engine",
          "Social Media Systems"
        ],
        "sameAs": [
          "https://instagram.com/prizmstudio.in"
        ]
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://prizmstudio.in/#service",
        "name": "PRIZM Creative Studio",
        "url": "https://prizmstudio.in",
        "priceRange": "$$$$",
        "image": "https://prizmstudio.in/prizm_og1.jpg",
        "areaServed": "Worldwide",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Creative Studio Offerings",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Web Design & Development",
                "description": "High-converting React & Next.js motion web experiences."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Ad Creatives & Paid Social",
                "description": "High-performance video and display creatives for Meta & TikTok."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Creator Engine / AI UGC",
                "description": "Scalable creator campaigns and AI UGC video pipelines."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Social Systems",
                "description": "Full-funnel brand content systems and community growth."
              }
            }
          ]
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
