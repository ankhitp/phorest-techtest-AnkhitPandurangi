/**
 * the voucherPOST function gets the balance that the user enters, then creates the voucher JSON body for the API. It
 * leaves the serial number blank for the voucher, so that it is auto generated. It uses the clientId provided as a
 * parameter. The expiry date and issue date are the same as in the API example. It then queries the API, and if the
 * API returns a valid 201 response, it disables all the inputs and prompts the user to start the process again. Otherwise,
 * it tells the user to check all details and change any incorrect ones.
 *
 *
 * @param client is the client ID for the client that we want to create a voucher for.
 */
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
    
    let  url = "https://api-gateway-dev.phorest.com/third-party-api-server/api/business/eTC3QY5W3p_HmGHezKfxJw/voucher";
    let voucherHttpReq = new XMLHttpRequest();
    
    voucherHttpReq.open("POST", url, true);
    voucherHttpReq.setRequestHeader('content-type', 'application/json;charset=UTF-8');
    voucherHttpReq.setRequestHeader("Authorization", "Basic " +
        btoa('global/cloud@apiexamples.com:VMlRo/eh+Xd8M~l'));        
    voucherHttpReq.send(JSON.stringify(voucherBody));

    voucherHttpReq.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 201) {
            let table = "<table id = 'myTable' border='1' align = 'center'>";
            table += "<tr>" +
                "<th style = 'text-align:center'>Voucher ID</th>" +
                "<th>Voucher Serial</th></tr>";
            let voucherId = JSON.parse(this.responseText);
            voucherId = voucherId['voucherId'];
            let voucherSerial = JSON.parse(this.responseText);
            voucherSerial = voucherSerial['serialNumber'];
            table += "<tr><td>" + voucherId +  "</td>";
            table += "<td>" + voucherSerial+ "</td></tr>";
            table += "</table>";
            document.getElementById('clientSearch').disabled = true;
            document.getElementById('phone').disabled = true;
            document.getElementById('balance').disabled = true;
            document.getElementById('voucherResults').style.display="block";
            document.getElementById('voucherResults').innerHTML =
                "<div style = 'text-align:center'>"+
                "<h4>Voucher successfully created!</h4>" +
                table +
                "<br><button class='btn btn-primary' type = 'submit' onclick='resetPage()'>Start Over</button>"+
                "</div>"
        }
        else if (this.readyState === 4 && this.status !== 201) {
            document.getElementById('voucherResults').style.display="block";
            document.getElementById('voucherResults').innerHTML =
                "<h5 style = 'text-align: center'>There was an error creating the voucher, check all the details" +
                " and try again!</h5>"
        }
    }

}


/**
 * The voucher create function creates the "balance" field for the user to input a balance for the voucher they want
 * to create for the client.
 *
 * @param i indicates which client was selected by the user. The client ID for the user is printed out on the page
 * to let the user know which one they have selected.
 */
function voucherCreate(i) {
    document.getElementById('voucherResults').innerHTML = "";
    let client = document.getElementById(i).innerText;
    document.getElementById('modalBody').innerHTML =
        "<br><div id = 'balanceAmount' style='text-align: center'><h4>Creating a voucher for client ID: " + client +
        " </h4><br><h5>Please enter a balance to use: </h5>" +
        '<input type="number" step = ".01" id="balance" placeholder="Enter balance (euros)..." autocomplete="off"><br><br>'+
        '<button class="btn btn-primary" type = "submit" onclick="voucherPOST(\''+client+'\')">Create Voucher</button></div>';
}