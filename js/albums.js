// Sample albums data (replace with actual data)
const albums = [
    {
        id: 'istanbul-alacati',
        title: 'Istanbul & Alaçatı',
        location: 'Turkey',
        date: 'Summer 2023',
        coverImage: 'assets/albums/istanbul/cover.jpg',
        description: 'A journey through the historic streets of Istanbul and the windmills of Alaçatı',
        photoCount: 0, // Will be updated when photos are added
        photos: [] // Will contain photo objects with src, caption, date
    },
    {
        id: 'vienna',
        title: 'Vienna',
        location: 'Austria',
        date: 'Spring 2023',
        coverImage: 'assets/albums/vienna/cover.jpg',
        description: 'Classical architecture and coffee culture in the heart of Austria',
        photoCount: 0,
        photos: []
    },
    {
        id: 'budapest',
        title: 'Budapest',
        location: 'Hungary',
        date: 'Spring 2023',
        coverImage: 'assets/albums/budapest/cover.jpg',
        description: 'Thermal baths and Gothic architecture along the Danube',
        photoCount: 0,
        photos: []
    },
    {
        id: 'paris',
        title: 'Paris',
        location: 'France',
        date: 'Winter 2022',
        coverImage: 'assets/albums/paris/cover.jpg',
        description: 'City of Light and timeless romance',
        photoCount: 0,
        photos: []
    }
];

function populateAlbums() {
    const albumsGrid = document.querySelector('.albums-grid');
    const prevButton = document.querySelector('.albums .carousel-prev');
    const nextButton = document.querySelector('.albums .carousel-next');
    
    if (!albumsGrid || !prevButton || !nextButton) return;

    albumsGrid.innerHTML = albums.map(album => `
        <article class="album-card" data-album-id="${album.id}">
            <img src="${album.coverImage}" alt="${album.title}" class="album-cover">
            <div class="album-overlay">
                <h3 class="album-title">${album.title}</h3>
                <div class="album-meta">
                    <span class="album-location">📍 ${album.location}</span>
                    <span class="album-date">📅 ${album.date}</span>
                    <span class="album-count">📸 ${album.photoCount} photos</span>
                </div>
            </div>
        </article>
    `).join('');

    setupAlbumModal();

    // Handle carousel navigation
    prevButton.addEventListener('click', () => {
        albumsGrid.scrollBy({
            left: -420,
            behavior: 'smooth'
        });
    });

    nextButton.addEventListener('click', () => {
        albumsGrid.scrollBy({
            left: 420,
            behavior: 'smooth'
        });
    });

    // Show/hide navigation buttons based on scroll position
    albumsGrid.addEventListener('scroll', () => {
        const isAtStart = albumsGrid.scrollLeft === 0;
        const isAtEnd = albumsGrid.scrollLeft + albumsGrid.clientWidth >= albumsGrid.scrollWidth - 1;
        
        prevButton.style.opacity = isAtStart ? '0.3' : '1';
        prevButton.style.pointerEvents = isAtStart ? 'none' : 'auto';
        
        nextButton.style.opacity = isAtEnd ? '0.3' : '1';
        nextButton.style.pointerEvents = isAtEnd ? 'none' : 'auto';
    });

    // Trigger initial scroll check
    albumsGrid.dispatchEvent(new Event('scroll'));
}

function setupAlbumModal() {
    const albumCards = document.querySelectorAll('.album-card');
    const modal = document.querySelector('.album-modal');
    const modalContent = modal?.querySelector('.album-modal-content');
    const modalClose = modal?.querySelector('.album-modal-close');
    
    if (!modal || !modalContent || !modalClose) return;

    albumCards.forEach(card => {
        card.addEventListener('click', () => {
            const albumId = card.dataset.albumId;
            const album = albums.find(a => a.id === albumId);
            if (!album) return;

            modalContent.innerHTML = `
                <div class="album-modal-header">
                    <div>
                        <h2 class="album-modal-title">${album.title}</h2>
                        <p class="album-modal-subtitle">${album.description}</p>
                    </div>
                    <button class="album-modal-close">&times;</button>
                </div>
                <div class="album-photos">
                    ${album.photos.length ? album.photos.map(photo => `
                        <div class="album-photo">
                            <img src="${photo.src}" alt="${photo.caption || ''}" loading="lazy">
                        </div>
                    `).join('') : `
                        <div class="album-empty">
                            <p>Photos coming soon...</p>
                        </div>
                    `}
                </div>
            `;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Setup close button
            const newCloseBtn = modalContent.querySelector('.album-modal-close');
            newCloseBtn?.addEventListener('click', closeModal);
        });
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize albums when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    populateAlbums();
});
