// DOM 요소들
const hamburger = document.getElementById('hamburger');
const mobileNavMenu = document.getElementById('mobile-nav-menu');
const pcToggleMenu = document.getElementById('pc-toggle-menu');
const navbar = document.getElementById('navbar');
const floatingButtons = document.querySelector('.floating-buttons');

// 현재 활성화된 메뉴 확인 (반응형 대응)
function getActiveMenu() {
    return window.innerWidth <= 480 ? mobileNavMenu : pcToggleMenu;
}

// 햄버거 메뉴 토글
hamburger.addEventListener('click', () => {
    const activeMenu = getActiveMenu();
    hamburger.classList.toggle('active');
    activeMenu.classList.toggle('active');
});

// 메뉴 링크 클릭 시 메뉴 닫기
document.querySelectorAll('#mobile-nav-menu .nav-link, #pc-toggle-menu .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNavMenu.classList.remove('active');
        pcToggleMenu.classList.remove('active');
    });
});

// ESC 키로 메뉴 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (mobileNavMenu.classList.contains('active') || pcToggleMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileNavMenu.classList.remove('active');
            pcToggleMenu.classList.remove('active');
        }
    }
});

// 메뉴 외부 클릭 시 메뉴 닫기
document.addEventListener('click', (e) => {
    const isMenuOpen = mobileNavMenu.classList.contains('active') || pcToggleMenu.classList.contains('active');
    const clickedOutside = !mobileNavMenu.contains(e.target) &&
                          !pcToggleMenu.contains(e.target) &&
                          !hamburger.contains(e.target);

    if (isMenuOpen && clickedOutside) {
        hamburger.classList.remove('active');
        mobileNavMenu.classList.remove('active');
        pcToggleMenu.classList.remove('active');
    }
});

// 제품 쇼케이스 인터랙션
const productItems = document.querySelectorAll('.product-item');
const productMainImage = document.querySelector('.product-main-image img');
const productInfoTitle = document.querySelector('.product-info-title');
const productInfoDesc = document.querySelector('.product-info-desc');

// 제품 데이터
const productsData = [
    {
        name: '유아 PVC롤매트',
        desc: '아이들의 안전을 최우선으로 생각한 부드럽고 안전한 PVC 소재의 롤매트입니다.',
        image: 'assets/images/products/product_01.jpg'
    },
    {
        name: '강아지 PVC롤매트',
        desc: '반려견의 활동 공간을 위한 내구성이 뛰어난 PVC 롤매트로 쉽게 청소하고 관리할 수 있습니다.',
        image: 'assets/images/products/product_02.jpg'
    },
    {
        name: '유아 PE 퍼즐매트',
        desc: '조립이 간편한 퍼즐 형태로 원하는 크기와 모양으로 자유롭게 구성할 수 있는 매트입니다.',
        image: 'assets/images/products/product_03.jpg'
    },
    {
        name: '프리미엄 TPU 매트',
        desc: '최고급 TPU 소재로 제작된 프리미엄 매트로 뛰어난 쿠셔닝과 내구성을 자랑합니다.',
        image: 'assets/images/products/product_04.jpg'
    },
    {
        name: '유아 PE 롤매트',
        desc: '합리적인 가격으로 만나는 실용적인 PE 소재 롤매트로 가성비가 뛰어납니다.',
        image: 'assets/images/products/product_05.jpg'
    }
];

// 제품 아이템에 호버/클릭 이벤트
productItems.forEach((item, index) => {
    // 마우스 오버
    item.addEventListener('mouseenter', () => {
        updateMainProduct(index);
    });

    // 클릭 (모바일용)
    item.addEventListener('click', () => {
        updateMainProduct(index);
    });
});

function updateMainProduct(index) {
    // 모든 아이템에서 active 제거
    productItems.forEach(item => item.classList.remove('active'));

    // 선택된 아이템에 active 추가
    productItems[index].classList.add('active');

    // 메인 제품 정보 업데이트
    const product = productsData[index];
    productMainImage.src = product.image;
    productMainImage.alt = product.name;
    productInfoTitle.textContent = product.name;
    productInfoDesc.textContent = product.desc;
}

