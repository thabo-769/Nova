import { CategoryItem, MenuItem, TableInfo, DateNightPackage, Promotion, LoyaltyReward, UserProfile, Order, Reservation } from '@/types';

export const CATEGORIES: CategoryItem[] = [
  { id: 'all', name: 'Full Menu', description: 'Explore our complete culinary offerings', iconName: 'Utensils' },
  { id: 'starters', name: 'Starters', description: 'Appetizers and palate awakeners', iconName: 'Soup' },
  { id: 'mains', name: 'Main Courses', description: 'Chef crafted hearty centerpieces', iconName: 'Flame' },
  { id: 'grills', name: 'Flame Grills', description: 'Aged steaks and charcoal roasted cuts', iconName: 'Beef' },
  { id: 'burgers', name: 'Gourmet Burgers', description: 'Wagyu and house-ground brioche burgers', iconName: 'Sandwich' },
  { id: 'pizza', name: 'Woodfired Pizza', description: 'Stone-baked artisan pizzas', iconName: 'Pizza' },
  { id: 'chicken', name: 'Nova Chicken', description: 'Flame-roasted piri piri & crisp cuts', iconName: 'Drumstick' },
  { id: 'breakfast', name: 'Breakfast & Brunch', description: 'Artisanal morning delights', iconName: 'Egg' },
  { id: 'salads', name: 'Crisp Salads', description: 'Farm-to-table organic greens', iconName: 'Salad' },
  { id: 'desserts', name: 'Desserts', description: 'Decadent sweet endings', iconName: 'Cake' },
  { id: 'drinks', name: 'Cocktails & Wine', description: 'Signature mixology and curated cellars', iconName: 'Wine' },
  { id: 'specials', name: "Chef's Specials", description: 'Exclusive seasonal creations', iconName: 'Sparkles' },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'item-1',
    name: '28-Day Dry-Aged Ribeye Steak',
    description: 'Prime 350g Zimbabwean beef cut, seared over Bulawayo thorn charcoal, crowned with black truffle butter, roasted bone marrow jus, and triple-cooked rosemary sea salt chips.',
    price: 32.50,
    categoryId: 'grills',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop',
    ingredients: ['Zimbabwean Dry Aged Ribeye', 'Black Truffle Compound Butter', 'Rosemary', 'Bone Marrow Jus', 'Hand-cut Chips'],
    portionSizes: [
      { name: 'Standard Cut (350g)', priceDelta: 0 },
      { name: 'Tomahawk Reserve (650g)', priceDelta: 18.00 }
    ],
    customizations: [
      {
        id: 'doneness',
        name: 'Preparation Temp',
        options: [
          { label: 'Rare', extraPrice: 0 },
          { label: 'Medium Rare (Recommended)', extraPrice: 0 },
          { label: 'Medium', extraPrice: 0 },
          { label: 'Well Done', extraPrice: 0 }
        ],
        required: true,
        maxSelect: 1
      },
      {
        id: 'sauce',
        name: 'Signature Sauce',
        options: [
          { label: 'Madagascar Green Peppercorn', extraPrice: 2.50 },
          { label: 'Chimichurri Herb Oil', extraPrice: 2.00 },
          { label: 'Creamy Forest Mushroom & Port', extraPrice: 3.00 }
        ],
        maxSelect: 2
      }
    ],
    dietary: ['gluten-free', 'chefs-special'],
    allergens: ['Dairy'],
    isAvailable: true,
    rating: 4.9,
    reviewsCount: 142,
    prepTimeMinutes: 25,
    featured: true,
    popular: true
  },
  {
    id: 'item-2',
    name: 'Flame-Kissed Piri Piri Half Chicken',
    description: 'Free-range chicken steeped for 24 hours in our secret Nova Diner bird’s eye chili, charred garlic, and lemon marinade. Served with charred lime and spiced yellow rice.',
    price: 18.00,
    categoryId: 'chicken',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=1000&auto=format&fit=crop',
    ingredients: ['Free-range chicken', 'African Birdseye chili', 'Garlic', 'Lemon zest', 'Yellow spiced rice'],
    portionSizes: [
      { name: 'Half Chicken', priceDelta: 0 },
      { name: 'Whole Chicken Feast', priceDelta: 12.00 }
    ],
    customizations: [
      {
        id: 'heat',
        name: 'Spice Level',
        options: [
          { label: 'Lemon & Herb Mild', extraPrice: 0 },
          { label: 'Signature Medium Fire', extraPrice: 0 },
          { label: 'Extra Bulawayo Inferno', extraPrice: 0 }
        ],
        required: true,
        maxSelect: 1
      }
    ],
    dietary: ['halal', 'gluten-free', 'spicy'],
    allergens: [],
    isAvailable: true,
    rating: 4.8,
    reviewsCount: 98,
    prepTimeMinutes: 20,
    featured: true,
    popular: true
  },
  {
    id: 'item-3',
    name: 'Gourmet Matopos Wagyu Burger',
    description: '220g freshly ground Wagyu beef patty, molten English cheddar, caramelized shallot and red onion jam, crisp streaky bacon, truffle aioli on a toasted artisan brioche bun.',
    price: 16.50,
    categoryId: 'burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop',
    ingredients: ['Wagyu Beef', 'Aged Cheddar', 'Brioche Bun', 'Onion Jam', 'Truffle Aioli', 'Pickles'],
    portionSizes: [
      { name: 'Single 220g Patty', priceDelta: 0 },
      { name: 'Double Stack (440g)', priceDelta: 6.50 }
    ],
    customizations: [
      {
        id: 'sides',
        name: 'Choose Your Side',
        options: [
          { label: 'Seasoned French Fries', extraPrice: 0 },
          { label: 'Truffle Parmesan Fries', extraPrice: 3.00 },
          { label: 'Sweet Potato Fries', extraPrice: 2.00 },
          { label: 'Nova Caesar Side Salad', extraPrice: 2.50 }
        ],
        required: true,
        maxSelect: 1
      }
    ],
    dietary: ['chefs-special'],
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    isAvailable: true,
    rating: 4.9,
    reviewsCount: 215,
    prepTimeMinutes: 15,
    popular: true
  },
  {
    id: 'item-4',
    name: 'Pan-Seared Zambezi Bream Fillet',
    description: 'Crisp-skinned fresh bream fillet caught sustainably from the Zambezi river, resting on a bed of crushed baby potatoes with caper beurre blanc and micro-greens.',
    price: 24.00,
    categoryId: 'mains',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1000&auto=format&fit=crop',
    ingredients: ['Fresh Zambezi Bream', 'Baby potatoes', 'Capers', 'Lemon Butter Sauce', 'Dill'],
    dietary: ['halal', 'gluten-free'],
    allergens: ['Fish', 'Dairy'],
    isAvailable: true,
    rating: 4.7,
    reviewsCount: 76,
    prepTimeMinutes: 22,
    featured: true
  },
  {
    id: 'item-5',
    name: 'Artisan Biltong & Avocado Woodfired Pizza',
    description: 'Hand-stretched sourdough base, San Marzano tomato reduction, fior di latte mozzarella, cured lean Zimbabwean beef biltong ribbons, fresh avocado, rocket, and balsamic glaze.',
    price: 19.50,
    categoryId: 'pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop',
    ingredients: ['Sourdough base', 'San Marzano tomatoes', 'Mozzarella', 'Beef Biltong', 'Fresh Avocado', 'Wild Rocket'],
    customizations: [
      {
        id: 'crust',
        name: 'Crust Style',
        options: [
          { label: 'Traditional Thin Neapolitan', extraPrice: 0 },
          { label: 'Stuffed Cheese Crust', extraPrice: 3.50 }
        ],
        maxSelect: 1
      }
    ],
    dietary: ['chefs-special'],
    allergens: ['Gluten', 'Dairy'],
    isAvailable: true,
    rating: 4.8,
    reviewsCount: 164,
    prepTimeMinutes: 18,
    popular: true
  },
  {
    id: 'item-6',
    name: 'Slow-Braised Karoo Lamb Shank',
    description: 'Fork-tender lamb shank simmered for 8 hours in rich Pinotage wine, root vegetables, and fresh thyme. Served atop velvet roasted garlic mashed potatoes.',
    price: 29.00,
    categoryId: 'mains',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop',
    ingredients: ['Karoo Lamb Shank', 'Pinotage Wine Jus', 'Carrots', 'Thyme', 'Garlic Mashed Potatoes'],
    dietary: ['gluten-free'],
    allergens: ['Dairy'],
    isAvailable: true,
    rating: 5.0,
    reviewsCount: 88,
    prepTimeMinutes: 25,
    featured: true
  },
  {
    id: 'item-7',
    name: 'Nova Truffle Wild Mushroom Risotto',
    description: 'Creamy Carnaroli rice slowly cooked with wild porcini, king oyster mushrooms, aged Parmigiano Reggiano, and finished with fragrant white truffle oil.',
    price: 21.00,
    categoryId: 'mains',
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?q=80&w=1000&auto=format&fit=crop',
    ingredients: ['Carnaroli Rice', 'Wild Porcini', 'King Oyster Mushrooms', 'Parmigiano Reggiano', 'White Truffle Oil'],
    dietary: ['vegetarian', 'gluten-free'],
    allergens: ['Dairy'],
    isAvailable: true,
    rating: 4.6,
    reviewsCount: 53,
    prepTimeMinutes: 20
  },
  {
    id: 'item-8',
    name: 'Golden Calamari Fritti',
    description: 'Tender baby squid dusted in seasoned polenta, flash-fried to golden perfection. Served with caper garlic emulsion and grilled lemon wedge.',
    price: 13.50,
    categoryId: 'starters',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?q=80&w=1000&auto=format&fit=crop',
    ingredients: ['Baby Squid', 'Polenta crust', 'Garlic emulsion', 'Lemon', 'Smoked paprika'],
    dietary: ['halal'],
    allergens: ['Seafood', 'Eggs'],
    isAvailable: true,
    rating: 4.7,
    reviewsCount: 67,
    prepTimeMinutes: 12
  },
  {
    id: 'item-9',
    name: 'Burrata Caprese Royale',
    description: 'Creamy whole Italian burrata ball surrounded by heirloom tomatoes, fresh basil leaves, 12-year aged Modena balsamic caviar, and crisp herb crostini.',
    price: 15.00,
    categoryId: 'starters',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?q=80&w=1000&auto=format&fit=crop',
    ingredients: ['Burrata cheese', 'Heirloom tomatoes', 'Basil', 'Balsamic glaze', 'Olive oil'],
    dietary: ['vegetarian'],
    allergens: ['Dairy', 'Gluten'],
    isAvailable: true,
    rating: 4.8,
    reviewsCount: 45,
    prepTimeMinutes: 10
  },
  {
    id: 'item-10',
    name: 'Molten Belgian Chocolate Lava Cake',
    description: 'Decadent warm dark chocolate fondant with a flowing warm center, paired with house-churned Madagascar vanilla bean gelato and gold leaf crumb.',
    price: 11.50,
    categoryId: 'desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1000&auto=format&fit=crop',
    ingredients: ['70% Belgian Dark Chocolate', 'Madagascar Vanilla Bean Gelato', 'Butter', 'Eggs', '24k Edible Gold Leaf'],
    dietary: ['vegetarian', 'chefs-special'],
    allergens: ['Dairy', 'Eggs', 'Gluten'],
    isAvailable: true,
    rating: 4.9,
    reviewsCount: 180,
    prepTimeMinutes: 15,
    featured: true,
    popular: true
  },
  {
    id: 'item-11',
    name: 'Passionfruit & White Chocolate Cheesecake',
    description: 'Velvety baked New York style cheesecake infused with Zimbabwean passionfruit coulis on a buttery ginger biscuit crust.',
    price: 9.50,
    categoryId: 'desserts',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1000&auto=format&fit=crop',
    ingredients: ['Cream cheese', 'White Chocolate', 'Passionfruit curd', 'Ginger crust'],
    dietary: ['vegetarian'],
    allergens: ['Dairy', 'Gluten'],
    isAvailable: true,
    rating: 4.7,
    reviewsCount: 92,
    prepTimeMinutes: 10
  },
  {
    id: 'item-12',
    name: 'Bulawayo Sunset Gold Cocktail',
    description: 'Nova signature cocktail: Premium bourbon, fresh blood orange juice, artisanal passionfruit puree, wild honey syrup, topped with sparkling Prosecco and edible gold dust.',
    price: 12.00,
    categoryId: 'drinks',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop',
    ingredients: ['Bourbon', 'Blood Orange', 'Passionfruit', 'Prosecco', 'Edible Gold Dust'],
    portionSizes: [
      { name: 'Standard Glass', priceDelta: 0 },
      { name: 'Carafe for Two', priceDelta: 10.00 }
    ],
    dietary: ['vegan'],
    allergens: [],
    isAvailable: true,
    rating: 4.9,
    reviewsCount: 130,
    prepTimeMinutes: 5,
    featured: true
  },
  {
    id: 'item-13',
    name: 'Avocado Tartine with Poached Farm Eggs',
    description: 'Artisanal seeded sourdough toast, crushed ripe avocado, two pasture-raised poached eggs, marinated Danish feta, dukkah spice crunch, and micro cilantro.',
    price: 12.50,
    categoryId: 'breakfast',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1000&auto=format&fit=crop',
    ingredients: ['Seeded Sourdough', 'Ripe Avocado', 'Farm Eggs', 'Feta', 'Egyptian Dukkah'],
    dietary: ['vegetarian'],
    allergens: ['Gluten', 'Eggs', 'Dairy', 'Nuts'],
    isAvailable: true,
    rating: 4.8,
    reviewsCount: 74,
    prepTimeMinutes: 12
  },
  {
    id: 'item-14',
    name: 'The Royal Nova Full English Breakfast',
    description: 'Two eggs cooked your way, Cumberland beef sausages, thick-cut smoked bacon, grilled portobello mushrooms, slow-roasted vine tomatoes, hash browns, and house sourdough.',
    price: 15.00,
    categoryId: 'breakfast',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=1000&auto=format&fit=crop',
    ingredients: ['Free-range eggs', 'Beef sausages', 'Smoked bacon', 'Portobello mushrooms', 'Hash browns'],
    dietary: ['halal'],
    allergens: ['Gluten', 'Eggs'],
    isAvailable: true,
    rating: 4.9,
    reviewsCount: 112,
    prepTimeMinutes: 15,
    popular: true
  }
];

