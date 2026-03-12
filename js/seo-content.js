// ══════════════════════════════════════════════════════════════
// SQUIDS — SEO Content Data Library
// African countries, cities, languages, hashtags, keywords
// Used for dynamic meta tags, breadcrumbs, and content
// ══════════════════════════════════════════════════════════════
(function () {
  'use strict';

  window.SQ = window.SQ || {};

  // ── African Countries Data ───────────────────────────────────
  SQ.countries = [
    { code:'ZA', name:'South Africa', flag:'🇿🇦', lang:'en', capital:'Pretoria', cities:['Johannesburg','Cape Town','Durban','Pretoria','Port Elizabeth'] },
    { code:'NG', name:'Nigeria', flag:'🇳🇬', lang:'en', capital:'Abuja', cities:['Lagos','Abuja','Ibadan','Kano','Port Harcourt'] },
    { code:'KE', name:'Kenya', flag:'🇰🇪', lang:'sw,en', capital:'Nairobi', cities:['Nairobi','Mombasa','Kisumu','Nakuru','Eldoret'] },
    { code:'GH', name:'Ghana', flag:'🇬🇭', lang:'en', capital:'Accra', cities:['Accra','Kumasi','Tamale','Sekondi-Takoradi','Ashaiman'] },
    { code:'EG', name:'Egypt', flag:'🇪🇬', lang:'ar', capital:'Cairo', cities:['Cairo','Alexandria','Giza','Shubra El-Kheima','Port Said'] },
    { code:'ET', name:'Ethiopia', flag:'🇪🇹', lang:'am', capital:'Addis Ababa', cities:['Addis Ababa','Dire Dawa','Mek\'ele','Gondar','Hawassa'] },
    { code:'TZ', name:'Tanzania', flag:'🇹🇿', lang:'sw,en', capital:'Dodoma', cities:['Dar es Salaam','Dodoma','Zanzibar City','Mwanza','Arusha'] },
    { code:'UG', name:'Uganda', flag:'🇺🇬', lang:'en,sw', capital:'Kampala', cities:['Kampala','Gulu','Lira','Mbarara','Jinja'] },
    { code:'RW', name:'Rwanda', flag:'🇷🇼', lang:'en,fr,sw', capital:'Kigali', cities:['Kigali','Butare','Gitarama','Ruhengeri','Gisenyi'] },
    { code:'SN', name:'Senegal', flag:'🇸🇳', lang:'fr', capital:'Dakar', cities:['Dakar','Touba','Thiès','Saint-Louis','Kaolack'] },
    { code:'CI', name:"Côte d'Ivoire", flag:'🇨🇮', lang:'fr', capital:'Yamoussoukro', cities:['Abidjan','Bouaké','Daloa','Yamoussoukro','Korhogo'] },
    { code:'CM', name:'Cameroon', flag:'🇨🇲', lang:'en,fr', capital:'Yaoundé', cities:['Douala','Yaoundé','Bamenda','Bafoussam','Ngaoundéré'] },
    { code:'ZM', name:'Zambia', flag:'🇿🇲', lang:'en', capital:'Lusaka', cities:['Lusaka','Kitwe','Ndola','Kabwe','Chingola'] },
    { code:'ZW', name:'Zimbabwe', flag:'🇿🇼', lang:'en', capital:'Harare', cities:['Harare','Bulawayo','Chitungwiza','Mutare','Gweru'] },
    { code:'BW', name:'Botswana', flag:'🇧🇼', lang:'en', capital:'Gaborone', cities:['Gaborone','Francistown','Molepolole','Kanye','Serowe'] },
    { code:'NA', name:'Namibia', flag:'🇳🇦', lang:'en', capital:'Windhoek', cities:['Windhoek','Rundu','Walvis Bay','Oshakati','Swakopmund'] },
    { code:'MA', name:'Morocco', flag:'🇲🇦', lang:'ar', capital:'Rabat', cities:['Casablanca','Fez','Tangier','Marrakech','Rabat'] },
    { code:'DZ', name:'Algeria', flag:'🇩🇿', lang:'ar', capital:'Algiers', cities:['Algiers','Oran','Constantine','Annaba','Blida'] },
    { code:'TN', name:'Tunisia', flag:'🇹🇳', lang:'ar', capital:'Tunis', cities:['Tunis','Sfax','Sousse','Ettadhamen','Kairouan'] },
    { code:'ML', name:'Mali', flag:'🇲🇱', lang:'fr', capital:'Bamako', cities:['Bamako','Sikasso','Mopti','Koutiala','Ségou'] },
    { code:'BF', name:'Burkina Faso', flag:'🇧🇫', lang:'fr', capital:'Ouagadougou', cities:['Ouagadougou','Bobo-Dioulasso','Koudougou','Banfora','Ouahigouya'] },
    { code:'SD', name:'Sudan', flag:'🇸🇩', lang:'ar', capital:'Khartoum', cities:['Khartoum','Omdurman','Port Sudan','Kassala','El-Obeid'] },
    { code:'SS', name:'South Sudan', flag:'🇸🇸', lang:'en', capital:'Juba', cities:['Juba','Wau','Malakal','Kwajok','Yei'] },
    { code:'AO', name:'Angola', flag:'🇦🇴', lang:'pt', capital:'Luanda', cities:['Luanda','Huambo','Lobito','Benguela','Kuito'] },
    { code:'MZ', name:'Mozambique', flag:'🇲🇿', lang:'pt', capital:'Maputo', cities:['Maputo','Matola','Beira','Nampula','Chimoio'] },
    { code:'MG', name:'Madagascar', flag:'🇲🇬', lang:'fr', capital:'Antananarivo', cities:['Antananarivo','Toamasina','Antsirabe','Mahajanga','Fianarantsoa'] },
    { code:'MW', name:'Malawi', flag:'🇲🇼', lang:'en', capital:'Lilongwe', cities:['Lilongwe','Blantyre','Mzuzu','Zomba','Kasungu'] },
    { code:'TD', name:'Chad', flag:'🇹🇩', lang:'fr,ar', capital:"N'Djamena", cities:["N'Djamena",'Moundou','Sarh','Abéché','Kélo'] },
    { code:'NE', name:'Niger', flag:'🇳🇪', lang:'fr', capital:'Niamey', cities:['Niamey','Zinder','Maradi','Agadez','Tahoua'] },
    { code:'MR', name:'Mauritania', flag:'🇲🇷', lang:'ar', capital:'Nouakchott', cities:['Nouakchott','Nouadhibou','Rosso','Kaédi','Gao'] },
    { code:'CD', name:'DR Congo', flag:'🇨🇩', lang:'fr', capital:'Kinshasa', cities:['Kinshasa','Lubumbashi','Mbuji-Mayi','Kananga','Kisangani'] },
    { code:'CG', name:'Republic of Congo', flag:'🇨🇬', lang:'fr', capital:'Brazzaville', cities:['Brazzaville','Pointe-Noire','Dolisie','Nkayi','Ouesso'] },
    { code:'GA', name:'Gabon', flag:'🇬🇦', lang:'fr', capital:'Libreville', cities:['Libreville','Port-Gentil','Franceville','Oyem','Mouanda'] },
    { code:'GN', name:'Guinea', flag:'🇬🇳', lang:'fr', capital:'Conakry', cities:['Conakry','Nzérékoré','Kankan','Kindia','Labé'] },
    { code:'SL', name:'Sierra Leone', flag:'🇸🇱', lang:'en', capital:'Freetown', cities:['Freetown','Bo','Kenema','Makeni','Koidu'] },
    { code:'LR', name:'Liberia', flag:'🇱🇷', lang:'en', capital:'Monrovia', cities:['Monrovia','Buchanan','Gbarnga','Kakata','Voinjama'] },
    { code:'SO', name:'Somalia', flag:'🇸🇴', lang:'ar', capital:'Mogadishu', cities:['Mogadishu','Hargeisa','Kismayo','Bosaso','Beledweyne'] },
    { code:'ER', name:'Eritrea', flag:'🇪🇷', lang:'ar,am', capital:'Asmara', cities:['Asmara','Keren','Massawa','Assab','Mendefera'] },
    { code:'DJ', name:'Djibouti', flag:'🇩🇯', lang:'ar,fr', capital:'Djibouti', cities:['Djibouti City','Ali Sabieh','Dikhil','Obock','Tadjourah'] },
    { code:'BI', name:'Burundi', flag:'🇧🇮', lang:'fr,sw', capital:'Gitega', cities:['Bujumbura','Gitega','Ngozi','Rumonge','Muyinga'] },
    { code:'BJ', name:'Benin', flag:'🇧🇯', lang:'fr', capital:'Porto-Novo', cities:['Cotonou','Porto-Novo','Parakou','Abomey','Lokossa'] },
    { code:'TG', name:'Togo', flag:'🇹🇬', lang:'fr', capital:'Lomé', cities:['Lomé','Sokodé','Kara','Kpalimé','Atakpamé'] },
    { code:'GH', name:'Ghana', flag:'🇬🇭', lang:'en', capital:'Accra', cities:['Accra','Kumasi','Tamale','Sekondi-Takoradi'] },
    { code:'LY', name:'Libya', flag:'🇱🇾', lang:'ar', capital:'Tripoli', cities:['Tripoli','Benghazi','Misrata','Tarhuna','Bayda'] },
    { code:'CF', name:'Central African Republic', flag:'🇨🇫', lang:'fr', capital:'Bangui', cities:['Bangui','Bimbo','Mbaïki','Berbérati','Kaga Bandoro'] },
    { code:'GQ', name:'Equatorial Guinea', flag:'🇬🇶', lang:'fr', capital:'Malabo', cities:['Malabo','Bata','Ebebiyín','Aconibe','Añisoc'] },
    { code:'LS', name:'Lesotho', flag:'🇱🇸', lang:'en', capital:'Maseru', cities:['Maseru','Teyateyaneng','Mafeteng','Hlotse','Mohale\'s Hoek'] },
    { code:'SZ', name:'Eswatini', flag:'🇸🇿', lang:'en', capital:'Mbabane', cities:['Mbabane','Manzini','Big Bend','Malkerns','Nhlangano'] },
    { code:'GM', name:'Gambia', flag:'🇬🇲', lang:'en', capital:'Banjul', cities:['Banjul','Serekunda','Brikama','Bakau','Farafenni'] },
    { code:'GW', name:'Guinea-Bissau', flag:'🇬🇼', lang:'pt', capital:'Bissau', cities:['Bissau','Gabu','Bafatá','Canchungo','Bissorã'] },
    { code:'CV', name:'Cape Verde', flag:'🇨🇻', lang:'pt', capital:'Praia', cities:['Praia','Mindelo','Santa Maria','Assomada','São Filipe'] },
    { code:'ST', name:'São Tomé and Príncipe', flag:'🇸🇹', lang:'pt', capital:'São Tomé', cities:['São Tomé','Santo António'] },
    { code:'KM', name:'Comoros', flag:'🇰🇲', lang:'ar,fr', capital:'Moroni', cities:['Moroni','Mutsamudu','Fomboni','Tsembéhou'] },
    { code:'MU', name:'Mauritius', flag:'🇲🇺', lang:'en,fr', capital:'Port Louis', cities:['Port Louis','Beau Bassin-Rose Hill','Vacoas-Phoenix','Curepipe'] },
    { code:'SC', name:'Seychelles', flag:'🇸🇨', lang:'en,fr', capital:'Victoria', cities:['Victoria','Anse Boileau','Bel Ombre','Beau Vallon'] }
  ];

  // ── SEO hashtags by category ─────────────────────────────────
  SQ.trendingHashtags = [
    // Music
    '#Afrobeats','#Afropop','#Amapiano','#Bongo','#Highlife','#Afrojuju',
    '#AfricanMusic','#AfroBeat','#Kizomba','#Azonto','#Mbaqanga',
    // Culture
    '#Africa','#AfricanCulture','#AfricanArt','#Ubuntu','#AfricanFashion',
    '#AfricanFood','#AfricanPhotography','#AfricanStorytelling',
    // Countries
    '#SouthAfrica','#Nigeria','#Kenya','#Ghana','#Egypt','#Ethiopia',
    '#Tanzania','#Uganda','#Rwanda','#Senegal','#Cameroon','#Zimbabwe',
    // Cities
    '#Johannesburg','#CapeTown','#Lagos','#Nairobi','#Accra','#Cairo',
    '#Dakar','#Abidjan','#Kampala','#Kigali','#AddisAbaba','#Dar',
    // Social/lifestyle
    '#AfricanTwitter','#AfricaTech','#MadeInAfrica','#BuyAfrican',
    '#AfricanEntrepreneur','#StartupAfrica','#AfricanWomen','#AfricanYouth',
    // Sport
    '#AFCON','#Premier League','#BallerAfrica','#Rugby','#Athletics',
    // Entertainment
    '#Nollywood','#Sakawa','#OceanMode','#SquidsApp','#SquidsAfrica',
    // Religion/community
    '#SundayService','#FridayPrayer','#Ramadan','#Christmas','#Eid',
    // Education
    '#AfricanStudent','#StudyInAfrica','#AfricanGrad','#STEM',
    // Business
    '#SMEAfrica','#AfricanBusiness','#Hustle','#Entrepreneur'
  ];

  // ── SEO keywords for Google ──────────────────────────────────
  SQ.seoKeywords = [
    'social media Africa',
    'African social network',
    'connect with friends Africa',
    'Africa social platform free',
    'best social media South Africa',
    'Nigerian social media app',
    'Kenyan social network',
    'Ghanaian social platform',
    'Africa TikTok alternative',
    'Africa Instagram alternative',
    'Africa Twitter alternative',
    'African community online',
    'share stories Africa',
    'African creators platform',
    'African diaspora social media',
    'free social media no ads Africa',
    'privacy social media Africa POPIA',
    'multilingual social Africa',
    'Africa video platform',
    'African culture social network',
    'squids social app',
    'squids africa',
    'squids.co.za',
    'app.squids.co.za',
    'tyvila online squids',
    'vuyani vilakazi squids',
    'ocean mode squids',
    'african ocean tiktok',
    'free forever africa social',
    'POPIA compliant social media'
  ];

  // ── Dynamic page meta injection ──────────────────────────────
  function injectDynamicMeta() {
    // Add keywords meta if not present
    if (!document.querySelector('meta[name="keywords"]')) {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = SQ.seoKeywords.join(', ');
      document.head.appendChild(meta);
    }

    // Add article:author for blog-type pages
    if (!document.querySelector('meta[property="article:author"]')) {
      const m = document.createElement('meta');
      m.setAttribute('property', 'article:author');
      m.content = 'https://www.tyvila.online';
      document.head.appendChild(m);
    }

    // Language alternates for current page
    const path = window.location.pathname;
    const langs = ['en','fr','ar','sw','am'];
    langs.forEach(function (l) {
      if (!document.querySelector('link[hreflang="' + l + '"]')) {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = l;
        link.href = window.location.origin + path + '?lang=' + l;
        document.head.appendChild(link);
      }
    });
  }

  // ── Breadcrumb schema injection ──────────────────────────────
  function injectBreadcrumbSchema() {
    const parts = window.location.pathname.split('/').filter(Boolean);
    if (parts.length < 1) return;
    const items = [{ '@type':'ListItem', position:1, name:'Squids', item:'https://squids.co.za' }];
    let accumulated = 'https://squids.co.za';
    parts.forEach(function (part, i) {
      accumulated += '/' + part;
      const name = part.replace('.html','').replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
      items.push({ '@type':'ListItem', position:i+2, name:name, item:accumulated });
    });
    const schema = { '@context':'https://schema.org', '@type':'BreadcrumbList', itemListElement:items };
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(schema);
    document.head.appendChild(s);
  }

  // ── Hashtag cloud injector ───────────────────────────────────
  SQ.renderHashtagCloud = function (containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    SQ.trendingHashtags.slice(0,24).forEach(function (tag) {
      const a = document.createElement('a');
      a.href = 'https://app.squids.co.za/explore?q=' + encodeURIComponent(tag.slice(1));
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = tag;
      a.style.cssText = 'display:inline-flex;padding:5px 12px;border-radius:99px;font-size:13px;font-weight:600;color:rgba(255,255,255,.6);background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);text-decoration:none;transition:all .15s;margin:3px;';
      a.addEventListener('mouseenter', function () { a.style.color='#14b49d'; a.style.borderColor='rgba(20,180,157,.3)'; });
      a.addEventListener('mouseleave', function () { a.style.color='rgba(255,255,255,.6)'; a.style.borderColor='rgba(255,255,255,.07)'; });
      container.appendChild(a);
    });
  };

  // Run on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      injectDynamicMeta();
      injectBreadcrumbSchema();
    });
  } else {
    injectDynamicMeta();
    injectBreadcrumbSchema();
  }

})();
