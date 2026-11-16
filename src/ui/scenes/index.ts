import { hallArt } from './hall';
import { bureauArt } from './bureau';
import { infoArt } from './info';
import { laboArt } from './labo';
import { archivesArt } from './archives';
import { receptionArt } from './reception';
import { roomArt } from './room';
import { corridorArt } from './corridor';
import { laundryArt } from './laundry';
import { parkingArt } from './parking';

export function renderSceneArt(key: string): string | null {
  switch (key) {
    case 'hall': return hallArt();
    case 'bureau': return bureauArt();
    case 'info': return infoArt();
    case 'labo': return laboArt();
    case 'archives': return archivesArt();
    case 'reception': return receptionArt();
    case 'room': return roomArt();
    case 'corridor': return corridorArt();
    case 'laundry': return laundryArt();
    case 'parking': return parkingArt();
    default: return null;
  }
}

export const sceneMeta: Record<string, { label: string; icon: string; tint: string; sub: string }> = {
  hall: { label: "Hall d'entrée", icon: 'door', tint: 'linear-gradient(135deg,#1c2635,#0e141d)', sub: 'Accès principal' },
  bureau: { label: 'Bureau du scientifique', icon: 'desk', tint: 'linear-gradient(135deg,#3a2c1f,#17110c)', sub: 'Zone privée' },
  info: { label: 'Salle informatique', icon: 'server', tint: 'linear-gradient(135deg,#0f2230,#071018)', sub: 'Systèmes' },
  labo: { label: 'Laboratoire principal', icon: 'flask', tint: 'linear-gradient(135deg,#c9d8e1,#7d919e)', sub: 'Zone sensible' },
  archives: { label: 'Salle des archives', icon: 'archive', tint: 'linear-gradient(135deg,#2a241c,#100d09)', sub: 'Accès restreint' },
  reception: { label: 'Réception', icon: 'desk', tint: 'linear-gradient(135deg,#2a241c,#12100c)', sub: 'Accueil' },
  room: { label: 'Chambre 407', icon: 'bed', tint: 'linear-gradient(135deg,#232b3d,#10141d)', sub: 'Client disparu' },
  corridor: { label: 'Couloir & service', icon: 'door', tint: 'linear-gradient(135deg,#1d2531,#0d1118)', sub: 'Accès personnel' },
  laundry: { label: 'Buanderie', icon: 'shirt', tint: 'linear-gradient(135deg,#1b2c33,#0c1418)', sub: 'Linge & uniformes' },
  parking: { label: 'Parking & sortie', icon: 'car', tint: 'linear-gradient(135deg,#1c222b,#0a0d12)', sub: 'Zone de livraison' }
};
