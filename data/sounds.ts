
import { Sound } from '../types';

export const INITIAL_SOUNDS: Sound[] = [
  // Blasters
  { id: 'blaster-e11', name: 'Blaster E-11', category: 'Blasters', src: '/sounds/blaster-e11.mp3', tags: ['empire', 'stormtrooper', 'fire'] },
  { id: 'blaster-dl44', name: 'Blaster DL-44', category: 'Blasters', src: '/sounds/blaster-dl44.mp3', tags: ['han solo', 'rebel', 'fire'] },
  { id: 'bowcaster', name: 'Chewbacca Bowcaster', category: 'Blasters', src: '/sounds/bowcaster.mp3', tags: ['wookiee', 'rebel', 'fire'] },
  { id: 'blaster-heavy', name: 'Heavy Blaster', category: 'Blasters', src: '/sounds/blaster-heavy.mp3', tags: ['heavy', 'cannon'] },
  { id: 'blaster-sniper', name: 'Sniper Blaster', category: 'Blasters', src: '/sounds/blaster-sniper.mp3', tags: ['precision', 'long range'] },

  // Sabres de Luz
  { id: 'saber-on', name: 'Lightsaber Ignition', category: 'Sabres de Luz', src: '/sounds/saber-on.mp3', tags: ['jedi', 'sith', 'blade'] },
  { id: 'saber-off', name: 'Lightsaber Deactivation', category: 'Sabres de Luz', src: '/sounds/saber-off.mp3', tags: ['jedi', 'sith', 'blade'] },
  { id: 'saber-hum', name: 'Lightsaber Hum', category: 'Sabres de Luz', src: '/sounds/saber-hum.mp3', tags: ['jedi', 'ambient', 'blade'] },
  { id: 'saber-swing', name: 'Lightsaber Swing', category: 'Sabres de Luz', src: '/sounds/saber-swing.mp3', tags: ['jedi', 'movement'] },
  { id: 'saber-clash', name: 'Lightsaber Clash', category: 'Sabres de Luz', src: '/sounds/saber-clash.mp3', tags: ['duel', 'fight'] },

  // Droids
  { id: 'r2d2-beep', name: 'R2-D2 Beep', category: 'Droids', src: '/sounds/r2d2-beep.mp3', tags: ['astromech', 'r2', 'happy'] },
  { id: 'r2d2-scream', name: 'R2-D2 Scream', category: 'Droids', src: '/sounds/r2d2-scream.mp3', tags: ['astromech', 'scared'] },
  { id: 'bb8-chirp', name: 'BB-8 Chirp', category: 'Droids', src: '/sounds/bb8-chirp.mp3', tags: ['astromech', 'bb8', 'cute'] },
  { id: 'c3po-oh-my', name: 'C-3PO Oh My!', category: 'Droids', src: '/sounds/c3po-oh-my.mp3', tags: ['protocol', 'human cyborg relations'] },
  { id: 'gonk-droid', name: 'Gonk Droid', category: 'Droids', src: '/sounds/gonk-droid.mp3', tags: ['power', 'gonk'] },

  // Naves & Motores
  { id: 'tie-fighter-roar', name: 'TIE Fighter Roar', category: 'Naves & Motores', src: '/sounds/tie-fighter-roar.mp3', tags: ['empire', 'flyby', 'engine'] },
  { id: 'xwing-fire', name: 'X-Wing Lasers', category: 'Naves & Motores', src: '/sounds/xwing-fire.mp3', tags: ['rebel', 'starfighter'] },
  { id: 'millennium-falcon-jump', name: 'Falcon Hyperdrive', category: 'Naves & Motores', src: '/sounds/millennium-falcon-jump.mp3', tags: ['ship', 'hyperspace'] },
  { id: 'speeder-bike', name: 'Speeder Bike', category: 'Naves & Motores', src: '/sounds/speeder-bike.mp3', tags: ['endor', 'scout', 'zoom'] },
  { id: 'star-destroyer', name: 'Star Destroyer Engine', category: 'Naves & Motores', src: '/sounds/star-destroyer.mp3', tags: ['empire', 'massive'] },

  // Interface Imperial
  { id: 'imperial-alarm', name: 'Imperial Alarm', category: 'Interface Imperial', src: '/sounds/imperial-alarm.mp3', tags: ['empire', 'alert', 'base'] },
  { id: 'door-hiss', name: 'Blast Door Hiss', category: 'Interface Imperial', src: '/sounds/door-hiss.mp3', tags: ['ship', 'mechanical'] },
  { id: 'comm-beep', name: 'Comms Beep', category: 'Interface Imperial', src: '/sounds/comm-beep.mp3', tags: ['radio', 'chatter'] },
  { id: 'computer-access', name: 'Console Access', category: 'Interface Imperial', src: '/sounds/computer-access.mp3', tags: ['terminal', 'hack'] },
  { id: 'hologram-flicker', name: 'Hologram Static', category: 'Interface Imperial', src: '/sounds/hologram-flicker.mp3', tags: ['comms', 'transmission'] },

  // Ambientes
  { id: 'cantina-band', name: 'Cantina Band Snippet', category: 'Ambientes', src: '/sounds/cantina-band.mp3', tags: ['music', 'tatooine', 'jazz'] },
  { id: 'force-theme', name: 'The Force Theme', category: 'Ambientes', src: '/sounds/force-theme.mp3', tags: ['mystical', 'jedi', 'music'] },
  { id: 'vader-breathing', name: 'Vader Breathing', category: 'Ambientes', src: '/sounds/vader-breathing.mp3', tags: ['sith', 'dark side'] },
  { id: 'death-star-hum', name: 'Death Star Ambient', category: 'Ambientes', src: '/sounds/death-star-hum.mp3', tags: ['empire', 'deep', 'space'] },
  { id: 'hoth-wind', name: 'Hoth Wind', category: 'Ambientes', src: '/sounds/hoth-wind.mp3', tags: ['planet', 'snow', 'storm'] },
];
