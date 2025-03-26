document.addEventListener('DOMContentLoaded', function() {
  // Dark mode functionality
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  
  // Check for saved dark mode preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark');
    darkModeToggle.checked = true;
  }
  
  // Toggle dark mode
  darkModeToggle.addEventListener('change', function() {
    if (this.checked) {
      document.body.classList.add('dark');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('darkMode', null);
    }
  });
  
  // Screen Navigation
  function navigateToScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
      if (item.dataset.screen === screenId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Scroll to top when changing screens
    window.scrollTo(0, 0);
    
    // If navigating to home, refresh recommendations
    if (screenId === 'home-screen') {
      updateMoodRecommendations();
      updateDailyQuote();
    }
    
    // If navigating to journal, update date
    if (screenId === 'journal-screen') {
      updateJournalDate();
      loadJournalEntries();
    }
    
    // If navigating to resources, load resources
    if (screenId === 'resources-screen') {
      loadResourcesByCategory('all');
    }
  }
  
  // Set up navigation event listeners
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
      navigateToScreen(this.dataset.screen);
    });
  });
  
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      navigateToScreen(this.dataset.target);
    });
  });
  
  // Skip onboarding
  document.getElementById('skip-onboarding').addEventListener('click', function() {
    navigateToScreen('home-screen');
  });
  
  // Auth buttons
  document.getElementById('signup-btn').addEventListener('click', function() {
    navigateToScreen('home-screen');
  });
  
  document.getElementById('login-btn').addEventListener('click', function() {
    navigateToScreen('home-screen');
  });
  
  // Feature cards navigation
  document.getElementById('open-chatbot').addEventListener('click', function() {
    navigateToScreen('chatbot-screen');
  });
  
  document.getElementById('open-mood-tracker').addEventListener('click', function() {
    navigateToScreen('mood-tracker-screen');
  });
  
  document.getElementById('open-journal').addEventListener('click', function() {
    navigateToScreen('journal-screen');
  });
  
  document.getElementById('open-resources').addEventListener('click', function() {
    navigateToScreen('resources-screen');
  });
  
  // View all resources link
  document.getElementById('view-all-resources').addEventListener('click', function(e) {
    e.preventDefault();
    navigateToScreen('resources-screen');
  });
  
  // Profile button
  document.getElementById('open-profile').addEventListener('click', function() {
    navigateToScreen('profile-screen');
  });
  
  // Set greeting based on time of day
  function setGreeting() {
    const hour = new Date().getHours();
    let greeting = 'Good ';
    
    if (hour < 12) {
      greeting += 'Morning';
    } else if (hour < 18) {
      greeting += 'Afternoon';
    } else {
      greeting += 'Evening';
    }
    
    document.getElementById('greeting').textContent = greeting + '!';
  }
  
  setGreeting();
  
  // AI-generated quotes
  const quotes = [
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
    { text: "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.", author: "Unknown" },
    { text: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, scared, or anxious.", author: "Lori Deschene" },
    { text: "Mental health problems don't define who you are. They are something you experience.", author: "Unknown" },
    { text: "Self-care is not self-indulgence, it is self-preservation.", author: "Audre Lorde" },
    { text: "You are not alone in this journey. Every step you take is a step towards healing.", author: "MindfulMe AI" },
    { text: "The way you speak to yourself matters. Be kind with your inner voice.", author: "Unknown" },
    { text: "Healing is not linear. It's okay to have good days and bad days.", author: "MindfulMe AI" },
    { text: "Your feelings are valid. You don't need anyone's permission to feel the way you do.", author: "Unknown" },
    { text: "Small steps still move you forward. Celebrate every bit of progress.", author: "MindfulMe AI" }
  ];
  
  function updateDailyQuote() {
    const quoteContainer = document.getElementById('daily-quote');
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    quoteContainer.innerHTML = `
      <p class="quote-text">"${randomQuote.text}"</p>
      <p class="quote-author">— ${randomQuote.author}</p>
    `;
    
    // Add animation
    quoteContainer.style.animation = 'none';
    setTimeout(() => {
      quoteContainer.style.animation = 'slideInUp 0.8s ease-out';
    }, 10);
  }
  
  // Initialize quote
  updateDailyQuote();
  
  // Mood-based data
  const moodData = {
    happy: {
      emoji: "😊",
      exercises: [
        { icon: "🧘", title: "Morning Yoga", subtitle: "15 min gentle flow", description: "Start your day with this gentle 15-minute yoga flow to boost your mood and energy levels. Perfect for beginners.", link:"yoga.html"},
        { icon: "🏃", title: "Mood Boosting Run", subtitle: "20 min outdoor activity", description: "This guided 20-minute run combines intervals with mindfulness techniques to naturally elevate your mood.", link:"" },
        { icon: "💪", title: "Strength Training", subtitle: "30 min full body workout", description: "Build strength and confidence with this 30-minute full body workout. No equipment needed, just your bodyweight.",link:"strength.html" },
        { icon: "🧠", title: "Mindful Walking", subtitle: "15 min guided practice", description: "Transform a simple walk into a powerful mindfulness practice with this 15-minute guided audio session.",link:"" }
      ],
      books: [
        { icon: "📚", title: "The Happiness Project", subtitle: "Gretchen Rubin", description: "A memoir of the year Gretchen Rubin spent test-driving studies and theories about how to be happier.",link:"thehappiness.html"  },
        { icon: "📖", title: "Atomic Habits", subtitle: "James Clear", description: "Learn how tiny changes can lead to remarkable results in this practical guide to habit formation.",link:"atomic.html"  },
        { icon: "📕", title: "The Power of Now", subtitle: "Eckhart Tolle", description: "A guide to spiritual enlightenment focused on living in the present moment and avoiding thoughts of the past or future.",link:"powerOfnow.html"  },
        { icon: "📗", title: "Man's Search for Meaning", subtitle: "Viktor E. Frankl", description: "A powerful memoir of survival and the search for meaning in even the most difficult circumstances.",link:"mans-searching.html"  }
      ],
      music: [
        { icon: "🎵", title: "Happy Vibes Playlist", subtitle: "45 min • Upbeat", description: "A collection of upbeat songs scientifically proven to boost your mood and energy levels." },
        { icon: "🎹", title: "Peaceful Piano", subtitle: "60 min • Relaxing", description: "Gentle piano compositions to help you relax, focus, and find your center." },
        { icon: "🎧", title: "Nature Sounds", subtitle: "30 min • Calming", description: "Immerse yourself in the soothing sounds of nature - rainfall, ocean waves, and forest ambience." },
        { icon: "🥁", title: "Energy Boost", subtitle: "40 min • Motivational", description: "High-energy tracks to get you moving and motivated. Perfect for workouts or when you need a pick-me-up." }
      ],
      movies: [
        { icon: "🎬", title: "The Secret Life of Walter Mitty", subtitle: "Adventure • 2h 1m", description: "An office worker who lives inside fantasy worlds embarks on a global journey to find a missing photograph." },
        { icon: "🎭", title: "Inside Out", subtitle: "Animation • 1h 35m", description: "A young girl's emotions - Joy, Fear, Anger, Disgust and Sadness - conflict on how best to navigate a new city and school." },
        { icon: "🎞️", title: "Good Will Hunting", subtitle: "Drama • 2h 6m", description: "A janitor at MIT has a gift for mathematics but needs help from a psychologist to find direction in his life." },
        { icon: "📽️", title: "The Pursuit of Happyness", subtitle: "Biography • 1h 57m", description: "A struggling salesman takes custody of his son as he's poised to begin a life-changing professional career." }
      ],
      games: [
        { icon: "🎮", title: "Journey", subtitle: "Adventure • Relaxing", description: "A beautiful, meditative game where you travel through stunning landscapes and connect with other players." },
        { icon: "🎲", title: "Board Game Night", subtitle: "Social • Fun", description: "Organize a board game night with friends to share laughter and create positive memories." },
        { icon: "🧩", title: "Puzzle Games", subtitle: "Mental • Engaging", description: "Engage your mind with colorful puzzle games that provide a sense of accomplishment and joy." },
        { icon: "🎯", title: "Mindful Darts", subtitle: "Focus • Precision", description: "Practice mindfulness through the focused activity of darts, combining concentration with physical skill." }
      ]
    },
    sad: {
      emoji: "😔",
      exercises: [
        { icon: "🧘", title: "Gentle Yoga", subtitle: "20 min mood lifter", description: "A gentle yoga sequence designed to release tension and gradually lift your mood.",link:"gentle.html"  },
        { icon: "🚶", title: "Mood Lifting Walk", subtitle: "15 min outdoor activity", description: "A guided mindful walk that helps shift your perspective and gently elevate your mood.",link:""  },
        { icon: "💆", title: "Progressive Relaxation", subtitle: "10 min tension release", description: "Systematically release tension from your body with this guided relaxation technique.",link:""  },
        { icon: "🌬️", title: "Breathing Exercises", subtitle: "5 min mood regulation", description: "Simple breathing techniques that can help regulate your emotions and provide a sense of calm.",link:"breathing.html"  }
      ],
      books: [
        { icon: "📚", title: "Reasons to Stay Alive", subtitle: "Matt Haig", description: "A moving, funny, and joyous exploration of how to live better and feel more alive.",link:"stay-alive.html"  },
        { icon: "📖", title: "The Upward Spiral", subtitle: "Alex Korb", description: "Using neuroscience to reverse the course of depression, one small change at a time.",link:"upward-spiral.html"  },
        { icon: "📕", title: "Lost Connections", subtitle: "Johann Hari", description: "Uncovering the real causes of depression and the unexpected solutions.",link:"lost-connections.html"  },
        { icon: "📗", title: "Maybe You Should Talk to Someone", subtitle: "Lori Gottlieb", description: "A therapist, her therapist, and our lives revealed in this insightful memoir.",link:"maybe_you_should.html"  }
      ],
      music: [
        { icon: "🎵", title: "Gentle Mood Lifters", subtitle: "50 min • Uplifting", description: "Carefully selected songs that gradually shift from melancholic to uplifting." },
        { icon: "🎹", title: "Comforting Classics", subtitle: "45 min • Soothing", description: "Classical pieces that acknowledge sadness while providing comfort and beauty." },
        { icon: "🎧", title: "Rainfall Sounds", subtitle: "60 min • Calming", description: "The gentle sound of rain to accompany reflection and provide a soothing backdrop." },
        { icon: "🎸", title: "Acoustic Comfort", subtitle: "40 min • Reflective", description: "Gentle acoustic songs that validate emotions while offering hope and perspective." }
      ],
      movies: [
        { icon: "🎬", title: "Inside Out", subtitle: "Animation • 1h 35m", description: "A beautiful exploration of how all emotions, including sadness, play important roles in our lives." },
        { icon: "🎭", title: "The Perks of Being a Wallflower", subtitle: "Drama • 1h 43m", description: "A coming-of-age story about finding connection and hope during difficult times." },
        { icon: "🎞️", title: "Soul", subtitle: "Animation • 1h 40m", description: "A thoughtful meditation on finding your purpose and appreciating the small joys in life." },
        { icon: "📽️", title: "Good Will Hunting", subtitle: "Drama • 2h 6m", description: "A powerful story about overcoming past trauma and opening yourself to new possibilities." }
      ],
      games: [
        { icon: "🌱", title: "Gardening App", subtitle: "Nurturing • Growth", description: "Virtual gardening apps can provide a sense of nurturing and growth even when you're feeling down." },
        { icon: "🎨", title: "Coloring Apps", subtitle: "Creative • Soothing", description: "Digital coloring books can be meditative and provide a gentle creative outlet when feeling sad." },
        { icon: "🧩", title: "Gentle Puzzles", subtitle: "Focused • Calming", description: "Simple jigsaw or word puzzles that provide just enough focus to gently shift your attention." },
        { icon: "🐾", title: "Animal Crossing", subtitle: "Peaceful • Comforting", description: "A gentle game world where you can create, connect, and find comfort in simple daily activities." }
      ]
    },
    anxious: {
      emoji: "😰",
      exercises: [
        { icon: "🧘", title: "Anxiety Relief Yoga", subtitle: "15 min calming practice", description: "Gentle yoga poses and breathing techniques specifically designed to activate your parasympathetic nervous system.",link:""  },
        { icon: "👣", title: "Grounding Walk", subtitle: "10 min outdoor practice", description: "A mindful walking practice that helps anchor you to the present moment through sensory awareness.",link:""  },
        { icon: "🌬️", title: "4-7-8 Breathing", subtitle: "5 min anxiety reducer", description: "A powerful breathing technique that can help calm your nervous system in moments of anxiety.",link:"4-7-8.html"  },
        { icon: "💆", title: "Progressive Relaxation", subtitle: "12 min tension release", description: "Systematically release physical tension, which can help reduce mental anxiety.",link:""  }
      ],
      books: [
        { icon: "📚", title: "Dare", subtitle: "Barry McDonagh", description: "A new approach to dealing with anxiety that focuses on acceptance rather than resistance." },
        { icon: "📖", title: "Hope and Help for Your Nerves", subtitle: "Claire Weekes", description: "A classic guide to understanding and overcoming anxiety with simple, practical techniques." },
        { icon: "📕", title: "The Anxiety and Phobia Workbook", subtitle: "Edmund Bourne", description: "Practical exercises and strategies to help manage anxiety and build resilience." },
        { icon: "📗", title: "First, We Make the Beast Beautiful", subtitle: "Sarah Wilson", description: "A personal exploration of anxiety that reframes it as potentially valuable rather than purely negative." }
      ],
      music: [
        { icon: "🎵", title: "Anxiety Soothers", subtitle: "45 min • Calming", description: "Music specifically composed to reduce anxiety, with tempos that help slow breathing and heart rate." },
        { icon: "🎹", title: "Peaceful Piano", subtitle: "60 min • Gentle", description: "Soft piano compositions that provide a sense of stability and calm." },
        { icon: "🎧", title: "Ocean Waves", subtitle: "30 min • Rhythmic", description: "The natural rhythm of ocean waves can help regulate breathing and provide a soothing audio backdrop." },
        { icon: "🎶", title: "432 Hz Healing", subtitle: "40 min • Therapeutic", description: "Music tuned to 432 Hz, which some find particularly calming for the nervous system." }
      ],
      movies: [
        { icon: "🎬", title: "Amélie", subtitle: "Comedy • 2h 2m", description: "A whimsical, visually beautiful film that can provide a gentle escape from anxious thoughts." },
        { icon: "🎭", title: "My Neighbor Totoro", subtitle: "Animation • 1h 26m", description: "A gentle, magical story with a soothing pace and comforting themes of connection to nature." },
        { icon: "🎞️", title: "The Secret Life of Walter Mitty", subtitle: "Adventure • 1h 54m", description: "An uplifting story about overcoming fear and finding adventure in everyday life." },
        { icon: "📽️", title: "Chef", subtitle: "Comedy • 1h 54m", description: "A heartwarming film about finding passion and purpose, with beautiful food scenes that engage the senses." }
      ],
      games: [
        { icon: "🧶", title: "Stardew Valley", subtitle: "Farming • Peaceful", description: "A calming farming simulation game that allows you to create a peaceful life at your own pace." },
        { icon: "🌱", title: "Flower", subtitle: "Meditative • Flowing", description: "A beautiful game where you control the wind to guide flower petals through serene environments." },
        { icon: "🧹", title: "Tetris Effect", subtitle: "Focusing • Absorbing", description: "The classic puzzle game reimagined with immersive visuals and music that can help redirect anxious thoughts." },
        { icon: "🍵", title: "Zen Garden App", subtitle: "Mindful • Calming", description: "Digital zen garden apps where you can rake sand and arrange elements to create a sense of order and calm." }
      ]
    },
    calm: {
      emoji: "😌",
      exercises: [
        { icon: "🧘", title: "Yin Yoga", subtitle: "25 min deep stretch", description: "A slow-paced style of yoga with poses held for longer periods, perfect for maintaining your calm state.",link:"yin.html"  },
        { icon: "🚶", title: "Mindful Nature Walk", subtitle: "20 min outdoor practice", description: "Enhance your calm state with a mindful walk focusing on the beauty and details of nature." },
        { icon: "🌬️", title: "Extended Breath Work", subtitle: "15 min deepening practice", description: "Advanced breathing techniques to deepen your calm state and increase mind-body awareness." },
        { icon: "🧠", title: "Body Scan Meditation", subtitle: "20 min awareness practice", description: "A detailed meditation that brings awareness to each part of your body, enhancing your calm state." }
      ],
      books: [
        { icon: "📚", title: "The Things You Can See Only When You Slow Down", subtitle: "Haemin Sunim", description: "Insights and wisdom on mindfulness and slowing down in our fast-paced world." },
        { icon: "📖", title: "Stillness Is the Key", subtitle: "Ryan Holiday", description: "Ancient strategies for modern life on finding clarity, focus, and peace in a busy world." },
        { icon: "📕", title: "The Book of Joy", subtitle: "Dalai Lama & Desmond Tutu", description: "Conversations between two spiritual leaders on finding lasting happiness in a changing world." },
        { icon: "📗", title: "Wherever You Go, There You Are", subtitle: "Jon Kabat-Zinn", description: "A classic guide to mindfulness meditation and living fully in the present moment." }
      ],
      music: [
        { icon: "🎵", title: "Ambient Soundscapes", subtitle: "60 min • Immersive", description: "Atmospheric compositions that maintain and deepen your calm state through subtle, evolving sounds." },
        { icon: "🎹", title: "Minimalist Piano", subtitle: "45 min • Serene", description: "Simple, spacious piano compositions that complement and enhance a calm mental state." },
        { icon: "🎧", title: "Gentle Classical", subtitle: "50 min • Flowing", description: "Carefully selected classical pieces known for their calming properties and gentle emotional landscape." },
        { icon: "🎶", title: "Tibetan Singing Bowls", subtitle: "30 min • Meditative", description: "Traditional sound healing instruments that can deepen meditation and calm." }
      ],
      movies: [
        { icon: "🎬", title: "Baraka", subtitle: "Documentary • 1h 36m", description: "A visually stunning, non-narrative film exploring human connection to nature and each other." },
        { icon: "🎭", title: "The Secret Garden", subtitle: "Drama • 1h 41m", description: "A beautiful story of healing and renewal through connection to nature and others." },
        { icon: "🎞️", title: "Koyaanisqatsi", subtitle: "Documentary • 1h 26m", description: "A visual tone poem with mesmerizing imagery and Philip Glass's minimalist score." },
        { icon: "📽️", title: "A Man Called Ove", subtitle: "Comedy-Drama • 1h 56m", description: "A touching, gently paced story about finding connection and meaning in unexpected places." }
      ],
      games: [
        { icon: "🍵", title: "Monument Valley", subtitle: "Puzzle • Aesthetic", description: "A beautiful puzzle game with impossible architecture and soothing music that enhances your calm state." },
        { icon: "🌿", title: "Prune", subtitle: "Meditative • Growing", description: "A graceful game about the beauty of cultivation where you grow and shape trees in a serene environment." },
        { icon: "📝", title: "Chess", subtitle: "Strategic • Thoughtful", description: "The classic game of strategy that rewards calm, methodical thinking and planning." },
        { icon: "🎨", title: "Watercolor Studio", subtitle: "Creative • Flowing", description: "Digital watercolor apps that allow for gentle, flowing creativity without pressure or mess." }
      ]
    },
    energetic: {
      emoji: "⚡",
      exercises: [
        { icon: "🏃", title: "HIIT Workout", subtitle: "20 min high intensity", description: "Channel your energy into this efficient, high-intensity interval training session for maximum impact." },
        { icon: "💃", title: "Dance Cardio", subtitle: "30 min full expression", description: "Express your energetic mood through movement with this fun, high-energy dance workout." },
        { icon: "🏋️", title: "Power Training", subtitle: "40 min strength building", description: "Harness your energy for building strength and power with this dynamic workout routine." },
        { icon: "🚴", title: "Cycling Session", subtitle: "45 min endurance builder", description: "Use your high energy for this challenging cycling workout that builds endurance and cardiovascular health." }
      ],
      books: [
        { icon: "📚", title: "Atomic Habits", subtitle: "James Clear", description: "Channel your energy into building positive habits with this practical, actionable guide." },
        { icon: "📖", title: "Flow", subtitle: "Mihaly Csikszentmihalyi", description: "Understand and harness the optimal state of consciousness where you're fully immersed and energized by what you're doing." },
        { icon: "📕", title: "The 5 AM Club", subtitle: "Robin Sharma", description: "Transform your morning routine and use your energy to maximize productivity and wellbeing." },
        { icon: "📗", title: "Spark", subtitle: "John Ratey", description: "Explore the science behind how exercise transforms your brain for better performance, mood, and cognitive function." }
      ],
      music: [
        { icon: "🎵", title: "High Energy Mix", subtitle: "50 min • Upbeat", description: "Fast-tempo tracks to match and channel your energetic mood into positive activities." },
        { icon: "🎹", title: "Motivational Anthems", subtitle: "45 min • Inspiring", description: "Powerful, uplifting songs to direct your energy toward achieving your goals." },
        { icon: "🎧", title: "Workout Beats", subtitle: "60 min • Driving", description: "High-BPM music perfect for intense workouts or productive work sessions." },
        { icon: "🥁", title: "Drum & Bass Focus", subtitle: "40 min • Rhythmic", description: "Fast-paced electronic music that can help channel energy into focused productivity." }
      ],
      movies: [
        { icon: "🎬", title: "The Social Network", subtitle: "Drama • 2h", description: "A fast-paced, dialogue-driven film about ambition, innovation, and the founding of Facebook." },
        { icon: "🎭", title: "Whiplash", subtitle: "Drama • 1h 46m", description: "An intense, energetic film about the pursuit of greatness and the price of excellence." },
        { icon: "🎞️", title: "The Greatest Showman", subtitle: "Musical • 1h 45m", description: "A vibrant, high-energy musical celebrating ambition, creativity, and spectacle." },
        { icon: "📽️", title: "Rush", subtitle: "Sports Drama • 2h 3m", description: "A fast-paced, adrenaline-fueled story of rivalry and racing that matches your energetic mood." }
      ],
      games: [
        { icon: "🧹", title: "Beat Saber", subtitle: "Rhythm • Active", description: "A VR rhythm game where you slash blocks with lightsabers to the beat of energetic music." },
        { icon: "🎨", title: "Just Dance", subtitle: "Movement • Fun", description: "Dance along to popular songs with choreographed routines that channel your energy into movement." },
        { icon: "🧩", title: "Fast-Paced Puzzles", subtitle: "Mental • Challenging", description: "Timed puzzle games that challenge your quick thinking and problem-solving abilities." },
        { icon: "🌳", title: "Geocaching", subtitle: "Outdoor • Exploring", description: "A real-world treasure hunting game using GPS to find hidden containers in your area." }
      ]
    }
  };
  
  // Symptom assessment for sad and anxious moods
  const symptomOptions = {
    sad: [
      { id: 'low-energy', text: 'Low energy or fatigue' },
      { id: 'sleep-changes', text: 'Changes in sleep patterns' },
      { id: 'appetite-changes', text: 'Changes in appetite' },
      { id: 'concentration', text: 'Difficulty concentrating' },
      { id: 'worthlessness', text: 'Feelings of worthlessness' },
      { id: 'hopelessness', text: 'Feelings of hopelessness' },
      { id: 'isolation', text: 'Social withdrawal or isolation' }
    ],
    anxious: [
      { id: 'restlessness', text: 'Restlessness or feeling on edge' },
      { id: 'worry', text: 'Excessive worry' },
      { id: 'tension', text: 'Muscle tension' },
      { id: 'racing-heart', text: 'Racing heart or palpitations' },
      { id: 'breathing', text: 'Shortness of breath' },
      { id: 'concentration', text: 'Difficulty concentrating' },
      { id: 'sleep', text: 'Trouble sleeping' }
    ]
  };
  
  const symptomInfo = {
    'low-energy': {
      title: 'Managing Low Energy',
      content: 'Low energy can be a common symptom of sadness or depression. Try these strategies:',
      tips: [
        'Break tasks into smaller, manageable steps',
        'Prioritize self-care and rest when needed',
        'Gentle exercise like walking can boost energy levels',
        'Stay hydrated and maintain regular meals'
      ]
    },
    'sleep-changes': {
      title: 'Improving Sleep Quality',
      content: 'Changes in sleep patterns can affect your mood and overall wellbeing:',
      tips: [
        'Establish a consistent sleep schedule',
        'Create a relaxing bedtime routine',
        'Limit screen time before bed',
        'Keep your bedroom cool, dark, and quiet'
      ]
    },
    'appetite-changes': {
      title: 'Nurturing Your Body',
      content: 'Changes in appetite are common during emotional difficulties:',
      tips: [
        'Eat small, regular meals if appetite is low',
        'Choose nutrient-dense foods when possible',
        'Stay hydrated throughout the day',
        'Practice mindful eating to reconnect with hunger cues'
      ]
    },
    'concentration': {
      title: 'Improving Focus',
      content: 'Difficulty concentrating can be frustrating. Try these approaches:',
      tips: [
        'Break tasks into smaller, focused sessions',
        'Use the Pomodoro technique (25 min work, 5 min break)',
        'Minimize distractions in your environment',
        'Practice mindfulness to train attention'
      ]
    },
    'worthlessness': {
      title: 'Building Self-Worth',
      content: 'Feelings of worthlessness can be painful but can be addressed:',
      tips: [
        'Practice self-compassion and kind self-talk',
        'List your strengths and accomplishments',
        'Challenge negative thoughts with evidence',
        'Seek support from trusted friends or professionals'
      ]
    },
    'hopelessness': {
      title: 'Finding Hope',
      content: 'When feeling hopeless, consider these approaches:',
      tips: [
        'Focus on small moments of joy or connection',
        'Remember that feelings, even intense ones, are temporary',
        'Set very small, achievable goals',
        'Connect with supportive people or resources'
      ]
    },
    'isolation': {
      title: 'Reconnecting with Others',
      content: 'Social withdrawal is common when feeling down:',
      tips: [
        'Start with brief, low-pressure social interactions',
        'Reach out to one trusted person',
        'Join online communities focused on shared interests',
        'Consider volunteer opportunities to connect with purpose'
      ]
    },
    'restlessness': {
      title: 'Finding Calm in Restlessness',
      content: 'Feeling restless or on edge can be exhausting:',
      tips: [
        'Try progressive muscle relaxation techniques',
        'Engage in physical activity to release tension',
        'Practice grounding exercises using your five senses',
        'Create structure in your day with regular breaks'
      ]
    },
    'worry': {
      title: 'Managing Excessive Worry',
      content: 'When worry feels overwhelming:',
      tips: [
        'Schedule a specific "worry time" each day',
        'Write down worries to externalize them',
        'Practice distinguishing between solvable and unsolvable worries',
        'Use thought challenging techniques for irrational fears'
      ]
    },
    'tension': {
      title: 'Releasing Muscle Tension',
      content: 'Physical tension often accompanies anxiety:',
      tips: [
        'Practice progressive muscle relaxation',
        'Try gentle stretching or yoga',
        'Use heat therapy like warm baths or heating pads',
        'Schedule regular movement breaks throughout your day'
      ]
    },
    'racing-heart': {
      title: 'Calming a Racing Heart',
      content: 'Heart palpitations can be scary but are often manageable:',
      tips: [
        'Practice deep, diaphragmatic breathing',
        'Try the 4-7-8 breathing technique',
        'Place one hand on your chest and one on your belly to focus on breathing',
        'Reduce caffeine and other stimulants'
      ]
    },
    'breathing': {
      title: 'Easing Breathing Difficulties',
      content: 'Shortness of breath is a common anxiety symptom:',
      tips: [
        'Practice pursed lip breathing',
        'Try box breathing (4 counts in, hold 4, out 4, hold 4)',
        'Sit upright with good posture to open airways',
        'Focus on exhaling completely to reduce trapped air'
      ]
    },
    'sleep': {
      title: 'Addressing Anxiety-Related Sleep Issues',
      content: 'Anxiety often interferes with sleep quality:',
      tips: [
        'Develop a calming pre-sleep routine',
        'Practice a body scan meditation before bed',
        'Write down worries before bedtime to "park" them for tomorrow',
        'Keep a consistent sleep-wake schedule'
      ]
    }
  };
  
  // Update recommendations based on selected mood
  function updateMoodRecommendations() {
    const selectedMood = document.querySelector('.mood-selector:not(.large) .mood-option.selected');
    let mood = 'happy'; // Default mood
    
    if (selectedMood) {
      mood = selectedMood.dataset.mood;
    }
    
    // Update emoji and mood text in the recommendations title
    document.getElementById('mood-emoji-display').textContent = moodData[mood].emoji;
    document.getElementById('current-mood').textContent = mood;
    
    // Update top recommendations on home page
    const topRecommendationsContainer = document.getElementById('top-recommendations');
    topRecommendationsContainer.innerHTML = '';
    
    // Get a mix of recommendations from different categories
    const topRecommendations = [
      { item: moodData[mood].exercises[0], category: 'exercises' },
      { item: moodData[mood].books[0], category: 'books' },
      { item: moodData[mood].music[0], category: 'music' },
      { item: moodData[mood].movies[0], category: 'movies' },
      { item: moodData[mood].games[0], category: 'games' }
    ];
    
    // Create cards for top recommendations
    topRecommendations.forEach(rec => {
      // Special case for books - use flip card
      if (rec.category === 'books') {
        const card = createBookCard(rec.item);
        topRecommendationsContainer.appendChild(card);
      } else {
        // For other categories, use regular resource card
        const card = createResourceCard(rec.item, rec.category);
        topRecommendationsContainer.appendChild(card);
      }
    });
    
    // If sad or anxious, show symptom assessment
    if (mood === 'sad' || mood === 'anxious') {
      setTimeout(() => {
        showSymptomAssessment(mood);
      }, 500);
    } else {
      // Hide symptom info for other moods
      document.getElementById('symptom-info-container').style.display = 'none';
    }
  }
  
  // Create resource card element (non-flipping)
  function createResourceCard(item, category) {
    const resourceCard = document.createElement('div');
    resourceCard.className = `resource-card category-${category}`;
    resourceCard.dataset.category = category;
    
    resourceCard.innerHTML = `
      <div class="resource-icon">${item.icon}</div>
      <h5>${item.title}</h5>
      <p>${item.subtitle}</p>
      <a href="${item.link || '#'}" class="view-btn" ${!item.link ? 'onclick="return false;"' : ''}>View Details</a>
    `;
    
    
    // Add event listener to view button
    const viewBtn = resourceCard.querySelector('.view-btn');
    viewBtn.addEventListener('click', function() {
      navigateToScreen('resources-screen');
      // Set active category tab
      document.querySelectorAll('.category-tab').forEach(tab => {
        if (tab.dataset.category === category) {
          tab.click();
        }
      });
    });
    
    return resourceCard;
  }
  function createBookCard(item) {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card category-books';
    bookCard.dataset.category = 'books';
    
  // Updated JavaScript for book card generation
  bookCard.innerHTML = `
  <div class="book-card-content">
    <div class="book-card-icon">${item.icon}</div>
    <h5 class="book-title">${item.title}</h5>
    <div class="book-author">${item.subtitle}</div>
    <p class="book-description">${item.description}</p>
    <button class="view-btn">View Details</button>
  </div>
  `;
    
    // Add event listener to view button
    const viewBtn = bookCard.querySelector('.view-btn');
    viewBtn.addEventListener('click', function() {
      navigateToScreen('resources-screen');
      // Set active category tab
      document.querySelectorAll('.category-tab').forEach(tab => {
        if (tab.dataset.category === 'books') {
          tab.click();
        }
      });
    });
    
    return bookCard;
  }
  
  // Show symptom assessment modal for sad or anxious moods
  function showSymptomAssessment(mood) {
    const symptomModal = document.getElementById('symptom-modal');
    const symptomOptionsContainer = document.getElementById('symptom-options');
    
    // Set title based on mood
    document.getElementById('symptom-modal-title').textContent = 
      mood === 'sad' ? 'Tell us more about your sadness' : 'Tell us more about your anxiety';
    
    // Clear previous options
    symptomOptionsContainer.innerHTML = '';
    
    // Add options based on mood
    symptomOptions[mood].forEach(option => {
      const optionDiv = document.createElement('div');
      optionDiv.className = 'symptom-option';
      optionDiv.innerHTML = `
        <input type="checkbox" id="${option.id}" name="symptoms" value="${option.id}">
        <label for="${option.id}">${option.text}</label>
      `;
      symptomOptionsContainer.appendChild(optionDiv);
    });
    
    // Show modal
    symptomModal.classList.add('active');
  }
  
  // Process selected symptoms
  function processSymptoms() {
    const selectedSymptoms = [];
    document.querySelectorAll('input[name="symptoms"]:checked').forEach(checkbox => {
      selectedSymptoms.push(checkbox.value);
    });
    
    // Close modal
    document.getElementById('symptom-modal').classList.remove('active');
    
    // If no symptoms selected, do nothing
    if (selectedSymptoms.length === 0) return;
    
    // Display symptom info
    updateSymptomInfo(selectedSymptoms);
  }
  
  // Update symptom info section
  function updateSymptomInfo(selectedSymptoms) {
    const symptomInfoContainer = document.getElementById('symptom-info-container');
    
    // If no symptoms, hide container
    if (selectedSymptoms.length === 0) {
      symptomInfoContainer.style.display = 'none';
      return;
    }
    
    // Choose the first symptom to display (in a real app, you might want to show multiple)
    const symptomId = selectedSymptoms[0];
    const info = symptomInfo[symptomId];
    
    // Create content
    let content = `
      <div class="symptom-info">
        <h3><span>ℹ️</span> ${info.title}</h3>
        <p>${info.content}</p>
        <ul>
    `;
    
    info.tips.forEach(tip => {
      content += `<li>${tip}</li>`;
    });
    
    content += `
        </ul>
        <p>Remember: These are suggestions, not medical advice. If symptoms persist, consider speaking with a healthcare professional.</p>
      </div>
    `;
    
    // Update container
    symptomInfoContainer.innerHTML = content;
    symptomInfoContainer.style.display = 'block';
    
    // Add animation
    const infoDiv = symptomInfoContainer.querySelector('.symptom-info');
    infoDiv.style.animation = 'none';
    setTimeout(() => {
      infoDiv.style.animation = 'slideInUp 0.8s ease-out';
    }, 10);
  }
  
  // Load resources by category
  function loadResourcesByCategory(category) {
    const resourcesGrid = document.getElementById('resources-grid');
    resourcesGrid.innerHTML = '';
    
    // Combine all mood data categories
    const allResources = {};
    
    // Collect all unique resources across moods
    Object.keys(moodData).forEach(mood => {
      ['exercises', 'books', 'music', 'movies', 'games'].forEach(cat => {
        if (!allResources[cat]) {
          allResources[cat] = [];
        }
        
        // Add unique items
        moodData[mood][cat].forEach(item => {
          const exists = allResources[cat].some(existing => existing.title === item.title);
          if (!exists) {
            allResources[cat].push({...item, category: cat});
          }
        });
      });
    });
    
    // Filter by selected category
    let resourcesToShow = [];
    
    if (category === 'all') {
      // Show all categories
      Object.keys(allResources).forEach(cat => {
        resourcesToShow = resourcesToShow.concat(allResources[cat]);
      });
    } else {
      // Show specific category
      resourcesToShow = allResources[category];
    }
    
    // Create resource cards
    resourcesToShow.forEach(item => {
      // Special case for books - use flip card
      if (item.category === 'books') {
        const bookCard = createBookCard(item);
        resourcesGrid.appendChild(bookCard);
      } else {
        // For other categories, use regular resource card
        const resourceCard = createResourceCard(item, item.category);
        resourcesGrid.appendChild(resourceCard);
      }
    });
  }
  
  // Mood selection
  document.querySelectorAll('.mood-option').forEach(option => {
    option.addEventListener('click', function() {
      const parentSelector = this.closest('.mood-selector');
      parentSelector.querySelectorAll('.mood-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      this.classList.add('selected');
      
      // If on home screen, update recommendations
      if (document.getElementById('home-screen').classList.contains('active')) {
        updateMoodRecommendations();
        
        // Add a subtle animation to show the recommendations are updated
        const recommendationsSection = document.querySelector('.mood-recommendations-section');
        recommendationsSection.style.animation = 'none';
        setTimeout(() => {
          recommendationsSection.style.animation = 'slideInUp 0.8s ease-out';
        }, 10);
      }
    });
  });
  
  // Submit symptoms
  document.getElementById('symptom-submit').addEventListener('click', processSymptoms);
  
  // Close symptom modal
  document.querySelectorAll('.close-modal').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
      this.closest('.modal').classList.remove('active');
    });
  });
  
  // Resource filtering
  document.querySelectorAll('.category-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      // Update active tab
      document.querySelectorAll('.category-tab').forEach(t => {
        t.classList.remove('active');
      });
      this.classList.add('active');
      
      const category = this.dataset.category;
      loadResourcesByCategory(category);
    });
  });
  
  // Resource search
  document.getElementById('resource-search').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    
    document.querySelectorAll('.resource-card, .book-card').forEach(card => {
      const title = card.querySelector('h5').textContent.toLowerCase();
      const description = card.querySelector('p').textContent.toLowerCase();
      
      if (title.includes(searchTerm) || description.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
  
  // AI Chatbot functionality
  const chatMessages = document.getElementById('chat-messages');
  const userMessageInput = document.getElementById('user-message');
  const sendMessageBtn = document.getElementById('send-message');
  
  function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'message user' : 'message bot';
    
    const messageBubble = document.createElement('div');
    messageBubble.className = 'message-bubble';
    messageBubble.textContent = content;
    
    const messageTime = document.createElement('div');
    messageTime.className = 'message-time';
    messageTime.textContent = 'Just now';
    
    messageDiv.appendChild(messageBubble);
    messageDiv.appendChild(messageTime);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  function addTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing-indicator';
    typingDiv.id = 'typing-indicator';
    
    const messageBubble = document.createElement('div');
    messageBubble.className = 'message-bubble';
    
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'typing-dots';
    dotsContainer.style.display = 'flex';
    dotsContainer.style.gap = '3px';
    
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('div');
      dot.className = 'typing-dot';
      dotsContainer.appendChild(dot);
    }
    
    messageBubble.appendChild(dotsContainer);
    typingDiv.appendChild(messageBubble);
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      chatMessages.removeChild(typingIndicator);
    }
  }

  const communityMessages = document.getElementById('community-messages');
