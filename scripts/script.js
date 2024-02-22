document.addEventListener('DOMContentLoaded', function() {
    const seats = document.querySelectorAll('.seat');
    const selectedSeatsList = document.getElementById('selectedSeatsList');
    const availableSeatsSpan = document.getElementById('availableSeats');
    const selectedSeatsSpan = document.getElementById('selectedSeats');
    const totalPriceSpan = document.getElementById('totalPrice');
    const discountedPriceSpan = document.getElementById('discountedPrice');
    const applyCouponButton = document.getElementById('applyCoupon');
    const couponInput = document.getElementById('couponInput');
    let selectedSeats = [];
    let totalPrice = 0;
    let discountedPrice = 0;
    let selectedCoupleDiscount = '';

    seats.forEach(seat => {
        seat.addEventListener('click', () => selectSeat(seat));
    });

    function selectSeat(seat) {
        if (!seat.classList.contains('disabled')) {
            const seatId = seat.id;
            const seatIndex = selectedSeats.indexOf(seatId);
            if (seatIndex === -1 && selectedSeats.length < 4) {
                seat.classList.add('selected');
                selectedSeats.push(seatId);
            } else if (seatIndex !== -1) {
                seat.classList.remove('selected');
                selectedSeats.splice(seatIndex, 1);
            } else {
                alert('You have already selected 4 seats. You can buy 4 seats at most at a time.');
            }
            updateSelectedSeatsList();
            updateAvailableSeats();
            updateTotalPrice();
            updateDiscountedPrice();
            applyCouponButton.disabled = selectedSeats.length !== 4;
        }
    }

    function updateSelectedSeatsList() {
        selectedSeatsList.innerHTML = '';
        selectedSeats.forEach(seat => {
            const row = document.createElement('tr');
            
            const seatCell = document.createElement('td');
            seatCell.textContent = seat;
            row.appendChild(seatCell);
            
            const classCell = document.createElement('td');
            classCell.textContent = 'Economy';
            row.appendChild(classCell);
            
            const priceCell = document.createElement('td');
            priceCell.textContent = '$550';
            row.appendChild(priceCell);
            
            selectedSeatsList.appendChild(row);
        });
        selectedSeatsSpan.textContent = selectedSeats.length;
    }
    
    

    function updateAvailableSeats() {
        const availableSeats = 40 - selectedSeats.length;
        availableSeatsSpan.textContent = availableSeats;
    }

    function updateTotalPrice() {
        totalPrice = selectedSeats.length * 550;
        totalPriceSpan.textContent = totalPrice;
    }

    function updateDiscountedPrice() {
        if (selectedCoupleDiscount === 'couple 20') {
            discountedPrice = totalPrice * 0.8;
        } else if (selectedCoupleDiscount === 'NEW15') {
            discountedPrice = totalPrice * 0.85;
        } else {
            discountedPrice = totalPrice;
        }
        discountedPriceSpan.textContent = discountedPrice.toFixed(2);
    }

    applyCouponButton.addEventListener('click', () => {
        const coupon = couponInput.value.trim();
        if (coupon === 'couple 20' || coupon === 'NEW15') {
            selectedCoupleDiscount = coupon;
            applyCouponButton.disabled = true;
            couponInput.disabled = true;
            updateDiscountedPrice();
        } else {
            alert('Invalid coupon code! Please enter a valid coupon code');
        }
    });
});
