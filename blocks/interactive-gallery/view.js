document.addEventListener('DOMContentLoaded', function() {
    const galleries = document.querySelectorAll('.interactive-gallery');
    
    galleries.forEach(gallery => {
        let currentIndex = 0;
        const slides = gallery.querySelectorAll('.gallery-slide');
        const prevButton = gallery.querySelector('.nav-button.prev');
        const nextButton = gallery.querySelector('.nav-button.next');
        
        const updateVisibility = () => {
            slides.forEach((slide, index) => {
                slide.classList.remove('active', 'prev', 'next');
                
                if (index === currentIndex) {
                    slide.classList.add('active');
                } else if (index === currentIndex - 1) {
                    slide.classList.add('prev');
                } else if (index === currentIndex + 1) {
                    slide.classList.add('next');
                }
            });
            
            // Update button states
            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex === slides.length - 1;
        };
        
        const navigate = (direction) => {
            const newIndex = currentIndex + direction;
            if (newIndex >= 0 && newIndex < slides.length) {
                currentIndex = newIndex;
                updateVisibility();
            }
        };
        
        prevButton.addEventListener('click', () => navigate(-1));
        nextButton.addEventListener('click', () => navigate(1));
        
        // Add keyboard navigation
        gallery.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                navigate(-1);
            } else if (e.key === 'ArrowRight') {
                navigate(1);
            }
        });
        
        // Initialize visibility
        updateVisibility();
    });
});