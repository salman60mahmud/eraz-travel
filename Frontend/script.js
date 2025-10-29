const total_seat = 40;

let clicked_seat = [];
let booked_seat = [];

function select_seat(id) {
    let index = clicked_seat.indexOf(id);
    const button = document.getElementById(id);

    if (index == -1) {
        // check maximum limit
        let maximum_seat = clicked_seat.length;
        if (maximum_seat >= 6) {
            alert('maximum 6 seats are allowed to purchase');
            return;
        }
        // save the data of clicked tickets
        clicked_seat.push(id);
        button.classList.remove('seat-selection');
        button.classList.add('bg-yellow-400', 'border-1', 'border-red-400', 'text-lg', 'rounded-xl', 'w-30');
        show_data();
        seat_numbers();
        return;
    }
    else {
        // remove the exact seat after deselect 
        clicked_seat.splice(index, 1);
        button.classList.remove('bg-yellow-400', 'border-1', 'border-red-400', 'text-lg', 'rounded-xl', 'w-30');
        button.classList.add('seat-selection');
        show_data();
        seat_numbers();
    }

}

// to show the data anywhere
function show_data() {

    // Clear the dashboard and reset
    const dashboard = document.getElementById('dashboard');
    dashboard.innerHTML = '';

    for (const data of clicked_seat) {
        const seat_show = document.createElement('p');
        seat_show.innerText = data;
        seat_show.setAttribute('id', `p${data}`);
        seat_show.classList.add('text-emerald-600', 'text-xl');
        dashboard.appendChild(seat_show);
    }
}

// triggered the book now button
function seat_numbers() {
    let clicked_number1 = clicked_seat.length;
    const clicked_number = document.getElementById('seat_numbers');
    clicked_number.innerText = clicked_number1;

    const book_now = document.getElementById('booking');
    if (clicked_number1 > 0) {
        book_now.removeAttribute('disabled');
        book_now.addEventListener('click', book_button);
    }
    else {
        book_now.setAttribute('disabled', true);
    }
}

// store the sold tickets
function book_button() {
    booked_seat = [...booked_seat, ...clicked_seat];

    for (let x of clicked_seat) {
        let booked_disable = document.getElementById(x);
        booked_disable.setAttribute('disabled', true);
        booked_disable.classList.add('bg-red-600');
        booked_disable.classList.remove('bg-yellow-400');
    }
    // after the booking, clears clicked_seat array 
    clicked_seat = [];
    show_data();
    seat_numbers();

    // get the numbers of available seats
    let available_seat = document.getElementById('available_seat');
    available_seat.innerText = total_seat - booked_seat.length;

    // Show toast notification after successful booking
    showToast('Seats booked successfully!');
}

// Toast showing
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('hidden'); // Remove hidden class to show toast
    toast.classList.add('flex'); // Add flex to make it visible

    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.add('hidden');
        toast.classList.remove('flex');
    }, 3000);
}