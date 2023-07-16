document.addEventListener("DOMContentLoaded", function() {
  
var count = 0;
  var interval = setInterval(function() {
 if (count >= 3) {
      clearInterval(interval);
      return;
    }
    const url = window.location.href;
    var parts = url.split("/");
    var username = parts[parts.length - 1];
if (username.includes("?")) {
  username = username.split("?")[0];
}
    var objectId;

    const url1 = `https://api.vk.com/method/utils.resolveScreenName?api_id=6798836&method=utils.resolveScreenName&format=json&v=5.131&screen_name=${username}&lang=ru&access_token=vk1.a.gfERILKwQzIiJ65ICvd9hkDcV4RBkxmg6hKw67CNvZExm2QJxARtcyerJvM8yyuDDtqPJQHeukrCGgb_1zk8WuyCyK4I5fPTYS47o_FJL_yfvQWrKJz-Zl_08Fx7ECWIVirG0Klc986n00mFZed7whCYZ0-8ZVykT3ADN12pnViQjqEZueJCnYLpI4ECZA8U&request_id=7`;

    fetch(url1)
      .then(response => response.json())
      .then(data => {
        // Получение значения переменной objectId внутри блока .then()
        objectId = data.response.object_id;
        console.log("ID fetched succesfully: " + objectId);

        var newElement = document.createElement("a");
        newElement.className = "ms_item ms_item_gift _type_gift";
        newElement.tabIndex = "0";
        newElement.style.position = "absolute";
        newElement.style.marginTop = "-50px";
        newElement.style.display = "block";
        newElement.style.color = "rgb(40, 84, 115)";
        newElement.innerHTML = 'Отправить подарок';
        newElement.href = "/gifts" + objectId + "?act=send&ref=profile_module";
        document.querySelector("#profile_redesigned").appendChild(newElement);
      })
      .catch(error => {
        // Обработка ошибок, если таковые возникнут
        console.error('Ошибка:', error);
      }); count++;
  }, 1000); // 10 секунд
});