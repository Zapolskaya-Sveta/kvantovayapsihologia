// Валидация формы записи на сессию
function validateAppointmentForm() {
    const form = document.querySelector('#appointmentModal .form-container');
    const selects = form.querySelectorAll('select');
    const textarea = form.querySelector('textarea');
    const phoneInput = form.querySelector('input[type="tel"]');
    const nameInput = form.querySelector('input[type="text"]');
    let isValid = true;

    // Сброс предыдущих ошибок
    form.querySelectorAll('.error-message').forEach(el => el.remove());
    form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

    // Проверка выпадающих списков
    selects.forEach(select => {
        if (select.selectedIndex === 0) {
            select.classList.add('is-invalid');
            showError(select, 'Это поле обязательно для заполнения');
            isValid = false;
        }
    });

    // Проверка текстового поля
    if (textarea.value.trim() === '') {
        textarea.classList.add('is-invalid');
        showError(textarea, 'Пожалуйста, опишите ваш запрос');
        isValid = false;
    } else if (textarea.value.length > 500) {
        textarea.classList.add('is-invalid');
        showError(textarea, 'Максимальная длина 500 символов');
        isValid = false;
    }

    // Проверка телефона
    const phoneRegex = /^(\+7|8)[0-9]{10}$/;
    if (!phoneRegex.test(phoneInput.value.replace(/\D/g, ''))) {
        phoneInput.classList.add('is-invalid');
        showError(phoneInput, 'Введите корректный номер телефона');
        isValid = false;
    }

    // Проверка имени, если чекбокс не отмечен
    const noNameCheckbox = form.querySelector('#noName');
    if (!noNameCheckbox.checked && nameInput.value.trim() === '') {
        nameInput.classList.add('is-invalid');
        showError(nameInput, 'Введите ваше имя или отметьте чекбокс');
        isValid = false;
    }

    if (isValid) {
        // Здесь можно добавить отправку формы
        alert('Форма успешно отправлена!');
        closeModal();
    }

    return false; // Предотвращаем отправку формы
}

// Валидация формы регистрации
function validateRegistrationForm() {
    const form = document.querySelector('#registrationForm .registration-form-container');
    const emailInput = form.querySelector('input[type="email"]');
    const usernameInput = form.querySelector('input[type="text"]');
    const passwordInput = form.querySelector('input[type="password"]');
    const agreeCheckbox = form.querySelector('#agreeCheck');
    let isValid = true;

    // Сброс предыдущих ошибок
    form.querySelectorAll('.error-message').forEach(el => el.remove());
    form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

    // Проверка email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        emailInput.classList.add('is-invalid');
        showError(emailInput, 'Введите корректный email');
        isValid = false;
    }

    // Проверка логина
    if (usernameInput.value.trim() === '') {
        usernameInput.classList.add('is-invalid');
        showError(usernameInput, 'Введите логин');
        isValid = false;
    } else if (usernameInput.value.length < 3) {
        usernameInput.classList.add('is-invalid');
        showError(usernameInput, 'Логин должен быть не менее 3 символов');
        isValid = false;
    }

    // Проверка пароля
    if (passwordInput.value.length < 6) {
        passwordInput.classList.add('is-invalid');
        showError(passwordInput, 'Пароль должен быть не менее 6 символов');
        isValid = false;
    }

    // Проверка согласия
    if (!agreeCheckbox.checked) {
        agreeCheckbox.classList.add('is-invalid');
        showError(agreeCheckbox, 'Необходимо ваше согласие');
        isValid = false;
    }

    if (isValid) {
        // Здесь можно добавить отправку формы
        alert('Регистрация успешна!');
        closeRegistrationForm();
    }

    return false; // Предотвращаем отправку формы
}

// Функция для отображения ошибки
function showError(input, message) {
    const error = document.createElement('div');
    error.className = 'error-message';
    error.style.color = '#dc3545';
    error.style.fontSize = '0.8rem';
    error.style.marginTop = '0.25rem';
    error.textContent = message;
    
    // Вставляем сообщение об ошибке после поля ввода
    input.parentNode.insertBefore(error, input.nextSibling);
    
    // Добавляем красную обводку для поля
    input.classList.add('is-invalid');
}

// Добавляем обработчики для кнопок отправки форм
document.addEventListener('DOMContentLoaded', function() {
    // Для формы записи на сессию
    const appointmentSubmit = document.querySelector('#appointmentModal .submit-btn');
    if (appointmentSubmit) {
        appointmentSubmit.addEventListener('click', function(e) {
            e.preventDefault();
            validateAppointmentForm();
        });
    }

    // Для формы регистрации
    const registrationSubmit = document.querySelector('#registrationForm .btn-register');
    if (registrationSubmit) {
        registrationSubmit.addEventListener('click', function(e) {
            e.preventDefault();
            validateRegistrationForm();
        });
    }
});
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
      document.addEventListener('DOMContentLoaded', function() {
    // Логика для выбора страны в форме
    const countrySelector = document.getElementById('countrySelector');
    const phoneInput = document.getElementById('phoneInput');
    const flagIcon = document.getElementById('flagIcon');
    const phoneNote = document.getElementById('phoneNote');

    // Инициализация маски ввода
    let phoneMask;
    initPhoneMask('ru');

    countrySelector.addEventListener('change', function() {
        const country = this.value;
        updatePhoneField(country);
    });

    function updatePhoneField(country) {
        if (country === 'ru') {
            flagIcon.src = 'https://flagcdn.com/w40/ru.png';
            phoneInput.placeholder = '+7 (___) ___-__-__';
            phoneNote.textContent = 'Телефон необходим только для того, чтобы психолог связался с вами в мессенджере';
            initPhoneMask('ru');
        } else if (country === 'by') {
            flagIcon.src = 'https://flagcdn.com/w40/by.png';
            phoneInput.placeholder = '+375 (__) ___-__-__';
            phoneNote.textContent = 'Тэлефон патрэбны толькі для сувязі псіхолага з вамі ў мэсэнджары';
            initPhoneMask('by');
        }
    }

    function initPhoneMask(country) {
        // Удаляем предыдущую маску, если она есть
        if (phoneMask) {
            phoneMask.destroy();
        }

        // Создаем новую маску в зависимости от страны
        if (country === 'ru') {
            phoneMask = IMask(phoneInput, {
                mask: '+{7} (000) 000-00-00',
                lazy: false
            });
        } else if (country === 'by') {
            phoneMask = IMask(phoneInput, {
                mask: '+375 (00) 000-00-00',
                lazy: false
            });
        }
    }
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
})