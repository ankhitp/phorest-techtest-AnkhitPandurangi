/**
 * The sendReq function does two things. It builds the HTML for a table that will hold the list of clients that match
 * the email or phone # that was entered. It also makes a POST request to the Flask backend, which will carry out the GET
 * request to retrieve the client list from the API.
 *
 * @param data is the email or phone number that will be used to search for clients
 * @param type is either email or phone number
 */
function sendReq(data, type) {
    let table = "<table id = 'myTable' border='1' align = 'center'>";

    table += "<tr>" +
        "<th style = 'text-align:center'>Name</th>" +
        "<th>Mobile</th>" +
        "<th>Email</th>" +
        "<th>Client ID</th></tr>";

    let clientHttpReq = new XMLHttpRequest();
    clientHttpReq.open("POST", "/getClientData", true);
    clientHttpReq.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    clientHttpReq.send("clientInfo="+data+"&type="+type);

    clientHttpReq.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            //a response of -10 indicates the email entered is an invalid format
            if (this.responseText === "-10") {
                document.getElementById("clientList").style.display = "block";
                document.getElementById('clientList').innerHTML = "<h3 style='text-align: center'>You entered " +
                    "an invalid email address. Please try again!</h3>"
            }
            //a response of -20 indicates the phone number entered is an invalid format
            else if (this.responseText === "-20") {
                document.getElementById("clientList").style.display = "block";
                document.getElementById('clientList').innerHTML = "<h3 style='text-align: center'>You entered " +
                    "an invalid phone number. Please try again!</h3>"
            }
            //otherwise the response is valid and will populate the table with the result(s)
            else {
                let flaskJsonReturn = JSON.parse(this.responseText);
                document.getElementById("clientList").style.display = "block";
                
                if (flaskJsonReturn['_embedded'] !== undefined) {
                    for (let i = 0; i < (flaskJsonReturn['_embedded']['clients']).length; i++) {
                        table += "<tr id = 'tr"+i+"' onclick = 'voucherCreate("+i+")' data-toggle='modal' data-target='#voucherModal'><td>" +
                            flaskJsonReturn['_embedded']['clients'][i]['firstName'] + " " +
                            flaskJsonReturn['_embedded']['clients'][i]['lastName'] + "</td>";
                        table += "<td>" + flaskJsonReturn['_embedded']['clients'][i]['mobile'] + "</td>";
                        table += "<td>" + flaskJsonReturn['_embedded']['clients'][i]['email'] + "</td>";
                        table += "<td id = '" + i + "'>" + flaskJsonReturn['_embedded']['clients'][i]['clientId'] + "</td></tr>";
                    }
                    table += "</table>";

                    document.getElementById("clientList").innerHTML = "<h1 style='text-align: center'>Choose a " +
                        "client to create a voucher for!</h1>" + table;
                } else {
                    document.getElementById("clientList").innerHTML = "<p style='text-align: center'>Sorry, " +
                        "no results for that email/phone number!</p>"

                }
            }
        }
    }
}