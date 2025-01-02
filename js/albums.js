// Sample albums data (replace with actual data)
const albums = [
    {
        id: 'paris',
        title: 'Paris',
        location: 'France',
        date: 'Winter 2022',
        coverImage: 'assets/albums/paris/cover.jpg',
        description: 'City of Light and timeless romance',
        photos: [
            'IMG_0024.JPG', 'IMG_0027.JPG', 'IMG_0028.JPG', 'IMG_0029.JPG', 'IMG_0030.JPG',
            'IMG_0031.JPG', 'IMG_0032.JPG', 'IMG_0034.JPG', 'IMG_0035.JPG', 'IMG_0036.JPG',
            'IMG_0040.JPG', 'IMG_0044.JPG', 'IMG_0046.JPG', 'IMG_0051.JPG', 'IMG_0053.JPG',
            'IMG_0054.JPG', 'IMG_0055.JPG', 'IMG_0065.JPG', 'IMG_0066.JPG', 'IMG_0070.JPG',
            'IMG_0072.JPG', 'IMG_0087.JPG', 'IMG_0095.JPG', 'IMG_0117.JPG', 'IMG_0126.JPG',
            'IMG_0133.JPG', 'IMG_0138.JPG', 'IMG_0150.JPG', 'IMG_0151.JPG', 'IMG_0164.JPG',
            'IMG_0169.JPG', 'IMG_0208.JPG', 'IMG_0209.JPG', 'IMG_0210.JPG', 'IMG_0214.JPG',
            'IMG_0266.JPG', 'IMG_0267.JPG', 'IMG_0269.JPG', 'IMG_0278.JPG', 'IMG_0283.JPG',
            'IMG_0300.JPG', 'IMG_0302.JPG', 'IMG_0318.JPG', 'IMG_0320.JPG', 'IMG_0321.JPG',
            'IMG_0322.JPG', 'IMG_0323.JPG', 'IMG_0329.JPG', 'IMG_0333.JPG', 'IMG_0335.JPG',
            'IMG_0344.JPG', 'IMG_0345.JPG', 'IMG_0351.JPG', 'IMG_0355.JPG', 'IMG_0359.JPG',
            'IMG_0360.JPG', 'IMG_0361.JPG', 'IMG_0363.JPG', 'IMG_0366.JPG', 'IMG_0367.JPG',
            'IMG_0377.JPG', 'IMG_0378.JPG', 'IMG_0382.JPG', 'IMG_0388.JPG', 'IMG_0390.JPG',
            'IMG_0391.JPG', 'IMG_0395.JPG', 'IMG_0396.JPG', 'IMG_0398.JPG', 'IMG_0402.JPG',
            'IMG_0403.JPG', 'IMG_0404.JPG', 'IMG_0406.JPG', 'IMG_0407.JPG', 'IMG_0408.JPG',
            'IMG_0409.JPG', 'IMG_0410.JPG', 'IMG_0411.JPG', 'IMG_0413.JPG', 'IMG_0415.JPG',
            'IMG_0447.JPG', 'IMG_0448.JPG', 'IMG_0462.JPG'
        ].map(filename => ({
            src: `assets/albums/paris/photos/${filename}`,
            caption: `Paris - ${filename.replace('.JPG', '')}`
        }))
    },
    {
        id: 'istanbul-alacati',
        title: 'Istanbul & Alaçatı',
        location: 'Turkey',
        date: 'Summer 2023',
        coverImage: 'assets/albums/istanbul/cover.jpg',
        description: 'A journey through the historic streets of Istanbul and the windmills of Alaçatı',
        photos: []
    },
    {
        id: 'vienna',
        title: 'Vienna',
        location: 'Austria',
        date: 'Spring 2023',
        coverImage: 'assets/albums/vienna/cover.jpg',
        description: 'Classical architecture and coffee culture in the heart of Austria',
        photos: []
    },
    {
        id: 'budapest',
        title: 'Budapest',
        location: 'Hungary',
        date: 'Spring 2023',
        coverImage: 'assets/albums/budapest/cover.jpg',
        description: 'Thermal baths and Gothic architecture along the Danube',
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
                    <span class="album-count">📸 ${album.photos.length} photos</span>
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
    
    console.log('Setting up album modal:', { 
        albumCards: albumCards.length,
        modal: !!modal,
        modalContent: !!modalContent
    });
    
    if (!modal || !modalContent) {
        console.error('Missing modal elements:', { modal, modalContent });
        return;
    }

    albumCards.forEach((card, index) => {
        console.log(`Setting up click handler for card ${index}:`, card.dataset.albumId);
        card.addEventListener('click', (e) => {
            console.log('Card clicked:', card.dataset.albumId);
            e.preventDefault();
            const albumId = card.dataset.albumId;
            const album = albums.find(a => a.id === albumId);
            if (!album) return;

            modalContent.innerHTML = `
                <div class="album-modal-header">
                    <div>
                        <h2 class="album-modal-title">${album.title}</h2>
                        <p class="album-modal-subtitle">
                            <span class="album-location">📍 ${album.location}</span>
                            <span class="album-date">📅 ${album.date}</span>
                            <span class="album-count">📸 ${album.photos.length} photos</span>
                        </p>
                        <p class="album-description">${album.description}</p>
                    </div>
                    <button class="album-modal-close">&times;</button>
                </div>
                <div class="album-modal-photos">
                    ${album.photos.map(photo => `
                        <div class="album-modal-photo">
                            <img src="${photo.src}" alt="${photo.caption}" loading="lazy">
                        </div>
                    `).join('')}
                </div>
            `;

            requestAnimationFrame(() => {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                console.log('Modal activated');
            });

            // Setup close button
            const newCloseBtn = modalContent.querySelector('.album-modal-close');
            if (newCloseBtn) {
                newCloseBtn.addEventListener('click', closeModal);
            }

            // Prevent event from bubbling up to modal
            modalContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
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
