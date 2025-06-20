// Hitman World of Assassination Guide Data
// Optimized TypeScript definitions and data structures

export interface Mission {
  readonly id: string;
  readonly name: string;
  readonly location: string;
  readonly difficulty: 'Novice' | 'Professional' | 'Master';
  readonly targets: readonly Target[];
  readonly disguises: readonly Disguise[];
  readonly weapons: readonly Weapon[];
  readonly opportunities: readonly Opportunity[];
  readonly challenges: readonly Challenge[];
  readonly mastery: readonly MasteryUnlock[];
}

export interface Target {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly locations: readonly string[];
  readonly routines: readonly TargetRoutine[];
  readonly vulnerabilities: readonly string[];
}

export interface TargetRoutine {
  readonly timeStart: number; // seconds from mission start
  readonly location: string;
  readonly action: string;
  readonly duration: number;
  readonly securityLevel: 'Low' | 'Medium' | 'High';
}

export interface Disguise {
  readonly id: string;
  readonly name: string;
  readonly accessAreas: readonly string[];
  readonly restrictedAreas: readonly string[];
  readonly obtainMethod: string;
  readonly suspiciousTo: readonly string[];
}

export interface Weapon {
  readonly id: string;
  readonly name: string;
  readonly type: 'Firearm' | 'Melee' | 'Explosive' | 'Poison' | 'Accident' | 'Thrown';
  readonly concealable: boolean;
  readonly locations: readonly string[];
  readonly unlockLevel?: number;
}

