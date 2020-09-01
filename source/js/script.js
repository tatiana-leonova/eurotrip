// Мобильное меню

var navMain = document.querySelector(".main-nav");
var navToggle = document.querySelector(".main-nav__toggle");

navMain.classList.remove("main-nav--nojs");

function changeState() {
  navMain.classList.toggle("main-nav--closed");
  navMain.classList.toggle("main-nav--opened");
}

navToggle.onclick = function () {
  changeState();
};

changeState();

// Модальное окно покупки тура + окно успешной отправки

const overlayForm = document.querySelector(".overlay--form");
const packagePricesButton = document.querySelectorAll(
  ".package-prices__button"
);
const tabContentButton = document.querySelectorAll(".tab-content__button");
const popupClose = document.querySelector(".popup__close");
const buttonBuySubmitForm = document.querySelector(".form__button--buy");
const buttonFeedbackSubmitForm = document.querySelector(
  ".form__button--feedback"
);
const overlaySuccess = document.querySelector(".overlay--success");
const phoneFeedback = document.querySelector(".form__input--tel-feedback");
const emailFeedback = document.querySelector(".form__input--email-feedback");
const phoneBuy = document.querySelector(".form__input--tel-buy");
const emailBuy = document.querySelector(".form__input-email-buy");

buttonBuySubmitForm.addEventListener("click", onBuySubmitClick);
buttonFeedbackSubmitForm.addEventListener("click", onFeedbackSubmitClick);

if (overlayForm) {
  packagePricesButton.forEach(function (item) {
    item.addEventListener("click", openOrderForm);
  });

  tabContentButton.forEach(function (item) {
    item.addEventListener("click", openOrderForm);
  });

  closeOverlay(overlayForm);
  popupClose.addEventListener("click", closeOrderForm);
}

function openOrderForm(event) {
  const element = event.target;

  event.preventDefault();
  overlayForm.classList.add("overlay--opened");
}

function closeOrderForm(event) {
  const element = event.target;

  if (
    element.classList.contains("overlay--form") ||
    element.classList.contains("overlay--success") ||
    event.keyCode === 27 ||
    element.classList.contains("popup__close-icon")
  ) {
    overlayForm.classList.remove("overlay--opened");
    overlaySuccess.classList.remove("overlay--opened");
  }
}

function onBuySubmitClick(event) {
  event.preventDefault();
  updateFields(phoneBuy, emailBuy);
  validateform(
    phoneBuy,
    emailBuy,
    function (isPhoneValid, isEmailValid) {
      submitError(phoneBuy, emailBuy, isPhoneValid, isEmailValid);
    },
    function () {
      submitSuccess();
    }
  );
}

function onFeedbackSubmitClick(event) {
  event.preventDefault();
  updateFields(phoneFeedback, emailFeedback);
  validateform(
    phoneFeedback,
    emailFeedback,
    function (isPhoneValid, isEmailValid) {
      submitError(phoneFeedback, emailFeedback, isPhoneValid, isEmailValid);
    },
    function () {
      submitSuccess();
    }
  );
}

function closeOverlay(overlayItem) {
  window.addEventListener("keydown", closeOrderForm);
  overlayItem.addEventListener("click", closeOrderForm);
}

function submitSuccess() {
  closeOverlay(overlaySuccess);
  overlayForm.classList.remove("overlay--opened");
  overlaySuccess.classList.add("overlay--opened");
}

// Валидация формы

function updateFields(phone, email) {
  phone.classList.remove("form__input--error");
  email.classList.remove("form__input--error");
}

function submitError(phone, email, isPhoneValid, isEmailValid) {
  if (!isPhoneValid) {
    phone.classList.add("form__input--error");
  }
  if (!isEmailValid) {
    email.classList.add("form__input--error");
  }
}

function validateform(phone, email, error, success) {
  const isPhoneValid = validatePhone(phone.value);
  const isEmailValid = validateEmail(email.value);
  if (isPhoneValid && isEmailValid) {
    success();
  } else {
    error(isPhoneValid, isEmailValid);
  }
}
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !email || re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
  return (
    phone.length > 0 && phone.match(/\d/g) && phone.match(/\d/g).length === 10
  );
}

// Переключение табов

const tabTitles = document.querySelectorAll(".tab-countries__item-link");
const tabContents = document.querySelectorAll(".tab-content__item");
const tabActive = document.querySelectorAll(".tab-content");

tabTitles.forEach(function (title) {
  title.addEventListener("click", function (event) {
    event.preventDefault();
    tabContents.forEach(function (content) {
      if (title.dataset.name === content.id) {
        title.classList.add("tab-countries__item-link--active");
        content.classList.remove("tab-content__item--hide");
      } else {
        title.classList.remove("tab-countries__item-link--active");
        content.classList.add("tab-content__item--hide");
      }
    });
  });
});

// Кнопка Смотреть тур якорь, который ведёт к вкладкам (табам) со странами.

const tourItemsLink = document.querySelectorAll(".tours__item-link");

tourItemsLink.forEach(function (tour) {
  tour.addEventListener("click", function (event) {
    tabTitles.forEach(function (title) {
      if (tour.dataset.name === title.dataset.name) {
        title.classList.add("tab-countries__item-link--active");
      } else {
        title.classList.remove("tab-countries__item-link--active");
      }
    });
    tabContents.forEach(function (content) {
      if (tour.dataset.name === content.id) {
        content.classList.remove("tab-content__item--hide");
      } else {
        content.classList.add("tab-content__item--hide");
      }
    });
  });
});
