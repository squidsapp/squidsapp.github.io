// ══════════════════════════════════════════════════════════════
// SQUIDS — Structured Data / Schema.org
// Injected dynamically for Google Knowledge Panel
// ══════════════════════════════════════════════════════════════
(function() {
  'use strict';

  const schemas = [
    // Organization
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://squids.co.za/#organization",
      "name": "Squids",
      "alternateName": ["Squids Social", "Squids Africa", "Squids App"],
      "url": "https://squids.co.za",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.tyvila.online/cdn/squids-logo-512.png",
        "width": 512, "height": 512
      },
      "image": [
        "https://www.tyvila.online/cdn/squids-og.png",
        "https://www.tyvila.online/cdn/squids-logo-512.png",
        "https://www.tyvila.online/cdn/vv.png"
      ],
      "description": "Squids is Africa's premier social media platform. Connect, share stories, discover communities, and grow with millions across the continent. Built by Africans, for Africa.",
      "foundingDate": "2024",
      "foundingLocation": { "@type": "Place", "name": "South Africa" },
      "areaServed": { "@type": "Continent", "name": "Africa" },
      "contactPoint": [
        { "@type": "ContactPoint", "email": "support@squids.co.za", "contactType": "customer service", "availableLanguage": ["English", "French", "Arabic", "Swahili", "Amharic"] }
      ],
      "sameAs": [
        "https://app.squids.co.za",
        "https://app.squids.co.za/profile/squids"
      ],
      "founder": {
        "@type": "Person",
        "name": "Vuyani Siyanda Vilakazi",
        "url": "https://www.tyvila.online",
        "image": "https://www.tyvila.online/cdn/vv.png",
        "jobTitle": "Founder & Developer",
        "worksFor": { "@type": "Organization", "name": "TyVila.Online" }
      },
      "parentOrganization": {
        "@type": "Organization",
        "name": "TyVila.Online",
        "url": "https://www.tyvila.online"
      }
    },
    // WebSite with SearchAction
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://squids.co.za/#website",
      "url": "https://squids.co.za",
      "name": "Squids — Africa's Social Platform",
      "description": "Africa's social platform for connecting, sharing stories, and growing with communities across the continent.",
      "publisher": { "@id": "https://squids.co.za/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": { "@type": "EntryPoint", "urlTemplate": "https://app.squids.co.za/explore?q={search_term_string}" },
        "query-input": "required name=search_term_string"
      },
      "inLanguage": ["en", "fr", "ar", "sw", "am"]
    },
    // SoftwareApplication
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": "https://squids.co.za/#app",
      "name": "Squids",
      "applicationCategory": "SocialNetworkingApplication",
      "operatingSystem": "Any, Web, iOS, Android",
      "url": "https://app.squids.co.za",
      "downloadUrl": "https://app.squids.co.za",
      "screenshot": [
        "https://www.tyvila.online/cdn/squids-og.png"
      ],
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "ZAR" },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "1240",
        "bestRating": "5"
      },
      "featureList": [
        "Social feed", "Ocean video mode", "Groups & communities",
        "Direct messages", "Multilingual support", "Post analytics",
        "Explore & discover", "Privacy controls", "POPIA compliant",
        "Two-factor authentication", "Profile customization"
      ],
      "creator": { "@id": "https://squids.co.za/#organization" }
    },
    // BreadcrumbList
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Squids", "item": "https://squids.co.za" },
        { "@type": "ListItem", "position": 2, "name": "Features", "item": "https://squids.co.za/#features" },
        { "@type": "ListItem", "position": 3, "name": "Guide", "item": "https://squids.co.za/pages/guide.html" },
        { "@type": "ListItem", "position": 4, "name": "About", "item": "https://squids.co.za/pages/about.html" }
      ]
    },
    // FAQ
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Squids?",
          "acceptedAnswer": { "@type": "Answer", "text": "Squids is Africa's premier social media platform where you can share stories, connect with communities, discover creators, and grow together across the continent. It's 100% free and available on any device." }
        },
        {
          "@type": "Question",
          "name": "How do I sign up for Squids?",
          "acceptedAnswer": { "@type": "Answer", "text": "Go to app.squids.co.za and click Sign Up. Enter your email, choose a username, set a password, and verify your email. The whole process takes under 2 minutes." }
        },
        {
          "@type": "Question",
          "name": "Is Squids free?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes! Squids is and always will be 100% free. No subscriptions, no ads in your feed, no selling your data." }
        },
        {
          "@type": "Question",
          "name": "What is Ocean Mode on Squids?",
          "acceptedAnswer": { "@type": "Answer", "text": "Ocean is Squids' vertical video feed — similar to TikTok. It shows video posts from across Africa in a fullscreen swipe experience. Post any video to automatically appear in Ocean." }
        },
        {
          "@type": "Question",
          "name": "Is Squids available across Africa?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes! Squids is available in all 54 African countries and supports 5 languages: English, French, Arabic, Swahili, and Amharic." }
        },
        {
          "@type": "Question",
          "name": "Is Squids safe and secure?",
          "acceptedAnswer": { "@type": "Answer", "text": "Squids has automatic two-factor authentication, POPIA compliance (South Africa's privacy law), IP ban protection, and content moderation. Your data is never sold to third parties." }
        }
      ]
    }
  ];

  schemas.forEach(function(schema) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });

})();
