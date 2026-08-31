/**
 * Daily Automated Multi-Niche & Festival Trending Scraper & Catalog Builder
 * Features:
 * - Generates 30+ High-Demand Products for EACH of the 7 Store Categories (210+ items total)
 * - Modern High-Resolution E-Commerce Studio Packshots & Clean Branding
 * - Google Gemini 1.5 Flash AI Dynamic Generator (Batch / Category-Aware)
 * - Safe Comprehensive Fallback with 210+ Verified Indian Branded Products
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// ⭐ 1. ADMIN / BRAND PROMOTED PARTNERS
const PROMOTED_BRANDS_LIST = [
  {
    id: 'promo-amul-ghee',
    name: 'Amul Pure Cow Ghee 1L Tin (Pooja & Festive Sweets Essential)',
    brand: 'Amul',
    category: 'Dairy & Bakery',
    niche: 'Grocery & Essentials',
    unit: 'Tin',
    festivalTags: ['DIWALI', 'GANESH_CHATURTHI', 'HOLI', 'SANKRANTI', 'POOJA', 'FESTIVE_SWEETS'],
    isPromoted: true,
    promoBadge: '🪔 Festival Essential',
    source: 'Brand Direct',
    brandNote: 'Special Festive Supply: 100% pure cow ghee with high festive demand. 15% retailer margin.',
    brandContact: '+91 98765 43210',
    brandAddress: 'Amul Dairy Hub, Anand, Gujarat',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&q=80',
    stockCountHint: '#1 Festive Sweet Ingredient'
  },
  {
    id: 'promo-cadbury-celeb',
    name: 'Cadbury Celebrations Rich Dry Fruit & Chocolate Gift Box 250g',
    brand: 'Cadbury',
    category: 'Bakery & Confectionery',
    niche: 'Toys & Gift Items',
    unit: 'Box',
    festivalTags: ['DIWALI', 'RAKSHA_BANDHAN', 'GANESH_CHATURTHI', 'CHRISTMAS', 'FESTIVE_GIFTS'],
    isPromoted: true,
    promoBadge: '🎁 #1 Festive Gift',
    source: 'Brand Direct',
    brandNote: 'Festival bulk distributor lot. Top choice for Diwali, Rakhi & Corporate gifts.',
    brandContact: '+91 98200 44556',
    brandAddress: 'Mondelez Wholesale Distribution, Mumbai',
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400&q=80',
    stockCountHint: 'High Festive Turnout'
  },
  {
    id: 'promo-tata-dal',
    name: 'Tata Sampann Unpolished Super Toor Dal 1kg',
    brand: 'Tata Sampann',
    category: 'Grocery & Essentials',
    niche: 'Grocery & Essentials',
    unit: 'kg',
    isPromoted: true,
    promoBadge: '🔥 High Margin',
    source: 'Brand Direct',
    brandNote: 'Direct mill stock available. Free doorstep delivery for kirana stores.',
    brandContact: '+91 98230 11223',
    brandAddress: 'Tata Consumer Wholesale Hub, Mumbai',
    image: 'https://images.unsplash.com/photo-1585994192701-f1a505c8574a?w=400&q=80',
    stockCountHint: 'Verified Brand Launch'
  },
  {
    id: 'promo-archies-gift',
    name: 'Archies Luxury Festive Greeting & Gift Hampers (Pack of 5)',
    brand: 'Archies',
    category: 'Toys & Gift Items',
    niche: 'Toys & Gift Items',
    unit: 'Box',
    festivalTags: ['DIWALI', 'RAKSHA_BANDHAN', 'CHRISTMAS', 'FESTIVE_GIFTS'],
    isPromoted: true,
    promoBadge: '⭐ Authorized Distributor',
    source: 'Brand Direct',
    brandNote: 'Festive season discount: 35% margin for gift and stationery shops.',
    brandContact: '+91 99887 76655',
    brandAddress: 'Archies Gift Distribution Center, Delhi',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&q=80',
    stockCountHint: 'Exclusive Gift Partner'
  },
  {
    id: 'promo-vanheusen-tee',
    name: 'Van Heusen Classic Cotton Round Neck T-Shirt (Pack of 3)',
    brand: 'Van Heusen',
    category: 'Apparel & Clothing',
    niche: 'Apparel & Clothing',
    unit: 'Pkt',
    isPromoted: true,
    promoBadge: '⭐ Top Brand',
    source: 'Brand Direct',
    brandNote: 'Wholesale lot available for garment retailers. All standard sizes (M, L, XL).',
    brandContact: '+91 97112 33445',
    brandAddress: 'Aditya Birla Fashion Wholesale, Bengaluru',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&q=80',
    stockCountHint: 'Garment Bestseller'
  }
];

// 📦 COMPREHENSIVE 30+ ITEMS PER CATEGORY MASTER BASELINE
const MASTER_NICHE_CATALOG = [
  // ==========================================
  // 1. 🛒 GROCERY & ESSENTIALS (30 Items)
  // ==========================================
  { id: 'g-01', name: 'Aashirvaad Superior MP Sharbati Atta 5kg', brand: 'Aashirvaad', niche: 'Grocery & Essentials', category: 'Grocery & Essentials', unit: 'Pkt', source: 'Amazon Pantry Bestseller', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=350&q=80', stockCountHint: '#1 Flour in India' },
  { id: 'g-02', name: 'Tata Salt Vacuum Evaporated Iodized Salt 1kg', brand: 'Tata', niche: 'Grocery & Essentials', category: 'Grocery & Essentials', unit: 'Pkt', source: 'Flipkart Supermart', image: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=350&q=80', stockCountHint: 'Daily Household Need' },
  { id: 'g-03', name: 'Fortune Sunlite Refined Sunflower Oil 1L Pouch', brand: 'Fortune', niche: 'Grocery & Essentials', category: 'Grocery & Essentials', unit: 'Pkt', source: 'Amazon Fresh', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=350&q=80', stockCountHint: 'Fast Moving Cooking Oil' },
  { id: 'g-04', name: 'India Gate Basmati Rice Feast Rozzana 1kg', brand: 'India Gate', niche: 'Grocery & Essentials', category: 'Grocery & Essentials', unit: 'kg', source: 'Flipkart Grocery', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=350&q=80', stockCountHint: 'Top Rated Basmati Rice' },
  { id: 'g-05', name: 'Madhur Pure & Hygienic Crystal Sugar 1kg', brand: 'Madhur', niche: 'Grocery & Essentials', category: 'Grocery & Essentials', unit: 'Pkt', source: 'Amazon Pantry', image: 'https://images.unsplash.com/photo-1622484212850-eb596d769edc?w=350&q=80', stockCountHint: 'Sulphur-Free Pure Sugar' },
  { id: 'g-06', name: 'Nestlé Maggi 2-Minute Masala Instant Noodles 70g (Pack of 4)', brand: 'Nestlé', niche: 'Grocery & Essentials', category: 'Grocery & Essentials', unit: 'Pkt', source: 'Amazon Bestseller', image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=350&q=80', stockCountHint: 'Top Instant Snack' },
  { id: 'g-07', name: 'Red Label Strong Blend Tea Pouch 500g', brand: 'Brooke Bond', niche: 'Grocery & Essentials', category: 'Grocery & Essentials', unit: 'Pkt', source: 'Flipkart Supermart', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=350&q=80', stockCountHint: 'Daily Morning Tea Essential' },
  { id: 'g-08', name: 'Everest Tikhalal Hot Chilli Powder 200g Pouch', brand: 'Everest', niche: 'Grocery & Essentials', category: 'Grocery & Essentials', unit: 'Pkt', source: 'Amazon Grocery', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=350&q=80', stockCountHint: '#1 Red Chilli Powder' },
  { id: 'g-09', name: 'MDH Deggi Mirch Natural Red Color Powder 100g', brand: 'MDH', niche: 'Grocery & Essentials', category: 'Grocery & Essentials', unit: 'Pkt', source: 'Flipkart Supermart', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=350&q=80', stockCountHint: 'Authentic Indian Masala' },
  { id: 'g-10', name: 'Tata Sampann Unpolished Chana Dal 1kg', brand: 'Tata Sampann', niche: 'Grocery & Essentials', category: 'Grocery & Essentials', unit: 'kg', source: 'Amazon Fresh', image: 'https://images.unsplash.com/photo-1585994192701-f1a505c8574a?w=350&q=80', stockCountHint: 'High Protein Pulse' },
  { id: 'g-11', name: 'Rajdhani Pure Besan (Gram Flour) 500g', brand: 'Rajdhani', niche: 'Grocery & Essentials', category: 'Grocery & Essentials', unit: 'Pkt', source: 'Flipkart Grocery', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=350&q=80', stockCountHint: 'Essential for Snacks & Sweets' },
  { id: 'g-12', name: 'Nutraj Royal California Almonds Badam 500g', brand: 'Nutraj', niche: 'Grocery & Essentials', category: 'Grocery & Essentials', unit: 'Pkt', festivalTags: ['DIWALI', 'FESTIVE_GIFTS'], source: 'Amazon Pantry', image: 'https://images.unsplash.com/photo-1585994192701-f1a505c8574a?w=350&q=80', stockCountHint: 'Healthy Daily Nut' },
  { id: 'g-13', name: 'Nutraj Whole Cashews Kaju W320 500g Zip Pouch', brand: 'Nutraj', niche: 'Grocery & Essentials', category: 'Grocery & Essentials', unit: 'Pkt', festivalTags: ['DIWALI', 'GANESH_CHATURTHI'], source: 'Flipkart Bestseller', image: 'https://images.unsplash.com/photo-1585994192701-f1a505c8574a?w=350&q=80', stockCountHint: 'Festive Sweet Ingredient' },
  { id: 'g-14', name: 'Catch Sprinklers Table Salt & Black Pepper Shaker Set', brand: 'Catch', niche: 'Grocery & Essentials', category: 'Grocery & Essentials', unit: 'Set', source: 'Amazon Fresh', image: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=350&q=80', stockCountHint: 'Dining Table Essential' },
  { id: 'g-15', name: 'Saffola Gold Pro Healthy Heart Blended Oil 1L', brand: 'Saffola', niche: 'Grocery & Essentials', category: 'Grocery & Essentials', unit: 'Pkt', source: 'Flipkart Supermart', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=350&q=80', stockCountHint: 'Premium Health Cooking Oil' },
  { id: 'g-16', name: 'Dabur 100% Pure Honey Squeezy Bottle 500g', brand: 'Dabur', niche: 'Grocery & Essentials', category: 'Grocery & Essentials', unit: 'Pcs', source: 'Amazon Pantry', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=350&q=80', stockCountHint: 'Daily Immunity Booster' },
  { id: 'g-17', name: 'Kissan Fresh Tomato Ketchup Bottle 1kg', brand: 'Kissan', niche: 'Grocery & Essentials', category: 'Grocery & Essentials', unit: 'Bottle', source: 'Flipkart Grocery', image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=350&q=80', stockCountHint: 'Household Favourite Sauce' },
  { id: 'g-18', name: 'Everest Turmeric Powder Haldi 200g Pouch', brand: 'Everest', niche: 'Grocery & Essentials', category: 'Grocery & Essentials', unit: 'Pkt', source: 'Amazon Fresh', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=350&q=80', stockCountHint: 'Pure Ground Haldi' },
  { id: 'g-19', name: 'Everest Coriander Dhaniya Powder 200g Pouch', brand: 'Everest', niche: 'Grocery & Essentials', category: 'Grocery & Essentials', unit: 'Pkt', source: 'Flipkart Supermart', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=350&q=80', stockCountHint: 'Aromatic Curry Spice' },
  { id: 'g-20', name: 'Tata Sampann Moong Dal Split 1kg', brand: 'Tata Sampann', niche: 'Grocery & Essentials', category: 'Grocery & Essentials', unit: 'kg', source: 'Amazon Fresh', image: 'https://images.unsplash.com/photo-1585994192701-f1a505c8574a?w=350&q=80', stockCountHint: 'Easy Digestion Dal' },
  { id: 'g-21', name: 'Tata Sampann Masoor Malka Dal 1kg', brand: 'Tata Sampann', niche: 'Grocery & Essentials', category: 'Grocery & Essentials', unit: 'kg', source: 'Flipkart Grocery', image: 'https://images.unsplash.com/photo-1585994192701-f1a505c8574a?w=350&q=80', stockCountHint: 'Rich in Iron Dal' },
  { id: 'g-22', name: 'Sunfeast YiPPee! Magic Masala Instant Noodles (Pack of 4)', brand: 'Sunfeast', niche: 'Grocery & Essentials', category: 'Grocery & Essentials', unit: 'Pkt', source: 'Amazon Pantry', image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=350&q=80', stockCountHint: 'Non-Sticky Long Noodles' },
  { id: 'g-23', name: 'Patanjali Pure Mustard Sarson Oil 1L Pouch', brand: 'Patanjali', niche: 'Grocery & Essentials', category: 'Grocery & Essentials', unit: 'Pkt', source: 'Flipkart Grocery', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=350&q=80', stockCountHint: 'Kachi Ghani Mustard Oil' },
  { id: 'g-24', name: 'Fortune Soya Chunks Value Pack 200g', brand: 'Fortune', niche: 'Grocery & Essentials', category: 'Grocery & Essentials', unit: 'Pkt', source: 'Amazon Fresh', image: 'https://images.unsplash.com/photo-1585994192701-f1a505c8574a?w=350&q=80', stockCountHint: '99% Fat-Free Soya Chunks' },
  { id: 'g-25', name: 'Tata Tea Gold Leaf & Dust Blend 500g', brand: 'Tata Tea', niche: 'Grocery & Essentials', category: 'Grocery & Essentials', unit: 'Pkt', source: 'Flipkart Supermart', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=350&q=80', stockCountHint: 'Rich Aroma Tea' },
  { id: 'g-26', name: 'Wagh Bakri Premium CTC Tea Leaf 500g', brand: 'Wagh Bakri', niche: 'Grocery & Essentials', category: 'Grocery & Essentials', unit: 'Pkt', source: 'Amazon Pantry', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=350&q=80', stockCountHint: 'Popular Gujarat/West Tea' },
  { id: 'g-27', name: 'MDH Garam Masala Powder 100g Box', brand: 'MDH', niche: 'Grocery & Essentials', category: 'Grocery & Essentials', unit: 'Pkt', source: 'Flipkart Supermart', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=350&q=80', stockCountHint: 'Royal Curry Spice' },
  { id: 'g-28', name: 'Everest Kasuri Methi Pure Fenugreek Leaves 100g', brand: 'Everest', niche: 'Grocery & Essentials', category: 'Grocery & Essentials', unit: 'Pkt', source: 'Amazon Fresh', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=350&q=80', stockCountHint: 'Aromatic Finishing Herb' },
  { id: 'g-29', name: 'Bambino Roasted Short Cut Vermicelli Sewaiyan 400g', brand: 'Bambino', niche: 'Grocery & Essentials', category: 'Grocery & Essentials', unit: 'Pkt', festivalTags: ['EID', 'FESTIVE_SWEETS'], source: 'Flipkart Grocery', image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=350&q=80', stockCountHint: 'Kheer & Upma Staple' },
  { id: 'g-30', name: 'MTR 3-Minute Breakfast Poha Instant Mix 500g', brand: 'MTR', niche: 'Grocery & Essentials', category: 'Grocery & Essentials', unit: 'Pkt', source: 'Amazon Pantry', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=350&q=80', stockCountHint: 'Quick Breakfast Staple' },

  // ==========================================
  // 2. 🎁 TOYS & GIFT ITEMS (30 Items)
  // ==========================================
  { id: 't-01', name: 'Hamleys Giant Ultra Plush Soft Cuddle Teddy Bear (3 Feet)', brand: 'Hamleys', niche: 'Toys & Gift Items', category: 'Toys & Gift Items', unit: 'Pcs', source: 'Amazon Toys Bestseller', image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=350&q=80', stockCountHint: '#1 Birthday Gift' },
  { id: 't-02', name: 'Monopoly Deluxe Indian Edition Family Real Estate Board Game', brand: 'Funskool', niche: 'Toys & Gift Items', category: 'Toys & Gift Items', unit: 'Box', source: 'Flipkart Top Toys', image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=350&q=80', stockCountHint: 'Classic Family Game' },
  { id: 't-03', name: 'Hot Wheels 5-Car Die-Cast Collector Gift Pack', brand: 'Mattel', niche: 'Toys & Gift Items', category: 'Toys & Gift Items', unit: 'Pkt', source: 'Amazon Bestseller', image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=350&q=80', stockCountHint: 'Top Selling Boys Gift' },
  { id: 't-04', name: 'High-Speed Rechargeable Stunt 360 Remote Control Car', brand: 'Generic', niche: 'Toys & Gift Items', category: 'Toys & Gift Items', unit: 'Pcs', source: 'Flipkart Bestseller', image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=350&q=80', stockCountHint: 'Popular Festival Toy' },
  { id: 't-05', name: 'UNO Fast-Paced Card Game for Family & Friends (108 Cards)', brand: 'Mattel', niche: 'Toys & Gift Items', category: 'Toys & Gift Items', unit: 'Pkt', source: 'Amazon Games', image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=350&q=80', stockCountHint: '#1 Card Game in India' },
  { id: 't-06', name: 'Rubik\'s Speed Cube 3x3 High-Speed Smooth Twist Puzzle', brand: 'Rubiks', niche: 'Toys & Gift Items', category: 'Toys & Gift Items', unit: 'Pcs', source: 'Flipkart Top Rated', image: 'https://images.unsplash.com/photo-1591994843349-f415893b3a6b?w=350&q=80', stockCountHint: 'Brain Teaser Puzzle' },
  { id: 't-07', name: 'Archies 3D Pop-Up Festive & Birthday Greeting Cards (Pack of 4)', brand: 'Archies', niche: 'Toys & Gift Items', category: 'Toys & Gift Items', unit: 'Set', festivalTags: ['DIWALI', 'RAKSHA_BANDHAN', 'CHRISTMAS'], source: 'Amazon Gift Store', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=350&q=80', stockCountHint: 'Luxury Greeting Cards' },
  { id: 't-08', name: 'Miniso Aroma Scented Soy Wax Candles in Glass Jar (Set of 4)', brand: 'Miniso', niche: 'Toys & Gift Items', category: 'Toys & Gift Items', unit: 'Box', festivalTags: ['DIWALI', 'FESTIVE_GIFTS'], source: 'Amazon Home Decor', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=350&q=80', stockCountHint: 'Aromatherapy Gift Box' },
  { id: 't-09', name: 'Funskool Play-Doh Colorful Non-Toxic Clay Modelling Set', brand: 'Funskool', niche: 'Toys & Gift Items', category: 'Toys & Gift Items', unit: 'Box', source: 'Flipkart Kids Toys', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=350&q=80', stockCountHint: 'Creative Art Clay for Kids' },
  { id: 't-10', name: 'Lego Classic Creative Fun Building Bricks Box (300 Pcs)', brand: 'Lego', niche: 'Toys & Gift Items', category: 'Toys & Gift Items', unit: 'Box', source: 'Amazon Toys Bestseller', image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=350&q=80', stockCountHint: 'Top STEM Creative Toy' },
  { id: 't-11', name: 'Jenga Classic Wooden Stacking Tower Block Game (54 Blocks)', brand: 'Hasbro', niche: 'Toys & Gift Items', category: 'Toys & Gift Items', unit: 'Box', source: 'Flipkart Games', image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=350&q=80', stockCountHint: 'Party & Family Block Game' },
  { id: 't-12', name: 'Pictionary Fast Fun Drawing Family Board Game', brand: 'Mattel', niche: 'Toys & Gift Items', category: 'Toys & Gift Items', unit: 'Box', source: 'Amazon Bestseller', image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=350&q=80', stockCountHint: 'Quick Sketch Guessing Game' },
  { id: 't-13', name: 'Barbie Fashionista Doll with Trendy Outfits & Accessories', brand: 'Barbie', niche: 'Toys & Gift Items', category: 'Toys & Gift Items', unit: 'Pcs', source: 'Flipkart Toys', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=350&q=80', stockCountHint: '#1 Doll in India' },
  { id: 't-14', name: 'Nerf Elite 2.0 Commander Dart Blaster Toy Gun (12 Darts)', brand: 'Nerf', niche: 'Toys & Gift Items', category: 'Toys & Gift Items', unit: 'Pcs', source: 'Amazon Action Toys', image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=350&q=80', stockCountHint: 'Boys Action Toy' },
  { id: 't-15', name: 'Magnetic Wooden Chess & Draughts Board Set (Folding 12-Inch)', brand: 'Generic', niche: 'Toys & Gift Items', category: 'Toys & Gift Items', unit: 'Set', source: 'Flipkart Games', image: 'https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=350&q=80', stockCountHint: 'Handcrafted Wooden Chess' },
  { id: 't-16', name: 'Kids Musical Light-Up Dance Robot Toy with 360 Spin', brand: 'Generic', niche: 'Toys & Gift Items', category: 'Toys & Gift Items', unit: 'Pcs', source: 'Amazon Electronics', image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=350&q=80', stockCountHint: 'Toddler Gift Hit' },
  { id: 't-17', name: 'Crystal LED Table Lamp with Touch Sensor & 16 Colors', brand: 'Generic', niche: 'Toys & Gift Items', category: 'Toys & Gift Items', unit: 'Pcs', festivalTags: ['DIWALI', 'CHRISTMAS'], source: 'Flipkart Decor', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=350&q=80', stockCountHint: 'Trending Romantic Room Gift' },
  { id: 't-18', name: 'Multicolor Rotating Star Night Sky Projector Lamp', brand: 'Generic', niche: 'Toys & Gift Items', category: 'Toys & Gift Items', unit: 'Pcs', source: 'Amazon Decor', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=350&q=80', stockCountHint: 'Children Bedroom Projector' },
  { id: 't-19', name: 'Handcrafted Wooden Rotating Music Box (Castle in the Sky)', brand: 'Archies', niche: 'Toys & Gift Items', category: 'Toys & Gift Items', unit: 'Pcs', source: 'Flipkart Gift Store', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=350&q=80', stockCountHint: 'Vintage Keepsake Gift' },
  { id: 't-20', name: 'Stainless Steel Temperature Display Smart Thermos Bottle 500ml', brand: 'Generic', niche: 'Toys & Gift Items', category: 'Toys & Gift Items', unit: 'Pcs', source: 'Amazon Essentials', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=350&q=80', stockCountHint: 'Corporate & Birthday Gift' },
  { id: 't-21', name: 'Glittering Snow Globe with Music & LED Light (Unicorn Theme)', brand: 'Generic', niche: 'Toys & Gift Items', category: 'Toys & Gift Items', unit: 'Pcs', festivalTags: ['CHRISTMAS', 'NEWYEAR'], source: 'Flipkart Gifts', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=350&q=80', stockCountHint: 'Girls Decorative Snow Globe' },
  { id: 't-22', name: 'Deluxe Artist Color Box with Acrylic, Crayons & Sketch Pens (150 Pcs)', brand: 'Camlin', niche: 'Toys & Gift Items', category: 'Toys & Gift Items', unit: 'Box', source: 'Amazon Stationery', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=350&q=80', stockCountHint: 'Student Creative Gift Set' },
  { id: 't-23', name: 'Scrabble Original Word Puzzle Board Game for Kids & Adults', brand: 'Mattel', niche: 'Toys & Gift Items', category: 'Toys & Gift Items', unit: 'Box', source: 'Flipkart Board Games', image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=350&q=80', stockCountHint: 'Vocabulary Building Game' },
  { id: 't-24', name: 'Carrom Board 32-Inch Championship Border with Coins & Striker', brand: 'Synco', niche: 'Toys & Gift Items', category: 'Toys & Gift Items', unit: 'Set', source: 'Amazon Sports', image: 'https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=350&q=80', stockCountHint: 'Indian Indoor Sports Classic' },
  { id: 't-25', name: 'Badminton Racket Twin Set with 3 Nylon Shuttles & Carry Cover', brand: 'Yonex', niche: 'Toys & Gift Items', category: 'Toys & Gift Items', unit: 'Set', source: 'Flipkart Sports', image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=350&q=80', stockCountHint: 'Popular Outdoor Game Gift' },
  { id: 't-26', name: 'DIY 3D Wooden Miniature Dollhouse Puzzle Kit with LED Light', brand: 'Robotime', niche: 'Toys & Gift Items', category: 'Toys & Gift Items', unit: 'Box', source: 'Amazon Crafts', image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=350&q=80', stockCountHint: 'Intricate Craft Gift' },
  { id: 't-27', name: 'Handmade Wooden Jewelry Box with Brass Inlay Floral Work', brand: 'Generic', niche: 'Toys & Gift Items', category: 'Toys & Gift Items', unit: 'Pcs', source: 'Flipkart Handicrafts', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=350&q=80', stockCountHint: 'Traditional Women Gift' },
  { id: 't-28', name: 'Designer Brass Incense Holder Pooja Thali Set for Festivals', brand: 'Generic', niche: 'Toys & Gift Items', category: 'Toys & Gift Items', unit: 'Set', festivalTags: ['DIWALI', 'GANESH_CHATURTHI', 'POOJA'], source: 'Amazon Festive Store', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=350&q=80', stockCountHint: 'Festive Pooja Gift' },
  { id: 't-29', name: 'Unicorn Sequins Kids Shoulder Sling Bag with Coin Purse', brand: 'Generic', niche: 'Toys & Gift Items', category: 'Toys & Gift Items', unit: 'Pcs', source: 'Flipkart Kids Fashion', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=350&q=80', stockCountHint: 'Girls Party Sling Bag' },
  { id: 't-30', name: 'Vintage Metal Key Holder for Home Wall (Elephant Motif)', brand: 'Generic', niche: 'Toys & Gift Items', category: 'Toys & Gift Items', unit: 'Pcs', source: 'Amazon Home Decor', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=350&q=80', stockCountHint: 'Housewarming Gift Hit' },

  // ==========================================
  // 3. 👕 APPAREL & CLOTHING (30 Items)
  // ==========================================
  { id: 'c-01', name: 'Men\'s Pure Combed Cotton Round Neck T-Shirt (Pack of 3)', brand: 'Allen Solly', niche: 'Apparel & Clothing', category: 'Apparel & Clothing', unit: 'Pkt', source: 'Amazon Fashion Bestseller', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=350&q=80', stockCountHint: '#1 Men Daily T-Shirt' },
  { id: 'c-02', name: 'Women\'s Pure Cotton Printed Straight Kurti (M to XXL)', brand: 'Biba', niche: 'Apparel & Clothing', category: 'Apparel & Clothing', unit: 'Pcs', festivalTags: ['DIWALI', 'NAVRATRI'], source: 'Flipkart Fashion', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=350&q=80', stockCountHint: 'Top Selling Ethnic Kurti' },
  { id: 'c-03', name: 'Men\'s Regular Fit Stretchable Denim Jeans (Dark Blue)', brand: 'Spykar', niche: 'Apparel & Clothing', category: 'Apparel & Clothing', unit: 'Pcs', source: 'Amazon Denim Store', image: 'https://images.unsplash.com/photo-1542272604-780c96856592?w=350&q=80', stockCountHint: 'High Repeat Denim' },
  { id: 'c-04', name: 'Kids 100% Breathable Cotton T-Shirt & Shorts Combo Set', brand: 'Hopscotch', niche: 'Apparel & Clothing', category: 'Apparel & Clothing', unit: 'Set', source: 'Flipkart Kids', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=350&q=80', stockCountHint: 'Daily Kids Wear Set' },
  { id: 'c-05', name: 'Men\'s Breathable Ankle Length Cotton Socks (Pack of 6)', brand: 'Jockey', niche: 'Apparel & Clothing', category: 'Apparel & Clothing', unit: 'Pkt', source: 'Amazon Essentials', image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=350&q=80', stockCountHint: 'Counter Fast Mover' },
  { id: 'c-06', name: 'Men\'s 100% Cotton Solid Formal Long Sleeve Shirt (White)', brand: 'Peter England', niche: 'Apparel & Clothing', category: 'Apparel & Clothing', unit: 'Pcs', source: 'Amazon Formal Wear', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=350&q=80', stockCountHint: 'Office & Wedding Formal Shirt' },
  { id: 'c-07', name: 'Women\'s Soft Silk Jacquard Border Saree with Blouse Piece', brand: 'Kanjivaram Style', niche: 'Apparel & Clothing', category: 'Apparel & Clothing', unit: 'Pcs', festivalTags: ['DIWALI', 'GANESH_CHATURTHI', 'WEDDING'], source: 'Flipkart Ethnic', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=350&q=80', stockCountHint: 'Festive Traditional Saree' },
  { id: 'c-08', name: 'Men\'s Pure Cotton Trunk Underwear (Pack of 3)', brand: 'Lux Cozi', niche: 'Apparel & Clothing', category: 'Apparel & Clothing', unit: 'Pkt', source: 'Flipkart Men Innerwear', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=350&q=80', stockCountHint: 'Daily Essential Innerwear' },
  { id: 'c-09', name: 'Men\'s 100% Cotton Ribbed Sleeveless Vest / Banyan (Pack of 3)', brand: 'Rupa Frontline', niche: 'Apparel & Clothing', category: 'Apparel & Clothing', unit: 'Pkt', source: 'Amazon Men Essentials', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=350&q=80', stockCountHint: 'High Turnout Innerwear' },
  { id: 'c-10', name: 'Women\'s Cotton Stretchable Ankle Length Leggings (Pack of 2)', brand: 'Lyra', niche: 'Apparel & Clothing', category: 'Apparel & Clothing', unit: 'Pkt', source: 'Flipkart Women Wear', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=350&q=80', stockCountHint: 'Daily Women Kurti Match' },
  { id: 'c-11', name: 'Men\'s Slim Fit Cotton Chino Casual Trousers (Khaki)', brand: 'U.S. Polo Assn.', niche: 'Apparel & Clothing', category: 'Apparel & Clothing', unit: 'Pcs', source: 'Amazon Casuals', image: 'https://images.unsplash.com/photo-1542272604-780c96856592?w=350&q=80', stockCountHint: 'Smart Casual Chino' },
  { id: 'c-12', name: 'Women\'s Rayon Gold Printed Festive Anarkali Kurta & Pant Set', brand: 'Aurelia', niche: 'Apparel & Clothing', category: 'Apparel & Clothing', unit: 'Set', festivalTags: ['DIWALI', 'HOLI', 'EID'], source: 'Flipkart Ethnic Fest', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=350&q=80', stockCountHint: 'Festive Anarkali Suit' },
  { id: 'c-13', name: 'Boys Silk Blend Festive Kurta Pyjama with Ethnic Waistcoat Jacket', brand: 'Kora', niche: 'Apparel & Clothing', category: 'Apparel & Clothing', unit: 'Set', festivalTags: ['DIWALI', 'GANESH_CHATURTHI'], source: 'Amazon Kids Ethnic', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=350&q=80', stockCountHint: 'Traditional Festive Boy Set' },
  { id: 'c-14', name: 'Girls Traditional Ready-to-Wear Lehenga Choli with Dupatta', brand: 'Global Desi', niche: 'Apparel & Clothing', category: 'Apparel & Clothing', unit: 'Set', festivalTags: ['DIWALI', 'NAVRATRI'], source: 'Flipkart Kids', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=350&q=80', stockCountHint: 'Girls Festive Dress' },
  { id: 'c-15', name: 'Men\'s 100% Linen Solid Mandarin Collar Casual Shirt', brand: 'Raymond', niche: 'Apparel & Clothing', category: 'Apparel & Clothing', unit: 'Pcs', source: 'Amazon Menswear', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=350&q=80', stockCountHint: 'Premium Pure Linen Shirt' },
  { id: 'c-16', name: 'Men\'s Pure Cotton Checked Boxers Nightwear (Pack of 2)', brand: 'Jockey', niche: 'Apparel & Clothing', category: 'Apparel & Clothing', unit: 'Pkt', source: 'Flipkart Loungewear', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=350&q=80', stockCountHint: 'Comfort Home Boxers' },
  { id: 'c-17', name: 'Women\'s 100% Pure Cotton Printed Nighty / Maxi Gown', brand: 'Generic', niche: 'Apparel & Clothing', category: 'Apparel & Clothing', unit: 'Pcs', source: 'Amazon Nightwear', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=350&q=80', stockCountHint: 'Daily Comfortable Maxi' },
  { id: 'c-18', name: 'Men\'s Track Pants Gym & Running Sweatpants (Pack of 2)', brand: 'Puma Style', niche: 'Apparel & Clothing', category: 'Apparel & Clothing', unit: 'Pkt', source: 'Flipkart Activewear', image: 'https://images.unsplash.com/photo-1542272604-780c96856592?w=350&q=80', stockCountHint: 'Daily Jogger Pants' },
  { id: 'c-19', name: 'Women\'s Seamless Sports Bra Workout Bralette (Pack of 2)', brand: 'Clovia', niche: 'Apparel & Clothing', category: 'Apparel & Clothing', unit: 'Pkt', source: 'Amazon Activewear', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=350&q=80', stockCountHint: 'Gym & Yoga Sports Bra' },
  { id: 'c-20', name: 'Men\'s Pure Silk Traditional Dhoti Kurta Set with Gold Zari Border', brand: 'Ramraj Cotton', niche: 'Apparel & Clothing', category: 'Apparel & Clothing', unit: 'Set', festivalTags: ['DIWALI', 'GANESH_CHATURTHI', 'PONGAL'], source: 'Flipkart Ethnic', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=350&q=80', stockCountHint: 'Pooja & Festive Dhoti Set' },
  { id: 'c-21', name: 'Men\'s Leather Reversible Formal Belt (Black & Brown)', brand: 'WildHorn', niche: 'Apparel & Clothing', category: 'Apparel & Clothing', unit: 'Pcs', source: 'Amazon Accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=350&q=80', stockCountHint: '2-in-1 Genuine Leather Belt' },
  { id: 'c-22', name: 'Men\'s Genuine Leather Bifold Wallet with RFID Protection', brand: 'Urban Forest', niche: 'Apparel & Clothing', category: 'Apparel & Clothing', unit: 'Pcs', source: 'Flipkart Wallets', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=350&q=80', stockCountHint: 'Classic Gents Wallet' },
  { id: 'c-23', name: 'Women\'s Large Tote Handbag with Zipper Shoulder Bag', brand: 'Lavie', niche: 'Apparel & Clothing', category: 'Apparel & Clothing', unit: 'Pcs', source: 'Amazon Handbags', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=350&q=80', stockCountHint: 'Daily Work & Party Handbag' },
  { id: 'c-24', name: 'Winter Warm Woolen Beanie Cap & Neck Warmer Scarf Set', brand: 'Generic', niche: 'Apparel & Clothing', category: 'Apparel & Clothing', unit: 'Set', festivalTags: ['WINTER', 'CHRISTMAS'], source: 'Flipkart Winterwear', image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=350&q=80', stockCountHint: 'Winter Season Hit' },
  { id: 'c-25', name: 'Men\'s Thermal Top & Bottom Warm Inner Set (Dark Grey)', brand: 'Dollar Ultra', niche: 'Apparel & Clothing', category: 'Apparel & Clothing', unit: 'Set', festivalTags: ['WINTER'], source: 'Amazon Thermals', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=350&q=80', stockCountHint: 'Cold Season Thermal' },
  { id: 'c-26', name: 'Women\'s Pure Chiffon Dupatta with Gotta Patti Border (Multicolor)', brand: 'W Style', niche: 'Apparel & Clothing', category: 'Apparel & Clothing', unit: 'Pcs', festivalTags: ['NAVRATRI', 'DIWALI'], source: 'Flipkart Dupattas', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=350&q=80', stockCountHint: 'Vibrant Festive Dupatta' },
  { id: 'c-27', name: 'Unisex Heavyweight Waterproof Raincoat with Hood & Pouch', brand: 'Duckback', niche: 'Apparel & Clothing', category: 'Apparel & Clothing', unit: 'Pcs', festivalTags: ['MONSOON'], source: 'Amazon Monsoon Store', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=350&q=80', stockCountHint: 'Monsoon Waterproof Raincoat' },
  { id: 'c-28', name: 'Men\'s 100% Cotton Handkerchiefs / Rumal (Pack of 6)', brand: 'Kalyani', niche: 'Apparel & Clothing', category: 'Apparel & Clothing', unit: 'Pkt', source: 'Flipkart Men Essentials', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=350&q=80', stockCountHint: 'High Turnout Counter Item' },
  { id: 'c-29', name: 'Women\'s Seamless High-Waist Shapewear Body Shaper Tummy Tucker', brand: 'Dermawear', niche: 'Apparel & Clothing', category: 'Apparel & Clothing', unit: 'Pcs', source: 'Amazon Shapewear', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=350&q=80', stockCountHint: 'Body Shaping Tummy Tucker' },
  { id: 'c-30', name: 'Baby 100% Organic Cotton Rompers Jumpsuit (Pack of 3)', brand: 'Mothercare Style', niche: 'Apparel & Clothing', category: 'Apparel & Clothing', unit: 'Set', source: 'Flipkart Baby Care', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=350&q=80', stockCountHint: 'Newborn Infant Romper Set' },

  // ==========================================
  // 4. 🏬 GENERAL ITEMS & STATIONERY (30 Items)
  // ==========================================
  { id: 'st-01', name: 'Classmate Long Notebook A4 Size 180 Pages (Pack of 6)', brand: 'Classmate', niche: 'General Items', category: 'General Items', unit: 'Pkt', festivalTags: ['SCHOOL', 'STATIONERY'], source: 'Amazon Stationery Bestseller', image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=350&q=80', stockCountHint: '#1 Student Notebook' },
  { id: 'st-02', name: 'Reynolds 045 Fine Carabine Ball Point Pens (Box of 20 Blue)', brand: 'Reynolds', niche: 'General Items', category: 'General Items', unit: 'Box', festivalTags: ['SCHOOL', 'STATIONERY'], source: 'Flipkart Supermart', image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=350&q=80', stockCountHint: 'Daily Counter Sale Pen' },
  { id: 'st-03', name: 'Fevicol MR Squeezy All Purpose Wood & Paper Glue 100g', brand: 'Fevicol', niche: 'General Items', category: 'General Items', unit: 'Pcs', source: 'Amazon Essentials', image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=350&q=80', stockCountHint: 'Standard Adhesive' },
  { id: 'st-04', name: 'Scotch Transparent Adhesive Tape 1-Inch (Pack of 6 Rolls)', brand: '3M Scotch', niche: 'General Items', category: 'General Items', unit: 'Pkt', source: 'Flipkart Stationery', image: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=350&q=80', stockCountHint: 'Everyday Packaging Tape' },
  { id: 'st-05', name: 'Duracell Chhota Power AAA Alkaline Batteries (Pack of 4)', brand: 'Duracell', niche: 'General Items', category: 'General Items', unit: 'Pkt', source: 'Amazon Pantry', image: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?w=350&q=80', stockCountHint: 'Long Lasting Remote Battery' },
  { id: 'st-06', name: 'Duracell Ultra AA High Power Alkaline Batteries (Pack of 4)', brand: 'Duracell', niche: 'General Items', category: 'General Items', unit: 'Pkt', source: 'Flipkart Electronics', image: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?w=350&q=80', stockCountHint: 'Heavy Duty Clock/Toy Battery' },
  { id: 'st-07', name: 'Camlin Kokuyo Triangular Extra Dark Pencils (Box of 10)', brand: 'Camlin', niche: 'General Items', category: 'General Items', unit: 'Box', festivalTags: ['SCHOOL'], source: 'Amazon Stationery', image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=350&q=80', stockCountHint: 'Exam Extra Dark Pencil' },
  { id: 'st-08', name: 'Apsara Non-Dust Clean Erasers (Box of 20)', brand: 'Apsara', niche: 'General Items', category: 'General Items', unit: 'Box', festivalTags: ['SCHOOL'], source: 'Flipkart School Supplies', image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=350&q=80', stockCountHint: 'Non-Dust Eraser Pack' },
  { id: 'st-09', name: 'Camlin Exam Geometry Box with Math Instruments', brand: 'Camlin', niche: 'General Items', category: 'General Items', unit: 'Pcs', festivalTags: ['SCHOOL'], source: 'Amazon Stationery', image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=350&q=80', stockCountHint: 'Essential Student Tool Box' },
  { id: 'st-10', name: 'Fevikwik Instant Adhesive 1-Drop Glue Tube 3g (Card of 12)', brand: 'Fevikwik', niche: 'General Items', category: 'General Items', unit: 'Card', source: 'Flipkart Supermart', image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=350&q=80', stockCountHint: 'Fastest Selling Instant Glue' },
  { id: 'st-11', name: 'Kangaro Heavy Duty No. 10 Paper Stapler with 1000 Pins', brand: 'Kangaro', niche: 'General Items', category: 'General Items', unit: 'Set', source: 'Amazon Office Supplies', image: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=350&q=80', stockCountHint: 'Office & Student Stapler' },
  { id: 'st-12', name: 'Oddy Sticky Notes Neon Color Memo Pads (Set of 4 Pads)', brand: 'Oddy', niche: 'General Items', category: 'General Items', unit: 'Pkt', source: 'Flipkart Stationery', image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=350&q=80', stockCountHint: 'Self-Adhesive Reminder Notes' },
  { id: 'st-13', name: 'Casio Basic 12-Digit Desktop Calculator (Battery & Solar)', brand: 'Casio', niche: 'General Items', category: 'General Items', unit: 'Pcs', source: 'Amazon Electronics', image: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=350&q=80', stockCountHint: 'Shopkeeper Billing Calculator' },
  { id: 'st-14', name: 'Oddy Multipurpose Stainless Steel Craft Scissors 8-Inch', brand: 'Oddy', niche: 'General Items', category: 'General Items', unit: 'Pcs', source: 'Flipkart Essentials', image: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=350&q=80', stockCountHint: 'Sharp Household Scissors' },
  { id: 'st-15', name: 'JK Copier A4 Multipurpose 75 GSM Printer Paper Ream (500 Sheets)', brand: 'JK Paper', niche: 'General Items', category: 'General Items', unit: 'Ream', source: 'Amazon Office Supplies', image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=350&q=80', stockCountHint: 'Photocopy & Laser Paper' },
  { id: 'st-16', name: 'Luxor Broad Tip Whiteboard Dry Erase Markers (Pack of 4 Colors)', brand: 'Luxor', niche: 'General Items', category: 'General Items', unit: 'Pkt', source: 'Flipkart Stationery', image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=350&q=80', stockCountHint: 'Classroom & Office Marker' },
  { id: 'st-17', name: 'Luxor High-Visibility Pastel Fluorescent Highlighter Pens (Pack of 5)', brand: 'Luxor', niche: 'General Items', category: 'General Items', unit: 'Pkt', source: 'Amazon Stationery', image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=350&q=80', stockCountHint: 'Study Text Highlighter' },
  { id: 'st-18', name: 'Plastic Heavy Document File Folder with 20 Clear Sleeves', brand: 'Solo', niche: 'General Items', category: 'General Items', unit: 'Pcs', source: 'Flipkart Office', image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=350&q=80', stockCountHint: 'Certificate & Resume Folder' },
  { id: 'st-19', name: 'Brown Kraft Paper Courier Packaging Tape 2-Inch (65 Meters)', brand: 'Generic', niche: 'General Items', category: 'General Items', unit: 'Pcs', source: 'Amazon Logistics', image: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=350&q=80', stockCountHint: 'Heavy Carton Box Tape' },
  { id: 'st-20', name: 'Pidilite Fevi Gum Non-Toxic Liquid Paper Glue 50ml (Box of 10)', brand: 'Pidilite', niche: 'General Items', category: 'General Items', unit: 'Box', source: 'Flipkart Supermart', image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=350&q=80', stockCountHint: 'Daily School Gum' },
  { id: 'st-21', name: 'Solo Clear Display Ring Binder File for Documents', brand: 'Solo', niche: 'General Items', category: 'General Items', unit: 'Pcs', source: 'Amazon Office Supplies', image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=350&q=80', stockCountHint: 'Office Document Archive' },
  { id: 'st-22', name: 'All-In-One Stainless Steel Safety Pins (Card of 50 Pins)', brand: 'Generic', niche: 'General Items', category: 'General Items', unit: 'Card', source: 'Flipkart General', image: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=350&q=80', stockCountHint: 'Daily Household Safety Pin' },
  { id: 'st-23', name: 'Godrej Aer Pocket Bathroom Air Fragrance Gel (Pack of 3)', brand: 'Godrej', niche: 'General Items', category: 'General Items', unit: 'Pkt', source: 'Amazon Home', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=350&q=80', stockCountHint: '30-Day Bathroom Freshness' },
  { id: 'st-24', name: 'GoodKnight Gold Flash Liquid Mosquito Vaporizer Refill (Pack of 2)', brand: 'GoodKnight', niche: 'General Items', category: 'General Items', unit: 'Pkt', festivalTags: ['MONSOON'], source: 'Flipkart Supermart', image: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=350&q=80', stockCountHint: 'Essential Mosquito Protection' },
  { id: 'st-25', name: 'Odonil Natural Air Purifier Room Freshner Blocks (Pack of 4)', brand: 'Odonil', niche: 'General Items', category: 'General Items', unit: 'Pkt', source: 'Amazon Home Care', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=350&q=80', stockCountHint: 'Cupboard & Room Fragrance' },
  { id: 'st-26', name: 'Mangaldeep 3-in-1 Fragrance Agarbatti Incense Sticks 150g', brand: 'ITC Mangaldeep', niche: 'General Items', category: 'General Items', unit: 'Pkt', festivalTags: ['DIWALI', 'GANESH_CHATURTHI', 'POOJA'], source: 'Flipkart Pooja Store', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=350&q=80', stockCountHint: 'Daily Pooja Incense' },
  { id: 'st-27', name: 'Camphor Pure Bhimseni Kapoor Tablet Pouch 100g', brand: 'Cycle Brand', niche: 'General Items', category: 'General Items', unit: 'Pkt', festivalTags: ['POOJA', 'GANESH_CHATURTHI'], source: 'Amazon Fresh', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=350&q=80', stockCountHint: 'Pure Aarti Camphor' },
  { id: 'st-28', name: 'Cycle Pure Three in One Agarbatti Pouch Pack (Pack of 3)', brand: 'Cycle', niche: 'General Items', category: 'General Items', unit: 'Pkt', festivalTags: ['POOJA', 'DIWALI'], source: 'Flipkart Supermart', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=350&q=80', stockCountHint: 'Heritage Pooja Agarbatti' },
  { id: 'st-29', name: 'Matchbox Box Pack of 10 Safety Matches (Homelites)', brand: 'Homelites', niche: 'General Items', category: 'General Items', unit: 'Pkt', source: 'Amazon Pantry', image: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?w=350&q=80', stockCountHint: 'Fast Selling Kitchen Matchbox' },
  { id: 'st-30', name: 'Plastic Multi-Compartment Pill & Medicine Daily Organizer Box', brand: 'Generic', niche: 'General Items', category: 'General Items', unit: 'Pcs', source: 'Flipkart Health', image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=350&q=80', stockCountHint: '7-Day Dose Reminder Box' },

  // ==========================================
  // 5. 💡 ELECTRICAL & HARDWARE (30 Items)
  // ==========================================
  { id: 'el-01', name: 'Havells 9W Cool Day White B22 LED Bulb (Pack of 4)', brand: 'Havells', niche: 'Electrical & Electronics', category: 'Electrical & Electronics', unit: 'Pkt', source: 'Amazon Electrical Bestseller', image: 'https://images.unsplash.com/photo-1550524514-966953a9254d?w=350&q=80', stockCountHint: '#1 Household LED Bulb' },
  { id: 'el-02', name: 'Anchor Roma 16A Heavy Duty 3-Pin Power Plug Top (White)', brand: 'Anchor', niche: 'Electrical & Electronics', category: 'Electrical & Electronics', unit: 'Pcs', source: 'Flipkart Hardware', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=350&q=80', stockCountHint: 'Geyser & AC Plug' },
  { id: 'el-03', name: 'GM Modular 4+1 Surge Protector Extension Board with 2M Cord', brand: 'GM Modular', niche: 'Electrical & Electronics', category: 'Electrical & Electronics', unit: 'Pcs', source: 'Amazon Bestseller', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=350&q=80', stockCountHint: 'TV & PC Surge Strip' },
  { id: 'el-04', name: 'Goldmedal PVC Flame Retardant Electrical Tape (Pack of 5 Colors)', brand: 'Goldmedal', niche: 'Electrical & Electronics', category: 'Electrical & Electronics', unit: 'Pkt', source: 'Flipkart Electricals', image: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=350&q=80', stockCountHint: 'Electrician Wire Joint Tape' },
  { id: 'el-05', name: 'Syska 50-Meter Waterproof Multicolor LED String Fairy Rice Lights', brand: 'Syska', niche: 'Electrical & Electronics', category: 'Electrical & Electronics', unit: 'Pcs', festivalTags: ['DIWALI', 'CHRISTMAS', 'NEWYEAR'], source: 'Amazon Festive Lighting', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=350&q=80', stockCountHint: 'Diwali & Party Decoration' },
  { id: 'el-06', name: 'Philips 10W Rechargeable Inverter Emergency LED Bulb (B22)', brand: 'Philips', niche: 'Electrical & Electronics', category: 'Electrical & Electronics', unit: 'Pcs', source: 'Flipkart Electricals', image: 'https://images.unsplash.com/photo-1550524514-966953a9254d?w=350&q=80', stockCountHint: '4-Hour Power Cut Backup' },
  { id: 'el-07', name: 'Taparia 8-Piece Multipurpose Screwdriver Set with Neon Tester', brand: 'Taparia', niche: 'Electrical & Electronics', category: 'Electrical & Electronics', unit: 'Set', source: 'Amazon Tools', image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=350&q=80', stockCountHint: '#1 Hand Tool Brand' },
  { id: 'el-08', name: 'Wipro Smart 9W WiFi RGB Color Changing LED Bulb', brand: 'Wipro', niche: 'Electrical & Electronics', category: 'Electrical & Electronics', unit: 'Pcs', festivalTags: ['DIWALI', 'CHRISTMAS'], source: 'Flipkart Smart Home', image: 'https://images.unsplash.com/photo-1550524514-966953a9254d?w=350&q=80', stockCountHint: 'Alexa & Google Compatible' },
  { id: 'el-09', name: 'Anchor Rider 6A 2-Way Modular Switch (White)', brand: 'Anchor', niche: 'Electrical & Electronics', category: 'Electrical & Electronics', unit: 'Pcs', source: 'Amazon Hardware', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=350&q=80', stockCountHint: 'Modular House Wiring' },
  { id: 'el-10', name: 'Havells 16A Single Pole C-Curve MCB Circuit Breaker', brand: 'Havells', niche: 'Electrical & Electronics', category: 'Electrical & Electronics', unit: 'Pcs', source: 'Flipkart Electricals', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=350&q=80', stockCountHint: 'Short-Circuit Protection' },
  { id: 'el-11', name: 'Polycab 1.5 Sq mm Single Core Flame Retardant Copper Wire (90M)', brand: 'Polycab', niche: 'Electrical & Electronics', category: 'Electrical & Electronics', unit: 'Roll', source: 'Amazon Industrial', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=350&q=80', stockCountHint: 'House Electrical Cable' },
  { id: 'el-12', name: 'Finolex 2.5 Sq mm Multistrand Flexible Copper Cable (90M Roll)', brand: 'Finolex', niche: 'Electrical & Electronics', category: 'Electrical & Electronics', unit: 'Roll', source: 'Flipkart Hardware', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=350&q=80', stockCountHint: 'Heavy Power Point Wire' },
  { id: 'el-13', name: 'Orient Electric 1200mm High Air Delivery Ceiling Fan (Brown)', brand: 'Orient', niche: 'Electrical & Electronics', category: 'Electrical & Electronics', unit: 'Pcs', source: 'Amazon Appliances', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=350&q=80', stockCountHint: 'Reliable Ceiling Fan' },
  { id: 'el-14', name: 'Crompton 1500W Immersion Water Heater Rod with Shock Proof Handle', brand: 'Crompton', niche: 'Electrical & Electronics', category: 'Electrical & Electronics', unit: 'Pcs', festivalTags: ['WINTER'], source: 'Flipkart Home', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=350&q=80', stockCountHint: 'Winter Instant Water Heater' },
  { id: 'el-15', name: 'Taparia 8-Inch Heavy Duty Combination Pliers with Insulation', brand: 'Taparia', niche: 'Electrical & Electronics', category: 'Electrical & Electronics', unit: 'Pcs', source: 'Amazon Tools', image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=350&q=80', stockCountHint: 'Wire Cutting Pliers' },
  { id: 'el-16', name: 'Stanley 5-Meter Steel Metric Measuring Tape with Auto Lock', brand: 'Stanley', niche: 'Electrical & Electronics', category: 'Electrical & Electronics', unit: 'Pcs', source: 'Flipkart Tools', image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=350&q=80', stockCountHint: 'Carpenter & DIY Measurement' },
  { id: 'el-17', name: 'Bosch 500W Reversible Impact Drill Kit with 100 Accessories', brand: 'Bosch', niche: 'Electrical & Electronics', category: 'Electrical & Electronics', unit: 'Set', source: 'Amazon Tools', image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=350&q=80', stockCountHint: 'Wall & Wood Drilling Machine' },
  { id: 'el-18', name: 'Anchor 6A 3-Pin Universal Multi-Plug Adaptor with Indicator', brand: 'Anchor', niche: 'Electrical & Electronics', category: 'Electrical & Electronics', unit: 'Pcs', source: 'Flipkart Electronics', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=350&q=80', stockCountHint: 'Travel Universal Multi-Plug' },
  { id: 'el-19', name: 'SYSKA 20W LED Slim Tube Light 4 Feet (Cool White)', brand: 'Syska', niche: 'Electrical & Electronics', category: 'Electrical & Electronics', unit: 'Pcs', source: 'Amazon Lighting', image: 'https://images.unsplash.com/photo-1550524514-966953a9254d?w=350&q=80', stockCountHint: 'Energy Saving Batten Light' },
  { id: 'el-20', name: 'Goldmedal Curve 2-Pin Universal Socket with Safety Shutter', brand: 'Goldmedal', niche: 'Electrical & Electronics', category: 'Electrical & Electronics', unit: 'Pcs', source: 'Flipkart Hardware', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=350&q=80', stockCountHint: 'Safe Home Wall Socket' },
  { id: 'el-21', name: 'Philips 2.4A Fast Dual USB Port Wall Mobile Charger (White)', brand: 'Philips', niche: 'Electrical & Electronics', category: 'Electrical & Electronics', unit: 'Pcs', source: 'Amazon Electronics', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=350&q=80', stockCountHint: 'Universal Fast Charging Adapter' },
  { id: 'el-22', name: 'boAt Rugged V3 Braided Type-C Fast Charging Cable (1.5M)', brand: 'boAt', niche: 'Electrical & Electronics', category: 'Electrical & Electronics', unit: 'Pcs', source: 'Flipkart Mobile Accessories', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=350&q=80', stockCountHint: 'Tangle-Free Tough Cable' },
  { id: 'el-23', name: 'WD-40 Multi-Use Rust Remover & Lubricant Spray 420ml Can', brand: 'WD-40', niche: 'Electrical & Electronics', category: 'Electrical & Electronics', unit: 'Can', source: 'Amazon Hardware', image: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=350&q=80', stockCountHint: 'Stops Squeaks & Cleans Rust' },
  { id: 'el-24', name: 'Pidilite M-Seal Epoxy Compound Sealant 100g (Pack of 6)', brand: 'Pidilite', niche: 'Electrical & Electronics', category: 'Electrical & Electronics', unit: 'Pkt', source: 'Flipkart Hardware', image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=350&q=80', stockCountHint: 'Pipe & Water Leakage Seal' },
  { id: 'el-25', name: 'Stainless Steel Heavy Duty Adjustable Pipe Wrench 10-Inch', brand: 'Taparia', niche: 'Electrical & Electronics', category: 'Electrical & Electronics', unit: 'Pcs', source: 'Amazon Tools', image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=350&q=80', stockCountHint: 'Plumber Hand Tool' },
  { id: 'el-26', name: 'Waterproof Flexible Silicon Glue & Caulk Sealant Gun', brand: 'Dr. Fixit', niche: 'Electrical & Electronics', category: 'Electrical & Electronics', unit: 'Pcs', festivalTags: ['MONSOON'], source: 'Flipkart Construction', image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=350&q=80', stockCountHint: 'Roof & Window Leak Seal' },
  { id: 'el-27', name: 'Heavy Duty 4-Step Anti-Skid Aluminum Folding Ladder for Home', brand: 'Plantex', niche: 'Electrical & Electronics', category: 'Electrical & Electronics', unit: 'Pcs', source: 'Amazon Home Essentials', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=350&q=80', stockCountHint: 'Safe Home Step Ladder' },
  { id: 'el-28', name: 'Digital Multimeter AC/DC Voltage & Current Tester with Probes', brand: 'Generic', niche: 'Electrical & Electronics', category: 'Electrical & Electronics', unit: 'Pcs', source: 'Flipkart Hardware', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=350&q=80', stockCountHint: 'Electrician Fault Checker' },
  { id: 'el-29', name: 'Rechargeable 5W High Power LED Torch Light with Solar Charging', brand: 'Wipro', niche: 'Electrical & Electronics', category: 'Electrical & Electronics', unit: 'Pcs', source: 'Amazon Outdoor', image: 'https://images.unsplash.com/photo-1550524514-966953a9254d?w=350&q=80', stockCountHint: 'Emergency Farm & Night Torch' },
  { id: 'el-30', name: 'Anchor Ding Dong Mechanical Electronic Doorbell (240V)', brand: 'Anchor', niche: 'Electrical & Electronics', category: 'Electrical & Electronics', unit: 'Pcs', source: 'Flipkart Home', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=350&q=80', stockCountHint: 'Classic Ding Dong Melody' },

  // ==========================================
  // 6. 💊 MEDICAL & PHARMACY (30 Items)
  // ==========================================
  { id: 'm-01', name: 'Dettol Antiseptic Disinfectant Liquid 550ml Bottle', brand: 'Dettol', niche: 'Medical & Pharmacy', category: 'Medical & Pharmacy', unit: 'Pcs', source: 'Amazon Pharmacy Bestseller', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=350&q=80', stockCountHint: '#1 First Aid Antiseptic' },
  { id: 'm-02', name: 'Volini Pain Relief Fast Action Spray 100g Aerosol Can', brand: 'Volini', niche: 'Medical & Pharmacy', category: 'Medical & Pharmacy', unit: 'Pcs', source: 'Flipkart Health', image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=350&q=80', stockCountHint: 'Joint & Muscle Spray' },
  { id: 'm-03', name: 'Band-Aid Washproof Medicated Strips (Box of 100 Strips)', brand: 'Johnson & Johnson', niche: 'Medical & Pharmacy', category: 'Medical & Pharmacy', unit: 'Box', source: 'Amazon Pharmacy', image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=350&q=80', stockCountHint: 'Daily Counter First Aid' },
  { id: 'm-04', name: 'Revital H Daily Health Multivitamin Supplements (30 Capsules)', brand: 'Sun Pharma', niche: 'Medical & Pharmacy', category: 'Medical & Pharmacy', unit: 'Box', source: 'Flipkart Health', image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=350&q=80', stockCountHint: '#1 Daily Energy Booster' },
  { id: 'm-05', name: 'Moov Fast Pain Relief Ayurvedic Balm 50g Tub', brand: 'Moov', niche: 'Medical & Pharmacy', category: 'Medical & Pharmacy', unit: 'Pcs', source: 'Amazon Pharmacy', image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=350&q=80', stockCountHint: 'Aah Se Aaha Tak Balm' },
  { id: 'm-06', name: 'Eno Fast Relief Fruit Salt Antacid Powder 100g Lemon Bottle', brand: 'Eno', niche: 'Medical & Pharmacy', category: 'Medical & Pharmacy', unit: 'Bottle', festivalTags: ['DIWALI', 'GANESH_CHATURTHI', 'HOLI'], source: 'Flipkart Supermart', image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=350&q=80', stockCountHint: '6-Second Acidity Relief' },
  { id: 'm-07', name: 'Dabur Chyawanprash 2X Immunity Booster 1kg Jar', brand: 'Dabur', niche: 'Medical & Pharmacy', category: 'Medical & Pharmacy', unit: 'Jar', festivalTags: ['WINTER'], source: 'Amazon Health', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=350&q=80', stockCountHint: 'Heritage Winter Immunity' },
  { id: 'm-08', name: 'Vicks VapoRub Cold & Cough Relief Balm 50g Tub', brand: 'Vicks', niche: 'Medical & Pharmacy', category: 'Medical & Pharmacy', unit: 'Pcs', festivalTags: ['WINTER', 'MONSOON'], source: 'Flipkart Pharmacy', image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=350&q=80', stockCountHint: 'Household Cold Relief' },
  { id: 'm-09', name: 'Cipla Prolyte ORS Ready Drink Tetra Pack 200ml (Apple Flavor)', brand: 'Cipla', niche: 'Medical & Pharmacy', category: 'Medical & Pharmacy', unit: 'Pkt', festivalTags: ['SUMMER'], source: 'Amazon Health', image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=350&q=80', stockCountHint: 'Instant Rehydration Drink' },
  { id: 'm-10', name: 'Glucon-D Instant Energy Glucose Powder 500g Nimbu Pani', brand: 'Glucon-D', niche: 'Medical & Pharmacy', category: 'Medical & Pharmacy', unit: 'Pkt', festivalTags: ['SUMMER'], source: 'Flipkart Supermart', image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=350&q=80', stockCountHint: 'Summer Energy Drink' },
  { id: 'm-11', name: 'Himalaya Liv.52 Herbal Liver Support Tablets (Bottle of 100)', brand: 'Himalaya', niche: 'Medical & Pharmacy', category: 'Medical & Pharmacy', unit: 'Bottle', source: 'Amazon Ayurveda', image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=350&q=80', stockCountHint: 'Ayurvedic Liver Care' },
  { id: 'm-12', name: 'Dabur Honitus Herbal Cough Syrup 100ml Bottle', brand: 'Dabur', niche: 'Medical & Pharmacy', category: 'Medical & Pharmacy', unit: 'Bottle', source: 'Flipkart Health', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=350&q=80', stockCountHint: 'Non-Drowsy Cough Syrup' },
  { id: 'm-13', name: 'Strepsils Ayurvedic Lozenges Honey & Lemon (Pack of 200 Strips)', brand: 'Strepsils', niche: 'Medical & Pharmacy', category: 'Medical & Pharmacy', unit: 'Jar', source: 'Amazon Pharmacy', image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=350&q=80', stockCountHint: 'Sore Throat Relief Drop' },
  { id: 'm-14', name: 'Accu-Chek Active Blood Glucose Monitor Test Strips (50 Strips)', brand: 'Roche', niche: 'Medical & Pharmacy', category: 'Medical & Pharmacy', unit: 'Box', source: 'Flipkart Diabetes Care', image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=350&q=80', stockCountHint: 'Diabetic Sugar Test Strip' },
  { id: 'm-15', name: 'Dr. Trust Digital Electronic Blood Pressure Monitor with Talking Feature', brand: 'Dr. Trust', niche: 'Medical & Pharmacy', category: 'Medical & Pharmacy', unit: 'Pcs', source: 'Amazon Medical Devices', image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=350&q=80', stockCountHint: 'Automatic Home BP Machine' },
  { id: 'm-16', name: 'Omron Digital Clinical Body Thermometer with Beep Alert', brand: 'Omron', niche: 'Medical & Pharmacy', category: 'Medical & Pharmacy', unit: 'Pcs', source: 'Flipkart Health', image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=350&q=80', stockCountHint: 'Fast Fever Temperature Check' },
  { id: 'm-17', name: 'Cotton Absorbent Surgical Roll 500g Hospital Grade', brand: 'Generic', niche: 'Medical & Pharmacy', category: 'Medical & Pharmacy', unit: 'Roll', source: 'Amazon Pharmacy', image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=350&q=80', stockCountHint: 'First Aid Dressing Cotton' },
  { id: 'm-18', name: 'Crepe Elastic Compression Bandage for Sprain 10cm x 4M', brand: 'Flamingo', niche: 'Medical & Pharmacy', category: 'Medical & Pharmacy', unit: 'Pcs', source: 'Flipkart Pharmacy', image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=350&q=80', stockCountHint: 'Ankle & Wrist Sprain Bandage' },
  { id: 'm-19', name: 'Soframycin Skin Antibacterial Cream 30g Tube', brand: 'Sanofi', niche: 'Medical & Pharmacy', category: 'Medical & Pharmacy', unit: 'Tube', source: 'Amazon Pharmacy', image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=350&q=80', stockCountHint: 'Burn & Cut Healing Cream' },
  { id: 'm-20', name: 'Betadine 10% Microbicidal Antiseptic Solution 100ml', brand: 'Win-Medicare', niche: 'Medical & Pharmacy', category: 'Medical & Pharmacy', unit: 'Bottle', source: 'Flipkart Health', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=350&q=80', stockCountHint: 'Povidone Iodine Wound Liquid' },
  { id: 'm-21', name: 'Savlon Antiseptic Liquid for Bathing & Laundry Disinfection 1L', brand: 'ITC Savlon', niche: 'Medical & Pharmacy', category: 'Medical & Pharmacy', unit: 'Bottle', source: 'Amazon Pharmacy', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=350&q=80', stockCountHint: 'Non-Stinging Antiseptic' },
  { id: 'm-22', name: 'Digene Antacid Sugar-Free Liquid Syrup 200ml (Mint Flavor)', brand: 'Abbott', niche: 'Medical & Pharmacy', category: 'Medical & Pharmacy', unit: 'Bottle', source: 'Flipkart Pharmacy', image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=350&q=80', stockCountHint: 'Heartburn & Gas Relief' },
  { id: 'm-23', name: 'Pudina Hara Natural Pearl Softgel Capsules (Strip of 10)', brand: 'Dabur', niche: 'Medical & Pharmacy', category: 'Medical & Pharmacy', unit: 'Strip', source: 'Amazon Ayurveda', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=350&q=80', stockCountHint: 'Herbal Stomach Pain Relief' },
  { id: 'm-24', name: 'Amrutanjan Strong Pain Relief Ayurvedic Balm 50g', brand: 'Amrutanjan', niche: 'Medical & Pharmacy', category: 'Medical & Pharmacy', unit: 'Pcs', source: 'Flipkart Pharmacy', image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=350&q=80', stockCountHint: 'Headache & Cold Balm' },
  { id: 'm-25', name: 'Zandu Balm Fast Action Ayurvedic Pain Relief 25g', brand: 'Zandu', niche: 'Medical & Pharmacy', category: 'Medical & Pharmacy', unit: 'Pcs', source: 'Amazon Health', image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=350&q=80', stockCountHint: 'Heritage Pain Relief' },
  { id: 'm-26', name: 'Whisper Ultra Clean Sanitary Pads XL+ Wings (Pack of 30)', brand: 'Whisper', niche: 'Medical & Pharmacy', category: 'Medical & Pharmacy', unit: 'Pkt', source: 'Flipkart Women Hygiene', image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=350&q=80', stockCountHint: '#1 Sanitary Pad in India' },
  { id: 'm-27', name: 'Stayfree Secure Cottony Sanitary Napkins with Wings (Pack of 28)', brand: 'Stayfree', niche: 'Medical & Pharmacy', category: 'Medical & Pharmacy', unit: 'Pkt', source: 'Amazon Hygiene', image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=350&q=80', stockCountHint: 'Soft Cottony Wings Pad' },
  { id: 'm-28', name: 'Dettol Original Germ Protection Liquid Handwash Refill Pouch 1.5L', brand: 'Dettol', niche: 'Medical & Pharmacy', category: 'Medical & Pharmacy', unit: 'Pkt', source: 'Flipkart Supermart', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=350&q=80', stockCountHint: 'Mega Value Handwash Refill' },
  { id: 'm-29', name: 'Lifebuoy Total 10 Antibacterial Germ Protection Soap (Pack of 4)', brand: 'Lifebuoy', niche: 'Medical & Pharmacy', category: 'Medical & Pharmacy', unit: 'Pkt', source: 'Amazon Fresh', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=350&q=80', stockCountHint: 'Classic Antibacterial Soap' },
  { id: 'm-30', name: 'Himalaya Pure Hands Herbal Instant Hand Sanitizer 500ml Pump', brand: 'Himalaya', niche: 'Medical & Pharmacy', category: 'Medical & Pharmacy', unit: 'Bottle', source: 'Flipkart Health', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=350&q=80', stockCountHint: '70% Alcohol Germ Defense' },

  // ==========================================
  // 7. 🍞 BAKERY & CONFECTIONERY (30 Items)
  // ==========================================
  { id: 'bk-01', name: 'Britannia 100% Whole Wheat Fresh Sliced Bread 400g', brand: 'Britannia', niche: 'Bakery & Confectionery', category: 'Bakery & Confectionery', unit: 'Pkt', source: 'Amazon Fresh', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=350&q=80', stockCountHint: 'Daily Fresh Morning Supply' },
  { id: 'bk-02', name: 'Amul Pasteurised Salted Table Butter 100g Carton', brand: 'Amul', niche: 'Bakery & Confectionery', category: 'Bakery & Confectionery', unit: 'Pkt', source: 'BigBasket Fresh', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=350&q=80', stockCountHint: '#1 Butter in India' },
  { id: 'bk-03', name: 'Britannia Toastea Premium Crunchy Wheat Bake Rusk 200g', brand: 'Britannia', niche: 'Bakery & Confectionery', category: 'Bakery & Confectionery', unit: 'Pkt', source: 'Flipkart Supermart', image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=350&q=80', stockCountHint: 'Tea Companion Rusk' },
  { id: 'bk-04', name: 'Cadbury Dairy Milk Silk Chocolate Bar 60g', brand: 'Cadbury', niche: 'Bakery & Confectionery', category: 'Bakery & Confectionery', unit: 'Pcs', source: 'Amazon Bestseller', image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=350&q=80', stockCountHint: '#1 Chocolate in India' },
  { id: 'bk-05', name: 'Parle-G Gold Glucose Biscuits 1kg Value Family Pack', brand: 'Parle', niche: 'Bakery & Confectionery', category: 'Bakery & Confectionery', unit: 'Pkt', source: 'Amazon Pantry', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=350&q=80', stockCountHint: '#1 Biscuit Worldwide' },
  { id: 'bk-06', name: 'Britannia Good Day Cashew Cookies 200g Pouch', brand: 'Britannia', niche: 'Bakery & Confectionery', category: 'Bakery & Confectionery', unit: 'Pkt', source: 'Flipkart Supermart', image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=350&q=80', stockCountHint: 'Rich Butter Cookie' },
  { id: 'bk-07', name: 'Amul Processed Cheese Slices 200g (Pack of 10 Slices)', brand: 'Amul', niche: 'Bakery & Confectionery', category: 'Bakery & Confectionery', unit: 'Pkt', source: 'Flipkart Grocery', image: 'https://images.unsplash.com/photo-1618164435735-413d3b066c9a?w=350&q=80', stockCountHint: 'Sandwich Cheese Slices' },
  { id: 'bk-08', name: 'Amul Fresh Malai Paneer 200g Block Pack', brand: 'Amul', niche: 'Bakery & Confectionery', category: 'Bakery & Confectionery', unit: 'Pkt', source: 'BigBasket Fresh', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=350&q=80', stockCountHint: 'Fresh Soft Malai Paneer' },
  { id: 'bk-09', name: 'Nestlé Milkmaid Sweetened Condensed Milk 400g Tin', brand: 'Nestlé', niche: 'Bakery & Confectionery', category: 'Bakery & Confectionery', unit: 'Tin', festivalTags: ['DIWALI', 'GANESH_CHATURTHI', 'FESTIVE_SWEETS'], source: 'Amazon Baking', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=350&q=80', stockCountHint: 'Instant Mithai Ingredient' },
  { id: 'bk-10', name: 'Hershey\'s Rich Genuine Chocolate Flavored Syrup 623g Bottle', brand: 'Hersheys', niche: 'Bakery & Confectionery', category: 'Bakery & Confectionery', unit: 'Bottle', source: 'Flipkart Supermart', image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=350&q=80', stockCountHint: 'Milkshake & Cake Topping' },
  { id: 'bk-11', name: 'Nutella Hazelnut Cocoa Spread with Cocoa 350g Glass Jar', brand: 'Ferrero', niche: 'Bakery & Confectionery', category: 'Bakery & Confectionery', unit: 'Jar', source: 'Amazon Fresh', image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=350&q=80', stockCountHint: 'Premium Breakfast Spread' },
  { id: 'bk-12', name: 'Haldiram\'s Nagpur Gulab Jamun Traditional Tin 1kg', brand: 'Haldiram', niche: 'Bakery & Confectionery', category: 'Bakery & Confectionery', unit: 'Tin', festivalTags: ['DIWALI', 'HOLI', 'GANESH_CHATURTHI'], source: 'Flipkart Festive', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=350&q=80', stockCountHint: 'Classic Indian Sweet Tin' },
  { id: 'bk-13', name: 'Bikaji Aslee Bikaneri Soan Papdi Festive Box 500g', brand: 'Bikaji', niche: 'Bakery & Confectionery', category: 'Bakery & Confectionery', unit: 'Box', festivalTags: ['DIWALI', 'RAKSHA_BANDHAN'], source: 'Amazon Sweets', image: 'https://images.unsplash.com/photo-1585994192701-f1a505c8574a?w=350&q=80', stockCountHint: '#1 Diwali Gifting Sweet' },
  { id: 'bk-14', name: 'Oreo Original Vanilla Creme Sandwich Cookies 300g Value Pack', brand: 'Cadbury', niche: 'Bakery & Confectionery', category: 'Bakery & Confectionery', unit: 'Pkt', source: 'Flipkart Supermart', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=350&q=80', stockCountHint: 'Twist Lick Dunk Biscuit' },
  { id: 'bk-15', name: 'Sunfeast Dark Fantasy Choco Fills Crunchy Cookies 300g', brand: 'Sunfeast', niche: 'Bakery & Confectionery', category: 'Bakery & Confectionery', unit: 'Pkt', source: 'Amazon Pantry', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=350&q=80', stockCountHint: 'Molten Choco Core Cookie' },
  { id: 'bk-16', name: 'Britannia Bourbon Chocolate Cream Biscuits 150g (Pack of 3)', brand: 'Britannia', niche: 'Bakery & Confectionery', category: 'Bakery & Confectionery', unit: 'Pkt', source: 'Flipkart Supermart', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=350&q=80', stockCountHint: 'Sugar Sprinkled Choco Biscuit' },
  { id: 'bk-17', name: 'Britannia Treat Fruit & Nut Cake Slice 250g Box', brand: 'Britannia', niche: 'Bakery & Confectionery', category: 'Bakery & Confectionery', unit: 'Box', festivalTags: ['CHRISTMAS'], source: 'Amazon Fresh', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=350&q=80', stockCountHint: 'Soft Fruit Cake Bar' },
  { id: 'bk-18', name: 'Winkies Swiss Roll Chocolate Cake Snack (Pack of 6)', brand: 'Winkies', niche: 'Bakery & Confectionery', category: 'Bakery & Confectionery', unit: 'Pkt', source: 'Flipkart Grocery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=350&q=80', stockCountHint: 'Kids Snack Cake' },
  { id: 'bk-19', name: 'Ferrero Rocher Premium Hazelnut Chocolates Diamond Box (16 Pieces)', brand: 'Ferrero Rocher', niche: 'Bakery & Confectionery', category: 'Bakery & Confectionery', unit: 'Box', festivalTags: ['DIWALI', 'VALENTINE', 'CHRISTMAS'], source: 'Amazon Luxury Gifting', image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=350&q=80', stockCountHint: 'Luxury Gold Gifting Chocolate' },
  { id: 'bk-20', name: 'Nestlé KitKat 4-Finger Crisp Wafer Chocolate Bar 38g (Pack of 8)', brand: 'Nestlé', niche: 'Bakery & Confectionery', category: 'Bakery & Confectionery', unit: 'Pkt', source: 'Flipkart Supermart', image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=350&q=80', stockCountHint: 'Have a Break Wafer' },
  { id: 'bk-21', name: 'Cadbury 5 Star Caramel & Nougat Filled Chocolate Bar 40g (Pack of 12)', brand: 'Cadbury', niche: 'Bakery & Confectionery', category: 'Bakery & Confectionery', unit: 'Pkt', source: 'Amazon Pantry', image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=350&q=80', stockCountHint: 'Fast Selling Counter Candy' },
  { id: 'bk-22', name: 'Snickers Peanut Caramel Chocolate Bar 45g (Pack of 5)', brand: 'Snickers', niche: 'Bakery & Confectionery', category: 'Bakery & Confectionery', unit: 'Pkt', source: 'Flipkart Grocery', image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=350&q=80', stockCountHint: 'Nutty Hunger Bar' },
  { id: 'bk-23', name: 'Weikfield Cocoa Powder for Baking Cakes & Brownies 50g Box', brand: 'Weikfield', niche: 'Bakery & Confectionery', category: 'Bakery & Confectionery', unit: 'Box', source: 'Amazon Baking Supplies', image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=350&q=80', stockCountHint: 'Pure Dutch Cocoa Powder' },
  { id: 'bk-24', name: 'Weikfield Double Action Baking Powder 100g Can', brand: 'Weikfield', niche: 'Bakery & Confectionery', category: 'Bakery & Confectionery', unit: 'Can', source: 'Flipkart Grocery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=350&q=80', stockCountHint: 'Cake & Bread Rising Powder' },
  { id: 'bk-25', name: 'Pillsbury Moist Supreme Rich Choco Fudge Cake Mix 250g', brand: 'Pillsbury', niche: 'Bakery & Confectionery', category: 'Bakery & Confectionery', unit: 'Pkt', source: 'Amazon Baking', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=350&q=80', stockCountHint: 'Ready Oven & Cooker Cake Mix' },
  { id: 'bk-26', name: 'Haldiram\'s Nagpur Rasgulla Sweet Tin 1kg', brand: 'Haldiram', niche: 'Bakery & Confectionery', category: 'Bakery & Confectionery', unit: 'Tin', festivalTags: ['DIWALI', 'DURGA_PUJA', 'HOLI'], source: 'Flipkart Festive', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=350&q=80', stockCountHint: 'Soft Spongy Chena Sweet' },
  { id: 'bk-27', name: 'Amul Masti Dahi Fresh Curd Tub 400g', brand: 'Amul', niche: 'Bakery & Confectionery', category: 'Bakery & Confectionery', unit: 'Tub', source: 'BigBasket Fresh', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=350&q=80', stockCountHint: 'Daily Fresh Dahi' },
  { id: 'bk-28', name: 'Amul Mithai Mate Sweetened Condensed Milk 200g Tin', brand: 'Amul', niche: 'Bakery & Confectionery', category: 'Bakery & Confectionery', unit: 'Tin', festivalTags: ['DIWALI', 'GANESH_CHATURTHI'], source: 'Amazon Fresh', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=350&q=80', stockCountHint: 'Dessert Base Milk' },
  { id: 'bk-29', name: 'Unibic Assorted Butter, Cashew & Choco Chip Cookies Box 500g', brand: 'Unibic', niche: 'Bakery & Confectionery', category: 'Bakery & Confectionery', unit: 'Box', festivalTags: ['CHRISTMAS', 'DIWALI'], source: 'Flipkart Supermart', image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=350&q=80', stockCountHint: 'Premium Gourmet Cookie Box' },
  { id: 'bk-30', name: 'Lay\'s India\'s Magic Masala Crunchy Potato Chips 50g (Pack of 4)', brand: 'Lay\'s', niche: 'Bakery & Confectionery', category: 'Bakery & Confectionery', unit: 'Pkt', source: 'Amazon Pantry Bestseller', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=350&q=80', stockCountHint: '#1 Savory Snack in India' }
];

/**
 * Optional Google Gemini AI Dynamic Multi-Niche Generator
 */
