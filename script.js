const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const results = document.getElementById('results');
const emptyState = document.getElementById('empty-state');
const resultCount = document.getElementById('result-count');

const inspirationLibrary = [
  {
    title: 'Quiet mornings',
    tags: ['quiet', 'morning', 'light', 'calm', 'home'],
    url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    alt: 'Quiet morning light in a cozy room'
  },
  {
    title: 'Wild gardens',
    tags: ['wild', 'garden', 'nature', 'lush', 'green'],
    url: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80',
    alt: 'Wild garden with green foliage'
  },
  {
    title: 'Coastal light',
    tags: ['coast', 'ocean', 'sea', 'light', 'beach'],
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    alt: 'Coastal light over ocean waves'
  },
  {
    title: 'Slow living',
    tags: ['slow', 'living', 'home', 'calm', 'warm'],
    url: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
    alt: 'Slow living home interior with warm tones'
  },
  {
    title: 'City corners',
    tags: ['city', 'urban', 'street', 'architecture', 'travel'],
    url: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
    alt: 'City corner with architecture and streetlight'
  },
  {
    title: 'Forest trails',
    tags: ['forest', 'trail', 'nature', 'green', 'walk'],
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80',
    alt: 'Forest trail in a calm natural setting'
  },
  {
    title: 'Old books',
    tags: ['books', 'reading', 'library', 'quiet', 'study'],
    url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80',
    alt: 'Stack of old books on a shelf'
  },
  {
    title: 'Golden hour',
    tags: ['golden', 'hour', 'sunset', 'warm', 'evening'],
    url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80',
    alt: 'Golden hour landscape with warm tones'
  },
  {
    title: 'Studio details',
    tags: ['studio', 'creative', 'details', 'design', 'workspace'],
    url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
    alt: 'Creative studio workspace with natural light'
  }
];

function normalizeQuery(query) {
  return query.trim().toLowerCase();
}

function matchesQuery(item, searchTerm) {
  if (!searchTerm) {
    return true;
  }

  const haystack = [item.title, ...item.tags].join(' ').toLowerCase();
  return haystack.includes(searchTerm);
}

function renderResults(items) {
  results.innerHTML = '';

  if (!items.length) {
    results.hidden = true;
    emptyState.hidden = false;
    resultCount.textContent = 'No matches yet — try another idea.';
    return;
  }

  results.hidden = false;
  emptyState.hidden = true;
  resultCount.textContent = `${items.length} discovery${items.length > 1 ? 'ies' : 'y'} ready to explore`;

  items.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'result-card';

    const image = document.createElement('img');
    image.src = item.url;
    image.alt = item.alt;
    image.loading = 'lazy';

    const caption = document.createElement('div');
    caption.className = 'result-card__meta';
    caption.innerHTML = `<span class="result-card__label">Inspiration</span><h3>${item.title}</h3>`;

    card.append(image, caption);
    results.appendChild(card);
  });
}

function performSearch(searchTerm) {
  const normalized = normalizeQuery(searchTerm);
  const filtered = inspirationLibrary.filter((item) => matchesQuery(item, normalized));
  renderResults(filtered);
}

searchButton.addEventListener('click', () => {
  performSearch(searchInput.value);
});

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  performSearch(searchInput.value);
});

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    performSearch(searchInput.value);
  }
});

const suggestionButtons = document.querySelectorAll('.suggestion-chip');
suggestionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.textContent.trim();
    searchInput.value = value;
    performSearch(value);
    searchInput.focus();
  });
});

renderResults(inspirationLibrary.slice(0, 6));
