// Terminal Portfolio Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation links - allow normal link behavior for separate pages
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        // Only prevent default for same-page anchors, not for separate pages
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // If it's a same-page anchor (starts with #), prevent default and scroll
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            // For separate pages (.html files), allow normal navigation
        });
    });

    // Add typing effect to command lines
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.classList.add('cursor');
            }
        }
        type();
    }

    // Initialize typing effects for command lines
    const commandLines = document.querySelectorAll('.command-line');
    commandLines.forEach((line, index) => {
        const command = line.querySelector('.command');
        if (command) {
            const originalText = command.textContent;
            command.textContent = '';
            
            setTimeout(() => {
                typeWriter(command, originalText, 30);
            }, index * 200);
        }
    });

    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn-link');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.classList.contains('disabled')) {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }
        });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            const focusableElements = document.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
            const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);
            const nextIndex = (currentIndex + 1) % focusableElements.length;
            focusableElements[nextIndex].focus();
        }
    });

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    const sections = document.querySelectorAll('.section, .featured-project');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add terminal cursor blinking effect
    function addCursorBlink() {
        const prompts = document.querySelectorAll('.prompt');
        prompts.forEach(prompt => {
            if (!prompt.querySelector('.cursor')) {
                const cursor = document.createElement('span');
                cursor.classList.add('cursor');
                cursor.textContent = '_';
                prompt.appendChild(cursor);
            }
        });
    }

    // Initialize cursor blinking
    setTimeout(addCursorBlink, 1000);

    // Add ASCII art animation
    function animateASCII() {
        const asciiArt = document.querySelector('.ascii-art pre');
        if (asciiArt) {
            const originalText = asciiArt.textContent;
            asciiArt.textContent = '';
            
            let i = 0;
            function typeASCII() {
                if (i < originalText.length) {
                    asciiArt.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeASCII, 20);
                }
            }
            typeASCII();
        }
    }

    // Initialize ASCII animation
    setTimeout(animateASCII, 500);

    // Add glow effect on hover for skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.5)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });

    // Add terminal-like command history (for fun)
    const terminalCommands = [
        'ls -la',
        'cat about.txt',
        'ls -la projects/',
        'cat projects.md',
        'cat experience.txt',
        'cat blog.md',
        'cat contact.txt',
        'echo "Available"'
    ];

    let commandIndex = 0;
    
    // Simulate command execution with delays
    function executeCommands() {
        const commandElements = document.querySelectorAll('.command');
        commandElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.color = '#00ff00';
                setTimeout(() => {
                    element.style.color = '#ffffff';
                }, 200);
            }, index * 300);
        });
    }

    // Execute commands with delay
    setTimeout(executeCommands, 1000);

    // Add mobile menu toggle (if needed)
    function createMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        if (window.innerWidth <= 768) {
            navLinks.style.display = 'none';
            
            const menuButton = document.createElement('button');
            menuButton.innerHTML = '☰';
            menuButton.style.cssText = `
                background: none;
                border: 1px solid #00ff00;
                color: #00ff00;
                padding: 10px;
                cursor: pointer;
                font-size: 18px;
                margin: 10px 0;
            `;
            
            menuButton.addEventListener('click', function() {
                navLinks.style.display = navLinks.style.display === 'none' ? 'flex' : 'none';
            });
            
            navLinks.parentNode.insertBefore(menuButton, navLinks);
        }
    }

    // Initialize mobile menu
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);

    // Add particle effect background (optional)
    function createParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        
        document.body.appendChild(particleContainer);
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 1px;
                height: 1px;
                background: #00ff00;
                opacity: 0.3;
                animation: float ${Math.random() * 10 + 10}s linear infinite;
            `;
            
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            
            particleContainer.appendChild(particle);
        }
    }

    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 0.3; }
            90% { opacity: 0.3; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize particles
    createParticles();

    // Add console-like welcome message
    console.log('%cWelcome to Saaz Bhargava\'s Portfolio!', 'color: #00ff00; font-size: 16px; font-weight: bold;');
    console.log('%cBuilt with HTML, CSS, and JavaScript', 'color: #888; font-size: 12px;');
    console.log('%cFeel free to explore the code!', 'color: #00ff00; font-size: 12px;');
});

// Add some terminal-like functionality
function simulateTerminal() {
    const terminal = document.querySelector('.terminal');
    if (terminal) {
        terminal.addEventListener('click', function() {
            this.style.boxShadow = '0 0 30px rgba(0, 255, 0, 0.3)';
            setTimeout(() => {
                this.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.1)';
            }, 200);
        });
    }
}

// Initialize terminal simulation
document.addEventListener('DOMContentLoaded', simulateTerminal);
