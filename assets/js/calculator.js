// 견적계산기 기능
document.addEventListener('DOMContentLoaded', function() {
    // 가격 데이터 (메모리에서 가져온 정보)
    const priceData = {
        '6-110': 10400, '6-125': 11900, '6-140': 13200,
        '9-110': 10900, '9-125': 12300, '9-140': 13500,
        '12-110': 12600, '12-125': 14500, '12-140': 16800,
        '14-110': 13600, '14-125': 15600, '14-140': 17800,
        '17-70': 10700, '17-110': 13800, '17-125': 16100, '17-140': 18200,
        '22-110': 19100, '22-125': 20900
    };

    // 매트 종류 표시명
    const matNames = {
        '6-110': '6mm × 110cm', '6-125': '6mm × 125cm', '6-140': '6mm × 140cm',
        '9-110': '9mm × 110cm', '9-125': '9mm × 125cm', '9-140': '9mm × 140cm',
        '12-110': '12mm × 110cm', '12-125': '12mm × 125cm', '12-140': '12mm × 140cm',
        '14-110': '14mm × 110cm', '14-125': '14mm × 125cm', '14-140': '14mm × 140cm',
        '17-70': '17mm × 70cm', '17-110': '17mm × 110cm', '17-125': '17mm × 125cm', '17-140': '17mm × 140cm',
        '22-110': '22mm × 110cm', '22-125': '22mm × 125cm'
    };

    const form = document.getElementById('price-calculator');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const matType = document.getElementById('mat-type').value;
        const length = parseInt(document.getElementById('length').value);

        if (!matType || !length) {
            alert('매트 종류와 길이를 모두 입력해주세요.');
            return;
        }

        if (length < 50) {
            alert('길이는 최소 50cm 이상이어야 합니다.');
            return;
        }

        calculatePrice(matType, length);
    });

    function calculatePrice(matType, length) {
        const basePrice = priceData[matType];
        const lengthFactor = length / 50;
        const totalPrice = Math.round(basePrice * lengthFactor);

        // 결과 표시
        document.getElementById('selected-mat').textContent = matNames[matType];
        document.getElementById('selected-length').textContent = length;
        document.getElementById('base-price').textContent = basePrice.toLocaleString();
        document.getElementById('length-factor').textContent = lengthFactor.toFixed(2);
        document.getElementById('total-price').textContent = totalPrice.toLocaleString();

        // 결과 섹션 표시
        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // 입력 필드 실시간 유효성 검사
    document.getElementById('length').addEventListener('input', function() {
        const value = parseInt(this.value);
        if (value && value < 50) {
            this.setCustomValidity('길이는 최소 50cm 이상이어야 합니다.');
        } else {
            this.setCustomValidity('');
        }
    });

    // 매트 종류 변경 시 길이 입력 필드 초기화
    document.getElementById('mat-type').addEventListener('change', function() {
        if (this.value) {
            document.getElementById('length').focus();
        }
    });
});
