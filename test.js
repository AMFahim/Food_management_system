// enhanced-server.js
const express = require('express');
const axios = require('axios');
const app = express();

// Extended food database with more specific items
const foodDatabase = {
  Snacks: {
    items: ['chips', 'popcorn', 'cookies', 'biscuits', 'crackers', 'trail mix', 'granola bar', 'pretzels', 'nuts', 'chocolate', 'candy'],
    search_terms: ['snack', 'junk food']
  },
  Vegetable: {
    items: ['broccoli', 'carrot', 'spinach', 'tomato', 'bell pepper', 'cucumber', 'onion', 'garlic', 'potato', 'capsicum', 'papaya', 'cabbage', 'cauliflower', 'lettuce', 'eggplant', 'zucchini'],
    search_terms: ['fresh vegetable', 'organic vegetable']
  },
  Meat: {
    items: ['chicken', 'beef', 'pork', 'fish', 'salmon', 'turkey', 'lamb', 'bacon', 'sausage', 'steak', 'duck', 'veal'],
    search_terms: ['raw meat', 'fresh meat']
  },
  Dairy: {
    items: ['milk', 'cheese', 'yogurt', 'butter', 'cream', 'ice cream', 'paneer', 'curd', 'whipped cream', 'cottage cheese', 'mozzarella'],
    search_terms: ['dairy product', 'fresh dairy']
  },
  Drinks: {
    items: ['juice', 'smoothie', 'milkshake', 'coffee', 'tea', 'lemonade', 'soda', 'water', 'mocktail', 'energy drink', 'soft drink'],
    search_terms: ['beverage', 'drink']
  },
  Fast_Food: {
    items: ['pizza', 'burger', 'fries', 'hot dog', 'sandwich', 'taco', 'burrito', 'fried chicken', 'nuggets', 'onion rings', 'cheeseburger'],
    search_terms: ['fast food', 'junk food']
  }
};

// Get multiple images for a category
app.get('/api/food-images/:category/:count?', async (req, res) => {
  try {
    const { category, count = 3 } = req.params;
    const imageCount = Math.min(parseInt(count), 10); // Limit to 10 images
    
    if (!foodDatabase[category]) {
      return res.status(400).json({
        error: 'Invalid category',
        available_categories: Object.keys(foodDatabase)
      });
    }

    const categoryData = foodDatabase[category];
    const images = [];

    // Get images for random foods in the category
    for (let i = 0; i < imageCount; i++) {
      const randomFood = categoryData.items[Math.floor(Math.random() * categoryData.items.length)];
      
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${randomFood}&per_page=1`,
        {
          headers: {
            'Authorization': 'Client-ID OF1Xa2yq5XnsERBiczoaQjBRUN1g-hbiY05TUmw_rbk'
          }
        }
      );

      if (response.data.results[0]) {
        images.push({
          food_item: randomFood,
          image_url: response.data.results[0].urls.regular,
          photographer: response.data.results[0].user.name
        });
      }
    }

    res.json({
      category: category,
      total_images: images.length,
      images: images
    });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get specific food item image
app.get('/api/food-image/:category/:foodItem', async (req, res) => {
  try {
    const { category, foodItem } = req.params;
    
    if (!foodDatabase[category]) {
      return res.status(400).json({
        error: 'Invalid category',
        available_categories: Object.keys(foodDatabase)
      });
    }

    if (!foodDatabase[category].items.includes(foodItem.toLowerCase())) {
      return res.status(400).json({
        error: 'Food item not found in category',
        available_items: foodDatabase[category].items
      });
    }

    const response = await axios.get(
      `https://api.unsplash.com/search/photos?query=${foodItem}&per_page=1`,
      {
        headers: {
          'Authorization': 'Client-ID OF1Xa2yq5XnsERBiczoaQjBRUN1g-hbiY05TUmw_rbk'
        }
      }
    );

    const imageData = response.data.results[0];
    
    if (imageData) {
      res.json({
        category: category,
        food_item: foodItem,
        image_url: imageData.urls.regular,
        photographer: imageData.user.name,
        photographer_profile: imageData.user.links.html
      });
    } else {
      res.status(404).json({ 
        error: 'No image found for this food item',
        category: category,
        food_item: foodItem
      });
    }
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Enhanced Food Image API running on port 3000');
});