import type { CaseData, CaseProgress } from '../../types';

export const case2: CaseData = {
  id: 'case2',
  title: "Le Mystère de l’Hôtel",
  illustration: '🏨',
  description: "Un client disparaît mystérieusement dans un hôtel alors que personne ne semble l’avoir vu sortir.",
  difficulty: 'Moyenne',
  duration: '40-55 min',
  intro: "Hôtel Bellevue, 3 novembre, 07h15. Arnaud Delcourt, client de la chambre 407, ne répond plus. Son téléphone, sa valise et ses affaires sont restés sur place. Les caméras de l’entrée et du parking n’ont enregistré aucune sortie. La direction, inquiète d’un scandale, vous demande d’établir la vérité avant d’alerter la police.",
  objectives: [
    { id: 'o2_scene', title: 'Sécuriser la chambre 407', hint: 'Commencez par la réception et la chambre du client disparu.', check: (p: CaseProgress) => p.visitedLocations.includes('reception') && p.visitedLocations.includes('room407') },
    { id: 'o2_clues', title: 'Relever les indices de la chambre', hint: 'Examinez la valise, le téléphone, la fenêtre et le ticket de pressing.', check: (p: CaseProgress) => p.discoveredClues.length >= 6 },
    { id: 'o2_staff', title: 'Interroger le personnel', hint: 'La réceptionniste, l’agent de nuit et la femme de chambre savent des choses différentes.', check: (p: CaseProgress) => p.interviewed.length >= 3 },
    { id: 'o2_service', title: 'Suivre la piste de service', hint: 'L’escalier de service et la buanderie mènent au parking et à la sortie de livraison.', check: (p: CaseProgress) => p.visitedLocations.includes('parking') && p.discoveredClues.includes('c2_parking_cam') },
    { id: 'o2_chrono', title: 'Reconstituer la chronologie', hint: 'Replacez les sept événements dans l’ordre dans l’onglet Chronologie.', check: (p: CaseProgress) => p.timelineOrder.join(',') === 't1,t2,t3,t4,t5,t6,t7' },
    { id: 'o2_truth', title: 'Confondre le complice', hint: 'Rendez-vous dans l’onglet Résolution et répondez aux cinq questions.', check: (p: CaseProgress) => p.resolved },
  ],
  locations: [
    { id: 'reception', name: 'Réception', illustration: 'reception', description: "Un comptoir de marbre sous une lumière chaude. Le registre des arrivées et le tableau des clés sont encore en place.", hotspots: [
      { id: 'r_register', label: 'Registre d’arrivée', x: 36, y: 46, w: 14, h: 12, description: 'Le registre indique l’arrivée de Delcourt à 18h42, seul, pour deux nuits.', clueId: 'c2_register', documentId: 'd2_register' },
      { id: 'r_keys', label: 'Tableau des clés', x: 58, y: 30, w: 16, h: 18, description: 'Le crochet de la clé 407 est vide, mais un double de passe magnétique manque aussi.', clueId: 'c2_key' },
      { id: 'r_cctv', label: 'Moniteur d’accueil', x: 72, y: 44, w: 12, h: 14, description: 'Aperçu des caméras : couloir 4e étage et entrée principale, sans sortie de Delcourt.', clueId: 'c2_cctv' },
      { id: 'r_note', label: 'Message laissé au comptoir', x: 22, y: 56, w: 12, h: 10, description: 'Un mot plié remis pour M. Delcourt vers 22h.', clueId: 'c2_msg', documentId: 'd2_msg' },
    ]},
    { id: 'room407', name: 'Chambre 407', illustration: 'room', description: "Une chambre calme, lit défait d’un seul côté. La fenêtre est verrouillée de l’intérieur. Les effets personnels sont là.", hotspots: [
      { id: 'rm_bag', label: 'Valise ouverte', x: 18, y: 60, w: 18, h: 16, description: 'Vêtements pliés, mais le costume porté la veille a disparu.', clueId: 'c2_suit' },
      { id: 'rm_phone', label: 'Téléphone sur la table de nuit', x: 60, y: 52, w: 10, h: 10, description: 'Plusieurs appels manqués d’un numéro masqué et un SMS non envoyé.', clueId: 'c2_phone', documentId: 'd2_phone' },
      { id: 'rm_window', label: 'Fenêtre verrouillée', x: 76, y: 22, w: 14, h: 26, description: 'Verrou intérieur intact, aucune trace d’escalade au 4e étage.', clueId: 'c2_window' },
      { id: 'rm_receipt', label: 'Ticket froissé dans la corbeille', x: 42, y: 72, w: 10, h: 10, description: 'Ticket de pressing de l’hôtel pour un uniforme, payé en espèces à 21h10.', clueId: 'c2_receipt', documentId: 'd2_receipt' },
    ]},
    { id: 'corridor', name: 'Couloir & Escalier de service', illustration: 'corridor', description: "Un couloir feutré menant à l’escalier de service. La porte coupe-feu grince légèrement.", hotspots: [
      { id: 'co_cart', label: 'Chariot à linge', x: 26, y: 58, w: 18, h: 18, description: 'Grand chariot à linge stationné près de la porte de service, traces de roues fraîches.', clueId: 'c2_cart' },
      { id: 'co_badge', label: 'Lecteur de l’escalier de service', x: 64, y: 40, w: 10, h: 14, description: 'Le lecteur a enregistré un passage avec un badge personnel à 23h08.', clueId: 'c2_service_badge', unlocksLocationId: 'parking' },
      { id: 'co_fiber', label: 'Fibre textile au sol', x: 48, y: 70, w: 8, h: 8, description: 'Un morceau de tissu bleu-gris identique aux uniformes du personnel.', clueId: 'c2_fiber' },
    ]},
    { id: 'laundry', name: 'Buanderie', illustration: 'laundry', description: "Chaleur humide, machines en marche. Des uniformes propres sont empilés sur une table.", hotspots: [
      { id: 'la_uniform', label: 'Uniforme manquant', x: 40, y: 34, w: 16, h: 18, description: 'Un ensemble d’uniforme (taille M) manque à l’inventaire du soir.', clueId: 'c2_uniform' },
      { id: 'la_log', label: 'Feuille de suivi linge', x: 62, y: 50, w: 14, h: 14, description: 'Note : “pressing urgent chambre 407 – réglé espèces”.', clueId: 'c2_laundry_log', documentId: 'd2_laundry' },
      { id: 'la_tag', label: 'Étiquette nominative', x: 22, y: 62, w: 12, h: 10, description: 'Étiquette “J. Marin” décousue et abandonnée près d’un panier.', clueId: 'c2_tag' },
    ]},
    { id: 'parking', name: 'Parking & Sortie de service', illustration: 'parking', locked: true, unlockHint: 'Suivez la piste de l’escalier de service et de la buanderie.', description: "Zone de livraison à l’arrière de l’hôtel. Une caméra couvre la rampe, mais pas le recoin près des bennes.", hotspots: [
      { id: 'p_cam', label: 'Caméra du parking', x: 70, y: 20, w: 12, h: 14, description: 'À 23h14, la caméra capte un chariot poussé par un employé vers la sortie de service, hors du champ de l’entrée.', clueId: 'c2_parking_cam' },
      { id: 'p_van', label: 'Trace de véhicule', x: 30, y: 64, w: 20, h: 14, description: 'Marques de pneus récentes près de la porte de service, comme un véhicule en attente.', clueId: 'c2_tires' },
      { id: 'p_button', label: 'Bouton de manchette', x: 52, y: 72, w: 8, h: 8, description: 'Un bouton de manchette gravé “A.D.” retrouvé près de la benne.', clueId: 'c2_button' },
    ]}
  ],
  clues: [
    { id: 'c2_register', name: 'Registre d’arrivée', description: 'Delcourt arrivé seul à 18h42, réservation prépayée pour 2 nuits, sans contact d’urgence.', locationId: 'reception', category: 'documents', importance: 1, illustration: '📖', isDocument: true, documentText: 'Chambre 407 — Arnaud Delcourt\nArrivée: 18:42 (03/11)\nNuits: 2 (prépayé)\nNote: “ne pas déranger, départ tôt”' },
    { id: 'c2_key', name: 'Double magnétique manquant', description: 'Un double de passe de la chambre 407 n’est pas à son emplacement, contrairement à la procédure.', locationId: 'reception', category: 'objets', importance: 2, illustration: '🗝️' },
    { id: 'c2_cctv', name: 'Relevé caméras entrée', description: 'Aucune sortie de Delcourt par l’entrée principale ou le parking avant 07h00.', locationId: 'reception', category: 'enregistrements', importance: 2, illustration: '📹' },
    { id: 'c2_msg', name: 'Message pour Delcourt', description: 'Mot remis à 22h : “Tout est prêt. Minuit. J.” — ton convenu, pas une menace.', locationId: 'reception', category: 'documents', importance: 3, illustration: '✉️', isDocument: true, documentText: 'Pour M. Delcourt (407)\n"Tout est prêt. Minuit. J."\n(Remis au comptoir à 22:03)' },
    { id: 'c2_suit', name: 'Costume disparu', description: 'Le costume porté la veille n’est pas dans la valise ; Delcourt a changé de tenue.', locationId: 'room407', category: 'objets', importance: 2, illustration: '👔' },
    { id: 'c2_phone', name: 'Téléphone de Delcourt', description: 'Appels masqués répétés et brouillon SMS : “Je sors par le service, couvre-moi.”', locationId: 'room407', category: 'numerique', importance: 3, illustration: '📱', isDocument: true, documentText: 'Appels manqués: (masqué) 21:48, 22:20, 22:55\nBrouillon SMS (non envoyé, 22:57):\n"Je sors par le service, couvre-moi 10 min. — A."' },
    { id: 'c2_window', name: 'Fenêtre intacte', description: 'Fenêtre verrouillée de l’intérieur, 4e étage : aucune sortie par l’extérieur.', locationId: 'room407', category: 'objets', importance: 1, illustration: '🪟' },
    { id: 'c2_receipt', name: 'Ticket de pressing', description: 'Pressing urgent pour un uniforme, payé en espèces à 21h10 et lié à la chambre 407.', locationId: 'room407', category: 'documents', importance: 3, illustration: '🧾', isDocument: true, documentText: 'HOTEL BELLEVUE — Pressing\n21:10 — "Uniforme (urgent)" — Chambre 407\nPaiement: espèces\nRemise: buanderie' },
    { id: 'c2_cart', name: 'Chariot à linge', description: 'Chariot volumineux près de l’escalier de service, assez grand pour dissimuler une personne.', locationId: 'corridor', category: 'objets', importance: 2, illustration: '🧺' },
    { id: 'c2_service_badge', name: 'Passage badge service', description: 'Badge personnel utilisé à 23h08 sur l’escalier de service (accès réservé au personnel).', locationId: 'corridor', category: 'numerique', importance: 3, illustration: '💳' },
    { id: 'c2_fiber', name: 'Fibre d’uniforme', description: 'Tissu bleu-gris d’uniforme hôtelier retrouvé au sol du couloir.', locationId: 'corridor', category: 'objets', importance: 1, illustration: '🧵' },
    { id: 'c2_uniform', name: 'Uniforme manquant', description: 'Un uniforme taille M absent : cohérent avec une tenue de dissimulation.', locationId: 'laundry', category: 'objets', importance: 3, illustration: '👕' },
    { id: 'c2_laundry_log', name: 'Suivi de buanderie', description: 'Feuille mentionnant le pressing urgent de la chambre 407 réglé en espèces.', locationId: 'laundry', category: 'documents', importance: 2, illustration: '📋', isDocument: true, documentText: 'Suivi linge — soir\n21:15 — Uniforme demandé "pressing urgent" (ch. 407), espèces OK\n22:40 — Uniforme déposé sur table (propre)\nRemarque: J. Marin en pause 23h' },
    { id: 'c2_tag', name: 'Étiquette “J. Marin”', description: 'Étiquette décousue d’un uniforme : lien possible avec le signataire “J.”', locationId: 'laundry', category: 'objets', importance: 2, illustration: '🏷️' },
    { id: 'c2_parking_cam', name: 'Vidéo sortie de service', description: 'À 23h14, un employé pousse un chariot à linge vers la sortie de service, hors champ de l’entrée.', locationId: 'parking', category: 'enregistrements', importance: 3, illustration: '🎥' },
    { id: 'c2_tires', name: 'Traces de pneus', description: 'Véhicule stationné brièvement près de la sortie de service vers 23h15.', locationId: 'parking', category: 'objets', importance: 2, illustration: '🚗' },
    { id: 'c2_button', name: 'Bouton de manchette “A.D.”', description: 'Bouton gravé aux initiales de Delcourt, tombé près de la sortie de service.', locationId: 'parking', category: 'objets', importance: 3, illustration: '🔘' },
  ],
  characters: [
    { id: 'elise', name: 'Élise Bernard', role: 'Réceptionniste de nuit', portrait: '👩‍💼', bio: 'En poste de 20h à 8h. Accueillante, connaît les habitudes des clients.', knowledge: ['Arrivée Delcourt', 'Message remis'], startNodeId: 'start', nodes: {
      start: { id: 'start', text: "Élise Bernard paraît fatiguée. \"M. Delcourt ? Il n'est jamais redescendu. J'ai pensé qu'il dormait.\"", options: [
        { id: 'e1', label: 'Avez-vous vu quelqu’un sortir ?', response: '"Par l’entrée principale, personne correspondant à sa description. C’était calme."' },
        { id: 'e2', label: 'Parler du message remis à 22h', requiresClueIds: ['c2_msg'], response: '"Oui, un homme du personnel me l’a confié pour la chambre 407. Je n’ai pas vu le visage, il portait une casquette."', setsFlags: ['msg_staff'] },
        { id: 'e3', label: 'Qui avait accès au double de clé ?', requiresClueIds: ['c2_key'], response: '"Normalement moi et le responsable. Mais le personnel d’étage peut demander un passe temporaire… ce n’est pas arrivé, selon le registre."', setsFlags: ['key_access'] },
        { id: 'e_end', label: 'Terminer', response: '"J’espère qu’il va bien."' }
      ]}
    }},
    { id: 'marin', name: 'Julien Marin', role: 'Agent de nuit (linge)', portrait: '👨‍🔧', bio: 'S’occupe du linge et des livraisons tardives. Connaît les accès de service.', knowledge: ['Buanderie', 'Escalier de service'], startNodeId: 'start', nodes: {
      start: { id: 'start', text: "Julien Marin évite votre regard. \"Je faisais mes tournées, comme d’habitude.\"", options: [
        { id: 'm1', label: 'Où étiez-vous vers 23h ?', response: '"En pause, puis en buanderie. Je n’ai rien vu de spécial."', nextNodeId: 'pause' },
        { id: 'm2', label: 'C’est votre badge sur l’escalier de service ?', requiresClueIds: ['c2_service_badge'], response: '"Mon badge ? Je… je l’avais posé en buanderie. Quelqu’un a dû le prendre." Il transpire.', setsFlags: ['badge_excuse'] },
        { id: 'm3', label: 'Parler de l’étiquette à votre nom', requiresClueIds: ['c2_tag'], response: '"On découd souvent les étiquettes abîmées. Ça ne prouve rien."', contradiction: 'marin_tag' },
        { id: 'm4', label: 'Présenter la vidéo du parking', requiresClueIds: ['c2_parking_cam'], response: 'Il se tait un instant. "D’accord… Delcourt m’a payé pour l’aider à sortir discrètement. Il était dans le chariot. Je n’ai rien fait d’illégal, il voulait juste partir."', grantsClueIds: [], setsFlags: ['marin_confession'] },
        { id: 'm_end', label: 'Terminer', response: '"Je vous ai dit ce que je savais."' }
      ]},
      pause: { id: 'pause', text: '"Ma pause est vers 23h, oui. J’étais à l’arrière."', options: [
        { id: 'm1a', label: 'Quelqu’un peut confirmer ?', response: '"Pas vraiment… la nuit, on est peu."', setsFlags: ['no_alibi'] },
        { id: 'm1b', label: 'Revenir', response: 'Il hoche la tête.', nextNodeId: 'start' }
      ]}
    }},
    { id: 'clara', name: 'Clara Moretti', role: 'Femme de chambre', portrait: '👩‍🦱', bio: 'A préparé les étages en soirée. Observatrice et précise.', knowledge: ['Chariot linge', 'Uniformes'], startNodeId: 'start', nodes: {
      start: { id: 'start', text: '"J’ai terminé le 4e étage vers 21h30. La chambre 407 avait le panneau ‘ne pas déranger’.\""', options: [
        { id: 'c1', label: 'Avez-vous vu un chariot à linge ?', requiresClueIds: ['c2_cart'], response: '"Oui, près du service. Mais d’habitude on le range. Là il était encore plein, je trouvais ça étrange."', setsFlags: ['cart_strange'] },
        { id: 'c2', label: 'Parler de l’uniforme manquant', requiresClueIds: ['c2_uniform'], response: '"Il manquait un ensemble taille M après le pressing. J’ai cru que quelqu’un l’avait pris pour le matin."', setsFlags: ['uniform_missing'] },
        { id: 'c3', label: 'Avez-vous remarqué Delcourt ?', response: '"Je l’ai croisé vers 21h près de l’ascenseur, pressé. Il tenait un sac plat, comme du linge plié."' },
        { id: 'c_end', label: 'Terminer', response: '"Si j’y repense, je vous le dirai."' }
      ]}
    }},
    { id: 'paul', name: 'Paul Girard', role: 'Responsable de l’hôtel', portrait: '👨‍💼', bio: 'Souhaite éviter tout scandale. Contrôle les accès et les procédures.', knowledge: ['Procédures', 'Caméras'], startNodeId: 'start', nodes: {
      start: { id: 'start', text: "Paul Girard soupire. \"Un client volatilisé, c’est la dernière chose dont nous avons besoin.\"", options: [
        { id: 'p1', label: 'Les caméras couvrent-elles toutes les sorties ?', requiresClueIds: ['c2_cctv'], response: '"L’entrée et le parking oui. La sortie de service donne sur un angle mort partiel près des bennes… pour les livraisons."', setsFlags: ['blind_spot'] },
        { id: 'p2', label: 'Le pressing urgent est-il habituel ?', requiresClueIds: ['c2_receipt'], response: '"Rare, mais possible si payé en espèces. Je n’ai pas été informé."', setsFlags: ['pressing_unusual'] },
        { id: 'p3', label: 'Delcourt avait-il des problèmes connus ?', response: '"Aucun avec nous. Mais il a demandé à ne pas être dérangé et a parlé d’un départ très tôt."', },
        { id: 'p_end', label: 'Terminer', response: '"Faites vite, je vous en prie."' }
      ]}
    }}
  ],
  timeline: [
    { id: 't1', time: '18:42', label: 'Arrivée de Delcourt', details: 'Check-in chambre 407, seul, prépayé.', correctIndex: 0 },
    { id: 't2', time: '21:10', label: 'Pressing urgent demandé', details: 'Uniforme demandé et payé en espèces (ch. 407).', correctIndex: 1 },
    { id: 't3', time: '22:03', label: 'Message “Minuit. J.”', details: 'Un mot est remis au comptoir pour Delcourt.', correctIndex: 2 },
    { id: 't4', time: '22:57', label: 'Brouillon SMS', details: 'Delcourt écrit qu’il sortira par le service et demande couverture.', correctIndex: 3 },
    { id: 't5', time: '23:08', label: 'Badge sur escalier de service', details: 'Passage enregistré avec un badge personnel.', correctIndex: 4 },
    { id: 't6', time: '23:14', label: 'Chariot vers la sortie de service', details: 'Caméra parking : un employé pousse un chariot à linge vers l’arrière.', correctIndex: 5 },
    { id: 't7', time: '23:15', label: 'Véhicule en attente', details: 'Traces de pneus près de la sortie de service ; Delcourt quitte l’hôtel caché.', correctIndex: 6 },
  ],
  solution: {
    summary: "Arnaud Delcourt a organisé sa propre disparition : déguisé en personnel avec l’aide de Julien Marin, il a quitté l’hôtel caché dans un chariot à linge par la sortie de service.",
    culpritIds: ['marin'],
    whatHappened: "Voulant partir sans être vu, Delcourt a obtenu un uniforme via un pressing urgent, s’est coordonné avec Julien Marin (“J.”, badge, chariot) et a quitté sa chambre pour l’escalier de service. Vers 23h14, dissimulé dans le chariot poussé par Marin, il a rejoint un véhicule en attente près de la sortie de service (angle mort). La fenêtre intacte, les affaires laissées et l’absence sur les caméras d’entrée s’expliquent par cette sortie déguisée.",
    keyClueIds: ['c2_msg','c2_phone','c2_receipt','c2_service_badge','c2_uniform','c2_parking_cam','c2_button'],
    correctTimelineOrder: ['t1','t2','t3','t4','t5','t6','t7'],
    questions: [
      { id: 'q1', prompt: 'Que s’est-il réellement passé ?', options: [
        { id: 'a', text: 'Delcourt a été enlevé depuis sa chambre par la fenêtre.' },
        { id: 'b', text: 'Delcourt a quitté l’hôtel volontairement, déguisé et caché dans un chariot à linge.' },
        { id: 'c', text: 'Delcourt s’est caché dans l’hôtel et n’en est jamais sorti.' },
      ], correctOptionId: 'b', explanation: 'Les preuves (uniforme, pressing, SMS, chariot, vidéo de service, bouton) montrent une sortie volontaire et organisée.' },
      { id: 'q2', prompt: 'Qui a aidé Delcourt à quitter l’hôtel ?', options: [
        { id: 'a', text: 'Élise Bernard, la réceptionniste.' },
        { id: 'b', text: 'Julien Marin, agent de nuit (linge).' },
        { id: 'c', text: 'Paul Girard, le responsable.' },
      ], correctOptionId: 'b', explanation: 'Le badge, l’étiquette “J. Marin”, l’accès au linge et la vidéo du parking désignent Marin.' },
      { id: 'q3', prompt: 'Comment Delcourt a-t-il échappé aux caméras de l’entrée ?', options: [
        { id: 'a', text: 'Il est sorti par la fenêtre du 4e étage.' },
        { id: 'b', text: 'Il a emprunté la sortie de service, angle mort, dissimulé dans un chariot.' },
        { id: 'c', text: 'Il est sorti déguisé par l’entrée principale sans être reconnu.' },
      ], correctOptionId: 'b', explanation: 'La caméra du parking montre le chariot vers la sortie de service, non couverte comme l’entrée.' },
      { id: 'q4', prompt: 'Quelle preuve montre la préparation de la fuite ?', options: [
        { id: 'a', text: 'La fenêtre verrouillée de la chambre.' },
        { id: 'b', text: 'Le ticket de pressing urgent pour un uniforme lié à la chambre 407.' },
        { id: 'c', text: 'Le registre d’arrivée.' },
      ], correctOptionId: 'b', explanation: 'L’uniforme obtenu en urgence sert de déguisement, preuve de préméditation.' },
      { id: 'q5', prompt: 'Quelle chronologie est correcte ?', options: [
        { id: 'a', text: 'Message → Pressing → SMS → Badge service → Chariot sortie → Véhicule.' },
        { id: 'b', text: 'Pressing → Message → SMS → Badge service → Chariot sortie → Véhicule.' },
        { id: 'c', text: 'Pressing → SMS → Message → Badge service → Véhicule → Chariot sortie.' },
      ], correctOptionId: 'b', explanation: 'L’ordre des indices donne : pressing 21h10, message 22h03, SMS 22h57, badge 23h08, chariot 23h14, véhicule 23h15.' },
    ]
  }
};
