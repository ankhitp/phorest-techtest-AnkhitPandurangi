/**
 * The chooseInput function will show a div based on whether the user selects 'email' or 'phone'
 */
function chooseInput() {
    let data =  document.getElementById('typeSelect').value;

    if (data === "email") {
        document.getElementById('enterEmail').style.display = "block";
        document.getElementById('enterPhone').style.display = "none";
        if (document.getElementById('balanceAmount') !== null) {
            document.getElementById('balanceAmount').innerHTML = "";
        }
        document.getElementById("clientList").innerHTML = "";
        document.getElementById("phone").value = "";

    }
    else if (data === "phone") {
        document.getElementById('enterEmail').style.display = "none";
        document.getElementById('enterPhone').style.display = "block";
        if (document.getElementById('balanceAmount') !== null) {
            document.getElementById('balanceAmount').innerHTML = "";
        }
        document.getElementById("clientList").innerHTML = "";
        document.getElementById("clientSearch").value = "";
    }
    //if switched back to "select an option"
    else {
        document.getElementById('enterEmail').style.display = "none";
        document.getElementById('enterPhone').style.display = "none";
        if (document.getElementById('balanceAmount') !== null) {
            document.getElementById('balanceAmount').innerHTML = "";
        }
        document.getElementById("clientList").innerHTML = "";
    }
}

/**
 * The reset page sets the page back to its original state (as it is when the page is loaded)
 */
function resetPage() {
    $('#voucherModal').modal('hide');
    document.getElementById("clientSearch").value = "";
    document.getElementById("phone").value = "";
    document.getElementById('typeSelect').value = 'default';
    document.getElementById('enterEmail').style.display = "none";
    document.getElementById('enterPhone').style.display = "none";
    document.getElementById('clientList').innerHTML = "";
    document.getElementById('voucherBalance').innerHTML = "";
    document.getElementById('voucherResults').innerHTML = "";
    document.getElementById('clientSearch').disabled = false;
    document.getElementById('phone').disabled = false;
    document.getElementById('balance').disabled = false;
}

//check if enter key is pressed for email input, and trigger button if pressed.
let emailIn = document.getElementById('clientSearch');
emailIn.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        document.getElementById("emailSearch").click();
    }
});

//check if enter key is pressed for phone input, and trigger button if pressed.
let phoneIn = document.getElementById('phone');
phoneIn.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        document.getElementById("phoneSearch").click();
    }
});