document.addEventListener("DOMContentLoaded", function() {
    const quotes = document.querySelectorAll('.dissolve-quote');
    
    // Настройки Observer
    const observerOptions = {
        threshold: 0.3, // Срабатывает когда 30% элемента в зоне видимости
        rootMargin: "0px 0px -50px 0px" // Игнорирует нижний край
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Отключаем наблюдение после появления
            }
        });
    }, observerOptions);

    // Начинаем наблюдение
    quotes.forEach(quote => observer.observe(quote));
});
        // Функция для переворота кружочка с результатом
function flipResult(circle) {
    circle.classList.toggle('flipped');
}

// Автоматический возврат через 5 секунд (опционально)
document.querySelectorAll('.result-circle').forEach(circle => {
    circle.addEventListener('click', function() {
        if (this.classList.contains('flipped')) {
            clearTimeout(this.flipTimeout);
            this.flipTimeout = setTimeout(() => {
                this.classList.remove('flipped');
            }, 5000);
        }
    });
});
        // Функции для формы регистрации
function openRegistrationForm() {
    document.getElementById('registrationForm').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeRegistrationForm() {
    document.getElementById('registrationForm').classList.remove('active');
    document.body.style.overflow = '';
}

// Назначение обработчика для иконки входа
document.addEventListener('DOMContentLoaded', function() {
    const userIcons = document.querySelectorAll('.fa-user');
    
    userIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            openRegistrationForm();
        });
    });
    
    // Закрытие формы по клику вне контейнера
    document.getElementById('registrationForm').addEventListener('click', function(e) {
        if (e.target === this) {
            closeRegistrationForm();
        }
    });
});
// Функции для формы медитации
function openMeditationModal() {
    document.getElementById('meditationModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMeditationModal() {
    document.getElementById('meditationModal').classList.remove('active');
    document.body.style.overflow = '';
}

function selectOption(el) {
    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
    el.classList.add('selected');
}

// Назначение обработчика для кнопки "ПОЛУЧИТЬ МЕДИТАЦИЮ"
document.addEventListener('DOMContentLoaded', function() {
    const meditationButtons = document.querySelectorAll('.main-button');
    
    meditationButtons.forEach(button => {
        if (button.textContent.includes('ПОЛУЧИТЬ МЕДИТАЦИЮ')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                openMeditationModal();
            });
        }
    });
    
    // Закрытие модального окна по клику вне формы
    document.getElementById('meditationModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeMeditationModal();
        }
    });
});