const communityMessageInput = document.getElementById('community-message');
const sendCommunityMessageBtn = document.getElementById('send-community-message');

function addCommunityMessage(content, username = 'You') {
const messageDiv = document.createElement('div');
messageDiv.className = username === 'You' ? 'message user' : 'message other';

if (username !== 'You') {
const messageUser = document.createElement('div');
messageUser.className = 'message-user';
messageUser.textContent = username;
messageDiv.appendChild(messageUser);
}

const messageBubble = document.createElement('div');
messageBubble.className = 'message-bubble';
messageBubble.textContent = content;

const messageTime = document.createElement('div');
messageTime.className = 'message-time';
messageTime.textContent = 'Just now';

messageDiv.appendChild(messageBubble);
messageDiv.appendChild(messageTime);

communityMessages.appendChild(messageDiv);
communityMessages.scrollTop = communityMessages.scrollHeight;
}

function sendCommunityMessage() {
const message = communityMessageInput.value.trim();

if (message) {
// Add user message
addCommunityMessage(message);

// Clear input
communityMessageInput.value = '';

// Simulate community response
setTimeout(() => {
  const usernames = ['User1234', 'User5678', 'User9012', 'User3456'];
  const responses = [
    "I can relate to that. Thanks for sharing.",
    "That's a great point. I've experienced something similar.",
    "Have you tried mindfulness techniques for that?",
    "I appreciate your honesty. It helps to know others feel this way too."
  ];

  const randomUsername = usernames[Math.floor(Math.random() * usernames.length)];
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];

  addCommunityMessage(randomResponse, randomUsername);
}, 3000);
}
}

