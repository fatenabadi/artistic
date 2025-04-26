
// Initialize modals
const coverPhotoModal = new bootstrap.Modal(document.getElementById('coverPhotoModal'));
const profilePictureModal = new bootstrap.Modal(document.getElementById('profilePictureModal'));
const successModal = new bootstrap.Modal(document.getElementById('successModal'));

// Current step tracking
let currentStep = 1;
let selectedAvatar = null;
const formSteps = document.querySelectorAll('.form-step');
const stepProgress = document.querySelector('.step-progress');
const steps = document.querySelectorAll('.step');

// Function to show a specific step
function showStep(stepNumber) {
    formSteps.forEach(step => step.classList.remove('active'));
    steps.forEach(step => step.classList.remove('active'));
    steps.forEach((step, index) => {
        if (index < stepNumber) {
            step.classList.add('completed');
        }
    });

    document.getElementById(step-${stepNumber}).classList.add('active');
    document.querySelector(.step[data-step="${stepNumber}"]).classList.add('active');
    stepProgress.style.setProperty('--progress', stepNumber - 1);
    currentStep = stepNumber;
}

// Form navigation functions
function nextStep(step) {
    if (validateStep(step)) {
        showStep(step + 1);
    }
}

function prevStep(step) {
    showStep(step - 1);
}

function validateStep(step) {
    let isValid = true;

    if (step === 1) {
        const displayNameInput = document.getElementById('displayName');
        const emailInput = document.getElementById('email');

        if (!displayNameInput.value.trim()) {
            alert('Please enter your name');
            isValid = false;
            displayNameInput.classList.add('is-invalid');
        } else {
            displayNameInput.classList.remove('is-invalid');
        }

        if (!emailInput.value.trim()) {
            alert('Please enter your email');
            isValid = false;
            emailInput.classList.add('is-invalid');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
            alert('Please enter a valid email address');
            isValid = false;
            emailInput.classList.add('is-invalid');
        } else {
            emailInput.classList.remove('is-invalid');
        }
    } else if (step === 2) {
        const artStyleSelect = document.getElementById('artStyle');
        if (!artStyleSelect.value) {
            alert('Please select your favorite art style');
            isValid = false;
            artStyleSelect.classList.add('is-invalid');
        } else {
            artStyleSelect.classList.remove('is-invalid');
        }
    }

    return isValid;
}

function updateReviewFields() {
    document.getElementById('review-name').textContent = document.getElementById('displayName').value || '-';
    document.getElementById('review-email').textContent = document.getElementById('email').value || '-';
    document.getElementById('review-location').textContent = document.getElementById('location').value || '-';
    document.getElementById('review-style').textContent = document.getElementById('artStyle').value || '-';
    document.getElementById('review-artists').textContent = document.getElementById('favoriteArtists').value || '-';
    document.getElementById('review-mediums').textContent = document.getElementById('preferredMediums').value || '-';
}

function submitProfile() {
    if (!document.getElementById('termsAgreement').checked) {
        alert('Please agree to the community guidelines');
        return;
    }

    updateReviewFields(); // Ensure review fields are up-to-date before showing success
    successModal.show();
    // In a real application, you would submit the form data here.
    console.log("Form submitted!");
    console.log("Name:", document.getElementById('displayName').value);
    console.log("Email:", document.getElementById('email').value);
    console.log("Location:", document.getElementById('location').value);
    console.log("Favorite Art Style:", document.getElementById('artStyle').value);
    console.log("Favorite Artists:", document.getElementById('favoriteArtists').value);
    console.log("Preferred Mediums:", document.getElementById('preferredMediums').value);
    console.log("Terms Agreed:", document.getElementById('termsAgreement').checked);
}

// Initial setup: show only the first step
showStep(1);

