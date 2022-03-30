window.onload = () => {
  document.querySelector(".button").addEventListener("click", checkForm);
};
function checkForm() {
  let regExpName = /^[a-zа-я]+$/i;
  let regExpPhone = /^(\+7\()\d{3}\)\d{3}-\d{4}$/;
  let regExpMail = /[a-z0-9\.\_\-]+@[a-z]+.[a-z]{2,4}$/i;

  let name = document.querySelector(".name");
  let phone = document.querySelector(".phone");
  let mail = document.querySelector(".mail");

  let regArr = [regExpName, regExpPhone, regExpMail];
  let userText = [name, phone, mail];

  function check(regExp, text) {
    for (let i = 0; i < regExp.length; i++) {
      if (regExp[i].test(text[i].value) == true)
        text[i].classList.remove("red");
      else {
        text[i].classList.add("red");
        alert(`вы сделали ошибку в поле ${text[i].name}`);
      }
    }
  }
  check(regArr, userText);

  /*
    function check(regExp, string) {
      if (regExp.test(string.value) == true) string.classList.remove("red");
      else string.classList.add("red");
    }
  
    check(regExpName, name);
    check(regExpPhone, phone);
    check(regExpMail, mail);
  */
}
