// ==========================================
// SCRIPT.JS - TI-WiTech (Version Finale Anti-Amnésie)
// ==========================================

// --- 1. SYSTÈME DE MÉMOIRE & URL (NOUVEAU) ---
// On regarde d'abord si la langue est dans l'URL (ex: ?lang=en)
const urlParams = new URLSearchParams(window.location.search);
const langParam = urlParams.get('lang');

if (langParam === 'fr' || langParam === 'en') {
    localStorage.setItem('siteLang', langParam); // On sauvegarde si on peut
}

// On définit la langue actuelle
let currentLang = langParam || localStorage.getItem('siteLang') || 'fr';

// --- 2. FORCER LA LANGUE SUR TOUS LES LIENS (NOUVEAU) ---
// Cette fonction ajoute "?lang=en" à chaque fois que tu cliques sur une de tes pages
document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.getAttribute('href')) {
        let href = link.getAttribute('href');
        // Si c'est un lien vers une de TES pages (pas Facebook ou un email)
        if (href.includes('.html') || href.startsWith('#')) {
            e.preventDefault(); // On bloque le clic normal
            
            // On fabrique la nouvelle URL avec la langue
            let newUrl = new URL(link.href, window.location.href);
            newUrl.searchParams.set('lang', currentLang);
            
            // On redirige vers cette nouvelle page
            window.location.href = newUrl.toString();
        }
    }
});

