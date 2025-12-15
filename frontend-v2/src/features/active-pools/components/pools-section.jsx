import { useState } from 'react';

function PoolsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 12 dummy pools with realistic film project data
  const pools = [
    {
      id: 1,
      title: 'Ethereal Dreams: A Sci-Fi Epic',
      category: 'feature',
      image: 'https://images.unsplash.com/photo-1533928298208-27ff66555d0d?w=500&h=300&fit=crop',
      fundingGoal: 250000,
      currentFunding: 187500,
      investors: 1245,
      daysLeft: 18,
      featured: true,
      description: 'An ambitious sci-fi feature film exploring the intersection of consciousness and technology.',
      tags: ['Sci-Fi', 'Feature', 'High Budget']
    },
    {
      id: 2,
      title: 'Midnight in Marrakech',
      category: 'feature',
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=300&fit=crop',
      fundingGoal: 180000,
      currentFunding: 156000,
      investors: 892,
      daysLeft: 12,
      featured: false,
      description: 'A romantic thriller set in Morocco with international cast and crew.',
      tags: ['Drama', 'Romance', 'International']
    },
    {
      id: 3,
      title: 'Beyond the Horizon',
      category: 'documentary',
      image: 'https://images.unsplash.com/photo-1489599810694-b5ef1786d3b3?w=500&h=300&fit=crop',
      fundingGoal: 85000,
      currentFunding: 72250,
      investors: 634,
      daysLeft: 24,
      featured: false,
      description: 'A documentary exploring climate change impacts on coastal communities worldwide.',
      tags: ['Documentary', 'Climate', 'Social Impact']
    },
    {
      id: 4,
      title: 'The Last Station',
      category: 'short',
      image: 'https://images.unsplash.com/photo-1516573895747-a83444e5b772?w=500&h=300&fit=crop',
      fundingGoal: 35000,
      currentFunding: 28350,
      investors: 412,
      daysLeft: 8,
      featured: false,
      description: 'A 15-minute experimental short film about human connection in a modern world.',
      tags: ['Short Film', 'Experimental', 'Indie']
    },
    {
      id: 5,
      title: 'Echoes of Tomorrow',
      category: 'feature',
      image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=500&h=300&fit=crop',
      fundingGoal: 320000,
      currentFunding: 224000,
      investors: 1856,
      daysLeft: 31,
      featured: false,
      description: 'A cyberpunk noir thriller set in a dystopian near-future city.',
      tags: ['Thriller', 'Sci-Fi', 'Noir']
    },
    {
      id: 6,
      title: 'Roots Deep',
      category: 'documentary',
      image: 'https://images.unsplash.com/photo-1542478884-b1a84a8e2c1d?w=500&h=300&fit=crop',
      fundingGoal: 95000,
      currentFunding: 80750,
      investors: 723,
      daysLeft: 15,
      featured: false,
      description: 'Documentary about preserving indigenous cultural heritage in the Amazon.',
      tags: ['Documentary', 'Cultural', 'Indigenous']
    },
    {
      id: 7,
      title: 'City Pulse',
      category: 'short',
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=300&fit=crop',
      fundingGoal: 42000,
      currentFunding: 31500,
      investors: 289,
      daysLeft: 20,
      featured: false,
      description: 'A visual poetry short about urban life and hidden beauty in everyday moments.',
      tags: ['Short Film', 'Poetry', 'Urban']
    },
    {
      id: 8,
      title: 'Whispers in the Dark',
      category: 'feature',
      image: 'https://images.unsplash.com/photo-1533193566920-318db80aea6d?w=500&h=300&fit=crop',
      fundingGoal: 195000,
      currentFunding: 146250,
      investors: 1023,
      daysLeft: 27,
      featured: false,
      description: 'A psychological horror feature that challenges the boundaries of reality.',
      tags: ['Horror', 'Psychological', 'Feature']
    },
    {
      id: 9,
      title: 'Harmony Rising',
      category: 'documentary',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
      fundingGoal: 110000,
      currentFunding: 99000,
      investors: 847,
      daysLeft: 10,
      featured: false,
      description: 'A music documentary following emerging artists from developing nations.',
      tags: ['Documentary', 'Music', 'Global']
    },
    {
      id: 10,
      title: 'The Forgotten Letters',
      category: 'short',
      image: 'https://images.unsplash.com/photo-1486882735611-87f5055b5b60?w=500&h=300&fit=crop',
      fundingGoal: 28000,
      currentFunding: 21000,
      investors: 198,
      daysLeft: 16,
      featured: false,
      description: 'A touching short about rediscovering family history through old letters.',
      tags: ['Short Film', 'Drama', 'Family']
    },
    {
      id: 11,
      title: 'Neon Paradise',
      category: 'feature',
      image: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=500&h=300&fit=crop',
      fundingGoal: 275000,
      currentFunding: 192500,
      investors: 1567,
      daysLeft: 22,
      featured: false,
      description: 'A stylish action-adventure set in a futuristic Southeast Asian metropolis.',
      tags: ['Action', 'Adventure', 'Feature']
    },
    {
      id: 12,
      title: 'Voices of the Unheard',
      category: 'documentary',
      image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=300&fit=crop',
      fundingGoal: 78000,
      currentFunding: 66300,
      investors: 601,
      daysLeft: 19,
      featured: false,
      description: 'A documentary giving platform to marginalized voices in modern society.',
      tags: ['Documentary', 'Social', 'Activism']
    }
  ];

  const categories = ['all', 'feature', 'documentary', 'short'];
  
  const filteredPools = selectedCategory === 'all' 
    ? pools 
    : pools.filter(pool => pool.category === selectedCategory);

  const featuredPool = pools.find(p => p.featured);
  const displayPools = selectedCategory === 'all' 
    ? filteredPools.filter(p => !p.featured) 
    : filteredPools;

  // Progress bar percentage
  const getProgress = (current, goal) => (current / goal) * 100;

  // Format currency
  const formatCurrency = (amount) => `$${(amount / 1000).toFixed(0)}k`;

  const PoolCard = ({ pool, featured = false }) => (
    <div className={`w-full ${featured ? 'lg:w-2/3' : 'md:w-1/2 lg:w-1/3'} p-4`}>
      <div className="h-full bg-gradient-radial-dark border border-gray-900/30 rounded-3xl overflow-hidden hover:border-yellow-400/50 transition duration-300">
        {/* Image */}
        <div className="mb-6 overflow-hidden h-48 md:h-64 lg:h-72">
          <img 
            className="w-full h-full object-cover transform hover:scale-105 transition duration-500" 
            src={pool.image} 
            alt={pool.title} 
          />
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {/* Category Badge */}
          <div className="flex items-center mb-4">
            <span className="text-sm text-yellow-400 font-medium capitalize">{pool.category}</span>
            {featured && <span className="ml-2 px-2 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full">Featured</span>}
          </div>

          {/* Title */}
          <h3 className={`mb-3 text-white font-bold hover:text-yellow-400 transition duration-200 line-clamp-2 ${featured ? 'text-3xl' : 'text-xl'}`}>
            {pool.title}
          </h3>

          {/* Description */}
          <p className="mb-5 text-gray-300 text-sm line-clamp-2">
            {pool.description}
          </p>

          {/* Funding Progress */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-400">Funding Progress</span>
              <span className="text-sm text-yellow-400 font-semibold">{Math.round(getProgress(pool.currentFunding, pool.fundingGoal))}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-full transition-all duration-500"
                style={{ width: `${getProgress(pool.currentFunding, pool.fundingGoal)}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
              <span>{formatCurrency(pool.currentFunding)} raised</span>
              <span>Goal: {formatCurrency(pool.fundingGoal)}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-between mb-5 text-xs text-gray-400 border-t border-gray-800 pt-4">
            <div className="text-center flex-1">
              <p className="text-yellow-400 font-bold text-lg">{pool.investors.toLocaleString()}</p>
              <p>Investors</p>
            </div>
            <div className="text-center flex-1 border-l border-gray-800">
              <p className="text-yellow-400 font-bold text-lg">{pool.daysLeft}</p>
              <p>Days Left</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {pool.tags.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 text-xs text-gray-300 bg-gray-800/50 border border-gray-700 rounded-full hover:border-yellow-400/30 transition">
                {tag}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <button className="w-full py-3 px-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg transition duration-300">
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="pt-20 lg:pt-24 pb-24">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <header className="text-center mb-20">
          <h1 className="font-heading text-7xl lg:text-8xl text-white tracking-tighter mb-6">
            Active Pools
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover and join collaborative film financing pools on CineX. Support creative projects and earn rewards.
          </p>
        </header>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition duration-300 capitalize ${
                selectedCategory === category
                  ? 'bg-yellow-400 text-black'
                  : 'bg-gray-900/30 text-gray-300 border border-gray-700 hover:border-yellow-400'
              }`}
            >
              {category === 'all' ? 'All Pools' : category}
            </button>
          ))}
        </div>

        {/* Featured Pool */}
        {selectedCategory === 'all' && featuredPool && (
          <div className="mb-20">
            <h2 className="text-3xl text-white font-bold mb-8 text-center">Featured Pool</h2>
            <div className="flex flex-wrap -m-4 justify-center">
              <PoolCard pool={featuredPool} featured={true} />
            </div>
          </div>
        )}

        {/* Pool Grid */}
        <div>
          {selectedCategory !== 'all' && (
            <h2 className="text-2xl text-white font-bold mb-8 capitalize">
              {selectedCategory} Films
            </h2>
          )}
          <div className="flex flex-wrap -m-4">
            {displayPools.map((pool) => (
              <PoolCard key={pool.id} pool={pool} featured={false} />
            ))}
          </div>
        </div>

        {/* No Results */}
        {displayPools.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No pools found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default PoolsSection;