export const TABLES: TableInfo[] = [
  { id: 'tbl-1', number: 1, capacity: 2, section: 'window', isAvailable: true },
  { id: 'tbl-2', number: 2, capacity: 2, section: 'window', isAvailable: true },
  { id: 'tbl-3', number: 3, capacity: 4, section: 'indoor', isAvailable: true },
  { id: 'tbl-4', number: 4, capacity: 4, section: 'indoor', isAvailable: true },
  { id: 'tbl-5', number: 5, capacity: 6, section: 'indoor', isAvailable: true },
  { id: 'tbl-6', number: 6, capacity: 2, section: 'patio', isAvailable: true },
  { id: 'tbl-7', number: 7, capacity: 2, section: 'patio', isAvailable: true },
  { id: 'tbl-8', number: 8, capacity: 4, section: 'patio', isAvailable: true },
  { id: 'tbl-9', number: 9, capacity: 2, section: 'vip', isAvailable: true },
  { id: 'tbl-10', number: 10, capacity: 4, section: 'vip', isAvailable: true },
  { id: 'tbl-11', number: 11, capacity: 8, section: 'vip', isAvailable: true },
  { id: 'tbl-12', number: 12, capacity: 12, section: 'indoor', isAvailable: true },
];

export const DATE_NIGHT_PACKAGES: DateNightPackage[] = [
  {
    id: 'pkg-1',
    title: 'The Matopos Starlight Romance',
    subtitle: 'An intimate 3-course private dining experience for two',
    price: 85.00,
    description: 'Designed for unforgettable romantic evenings. Includes a secluded table adorned with fresh red velvet rose petals, flickering crystal candlelight, two glasses of French bubbly, a shared luxury starter, two signature main courses, and our Molten Lava Cake with customized chocolate plate lettering.',
    includes: [
      'Private candlelit table with fresh rose petals',
      'Welcome toast of chilled Sparkling Wine or Mocktail',
      'Shared Burrata Caprese or Calamari Fritti starter',
      'Choice of any 2 Main Courses (including Ribeye Steak & Zambezi Bream)',
      'Shared Molten Lava Cake with custom written message',
      'Personalized table music request & dedicated server'
    ],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop',
    isPopular: true
  },
  {
    id: 'pkg-2',
    title: 'Anniversary Royal Celebration',
    subtitle: 'Commemorate your love in grand luxury',
    price: 130.00,
    description: 'The pinnacle of fine dining celebrations. Enjoy a VIP booth with bespoke floral centerpieces, a bottle of premium sparkling wine on ice, a 4-course chef tasting menu, and an exquisite miniature anniversary celebration cake crafted by our pastry chef.',
    includes: [
      'VIP secluded booth reservation',
      'Chilled full bottle of sparkling wine or artisanal non-alcoholic bubbly',
      '4-Course bespoke culinary journey crafted by Executive Chef',
      'Artisan floral bouquet prepared for your partner',
      'Commemorative miniature Nova celebration cake',
      'Souvenir printed menu with custom couple message'
    ],
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'pkg-3',
    title: 'The Nova Forever Proposal Package',
    subtitle: 'The perfect stage for the most important question',
    price: 195.00,
    description: 'Discreet and masterfully coordinated. We coordinate the surprise timing, romantic floral archway or backdrop, live acoustic violinist performance during the question, champagne toast, and professional photographer coordination.',
    includes: [
      'Discreet coordination with Nova Diner Maitre D’',
      'Luxury floral archway & red carpet arrival on the Patio',
      'Live acoustic violinist for the proposal moment',
      'Vintage Champagne toast & chocolate dipped strawberries',
      'Private 4-course dinner for two',
      'Custom framed table souvenir menu'
    ],
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1000&auto=format&fit=crop'
  }
];

