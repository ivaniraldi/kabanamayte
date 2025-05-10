export function Schema() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Kabanamayte",
    url: "https://kabanamayte.org",
    logo: "https://kabanamayte.org/logo.png",
    sameAs: ["https://www.instagram.com/kabanamayte", "https://www.facebook.com/kabanamayte"],
    description: "ONG dedicada ao resgate e cuidado de animais em situação de rua",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Exemplo, 123",
      addressLocality: "Cidade",
      addressRegion: "SP",
      postalCode: "00000-000",
      addressCountry: "BR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+55-48-98811-6036",
      contactType: "customer service",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
}
