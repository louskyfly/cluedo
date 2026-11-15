import type { CaseData, CaseProgress } from '../../types';

export const case1: CaseData = {
  id: 'case1',
  title: 'Le Laboratoire Disparu',
  illustration: '🧪',
  description: "Un scientifique disparaît d'un laboratoire de recherche retrouvé verrouillé. Des documents manquent et des objets ont été déplacés.",
  difficulty: 'Moyenne',
  duration: '45-60 min',
  intro: "Nuit du 12 au 13 octobre. Le laboratoire Helix, spécialisé en neurochimie, est retrouvé fermé de l'intérieur au petit matin. Le Dr Émile Vasseur, chercheur principal, est introuvable. La direction vous mandate pour comprendre ce qui s'est réellement passé avant que l'affaire n'ébruite.",
  objectives: [
    { id: 'o_scene', title: 'Sécuriser les lieux', hint: 'Commencez par le hall d’entrée et le bureau du scientifique.', check: (p: CaseProgress) => p.visitedLocations.includes('hall') && p.visitedLocations.includes('bureau') },
    { id: 'o_first', title: 'Relever les premiers indices', hint: 'Examinez les objets du bureau et du hall : badges, calendrier, photo, ordinateur, courrier.', check: (p: CaseProgress) => p.discoveredClues.length >= 5 },
    { id: 'o_staff', title: 'Interroger les témoins', hint: 'Le personnel de nuit en sait plus qu’il ne le dit. Interrogez au moins trois personnes.', check: (p: CaseProgress) => p.interviewed.length >= 3 },
    { id: 'o_archives', title: 'Accéder aux archives', hint: 'La porte de service du laboratoire mène aux archives. Cherchez la note cachée.', check: (p: CaseProgress) => p.visitedLocations.includes('archives') && p.discoveredClues.includes('c_hidden_note') },
    { id: 'o_chrono', title: 'Reconstituer la chronologie', hint: 'Replacez les neuf événements dans l’ordre, du premier au dernier, dans l’onglet Chronologie.', check: (p: CaseProgress) => p.timelineOrder.join(',') === 't1,t2,t3,t4,t5,t6,t7,t8,t9' },
    { id: 'o_truth', title: 'Confondre le coupable', hint: 'Rendez-vous dans l’onglet Résolution et répondez aux cinq questions.', check: (p: CaseProgress) => p.resolved },
  ],
  locations: [
    {
      id: 'hall', name: "Hall d'entrée", illustration: 'hall',
      description: "Un hall vitré, silencieux. Le comptoir de sécurité fait face à la porte principale. Une odeur de désinfectant flotte encore.",
      hotspots: [
        { id: 'h_badge', label: 'Lecteur de badges', x: 62, y: 48, w: 10, h: 14, description: 'Le lecteur clignote vert. L\'historique récent semble accessible.', clueId: 'c_badge' },
        { id: 'h_umbrella', label: 'Parapluie mouillé', x: 18, y: 62, w: 12, h: 18, description: 'Un parapluie noir encore humide dans le porte-parapluies, alors qu\'il n\'a pas plu cette nuit.', clueId: 'c_umbrella' },
        { id: 'h_camera', label: 'Caméra de sécurité', x: 78, y: 18, w: 10, h: 12, description: 'La caméra du hall est orientée légèrement vers le sol.', clueId: 'c_camera' },
        { id: 'h_mail', label: 'Courrier sur le comptoir', x: 40, y: 52, w: 12, h: 10, description: 'Une enveloppe ouverte adressée au Dr Vasseur.', documentId: 'd_mail', clueId: 'c_mail' },
        { id: 'h_door_lab', label: 'Accès couloir laboratoires', x: 48, y: 30, w: 14, h: 18, description: 'Couloir menant aux zones de recherche.' }
      ]
    },
    {
      id: 'bureau', name: 'Bureau du scientifique', illustration: 'bureau',
      description: "Le bureau du Dr Vasseur. Ordonné en apparence, mais certains détails jurent : une chaise renversée, un tiroir entrouvert.",
      hotspots: [
        { id: 'b_chair', label: 'Chaise renversée', x: 46, y: 58, w: 16, h: 18, description: 'La chaise du bureau a été renversée, comme dans une précipitation.', clueId: 'c_chair' },
        { id: 'b_drawer', label: 'Tiroir entrouvert', x: 58, y: 64, w: 12, h: 10, description: 'Le tiroir du bas est vide de ses dossiers bleus, habituellement rangés ici.', clueId: 'c_drawer' },
        { id: 'b_calendar', label: 'Calendrier mural', x: 18, y: 22, w: 14, h: 16, description: 'La date du 13 octobre est entourée en rouge avec la mention "Livraison N.".', clueId: 'c_calendar', documentId: 'd_calendar' },
        { id: 'b_photo', label: 'Photographie encadrée', x: 30, y: 46, w: 10, h: 12, description: 'Photo de l\'équipe Helix. Au dos, une note manuscrite.', clueId: 'c_photo', documentId: 'd_photo_note' },
        { id: 'b_pc', label: 'Ordinateur portable', x: 44, y: 40, w: 14, h: 12, description: 'L\'ordinateur est éteint. Un post-it indique "Sauvegarde coffre 23h".', clueId: 'c_postit' }
      ]
    },
    {
      id: 'info', name: 'Salle informatique', illustration: 'info',
      description: "Racks de serveurs bourdonnant doucement. Les écrans de monitoring affichent les journaux d'accès.",
      hotspots: [
        { id: 'i_logs', label: 'Journaux d\'accès', x: 36, y: 34, w: 18, h: 16, description: 'Les logs montrent des connexions inhabituelles la veille.', clueId: 'c_logs', documentId: 'd_logs' },
        { id: 'i_usb', label: 'Clé USB sous le bureau', x: 52, y: 72, w: 8, h: 8, description: 'Une clé USB noire coincée sous un pied de chaise.', clueId: 'c_usb' },
        { id: 'i_camfeed', label: 'Écran des caméras', x: 64, y: 30, w: 16, h: 18, description: 'L\'enregistrement de 22h à 23h présente une coupure.', clueId: 'c_blackout' },
        { id: 'i_bin', label: 'Corbeille papier', x: 22, y: 70, w: 10, h: 12, description: 'Un brouillon froissé mentionne un transfert de données.', clueId: 'c_draft', documentId: 'd_draft' }
      ]
    },
    {
      id: 'labo', name: 'Laboratoire principal', illustration: 'labo',
      description: "Paillasses immaculées, hottes aspirantes, flacons étiquetés. Une zone semble avoir été réorganisée récemment.",
      hotspots: [
        { id: 'l_glass', label: 'Éclats de verre', x: 28, y: 66, w: 12, h: 10, description: 'Des éclats d\'un bécher brisé, soigneusement poussés contre la paillasse.', clueId: 'c_glass' },
        { id: 'l_vial', label: 'Étagère à échantillons', x: 60, y: 36, w: 16, h: 20, description: 'Un emplacement vide : l\'échantillon NX-17 manque à l\'inventaire affiché.', clueId: 'c_sample' },
        { id: 'l_coat', label: 'Blouse de laboratoire', x: 14, y: 44, w: 12, h: 22, description: 'La blouse de Vasseur porte une tache de café fraîche et un badge visiteur.', clueId: 'c_coat' },
        { id: 'l_door', label: 'Porte de service', x: 82, y: 40, w: 10, h: 28, description: 'La porte de service est verrouillée de l\'extérieur. La serrure a été manipulée récemment.', clueId: 'c_service_door', unlocksLocationId: 'archives' }
      ]
    },
    {
      id: 'archives', name: 'Salle des archives', illustration: 'archives', locked: true, unlockHint: 'Examinez la porte de service du laboratoire.',
      description: "Une pièce froide remplie de classeurs métalliques. L\'air y est sec et poussiéreux.",
      hotspots: [
        { id: 'a_box', label: 'Carton déplacé', x: 34, y: 56, w: 16, h: 16, description: 'Un carton marqué "Projet Némésis" a été déplacé, laissant une trace nette dans la poussière.', clueId: 'c_box' },
        { id: 'a_folder', label: 'Classeur manquant', x: 58, y: 34, w: 14, h: 20, description: 'Un emplacement vide entre deux classeurs : dossier confidentiel NX retiré.', clueId: 'c_folder' },
        { id: 'a_note', label: 'Note cachée', x: 20, y: 38, w: 10, h: 10, description: 'Un papier glissé derrière un classeur.', clueId: 'c_hidden_note', documentId: 'd_hidden' }
      ]
    }
  ],
  clues: [
    { id: 'c_badge', name: 'Historique des badges', description: 'Entrées/sorties : Vasseur badge à 19h02 (entrée). Morel à 21h40. Aucun badge de sortie pour Vasseur. La porte principale a été verrouillée de l\'intérieur à 23h12 via commande manuelle.', locationId: 'hall', category: 'numerique', importance: 3, illustration: '💳', isDocument: true, documentText: '19:02 - E. Vasseur (ENTRÉE)\n20:15 - L. Morel (ENTRÉE)\n21:40 - S. Kader (ENTRÉE)\n22:05 - S. Kader (SORTIE)\n22:30 - L. Morel (SORTIE)\n23:12 - VERROUILLAGE INTERNE (commande poste sécurité)\nAucune sortie enregistrée pour E. Vasseur.' },
    { id: 'c_umbrella', name: 'Parapluie mouillé', description: 'Parapluie trempé alors qu\'aucune pluie n\'est tombée. Il a pu être mouillé ailleurs (douche de sécurité ? évier ?)', locationId: 'hall', category: 'objets', importance: 1, illustration: '☂️' },
    { id: 'c_camera', name: 'Caméra réorientée', description: 'La caméra du hall a été inclinée vers le bas, réduisant le champ de vision de la sortie de service.', locationId: 'hall', category: 'objets', importance: 2, illustration: '📷' },
    { id: 'c_mail', name: 'Courrier menaçant', description: 'Lettre anonyme accusant Vasseur de "vol de propriété intellectuelle" et exigeant la restitution de fichiers avant le 13.', locationId: 'hall', category: 'documents', importance: 2, illustration: '✉️', isDocument: true, documentText: 'Dr Vasseur,\nNous savons pour les copies du Projet Némésis. Rendez les fichiers avant le 13 octobre ou des mesures seront prises.\n— Un ami du laboratoire' },
    { id: 'c_chair', name: 'Chaise renversée', description: 'Signe possible de lutte ou de départ précipité dans le bureau.', locationId: 'bureau', category: 'objets', importance: 2, illustration: '🪑' },
    { id: 'c_drawer', name: 'Tiroir vidé', description: 'Les dossiers bleus (notes personnelles de Vasseur) ont disparu du tiroir habituel.', locationId: 'bureau', category: 'objets', importance: 2, illustration: '🗄️' },
    { id: 'c_calendar', name: 'Calendrier annoté', description: '"Livraison N." prévue le 13 octobre au matin. Vasseur attendait quelque chose ou quelqu\'un.', locationId: 'bureau', category: 'documents', importance: 3, illustration: '📅', isDocument: true, documentText: 'Lundi 13 octobre — 07:00 Livraison N. (quai) — CONFIRMER\nVendredi 10 — RDV avocat (ok)\nNote: "Tout sera prêt."' },
    { id: 'c_photo', name: 'Photo d\'équipe annotée', description: 'Au dos : "Si je ne suis plus là, regarde NX-17 et Morel." écrit de la main de Vasseur.', locationId: 'bureau', category: 'photographies', importance: 3, illustration: '🖼️', isDocument: true, documentText: 'Verso de la photo :\n"Si je ne suis plus là, regarde NX-17 et Morel.\n— E.V."' },
    { id: 'c_postit', name: 'Post-it sauvegarde', description: 'Rappel : "Sauvegarde coffre 23h". Indique une action planifiée tardive.', locationId: 'bureau', category: 'documents', importance: 2, illustration: '📝' },
    { id: 'c_logs', name: 'Journaux serveur', description: 'Transfert massif de données vers une clé externe à 22h47 depuis le compte de Vasseur. Fichiers : Projet Némésis / NX.', locationId: 'info', category: 'numerique', importance: 3, illustration: '💻', isDocument: true, documentText: '22:41 — Connexion compte evasseur\n22:47 — Copie vers volume externe "NOIR-01" (4,2 Go)\n22:53 — Suppression traces locales (partielle)\n22:58 — Déconnexion\n23:05 — Connexion compte lmorel (consultation logs)\n23:09 — Déconnexion lmorel' },
    { id: 'c_usb', name: 'Clé USB "NOIR-01"', description: 'Clé retrouvée sous un bureau en salle info. Étiquette "NOIR-01" correspondant aux logs, mais elle est vide.', locationId: 'info', category: 'objets', importance: 3, illustration: '🔌' },
    { id: 'c_blackout', name: 'Coupure vidéo 22h-23h', description: 'Les caméras internes ont une coupure d\'une heure. Le système signale une "maintenance manuelle" non planifiée.', locationId: 'info', category: 'enregistrements', importance: 3, illustration: '📹' },
    { id: 'c_draft', name: 'Brouillon de transfert', description: 'Note froissée : "Remettre à N. au quai, avant contrôle. L. ne doit rien voir."', locationId: 'info', category: 'documents', importance: 2, illustration: '📄', isDocument: true, documentText: 'Brouillon :\n"Remettre à N. au quai, avant contrôle.\nL. ne doit rien voir. Prévoir sortie service."\n(écriture rapide, probable Vasseur)' },
    { id: 'c_glass', name: 'Bécher brisé déplacé', description: 'Le verre a été poussé contre la paillasse après bris — mise en scène plutôt qu\'accident.', locationId: 'labo', category: 'objets', importance: 2, illustration: '⚗️' },
    { id: 'c_sample', name: 'Échantillon NX-17 manquant', description: 'Flacon NX-17 absent de l\'inventaire. Substance sensible du Projet Némésis.', locationId: 'labo', category: 'objets', importance: 3, illustration: '🧫' },
    { id: 'c_coat', name: 'Blouse avec badge visiteur', description: 'Blouse de Vasseur tachée de café. Un badge visiteur "N. Bernard" est resté dans la poche.', locationId: 'labo', category: 'objets', importance: 3, illustration: '🥼', isDocument: true, documentText: 'Badge visiteur temporaire :\nNom : N. Bernard\nEntreprise : TransLog\nDate : 12 octobre\nAccès : Quai / Hall' },
    { id: 'c_service_door', name: 'Serrure porte de service', description: 'Verrouillée de l\'extérieur mais rayures fraîches côté intérieur : quelqu\'un est sorti puis a fait verrouiller/condamner depuis dehors.', locationId: 'labo', category: 'objets', importance: 3, illustration: '🚪' },
    { id: 'c_box', name: 'Carton Projet Némésis', description: 'Carton déplacé récemment dans les archives. Contenait des copies papier, désormais manquantes.', locationId: 'archives', category: 'objets', importance: 2, illustration: '📦' },
    { id: 'c_folder', name: 'Dossier NX retiré', description: 'Emplacement vide : le dossier confidentiel NX a été retiré peu avant la disparition.', locationId: 'archives', category: 'documents', importance: 2, illustration: '📁' },
    { id: 'c_hidden_note', name: 'Note cachée de Vasseur', description: 'Message laissé intentionnellement : Vasseur craignait pour sa sécurité et prévoyait de partir avec des preuves.', locationId: 'archives', category: 'documents', importance: 3, illustration: '🗒️', isDocument: true, documentText: 'Si vous lisez ceci, c\'est que je n\'ai pas pu parler librement.\nMorel vend des données NX à l\'extérieur. J\'ai rassemblé les preuves (clé + échantillon) et je les remets à N. Bernard demain matin au quai.\nJe quitte Helix par la porte de service après 23h. Ne faites confiance à personne ici.\n— Émile Vasseur, 12 oct.' }
  ],
  characters: [
    {
      id: 'morel', name: 'Dr Léa Morel', role: 'Chercheuse associée', portrait: '👩‍🔬',
      bio: 'Collaboratrice de Vasseur sur le Projet Némésis. Ambitieuse, relation tendue récente avec Vasseur.',
      knowledge: ['Conflit sur NX-17', 'Était au labo tard'],
      startNodeId: 'start',
      nodes: {
        start: { id: 'start', text: "Léa Morel semble nerveuse. \"Je… je ne comprends pas. Émile était encore là quand je suis partie.\"", options: [
          { id: 'm1', label: 'Où étiez-vous hier soir ?', response: "\"En salle info jusqu'à 22h30 pour finir un rapport. Je suis sortie par le hall, mon badge le prouve.\"" },
          { id: 'm2', label: 'Votre relation avec Vasseur ?', response: "\"Professionnelle. Nous avions des désaccords scientifiques, rien de plus.\"", nextNodeId: 'tension' },
          { id: 'm3', label: 'Que savez-vous du Projet Némésis ?', response: "\"Un projet sensible. Émile en était très protecteur ces derniers temps.\"", nextNodeId: 'nemesis' },
          { id: 'm4', label: 'Présenter la note au dos de la photo', requiresClueIds: ['c_photo'], response: "Elle pâlit. \"C'est… absurde. Émile paranoïait. Je n'ai jamais vendu quoi que ce soit !\"", grantsClueIds: [], setsFlags: ['contradiction_morel_photo'], contradiction: 'morel_accused' },
          { id: 'm5', label: 'Présenter les logs serveur', requiresClueIds: ['c_logs'], response: "\"Je… j'ai consulté les logs à 23h05 parce que j'ai vu une alerte de transfert. Je n'ai rien touché, je le jure.\"", setsFlags: ['morel_logs_seen'] },
          { id: 'm_end', label: 'Terminer l\'entretien', response: "\"J'espère que vous le retrouverez vite.\"" }
        ]},
        tension: { id: 'tension', text: "\"Il me tenait à l'écart depuis deux semaines. Comme s'il ne me faisait plus confiance.\"", options: [
          { id: 'm2a', label: 'Pourquoi selon vous ?', response: "\"Je l'ignore. Il travaillait seul la nuit, c'était inhabituel.\"" },
          { id: 'm2b', label: 'Revenir', response: "Elle hoche la tête.", nextNodeId: 'start' }
        ]},
        nemesis: { id: 'nemesis', text: "\"NX-17 est un composé instable. Seuls Émile et moi y avions accès.\"", options: [
          { id: 'm3a', label: 'L\'échantillon a disparu', requiresClueIds: ['c_sample'], response: "\"Quoi ? Disparu ? Émile devait le sécuriser… à moins qu'il ne l'ait déplacé lui-même.\"", setsFlags: ['morel_knows_sample'] },
          { id: 'm3b', label: 'Revenir', response: "D'accord.", nextNodeId: 'start' }
        ]}
      }
    },
    {
      id: 'kader', name: 'Sami Kader', role: 'Agent de sécurité', portrait: '👮',
      bio: 'En poste au hall depuis 4 ans. A effectué la ronde du soir. Calme et méticuleux.',
      knowledge: ['Ronde de sécurité', 'Verrouillage'],
      startNodeId: 'start',
      nodes: {
        start: { id: 'start', text: "Sami Kader consulte ses notes. \"J'ai fait ma ronde comme d'habitude. Rien d'anormal… enfin, presque.\"", options: [
          { id: 'k1', label: 'Décrivez votre soirée', response: "\"Arrivé à 21h40. Ronde à 22h. Dr Morel est partie vers 22h30. J'ai quitté le poste à 22h05 après avoir passé le relais automatique — mais le verrouillage interne de 23h12, ce n'est pas moi.\"", setsFlags: ['kader_not_locker'] },
          { id: 'k2', label: 'Qui pouvait verrouiller de l\'intérieur ?', response: "\"N'importe qui connaissant le code du poste. Vasseur l'avait. Morel aussi, je crois.\"", nextNodeId: 'lock' },
          { id: 'k3', label: 'Parler de la caméra réorientée', requiresClueIds: ['c_camera'], response: "\"Réorientée ? Elle était normale à 22h, j'en suis sûr. Quelqu'un l'a touchée après ma ronde.\"", setsFlags: ['camera_after_22'] },
          { id: 'k4', label: 'Parler de la coupure vidéo', requiresClueIds: ['c_blackout'], response: "\"Une maintenance manuelle ? Impossible sans mon accord ou celui de la direction. Ça a été forcé depuis la salle info.\"" },
          { id: 'k_end', label: 'Terminer', response: "\"Je reste disponible.\"" }
        ]},
        lock: { id: 'lock', text: "\"Le verrouillage interne est une procédure d'urgence. On ne l'utilise presque jamais.\"", options: [
          { id: 'k2a', label: 'Et la porte de service ?', response: "\"Elle ne se verrouille que de l'extérieur avec la clé maître. Si elle est fermée, c'est que quelqu'un l'a fait depuis le quai.\"", setsFlags: ['service_outside'] },
          { id: 'k2b', label: 'Revenir', response: "Bien.", nextNodeId: 'start' }
        ]}
      }
    },
    {
      id: 'renaud', name: 'Claire Renaud', role: 'Directrice du site', portrait: '👩‍💼',
      bio: 'Directrice administrative d\'Helix. Soucieuse de la réputation du laboratoire. Arrivée sur place au matin.',
      knowledge: ['Pression externe', 'Projet Némésis'],
      startNodeId: 'start',
      nodes: {
        start: { id: 'start', text: "Claire Renaud croise les bras. \"Je veux que cette affaire soit résolue discrètement. Le conseil d'administration est déjà nerveux.\"", options: [
          { id: 'r1', label: 'Vasseur avait-il des ennemis ?', response: "\"Émile se plaignait de pressions, oui. Il parlait de 'fuites' mais refusait de me donner des noms.\"" },
          { id: 'r2', label: 'Parler du courrier menaçant', requiresClueIds: ['c_mail'], response: "\"Mon dieu… il ne m'en a jamais parlé. Cela ressemble à un conflit interne.\"", setsFlags: ['renaud_mail'] },
          { id: 'r3', label: 'Qui est N. Bernard ?', requiresClueIds: ['c_coat'], response: "\"N. Bernard ? Un coursier de TransLog, je crois. Nous attendions une livraison de matériel sensible cette semaine… Attendez, le calendrier mentionnait une livraison ?\"", setsFlags: ['bernard_courier'] },
          { id: 'r4', label: 'Parler du dossier NX retiré', requiresClueIds: ['c_folder'], response: "\"Si le dossier NX a disparu, c'est extrêmement grave. Seuls Vasseur et Morel avaient l'autorisation.\"" },
          { id: 'r_end', label: 'Terminer', response: "\"Tenez-moi informée.\"" }
        ]}
      }
    },
    {
      id: 'benoit', name: 'Marc Benoit', role: 'Technicien de maintenance', portrait: '🧑‍🔧',
      bio: 'Intervient sur les systèmes techniques. A accès à la salle informatique. Pragmatique.',
      knowledge: ['Systèmes', 'Maintenance'],
      startNodeId: 'start',
      nodes: {
        start: { id: 'start', text: "Marc Benoit s'essuie les mains. \"On m'a appelé ce matin pour la panne des caméras. Mais cette coupure, c'est pas une panne.\"", options: [
          { id: 'b1', label: 'Que s\'est-il passé avec les caméras ?', response: "\"Quelqu'un avec un accès admin a lancé un mode maintenance à 22h00 pile. Ça coupe l'enregistrement sans alarme sonore.\"", setsFlags: ['maintenance_manual'] },
          { id: 'b2', label: 'Qui a un accès admin ?', response: "\"Moi, la direction… et Vasseur avait un accès technique depuis le mois dernier pour ses expériences.\"" },
          { id: 'b3', label: 'Parler du parapluie mouillé', requiresClueIds: ['c_umbrella'], response: "\"Mouillé ? La douche de décontamination du labo fuit parfois, on met un seau. Mais hier soir elle n'était pas signalée… Bizarre.\"", setsFlags: ['umbrella_bizarre'] },
          { id: 'b4', label: 'Présenter la clé USB vide', requiresClueIds: ['c_usb'], response: "\"Vide ? Si les logs disent 'NOIR-01', alors soit les données ont été copiées ailleurs après, soit c'est un leurre. Malin.\"" },
          { id: 'b_end', label: 'Terminer', response: "\"Si vous avez besoin d'accès technique, appelez-moi.\"" }
        ]}
      }
    }
  ],
  timeline: [
    { id: 't1', time: '19:02', label: 'Arrivée de Vasseur', details: 'Le Dr Vasseur entre dans le laboratoire (badge).', correctIndex: 0 },
    { id: 't2', time: '20:15', label: 'Arrivée de Morel', details: 'Léa Morel arrive pour terminer un rapport.', correctIndex: 1 },
    { id: 't3', time: '21:40', label: 'Arrivée de Kader', details: 'L\'agent de sécurité Sami Kader prend son poste.', correctIndex: 2 },
    { id: 't4', time: '22:00', label: 'Coupure des caméras', details: 'Mode maintenance manuel : les caméras internes cessent d\'enregistrer.', correctIndex: 3 },
    { id: 't5', time: '22:30', label: 'Départ de Morel', details: 'Morel quitte le site par le hall (badge).', correctIndex: 4 },
    { id: 't6', time: '22:47', label: 'Transfert de données', details: 'Copie massive des fichiers Némésis/NX vers un volume externe.', correctIndex: 5 },
    { id: 't7', time: '23:05', label: 'Consultation des logs par Morel', details: 'Connexion à distance/locale du compte Morel pour consulter les logs.', correctIndex: 6 },
    { id: 't8', time: '23:12', label: 'Verrouillage interne', details: 'La porte principale est verrouillée depuis l\'intérieur.', correctIndex: 7 },
    { id: 't9', time: '23:20', label: 'Sortie par la porte de service', details: 'Vasseur quitte les lieux par la porte de service (quai) avec preuves et échantillon, pour rejoindre N. Bernard.', correctIndex: 8 }
  ],
  solution: {
    summary: "Le Dr Vasseur a orchestré sa propre disparition pour fuir avec des preuves contre Léa Morel, qu'il soupçonnait de vendre des données du Projet Némésis.",
    culpritIds: ['morel'],
    whatHappened: "Convaincu que Léa Morel divulguait les recherches NX, Vasseur a préparé sa fuite : il a copié les preuves, pris l'échantillon NX-17, coupé les caméras, simulé une scène de désordre, puis quitté le labo par la porte de service vers 23h20 pour remettre les éléments à un coursier (N. Bernard) et se mettre à l'abri. La note cachée et la photo annotée révèlent ses intentions.",
    keyClueIds: ['c_hidden_note', 'c_photo', 'c_logs', 'c_blackout', 'c_service_door', 'c_coat', 'c_badge'],
    correctTimelineOrder: ['t1','t2','t3','t4','t5','t6','t7','t8','t9'],
    questions: [
      {
        id: 'q1', prompt: 'Que s\'est-il réellement passé ?',
        options: [
          { id: 'a', text: 'Vasseur a été enlevé par un intrus entré par la porte de service.' },
          { id: 'b', text: 'Vasseur a organisé sa propre disparition pour fuir avec des preuves.' },
          { id: 'c', text: 'Une expérience a mal tourné et Vasseur a fui paniqué sans rien emporter.' }
        ],
        correctOptionId: 'b',
        explanation: 'La note cachée, la copie des données, la livraison prévue et la sortie par la porte de service montrent une disparition planifiée.'
      },
      {
        id: 'q2', prompt: 'Qui est principalement mis en cause par les preuves rassemblées par Vasseur ?',
        options: [
          { id: 'a', text: 'Sami Kader, l\'agent de sécurité.' },
          { id: 'b', text: 'Claire Renaud, la directrice.' },
          { id: 'c', text: 'Léa Morel, soupçonnée de fuite de données.' }
        ],
        correctOptionId: 'c',
        explanation: 'La photo annotée et la note cachée accusent explicitement Morel de vendre des données NX.'
      },
      {
        id: 'q3', prompt: 'Quel élément prouve que Vasseur est probablement sorti vivant par la porte de service ?',
        options: [
          { id: 'a', text: 'La chaise renversée dans le bureau.' },
          { id: 'b', text: 'Les rayures/usage de la serrure côté intérieur et le badge visiteur de N. Bernard.' },
          { id: 'c', text: 'Le parapluie mouillé dans le hall.' }
        ],
        correctOptionId: 'b',
        explanation: 'La porte de service manipulée et le rendez-vous "Livraison N." avec N. Bernard indiquent une sortie organisée vers le quai.'
      },
      {
        id: 'q4', prompt: 'Quelle est la preuve numérique clé de la préparation de la fuite ?',
        options: [
          { id: 'a', text: 'Le courrier anonyme sur le comptoir.' },
          { id: 'b', text: 'Les journaux serveur montrant un transfert massif vers "NOIR-01" à 22h47.' },
          { id: 'c', text: 'La photographie d\'équipe.' }
        ],
        correctOptionId: 'b',
        explanation: 'Les logs montrent la copie planifiée des fichiers sensibles juste avant la disparition.'
      },
      {
        id: 'q5', prompt: 'Quelle chronologie est correcte ?',
        options: [
          { id: 'a', text: 'Coupure caméras → Transfert données → Départ Morel → Verrouillage interne → Sortie service.' },
          { id: 'b', text: 'Départ Morel → Coupure caméras → Transfert données → Verrouillage interne → Sortie service.' },
          { id: 'c', text: 'Coupure caméras → Départ Morel → Transfert données → Consultation logs Morel → Verrouillage interne → Sortie service.' }
        ],
        correctOptionId: 'c',
        explanation: 'Les horloges concordent : coupure 22h, Morel sort 22h30, transfert 22h47, Morel consulte logs 23h05, verrouillage 23h12, sortie service après.'
      }
    ]
  }
};