// 스크롤 시 네비게이션 스타일 변경
let ticking = false;

function updateOnScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // 네비게이션 배경 변경
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // 플로팅 버튼 표시/숨김 (투명도만)
    if (floatingButtons) {
        if (scrollY > windowHeight * 0.3) {
            floatingButtons.style.opacity = '1';
        } else {
            floatingButtons.style.opacity = '0';
        }
    }

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// 부드러운 스크롤 애니메이션
function smoothScrollTo(target) {
    const targetElement = document.querySelector(target);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 플로팅 버튼과 네비게이션 CTA는 이제 링크로 처리됩니다.

// 히어로 슬라이더 자동 롤링
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.hero-slide');
const totalSlides = slides.length;
const currentSlideSpan = document.getElementById('current-slide');
let slideInterval;

function showSlide(index) {
    // 모든 슬라이드에서 active 제거
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
    });
    
    // 현재 슬라이드에 active 추가
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    
    // 인디케이터 업데이트
    if (currentSlideSpan) {
        currentSlideSpan.textContent = index + 1;
    }
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    showSlide(currentSlideIndex);
}

function startSlideShow() {
    // 5초마다 다음 슬라이드로 이동
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlideShow() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 플로팅 버튼 초기 상태 설정
    if (floatingButtons) {
        floatingButtons.style.opacity = '0';
        floatingButtons.style.transition = 'opacity 0.3s ease';
    }

    // 부드러운 페이지 전환 효과
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // 히어로 슬라이더 초기화
    if (slides.length > 0) {
        showSlide(0);
        startSlideShow();
        
        // 마우스 호버 시 슬라이더 일시 정지
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', stopSlideShow);
            heroSection.addEventListener('mouseleave', startSlideShow);
        }
    }

    // 프로모션 슬라이더 초기화
    const promotionSlides = document.querySelectorAll('.promotion-slide');
    const promotionIndicators = document.querySelectorAll('.promotion-indicator');
    let currentPromotionIndex = 0;
    let promotionInterval;

    function showPromotionSlide(index) {
        // 모든 슬라이드에서 active 제거
        promotionSlides.forEach((slide, i) => {
            slide.classList.remove('active');
        });
        
        // 모든 인디케이터에서 active 제거
        promotionIndicators.forEach((indicator, i) => {
            indicator.classList.remove('active');
        });
        
        // 현재 슬라이드에 active 추가
        if (promotionSlides[index]) {
            promotionSlides[index].classList.add('active');
        }
        
        // 현재 인디케이터에 active 추가
        if (promotionIndicators[index]) {
            promotionIndicators[index].classList.add('active');
        }
    }

    function nextPromotionSlide() {
        currentPromotionIndex = (currentPromotionIndex + 1) % promotionSlides.length;
        showPromotionSlide(currentPromotionIndex);
    }

    function startPromotionSlideShow() {
        promotionInterval = setInterval(nextPromotionSlide, 4000);
    }

    function stopPromotionSlideShow() {
        if (promotionInterval) {
            clearInterval(promotionInterval);
        }
    }

    // 인디케이터 클릭 이벤트
    promotionIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentPromotionIndex = index;
            showPromotionSlide(currentPromotionIndex);
            stopPromotionSlideShow();
            startPromotionSlideShow();
        });
    });

    // 프로모션 슬라이더 초기화
    if (promotionSlides.length > 0) {
        showPromotionSlide(0);
        startPromotionSlideShow();
        
        // 마우스 호버 시 슬라이더 일시 정지
        const promotionSection = document.querySelector('.promotion-slider');
        if (promotionSection) {
            promotionSection.addEventListener('mouseenter', stopPromotionSlideShow);
            promotionSection.addEventListener('mouseleave', startPromotionSlideShow);
        }
    }
});
