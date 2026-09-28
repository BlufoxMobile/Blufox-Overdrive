export const DRIVERS = [
{name:'Blu',title:'THE ORIGINAL',desc:'The face of the grid. A balanced ride with a fearless streak.',color:0x159cff,accent:0x71faff,speed:4,handling:4,accel:4,style:'goggles'},
{name:'Nova',title:'NIGHT RUNNER',desc:'Violet energy. Razor-sharp cornering. Owns the midnight circuit.',color:0x9e61ff,accent:0xff94df,speed:3,handling:5,accel:4,style:'visor'},
{name:'Knox',title:'THE WILDCARD',desc:'Small kart, huge ambition. Quick off the line and into the action.',color:0xffc344,accent:0xffffff,speed:3,handling:4,accel:5,style:'cap'},
{name:'Frost',title:'ICE IN THE VEINS',desc:'Cool under pressure. Smooth control when the road gets slippery.',color:0xc6e9ff,accent:0x43c8ff,speed:3,handling:5,accel:4,style:'hood'},
{name:'Blaze',title:'FULL THROTTLE',desc:'Built for the straightaway. Hit the apex, then let it rip.',color:0xff6243,accent:0xffd845,speed:5,handling:3,accel:4,style:'mohawk'},
{name:'Glitch',title:'SIGNAL BREAKER',desc:'A little unpredictable. A lot of acceleration. Always in the mix.',color:0x48e3ae,accent:0xd7ff63,speed:4,handling:3,accel:5,style:'headphones'},
{name:'Onyx',title:'HEAVY HITTER',desc:'A heavyweight machine with serious top-end speed.',color:0x495273,accent:0xff6aba,speed:5,handling:4,accel:3,style:'helmet'},
{name:'Pixel',title:'CORNER QUEEN',desc:'Electric pink, precise lines, and no wasted movement.',color:0xff6fbc,accent:0x73ffff,speed:4,handling:5,accel:3,style:'crown'}
];
export const TRACKS = [
{name:'Chicago Afterglow',theme:'NEON CITY',difficulty:'Easy',desc:'Sweeping turns beneath the electric skyline.',sky:0x080c27,fog:0x152246,road:0x18233b,ground:0x080e23,neon:0x42e8ff,secondary:0xaa5cff,radius:225,shape:0,hill:4,grip:1,seed:31},
{name:'Xfinity Megastore',theme:'RETAIL REMIX',difficulty:'Medium',desc:'A supersized showroom. Every aisle is a racing line.',sky:0x151024,fog:0x25213e,road:0x292639,ground:0x131223,neon:0xba76ff,secondary:0x67efff,radius:205,shape:1,hill:2,grip:1,seed:76},
{name:'Lakefront Rush',theme:'COASTAL RUN',difficulty:'Easy',desc:'Blue water, banked bends, and a golden horizon.',sky:0x74b5ce,fog:0x8ecbd4,road:0x334958,ground:0x21667f,neon:0x62fff4,secondary:0xffce79,radius:220,shape:2,hill:8,grip:1,seed:47},
{name:'Frostbyte Summit',theme:'ALPINE ICE',difficulty:'Hard',desc:'Slippery corners high above the cloud line.',sky:0x718cae,fog:0xb6d6e7,road:0x7699ac,ground:0x7691b0,neon:0xaaf6ff,secondary:0x6c8cff,radius:205,shape:3,hill:18,grip:.7,seed:23},
{name:'Signal Canyon',theme:'DESERT HEAT',difficulty:'Medium',desc:'Rolling elevation through an illuminated red-rock canyon.',sky:0x3a1832,fog:0x773c4f,road:0x45333e,ground:0x642f36,neon:0xffb258,secondary:0xff5579,radius:220,shape:4,hill:13,grip:.92,seed:95},
{name:'Gigabit Galaxy',theme:'ORBITAL CIRCUIT',difficulty:'Hard',desc:'An elevated circuit with tight bends in deep space.',sky:0x020315,fog:0x090c2b,road:0x161830,ground:0x020314,neon:0xb784ff,secondary:0x53f7ff,radius:205,shape:5,hill:20,grip:.92,seed:52}
];
export const ITEMS = [
{name:'GIG BOOST',icon:'»',description:'A burst of extra speed.'},
{name:'xFI SHIELD',icon:'◈',description:'Blocks hits for seven seconds.'},
{name:'XB8 MODEM',icon:'▮',description:'Throw it ahead — it hunts the kart in front of you.'},
{name:'DEAD ZONE',icon:'⊗',description:'Drops a trap behind your kart.'}
];
export const mod=(v,n)=>((v%n)+n)%n;
export function trackPoint(track,t){const a=t*Math.PI*2;let r=track.radius;const s=track.shape;r*=1+.15*Math.sin((s%3+2)*a+.6*s)+.07*Math.cos(5*a+s);let x=Math.sin(a)*r,z=Math.cos(a)*r;if(s===1)x*=1.2;if(s===2)z*=.83;if(s===4)x+=35*Math.sin(a*2);return {x,y:12+track.hill*(Math.sin(a*2+s)*.6+Math.sin(a*3)*.4),z};}
