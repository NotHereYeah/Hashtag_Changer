
let get_hashtag = document.getElementById("input_data");

let status = document.getElementById("Status");

let data_obj = {
  Hashtag: "",
  Script: "",
  ip_client: ""
};

function displayRadioValue() {
  if (get_hashtag.value.length !== 0) {
    var ele = document.getElementsByName("drone");
    data_obj.Hashtag = get_hashtag.value;

    for (i = 0; i < ele.length; i++) {
      if (ele[i].checked) {
        console.log(ele[i].id);
        data_obj.Script = ele[i].id;
      }
    }
    send_Hashtag(data_obj)
    status.style = "color: green";
    status.innerHTML = "status: PASSED 1/2";
  } else {
    status.style = "color: red";
    status.innerHTML = "status: write a correct hashtag";
  }
}

async function send_Hashtag(sending_data) {
  let res_ip = await fetch('https://api.ipify.org?format=json')
  res_ip = await res_ip.json()
  let data_ip = res_ip.ip
  data_obj.ip_client = data_ip

  status.innerHTML = "status: PASSED 2/2";
  let send = await fetch(
    "https://hashtag-changer-default-rtdb.firebaseio.com/save_hashtag.json",
    {
      method: "PUT",
      Headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sending_data)
    }
  );
  status.innerHTML = "status: Done";
}
