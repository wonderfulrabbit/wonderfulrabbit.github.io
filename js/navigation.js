export function initializeNavigation() {
    const navButtons = document.querySelectorAll('nav button');
    const sections = document.querySelectorAll('.section');
    
    navButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons and sections
        navButtons.forEach(btn => btn.classList.remove('active-btn'));
        sections.forEach(section => section.classList.remove('active'));
        
        // Add active class to clicked button and corresponding section
        button.classList.add('active-btn');
        const sectionId = button.id.replace('btn-', 'section-');
        document.getElementById(sectionId).classList.add('active');
      });
    });
}