// --- 3. DICTIONNAIRE DE TRADUCTION ---
const translations = {
    fr: {
        navServices: "Services", navAbout: "À propos", navGalerie: "En action", navContact: "Contact", langBtn: "EN",
        footerText: "© 2026 TI-WiTech | ", footerFb: "Suivez-nous sur Facebook",
        
        // Accueil
        hero: "SOUTIEN INFORMATIQUE<br>À DOMICILE", heroSub: "PARTICULIERS & PME", heroDesc: "Spécialisé en systèmes et réseaux informatiques", 
        cta: "DEMANDER UNE ASSISTANCE", ctaFb: "SUIVRE SUR FACEBOOK",
        srvTitle: "NOS SERVICES", 
        srv1: "Ordinateurs, portables ou Mac", srv2: "Tablettes et téléphones intelligents", srv3: "Télévisions et services de diffusion", srv4: "Internet, Wi-Fi et réseautique", srv5: "Équipements audio domestiques",
        aboutT: "NOTRE MISSION", aboutText: "Notre objectif est de vous accompagner afin de mieux comprendre et utiliser vos appareils...",
        terrTitle: "📍 Secteurs desservis :", terrText: "Rive-Nord de Montréal et Lanaudière.",
        galerieT: "EN ACTION", contactT: "CONTACTEZ-NOUS", 
        phName: "Nom complet", phEmail: "Adresse courriel", phYear: "Année", phMsg: "Détails supplémentaires...",
        optDefault: "-- Sélectionnez l'appareil concerné --", optModelDefault: "-- Marque / Modèle --",
        opt1: "Ordinateur, portable ou Mac", opt2: "Tablette ou Téléphone intelligent", opt3: "Télévision ou service de diffusion", opt4: "Internet, Wi-Fi et réseautique", opt5: "Équipement audio domestique",
        chkTitle: "Quel est le problème principal ?", chk1: "Lenteur ou Gel", chk2: "Virus ou Pop-ups", chk3: "Problème Wi-Fi", chk4: "Installation / Config", chk5: "Bris matériel", chk6: "Autre",
        formBtn: "ENVOYER LA DEMANDE",
        
        // Ordinateur
        pageOrdTitle: "ORDINATEURS & MAC", pageOrdDesc: "Redonnez une seconde jeunesse à votre équipement. Nous offrons un diagnostic complet et des solutions durables pour vos ordinateurs de bureau et portables.", pageOrdCta: "RÉSERVER POUR MON ORDINATEUR",
        "ord-detail-title": "Une expertise sur mesure", "ord-detail-text": "Que votre appareil soit lent, infecté par un virus ou qu'il nécessite une mise à jour matérielle, nous intervenons directement à votre domicile pour régler le problème rapidement.",
        "ord-feat-1-title": "Optimisation & Vitesse", "ord-feat-1-desc": "Nettoyage système, ajout de mémoire vive (RAM) et remplacement par un disque dur ultra-rapide (SSD).",
        "ord-feat-2-title": "Sécurité & Virus", "ord-feat-2-desc": "Suppression de logiciels malveillants, fenêtres indésirables (pop-ups) et installation d'antivirus fiables.",
        "ord-feat-3-title": "Configuration Initiale", "ord-feat-3-desc": "Installation de votre nouvel appareil, transfert de données depuis l'ancien et configuration de vos courriels et imprimantes.",
        "ord-action-title": "Besoin d'un technicien ?",
        
        // Tablette
        pageTabTitle: "TABLETTES & TÉLÉPHONES", pageTabDesc: "Configuration, synchronisation et assistance pour vos appareils mobiles Apple (iOS) et Android.", pageTabCta: "RÉSERVER POUR MA TABLETTE/TÉLÉPHONE",
        "tab-detail-title": "Restez connecté en toute simplicité", "tab-detail-text": "Que ce soit pour configurer un nouvel appareil ou retrouver des mots de passe perdus, nous vous aidons à maîtriser votre tablette ou téléphone intelligent.",
        "tab-feat-1-title": "Courriels & Comptes", "tab-feat-1-desc": "Configuration de vos boîtes de réception, iCloud, Google et récupération d'accès.",
        "tab-feat-2-title": "Transfert de données", "tab-feat-2-desc": "Migration sécurisée de vos photos, contacts et applications vers un nouvel appareil.",
        "tab-feat-3-title": "Formation & Accompagnement", "tab-feat-3-desc": "Apprenez à utiliser FaceTime, à imprimer depuis votre tablette ou à organiser vos photos.",
        "tab-action-title": "Besoin d'un technicien ?",

        // TV
        pageTvTitle: "TÉLÉVISIONS & DIFFUSION", pageTvDesc: "Profitez pleinement de vos divertissements avec une installation professionnelle de vos écrans et services de streaming.", pageTvCta: "RÉSERVER POUR MA TÉLÉVISION",
        "tv-detail-title": "Votre cinéma maison, simplifié", "tv-detail-text": "Nous éliminons la complexité des câbles et des télécommandes multiples pour vous offrir une expérience de visionnement fluide et agréable.",
        "tv-feat-1-title": "Installation & Branchement", "tv-feat-1-desc": "Configuration de votre Smart TV, barre de son et consoles de jeux vidéo.",
        "tv-feat-2-title": "Services de Streaming", "tv-feat-2-desc": "Configuration de Netflix, Prime Video, Tou.tv, et appareils Apple TV, Roku, Chromecast.",
        "tv-feat-3-title": "Simplification", "tv-feat-3-desc": "Réduction du nombre de télécommandes et explications claires sur le fonctionnement global.",
        "tv-action-title": "Besoin d'un technicien ?",

        // Réseau
        pageResTitle: "INTERNET, WI-FI & RÉSEAUTIQUE", pageResDesc: "Obtenez une connexion rapide, stable et sécurisée partout dans votre maison ou votre petite entreprise.", pageResCta: "RÉSERVER POUR MON RÉSEAU",
        "res-detail-title": "Fini les zones sans connexion", "res-detail-text": "Un bon réseau est le cœur de votre domicile technologique. Nous diagnostiquons et résolvons vos problèmes de lenteur et de déconnexion fréquentes.",
        "res-feat-1-title": "Optimisation du Wi-Fi", "res-feat-1-desc": "Installation de routeurs maillés (Mesh) pour éliminer les zones mortes et couvrir toute la maison.",
        "res-feat-2-title": "Câblage & Prises", "res-feat-2-desc": "Branchement optimal de vos équipements réseau pour garantir des vitesses maximales.",
        "res-feat-3-title": "Sécurité du Réseau", "res-feat-3-desc": "Sécurisation de votre connexion, création de réseaux invités et protection de vos données.",
        "res-action-title": "Besoin d'un technicien ?",

        // Audio
        pageAudTitle: "ÉQUIPEMENTS AUDIO DOMESTIQUES", pageAudDesc: "Une qualité sonore exceptionnelle dans chaque pièce grâce à une configuration audio experte.", pageAudCta: "RÉSERVER POUR MON AUDIO",
        "aud-detail-title": "La musique au bout des doigts", "aud-detail-text": "Que vous soyez audiophile ou que vous souhaitiez simplement de la musique d'ambiance, nous configurons vos systèmes pour un contrôle facile depuis votre téléphone.",
        "aud-feat-1-title": "Systèmes Multi-pièces", "aud-feat-1-desc": "Configuration de Sonos, Bose ou autres systèmes pour jouer votre musique partout de manière synchronisée.",
        "aud-feat-2-title": "Cinéma Maison", "aud-feat-2-desc": "Branchement d'amplificateurs, récepteurs et positionnement optimal de vos haut-parleurs.",
        "aud-feat-3-title": "Intégration Sans Fil", "aud-feat-3-desc": "Connectez facilement vos appareils mobiles à votre système de son pour diffuser Spotify, Apple Music ou vos balados.",
        "aud-action-title": "Besoin d'un technicien ?"
    },
    en: {
        navServices: "Services", navAbout: "About Us", navGalerie: "In Action", navContact: "Contact", langBtn: "FR",
        footerText: "© 2026 TI-WiTech | ", footerFb: "Follow us on Facebook",
        
        // Accueil
        hero: "AT-HOME IT<br>SUPPORT", heroSub: "INDIVIDUALS & SMBs", heroDesc: "Specialized in IT systems and networks", 
        cta: "REQUEST ASSISTANCE", ctaFb: "FOLLOW ON FACEBOOK",
        srvTitle: "OUR SERVICES", 
        srv1: "Computers, Laptops or Mac", srv2: "Tablets and Smartphones", srv3: "TVs and Streaming Services", srv4: "Internet, Wi-Fi and Networking", srv5: "Home Audio Equipment",
        aboutT: "OUR MISSION", aboutText: "Our goal is to support you in better understanding and using your devices...",
        terrTitle: "📍 Areas Served:", terrText: "North Shore of Montreal and Lanaudière.",
        galerieT: "IN ACTION", contactT: "GET IN TOUCH", 
        phName: "Full Name", phEmail: "Email Address", phYear: "Year", phMsg: "Additional details...",
        optDefault: "-- Select the device --", optModelDefault: "-- Brand / Model --",
        opt1: "Computer, Laptop or Mac", opt2: "Tablet or Smartphone", opt3: "TV or Streaming Service", opt4: "Internet, Wi-Fi and Networking", opt5: "Home Audio Equipment",
        chkTitle: "What is the main issue?", chk1: "Slow or Freezing", chk2: "Virus or Pop-ups", chk3: "Wi-Fi issue", chk4: "Setup / Config", chk5: "Hardware damage", chk6: "Other",
        formBtn: "SEND REQUEST",
        
        // Ordinateur
        pageOrdTitle: "COMPUTERS & MAC", pageOrdDesc: "Give your equipment a second life. We offer comprehensive diagnostics and lasting solutions for your desktop and laptop computers.", pageOrdCta: "BOOK FOR MY COMPUTER",
        "ord-detail-title": "Customized Expertise", "ord-detail-text": "Whether your device is slow, infected with a virus, or needs a hardware upgrade, we come directly to your home to solve the problem quickly.",
        "ord-feat-1-title": "Speed & Optimization", "ord-feat-1-desc": "System cleanup, RAM upgrades, and replacement with ultra-fast solid-state drives (SSD).",
        "ord-feat-2-title": "Security & Virus Removal", "ord-feat-2-desc": "Removal of malware, unwanted pop-ups, and installation of reliable antivirus software.",
        "ord-feat-3-title": "Initial Setup", "ord-feat-3-desc": "Setup of your new device, data transfer from your old one, and configuration of emails and printers.",
        "ord-action-title": "Need a technician?",
        
        // Tablette
        pageTabTitle: "TABLETS & PHONES", pageTabDesc: "Setup, syncing, and support for your Apple (iOS) and Android mobile devices.", pageTabCta: "BOOK FOR MY TABLET/PHONE",
        "tab-detail-title": "Stay connected with ease", "tab-detail-text": "Whether setting up a new device or recovering lost passwords, we help you master your tablet or smartphone.",
        "tab-feat-1-title": "Emails & Accounts", "tab-feat-1-desc": "Setup of your inboxes, iCloud, Google, and access recovery.",
        "tab-feat-2-title": "Data Transfer", "tab-feat-2-desc": "Secure migration of your photos, contacts, and apps to a new device.",
        "tab-feat-3-title": "Training & Support", "tab-feat-3-desc": "Learn how to use FaceTime, print from your tablet, or organize your photos.",
        "tab-action-title": "Need a technician?",

        // TV
        pageTvTitle: "TVs & STREAMING", pageTvDesc: "Fully enjoy your entertainment with professional installation of your screens and streaming services.", pageTvCta: "BOOK FOR MY TV",
        "tv-detail-title": "Your home theater, simplified", "tv-detail-text": "We eliminate the complexity of cables and multiple remotes to offer you a smooth and enjoyable viewing experience.",
        "tv-feat-1-title": "Installation & Connection", "tv-feat-1-desc": "Setup of your Smart TV, soundbar, and video game consoles.",
        "tv-feat-2-title": "Streaming Services", "tv-feat-2-desc": "Setup of Netflix, Prime Video, Tou.tv, and Apple TV, Roku, Chromecast devices.",
        "tv-feat-3-title": "Simplification", "tv-feat-3-desc": "Reduction in the number of remotes and clear explanations on how everything works.",
        "tv-action-title": "Need a technician?",

        // Réseau
        pageResTitle: "INTERNET, WI-FI & NETWORKING", pageResDesc: "Get a fast, stable, and secure connection anywhere in your home or small business.", pageResCta: "BOOK FOR MY NETWORK",
        "res-detail-title": "No more dead zones", "res-detail-text": "A good network is the heart of your smart home. We diagnose and resolve your slow speeds and frequent disconnections.",
        "res-feat-1-title": "Wi-Fi Optimization", "res-feat-1-desc": "Installation of Mesh routers to eliminate dead zones and cover the entire house.",
        "res-feat-2-title": "Cabling & Outlets", "res-feat-2-desc": "Optimal connection of your network equipment to ensure maximum speeds.",
        "res-feat-3-title": "Network Security", "res-feat-3-desc": "Securing your connection, creating guest networks, and protecting your data.",
        "res-action-title": "Need a technician?",

        // Audio
        pageAudTitle: "HOME AUDIO EQUIPMENT", pageAudDesc: "Exceptional sound quality in every room thanks to expert audio configuration.", pageAudCta: "BOOK FOR MY AUDIO",
        "aud-detail-title": "Music at your fingertips", "aud-detail-text": "Whether you're an audiophile or just want background music, we configure your systems for easy control from your phone.",
        "aud-feat-1-title": "Multi-room Systems", "aud-feat-1-desc": "Setup of Sonos, Bose, or other systems to play your music synchronously everywhere.",
        "aud-feat-2-title": "Home Theater", "aud-feat-2-desc": "Connection of amplifiers, receivers, and optimal placement of your speakers.",
        "aud-feat-3-title": "Wireless Integration", "aud-feat-3-desc": "Easily connect your mobile devices to your sound system to stream Spotify, Apple Music, or your podcasts.",
        "aud-action-title": "Need a technician?"
    }
};