export const PROMOTIONS: Promotion[] = [
  {
    id: 'promo-1',
    code: 'NOVAGOLD',
    title: '15% Off Your Royal Feast',
    subtitle: 'Apply code at checkout for 15% off orders above $30',
    discountPercent: 15,
    minSpend: 30,
    validUntil: '2026-12-31',
    bannerImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    active: true
  },
  {
    id: 'promo-2',
    code: 'BULAWAYO',
    title: 'Free Chef’s Dessert Today',
    subtitle: 'Complimentary dessert with any order over $40',
    discountPercent: 10,
    minSpend: 40,
    validUntil: '2026-12-31',
    bannerImage: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1200&auto=format&fit=crop',
    active: true
  }
];

export const LOYALTY_REWARDS: LoyaltyReward[] = [
  {
    id: 'rew-1',
    title: '$5 Off Any Order',
    pointsCost: 200,
    discountValue: 5.00,
    description: 'Redeem 200 points for an instant $5 discount on your meal.',
    iconName: 'BadgePercent'
  },
  {
    id: 'rew-2',
    title: 'Free Gourmet Burger',
    pointsCost: 500,
    discountValue: 16.50,
    description: 'Treat yourself to our Matopos Wagyu Burger on the house.',
    iconName: 'Sandwich'
  },
  {
    id: 'rew-3',
    title: '$25 Fine Dining Voucher',
    pointsCost: 1000,
    discountValue: 25.00,
    description: 'Enjoy a luxurious $25 deduction off your table bill or order.',
    iconName: 'Crown'
  },
  {
    id: 'rew-4',
    title: 'Complimentary Date Night Package Upgrade',
    pointsCost: 1800,
    discountValue: 50.00,
    description: 'Upgrade any Date Night booking with champagne and floral setup.',
    iconName: 'Sparkles'
  }
];

