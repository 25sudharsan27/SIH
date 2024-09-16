// About Section: Enable Editing and Save Changes
document.getElementById('edit-about').addEventListener('click', function() {
    let aboutText = document.getElementById('about-text');
    let isEditable = aboutText.getAttribute('readonly') === null;

    if (isEditable) {
        aboutText.setAttribute('readonly', true);
        aboutText.style.backgroundColor = '#f9f9f9';
        this.src = 'Images/edit-icon.svg'; // Change icon back to edit
    } else {
        aboutText.removeAttribute('readonly');
        aboutText.style.backgroundColor = '#fff';
        aboutText.focus();
        this.src = 'Images/save-icon.svg'; // Change icon to save
    }
});

// Skills Section: Add New Skills
document.querySelector('.add-skill-btn').addEventListener('click', function() {
    let newSkill = prompt('Enter new skill:');
    if (newSkill) {
        let skillList = document.querySelector('.skills-list');
        let newSkillTag = document.createElement('p');
        newSkillTag.textContent = newSkill;
        newSkillTag.classList.add('skill-item');
        skillList.appendChild(newSkillTag);
    }
});

// Skills Section: Edit Skills (if needed)
document.getElementById('edit-skills').addEventListener('click', function() {
    let isEditable = document.querySelector('.skills-list').contentEditable === "true";

    if (isEditable) {
        document.querySelector('.skills-list').contentEditable = "false";
        this.src = 'Images/edit-icon.svg'; // Change icon back to edit
    } else {
        document.querySelector('.skills-list').contentEditable = "true";
        document.querySelector('.skills-list').focus();
        this.src = 'Images/save-icon.svg'; // Change icon to save
    }
});

// Experience: Add More Experiences Dynamically
document.querySelector('.add-more-experience').addEventListener('click', function() {
    let experienceSection = document.querySelector('.experience-section');
    let newExperienceHTML = `
        <div class="experience-item">
            <img src="Images/new-company-logo.svg" alt="New Company" class="company-logo">
            <div>
                <h4>New Position</h4>
                <p>New Company | New Job Description</p>
            </div>
        </div>
    `;
    experienceSection.insertAdjacentHTML('beforeend', newExperienceHTML);
});

// Projects: Add More Projects Dynamically
document.querySelector('.add-more-projects').addEventListener('click', function() {
    let projectsSection = document.querySelector('.projects-section');
    let newProjectHTML = `
        <div class="project-card">
            <h4>New Project</h4>
            <p>Project description goes here.</p>
        </div>
    `;
    projectsSection.insertAdjacentHTML('beforeend', newProjectHTML);
});
