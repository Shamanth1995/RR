/* ==========================================================================
   Coorg River Rest — site content
   Everything a non-developer may want to change lives in this file.
   ========================================================================== */

/* --- Contact details --------------------------------------------------------
   Used everywhere on the page (header, enquiry form, location, footer).
   phones: `display` is how the number is shown; `number` is digits only with
           the country code (91 for India). Enquiries go to the first number
           unless the guest picks the other one.
   lat/lng: the map pin; mapsUrl: the "Open in Google Maps" link.
   Leave email or instagram as '' to hide them.
---------------------------------------------------------------------------- */
window.CONFIG = {
  name: 'Coorg River Rest',
  location: 'Coorg, Karnataka',
  address: 'Srimangala kutta kakoor post\nPonampet taluk Kodagu 571217',
  phones: [
    { display: '+91 84312 46215', number: '918431246215' },
    { display: '+91 77603 55115', number: '917760355115' },
  ],
  email: '',
  instagram: '',
  mapsUrl: 'https://maps.google.com/maps/search/Brahmagiri%20Sports%20Club/@11.991714477539062,76.0103530883789,17z?hl=en',
  lat: 11.991714477539062,
  lng: 76.0103530883789,
};

/* --- Rooms (carousel) ------------------------------------------------------ */
window.ROOMS = [
  {
    id: 'valley',
    name: 'Valley View Room',
    tag: 'Hill-facing',
    img: 'images/room-valley.jpg',
    alt: 'Bright room with a wide window looking onto forested hills, two chairs and a wooden table',
    blurb:
      'A wide picture window frames the forested hills. Pull the two chairs up to the live-edge wooden table and take your morning coffee with the whole valley in view.',
    facts: [
      { k: 'Bed', v: 'Double' },
      { k: 'Balcony', v: 'Hill view' },
      { k: 'Floor', v: 'Wooden' },
    ],
    features: ['Picture window', 'Sitting corner', 'Private bathroom'],
  },
  {
    id: 'laterite',
    name: 'Laterite Room',
    tag: 'Timber ceiling',
    img: 'images/room-laterite.jpg',
    alt: 'Room with deep red brick-textured walls, a sloping wooden ceiling, a double bed and a window nook',
    blurb:
      'Brick-textured walls in deep laterite red sit under a sloping timber ceiling. A sitting nook by the window opens onto the treetops, and the kettle is always within reach.',
    facts: [
      { k: 'Bed', v: 'Double' },
      { k: 'Balcony', v: 'Hill view' },
      { k: 'Ceiling', v: 'Vaulted timber' },
    ],
    features: ['Window nook', 'Tea & coffee kettle', 'Wall fan'],
  },
  {
    id: 'terracotta',
    name: 'Terracotta Room',
    tag: 'Warm & cosy',
    img: 'images/room-terracotta.jpg',
    alt: 'Room with terracotta brick walls, reading lamps and a double bed with teal linen',
    blurb:
      'Warm terracotta walls, reading lamps on either side of a wide double bed and soft teal linen. A quiet room to come back to after a day out in the hills.',
    facts: [
      { k: 'Bed', v: 'Double' },
      { k: 'Balcony', v: 'Hill view' },
      { k: 'Light', v: 'Reading lamps' },
    ],
    features: ['Tea & coffee kettle', 'Dressing mirror', 'Wall fan'],
  },
];

window.DORM = {
  id: 'dorm',
  name: 'Dormitory',
  body: 'For groups of friends and families travelling together, with its own hill-view balcony just like the rooms.',
};

window.BATHS = [
  { img: 'images/bath-leaf.jpg', thumb: 'images/thumbs/bath-leaf.jpg', alt: 'Tiled bathroom with a leaf-pattern feature wall, shower and fresh towels' },
  { img: 'images/bath-floral.jpg', thumb: 'images/thumbs/bath-floral.jpg', alt: 'Tiled bathroom in blue with a floral feature wall, shower and fresh towels' },
];

