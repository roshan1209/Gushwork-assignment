document.addEventListener('DOMContentLoaded', () => {
    // --- Sticky Header ---
    const stickyHeader = document.getElementById('stickyHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            stickyHeader.classList.add('active');
        } else {
            stickyHeader.classList.remove('active');
        }
    });

    // --- Image Gallery & Zoom ---
    const mainImage = document.getElementById('mainImage');
    const zoomResult = document.getElementById('zoomResult');
    const imageContainer = document.getElementById('imageContainer');
    const thumbnails = document.querySelectorAll('.thumb');

    // Change image on thumbnail click
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const newSrc = this.getAttribute('data-src');
            mainImage.src = newSrc;
            zoomResult.style.backgroundImage = `url('${newSrc}')`;
        });
    });

    // Initialize zoom background
    zoomResult.style.backgroundImage = `url('${mainImage.src}')`;
    zoomResult.style.backgroundSize = '250%'; // Adjust zoom level

    // Zoom effect on mousemove
    imageContainer.addEventListener('mousemove', function(e) {
        const rect = imageContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate percentages
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;
        
        zoomResult.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
    });

    // --- FAQ Accordion ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('i');
            
            // Toggle current
            if (content.style.display === 'block') {
                content.style.display = 'none';
                icon.classList.replace('ph-caret-up', 'ph-caret-down');
            } else {
                // Close all others (optional, but good UX)
                document.querySelectorAll('.accordion-content').forEach(c => c.style.display = 'none');
                document.querySelectorAll('.accordion-header i').forEach(i => i.classList.replace('ph-caret-up', 'ph-caret-down'));
                
                content.style.display = 'block';
                icon.classList.replace('ph-caret-down', 'ph-caret-up');
            }
        });
    });

    // --- Mobile Menu ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('ph-list', 'ph-x');
            } else {
                icon.classList.replace('ph-x', 'ph-list');
            }
        });
    }

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (mobileMenuBtn) {
                        const icon = mobileMenuBtn.querySelector('i');
                        if (icon) icon.classList.replace('ph-x', 'ph-list');
                    }
                }
            }
        });
    });

    // --- Modals ---
    const catalogueModal = document.getElementById('catalogueModal');
    const quoteModal = document.getElementById('quoteModal');
    const btnDownloadDatasheet = document.getElementById('btnDownloadDatasheet');
    const btnsRequestQuote = document.querySelectorAll('.btn-request-quote');
    const closeBtns = document.querySelectorAll('.close-modal');

    // Open Catalogue Modal
    if (btnDownloadDatasheet && catalogueModal) {
        btnDownloadDatasheet.addEventListener('click', (e) => {
            e.preventDefault();
            catalogueModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }

    // Open Quote Modal
    btnsRequestQuote.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (quoteModal) {
                quoteModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close Modals
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            catalogueModal?.classList.remove('active');
            quoteModal?.classList.remove('active');
            document.body.style.overflow = ''; // Restore background scrolling
        });
    });

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === catalogueModal) {
            catalogueModal.classList.remove('active');
            document.body.style.overflow = '';
        }
        if (e.target === quoteModal) {
            quoteModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
