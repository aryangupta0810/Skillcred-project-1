// Mock Shopify Storefront API service
// In a real implementation, this would use GraphQL queries to fetch data from Shopify

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  variants: ProductVariant[];
  category: string;
  tags: string[];
  available: boolean;
  rating: number;
  reviewCount: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  available: boolean;
  size?: string;
  color?: string;
  material?: string;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  productCount: number;
}

class ShopifyService {
  private mockProducts: Product[] = [
    // Clothing & Fashion
    {
      id: '1',
      title: 'Classic Denim Jacket',
      description: 'A timeless denim jacket perfect for any casual occasion. Made from premium denim with a comfortable fit.',
      price: 6749,
      compareAtPrice: 8999,
      images: [
        'https://images.unsplash.com/photo-1576995853123-5a89c7f02c73?w=500&h=600&fit=crop',
        'https://images.unsplash.com/photo-1576995853123-5a89c7f02c73?w=500&h=600&fit=crop&crop=face'
      ],
      variants: [
        { id: '1-1', title: 'Small', price: 6749, available: true, size: 'S' },
        { id: '1-2', title: 'Medium', price: 6749, available: true, size: 'M' },
        { id: '1-3', title: 'Large', price: 6749, available: true, size: 'L' }
      ],
      category: 'Outerwear',
      tags: ['denim', 'casual', 'jacket', 'classic'],
      available: true,
      rating: 4.8,
      reviewCount: 127
    },
    {
      id: '2',
      title: 'Sustainable Cotton T-Shirt',
      description: 'Eco-friendly cotton t-shirt made from organic materials. Soft, breathable, and perfect for everyday wear.',
      price: 2249,
      images: [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop',
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop&crop=face'
      ],
      variants: [
        { id: '2-1', title: 'Small', price: 2249, available: true, size: 'S', color: 'White' },
        { id: '2-2', title: 'Medium', price: 2249, available: true, size: 'M', color: 'White' },
        { id: '2-3', title: 'Large', price: 2249, available: true, size: 'L', color: 'White' }
      ],
      category: 'Tops',
      tags: ['cotton', 'sustainable', 'basic', 'casual'],
      available: true,
      rating: 4.6,
      reviewCount: 89
    },
    {
      id: '3',
      title: 'Elegant Blouse',
      description: 'A sophisticated blouse perfect for professional settings. Made from high-quality silk blend with a flattering cut.',
      price: 9749,
      images: [
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop',
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop&crop=face'
      ],
      variants: [
        { id: '4-1', title: 'Small', price: 9749, available: true, size: 'S', color: 'Cream' },
        { id: '4-2', title: 'Medium', price: 9749, available: true, size: 'M', color: 'Cream' },
        { id: '4-3', title: 'Large', price: 9749, available: true, size: 'L', color: 'Cream' }
      ],
      category: 'Tops',
      tags: ['blouse', 'professional', 'elegant', 'silk'],
      available: true,
      rating: 4.9,
      reviewCount: 73
    },
    {
      id: '4',
      title: 'High-Waisted Jeans',
      description: 'Trendy high-waisted jeans with a perfect fit. Stretchy denim that flatters every body type.',
      price: 5249,
      images: [
        'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop',
        'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop&crop=face'
      ],
      variants: [
        { id: '5-1', title: '26', price: 5249, available: true, size: '26' },
        { id: '5-2', title: '28', price: 5249, available: true, size: '28' },
        { id: '5-3', title: '30', price: 5249, available: true, size: '30' }
      ],
      category: 'Bottoms',
      tags: ['jeans', 'high-waisted', 'trendy', 'stretchy'],
      available: true,
      rating: 4.5,
      reviewCount: 94
    },

    // Footwear
    {
      id: '5',
      title: 'Versatile Sneakers',
      description: 'Comfortable and stylish sneakers perfect for both casual and athletic wear. Lightweight design with excellent support.',
      price: 5999,
      compareAtPrice: 7499,
      images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop&crop=face'
      ],
      variants: [
        { id: '5-1', title: 'US 7', price: 5999, available: true, size: '7' },
        { id: '5-2', title: 'US 8', price: 5999, available: true, size: '8' },
        { id: '5-3', title: 'US 9', price: 5999, available: true, size: '9' }
      ],
      category: 'Footwear',
      tags: ['sneakers', 'comfortable', 'versatile', 'athletic'],
      available: true,
      rating: 4.7,
      reviewCount: 156
    },
    {
      id: '6',
      title: 'Premium Leather Boots',
      description: 'Handcrafted leather boots with superior comfort and durability. Perfect for both casual and formal occasions.',
      price: 12499,
      compareAtPrice: 15999,
      images: [
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop',
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop&crop=face'
      ],
      variants: [
        { id: '6-1', title: 'US 8', price: 12499, available: true, size: '8' },
        { id: '6-2', title: 'US 9', price: 12499, available: true, size: '9' },
        { id: '6-3', title: 'US 10', price: 12499, available: true, size: '10' }
      ],
      category: 'Footwear',
      tags: ['boots', 'leather', 'premium', 'formal'],
      available: true,
      rating: 4.9,
      reviewCount: 89
    },
    {
      id: '7',
      title: 'Running Shoes',
      description: 'High-performance running shoes with advanced cushioning technology. Ideal for marathon training and daily runs.',
      price: 8499,
      images: [
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=600&fit=crop',
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=600&fit=crop&crop=face'
      ],
      variants: [
        { id: '7-1', title: 'US 7', price: 8499, available: true, size: '7' },
        { id: '7-2', title: 'US 8', price: 8499, available: true, size: '8' },
        { id: '7-3', title: 'US 9', price: 8499, available: true, size: '9' }
      ],
      category: 'Footwear',
      tags: ['running', 'athletic', 'performance', 'comfortable'],
      available: true,
      rating: 4.8,
      reviewCount: 203
    },