/* --- Services --------------------------------------------------------------- */
window.SERVICES = [
  { id: 'campfire', kicker: 'After dark', title: 'Campfire', img: 'images/campfire.jpg', alt: 'A round laterite fire pit burning under a tiled-roof shelter at night', body: 'Gather round the fire pit in our covered, laterite-walled campfire corner once the sun drops behind the hills.' },
  { id: 'bbq', kicker: 'Evenings', title: 'Barbecue', body: 'Barbecue nights in the open air: something sizzling on the grill and the stars coming out.' },
  { id: 'pool', kicker: 'Unwind', title: 'Nature pool', body: 'Cool off in our nature pool, wrapped in greenery and birdsong.' },
  { id: 'games', kicker: 'For everyone', title: 'Indoor & outdoor games', body: 'Games for kids and grown-ups alike, indoors on a misty afternoon or out on the lawn.' },
];

/* --- Nearby places -----------------------------------------------------------
   kind controls the illustration. Add a distance (e.g. '25 min drive') to show
   it as a tag on the card.
---------------------------------------------------------------------------- */
window.PLACES = [
  {
    id: 'nagarahole', kind: 'safari', type: 'Wildlife safari', distance: '',
    name: 'Nagarahole Wildlife Safari',
    body: 'Safaris through Nagarahole National Park, one of India’s best places to see wild elephants and gaur and, with luck, a leopard or tiger.',
  },
  {
    id: 'barapole', kind: 'river', type: 'Adventure', distance: '',
    name: 'Barapole River Rafting',
    body: 'White-water rafting down the forested Barapole valley, one of South India’s best-known runs and at its liveliest in and after the monsoon.',
  },
  {
    id: 'brahmagiri', kind: 'peak', type: 'Trek', distance: '',
    name: 'Brahmagiri Peak',
    body: 'A trek through shola forest and grassland to a summit on the Karnataka–Kerala border. Forest department permission is needed.',
  },
  {
    id: 'irpu', kind: 'falls', type: 'Waterfall', distance: '',
    name: 'Irpu Falls',
    body: 'The Lakshmana Tirtha river tumbles down the Brahmagiri hills here, reached by a short forest walk. It’s fullest just after the rains.',
  },
  {
    id: 'mrityunjaya', kind: 'temple', type: 'Temple', distance: '',
    name: 'Shri Mrityunjaya Swami Temple',
    body: 'A revered temple to Lord Shiva as Mrityunjaya, the conqueror of death, and a peaceful stop for an early-morning darshan.',
  },
  {
    id: 'glenlorna', kind: 'tea', type: 'Tea estate', distance: '',
    name: 'Glenlorna Tea Estate',
    body: 'One of Coorg’s few tea estates. Neat green rows roll over the hills, made for a slow walk and a lot of photographs.',
  },
  {
    id: 'thirunelli', kind: 'shrine', type: 'Temple', distance: '',
    name: 'Thirunelli Sree Maha Vishnu Temple',
    body: 'An ancient temple in the Brahmagiri hills, often called the “Kashi of the South”, beside the sacred Papanasini stream.',
  },
  {
    id: 'tholpetty', kind: 'deer', type: 'Wildlife sanctuary', distance: '',
    name: 'Tholpetty Wildlife Sanctuary',
    body: 'The northern range of Wayanad Wildlife Sanctuary. Morning and evening jeep safaris often turn up elephants, deer and gaur.',
  },
  {
    id: 'kuruva', kind: 'island', type: 'River island', distance: '',
    name: 'Kuruvadweep Island',
    body: 'A cluster of river islands on the Kabini, with bamboo groves and streams, crossed by bamboo raft. Entry is seasonal, so check before you go.',
  },
];

/* --- Gallery (order = display order) --------------------------------------- */
window.GALLERY = [
  { id: 'cottages-dusk', cap: 'The cottages at dusk', span: 'tall' },
  { id: 'hills-view', cap: 'Hill views over the coffee estate', span: '' },
  { id: 'restaurant', cap: 'The restaurant', span: 'tall' },
  { id: 'room-valley', cap: 'Valley View Room', span: '' },
  { id: 'campfire', cap: 'The campfire corner', span: 'tall' },
  { id: 'room-laterite', cap: 'Laterite Room', span: '' },
  { id: 'room-terracotta', cap: 'Terracotta Room', span: '' },
  { id: 'bath-leaf', cap: 'Private bathroom', span: '' },
  { id: 'bath-floral', cap: 'Private bathroom', span: '' },
];
