const resumeForm = document.getElementById('resume-form');
const resumeDisplay = document.getElementById('resume-display');
const profilePictureInput = document.getElementById('profile-picture');
const downloadButton = document.getElementById('download-pdf');

let profileImageURL = '';

// Handle image upload and preview
profilePictureInput.addEventListener('change', function () {
    const file = profilePictureInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profileImageURL = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Generate resume
resumeForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;

    // Display the resume
    resumeDisplay.innerHTML = `
        <div id="resume-content">
            <img src="${profileImageURL}" alt="Profile Picture" class="profile-img">
            <h2>${name}'s Resume</h2>
            <p><b>Email:</b> ${email}</p>
            <p><b>Phone:</b> ${phone}</p>
            <h3>Education</h3>
            <p>${education}</p>
            <h3>Experience</h3>
            <p>${experience}</p>
            <h3>Skills</h3>
            <p>${skills}</p>
        </div>
    `;

    // Show download button
    downloadButton.style.display = 'block';
});

// Download resume as PDF
downloadButton.addEventListener('click', function () {
    const element = document.getElementById('resume-content');
    
    // Configuration for html2pdf
    const options = {
        margin: 1,
        filename: 'Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 4 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Generate PDF
    html2pdf().set(options).from(element).save();
});
