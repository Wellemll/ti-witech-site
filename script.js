// --- 1. GESTION DES MARQUES / MODÈLES ---
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

// --- 2. ENVOI DU FORMULAIRE (WEB3FORMS) ---
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
                modelSelect.innerHTML = `<option value="" id="opt-model-default">-- Marque / Modèle --</option>`;
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

// --- 3. AUTO-SÉLECTION DEPUIS UNE AUTRE PAGE ---
// Si l'URL contient "?service=Ordinateur", on sélectionne la bonne option automatiquement
window.addEventListener('DOMContentLoaded', (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    
    if (serviceParam && deviceSelect) {
        deviceSelect.value = serviceParam;
        deviceSelect.dispatchEvent(new Event('change')); // Charge les modèles
        setTimeout(() => {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            deviceSelect.style.boxShadow = "0 0 0 4px rgba(0, 240, 255, 0.4)";
            setTimeout(() => { deviceSelect.style.boxShadow = "none"; }, 1500);
        }, 500);
    }
});

// --- 4. SYSTÈME DE TRADUCTION MULTIPAGE ---
let currentLang = 'fr';

const translations = {
    fr: {
        navServices: "Services", navAbout: "À propos", navGalerie: "En action", navContact: "Contact", langBtn: "EN",
        footerText: "© 2026 TI-WiTech | ", footerFb: "Suivez-nous sur Facebook",
        
        // --- Page Accueil ---
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
        chkTitle: "Quel est le problème principal ?", 
        chk1: "Lenteur ou Gel", chk2: "Virus ou Pop-ups", chk3: "Problème Wi-Fi", chk4: "Installation / Config", chk5: "Bris matériel", chk6: "Autre",
        formBtn: "ENVOYER LA DEMANDE",
        
        // --- Page Service Ordinateur ---
        pageOrdTitle: "SERVICE: ORDINATEURS & MAC",
        pageOrdDesc: "Diagnostic, réparation matérielle, suppression de virus, et optimisation de vitesse pour vos appareils Windows et Apple.",
        pageOrdCta: "RÉSERVER POUR MON ORDINATEUR",
        
        // --- Page Service Tablette ---
        pageTabTitle: "SERVICE: TABLETTES & TÉLÉPHONES",
        pageTabDesc: "Configuration de vos courriels, transfert de données, et assistance générale pour vos appareils mobiles iOS et Android.",
        pageTabCta: "RÉSERVER POUR MA TABLETTE/TÉLÉPHONE"
    },
    en: {
        navServices: "Services", navAbout: "About Us", navGalerie: "In Action", navContact: "Contact", langBtn: "FR",
        footerText: "© 2026 TI-WiTech | ", footerFb: "Follow us on Facebook",
        
        // --- Home Page ---
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
        chkTitle: "What is the main issue?", 
        chk1: "Slow or Freezing", chk2: "Virus or Pop-ups", chk3: "Wi-Fi issue", chk4: "Setup / Config", chk5: "Hardware damage", chk6: "Other",
        formBtn: "SEND REQUEST",
        
        // --- Computer Service Page ---
        pageOrdTitle: "SERVICE: COMPUTERS & MAC",
        pageOrdDesc: "Diagnostics, hardware repair, virus removal, and speed optimization for your Windows and Apple devices.",
        pageOrdCta: "BOOK FOR MY COMPUTER",
        
        // --- Tablet Service Page ---
        pageTabTitle: "SERVICE: TABLETS & PHONES",
        pageTabDesc: "Email setup, data transfer, and general support for your iOS and Android mobile devices.",
        pageTabCta: "BOOK FOR MY TABLET/PHONE"
    }
};

// Fonction sécurisée pour mettre à jour le texte sans causer d'erreur si l'élément n'existe pas sur la page actuelle
function safeSetText(id, text, isPlaceholder = false) {
    const el = document.getElementById(id);
    if (el) {
        if (isPlaceholder) el.placeholder = text;
        else el.innerHTML = text;
    }
}

function toggleLang() {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    const t = translations[currentLang];
    
    // Éléments Communs (Menu & Footer)
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
    
    // Pages de services
    safeSetText("page-ord-title", t.pageOrdTitle); safeSetText("page-ord-desc", t.pageOrdDesc); safeSetText("page-ord-cta", t.pageOrdCta);
    safeSetText("page-tab-title", t.pageTabTitle); safeSetText("page-tab-desc", t.pageTabDesc); safeSetText("page-tab-cta", t.pageTabCta);

    // Bouton de langue
    const langBtns = document.querySelectorAll(".lang-btn");
    langBtns.forEach(btn => btn.innerText = t.langBtn);
    document.documentElement.lang = currentLang;
}