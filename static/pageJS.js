function chooseInput() {
    let data =  document.getElementById('typeSelect').value;
    if (data === "email") {
        document.getElementById('enterEmail').style.display = "block";
        document.getElementById('enterPhone').style.display = "none";
        document.getElementById('balanceAmount').innerHTML = "";
        document.getElementById("clientList").innerHTML = "";
    }
    else if (data === "phone") {
        document.getElementById('enterEmail').style.display = "none";
        document.getElementById('enterPhone').style.display = "block";
        document.getElementById('balanceAmount').innerHTML = "";
        document.getElementById("clientList").innerHTML = "";
    }
}



function resetPage() {
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