export const DEMO_USERS: Record<string, UserProfile> = {
  customer: {
    id: 'usr-tendai',
    name: 'Tendai Moyo',
    email: 'tendai.moyo@example.com',
    phone: '+263 77 123 4567',
    role: 'customer',
    photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    loyaltyPoints: 680,
    loyaltyTier: 'Silver',
    savedAddresses: [
      {
        id: 'addr-1',
        label: 'Home',
        street: '14 Burnside Road',
        suburb: 'Burnside',
        city: 'Bulawayo',
        notes: 'Ring bell at the black gate',
        isDefault: true
      },
      {
        id: 'addr-2',
        label: 'Office',
        street: 'Suite 4B, Bradfield Shopping Complex',
        suburb: 'Bradfield',
        city: 'Bulawayo',
        notes: 'Reception on 1st floor'
      }
    ],
    favoriteItemIds: ['item-1', 'item-3', 'item-10'],
    createdAt: '2024-01-15T10:00:00Z'
  },
  admin: {
    id: 'usr-admin-ndlovu',
    name: 'Sipho Ndlovu (General Manager)',
    email: 'admin@novadiner.co.zw',
    phone: '+263 71 987 6543',
    role: 'admin',
    photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    loyaltyPoints: 3400,
    loyaltyTier: 'Platinum',
    savedAddresses: [],
    favoriteItemIds: [],
    createdAt: '2023-08-01T08:00:00Z'
  },
  kitchen: {
    id: 'usr-chef-sibanda',
    name: 'Chef Dumisani Sibanda',
    email: 'kitchen@novadiner.co.zw',
    phone: '+263 73 555 4321',
    role: 'kitchen',
    photoURL: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=300&auto=format&fit=crop',
    loyaltyPoints: 0,
    loyaltyTier: 'Bronze',
    savedAddresses: [],
    favoriteItemIds: [],
    createdAt: '2023-09-10T08:00:00Z'
  }
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'NV-9821',
    userId: 'usr-tendai',
    customerName: 'Tendai Moyo',
    customerPhone: '+263 77 123 4567',
    customerEmail: 'tendai.moyo@example.com',
    items: [
      {
        cartItemId: 'c-1',
        menuItem: MENU_ITEMS[0],
        quantity: 1,
        selectedPortion: MENU_ITEMS[0].portionSizes?.[0],
        selectedCustomizations: { doneness: ['Medium Rare (Recommended)'], sauce: ['Madagascar Green Peppercorn'] },
        specialInstructions: 'Extra pepper on steak please',
        unitPrice: 35.00,
        totalPrice: 35.00
      },
      {
        cartItemId: 'c-2',
        menuItem: MENU_ITEMS[9],
        quantity: 1,
        selectedCustomizations: {},
        unitPrice: 11.50,
        totalPrice: 11.50
      }
    ],
    subtotal: 46.50,
    discount: 5.00,
    discountCode: 'NOVAGOLD',
    deliveryFee: 3.50,
    total: 45.00,
    orderType: 'delivery',
    deliveryAddress: {
      id: 'addr-1',
      label: 'Home',
      street: '14 Burnside Road',
      suburb: 'Burnside',
      city: 'Bulawayo',
      notes: 'Black gate'
    },
    paymentMethod: 'ecocash',
    paymentStatus: 'paid',
    paymentPhone: '0771234567',
    transactionReference: 'MP241113.1042.B0912',
    status: 'preparing',
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    estimatedDeliveryMinutes: 35,
    timeline: [
      { status: 'received', timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), note: 'Order received via online portal' },
      { status: 'confirmed', timestamp: new Date(Date.now() - 13 * 60 * 1000).toISOString(), note: 'EcoCash payment verified ($45.00)' },
      { status: 'preparing', timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(), note: 'Chef Sibanda is firing the grill' }
    ]
  },
  {
    id: 'ord-102',
    orderNumber: 'NV-9822',
    customerName: 'Chipo Dube',
    customerPhone: '+263 77 444 8888',
    customerEmail: 'chipo.dube@gmail.com',
    items: [
      {
        cartItemId: 'c-3',
        menuItem: MENU_ITEMS[2],
        quantity: 2,
        selectedCustomizations: { sides: ['Truffle Parmesan Fries'] },
        unitPrice: 19.50,
        totalPrice: 39.00
      }
    ],
    subtotal: 39.00,
    discount: 0,
    deliveryFee: 0,
    total: 39.00,
    orderType: 'pickup',
    collectionTime: '13:30 Today',
    paymentMethod: 'innbucks',
    paymentStatus: 'paid',
    transactionReference: 'INNB-8829-019',
    status: 'received',
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    estimatedDeliveryMinutes: 20,
    timeline: [
      { status: 'received', timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), note: 'Order placed for restaurant collection' }
    ]
  }
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'res-201',
    confirmationCode: 'NV-7782A',
    userId: 'usr-tendai',
    customerName: 'Tendai Moyo',
    customerPhone: '+263 77 123 4567',
    customerEmail: 'tendai.moyo@example.com',
    date: '2026-11-14',
    time: '19:30',
    guests: 2,
    seatingPreference: 'vip',
    tableId: 'tbl-9',
    tableNumber: 9,
    occasion: 'date_night',
    dateNightPackageId: 'pkg-1',
    dateNightPackageName: 'The Matopos Starlight Romance',
    specialRequests: 'Celebrating 2-year anniversary with velvet red roses setup.',
    customDecorations: ['Red Rose Petals', 'Candlelight Setup', 'Custom Written Plate'],
    status: 'confirmed',
    createdAt: '2026-11-12T14:20:00Z'
  },
  {
    id: 'res-202',
    confirmationCode: 'NV-9912C',
    customerName: 'Farai Katsande',
    customerPhone: '+263 71 332 1100',
    customerEmail: 'farai.k@company.co.zw',
    date: '2026-11-15',
    time: '20:00',
    guests: 6,
    seatingPreference: 'patio',
    tableId: 'tbl-8',
    tableNumber: 8,
    occasion: 'birthday',
    specialRequests: 'Please bring out dessert with birthday candles and sing.',
    status: 'confirmed',
    createdAt: '2026-11-13T09:10:00Z'
  }
];