async function fetchGeminiRecommendations(apiKey) {
  if (!apiKey) return null;

  const todayStr = new Date().toISOString().split('T')[0];
  const prompt = `Today's date is ${todayStr}. You are an expert Indian Retail & FMCG wholesale merchandise advisor.
Identify all upcoming Indian festivals, seasons, and major events in the next 30 days.
Generate a comprehensive JSON array of trending wholesale products for Indian shops across 7 categories:
1. Grocery & Essentials
2. Toys & Gift Items
3. Apparel & Clothing
4. General Items
5. Electrical & Electronics
6. Medical & Pharmacy
7. Bakery & Confectionery

Format each object with keys:
- id: string
- name: string (detailed real product title with size/weight)
- brand: string (real authentic Indian brand e.g. Amul, Tata, Cadbury, Britannia, Havells, Dettol, Archies, Allen Solly)
- category: string (one of the 7 above)
- niche: string (same as category)
- unit: string (Pkt, Box, Pcs, kg, Tin)
- festivalTags: array of strings (e.g. ["DIWALI", "GANESH_CHATURTHI", "HOLI"])
- source: string (e.g. "Amazon Bestseller", "Flipkart Trending")
- image: string (valid high-res product photo URL)
- stockCountHint: string (e.g. "#1 Festive Pick", "High Demand")

Return ONLY raw valid JSON array without markdown wrapping.`;

  return new Promise((resolve) => {
    const postData = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" }
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 15000
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            const items = JSON.parse(text);
            if (Array.isArray(items) && items.length > 0) {
              console.log(`🤖 Gemini AI generated ${items.length} dynamic products!`);
              resolve(items);
              return;
            }
          }
        } catch (e) {
          console.warn('Gemini response parse error, falling back:', e.message);
        }
        resolve(null);
      });
    });

    req.on('error', (e) => {
      console.warn('Gemini request failed, falling back:', e.message);
      resolve(null);
    });

    req.write(postData);
    req.end();
  });
}

async function generateTrendingFeed() {
  console.log('🚀 Starting 210+ Multi-Niche & Festival Catalog Generation...');

  const apiKey = process.env.GEMINI_API_KEY;
  let dynamicItems = null;

  if (apiKey) {
    console.log('🔑 GEMINI_API_KEY detected. Requesting live AI festival suggestions...');
    dynamicItems = await fetchGeminiRecommendations(apiKey);
  } else {
    console.log('ℹ️ No GEMINI_API_KEY detected. Using comprehensive 210+ multi-niche catalog.');
  }

  const trendingItems = (dynamicItems && dynamicItems.length > 0) ? dynamicItems : MASTER_NICHE_CATALOG;
  const combinedCatalog = [...PROMOTED_BRANDS_LIST, ...trendingItems];

  const outputPath = fs.existsSync(path.join(__dirname, 'trending_fmcg.json')) 
    ? path.join(__dirname, 'trending_fmcg.json')
    : path.join(__dirname, '..', 'trending_fmcg.json');

  fs.writeFileSync(outputPath, JSON.stringify(combinedCatalog, null, 2), 'utf-8');
  console.log(`✅ Successfully generated ${combinedCatalog.length} products (30+ per niche) to ${outputPath}`);
}

generateTrendingFeed();
