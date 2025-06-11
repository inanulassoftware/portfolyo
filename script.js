// Hamburger menü işlevselliği
function hamburg(){
    const navbar = document.querySelector('.dropdown');
    navbar.classList.add('active'); // CSS sınıfı ile kontrol et
}

function cancel(){
    const navbar = document.querySelector('.dropdown');
    navbar.classList.remove('active'); // CSS sınıfı ile kontrol et
}

// Typewriter efekti için değişkenler
const texts = [
    "Geliştiriciyim",
    "Tasarımcıyım",
    "Yazılımcıyım"
];

let speed = 100;      // Yazma hızı
let eraseSpeed = 50;  // Silme hızı
let newTextDelay = 1000;  // Yeni metne geçmeden önce bekleme

let textElements;  // Bu değişkeni sayfa yüklendiğinde dolduracağız
let textIndex = 0;
let characterIndex = 0;

function typeWriter() {
    if (characterIndex < texts[textIndex].length) {
        textElements.innerHTML += texts[textIndex].charAt(characterIndex);
        characterIndex++;
        setTimeout(typeWriter, speed);
    } else {
        setTimeout(eraseText, newTextDelay);
    }
}

function eraseText() {
    if (textElements.innerHTML.length > 0) {
        textElements.innerHTML = textElements.innerHTML.slice(0, -1);
        setTimeout(eraseText, eraseSpeed);
    } else {
        textIndex = (textIndex + 1) % texts.length;
        characterIndex = 0;
        setTimeout(typeWriter, 500);
    }
}

// Sayfa tamamen yüklendiğinde çalışan kısım
window.onload = function() {
    // typewriter-text elementini al
    textElements = document.querySelector('.typewriter-text');
    if (!textElements) {
        console.error("'.typewriter-text' elementi bulunamadı.");
        return;
    }

    // Typewriter efektini başlat
    typeWriter();

    // EmailJS başlat
    emailjs.init("uRpv6bMYp5aReKr9JNGRb");

    // Contact form submit event
    const contactForm = document.getElementById("contactform");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();

            emailjs.sendForm("service_4bpl31v", "template_u3zeezn", this)
                .then(() => {
                    const successMessage = document.getElementById("success-message");
                    successMessage.textContent = "Your message has been sent successfully!";
                    successMessage.style.backgroundColor = "rgba(0, 178, 0, 0.2)";
                    successMessage.style.borderColor = "green";
                    successMessage.style.display = "block";
                    this.reset();
                    setTimeout(() => {
                        successMessage.style.display = "none";
                    }, 5000);
                }, (error) => {
                    const successMessage = document.getElementById("success-message");
                    successMessage.textContent = "An error occurred: " + JSON.stringify(error);
                    successMessage.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
                    successMessage.style.borderColor = "red";
                    successMessage.style.display = "block";
                    setTimeout(() => {
                        successMessage.style.display = "none";
                    }, 7000);
                });
        });
    }

    // Smooth Scroll - sayfa içi linkler için
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            // Hamburger menü açıksa kapat
            const dropdown = document.querySelector('.dropdown');
            if (dropdown && dropdown.classList.contains('active')) {
                dropdown.classList.remove('active');
            }

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};