// Event listeners for non-form related elements
document.getElementById('editCoverBtn').addEventListener('click', () => coverPhotoModal.show());
document.getElementById('profilePicture').addEventListener('click', () => profilePictureModal.show());
document.getElementById('editUsernameBtn').addEventListener('click', () => {
    const usernameText = document.getElementById('usernameText');
    const usernameInput = document.getElementById('usernameInput');

    usernameText.style.display = 'none';
    usernameInput.style.display = 'block';
    usernameInput.value = usernameText.textContent;
    usernameInput.focus();

    usernameInput.addEventListener('blur', function() {
        if (this.value.trim()) {
            usernameText.textContent = this.value;
        }
        this.style.display = 'none';
        usernameText.style.display = 'inline';
    });

    usernameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            this.blur();
        }
    });
});

document.getElementById('userBio').addEventListener('click', () => {
    const bioText = document.getElementById('userBio');
    const bioInput = document.getElementById('bioInput');

    bioText.style.display = 'none';
    bioInput.style.display = 'block';
    bioInput.value = bioText.textContent === 'Click to add your bio...' ? '' : bioText.textContent;
    bioInput.focus();

    bioInput.addEventListener('blur', function() {
        if (this.value.trim()) {
            bioText.textContent = this.value;
            bioText.classList.remove('empty');
        } else {
            bioText.textContent = 'Click to add your bio...';
            bioText.classList.add('empty');
        }
        this.style.display = 'none';
        bioText.style.display = 'block';
    });
});

// Cover photo functions
function selectCoverImage(src) {
    document.getElementById('coverPhoto').style.backgroundImage = url(${src});
}

function saveCoverPhoto() {
    const fileInput = document.getElementById('coverPhotoUpload');
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('coverPhoto').style.backgroundImage = url(${e.target.result});
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
    coverPhotoModal.hide();
}

// Profile picture functions
function selectAvatar(type) {
    const avatar = document.getElementById('profilePicture');
    selectedAvatar = type;

    Array.from(avatar.classList).forEach(className => {
        if (className.startsWith('fa-')) {
            avatar.classList.remove(className);
        }
    });

    switch(type) {
        case '1': avatar.classList.add('fa-user-secret'); break;
        case '2': avatar.classList.add('fa-user-astronaut'); break;
        case '3': avatar.classList.add('fa-user-ninja'); break;
        case '4': avatar.classList.add('fa-user-tie'); break;
        case '5': avatar.classList.add('fa-user-graduate'); break;
        case '6': avatar.classList.add('fa-user-md'); break;
        default: avatar.classList.add('fa-user');
    }
}

function saveProfilePicture() {
    const fileInput = document.getElementById('profilePictureUpload');
    const avatar = document.getElementById('profilePicture');

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            avatar.innerHTML = '';
            avatar.style.backgroundImage = url(${e.target.result});
            avatar.style.backgroundSize = 'cover';
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else if (selectedAvatar) {
        avatar.style.backgroundImage = 'none';
    }

    profilePictureModal.hide();
}

// Favorite works functions
function addSampleWork() {
    const worksGrid = document.getElementById('worksGrid');
    worksGrid.innerHTML = '';

    const sampleWorks = [
        {
            image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            title: 'Starry Night',
            artist: 'Vincent van Gogh'
        },
        {
            image: 'https://images.unsplash.com/photo-1531147646552-1eec68116469?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            title: 'The Persistence of Memory',
            artist: 'Salvador Dalí'
        },
        {
            image: 'https://images.unsplash.com/photo-1617854818583-09e7f077a156?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG0dG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            title: 'The Scream',
            artist: 'Edvard Munch'
        }
    ];

    sampleWorks.forEach(work => {
        const workItem = document.createElement('div');
        workItem.className = 'work-item';

        workItem.innerHTML = `
            <img src="${work.image}" class="work-image">
            <div class="work-overlay">
                <div class="work-title">${work.title}</div>
                <div class="work-artist">${work.artist}</div>
            </div>
        `;

        worksGrid.appendChild(workItem);
    });
}