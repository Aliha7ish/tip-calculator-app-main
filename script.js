"use strict";
const tipAmount = document.querySelector(".tip__amount");
const tipTotal = document.querySelector(".tip__total");
const percentKeys = document.querySelectorAll(".percent__num");
const resetBtn = document.querySelector(".btn-reset");

const billInput = document.getElementById("bill-input");
const peopleNumInput = document.getElementById("people-num");

const percentArr = Array.from(percentKeys);
const percent = percentArr
  .map((key) => +key.textContent.replace("%", ""))
  .map((key) => key / 100);


const calcIntlNum = function (num) {
  const locale = navigator.language;
  const options = {
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol",
  };
  return new Intl.NumberFormat(locale, options).format(num);
};

const calcOutput = function (amount, percent, person) {
  const tip = amount * percent;
  const tipPerPerson = tip / person;
  tipAmount.textContent = calcIntlNum(tipPerPerson.toFixed(2));
  tipTotal.textContent = calcIntlNum(((amount + tip) / person).toFixed(2));
};

percentKeys.forEach((key, i) =>
  key.addEventListener("click", function () {
    peopleNumInput.style.borderColor = "transparent";
    document.querySelector(".error-text").style.display = "none";
    document.querySelector(".error-text").textContent = ``;
    if (
      billInput.value.length > 0 &&
      peopleNumInput.value.length > 0 &&
      isFinite(peopleNumInput.value) &&
      isFinite(billInput.value) &&
      isFinite(percent[i]) &&
      +peopleNumInput.value !== 0
    ) {
      calcOutput(+billInput.value, percent[i], +peopleNumInput.value);
      resetBtn.style.backgroundColor = "var(--color-gray-light-2)";
      resetBtn.style.color = "var(--color-cyan-dark)";
      resetBtn.addEventListener("click", function () {
        let zero = 0;
        billInput.value = peopleNumInput.value = "";
        tipAmount.textContent = tipTotal.textContent = calcIntlNum(zero);
        resetBtn.style.backgroundColor = "#26c0ab3a";
        resetBtn.style.color = "var(--color-cyan-dark)";
      });
    } else if (+peopleNumInput.value === 0 && peopleNumInput.value.length) {
      peopleNumInput.style.borderColor = "var(--color-orange)";
      document.querySelector(".error-text").style.display = "inline";
      document.querySelector(".error-text").textContent = `Cant't be zero`;
    }
  })
);
