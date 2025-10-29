let seat = 40;

let available_seat = document.getElementById('available_seat');
available_seat.innerText = `${seat} Seats available`;

const clicked_seat = [];
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
        clicked_seat.push(id);
        button.classList.remove('seat-selection');
        button.classList.add('bg-emerald-800', 'rounded-xl', 'w-30');
        show_data();
        seat_numbers()
        return;
    }
    else {
        clicked_seat.splice(index, 1);
        button.classList.remove('bg-emerald-800', 'rounded-xl', 'w-30');
        button.classList.add('seat-selection');
        show_data();
        seat_numbers();
    }

}

function show_data() {
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

function seat_numbers() {
    const clicked_number = document.getElementById('seat_numbers');
    clicked_number.innerText = clicked_seat.length;
} 