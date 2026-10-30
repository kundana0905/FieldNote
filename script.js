const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const results = document.getElementById('results');
const emptyState = document.getElementById('empty-state');
const resultCount = document.getElementById('result-count');

function renderResults(items, query) {
  results.innerHTML = '';
  let count = 0;

  items.forEach((item) => {
    const imageUrl = item.imageinfo?.[0]?.thumburl;
    if (!imageUrl) return;

    const card = document.createElement('article');
    card.className = 'result-card';

    const image = document.createElement('img');
    image.src = imageUrl;
    image.alt = item.title;
    image.loading = 'lazy';

    const caption = document.createElement('div');
    caption.className = 'result-card__meta';

    const label = document.createElement('span');
    label.className = 'result-card__label';
    label.textContent = 'Wikimedia Commons';

    const title = document.createElement('h3');
    title.textContent = item.title.replace(/^File:/, '').replace(/_/g, ' ');

    caption.append(label, title);
    card.append(image, caption);
    results.appendChild(card);
    count += 1;
  });

  results.hidden = count === 0;
  emptyState.hidden = count > 0;
  resultCount.textContent = count
    ? `Showing ${count} ${count === 1 ? 'image' : 'images'} for “${query}”`
    : `No images found for “${query}” — try another search.`;
}

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (!query) return;

  const url =
    'https://commons.wikimedia.org/w/api.php?action=query&generator=search' +
    '&gsrsearch=' + encodeURIComponent(query) +
    '&gsrnamespace=6&gsrlimit=12&prop=imageinfo' +
    '&iiprop=url&iiurlwidth=300&format=json&origin=*';

  results.innerHTML = '';
  results.hidden = true;
  emptyState.hidden = true;
  resultCount.textContent = `Searching for “${query}”…`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`The image search failed (${response.status}). Please try again.`);
    }

    const data = await response.json();
    const items = Object.values(data.query?.pages ?? {});
    renderResults(items, query);
  } catch (error) {
    results.hidden = true;
    emptyState.hidden = false;
    resultCount.textContent =
      error instanceof Error ? error.message : 'The image search failed. Please try again.';
  }
});

document.querySelectorAll('.suggestion-chip').forEach((button) => {
  button.addEventListener('click', () => {
    searchInput.value = button.textContent.trim();
    searchForm.requestSubmit();
    searchInput.focus();
  });
});
