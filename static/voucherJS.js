function voucherPOST(client) {
    let balance = parseFloat(document.getElementById('balance').value);
    let currentTime = new Date();
    currentTime = currentTime.toISOString();
    let voucherBody = {
        "clientId": client,
        "creatingBranchId": "SE-J0emUgQnya14mOGdQSw",
        "expiryDate": currentTime,
        "issueDate": currentTime,
        "links": [
            {
                "href": "string",
                "rel": "string",
                "templated": true
            }
        ],
        "originalBalance": balance
    };
    let voucherHttpReq = new XMLHttpRequest();
    let  url = "https://api-gateway-dev.phorest.com/third-party-api-server/api/business/eTC3QY5W3p_HmGHezKfxJw/voucher";
    voucherHttpReq.open("POST", url, true);
    voucherHttpReq.setRequestHeader('content-type', 'application/json;charset=UTF-8');
    voucherHttpReq.setRequestHeader("Authorization", "Basic " + btoa('global/cloud@apiexamples.com:VMlRo/eh+Xd8M~l'));
    voucherHttpReq.send(JSON.stringify(voucherBody));
    voucherHttpReq.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 201) {
            document.getElementById('clientSearch').disabled = true;
            document.getElementById('phone').disabled = true;
            document.getElementById('balance').disabled = true;
            document.getElementById('voucherResults').style.display="block";
            document.getElementById('voucherResults').innerHTML =
                "<div style = 'text-align:center'>"+
                "<h3>Voucher successfully created!</h3>" +
                "<br><button class='btn btn-primary' type = 'submit' onclick='resetPage()'>Start Over</button>" +
                "</div>"
        }
        else if (this.readyState === 4 && this.status !== 201) {
            document.getElementById('voucherResults').style.display="block";
            document.getElementById('voucherResults').innerHTML =
                "<h3 style = 'text-align: center'>There was an error creating the voucher, check all the details and try again!</h3>"
        }
    }

}

function voucherCreate(i) {
    document.getElementById('voucherResults').innerHTML = "";
    let client = document.getElementById(i).innerText;
    document.getElementById('voucherBalance').style.display = "block";
    document.getElementById('voucherBalance').innerHTML =
        "<br><div id = 'balanceAmount' style='text-align: center'><h4>Creating a voucher for client ID: " + client +" </h4><br><h5>Please enter a balance to use: </h5>" +
        '<input type="number" step = ".01" id="balance" placeholder="Enter balance (euros)..." autocomplete="off"><br><br>'+
        '<button class="btn btn-primary" type = "submit" onclick="voucherPOST(\''+client+'\')">Create Voucher</button></div>';
}