    // Watches
    {
      id: '8',
      title: 'Smart Fitness Watch',
      description: 'Advanced fitness tracking with heart rate monitoring, GPS, and 7-day battery life. Water-resistant and stylish design.',
      price: 18999,
      compareAtPrice: 22999,
      images: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=600&fit=crop',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=600&fit=crop&crop=face'
      ],
      variants: [
        { id: '8-1', title: '42mm Black', price: 18999, available: true, size: '42mm', color: 'Black' },
        { id: '8-2', title: '42mm Silver', price: 18999, available: true, size: '42mm', color: 'Silver' },
        { id: '8-3', title: '46mm Black', price: 18999, available: true, size: '46mm', color: 'Black' }
      ],
      category: 'Watches',
      tags: ['smartwatch', 'fitness', 'tracking', 'modern'],
      available: true,
      rating: 4.7,
      reviewCount: 156
    },
    {
      id: '9',
      title: 'Classic Analog Watch',
      description: 'Timeless analog watch with premium stainless steel case and genuine leather strap. Perfect for everyday elegance.',
      price: 8999,
      images: [
        'https://images.unsplash.com/photo-1434056886845-d40ae3822e70?w=500&h=600&fit=crop',
        'https://images.unsplash.com/photo-1434056886845-d40ae3822e70?w=500&h=600&fit=crop&crop=face'
      ],
      variants: [
        { id: '9-1', title: '40mm Brown', price: 8999, available: true, size: '40mm', color: 'Brown' },
        { id: '9-2', title: '40mm Black', price: 8999, available: true, size: '40mm', color: 'Black' },
        { id: '9-3', title: '42mm Brown', price: 8999, available: true, size: '42mm', color: 'Brown' }
      ],
      category: 'Watches',
      tags: ['analog', 'classic', 'elegant', 'leather'],
      available: true,
      rating: 4.6,
      reviewCount: 94
    },
    {
      id: '10',
      title: 'Luxury Chronograph Watch',
      description: 'Premium chronograph watch with automatic movement and sapphire crystal. A statement piece for the sophisticated collector.',
      price: 45999,
      images: [
        'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=500&h=600&fit=crop',
        'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=500&h=600&fit=crop&crop=face'
      ],
      variants: [
        { id: '10-1', title: '42mm Silver', price: 45999, available: true, size: '42mm', color: 'Silver' },
        { id: '10-2', title: '42mm Gold', price: 45999, available: true, size: '42mm', color: 'Gold' }
      ],
      category: 'Watches',
      tags: ['luxury', 'chronograph', 'automatic', 'premium'],
      available: true,
      rating: 4.9,
      reviewCount: 67
    },

    // Laptops
    {
      id: '11',
      title: 'Ultrabook Laptop',
      description: 'Slim and powerful ultrabook with 13-inch display, Intel i7 processor, 16GB RAM, and 512GB SSD. Perfect for work and creativity.',
      price: 74999,
      compareAtPrice: 89999,
      images: [
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=600&fit=crop',
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=600&fit=crop&crop=face'
      ],
      variants: [
        { id: '11-1', title: 'i7/16GB/512GB', price: 74999, available: true, size: '13-inch', color: 'Silver' },
        { id: '11-2', title: 'i7/16GB/1TB', price: 84999, available: true, size: '13-inch', color: 'Silver' }
      ],
      category: 'Laptops',
      tags: ['ultrabook', 'portable', 'powerful', 'business'],
      available: true,
      rating: 4.8,
      reviewCount: 234
    },
    {
      id: '12',
      title: 'Gaming Laptop',
      description: 'High-performance gaming laptop with RTX 4060 graphics, AMD Ryzen 7 processor, 16GB RAM, and 1TB SSD. Built for gamers.',
      price: 89999,
      images: [
        'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=600&fit=crop',
        'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=600&fit=crop&crop=face'
      ],
      variants: [
        { id: '12-1', title: 'Ryzen 7/16GB/1TB', price: 89999, available: true, size: '15.6-inch', color: 'Black' },
        { id: '12-2', title: 'Ryzen 7/32GB/1TB', price: 99999, available: true, size: '15.6-inch', color: 'Black' }
      ],
      category: 'Laptops',
      tags: ['gaming', 'performance', 'rtx', 'gaming'],
      available: true,
      rating: 4.7,
      reviewCount: 189
    },
    {
      id: '13',
      title: 'Student Laptop',
      description: 'Affordable laptop perfect for students with Intel i5 processor, 8GB RAM, and 256GB SSD. Lightweight and durable.',
      price: 39999,
      images: [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=600&fit=crop',
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=600&fit=crop&crop=face'
      ],
      variants: [
        { id: '13-1', title: 'i5/8GB/256GB', price: 39999, available: true, size: '14-inch', color: 'Silver' },
        { id: '13-2', title: 'i5/8GB/512GB', price: 44999, available: true, size: '14-inch', color: 'Silver' }
      ],
      category: 'Laptops',
      tags: ['student', 'affordable', 'lightweight', 'durable'],
      available: true,
      rating: 4.5,
      reviewCount: 156
    },

    // Makeup & Beauty
         {
       id: '14',
       title: 'Professional Makeup Palette',
       description: 'Complete eyeshadow palette with 18 highly pigmented shades. Perfect for creating both natural and dramatic looks.',
       price: 2499,
       compareAtPrice: 3499,
       images: [
         'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&h=600&fit=crop',
         'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&h=600&fit=crop&crop=face'
       ],
       variants: [
         { id: '14-1', title: 'Classic', price: 2499, available: true, size: '18 shades', color: 'Multi' },
         { id: '14-2', title: 'Nude', price: 2499, available: true, size: '18 shades', color: 'Nude' }
       ],
       category: 'Makeup',
       tags: ['eyeshadow', 'palette', 'professional', 'pigmented'],
       available: true,
       rating: 4.6,
       reviewCount: 203
     },
     {
       id: '15',
       title: 'Liquid Foundation',
       description: 'Long-lasting liquid foundation with buildable coverage. Suitable for all skin types with SPF 30 protection.',
       price: 1799,
       images: [
         'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=600&fit=crop',
         'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=600&fit=crop&crop=face'
       ],
       variants: [
         { id: '15-1', title: 'Light', price: 1799, available: true, size: '30ml', color: 'Light' },
         { id: '15-2', title: 'Medium', price: 1799, available: true, size: '30ml', color: 'Medium' },
         { id: '15-3', title: 'Dark', price: 1799, available: true, size: '30ml', color: 'Dark' }
       ],
       category: 'Makeup',
       tags: ['foundation', 'long-lasting', 'spf', 'buildable'],
       available: true,
       rating: 4.7,
       reviewCount: 178
     },
     {
       id: '16',
       title: 'Matte Lipstick Set',
       description: 'Set of 6 matte lipsticks in trending shades. Long-wearing formula with intense color payoff.',
       price: 1499,
       images: [
         'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&h=600&fit=crop',
         'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&h=600&fit=crop&crop=face'
       ],
       variants: [
         { id: '16-1', title: 'Classic Set', price: 1499, available: true, size: '6 pieces', color: 'Multi' },
         { id: '16-2', title: 'Bold Set', price: 1499, available: true, size: '6 pieces', color: 'Multi' }
       ],
       category: 'Makeup',
       tags: ['lipstick', 'matte', 'set', 'long-wearing'],
       available: true,
       rating: 4.8,
       reviewCount: 145
     },
     {
       id: '17',
       title: 'Makeup Brush Set',
       description: 'Professional 12-piece makeup brush set with soft synthetic bristles. Perfect for flawless application.',
       price: 1999,
       images: [
         'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop',
         'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop&crop=face'
       ],
       variants: [
         { id: '17-1', title: '12-piece Set', price: 1999, available: true, size: '12 pieces', color: 'Black' }
       ],
       category: 'Makeup',
       tags: ['brushes', 'professional', 'synthetic', 'complete'],
       available: true,
       rating: 4.5,
       reviewCount: 167
     },

     // Additional Laptops
     {
       id: '18',
       title: 'MacBook Air M2',
       description: 'Apple MacBook Air with M2 chip, 13.6-inch Liquid Retina display, 8GB RAM, and 256GB SSD. Ultra-portable and powerful.',
       price: 99999,
       compareAtPrice: 119999,
       images: [
         'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=600&fit=crop',
         'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=600&fit=crop&crop=face'
       ],
       variants: [
         { id: '18-1', title: 'M2/8GB/256GB', price: 99999, available: true, size: '13.6-inch', color: 'Space Gray' },
         { id: '18-2', title: 'M2/8GB/512GB', price: 114999, available: true, size: '13.6-inch', color: 'Space Gray' }
       ],
       category: 'Laptops',
       tags: ['macbook', 'apple', 'm2', 'ultrabook', 'premium'],
       available: true,
       rating: 4.9,
       reviewCount: 312
     },
     {
       id: '19',
       title: 'Dell XPS 13',
       description: 'Premium ultrabook with Intel i7 processor, 16GB RAM, 512GB SSD, and 13.4-inch InfinityEdge display. Perfect for professionals.',
       price: 84999,
       compareAtPrice: 99999,
       images: [
         'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=600&fit=crop',
         'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=600&fit=crop&crop=face'
       ],
       variants: [
         { id: '19-1', title: 'i7/16GB/512GB', price: 84999, available: true, size: '13.4-inch', color: 'Platinum Silver' },
         { id: '19-2', title: 'i7/16GB/1TB', price: 94999, available: true, size: '13.4-inch', color: 'Platinum Silver' }
       ],
       category: 'Laptops',
       tags: ['dell', 'xps', 'ultrabook', 'professional', 'premium'],
       available: true,
       rating: 4.7,
       reviewCount: 189
     },

     // Computer Accessories
     {
       id: '20',
       title: 'Wireless Gaming Mouse',
       description: 'High-precision wireless gaming mouse with 25K DPI sensor, RGB lighting, and 70-hour battery life. Perfect for gamers and professionals.',
       price: 5999,
       compareAtPrice: 7999,
       images: [
         'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=600&fit=crop',
         'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=600&fit=crop&crop=face'
       ],
       variants: [
         { id: '20-1', title: 'Black', price: 5999, available: true, size: 'Standard', color: 'Black' },
         { id: '20-2', title: 'White', price: 5999, available: true, size: 'Standard', color: 'White' }
       ],
       category: 'Computer Accessories',
       tags: ['mouse', 'wireless', 'gaming', 'rgb', 'high-dpi'],
       available: true,
       rating: 4.6,
       reviewCount: 234
     },
     {
       id: '21',
       title: 'Mechanical Keyboard',
       description: 'Premium mechanical keyboard with Cherry MX Blue switches, RGB backlighting, and aluminum frame. Ideal for typing and gaming.',
       price: 8999,
       compareAtPrice: 11999,
       images: [
         'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=600&fit=crop',
         'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=600&fit=crop&crop=face'
       ],
       variants: [
         { id: '21-1', title: 'Cherry MX Blue', price: 8999, available: true, size: 'Full-size', color: 'Black' },
         { id: '21-2', title: 'Cherry MX Red', price: 8999, available: true, size: 'Full-size', color: 'Black' }
       ],
       category: 'Computer Accessories',
       tags: ['keyboard', 'mechanical', 'cherry-mx', 'rgb', 'gaming'],
       available: true,
       rating: 4.8,
       reviewCount: 167
     },

     // Books & Novels
     {
       id: '22',
       title: 'The Great Gatsby',
       description: 'F. Scott Fitzgerald\'s masterpiece about the Jazz Age. A beautifully bound hardcover edition with gold foil accents.',
       price: 899,
       images: [
         'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=600&fit=crop',
         'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=600&fit=crop&crop=face'
       ],
       variants: [
         { id: '22-1', title: 'Hardcover', price: 899, available: true, size: 'Standard', color: 'Blue' }
       ],
       category: 'Books',
       tags: ['classic', 'fiction', 'hardcover', 'literature', 'jazz-age'],
       available: true,
       rating: 4.9,
       reviewCount: 456
     },
     {
       id: '23',
       title: '1984 by George Orwell',
       description: 'George Orwell\'s dystopian masterpiece. A thought-provoking novel about totalitarianism and surveillance society.',
       price: 699,
       images: [
         'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&h=600&fit=crop',
         'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&h=600&fit=crop&crop=face'
       ],
       variants: [
         { id: '23-1', title: 'Paperback', price: 699, available: true, size: 'Standard', color: 'Red' }
       ],
       category: 'Books',
       tags: ['dystopian', 'classic', 'fiction', 'political', 'paperback'],
       available: true,
       rating: 4.8,
       reviewCount: 389
     },
     {
       id: '24',
       title: 'Harry Potter Complete Set',
       description: 'Complete 7-book set of J.K. Rowling\'s Harry Potter series. Beautifully illustrated hardcover editions in a collector\'s box.',
       price: 4999,
       compareAtPrice: 6999,
       images: [
         'https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?w=500&h=600&fit=crop',
         'https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?w=500&h=600&fit=crop&crop=face'
       ],
       variants: [
         { id: '24-1', title: 'Complete Set', price: 4999, available: true, size: '7 books', color: 'Multi' }
       ],
       category: 'Books',
       tags: ['fantasy', 'harry-potter', 'complete-set', 'hardcover', 'collector'],
       available: true,
       rating: 4.9,
       reviewCount: 567
     },

     // Home Accessories
     {
       id: '25',
       title: 'Modern Table Lamp',
       description: 'Contemporary LED table lamp with adjustable brightness and warm white light. Perfect for bedside or desk use.',
       price: 3499,
       compareAtPrice: 4499,
       images: [
         'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=600&fit=crop',
         'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=600&fit=crop&crop=face'
       ],
       variants: [
         { id: '25-1', title: 'Black', price: 3499, available: true, size: 'Standard', color: 'Black' },
         { id: '25-2', title: 'White', price: 3499, available: true, size: 'Standard', color: 'White' }
       ],
       category: 'Home Accessories',
       tags: ['lamp', 'led', 'modern', 'adjustable', 'bedside'],
       available: true,
       rating: 4.5,
       reviewCount: 123
     },
     {
       id: '26',
       title: 'Ceramic Vase Set',
       description: 'Set of 3 handcrafted ceramic vases in different sizes. Perfect for flowers or as decorative pieces.',
       price: 2499,
       images: [
         'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop',
         'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop&crop=face'
       ],
       variants: [
         { id: '26-1', title: '3-piece Set', price: 2499, available: true, size: 'Various', color: 'White' }
       ],
       category: 'Home Accessories',
       tags: ['vase', 'ceramic', 'decorative', 'handcrafted', 'set'],
       available: true,
       rating: 4.6,
       reviewCount: 89
     },
     {
       id: '27',
       title: 'Wall Clock',
       description: 'Minimalist wall clock with silent movement and clean design. Available in multiple sizes and colors.',
       price: 1999,
       images: [
         'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500&h=600&fit=crop',
         'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500&h=600&fit=crop&crop=face'
       ],
       variants: [
         { id: '27-1', title: '30cm', price: 1999, available: true, size: '30cm', color: 'Black' },
         { id: '27-2', title: '40cm', price: 2499, available: true, size: '40cm', color: 'Black' }
       ],
       category: 'Home Accessories',
       tags: ['clock', 'wall-clock', 'minimalist', 'silent', 'modern'],
       available: true,
       rating: 4.4,
       reviewCount: 156
     }
  ];

     private mockCollections: Collection[] = [
     {
       id: '1',
       title: 'New Arrivals',
       description: 'Discover the latest trends and newest additions to our collection.',
       image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
       productCount: 27
     },
     {
       id: '2',
       title: 'Fashion & Clothing',
       description: 'Stylish clothing for every occasion, from casual to formal wear.',
       image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
       productCount: 4
     },
     {
       id: '3',
       title: 'Footwear Collection',
       description: 'Comfortable and stylish shoes for every activity and style preference.',
       image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
       productCount: 3
     },
     {
       id: '4',
       title: 'Watches & Accessories',
       description: 'Elegant timepieces and smart accessories to complement your style.',
       image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
       productCount: 3
     },
     {
       id: '5',
       title: 'Laptops & Tech',
       description: 'High-performance laptops for work, gaming, and creativity.',
       image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
       productCount: 5
     },
     {
       id: '6',
       title: 'Beauty & Makeup',
       description: 'Professional makeup and beauty essentials for every look.',
       image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=300&fit=crop',
       productCount: 4
     },
     {
       id: '7',
       title: 'Computer Accessories',
       description: 'High-quality peripherals and accessories for your computer setup.',
       image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
       productCount: 2
     },
     {
       id: '8',
       title: 'Books & Literature',
       description: 'Classic novels, contemporary fiction, and educational books for all ages.',
       image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop',
       productCount: 3
     },
     {
       id: '9',
       title: 'Home & Living',
       description: 'Beautiful home accessories and decorative items to enhance your living space.',
       image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop',
       productCount: 3
     }
   ];

  async getProducts(filters?: {
    category?: string;
    priceMin?: number;
    priceMax?: number;
    tags?: string[];
    search?: string;
  }): Promise<Product[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    let filteredProducts = [...this.mockProducts];

    if (filters?.category) {
      filteredProducts = filteredProducts.filter(product => 
        product.category.toLowerCase() === filters.category!.toLowerCase()
      );
    }

    if (filters?.priceMin !== undefined) {
      filteredProducts = filteredProducts.filter(product => product.price >= filters.priceMin!);
    }

    if (filters?.priceMax !== undefined) {
      filteredProducts = filteredProducts.filter(product => product.price <= filters.priceMax!);
    }

    if (filters?.tags && filters.tags.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        filters.tags!.some(tag => product.tags.includes(tag))
      );
    }

    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    return filteredProducts;
  }

  async getProduct(id: string): Promise<Product | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));

    const product = this.mockProducts.find(p => p.id === id);
    return product || null;
  }

  async getCollections(): Promise<Collection[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.mockCollections;
  }

  async getCollection(id: string): Promise<Collection | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));

    const collection = this.mockCollections.find(c => c.id === id);
    return collection || null;
  }

  async searchProducts(query: string): Promise<Product[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));

    const searchTerm = query.toLowerCase();
    return this.mockProducts.filter(product =>
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  async getRelatedProducts(productId: string, limit: number = 4): Promise<Product[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const currentProduct = this.mockProducts.find(p => p.id === productId);
    if (!currentProduct) return [];

    // Find products with similar tags or category
    const related = this.mockProducts
      .filter(p => p.id !== productId)
      .filter(p => 
        p.category === currentProduct.category ||
        p.tags.some(tag => currentProduct.tags.includes(tag))
      )
      .slice(0, limit);

    return related;
  }
}

export const shopifyService = new ShopifyService();
export default shopifyService;

