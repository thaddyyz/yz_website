document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded - initializing scroll lock...');
    
    // DOM Elements
    const imageRevealSection = document.getElementById('image-reveal');
    const images = [
        document.getElementById('image1'),
        document.getElementById('image2'),
        document.getElementById('image3')
    ];
    const navTitle = document.getElementById('nav-title');
    
    // Debug elements
    const debugSection = document.getElementById('debug-section');
    const debugScroll = document.getElementById('debug-scroll');
    const debugImageState = document.getElementById('debug-image-state');
    const debugImage1 = document.getElementById('debug-image1');
    const debugImage2 = document.getElementById('debug-image2');
    const debugImage3 = document.getElementById('debug-image3');
    const debugToggle = document.getElementById('debug-toggle');
    const debugOverlay = document.querySelector('.debug-overlay');
    
    // State
    let currentImageIndex = 0;
    let isTransitioning = false;
    let isScrollLocked = false;
    let scrollTimeout = null;
    let lastScrollPosition = window.scrollY;
    let scrollDirection = 'none';
    let isSnapping = false;
    let hasJustSnapped = false; // Prevent immediate re-snap
    const TRANSITION_DURATION = 800;
    
    // Create scroll lock indicator
    const lockIndicator = document.createElement('div');
    lockIndicator.className = 'scroll-lock-indicator';
    lockIndicator.innerHTML = '<i class="fas fa-mouse-pointer"></i> Scroll to change images';
    document.body.appendChild(lockIndicator);
    
    // Debug panel setup - Start hidden
    let debugVisible = false;
    debugOverlay.classList.add('hidden');
    
    // Toggle debug overlay
    debugToggle.addEventListener('click', function() {
        debugVisible = !debugVisible;
        debugOverlay.classList.toggle('hidden');
        debugToggle.innerHTML = debugVisible ? 
            '<i class="fas fa-code"></i> Hide Debug' : 
            '<i class="fas fa-code"></i> Show Debug';
    });
    
    // Console commands for debug panel
    window.showDebug = function() {
        debugVisible = true;
        debugOverlay.classList.remove('hidden');
        debugToggle.innerHTML = '<i class="fas fa-code"></i> Hide Debug';
        console.log('Debug panel shown. Type hideDebug() to hide.');
    };
    
    window.hideDebug = function() {
        debugVisible = false;
        debugOverlay.classList.add('hidden');
        debugToggle.innerHTML = '<i class="fas fa-code"></i> Show Debug';
        console.log('Debug panel hidden. Type showDebug() to show.');
    };
    
    window.toggleDebug = function() {
        debugToggle.click();
    };
    
    // Console help message
    console.log('%c=== Debug Controls ===', 'color: #64ffda; font-weight: bold;');
    console.log('%cType showDebug() to show debug panel', 'color: #a8b2d1;');
    console.log('%cType hideDebug() to hide debug panel', 'color: #a8b2d1;');
    console.log('%cType toggleDebug() to toggle debug panel', 'color: #a8b2d1;');
    console.log('%cOr click the "Toggle Debug" button in the panel', 'color: #a8b2d1;');
    
    // Initialize images with proper clipping states
    function initImages() {
        console.log('Initializing images...');
        images.forEach((img, index) => {
            // Remove any existing transitions initially
            img.style.transition = 'none';
            
            if (index === 0) {
                // First image fully visible
                img.style.clipPath = 'inset(0% 0% 0% 0%)';
                img.style.opacity = '1';
                img.style.zIndex = '10';
            } else {
                // Other images hidden at bottom
                img.style.clipPath = 'inset(100% 0% 0% 0%)';
                img.style.opacity = '1';
                img.style.zIndex = (9 - index).toString();
            }
        });
        
        // Set transition for animation
        setTimeout(() => {
            images.forEach(img => {
                img.style.transition = 'clip-path 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        }, 100);
    }
    
    // Check if we're close enough to the section to snap to it
    function shouldSnapToSection() {
        if (!imageRevealSection || isSnapping || hasJustSnapped) return false;
        
        const rect = imageRevealSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // If section is partially in view (30-70% range), snap to it
        const sectionTop = rect.top;
        const sectionBottom = rect.bottom;
        const sectionHeight = sectionBottom - sectionTop;
        
        // Check if any significant part of section is in viewport
        const visibleHeight = Math.min(sectionBottom, viewportHeight) - Math.max(sectionTop, 0);
        const visiblePercentage = (visibleHeight / Math.min(sectionHeight, viewportHeight)) * 100;
        
        return visiblePercentage > 30 && visiblePercentage < 100;
    }
    
    // Check if section is fully in viewport (for locking)
    function isSectionFullyInViewport() {
        if (!imageRevealSection) return false;
        
        const rect = imageRevealSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Check if section top is at or near 0 and bottom is at or near viewport height
        return rect.top >= -10 && rect.top <= 10 && 
               rect.bottom >= viewportHeight - 10 && rect.bottom <= viewportHeight + 10;
    }
    
    // Check if we should unlock when scrolling up from first image
    function shouldUnlockForUpScroll() {
        if (!imageRevealSection || !isScrollLocked || currentImageIndex !== 0) return false;
        
        const rect = imageRevealSection.getBoundingClientRect();
        
        // If scrolling up and section is moving out of view (top is positive)
        return scrollDirection === 'up' && rect.top > 50;
    }
    
    // Check if we should unlock when scrolling down from last image
    function shouldUnlockForDownScroll() {
        if (!imageRevealSection || !isScrollLocked || currentImageIndex !== images.length - 1) return false;
        
        const rect = imageRevealSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // If scrolling down and section is moving out of view (bottom is negative)
        return scrollDirection === 'down' && rect.bottom < viewportHeight - 50;
    }
    
    // Force lock to section (snap to it)
    function snapToSection() {
        if (isSnapping) return;
        
        console.log('Snapping to image reveal section...');
        isSnapping = true;
        hasJustSnapped = true;
        
        // Prevent body scroll during snap
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
        document.body.style.width = '100%';
        
        // Calculate exact scroll position to center the section
        const sectionTop = imageRevealSection.offsetTop;
        const headerHeight = 80;
        
        // Scroll to exact position (accounting for header)
        window.scrollTo({
            top: sectionTop - headerHeight,
            behavior: 'smooth'
        });
        
        // Lock scroll after snap
        setTimeout(() => {
            if (!isScrollLocked) {
                lockScroll();
            }
            isSnapping = false;
            
            setTimeout(() => {
                hasJustSnapped = false;
            }, 500);
        }, 300); // Wait for scroll animation
    }
    
    function snapToPreviousSection() {
        if (isSnapping) return;
        
        console.log('Snapping to previous section...');
        isSnapping = true;
        
        unlockScroll();
        
        const prevSection = document.getElementById('section-about');
        if (prevSection) {
            const prevSectionBottom = prevSection.offsetTop + prevSection.offsetHeight;
            const viewportHeight = window.innerHeight;
            
            // Scroll to show bottom of previous section
            window.scrollTo({
                top: prevSectionBottom - viewportHeight + 100, // 100px padding
                behavior: 'smooth'
            });
        }
        
        setTimeout(() => {
            isSnapping = false;
        }, 800);
    }
    
    // Snap to next section (when scrolling down from last image)
    function snapToNextSection() {
        if (isSnapping) return;
        
        console.log('Snapping to next section...');
        isSnapping = true;
        
        unlockScroll();
        
        // Scroll to next section (work section)
        const nextSection = document.getElementById('section-work');
        if (nextSection) {
            const headerHeight = 80;
            
            window.scrollTo({
                top: nextSection.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
        
        setTimeout(() => {
            isSnapping = false;
        }, 800);
    }
    
    // Animate transition: current clips up, next reveals up
    function animateTransitionToNext() {
        if (isTransitioning || currentImageIndex >= images.length - 1) {
            // If on last image, snap to next section
            if (currentImageIndex >= images.length - 1 && !isTransitioning) {
                snapToNextSection();
            }
            return;
        }
        
        console.log(`Animating: Image ${currentImageIndex + 1} → Image ${currentImageIndex + 2}`);
        isTransitioning = true;
        
        const currentImg = images[currentImageIndex];
        const nextImg = images[currentImageIndex + 1];
        const oldIndex = currentImageIndex;
        const newIndex = currentImageIndex + 1;
        
        // Set z-index for proper stacking
        currentImg.style.zIndex = '10';
        nextImg.style.zIndex = '11'; // Next image on top during transition
        
        // Ensure next image starts from bottom
        nextImg.style.clipPath = 'inset(100% 0% 0% 0%)';
        
        // Small delay to ensure styles are applied
        setTimeout(() => {
            // Animate: current clips out from bottom, next reveals from bottom
            currentImg.style.clipPath = 'inset(0% 0% 100% 0%)'; // Clip up out of view
            nextImg.style.clipPath = 'inset(0% 0% 0% 0%)'; // Reveal fully
            
            // Update nav title
            const labels = ['Experiences', 'Details', 'Tech Stack'];
            navTitle.textContent = labels[newIndex];
            
            // Update debug
            debugImageState.textContent = `Transition: ${oldIndex + 1} → ${newIndex + 1}`;
            debugImage1.textContent = oldIndex === 0 ? 'Clipping up' : (newIndex === 0 ? 'Revealing' : 'Hidden');
            debugImage2.textContent = oldIndex === 1 ? 'Clipping up' : (newIndex === 1 ? 'Revealing' : 'Hidden');
            debugImage3.textContent = oldIndex === 2 ? 'Clipping up' : (newIndex === 2 ? 'Revealing' : 'Hidden');
        }, 10);
        
        // Complete transition
        setTimeout(() => {
            currentImageIndex = newIndex;
            
            // Reset z-index
            images.forEach((img, i) => {
                img.style.zIndex = i === currentImageIndex ? '10' : (9 - i).toString();
            });
            
            isTransitioning = false;
            console.log(`Animation complete. Current image: ${currentImageIndex + 1}`);
            
            // If now on last image, show unlock hint
            if (currentImageIndex === images.length - 1) {
                lockIndicator.innerHTML = '<i class="fas fa-arrow-down"></i> Scroll to continue';
            } else {
                lockIndicator.innerHTML = '<i class="fas fa-mouse-pointer"></i> Scroll to change images';
            }
        }, TRANSITION_DURATION);
    }
    
    function animateTransitionToPrevious() {
        if (isTransitioning || currentImageIndex <= 0) {
            // If on first image and scrolling up, snap to previous section
            if (currentImageIndex <= 0 && !isTransitioning && scrollDirection === 'up') {
                snapToPreviousSection();
            }
            return;
        }
        
        console.log(`Animating: Image ${currentImageIndex + 1} → Image ${currentImageIndex}`);
        isTransitioning = true;
        
        const currentImg = images[currentImageIndex];
        const prevImg = images[currentImageIndex - 1];
        const oldIndex = currentImageIndex;
        const newIndex = currentImageIndex - 1;
        
        // Set z-index for proper stacking
        currentImg.style.zIndex = '10';
        prevImg.style.zIndex = '11'; // Previous image on top during transition
        
        // Ensure previous image starts from top (hidden)
        prevImg.style.clipPath = 'inset(100% 0% 0% 0%)';
        
        // Small delay to ensure styles are applied
        setTimeout(() => {
            currentImg.style.clipPath = 'inset(100% 0% 0% 0%)'; // Clip down out of view
            prevImg.style.clipPath = 'inset(0% 0% 0% 0%)'; // Reveal fully
            
            // Update nav title
            const labels = ['Experiences', 'Details', 'Tech Stack'];
            navTitle.textContent = labels[newIndex];
            
            // Update debug
            debugImageState.textContent = `Transition: ${oldIndex + 1} → ${newIndex + 1}`;
            debugImage1.textContent = oldIndex === 0 ? 'Clipping down' : (newIndex === 0 ? 'Revealing' : 'Hidden');
            debugImage2.textContent = oldIndex === 1 ? 'Clipping down' : (newIndex === 1 ? 'Revealing' : 'Hidden');
            debugImage3.textContent = oldIndex === 2 ? 'Clipping down' : (newIndex === 2 ? 'Revealing' : 'Hidden');
        }, 10);
        
        // Complete transition
        setTimeout(() => {
            currentImageIndex = newIndex;
            
            // Reset z-index
            images.forEach((img, i) => {
                img.style.zIndex = i === currentImageIndex ? '10' : (9 - i).toString();
            });
            
            isTransitioning = false;
            console.log(`Animation complete. Current image: ${currentImageIndex + 1}`);
            
            // If now on first image, show unlock hint for scrolling up
            if (currentImageIndex === 0) {
                lockIndicator.innerHTML = '<i class="fas fa-arrow-up"></i> Scroll to go back';
            } else {
                lockIndicator.innerHTML = '<i class="fas fa-mouse-pointer"></i> Scroll to change images';
            }
        }, TRANSITION_DURATION);
    }
    
    // Show image immediately (no animation)
    function showImageImmediately(index) {
        if (index < 0 || index >= images.length) return;
        
        console.log(`Showing image ${index + 1} immediately`);
        currentImageIndex = index;
        
        images.forEach((img, i) => {
            img.style.transition = 'none';
            if (i === index) {
                img.style.clipPath = 'inset(0% 0% 0% 0%)';
                img.style.zIndex = '10';
            } else {
                img.style.clipPath = 'inset(100% 0% 0% 0%)';
                img.style.zIndex = (9 - i).toString();
            }
        });
        
        // Update nav title
        const labels = ['Experiences', 'Details', 'Tech Stack'];
        navTitle.textContent = labels[index];
        
        // Restore transitions after a moment
        setTimeout(() => {
            images.forEach(img => {
                img.style.transition = 'clip-path 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        }, 50);
        
        // Update debug
        debugImageState.textContent = `Image ${index + 1} visible`;
        debugImage1.textContent = index === 0 ? 'Visible' : 'Hidden';
        debugImage2.textContent = index === 1 ? 'Visible' : 'Hidden';
        debugImage3.textContent = index === 2 ? 'Visible' : 'Hidden';
    }
    
    // Lock scroll to section
    function lockScroll() {
        if (isScrollLocked) return;
        
        console.log('🔒 Locking scroll to image section');
        isScrollLocked = true;
        lockIndicator.classList.add('visible');
        
        // Show first image if not already showing
        if (currentImageIndex !== 0) {
            showImageImmediately(0);
        }
        
        // Update lock indicator based on current image
        if (currentImageIndex === 0) {
            lockIndicator.innerHTML = '<i class="fas fa-arrow-up"></i> Scroll to go back';
        } else if (currentImageIndex === images.length - 1) {
            lockIndicator.innerHTML = '<i class="fas fa-arrow-down"></i> Scroll to continue';
        } else {
            lockIndicator.innerHTML = '<i class="fas fa-mouse-pointer"></i> Scroll to change images';
        }
        
        // Add scroll lock to body
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
        document.body.style.width = '100%';
        
        debugImageState.textContent = 'Scroll locked - Image 1 visible';
    }
    
    // Unlock scroll
    function unlockScroll() {
        if (!isScrollLocked) return;
        
        console.log('🔓 Unlocking scroll');
        isScrollLocked = false;
        lockIndicator.classList.remove('visible');
        
        // Restore scroll
        document.body.style.overflow = '';
        document.body.style.height = '';
        document.body.style.width = '';
        
        debugImageState.textContent = 'Scroll unlocked';
    }
    
    // Handle wheel events for image transitions
    function handleWheel(e) {
        if (!isScrollLocked || isTransitioning) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        if (e.deltaY > 0) {
            // Scrolling down - next image
            animateTransitionToNext();
        } else if (e.deltaY < 0) {
            // Scrolling up - previous image
            animateTransitionToPrevious();
        }
    }
    
    function updateScrollDirection(currentScroll) {
        const delta = currentScroll - lastScrollPosition;
        
        if (delta > 0) {
            scrollDirection = 'down';
        } else if (delta < 0) {
            scrollDirection = 'up';
        }
        
        lastScrollPosition = currentScroll;
    }
    
    // Handle touch events for mobile
    let touchStartY = 0;
    let touchStartTime = 0;
    
    function handleTouchStart(e) {
        if (!isScrollLocked || isTransitioning) return;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
    }
    
    function handleTouchEnd(e) {
        if (!isScrollLocked || isTransitioning) return;
        
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY - touchEndY;
        const deltaTime = Date.now() - touchStartTime;
        
        // Only trigger on significant swipe (min 50px) and quick enough (max 500ms)
        if (Math.abs(deltaY) > 50 && deltaTime < 500) {
            if (deltaY > 0) {
                // Swipe down - next image
                animateTransitionToNext();
            } else {
                // Swipe up - previous image
                animateTransitionToPrevious();
            }
        }
    }
    
    // Update header and debug info
    function updateScrollInfo() {
        const scrollY = window.scrollY || window.pageYOffset;
        const sections = [
            { id: 'section-hero', name: 'Welcome' },
            { id: 'section-about', name: 'About Me' },
            { id: 'image-reveal', name: 'Image Reveal' },
            { id: 'section-work', name: 'Work Experience' },
            { id: 'section-education', name: 'Education' },
            { id: 'section-projects', name: 'Projects' },
            { id: 'section-military', name: 'Military' },
            { id: 'section-hobbies', name: 'Hobbies' },
            { id: 'section-contact', name: 'Contact' }
        ];
        
        // Find current section
        let currentSectionName = 'Unknown';
        for (const section of sections) {
            const el = document.getElementById(section.id);
            if (el) {
                const elTop = el.offsetTop;
                const elBottom = elTop + el.offsetHeight;
                
                if (scrollY >= elTop - 100 && scrollY < elBottom - 100) {
                    currentSectionName = section.name;
                    break;
                }
            }
        }
        
        // Update debug
        debugSection.textContent = currentSectionName;
        debugScroll.textContent = `${Math.round(scrollY)}px (${scrollDirection})`;
        
        // Only update nav title if NOT in image section OR if scroll is unlocked
        if (currentSectionName !== 'Image Reveal' || !isScrollLocked) {
            // Use section name for other sections
            navTitle.textContent = currentSectionName;
        }
    }
    
    // Main scroll handler
    function handleScroll() {
        const currentScroll = window.scrollY || window.pageYOffset;
        
        // Update scroll direction
        updateScrollDirection(currentScroll);
        
        // Update debug
        updateScrollInfo();
        
        // Check if we should snap to section
        const shouldSnap = shouldSnapToSection();
        const isFullyInView = isSectionFullyInViewport();
        
        // Check if we should unlock
        const shouldUnlockUp = shouldUnlockForUpScroll();
        const shouldUnlockDown = shouldUnlockForDownScroll();
        
        // Handle snapping to section
        if (shouldSnap && !isScrollLocked && !isSnapping) {
            console.log('Should snap to section, triggering...');
            setTimeout(snapToSection, 50);
        }
        
        // Handle locking when section is fully in view
        if (isFullyInView && !isScrollLocked && !isSnapping) {
            lockScroll();
        }
        
        // Handle unlocking
        if ((shouldUnlockUp || shouldUnlockDown) && isScrollLocked && !isSnapping) {
            unlockScroll();
            
            // Snap to appropriate section
            if (shouldUnlockUp) {
                setTimeout(snapToPreviousSection, 100);
            } else if (shouldUnlockDown) {
                setTimeout(snapToNextSection, 100);
            }
        }
    }
    
    // Initialize everything
    function init() {
        console.log('Initializing scroll lock system...');
        
        // Initialize images
        initImages();
        
        // Add event listeners
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('wheel', handleWheel, { passive: false });
        
        // Touch events for mobile
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        // Initial check
        setTimeout(() => {
            handleScroll();
            updateScrollInfo();
            
            // If already in section on load, lock it
            if (isSectionFullyInViewport()) {
                lockScroll();
            }
        }, 500);
        
        console.log('Initialization complete');
    }
    
    // Start when page loads
    window.addEventListener('load', init);
});