export interface Opportunity {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly steps: readonly string[];
  readonly requiredItems?: readonly string[];
  readonly requiredDisguise?: string;
  readonly difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Challenge {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly type: 'Assassination' | 'Discovery' | 'Feats' | 'Targets' | 'Classics';
  readonly xpReward: number;
  readonly requirements: readonly string[];
}

export interface MasteryUnlock {
  readonly level: number;
  readonly unlock: string;
  readonly type: 'Weapon' | 'Equipment' | 'Starting Location' | 'Agency Pickup' | 'Suit';
  readonly description: string;
}

export interface StartingLocation {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly location: string;
  readonly unlockLevel: number;
  readonly availableDisguise?: string;
}

// Optimized lookup maps for O(1) access
export const MISSION_LOOKUP = new Map<string, Mission>();
export const TARGET_LOOKUP = new Map<string, Target>();
export const DISGUISE_LOOKUP = new Map<string, Disguise>();
export const WEAPON_LOOKUP = new Map<string, Weapon>();
export const OPPORTUNITY_LOOKUP = new Map<string, Opportunity>();
export const CHALLENGE_LOOKUP = new Map<string, Challenge>();
export const MASTERY_UNLOCK_LOOKUP = new Map<string, MasteryUnlock>();
export const STARTING_LOCATION_LOOKUP = new Map<string, StartingLocation>();


// Paris - The Showstopper
const PARIS_MISSION: Mission = {
  id: 'paris',
  name: 'The Showstopper',
  location: 'Paris, France',
  difficulty: 'Novice',
  targets: [
    {
      id: 'viktor_novikov',
      name: 'Viktor Novikov',
      description: 'Fashion mogul and IAGO ring leader',
      locations: ['Fashion Show', 'Bar', 'Auction Room'],
      routines: [
        {
          timeStart: 0,
          location: 'Fashion Show Catwalk',
          action: 'Watching show',
          duration: 180,
          securityLevel: 'High'
        },
        {
          timeStart: 180,
          location: 'Bar Area',
          action: 'Socializing',
          duration: 120,
          securityLevel: 'Medium'
        },
        {
          timeStart: 300,
          location: 'Rooftop Helipad',
          action: 'Meeting with Dalia, then leaving',
          duration: 60,
          securityLevel: 'High'
        }
      ],
      vulnerabilities: ['Poisoned drink', 'Light rig accident', 'Fireworks explosion', 'Exploding confetti cannon', 'Helicopter crash']
    },
    {
      id: 'dalia_margolis',
      name: 'Dalia Margolis',
      description: 'Spymaster and auction host',
      locations: ['Auction Room', 'Private Study', 'Attic'],
      routines: [
        {
          timeStart: 0,
          location: 'Auction Room',
          action: 'Hosting auction',
          duration: 300,
          securityLevel: 'High'
        },
        {
          timeStart: 300,
          location: 'Attic Satellite Room',
          action: 'Using satellite',
          duration: 120,
          securityLevel: 'High'
        }
      ],
      vulnerabilities: ['Poisoned champagne', 'Chandelier accident', 'Laptop bomb', 'Exploding phone', 'Fiber Wire (after private meeting)']
    }
  ],
  disguises: [
    {
      id: 'palace_staff',
      name: 'Palace Staff',
      accessAreas: ['Service Areas', 'Kitchen', 'Basement', 'Ground Floor'],
      restrictedAreas: ['Attic', 'Auction Room', 'Security Rooms', 'Top Floor Penthouse'],
      obtainMethod: 'Subdue various staff members around palace',
      suspiciousTo: ['Palace Staff', 'Security Guards', 'Enforcers']
    },
    {
      id: 'security_guard',
      name: 'Security Guard',
      accessAreas: ['Most areas', 'Security Room'],
      restrictedAreas: ['Attic', 'Auction Room (without keycard)'],
      obtainMethod: 'Subdue security guards in various locations',
      suspiciousTo: ['Security Guards', 'Enforcers', 'Elite Guards']
    },
    {
      id: 'fashion_model',
      name: 'Fashion Model',
      accessAreas: ['Backstage', 'Catwalk', 'Dressing Rooms'],
      restrictedAreas: ['Auction Room', 'Attic', 'Security Rooms', 'Staff Areas'],
      obtainMethod: 'Subdue a fashion model in the dressing rooms or backstage',
      suspiciousTo: ['Other Models', 'Fashion Crew']
    },
    {
      id: 'stylist',
      name: 'Stylist',
      accessAreas: ['Backstage', 'Dressing Rooms', 'Show Areas'],
      restrictedAreas: ['Attic', 'Security Rooms', 'Staff Areas'],
      obtainMethod: 'Subdue a stylist backstage',
      suspiciousTo: ['Stylists', 'Fashion Crew']
    },
    {
      id: 'tech_crew',
      name: 'Tech Crew',
      accessAreas: ['Backstage', 'Service Areas', 'Light Rig Area'],
      restrictedAreas: ['Attic', 'Auction Room', 'Security Rooms'],
      obtainMethod: 'Subdue tech crew members backstage or near stage equipment',
      suspiciousTo: ['Tech Crew', 'Security']
    },
    {
      id: 'waiter',
      name: 'Waiter',
      accessAreas: ['Bar Areas', 'Kitchen', 'Dining Areas', 'Ground Floor'],
      restrictedAreas: ['Attic', 'Auction Room', 'Security Rooms'],
      obtainMethod: 'Subdue waiters in bar or dining areas',
      suspiciousTo: ['Waiters', 'Palace Staff']
    },
    {
      id: 'auction_staff',
      name: 'Auction Staff',
      accessAreas: ['Auction Room', 'Top Floor'],
      restrictedAreas: ['Attic', 'Security Rooms'],
      obtainMethod: 'Subdue auction staff on the top floor near the auction',
      suspiciousTo: ['Auction Staff', 'Dalia Margolis', 'Elite Guards']
    }
  ],
  weapons: [
    {
      id: 'kitchen_knife',
      name: 'Kitchen Knife',
      type: 'Melee',
      concealable: true,
      locations: ['Kitchen', 'Various service areas']
    },
    {
      id: 'auction_pistol',
      name: 'Auction Pistol',
      type: 'Firearm',
      concealable: true,
      locations: ['Auction Room Display']
    },
    {
      id: 'screwdriver',
      name: 'Screwdriver',
      type: 'Melee',
      concealable: true,
      locations: ['Basement', 'Maintenance areas']
    },
    {
      id: 'rat_poison',
      name: 'Rat Poison',
      type: 'Poison',
      concealable: true,
      locations: ['Kitchen', 'Basement storage']
    },
    {
      id: 'bust',
      name: 'Bust',
      type: 'Thrown',
      concealable: false,
      locations: ['Various rooms, e.g., attic']
    }
  ],
  opportunities: [
    {
      id: 'lights_out',
      name: 'Lights Out',
      description: 'Sabotage the light rig to eliminate Viktor',
      steps: [
        'Obtain Palace Staff or Tech Crew disguise',
        'Access the attic via basement passage or exterior pipes',
        'Sabotage the light rig winch',
        'Wait for Viktor to stand under the lights'
      ],
      requiredDisguise: 'palace_staff',
      difficulty: 'Medium'
    },
    {
      id: 'bare_knuckle_boxer',
      name: 'Bare Knuckle Boxer',
      description: 'Pose as Helmut Kruger to get close to Dalia',
      steps: [
        'Locate Helmut Kruger backstage',
        'Subdue him and obtain his disguise and invitation',
        'Meet with Dalia Margolis in private',
        'Eliminate her when alone'
      ],
      requiredDisguise: 'fashion_model', // Specifically Helmut Kruger's suit
      difficulty: 'Hard'
    },
    {
      id: 'a_private_meeting',
      name: 'A Private Meeting',
      description: 'Arrange a private meeting with Viktor Novikov by replacing the Sommelier.',
      steps: [
        'Locate the Sommelier',
        'Subdue him and obtain his disguise',
        'Inform Viktor Novikov about a private wine tasting',
        'Eliminate Viktor during the private meeting'
      ],
      requiredDisguise: 'palace_staff', // Sommelier is a type of palace staff
      difficulty: 'Medium'
    }
  ],
  challenges: [
    {
      id: 'piano_man',
      name: 'Piano Man',
      description: 'Eliminate any target with a Fiber Wire.',
      type: 'Assassination',
      xpReward: 4000,
      requirements: ['Fiber Wire elimination', 'Any target']
    },
    {
      id: 'silent_assassin',
      name: 'Silent Assassin',
      description: 'Complete the mission as Silent Assassin.',
      type: 'Classics',
      xpReward: 5000,
      requirements: ['No detections', 'No non-target kills', 'No bodies found', 'Targets eliminated']
    },
    {
      id: 'chameleon',
      name: 'Chameleon',
      description: 'Find and equip all unique disguises in Paris.',
      type: 'Discovery',
      xpReward: 2000,
      requirements: ['Collect all unique disguises']
    }
  ],
  mastery: [
    {
      level: 5,
      unlock: 'Lockpick',
      type: 'Equipment',
      description: 'Useful for accessing locked areas.'
    },
    {
      level: 10,
      unlock: 'ICA19 Silenced Pistol',
      type: 'Weapon',
      description: 'A silenced pistol for stealth eliminations.'
    },
    {
      level: 15,
      unlock: 'Palace Staff Starting Location',
      type: 'Starting Location',
      description: 'Begin the mission disguised as Palace Staff in the kitchen.'
    },
    {
      level: 20,
      unlock: 'Fiber Wire',
      type: 'Equipment',
      description: 'A classic, silent assassination tool.'
    }
  ]
} as const;

// Sapienza - World of Tomorrow
const SAPIENZA_MISSION: Mission = {
  id: 'sapienza',
  name: 'World of Tomorrow',
  location: 'Sapienza, Italy',
  difficulty: 'Professional',
  targets: [
    {
      id: 'silvio_caruso',
      name: 'Silvio Caruso',
      description: 'Bioengineer and virus creator',
      locations: ['Villa Caruso', 'Laboratory', 'Observatory', 'Garden', 'Morgue'],
      routines: [
        {
          timeStart: 0,
          location: 'Villa Office',
          action: 'Working on virus design',
          duration: 240,
          securityLevel: 'Medium'
        },
        {
          timeStart: 240,
          location: 'Villa Garden',
          action: 'Golfing',
          duration: 120,
          securityLevel: 'Low'
        },
        {
          timeStart: 360,
          location: 'Morgue',
          action: 'Visiting mother\'s grave',
          duration: 60,
          securityLevel: 'Low'
        }
      ],
      vulnerabilities: ['Therapy session', 'Golf ball accident', 'Poisoned spaghetti', 'Exploding laptop', 'Old axe']
    },
    {
      id: 'francesca_de_santis',
      name: 'Francesca De Santis',
      description: 'Laboratory head and Caruso\'s assistant',
      locations: ['Villa Office', 'Laboratory', 'Apartment', 'Observatory'],
      routines: [
        {
          timeStart: 0,
          location: 'Laboratory',
          action: 'Supervising research',
          duration: 300,
          securityLevel: 'High'
        },
        {
          timeStart: 300,
          location: 'Villa Office',
          action: 'Meeting with Caruso',
          duration: 90,
          securityLevel: 'Medium'
        }
      ],
      vulnerabilities: ['DNA scanner trap', 'Stalactite accident', 'Poisoned coffee', 'Exploding prototype']
    },
    {
      id: 'virus',
      name: 'The Virus',
      description: 'Prototype virus to be destroyed',
      locations: ['Underground Laboratory'],
      routines: [
        {
          timeStart: 0,
          location: 'Virus Chamber',
          action: 'Active',
          duration: 9999, // Until destroyed
          securityLevel: 'High'
        }
      ],
      vulnerabilities: ['Overheating with server spike', 'Freezing with emergency cool down', 'Explosion with explosives', 'Destroying via lab-specific methods']
    }
  ],
  disguises: [
    {
      id: 'mansion_staff',
      name: 'Mansion Staff',
      accessAreas: ['Villa Service Areas', 'Kitchen', 'Ground Floor'],
      restrictedAreas: ['Laboratory', 'Caruso Office', 'Security Rooms'],
      obtainMethod: 'Subdue various staff throughout villa',
      suspiciousTo: ['Mansion Staff', 'Security']
    },
    {
      id: 'lab_technician',
      name: 'Lab Technician',
      accessAreas: ['Laboratory', 'Virus Chamber', 'Underground Tunnels'],
      restrictedAreas: ['Caruso Private Areas', 'De Santis Apartment'],
      obtainMethod: 'Subdue lab personnel in the laboratory area',
      suspiciousTo: ['Lab Personnel', 'Elite Guards']
    },
    {
      id: 'chef',
      name: 'Chef',
      accessAreas: ['Kitchen', 'Dining Areas', 'Staff Areas'],
      restrictedAreas: ['Laboratory', 'Security Rooms'],
      obtainMethod: 'Subdue chefs in the kitchen',
      suspiciousTo: ['Chefs', 'Mansion Staff']
    },
    {
      id: 'gardener',
      name: 'Gardener',
      accessAreas: ['Gardens', 'Grounds', 'Outskirts of Villa'],
      restrictedAreas: ['Inside Villa', 'Laboratory'],
      obtainMethod: 'Subdue gardeners in the villa gardens',
      suspiciousTo: ['Gardeners', 'Security']
    },
    {
      id: 'private_detective',
      name: 'Private Detective',
      accessAreas: ['Villa Ground Floor', 'Villa Upstairs', 'Observatory'],
      restrictedAreas: ['Laboratory', 'Security Rooms'],
      obtainMethod: 'Subdue the detective near the villa entrance or as he investigates',
      suspiciousTo: ['Security', 'Caruso']
    }
  ],
  weapons: [
    {
      id: 'golf_ball',
      name: 'Golf Ball',
      type: 'Accident',
      concealable: true,
      locations: ['Golf Course']
    },
    {
      id: 'old_axe',
      name: 'Old Axe',
      type: 'Melee',
      concealable: false,
      locations: ['Morgue']
    },
    {
      id: 'poison_syringe',
      name: 'Poison Syringe',
      type: 'Poison',
      concealable: true,
      locations: ['Unlockable', 'Found in some medical areas']
    },
    {
      id: 'wrench',
      name: 'Wrench',
      type: 'Melee',
      concealable: true,
      locations: ['Maintenance areas', 'Kitchen']
    }
  ],
  opportunities: [
    {
      id: 'the_author',
      name: 'The Author',
      description: 'Pose as a detective novelist to meet Caruso',
      steps: [
        'Obtain the manuscript from the apartment',
        'Meet with Caruso as the author',
        'Follow him to his mother\'s grave',
        'Push him over the cliff'
      ],
      requiredDisguise: 'private_detective',
      difficulty: 'Medium'
    },
    {
      id: 'pest_control',
      name: 'Pest Control',
      description: 'Infiltrate the lab as a pest control worker to destroy the virus.',
      steps: [
        'Obtain Pest Control disguise near the town square',
        'Gain access to the laboratory',
        'Find and exploit a vulnerability in the virus containment'
      ],
      requiredDisguise: 'lab_technician', // Pest Control disguise is similar to Lab Tech for access
      difficulty: 'Hard'
    },
    {
      id: 'dna_dongle',
      name: 'DNA Dongle',
      description: 'Use the DNA dongle to trap Francesca De Santis.',
      steps: [
        'Obtain the DNA dongle from a lab technician',
        'Tamper with the DNA scanner in Francesca\'s office',
        'Wait for Francesca to use the scanner'
      ],
      requiredDisguise: 'lab_technician',
      difficulty: 'Medium'
    }
  ],
  challenges: [
    {
      id: 'silent_assassin_sapienza',
      name: 'Silent Assassin',
      description: 'Complete the mission as Silent Assassin.',
      type: 'Classics',
      xpReward: 5000,
      requirements: ['No detections', 'No non-target kills', 'No bodies found', 'Targets eliminated']
    },
    {
      id: 'chameleon_sapienza',
      name: 'Chameleon',
      description: 'Find and equip all unique disguises in Sapienza.',
      type: 'Discovery',
      xpReward: 2000,
      requirements: ['Collect all unique disguises']
    }
  ],
  mastery: [
    {
      level: 5,
      unlock: 'Sedative Syringe',
      type: 'Equipment',
      description: 'A syringe that can render targets unconscious.'
    },
    {
      level: 10,
      unlock: 'Remote Explosive',
      type: 'Equipment',
      description: 'A versatile explosive triggered remotely.'
    },
    {
      level: 15,
      unlock: 'Lab Technician Starting Location',
      type: 'Starting Location',
      description: 'Begin the mission disguised as a Lab Technician in the underground lab.'
    },
    {
      level: 20,
      unlock: 'Concealable Baton',
      type: 'Weapon',
      description: 'A discreet melee weapon for non-lethal takedowns.'
    }
  ]
} as const;

// Dubai - On Top of the World
const DUBAI_MISSION: Mission = {
  id: 'dubai',
  name: 'On Top of the World',
  location: 'Dubai, UAE',
  difficulty: 'Professional',
  targets: [
    {
      id: 'carl_ingram',
      name: 'Carl Ingram',
      description: 'Providence Herald, co-founder of the Sceptre project',
      locations: ['Penthouse', 'Conference Room', 'Art Installation'],
      routines: [
        {
          timeStart: 0,
          location: 'Penthouse Lounge',
          action: 'Touring the penthouse, making calls',
          duration: 300,
          securityLevel: 'High'
        },
        {
          timeStart: 300,
          location: 'Conference Room',
          action: 'Attending a meeting',
          duration: 180,
          securityLevel: 'High'
        }
      ],
      vulnerabilities: ['Poisoned whiskey', 'Chandelier accident', 'Oil rig model impalement', 'Falling from balcony']
    },
    {
      id: 'marcus_stuyvesant',
      name: 'Marcus Stuyvesant',
      description: 'Providence Herald, co-founder of the Sceptre project',
      locations: ['Art Installation', 'Outdoor Terrace', 'Server Room'],
      routines: [
        {
          timeStart: 0,
          location: 'Art Installation',
          action: 'Observing the exhibit',
          duration: 240,
          securityLevel: 'High'
        },
        {
          timeStart: 240,
          location: 'Outdoor Terrace',
          action: 'Inspecting security',
          duration: 120,
          securityLevel: 'Medium'
        }
      ],
      vulnerabilities: ['Shot during training exercise', 'Falling from balcony', 'Thrown art piece']
    }
  ],
  disguises: [
    {
      id: 'event_staff',
      name: 'Event Staff',
      accessAreas: ['Atrium', 'Kitchen', 'Staff Areas', 'Bars'],
      restrictedAreas: ['Penthouse', 'Security Rooms', 'Server Room'],
      obtainMethod: 'Subdue staff members throughout the building',
      suspiciousTo: ['Event Staff', 'Security Guards']
    },
    {
      id: 'security_dubai',
      name: 'Security Guard (Dubai)',
      accessAreas: ['Most areas', 'Security Rooms', 'Helipad'],
      restrictedAreas: ['Penthouse (specific rooms)'],
      obtainMethod: 'Subdue security guards',
      suspiciousTo: ['Elite Security', 'Targets']
    },
    {
      id: 'penthouse_staff',
      name: 'Penthouse Staff',
      accessAreas: ['Penthouse', 'Penthouse Service Areas'],
      restrictedAreas: ['Security Rooms'],
      obtainMethod: 'Subdue staff in the penthouse',
      suspiciousTo: ['Penthouse Guards', 'Targets']
    },
    {
      id: 'maintenance_dubai',
      name: 'Maintenance (Dubai)',
      accessAreas: ['Server Room', 'Maintenance Tunnels', 'Ventilation'],
      restrictedAreas: ['Penthouse Private Areas'],
      obtainMethod: 'Subdue maintenance workers',
      suspiciousTo: ['Security', 'Other Maintenance']
    },
    {
      id: 'pilot',
      name: 'Pilot',
      accessAreas: ['Helipad', 'Helipad Access'],
      restrictedAreas: ['Main building areas'],
      obtainMethod: 'Subdue the pilot on the helipad',
      suspiciousTo: ['Security', 'Targets (if near helipad)']
    }
  ],
  weapons: [
    {
      id: 'gold_bar',
      name: 'Gold Bar',
      type: 'Thrown',
      concealable: false,
      locations: ['Vending machine (after challenge)']
    },
    {
      id: 'screwdriver_dubai',
      name: 'Screwdriver',
      type: 'Melee',
      concealable: true,
      locations: ['Control Room', 'Maintenance areas']
    },
    {
      id: 'arabic_dagger',
      name: 'Arabic Dagger',
      type: 'Melee',
      concealable: true,
      locations: ['Penthouse displays']
    }
  ],
  opportunities: [
    {
      id: 'how_the_mighty_fall',
      name: 'How The Mighty Fall',
      description: 'Trigger a meeting between both targets for a double assassination opportunity.',
      steps: [
        'Gain access to the server room',
        'Initiate the "Emergency Meeting" protocol via the server console',
        'Wait for both targets to meet in the secure room',
        'Eliminate them together (e.g., chandelier accident)'
      ],
      requiredDisguise: 'maintenance_dubai', // or security
      difficulty: 'Hard'
    },
    {
      id: 'bird_of_prey',
      name: 'Bird of Prey',
      description: 'Pose as Zama "The Vulture" Kazem to get close to Carl Ingram.',
      steps: [
        'Locate and subdue Zama Kazem',
        'Obtain his disguise and lethal poison vial',
        'Meet with Ingram\'s assistant',
        'Follow the steps to get Ingram alone for assassination'
      ],
      requiredDisguise: 'security_dubai', // Zama Kazem's disguise
      difficulty: 'Medium'
    },
    {
      id: 'insecurity',
      name: '(In)Security',
      description: 'Assume the role of Marcus Stuyvesant\'s new bodyguard for a close-quarters assassination.',
      steps: [
        'Locate and subdue Marcus Stuyvesant\'s original bodyguard',
        'Obtain his disguise',
        'Report for duty and follow Stuyvesant',
        'Eliminate Stuyvesant during a private moment or training exercise'
      ],
      requiredDisguise: 'security_dubai',
      difficulty: 'Medium'
    }
  ],
  challenges: [
    {
      id: 'someone_could_hurt_themselves',
      name: 'Someone Could Hurt Themselves',
      description: 'Eliminate a target with an accident.',
      type: 'Assassination',
      xpReward: 1500,
      requirements: ['Target eliminated by accident']
    },
    {
      id: 'mile_high_drop',
      name: 'Mile High Drop',
      description: 'Eliminate Marcus Stuyvesant by pushing him off the penthouse balcony.',
      type: 'Assassination',
      xpReward: 2000,
      requirements: ['Marcus Stuyvesant eliminated', 'Fall accident']
    },
    {
      id: 'silent_assassin_dubai',
      name: 'Silent Assassin',
      description: 'Complete the mission as Silent Assassin.',
      type: 'Classics',
      xpReward: 5000,
      requirements: ['No detections', 'No non-target kills', 'No bodies found', 'Targets eliminated']
    },
    {
      id: 'chameleon_dubai',
      name: 'Chameleon',
      description: 'Find and equip all unique disguises in Dubai.',
      type: 'Discovery',
      xpReward: 2000,
      requirements: ['Collect all unique disguises']
    }
  ],
  mastery: [
    {
      level: 5,
      unlock: 'Remote EMP Charge',
      type: 'Equipment',
      description: 'An explosive device that can disable electronics discreetly.'
    },
    {
      level: 10,
      unlock: 'ICA Executive Briefcase',
      type: 'Equipment',
      description: 'A discreet way to carry large items into a mission.'
    },
    {
      level: 15,
      unlock: 'Atrium Starting Location',
      type: 'Starting Location',
      description: 'Begin the mission in the Atrium, disguised as an Event Staff.'
    },
    {
      level: 20,
      unlock: 'Custom 5mm (Pistol)',
      type: 'Weapon',
      description: 'A small, easily concealable pistol.'
    }
  ]
} as const;

// Dartmoor - Death in the Family
const DARTMOOR_MISSION: Mission = {
  id: 'dartmoor',
  name: 'Death in the Family',
  location: 'Dartmoor, England',
  difficulty: 'Professional',
  targets: [
    {
      id: 'alexa_carlisle',
      name: 'Alexa Carlisle',
      description: 'Former Providence Partner, matriarch of the Carlisle family',
      locations: ['Thornbridge Manor', 'Graveyard', 'Greenhouse'],
      routines: [
        {
          timeStart: 0,
          location: 'Thornbridge Manor Office',
          action: 'Investigating Zachary\'s death, meeting with detective',
          duration: 300,
          securityLevel: 'High'
        },
        {
          timeStart: 300,
          location: 'Graveyard',
          action: 'Visiting Zachary\'s grave',
          duration: 90,
          securityLevel: 'Medium'
        }
      ],
      vulnerabilities: ['Push from balcony', 'Poisoned tea', 'Exploding photography equipment', 'Greenhouse explosion']
    },
    {
      id: 'case_file',
      name: 'The Carlisle Case File',
      description: 'Sensitive information on Arthur Edwards, located within Thornbridge Manor.',
      locations: ['Thornbridge Manor Office Safe', 'Butler\'s Office Safe', 'Off-site pickup'],
      routines: [
        {
          timeStart: 0,
          location: 'Alexa Carlisle\'s Office',
          action: 'Secured in safe',
          duration: 9999,
          securityLevel: 'High'
        }
      ],
      vulnerabilities: ['Safe combination', 'Accusation in murder mystery', 'Secret token retrieval']
    }
  ],
  disguises: [
    {
      id: 'detective',
      name: 'Private Investigator',
      accessAreas: ['Most of Thornbridge Manor', 'Family Rooms'],
      restrictedAreas: ['Alexa Carlisle\'s Office (without specific access)'],
      obtainMethod: 'Subdue the private investigator near the main gate or inside the manor',
      suspiciousTo: ['Alexa Carlisle (if she sees you take it)']
    },
    {
      id: 'butler',
      name: 'Butler',
      accessAreas: ['Thornbridge Manor (staff areas, some family rooms)'],
      restrictedAreas: ['Alexa Carlisle\'s Office', 'Security Rooms'],
      obtainMethod: 'Subdue Mr. Fernsby or another butler',
      suspiciousTo: ['Other Butlers', 'Alexa Carlisle (if spotted doing suspicious acts)']
    },
    {
      id: 'bodyguard_dartmoor',
      name: 'Bodyguard (Dartmoor)',
      accessAreas: ['Most areas', 'Security Rooms', 'Graveyard'],
      restrictedAreas: ['Alexa Carlisle\'s Office'],
      obtainMethod: 'Subdue bodyguards patrolling the manor',
      suspiciousTo: ['Other Bodyguards', 'Alexa Carlisle']
    },
    {
      id: 'photographer',
      name: 'Photographer',
      accessAreas: ['Outdoor areas', 'Fountain area', 'Greenhouse'],
      restrictedAreas: ['Inside Manor'],
      obtainMethod: 'Subdue the photographer near the fountain',
      suspiciousTo: ['Event Organizers', 'Other Photographers']
    },
    {
      id: 'gardener_dartmoor',
      name: 'Gardener (Dartmoor)',
      accessAreas: ['Gardens', 'Greenhouse', 'Outskirts of Manor'],
      restrictedAreas: ['Inside Manor'],
      obtainMethod: 'Subdue gardeners in the grounds',
      suspiciousTo: ['Other Gardeners']
    }
  ],
  weapons: [
    {
      id: 'cane',
      name: 'Cane',
      type: 'Melee',
      concealable: false,
      locations: ['Emma and Gregory\'s room']
    },
    {
      id: 'poison_dartmoor',
      name: 'Lethal Poison Vial',
      type: 'Poison',
      concealable: true,
      locations: ['Greenhouse (after crafting)']
    },
    {
      id: 'wrench_dartmoor',
      name: 'Wrench',
      type: 'Melee',
      concealable: true,
      locations: ['Greenhouse']
    }
  ],
  opportunities: [
    {
      id: 'means_motive_and_opportunity',
      name: 'Means, Motive, and Opportunity',
      description: 'Solve the murder mystery as the private investigator to get close to Alexa Carlisle.',
      steps: [
        'Subdue the private investigator and take his disguise',
        'Investigate Zachary Carlisle\'s death',
        'Accuse the correct murderer (or frame someone)',
        'Receive the case file and an opportunity to eliminate Alexa'
      ],
      requiredDisguise: 'detective',
      difficulty: 'Hard'
    },
    {
      id: 'a_day_to_remember',
      name: 'A Day to Remember',
      description: 'Sabotage the photography equipment to eliminate Alexa Carlisle.',
      steps: [
        'Subdue the photographer and take his disguise',
        'Gather components for the flash setup',
        'Tamper with the electrical wiring near the fountain',
        'Wait for Alexa Carlisle to pose for the photo'
      ],
      requiredDisguise: 'photographer',
      difficulty: 'Medium'
    },
    {
      id: 'her_final_resting_place',
      name: 'Her Final Resting Place',
      description: 'Arrange for Alexa Carlisle to visit the family graveyard for a private elimination.',
      steps: [
        'Deal with the crows in the graveyard (e.g., shoot nests)',
        'Inform Alexa Carlisle about the "prepared" gravesite',
        'Wait for her to arrive at the graveyard',
        'Eliminate her in a secluded manner'
      ],
      requiredDisguise: 'gardener_dartmoor', // Or other staff to interact with her
      difficulty: 'Medium'
    }
  ],
  challenges: [
    {
      id: 'silent_assassin_dartmoor',
      name: 'Silent Assassin',
      description: 'Complete the mission as Silent Assassin.',
      type: 'Classics',
      xpReward: 5000,
      requirements: ['No detections', 'No non-target kills', 'No bodies found', 'Targets eliminated']
    },
    {
      id: 'chameleon_dartmoor',
      name: 'Chameleon',
      description: 'Find and equip all unique disguises in Dartmoor.',
      type: 'Discovery',
      xpReward: 2000,
      requirements: ['Collect all unique disguises']
    },
    {
      id: 'a_matter_of_justice',
      name: 'A Matter of Justice',
      description: 'Accuse the real murderer in "Means, Motive, and Opportunity".',
      type: 'Feats',
      xpReward: 1500,
      requirements: ['Complete "Means, Motive, and Opportunity" correctly accusing Emma Carlisle']
    }
  ],
  mastery: [
    {
      level: 5,
      unlock: 'Remote EMP Device (Fragile)',
      type: 'Equipment',
      description: 'A single-use remote EMP device.'
    },
    {
      level: 10,
      unlock: 'Classic Cut Throat (Melee)',
      type: 'Weapon',
      description: 'A classic straight razor for silent melee kills.'
    },
    {
      level: 15,
      unlock: 'Private Investigator Starting Location',
      type: 'Starting Location',
      description: 'Begin the mission as the Private Investigator, arriving at the manor gate.'
    },
    {
      level: 20,
      unlock: 'Wrench',
      type: 'Equipment',
      description: 'A tool for sabotaging various objects.'
    }
  ]
} as const;


// Mission collections for easy iteration
export const MISSIONS: readonly Mission[] = [
  PARIS_MISSION,
  SAPIENZA_MISSION,
  DUBAI_MISSION,
  DARTMOOR_MISSION
] as const;

// Initialize lookup maps for O(1) access
MISSIONS.forEach(mission => {
  MISSION_LOOKUP.set(mission.id, mission);
  mission.targets.forEach(target => TARGET_LOOKUP.set(target.id, target));
  mission.disguises.forEach(disguise => DISGUISE_LOOKUP.set(disguise.id, disguise));
  mission.weapons.forEach(weapon => WEAPON_LOOKUP.set(weapon.id, weapon));
  mission.opportunities.forEach(opportunity => OPPORTUNITY_LOOKUP.set(opportunity.id, opportunity));
  mission.challenges.forEach(challenge => CHALLENGE_LOOKUP.set(challenge.id, challenge));
  mission.mastery.forEach(masteryUnlock => {
    MASTERY_UNLOCK_LOOKUP.set(masteryUnlock.unlock, masteryUnlock);
    // If it's a starting location, add to that specific lookup as well
    if (masteryUnlock.type === 'Starting Location') {
      STARTING_LOCATION_LOOKUP.set(masteryUnlock.unlock, {
        id: masteryUnlock.unlock.replace(/\s/g, '_').toLowerCase(), // Simple ID generation
        name: masteryUnlock.unlock,
        description: masteryUnlock.description,
        location: mission.location, // Associate with mission location
        unlockLevel: masteryUnlock.level,
        availableDisguise: masteryUnlock.unlock.includes('Disguise') || masteryUnlock.unlock.includes('Staff') || masteryUnlock.unlock.includes('Investigator') ? masteryUnlock.unlock.split(' ')[0].toLowerCase() : undefined // Basic guess for disguise
      });
    }
  });
});

// Utility functions for efficient data access
export const getMissionById = (id: string): Mission | undefined => MISSION_LOOKUP.get(id);
export const getTargetById = (id: string): Target | undefined => TARGET_LOOKUP.get(id);
export const getDisguiseById = (id: string): Disguise | undefined => DISGUISE_LOOKUP.get(id);
export const getWeaponById = (id: string): Weapon | undefined => WEAPON_LOOKUP.get(id);
export const getOpportunityById = (id: string): Opportunity | undefined => OPPORTUNITY_LOOKUP.get(id);
export const getChallengeById = (id: string): Challenge | undefined => CHALLENGE_LOOKUP.get(id);
export const getMasteryUnlockByName = (name: string): MasteryUnlock | undefined => MASTERY_UNLOCK_LOOKUP.get(name);
export const getStartingLocationById = (id: string): StartingLocation | undefined => STARTING_LOCATION_LOOKUP.get(id);


export const getMissionsByDifficulty = (difficulty: Mission['difficulty']): readonly Mission[] =>
  MISSIONS.filter(mission => mission.difficulty === difficulty);

export const getOpportunitiesByDifficulty = (difficulty: Opportunity['difficulty']): Opportunity[] =>
  MISSIONS.flatMap(mission => mission.opportunities.filter(opp => opp.difficulty === difficulty));

export const getChallengesByType = (type: Challenge['type']): readonly Challenge[] =>
  MISSIONS.flatMap(mission => mission.challenges.filter(challenge => challenge.type === type));


// Type guards for runtime safety
export const isMission = (obj: unknown): obj is Mission =>
  typeof obj === 'object' && obj !== null && 'id' in obj && 'name' in obj && 'location' in obj;

export const isTarget = (obj: unknown): obj is Target =>
  typeof obj === 'object' && obj !== null && 'id' in obj && 'name' in obj && 'description' in obj;

export const isDisguise = (obj: unknown): obj is Disguise =>
  typeof obj === 'object' && obj !== null && 'id' in obj && 'name' in obj && 'accessAreas' in obj;

export const isWeapon = (obj: unknown): obj is Weapon =>
  typeof obj === 'object' && obj !== null && 'id' in obj && 'name' in obj && 'type' in obj;

export const isOpportunity = (obj: unknown): obj is Opportunity =>
  typeof obj === 'object' && obj !== null && 'id' in obj && 'name' in obj && 'description' in obj;

export const isChallenge = (obj: unknown): obj is Challenge =>
  typeof obj === 'object' && obj !== null && 'id' in obj && 'name' in obj && 'description' in obj;

export const isMasteryUnlock = (obj: unknown): obj is MasteryUnlock =>
  typeof obj === 'object' && obj !== null && 'level' in obj && 'unlock' in obj && 'type' in obj;

export const isStartingLocation = (obj: unknown): obj is StartingLocation =>
  typeof obj === 'object' && obj !== null && 'id' in obj && 'name' in obj && 'location' in obj;

// Constants for commonly used values
export const DIFFICULTY_LEVELS = ['Novice', 'Professional', 'Master'] as const;
export const WEAPON_TYPES = ['Firearm', 'Melee', 'Explosive', 'Poison', 'Accident', 'Thrown'] as const;
export const SECURITY_LEVELS = ['Low', 'Medium', 'High'] as const;
export const CHALLENGE_TYPES = ['Assassination', 'Discovery', 'Feats', 'Targets', 'Classics'] as const;
export const MASTERY_UNLOCK_TYPES = ['Weapon', 'Equipment', 'Starting Location', 'Agency Pickup', 'Suit'] as const;