// menu.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            
            // Change icon when menu is open
            const icon = menuToggle.querySelector('span');
            if (mobileMenu.classList.contains('active')) {
                icon.innerHTML = '✕';
                menuToggle.style.transform = 'rotate(180deg)';
            } else {
                icon.innerHTML = '&#9776;';
                menuToggle.style.transform = 'rotate(0)';
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = document.querySelectorAll('.mobile-nav a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuToggle.querySelector('span').innerHTML = '&#9776;';
                menuToggle.style.transform = 'rotate(0)';
            });
        });
    }
    
    // Menu indicator for desktop
    const menuItems = document.querySelectorAll('.main-nav > li > a');
    const indicator = document.querySelector('.menu-indicator');
    
    function moveIndicator(element) {
        if (!element || !indicator) return;
        
        const left = element.offsetLeft;
        const width = element.offsetWidth;
        
        indicator.style.left = `${left}px`;
        indicator.style.width = `${width}px`;
    }
    
    // Set initial indicator position
    const activeItem = document.querySelector('.main-nav > li > a.active');
    if (activeItem && indicator) {
        moveIndicator(activeItem);
    }
    
    // Move indicator on hover (only if indicator exists)
    if (indicator) {
        menuItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                moveIndicator(this);
            });
            
            item.addEventListener('mouseleave', function() {
                const currentActive = document.querySelector('.main-nav > li > a.active');
                moveIndicator(currentActive);
            });
            
            // Update indicator on click
            item.addEventListener('click', function() {
                menuItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                moveIndicator(this);
            });
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop();
    const allLinks = document.querySelectorAll('a[href]');
    
    allLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === '/' && linkHref === 'index.html')) {
            link.classList.add('active');
            
            // Update indicator position for active link on page load
            if (link.closest('.main-nav > li') && indicator) {
                moveIndicator(link);
            }
        }
    });
    
    // Scroll animations for fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOnScroll = () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };
    
    // Check on load and scroll
    window.addEventListener('load', fadeInOnScroll);
    window.addEventListener('scroll', fadeInOnScroll);
});