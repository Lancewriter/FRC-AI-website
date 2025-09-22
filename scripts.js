/* ========================================
   FRAICLY - Financial Risk Consultants AI
   JavaScript Functionality
   ======================================== */

// ========================================
// DOM CONTENT LOADED EVENT LISTENER
// ========================================
document.addEventListener("DOMContentLoaded", () => {
    initializeTabs();
    initializeChatbot();
    initializeMobileMenu();
    initializeDropdowns();
    initializeSmoothScrolling();
    initializeContactModal();
});

// ========================================
// TAB FUNCTIONALITY
// ========================================
function initializeTabs() {
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            const tabId = button.getAttribute("data-tab");
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            // Add active class to the clicked button and corresponding content
            button.classList.add("active");
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add("active");
            }
        });
    });
}

// ========================================
// SCROLL FUNCTIONALITY
// ========================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerOffset = 100;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

function scrollToTab(tabId) {
    if (event) event.preventDefault();
    const tabContainer = document.querySelector(".tab-content");
    const targetTabButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
    const targetTabContent = document.getElementById(tabId);

    if (tabContainer && targetTabButton && targetTabContent) {
        // Activate the target tab
        document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(content => content.classList.remove("active"));

        targetTabButton.classList.add("active");
        targetTabContent.classList.add("active");

        // Scroll to the tab container
        const headerOffset = 100;
        const elementPosition = tabContainer.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

function Menu_scrollToSection(sectionId) {
    if (event) event.preventDefault();

    const section = document.getElementById(sectionId);
    if (section) {
        const headerOffset = 100;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    } else {
        console.error(`Section with ID "${sectionId}" not found.`);
    }
}

// Enhanced smooth scrolling for all anchor links
function initializeSmoothScrolling() {
    // Handle all anchor links with smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// DROPDOWN MENU FUNCTIONALITY
// ========================================
function initializeDropdowns() {
    // Sectors menu
    function toggleSectorsMenu() {
        const menuItem = document.querySelector(".menu-item");
        if (menuItem) {
            menuItem.classList.toggle("active");
        }
    }

    // Services menu
    function toggleServicesMenu() {
        const menuItem = document.querySelector(".menu-item_services");
        if (menuItem) {
            menuItem.classList.toggle("active");
        }
    }

    // Close dropdowns when clicking outside
    document.addEventListener("click", (event) => {
        const menuItem = document.querySelector(".menu-item");
        const servicesMenuItem = document.querySelector(".menu-item_services");
        
        if (menuItem && !event.target.closest(".menu-item") && !event.target.closest("a[href='#']")) {
            menuItem.classList.remove("active");
        }
        
        if (servicesMenuItem && !event.target.closest(".menu-item_services") && !event.target.closest("a[href='#']")) {
            servicesMenuItem.classList.remove("active");
        }
    });

    // Make functions globally available
    window.toggleSectorsMenu = toggleSectorsMenu;
    window.toggleServicesMenu = toggleServicesMenu;
}

function closeDropdown(element) {
    const dropdown = element.closest(".dropdown");
    if (dropdown) {
        dropdown.style.display = "none";
        setTimeout(() => {
            dropdown.style.display = "";
        }, 100);
    }
}

// ========================================
// MOBILE MENU FUNCTIONALITY
// ========================================
function initializeMobileMenu() {
    // Mobile menu toggle
    function Mobile_toggleMenu() {
        const menu = document.getElementById("mobile-menu");
        if (menu) {
            menu.classList.toggle("hidden");
            const expanded = !menu.classList.contains("hidden");
            menu.setAttribute("aria-expanded", expanded);
            
            // Add animation class for smooth transition
            if (expanded) {
                menu.style.display = "block";
                setTimeout(() => {
                    menu.classList.add("open");
                }, 10);
            } else {
                menu.classList.remove("open");
                setTimeout(() => {
                    if (menu.classList.contains("hidden")) {
                        menu.style.display = "none";
                    }
                }, 300);
            }
        }
    }

    // Close mobile menu when clicking outside
    document.addEventListener("click", (event) => {
        const menu = document.getElementById("mobile-menu");
        const toggleButton = document.querySelector(".menu-toggle");

        if (menu && 
            !menu.classList.contains("hidden") && 
            !event.target.closest("#mobile-menu") && 
            !event.target.closest(".menu-toggle")) {
            menu.classList.add("hidden");
            menu.classList.remove("open");
            menu.setAttribute("aria-expanded", false);
            setTimeout(() => {
                menu.style.display = "none";
            }, 300);
        }
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll("#mobile-menu a").forEach(link => {
        link.addEventListener("click", () => {
            const menu = document.getElementById("mobile-menu");
            if (menu) {
                menu.classList.add("hidden");
                menu.classList.remove("open");
                menu.setAttribute("aria-expanded", false);
                setTimeout(() => {
                    menu.style.display = "none";
                }, 300);
            }
        });
    });

    // Make function globally available
    window.Mobile_toggleMenu = Mobile_toggleMenu;
}

// ========================================
// CHATBOT FUNCTIONALITY
// ========================================
function initializeChatbot() {
    const chatbotButton = document.querySelector(".chatbot-button");
    const chatbotBody = document.querySelector(".chatbot-body");
    const chatMessages = document.getElementById("chat-messages");
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("chat-send-btn");

    if (!chatbotButton || !chatbotBody || !chatMessages || !chatInput || !sendBtn) {
        console.warn("Chatbot elements not found");
        return;
    }

    // Keywords and responses
    const keywordResponses = [
        { keywords: ["hello", "hi", "hey"], response: "Hello! How can I assist you today?" },
        { keywords: ["automation", "automate"], response: "SMEs need to leverage AI to remain competitive, contact us to discuss how we can help you automate routine tasks." },
        { keywords: ["ai", "artificial", "machine learning"], response: "SMEs need to leverage AI to remain competitive, contact us to discuss preparing your business for AI future." },
        { keywords: ["finance", "financial"], response: "We can assist with financial analysis, risk management, or finance projects like M&A." },
        { keywords: ["projects", "m&a", "exit"], response: "Our M&A experts will help you value your target, identify synergies and prepare prospectus for financing or potential buyers." },
        { keywords: ["recovery", "turnaround", "resilience"], response: "We package our skills and services to help SMEs recover from financial weakness." },
        { keywords: ["economic", "economy"], response: "We can assist with economic analysis and forecasts to facilitate strategy formations and update." },
        { keywords: ["acquisition", "M&A"], response: "We can help you determine the fair value of acquisition targets, and identify synergies." },
        { keywords: ["pricing", "price", "cost"], response: "Lets have a discussion on how our interactions best fit your needs, sometimes the best fit is on a project basis or as a trusted partner." },
        { keywords: ["bye", "goodbye"], response: "Goodbye! Have a great day!" },
        { keywords: ["help", "support"], response: "I'm here to help! Please tell me what you need assistance with." },
        { keywords: ["trump", "maga"], response: "The current US economic policies are expected to increase the cost of living and reduce the velocity of money, which is likely to slow economic growth. US poor economic performances reverberate globally. Let us collaborate to fortify your business." },
        { keywords: ["united kingdom", "uk"], response: "The UK's economy is experiencing a slow growth period, which is likely to slow further given the expected weakness of the US economy. Email us to start a discussion on how FRAICLY can help your business thrive in this recessionary environment" },
        { keywords: ["default"], response: "I'm not sure I understand. Can you rephrase?" }
    ];

    // Function to match keywords in user input
    const getBotResponse = (userText) => {
        const cleanedText = userText.toLowerCase().replace(/[^\w\s]/gi, "");
        for (const { keywords, response } of keywordResponses) {
            if (keywords.some(keyword => cleanedText.includes(keyword))) {
                return response;
            }
        }
        return keywordResponses.find(k => k.keywords.includes("default")).response;
    };

    // Function to display a message in the chat
    const displayMessage = (message, sender) => {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender);
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // Send message function
    const sendMessage = () => {
        const userText = chatInput.value.trim();
        if (!userText) return;

        displayMessage(userText, "user");
        const botReply = getBotResponse(userText);
        setTimeout(() => displayMessage(botReply, "bot"), 500);
        chatInput.value = "";
    };

    // Event listeners
    sendBtn.addEventListener("click", sendMessage);
    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    // Trigger a welcome message when the chatbot is opened
    const sendWelcomeMessage = () => {
        if (!chatbotBody.classList.contains("opened")) {
            chatbotBody.classList.add("opened");
            setTimeout(() => displayMessage("Welcome to FRAICLY! I am a chatbot! Let me know the service you're interested in and I will assist you.", "bot"), 300);
        }
    };

    // Toggle chatbot visibility and trigger welcome message
    chatbotButton.addEventListener("click", () => {
        const isChatVisible = chatbotBody.style.display === "flex";
        chatbotBody.style.display = isChatVisible ? "none" : "flex";
        if (!isChatVisible) sendWelcomeMessage();
    });

    // Close chatbot when clicking close button
    const closeBtn = document.querySelector(".chatbot-close-btn");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            chatbotBody.style.display = "none";
        });
    }
}


// ========================================
// UTILITY FUNCTIONS
// ========================================
function toggleMenu() {
    const menu = document.getElementById("menu-item");
    if (menu) {
        menu.classList.toggle("hidden");
        menu.classList.toggle("open");
    }
}

// (Removed duplicate smooth scrolling; handled by initializeSmoothScrolling)

// ========================================
// SCROLL TO TOP FUNCTIONALITY
// ========================================
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scroll-to-top button if needed
    if (scrollTop > 300) {
        // Could add a scroll-to-top button here
    }
});