if (sendCommunityMessageBtn) {
sendCommunityMessageBtn.addEventListener('click', sendCommunityMessage);
}

if (communityMessageInput) {
communityMessageInput.addEventListener('keypress', function (e) {
if (e.key === 'Enter') {
  sendCommunityMessage();
}
});
}
  
  function getAIResponse(message) {
    // Simple rule-based responses
    message = message.toLowerCase();
    
    if (message.includes('anxious') || message.includes('anxiety')) {
      return "I understand feeling anxious can be challenging. Try taking a few deep breaths - inhale for 4 counts, hold for 4, and exhale for 6. This activates your parasympathetic nervous system, which helps calm your body's stress response. Would you like to try a guided breathing exercise or explore other anxiety management techniques?";
    } else if (message.includes('sad') || message.includes('down') || message.includes('depressed')) {
      return "I'm sorry you're feeling down. Remember that it's okay to not be okay sometimes. Your feelings are valid and important. Sometimes small actions can help shift our mood - like going for a short walk, listening to uplifting music, or reaching out to a supportive friend. Would you like to explore some gentle mood-lifting activities or talk more about what's bothering you?";
    } else if (message.includes('happy') || message.includes('good') || message.includes('great')) {
      return "I'm glad to hear you're feeling good! Positive emotions are worth savoring and celebrating. Taking a moment to appreciate these feelings can actually help extend them. What's something positive that happened today that contributed to your good mood? Reflecting on these moments can help reinforce positive patterns in your life.";
    } else if (message.includes('motivation') || message.includes('unmotivated')) {
      return "Finding motivation can be tough sometimes. Our energy and drive naturally fluctuate, and that's completely normal. Try breaking your goals into smaller, more manageable steps - even tiny progress is still progress! Sometimes starting with just 5 minutes of an activity can help build momentum. What's one small thing you could do today that would make you feel accomplished?";
    } else if (message.includes('sleep') || message.includes('insomnia') || message.includes('tired')) {
      return "Sleep issues can be really frustrating and can affect so many aspects of our wellbeing. Creating a calming bedtime routine can signal to your body it's time to wind down. This might include dimming lights, avoiding screens an hour before bed, reading something relaxing, or practicing gentle stretching. Would you like to explore some specific techniques for improving sleep quality?";
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! It's good to connect with you. How are you feeling today? I'm here to listen and support you in whatever way would be most helpful right now.";
    } else if (message.includes('thank')) {
      return "You're welcome! I'm here anytime you need to talk or need support. Taking care of your mental wellbeing is important, and I'm glad I could help in some way.";
    } else if (message.includes('bye') || message.includes('goodbye')) {
      return "Take care! Remember to be kind to yourself today. Small acts of self-care can make a big difference. I'll be here whenever you'd like to chat again.";
    } else {
      return "Thank you for sharing that with me. Everyone's experience is unique, and I appreciate you opening up. Would you like to tell me more about what you're going through, or would you prefer to explore some coping strategies that might help in this situation?";
    }
  }
  
  function sendMessage() {
    const message = userMessageInput.value.trim();
    
    if (message) {
      // Add user message
      addMessage(message, true);
      
      // Clear input
      userMessageInput.value = '';
      
      // Simulate AI thinking with typing indicator
      addTypingIndicator();
      
      // Simulate AI thinking
      setTimeout(() => {
        // Remove typing indicator
        removeTypingIndicator();
        
        const response = getAIResponse(message);
        addMessage(response);
      }, 1500);
    }
  }
  
  sendMessageBtn.addEventListener('click', sendMessage);
  
  userMessageInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  // Quick responses
  document.querySelectorAll('.quick-response-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const response = this.dataset.response;
      userMessageInput.value = response;
      sendMessage();
    });
  });
  
  // Crisis button
  const crisisModal = document.getElementById('crisis-modal');
  const crisisBtn = document.getElementById('crisis-btn');
  
  crisisBtn.addEventListener('click', function() {
    crisisModal.classList.add('active');
  });
  
  // Close modal button
  document.querySelectorAll('.close-modal-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      this.closest('.modal').classList.remove('active');
    });
  });
  
  // Journal functionality
  function updateJournalDate() {
    const dateElement = document.getElementById('journal-current-date');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date().toLocaleDateString('en-US', options);
    dateElement.textContent = formattedDate;
  }
  
  // Journal type selection
  document.querySelectorAll('.journal-type').forEach(type => {
    type.addEventListener('click', function() {
      document.querySelectorAll('.journal-type').forEach(t => {
        t.classList.remove('active');
      });
      this.classList.add('active');
      
      const journalType = this.dataset.type;
      const typeDisplay = document.getElementById('journal-type-display');
      const contentArea = document.getElementById('journal-content');
      
      // Update type display
      typeDisplay.textContent = this.querySelector('div:last-child').textContent;
      
      // Update placeholder based on journal type
      switch(journalType) {
        case 'free':
          contentArea.placeholder = "Start writing here... What's on your mind today?";
          break;
        case 'gratitude':
          contentArea.placeholder = "What are you grateful for today? List 3-5 things and why they matter to you...";
          break;
        case 'vent':
          contentArea.placeholder = "This is a safe space to express difficult emotions. What's bothering you? Let it all out...";
          break;
        case 'reflection':
          contentArea.placeholder = "Reflect on your day. What went well? What could have gone better? What did you learn?";
          break;
      }
    });
  });
  
  // Journal save functionality
  document.getElementById('journal-save').addEventListener('click', function() {
    const title = document.getElementById('journal-title').value.trim();
    const content = document.getElementById('journal-content').value.trim();
    const journalType = document.querySelector('.journal-type.active').dataset.type;
    const mood = document.getElementById('journal-mood-select').value;
    
    if (!title || !content) {
      alert('Please add a title and some content to your journal entry.');
      return;
    }
    
    // Create journal entry object
    const entry = {
      id: Date.now().toString(),
      title: title,
      content: content,
      type: journalType,
      mood: mood,
      timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    const journalEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    journalEntries.unshift(entry); // Add to beginning of array
    localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
    
    // Clear form
    document.getElementById('journal-title').value = '';
    document.getElementById('journal-content').value = '';
    
    // Show feedback
    const feedbackDiv = document.createElement('div');
    feedbackDiv.textContent = 'Journal entry saved!';
    feedbackDiv.style.position = 'fixed';
    feedbackDiv.style.top = '50%';
    feedbackDiv.style.left = '50%';
    feedbackDiv.style.transform = 'translate(-50%, -50%)';
    feedbackDiv.style.backgroundColor = 'var(--primary-color)';
    feedbackDiv.style.color = 'white';
    feedbackDiv.style.padding = '1rem 2rem';
    feedbackDiv.style.borderRadius = 'var(--border-radius)';
    feedbackDiv.style.zIndex = '1000';
    feedbackDiv.style.animation = 'fadeIn 0.3s ease-out';
    
    document.body.appendChild(feedbackDiv);
    
    setTimeout(() => {
      feedbackDiv.style.animation = 'fadeIn 0.3s ease-out reverse';
      setTimeout(() => {
        document.body.removeChild(feedbackDiv);
      }, 300);
    }, 2000);
    
    // Reload entries
    loadJournalEntries();
  });
  
  // Journal clear functionality
  document.getElementById('journal-clear').addEventListener('click', function() {
    document.getElementById('journal-title').value = '';
    document.getElementById('journal-content').value = '';
  });
  
  // Load journal entries
  function loadJournalEntries() {
    const entriesContainer = document.getElementById('journal-entries-list');
    const journalEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    
    if (journalEntries.length === 0) {
      entriesContainer.innerHTML = '<p>No journal entries yet. Start writing to see your entries here.</p>';
      return;
    }
    
    entriesContainer.innerHTML = '';
    
    journalEntries.forEach(entry => {
      const date = new Date(entry.timestamp);
      const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      
      const entryDiv = document.createElement('div');
      entryDiv.className = 'journal-entry';
      entryDiv.dataset.id = entry.id;
      
      entryDiv.innerHTML = `
        <div class="journal-entry-header">
          <div class="journal-entry-title">${entry.title}</div>
          <div class="journal-entry-date">${formattedDate}</div>
        </div>
        <div class="journal-entry-preview">${entry.content.substring(0, 100)}${entry.content.length > 100 ? '...' : ''}</div>
      `;
      
      entriesContainer.appendChild(entryDiv);
      
      // Add click event to view entry
      entryDiv.addEventListener('click', function() {
        viewJournalEntry(entry.id);
      });
    });
  }
  
  // View journal entry
  function viewJournalEntry(id) {
    const journalEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    const entry = journalEntries.find(e => e.id === id);
    
    if (!entry) return;
    
    // Fill form with entry data
    document.getElementById('journal-title').value = entry.title;
    document.getElementById('journal-content').value = entry.content;
    document.getElementById('journal-mood-select').value = entry.mood;
    
    // Set journal type
    document.querySelectorAll('.journal-type').forEach(type => {
      if (type.dataset.type === entry.type) {
        type.click();
      }
    });
    
    // Scroll to editor
    document.querySelector('.journal-editor').scrollIntoView({ behavior: 'smooth' });
  }
  
  // Save mood
  document.getElementById('save-mood').addEventListener('click', function() {
    const selectedMood = document.querySelector('.mood-selector.large .mood-option.selected');
    const notes = document.getElementById('mood-notes').value;
    
    if (selectedMood) {
      const mood = selectedMood.dataset.mood;
      const timestamp = new Date().toISOString();
      
      // Save to localStorage
      const moodData = JSON.parse(localStorage.getItem('moodData') || '[]');
      moodData.push({
        mood: mood,
        notes: notes,
        timestamp: timestamp
      });
      localStorage.setItem('moodData', JSON.stringify(moodData));
      
      // Update chart
      updateMoodChart();
      
      // Reset form
      selectedMood.classList.remove('selected');
      document.getElementById('mood-notes').value = '';
      
      // Show feedback
      const feedbackDiv = document.createElement('div');
      feedbackDiv.textContent = 'Mood saved successfully!';
      feedbackDiv.style.position = 'fixed';
      feedbackDiv.style.top = '50%';
      feedbackDiv.style.left = '50%';
      feedbackDiv.style.transform = 'translate(-50%, -50%)';
      feedbackDiv.style.backgroundColor = 'var(--primary-color)';
      feedbackDiv.style.color = 'white';
      feedbackDiv.style.padding = '1rem 2rem';
      feedbackDiv.style.borderRadius = 'var(--border-radius)';
      feedbackDiv.style.zIndex = '1000';
      feedbackDiv.style.animation = 'fadeIn 0.3s ease-out';
      
      document.body.appendChild(feedbackDiv);
      
      setTimeout(() => {
        feedbackDiv.style.animation = 'fadeIn 0.3s ease-out reverse';
        setTimeout(() => {
          document.body.removeChild(feedbackDiv);
        }, 300);
      }, 2000);
    } else {
      alert('Please select a mood before saving.');
    }
  });
  
  // Initialize and update mood chart
  function updateMoodChart() {
    const moodData = JSON.parse(localStorage.getItem('moodData') || '[]');
    
    if (moodData.length === 0) {
      return;
    }
    
    // Sort by date
    moodData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    
    // Get last 7 entries
    const recentData = moodData.slice(-7);
    
    // Prepare data for chart
    const labels = recentData.map(entry => {
      const date = new Date(entry.timestamp);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    
    const moodValues = recentData.map(entry => {
      switch(entry.mood) {
        case 'happy': return 5;
        case 'energetic': return 4;
        case 'calm': return 3;
        case 'sad': return 2;
        case 'anxious': return 1;
        default: return 0;
      }
    });
    
    // Create or update chart
    const ctx = document.getElementById('mood-chart').getContext('2d');
    
    if (window.moodChart) {
      window.moodChart.data.labels = labels;
      window.moodChart.data.datasets[0].data = moodValues;
      window.moodChart.update();
    } else {
      window.moodChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Mood',
            data: moodValues,
            backgroundColor: 'rgba(91, 138, 245, 0.2)',
            borderColor: 'rgba(91, 138, 245, 1)',
            borderWidth: 2,
            tension: 0.3,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              min: 0,
              max: 6,
              ticks: {
                stepSize: 1,
                callback: function(value) {
                  switch(value) {
                    case 5: return 'Happy';
                    case 4: return 'Energetic';
                    case 3: return 'Calm';
                    case 2: return 'Sad';
                    case 1: return 'Anxious';
                    default: return '';
                  }
                }
              }
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    }
  }
  
  // Initialize chart if data exists
  updateMoodChart();
  
  // Initialize with default mood
  document.querySelector('.mood-selector:not(.large) .mood-option[data-mood="happy"]').classList.add('selected');
  updateMoodRecommendations();
  
  // Initialize resources
  document.querySelector('.category-tab[data-category="all"]').classList.add('active');
  loadResourcesByCategory('all');
  
  // Initialize sample mood data if none exists
  if (!localStorage.getItem('moodData')) {
    const today = new Date();
    const sampleMoodData = [
      {
        mood: 'happy',
        notes: 'Had a great day with friends',
        timestamp: new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        mood: 'calm',
        notes: 'Practiced meditation for 10 minutes',
        timestamp: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        mood: 'anxious',
        notes: 'Worried about upcoming presentation',
        timestamp: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        mood: 'sad',
        notes: 'Missing family today',
        timestamp: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        mood: 'energetic',
        notes: 'Started a new exercise routine',
        timestamp: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        mood: 'calm',
        notes: 'Relaxing day at home',
        timestamp: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        mood: 'happy',
        notes: 'Got good news today',
        timestamp: new Date().toISOString()
      }
    ];
    localStorage.setItem('moodData', JSON.stringify(sampleMoodData));
    updateMoodChart();
  }
  
  // Initialize sample journal entries if none exist
  if (!localStorage.getItem('journalEntries')) {
    const sampleEntries = [
      {
        id: '1',
        title: 'Finding Peace Today',
        content: 'Today I practiced mindfulness for 10 minutes and felt much calmer afterward. I noticed how my thoughts tend to race when I\'m stressed, but focusing on my breath really helps slow things down.',
        type: 'reflection',
        mood: 'calm',
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString() // 2 days ago
      },
      {
        id: '2',
        title: 'Grateful for Small Things',
        content: '1. The warm cup of coffee this morning\n2. My friend\'s text checking in on me\n3. The beautiful sunset I saw on my walk\n4. Having a comfortable bed to sleep in\n5. Finding a new song I really enjoy',
        type: 'gratitude',
        mood: 'happy',
        timestamp: new Date(Date.now() - 86400000).toISOString() // 1 day ago
      },
      {
        id: '3',
        title: 'Feeling Overwhelmed',
        content: 'Work has been so stressful lately. I feel like I can\'t keep up with all the deadlines and expectations. Sometimes I wonder if I\'m in the right job. I need to find better ways to manage my stress before it affects my health.',
        type: 'vent',
        mood: 'anxious',
        timestamp: new Date().toISOString() // today
      }
    ];
    localStorage.setItem('journalEntries', JSON.stringify(sampleEntries));
  }
  
  // Initialize the app
  updateDailyQuote();
  setInterval(updateDailyQuote, 5 * 60 * 1000); // Update quote every 5 minutes
});






















