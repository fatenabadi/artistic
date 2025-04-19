document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('artworkForm');
    const colorOptions = document.querySelectorAll('.color-option');

    // Initial color selection (select the first one by default)
    if (colorOptions.length > 0) {
        colorOptions[0].classList.add('selected');
    }

    // Color selection functionality
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const currentSelected = document.querySelector('.color-option.selected');
            if (currentSelected) {
                currentSelected.classList.remove('selected');
            }
            this.classList.add('selected');
            const colorNotesInput = document.getElementById('colorNotes');
            if (colorNotesInput) {
                colorNotesInput.value = window.getComputedStyle(this).backgroundColor;
            }
        });
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (form.checkValidity()) {
            // Collect form data
            const formData = {
                personalInfo: {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    location: document.getElementById('location').value
                },
                artworkDetails: {
                    medium: document.getElementById('artType').value,
                    style: document.getElementById('artStyle').value,
                    colorScheme: document.querySelector('.color-option.selected') ? window.getComputedStyle(document.querySelector('.color-option.selected')).backgroundColor : '',
                    colorNotes: document.getElementById('colorNotes').value,
                    dimensions: {
                        width: document.getElementById('width') ? document.getElementById('width').value : '',
                        height: document.getElementById('height') ? document.getElementById('height').value : '',
                        orientation: document.getElementById('orientation') ? document.getElementById('orientation').value : ''
                    },
                    description: document.getElementById('artDescription').value,
                    referenceImages: document.getElementById('referenceUpload').files.length,
                    timeline: document.getElementById('timeline').value,
                    budget: document.getElementById('budget').value,
                    specialRequests: document.getElementById('specialRequests').value,
                    specialTechniques: {
                        texture: document.getElementById('texture') ? document.getElementById('texture').checked : false,
                        metallic: document.getElementById('metallic') ? document.getElementById('metallic').checked : false,
                        glow: document.getElementById('glow') ? document.getElementById('glow').checked : false
                    }
                }
            };

            console.log('Artwork request submitted:', formData);

            // Show success message
            alert('Thank you for your artwork request! Our studio will contact you within 48 hours to discuss your vision.');
            form.reset();
            if (colorOptions.length > 0) {
                colorOptions[0].click(); // Reset color selection by triggering a click on the first option
                const colorNotesInput = document.getElementById('colorNotes');
                if (colorNotesInput) {
                    colorNotesInput.value = window.getComputedStyle(colorOptions[0]).backgroundColor;
                }
            }
        } else {
            // Show validation errors
            alert('Please fill in all required fields.');
        }
    });
    // Creative sentence on page load
    window.addEventListener('load', function() {
        const creativeSentences = [
            "Let your imagination take brushstrokes across the canvas of possibility.",
            "Every color holds a story waiting to be painted.",
            "Where vision meets the artisan's hand, a masterpiece begins.",
            "Unleash the hues of your dreams into tangible form.",
            "The journey of a thousand artworks begins with a single request."
        ];
        const randomIndex = Math.floor(Math.random() * creativeSentences.length);
        alert(creativeSentences[randomIndex]);
    });
});