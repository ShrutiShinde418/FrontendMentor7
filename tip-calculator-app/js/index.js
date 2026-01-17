document.addEventListener("DOMContentLoaded", () => {
  let billAmount = 0,
    totalNoOfPeople = 0,
    tipAmount = 0;

  const bill = document.getElementById("bill");
  const noOfPeople = document.getElementById("people");
  bill.value = billAmount;
  noOfPeople.value = totalNoOfPeople;
  const customButton = document.querySelector(".custom");
  const error = document.querySelector(".error");
  const radioButtons = document.getElementsByName("tip");
  const perPersonTip = document.getElementById("perPersonTip");
  const totalAmountPerPerson = document.getElementById("totalAmountPerPerson");
  const resetButton = document.querySelector(".reset");

  const calculateBill = (tipPercentage, billAmount, noOfPeople) => {
    if (tipPercentage && billAmount > 0 && noOfPeople > 0) {
      const tip = (billAmount * tipPercentage) / 100;
      perPersonTip.innerText = `$${(tip / noOfPeople).toFixed(2)}`;
      totalAmountPerPerson.innerText = `$${((tip + billAmount) / noOfPeople).toFixed(2)}`;
      resetButton.classList.add("active-btn");
    }
  };

  const resetCustomButton = () => {
    customButton.setAttribute("type", "button");
    customButton.setAttribute("value", "Custom");
    customButton.classList.add("custom");
  };

  resetButton.addEventListener("click", () => {
    resetButton.classList.remove("active-btn");
    billAmount = 0;
    totalNoOfPeople = 0;
    tipAmount = 0;
    perPersonTip.innerText = `$0.00`;
    totalAmountPerPerson.innerText = `$0.00`;
    bill.value = billAmount;
    noOfPeople.value = totalNoOfPeople;
    const selectedRadioButton = document.querySelector(
      ".input-buttons .active-btn",
    );

    if (selectedRadioButton) {
      selectedRadioButton.classList.remove("active-btn");
    }

    if (customButton.getAttribute("type") === "number") {
      resetCustomButton();
    }
  });

  radioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", () => {
      if (radioButton.checked) {
        const parentElement = radioButton.parentElement;
        parentElement.classList.add("active-btn");
        tipAmount = radioButton.value;
        calculateBill(radioButton.value, billAmount, totalNoOfPeople);

        radioButtons.forEach((radioButton) => {
          if (!radioButton.checked) {
            const parentElement = radioButton.parentElement;
            parentElement.classList.remove("active-btn");
          }
        });

        resetCustomButton();
      }
    });
  });

  customButton.addEventListener("click", () => {
    customButton.setAttribute("type", "number");
    customButton.setAttribute("value", "0");
    customButton.setAttribute("min", "0");
    customButton.setAttribute("max", "100");
    customButton.classList.remove("custom");
    customButton.classList.add("input-number");
    radioButtons.forEach((radioButton) => {
      const parentElement = radioButton.parentElement;
      parentElement.classList.remove("active-btn");
    });

    customButton.addEventListener("change", () => {
      tipAmount = customButton.value;
      calculateBill(customButton.value, billAmount, totalNoOfPeople);
    });
  });

  bill.addEventListener("change", (e) => {
    billAmount = +e.target.value;

    if (billAmount > 0 && totalNoOfPeople === 0) {
      error.style.display = "block";
      noOfPeople.classList.add("error-control");
    }

    if (billAmount === 0 && totalNoOfPeople === 0) {
      error.style.display = "none";
      noOfPeople.classList.remove("error-control");
    }

    if (billAmount > 0 && totalNoOfPeople > 0 && tipAmount) {
      calculateBill(tipAmount, billAmount, totalNoOfPeople);
    }
  });

  noOfPeople.addEventListener("change", (e) => {
    totalNoOfPeople = +e.target.value;
    if (billAmount > 0 && totalNoOfPeople === 0) {
      error.style.display = "block";
      noOfPeople.classList.add("error-control");
    } else {
      error.style.display = "none";
      noOfPeople.classList.remove("error-control");
    }

    if (billAmount > 0 && totalNoOfPeople > 0) {
      calculateBill(tipAmount, billAmount, totalNoOfPeople);
    }
  });
});
