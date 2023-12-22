document.addEventListener('DOMContentLoaded', function () {
    const tbody = document.querySelector('tbody');
    const totalValue = document.getElementById('totalValue');

    function updateTotalAmount() {
        let totalAmount = 0;

        document.querySelectorAll('tbody tr').forEach(row => {
            const price = parseFloat(row.querySelector('.price').textContent);
            const quantity = parseFloat(row.querySelector('.quantity').value);
            const totalRowAmount = price * quantity;

            totalAmount += totalRowAmount;

            // Update the total amount for this row
            row.querySelector('.totalAmount').textContent = totalRowAmount.toFixed(2);
        });

        totalValue.textContent = totalAmount.toFixed(2);
    }

    function addMedicineRow() {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td contenteditable="true"></td>
            <td class="price" contenteditable="true"></td>
            <td class="quantity-container">
                <button class="quantity-adjust" data-action="minus">-</button>
                <input class="quantity" type="number" value="1" min="1" />
                <button class="quantity-adjust" data-action="plus">+</button>
            </td>
            <td class="totalAmount">0.00</td>
        `;
        tbody.appendChild(newRow);

        updateTotalAmount();
    }

    // Add initial row
    addMedicineRow();

    // Add event listener for adding new rows
    document.getElementById('medicinesTable').addEventListener('input', function (event) {
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TD') {
            updateTotalAmount();
        }
    });

    // Add event listener for quantity input change
    tbody.addEventListener('change', function (event) {
        if (event.target.classList.contains('quantity')) {
            updateTotalAmount();
        }
    });

    // Add event listener for quantity adjustment buttons
    tbody.addEventListener('click', function (event) {
        if (event.target.classList.contains('quantity-adjust')) {
            const row = event.target.closest('tr');
            const input = row.querySelector('.quantity');
            const action = event.target.dataset.action;

            if (action === 'plus') {
                input.value = parseInt(input.value, 10) + 1;
            } else if (action === 'minus' && input.value > 1) {
                input.value = parseInt(input.value, 10) - 1;
            }

            updateTotalAmount();
        }
    });

    // Button to add a new medicine row
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Medicine';
    addButton.addEventListener('click', addMedicineRow);
    document.body.insertBefore(addButton, document.getElementById('medicinesTable'));

    // Function to set appropriate styles based on screen width
    function setStyles() {
        const isMobile = window.innerWidth <= 768; // Adjust this breakpoint as needed

        document.querySelectorAll('.quantity-container').forEach(container => {
            container.style.flexDirection = isMobile ? 'column' : 'row';
        });

        document.querySelectorAll('.quantity-adjust').forEach(button => {
            button.style.width = isMobile ? '40px' : 'auto';
        });
    }

    // Call the setStyles function on page load and when the window is resized
    setStyles();
    window.addEventListener('resize', setStyles);
});



document.addEventListener('DOMContentLoaded', function () {
    // Simulate sending a POST message
    const postData = {
        medicinename: 'New Person',
        quantity: " ",
        discription:" ",
    };

    // Update the table with the posted data
    updateTable(postData);

    function updateTable(data) {
        const table = document.getElementById('medicinesTable');

        // Create a new row
        const newRow = table.insertRow();

        // Add cells to the new row
        const medicinenameCell = newRow.insertCell(0);
        const quantityCell = newRow.insertCell(1);
         const discriptionCell = newRow.insertCell(2);

        // Set cell values from the posted data
        medicinenameCell.textContent = data.medicinename;
        quantityCell.textContent = data.quantity;
        discriptionCell.textContent = data.discription;
    }
});