// Функция для открытия модального окна
   function openModal() {
    document.getElementById('appointmentModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('appointmentModal').style.display = 'none';
    document.body.style.overflow = '';
}
  // Назначаем обработчики событий для всех кнопок "Записаться на сессию"
document.addEventListener('DOMContentLoaded', function() {
    const appointmentButtons = document.querySelectorAll('.appointment-button, .mobile-appointment-button, .testimonial-button, .appointment-button-white');
    
    // Назначаем обработчик для каждой кнопки
    appointmentButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    });
    document.querySelectorAll('.main-button').forEach(button => {
        if (button.textContent.includes('Узнать больше') || button.textContent.includes('ПОЛУЧИТЬ МЕДИТАЦИЮ')) {
            button.onclick = null; 
        }
    });
       // Закрытие модального окна по клику на крестик
       document.getElementById('closeModal').addEventListener('click', closeModal);
       
       // Закрытие модального окна по клику вне формы
       document.getElementById('appointmentModal').addEventListener('click', function(e) {
           if (e.target === this) {
               closeModal();
           }
       });
       // Логика для выбора страны в форме
       const countrySelector = document.getElementById('countrySelector');
       const phoneInput = document.getElementById('phoneInput');
       const flagIcon = document.getElementById('flagIcon');
       const phoneNote = document.getElementById('phoneNote');

       countrySelector.addEventListener('change', function () {
           if (this.value === 'ru') {
               flagIcon.src = 'https://flagcdn.com/w40/ru.png';
               phoneInput.placeholder = '+7 985 640 87 70';
               phoneNote.textContent = 'Телефон необходим только для того, чтобы психолог связался с вами в мессенджере';
           } else {
               flagIcon.src = 'https://flagcdn.com/w40/by.png';
               phoneInput.placeholder = '+375 29 123 45 67';
               phoneNote.textContent = 'Тэлефон патрэбны толькі для сувязі псіхолага з вамі ў мэсэнджары';
           }
       });
   });
    document.querySelectorAll('.logo-link, .footer-logo a').forEach(logo => {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        // Если открыто мобильное меню - закрываем его
        const hamburger = document.getElementById('hamburger');
        const mobileNav = document.getElementById('mobileNav');
        if (hamburger && mobileNav && hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
            
            // Блокировка прокрутки тела при открытом меню
            if (mobileNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        // Закрытие меню при клике на ссылку
        const navLinks = mobileNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});
        // Плавная прокрутка к секции
        function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                window.scrollTo({
                    top: section.offsetTop,
                    behavior: 'smooth'
                });
            }
        }
        // Инициализация плавной прокрутки для всех ссылок навигации
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const sectionId = this.getAttribute('href');
                if (sectionId !== '#') {
                    scrollToSection(sectionId.substring(1));
                }
            });
        });
        // Адаптация высоты секций под изображения
        function adjustSectionHeights() {
            const sections = document.querySelectorAll('.section');
            
            sections.forEach(section => {
                // Получаем фоновое изображение
                const bgImage = new Image();
                const bgUrl = window.getComputedStyle(section).backgroundImage
                    .replace(/url\((['"])?(.*?)\1\)/gi, '$2')
                    .split(',')[0];
                
                if (bgUrl && bgUrl !== 'none') {
                    bgImage.src = bgUrl;
                    
                    bgImage.onload = function() {
                        // Рассчитываем соотношение сторон изображения
                        const aspectRatio = bgImage.height / bgImage.width;
                        // Устанавливаем минимальную высоту секции на основе ширины экрана
                        const minHeight = window.innerWidth * aspectRatio;
                        // Устанавливаем высоту секции
                        section.style.minHeight = `${minHeight}px`;
                    };
                }
            });
        }
        // Функции для слайдера публикаций
        const slider = document.getElementById('slider');
        let isSliding = false;
        const slideWidth = 250 + 35; 

        function slideRight() {
            if (isSliding) return;
            isSliding = true;
            slider.style.transition = 'transform 0.5s ease';
            slider.style.transform = `translateX(-${slideWidth}px)`;
            setTimeout(() => {
                slider.appendChild(slider.children[0]); 
                slider.style.transition = 'none';
                slider.style.transform = 'translateX(0)';
                isSliding = false;
            }, 500);
        }
        function slideLeft() {
            if (isSliding) return;
            isSliding = true;
            // перемещаем последний слайд в начало без анимации
            slider.style.transition = 'none';
            slider.insertBefore(slider.lastElementChild, slider.firstElementChild);
            slider.style.transform = `translateX(-${slideWidth}px)`;
            // запускаем анимацию возврата
            requestAnimationFrame(() => {
                slider.style.transition = 'transform 0.5s ease';
                slider.style.transform = 'translateX(0)';
            });
            setTimeout(() => {
                isSliding = false;
            }, 500);
        }
        // Карусель для секции 7
        document.addEventListener('DOMContentLoaded', function() {
            const items = document.querySelectorAll('.carousel-item');
            let currentIndex = 0;
            let interval;
            function showSlide(index) {
                items.forEach(item => item.classList.remove('active'));
                items[index].classList.add('active');
                currentIndex = index;
            }
            function nextSlide() {
                let newIndex = (currentIndex + 1) % items.length;
                showSlide(newIndex);
            }
            function startCarousel() {
                interval = setInterval(nextSlide, 3000);
            }
            function stopCarousel() {
                clearInterval(interval);
            }
            // Пауза при наведении
            const carousel = document.querySelector('.carousel-overlay');
            if (carousel) {
                carousel.addEventListener('mouseenter', stopCarousel);
                carousel.addEventListener('mouseleave', startCarousel);
                startCarousel();
            }
        });
        // Вызываем при загрузке и изменении размера окна
        window.addEventListener('load', adjustSectionHeights);
        window.addEventListener('resize', adjustSectionHeights);
    