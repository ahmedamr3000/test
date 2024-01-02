var SiteNameInput = document.getElementById("SiteName");
var SiteURLInput = document.getElementById("SiteURL");
var alertMessage = document.getElementById("alertMessage");

var productList = [];

if (localStorage.getItem("products") != null) {
  productList = JSON.parse(localStorage.getItem("products"));
  display();
}

function addProduct() {
  if (rejexName() && rejexUrl()) {
    var product = {
      siteName: SiteNameInput.value,
      SiteURL: SiteURLInput.value,
    };
    productList.push(product);
    localStorage.setItem("products", JSON.stringify(productList));

    clear();
    display();
  } else {
    alertMessage.classList.remove("d-none");
  }
}

function clear() {
  SiteNameInput.value = "";
  SiteURLInput.value = "";
}

function display() {
  var displayList = "";
  for (var i = 0; i < productList.length; i++) {
    displayList += `<tr>
<td>${[i]}</td>
<td>  ${productList[i].siteName}</td>
<td><button class="btn btn-warning">  <a href="${
      productList[i].SiteURL
    }"><i class="fa-solid fa-eye col"></i> Visit </a</button></td>
<td> <button  onclick="deletItem(${i})" class="btn btn-danger"> <i class="fa-solid fa-trash"></i> Delete </button></td>
</tr>`;
  }
  document.getElementById("tableContent").innerHTML = displayList;
}

function deletItem(index) {
  productList.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(productList));
  display();
}

function rejexName() {
  var text = SiteNameInput.value;
  var rejex = /^[A-Z][a-z]{3,8}$/;

  if (rejex.test(text)) {
    SiteNameInput.classList.add("is-valid");
    SiteNameInput.classList.remove("is-invalid");
    return true;
  } else {
    SiteNameInput.classList.add("is-invalid");
    SiteNameInput.classList.remove("is-valid");
    return false;
  }
}

function rejexUrl() {
  var text = SiteURLInput.value;
  var rejex = /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/;
  if (rejex.test(text)) {
    SiteURLInput.classList.add("is-valid");
    SiteURLInput.classList.remove("is-invalid");
    return true;
  } else {
    SiteURLInput.classList.add("is-invalid");
    SiteURLInput.classList.remove("is-valid");
    return false;
  }
}

function removeDnone() {
  alertMessage.classList.add("d-none");
}
