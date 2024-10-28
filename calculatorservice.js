 
    function ready(){
   const quantityInput = document.getElementById('quantity');
    const serviceRadioButtons = document.querySelectorAll('input[name="service"]');
    const optionsSelect = document.getElementById('options');
    const priceSpan = document.getElementById('price');
    const optionsContainer = document.getElementById('options-container');
    const propertyContainer = document.getElementById('property-container');

    const allProps = document.querySelectorAll('#property-container input[type="checkbox"]');

    const options = {
      '2': [
        { value: 'Шариковая черная (+50 руб)', price: 50 },
        { value: 'Гелевая черная (+55 руб)', price: 55 },
        { value: 'Шариковая синяя (+40 руб)', price: 40 },
        { value: 'Гелевая синяя (+45 руб)', price: 45 }
      ]
    };

    function calculatePrice() {
        let price = 0;
        const quantityValue = quantityInput.value;
        const quantity = parseInt(quantityValue);
        if (quantityValue.length == 0) {
            document.getElementById("price").innerText = "Вы не ввели число!";
            return false;
        }
        if (!quantityValue.match(/^\d+$/) || !quantity) {
            document.getElementById("price").innerText = "Вы ввели не целое положительное число!";
            return false;
        }
      const selectedService = document.querySelector('input[name="service"]:checked').value;

      switch (selectedService) {
        case '1':
          price = quantity * 20;
          break;
          case '2':
          price = 5;
          if (optionsSelect.value) {
            const selectedOption = options[selectedService].find(option => option.value === optionsSelect.value);
            if (selectedOption) {
              price += selectedOption.price;
            }
          }
          price = price*quantity;
          break;
          case '3':
          price = 10;
          allProps.forEach(function(propertyCheckbox) {
            if (propertyCheckbox.checked) {
                  price += parseInt(propertyCheckbox.value);
            }
          });
          price = price*quantity;
          break;
      }

      priceSpan.textContent = price + " рублей";
    }

    function updateOptions() {
      const selectedService = document.querySelector('input[name="service"]:checked').value;
      optionsSelect.innerHTML = '';

      if (selectedService === '2') {
        optionsContainer.style.display = 'block';
        propertyContainer.style.display = 'none';

        options[selectedService].forEach(option => {
          const optionElement = document.createElement('option');
          optionElement.value = option.value;
          optionElement.textContent = option.value;
          optionsSelect.appendChild(optionElement);
        });
      } else if (selectedService === '3') {
        optionsContainer.style.display = 'none';
        propertyContainer.style.display = 'block';
      } else {
        optionsContainer.style.display = 'none';
        propertyContainer.style.display = 'none';
      }
    }

    quantityInput.addEventListener('change', calculatePrice);
    serviceRadioButtons.forEach(button => button.addEventListener('change', () => {
      updateOptions();
      calculatePrice();
    }));
    allProps.forEach(button => button.addEventListener('change', () => {
      updateOptions();
      calculatePrice();
    }));
    optionsSelect.addEventListener('change', calculatePrice);

    // Инициализация при загрузке страницы
    updateOptions();
    calculatePrice();
}


document.addEventListener("DOMContentLoaded", ready);