// --- 4. APPLICATION DES TRADUCTIONS ---
function safeSetText(id, text, isPlaceholder = false) {
    const el = document.getElementById(id);
    if (el) {
        if (isPlaceholder) el.placeholder = text;
        else el.innerHTML = text;
    }
}

function applyTranslations() {
    const t = translations[currentLang];
    
    // Éléments Communs
    safeSetText("nav-services", t.navServices); safeSetText("nav-about", t.navAbout);
    safeSetText("nav-galerie", t.navGalerie); safeSetText("nav-contact", t.navContact);
    safeSetText("footer-text", t.footerText); safeSetText("footer-fb", t.footerFb);
    
    // Page d'accueil
    safeSetText("hero-title", t.hero); safeSetText("hero-subtitle", t.heroSub); safeSetText("hero-desc", t.heroDesc);
    safeSetText("cta", t.cta); safeSetText("cta-fb", t.ctaFb);
    safeSetText("services-title", t.srvTitle); safeSetText("srv-1", t.srv1); safeSetText("srv-2", t.srv2);
    safeSetText("srv-3", t.srv3); safeSetText("srv-4", t.srv4); safeSetText("srv-5", t.srv5);
    safeSetText("about-title", t.aboutT); safeSetText("about-text", t.aboutText);
    safeSetText("territory-title", t.terrTitle); safeSetText("territory-text", t.terrText);
    safeSetText("galerie-title", t.galerieT); safeSetText("contact-title", t.contactT);
    
    // Formulaire
    safeSetText("form-name", t.phName, true); safeSetText("form-email", t.phEmail, true);
    safeSetText("form-year", t.phYear, true); safeSetText("form-message", t.phMsg, true);
    safeSetText("opt-default", t.optDefault); safeSetText("opt-model-default", t.optModelDefault);
    safeSetText("opt-1", t.opt1); safeSetText("opt-2", t.opt2); safeSetText("opt-3", t.opt3);
    safeSetText("opt-4", t.opt4); safeSetText("opt-5", t.opt5);
    safeSetText("checkbox-title", t.chkTitle); safeSetText("chk-1", t.chk1); safeSetText("chk-2", t.chk2);
    safeSetText("chk-3", t.chk3); safeSetText("chk-4", t.chk4); safeSetText("chk-5", t.chk5);
    safeSetText("chk-6", t.chk6); safeSetText("form-btn", t.formBtn);
    
    // Page Ordinateur
    safeSetText("page-ord-title", t.pageOrdTitle); safeSetText("page-ord-desc", t.pageOrdDesc); safeSetText("page-ord-cta", t.pageOrdCta);
    safeSetText("ord-detail-title", t["ord-detail-title"]); safeSetText("ord-detail-text", t["ord-detail-text"]);
    safeSetText("ord-feat-1-title", t["ord-feat-1-title"]); safeSetText("ord-feat-1-desc", t["ord-feat-1-desc"]);
    safeSetText("ord-feat-2-title", t["ord-feat-2-title"]); safeSetText("ord-feat-2-desc", t["ord-feat-2-desc"]);
    safeSetText("ord-feat-3-title", t["ord-feat-3-title"]); safeSetText("ord-feat-3-desc", t["ord-feat-3-desc"]);
    safeSetText("ord-action-title", t["ord-action-title"]);

    // Page Tablette
    safeSetText("page-tab-title", t.pageTabTitle); safeSetText("page-tab-desc", t.pageTabDesc); safeSetText("page-tab-cta", t.pageTabCta);
    safeSetText("tab-detail-title", t["tab-detail-title"]); safeSetText("tab-detail-text", t["tab-detail-text"]);
    safeSetText("tab-feat-1-title", t["tab-feat-1-title"]); safeSetText("tab-feat-1-desc", t["tab-feat-1-desc"]);
    safeSetText("tab-feat-2-title", t["tab-feat-2-title"]); safeSetText("tab-feat-2-desc", t["tab-feat-2-desc"]);
    safeSetText("tab-feat-3-title", t["tab-feat-3-title"]); safeSetText("tab-feat-3-desc", t["tab-feat-3-desc"]);
    safeSetText("tab-action-title", t["tab-action-title"]);

    // Page TV
    safeSetText("page-tv-title", t.pageTvTitle); safeSetText("page-tv-desc", t.pageTvDesc); safeSetText("page-tv-cta", t.pageTvCta);
    safeSetText("tv-detail-title", t["tv-detail-title"]); safeSetText("tv-detail-text", t["tv-detail-text"]);
    safeSetText("tv-feat-1-title", t["tv-feat-1-title"]); safeSetText("tv-feat-1-desc", t["tv-feat-1-desc"]);
    safeSetText("tv-feat-2-title", t["tv-feat-2-title"]); safeSetText("tv-feat-2-desc", t["tv-feat-2-desc"]);
    safeSetText("tv-feat-3-title", t["tv-feat-3-title"]); safeSetText("tv-feat-3-desc", t["tv-feat-3-desc"]);
    safeSetText("tv-action-title", t["tv-action-title"]);

    // Page Réseau
    safeSetText("page-res-title", t.pageResTitle); safeSetText("page-res-desc", t.pageResDesc); safeSetText("page-res-cta", t.pageResCta);
    safeSetText("res-detail-title", t["res-detail-title"]); safeSetText("res-detail-text", t["res-detail-text"]);
    safeSetText("res-feat-1-title", t["res-feat-1-title"]); safeSetText("res-feat-1-desc", t["res-feat-1-desc"]);
    safeSetText("res-feat-2-title", t["res-feat-2-title"]); safeSetText("res-feat-2-desc", t["res-feat-2-desc"]);
    safeSetText("res-feat-3-title", t["res-feat-3-title"]); safeSetText("res-feat-3-desc", t["res-feat-3-desc"]);
    safeSetText("res-action-title", t["res-action-title"]);

    // Page Audio
    safeSetText("page-aud-title", t.pageAudTitle); safeSetText("page-aud-desc", t.pageAudDesc); safeSetText("page-aud-cta", t.pageAudCta);
    safeSetText("aud-detail-title", t["aud-detail-title"]); safeSetText("aud-detail-text", t["aud-detail-text"]);
    safeSetText("aud-feat-1-title", t["aud-feat-1-title"]); safeSetText("aud-feat-1-desc", t["aud-feat-1-desc"]);
    safeSetText("aud-feat-2-title", t["aud-feat-2-title"]); safeSetText("aud-feat-2-desc", t["aud-feat-2-desc"]);
    safeSetText("aud-feat-3-title", t["aud-feat-3-title"]); safeSetText("aud-feat-3-desc", t["aud-feat-3-desc"]);
    safeSetText("aud-action-title", t["aud-action-title"]);

    // Bouton de langue
    const langBtns = document.querySelectorAll(".lang-btn");
    langBtns.forEach(btn => btn.innerText = t.langBtn);
    document.documentElement.lang = currentLang;
}

