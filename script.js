document.addEventListener('DOMContentLoaded', () => {
    //pour le menu
    const men = document.querySelector(".hamburger");
    const menu = document.querySelector(".menu");
    men.addEventListener("click", () => {
        menu.classList.toggle("active"); // menu sort
        men.classList.toggle("active"); // croix
    });
    // Clic sur un lien pour Fermer le menu
    document.querySelectorAll('.menu,section').forEach(link => {
        link.addEventListener('click', () => {
            men.classList.remove('active');
            menu.classList.remove('active');
        });
    });
    //bouton mode sombre
    const theme = document.getElementById('themeBtn');
    const body = document.body;


    theme.addEventListener('click', () => {
        body.classList.toggle('dark');
        if (body.classList.contains('dark')) {
            theme.innerHTML = '☀️';
        } else {
            theme.innerHTML = '&#127769';
        }
    });
    // pour les services
    const btservices = document.getElementById('btservices');
    const services = document.getElementById('services');
    
    btservices.addEventListener('click', () => {
        services.style.display = (services.style.display === 'none') ? 'block':'none';
        btservices.innerHTML = (services.style.display === 'none') ? '<i class="fas fa-arrow-down"></i> Voir tous nos services' : '<i class="fas fa-arrow-up"></i> Masquer les services';
    });

        // pour les accessoires
    const btaccessoires = document.getElementById('btaccessoires');
    const accessoires = document.getElementById('accessoires');

    btaccessoires.addEventListener('click', () => {
        accessoires.style.display = (accessoires.style.display === 'none') ? 'block':'none';
        btaccessoires.innerHTML = (accessoires.style.display === 'none') ? '<i class="fas fa-arrow-down"></i> Voir tous nos accessoires' : '<i class="fas fa-arrow-up"></i> Masquer les accessoires';
    });

    // pour le bouton retour du clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
            services.style.display = 'none';
            accessoires.style.display = 'none';
            btservices.innerHTML ='<i class="fas fa-arrow-down"></i> Voir tous nos services';
            btaccessoires.innerHTML ='<i class="fas fa-arrow-down"></i> Voir tous nos accessoires';
        }
    });

    // pour le bouton retour du phone
    document.addEventListener('backbutton', (e) => {
        e.preventDefault();
        services.style.display = 'none';
        accessoires.style.display = 'none';
        btservices.innerHTML ='<i class="fas fa-arrow-down"></i> Voir tous nos services';
        btaccessoires.innerHTML ='<i class="fas fa-arrow-down"></i> Voir tous nos accessoires';        
    });
   
    // pour la localisation
    const localisation = document.getElementById('localisation');
    const localiser = document.getElementById('localiser');
    
    // pour afficher la localisation
    localiser.addEventListener('click', () => {
        localisation.style.display = (localisation.style.display === 'none') ? 'block':'none';
        localiser.innerHTML = (localisation.style.display === 'none') ? '<i class="fas fa-map"></i> Voir la carte' : '<i class="fas fa-times"></i> Masquer';
    });



    // ========== ENVOI SUR WHATSAPP ==========
    const sendBtn = document.getElementById('send');
    const messageInput = document.getElementById('message-send');

    if (sendBtn && messageInput) {
        sendBtn.addEventListener('click', () => {
            const message = messageInput.value.trim();

            if (message === '') {
                alert('✏️ Veuillez écrire votre message avant d\'envoyer.');
            } else {
                const phoneNumber = '22996707286';

                // Message formaté
                const now = new Date();
                const dateTime = now.toLocaleString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });

                const formattedMessage = `📱 *NOUVEAU CLIENT MOBIFIX* 📱\n\n📅 Date : ${dateTime}\n\n💬 Message :\n"${message}"\n\n---\nÀ contacter rapidement`;

                // Encodage pour URL
                const encodedMessage = encodeURIComponent(formattedMessage);

                // Lien WhatsApp
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

                // Ouverture dans un nouvel onglet
                window.open(whatsappUrl, '_blank');

                // Vider le champ et confirmer
                messageInput.value = '';
                alert('✅ Redirection vers WhatsApp... Envoyez le message !');
            }
        });
    }
    // ========== SYSTÈME D'AVIS ==========
    // ========== SYSTÈME D'AVIS CLIENTS (CORRIGÉ) ==========

    // Avis par défaut (si aucun dans localStorage)
    const avisParDefaut = [{
            nom: "Jean Kouassi",
            note: 5,
            message: "Très satisfait ! Mon écran a été changé en moins d'une heure. Je recommande vivement !",
            date: "15/04/2026"
        },
        {
            nom: "Marie Adjovi",
            note: 5,
            message: "Professionnel et rapide. Mon téléphone fonctionne comme neuf. Merci !",
            date: "10/04/2026"
        },
        {
            nom: "Paul Dossou",
            note: 4,
            message: "Bon service, prix correct. Je reviendrai pour d'autres réparations.",
            date: "05/04/2026"
        },
        {
            nom: "Sophie Amoussou",
            note: 4,
            message: "Équipe très compétente et sympathique. Ils m'ont aidé à récupérer toutes mes données !",
            date: "01/04/2026"
        }
    ];

    // Récupérer ou initialiser les avis
    let avisList = [];

    function chargerAvis() {
        try {
            const avisStockes = localStorage.getItem('mobifix_avis');
            if (avisStockes && JSON.parse(avisStockes).length > 0) {
                avisList = JSON.parse(avisStockes);
            } else {
                avisList = [...avisParDefaut];
                sauvegarderAvis();
            }
        } catch (e) {
            console.error("Erreur chargement avis:", e);
            avisList = [...avisParDefaut];
            sauvegarderAvis();
        }
    }

    function sauvegarderAvis() {
        localStorage.setItem('mobifix_avis', JSON.stringify(avisList));
    }

    function afficherAvis() {
        const avisContainer = document.getElementById('avisList');
        if (!avisContainer) {
            console.error("Conteneur avisList non trouvé !");
            return;
        }

        if (avisList.length === 0) {
            avisContainer.innerHTML = '<p style="text-align:center;">⭐ Aucun avis pour le moment. Soyez le premier à donner votre avis !</p>';
            return;
        }

        avisContainer.innerHTML = '';
        avisList.forEach(avis => {
            const etoiles = '★'.repeat(avis.note) + '☆'.repeat(5 - avis.note);
            const avisCard = document.createElement('div');
            avisCard.className = 'avis-card';
            avisCard.innerHTML = `
            <div class="avis-etoiles">${etoiles}</div>
            <div class="avis-texte">"${escapeHtml(avis.message)}"</div>
            <div class="avis-auteur">${escapeHtml(avis.nom)}</div>
            <div class="avis-date">📅 ${avis.date}</div>
        `;
            avisContainer.appendChild(avisCard);
        });
    }

    // Fonction pour sécuriser le texte (éviter les injections XSS)
    function escapeHtml(text) {
        if (!text) return '';
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // Initialisation des avis au chargement de la page
    chargerAvis();
    afficherAvis();

    // Gestion des étoiles pour le formulaire
    const etoilesSpans = document.querySelectorAll('.etoiles-select span');
    let selectedNote = 5;

    if (etoilesSpans.length > 0) {
        etoilesSpans.forEach(span => {
            span.addEventListener('click', () => {
                const note = parseInt(span.getAttribute('data-note'));
                selectedNote = note;
                etoilesSpans.forEach((s, index) => {
                    if (index < note) {
                        s.innerHTML = '★';
                        s.classList.add('active');
                    } else {
                        s.innerHTML = '☆';
                        s.classList.remove('active');
                    }
                });
                document.getElementById('avisNote').value = note;
            });
        });
    }

    // Ajouter un avis
    function ajouterAvis() {
        const nomInput = document.getElementById('avisNom');
        const messageInput = document.getElementById('avisMessage');

        const nom = nomInput ? nomInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';
        const note = selectedNote;

        if (nom === '') {
            alert('📝 Veuillez entrer votre nom.');
            return;
        }
        if (message === '') {
            alert('📝 Veuillez écrire votre avis.');
            return;
        }

        const now = new Date();
        const date = now.toLocaleDateString('fr-FR');

        const nouvelAvis = {
            nom: nom,
            note: note,
            message: message,
            date: date
        };

        avisList.unshift(nouvelAvis);
        sauvegarderAvis();
        afficherAvis();

        // Vider le formulaire
        if (nomInput) nomInput.value = '';
        if (messageInput) messageInput.value = '';

        // Réinitialiser les étoiles à 5
        selectedNote = 5;
        etoilesSpans.forEach((s, index) => {
            if (index < 5) {
                s.innerHTML = '★';
                s.classList.add('active');
            } else {
                s.innerHTML = '☆';
                s.classList.remove('active');
            }
        });

        alert('✅ Merci pour votre avis ! Il a été publié.');
    }

    const submitAvisBtn = document.getElementById('submitAvisBtn');
    if (submitAvisBtn) {
        submitAvisBtn.addEventListener('click', ajouterAvis);
    }

});