// ========================================
// FORM VALIDATION (if forms are added)
// ========================================
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// ========================================
// LAZY LOADING FOR IMAGES (if needed)
// ========================================
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// ========================================
// ERROR HANDLING
// ========================================
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// ========================================
// EXPORT FUNCTIONS FOR GLOBAL USE
// ========================================
window.scrollToSection = scrollToSection;
window.scrollToTab = scrollToTab;
window.Menu_scrollToSection = Menu_scrollToSection;
window.closeDropdown = closeDropdown;
window.toggleMenu = toggleMenu;

// ========================================
// CONTACT MODAL: OPEN/CLOSE HANDLERS
// ========================================
function initializeContactModal() {
    const openBtn = document.getElementById("get-in-touch");
    const modal = document.getElementById("strategyModal");
    if (!modal || !openBtn) return;

    const closeBtn = modal.querySelector(".close");
    const firstFocusable = modal.querySelector("input, select, button, [href], textarea");

    function openModal(e) {
        if (e) e.preventDefault();
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        setTimeout(() => firstFocusable && firstFocusable.focus(), 10);
    }

    function closeModal() {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        openBtn.focus();
    }

    // Click handlers
    openBtn.addEventListener("click", openModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    // Click outside content closes
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    // ESC to close
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
    });
}