function toggleLang() {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    
    // On sauvegarde la mémoire si possible, ET on met à jour l'URL affichée sans recharger la page
    localStorage.setItem('siteLang', currentLang);
    let newUrl = new URL(window.location.href);
    newUrl.searchParams.set('lang', currentLang);
    window.history.replaceState({}, '', newUrl);
    
    applyTranslations();
}

// --- 5. INITIALISATION AU CHARGEMENT DE LA PAGE ---
window.addEventListener('DOMContentLoaded', (event) => {
    
    applyTranslations();
    
    // Logique des menus déroulants
    const deviceSelect = document.getElementById('form-service');
    const modelSelect = document.getElementById('form-model');
    const brands = {
        "Ordinateur / Mac": ["Apple (Macbook/iMac)", "Asus", "Dell", "HP", "Lenovo", "Acer", "MSI", "Autre"],
        "Tablette / Téléphone": ["Apple (iPhone/iPad)", "Samsung", "Google Pixel", "TCL", "Motorola", "Huawei", "Autre"],
        "Télévision / Diffusion": ["Samsung", "LG", "Sony", "Hisense", "TCL", "Roku TV", "Fire TV", "Autre"],
        "Réseau / Wi-Fi": ["Borne fournisseur (Bell/Videotron)", "TP-Link", "ASUS", "Netgear", "Linksys", "Google Home", "Autre"],
        "Audio": ["Sonos", "Bose", "Sony", "JBL", "Samsung", "Denon", "Autre"]
    };

    if (deviceSelect) {
        deviceSelect.addEventListener('change', function() {
            const selectedDevice = this.value;
            const options = brands[selectedDevice] || [];
            modelSelect.innerHTML = `<option value="" disabled selected>${currentLang === 'fr' ? '-- Sélectionnez la marque --' : '-- Select Brand --'}</option>`;
            
            options.forEach(brand => {
                const el = document.createElement('option');
                el.value = brand;
                el.textContent = brand;
                modelSelect.appendChild(el);
            });
        });
    }

    // Sélection automatique depuis une autre page
    if (urlParams.get('service') && deviceSelect) {
        deviceSelect.value = urlParams.get('service');
        deviceSelect.dispatchEvent(new Event('change'));
        setTimeout(() => {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            deviceSelect.style.boxShadow = "0 0 0 4px rgba(0, 240, 255, 0.4)";
            setTimeout(() => { deviceSelect.style.boxShadow = "none"; }, 1500);
        }, 500);
    }
    
    // Formulaire Web3Forms
    const form = document.getElementById('wf-form');
    const result = document.getElementById('result');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);
            result.innerHTML = currentLang === 'fr' ? "Envoi en cours..." : "Sending...";

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    result.style.color = "#00f0ff";
                    result.innerHTML = currentLang === 'fr' ? "✅ Message envoyé avec succès !" : "✅ Message sent successfully!";
                    form.reset();
                    if(modelSelect) modelSelect.innerHTML = `<option value="" id="opt-model-default">-- Marque / Modèle --</option>`;
                } else {
                    result.innerHTML = json.message;
                }
            })
            .catch(error => {
                result.innerHTML = currentLang === 'fr' ? "Une erreur est survenue." : "An error occurred.";
            })
            .then(function() {
                setTimeout(() => { result.innerHTML = ""; }, 5000);
            });
        });
    }
});
