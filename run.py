from flask import Flask, request, render_template
import json
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


#This route is for getting client data, it has built in error handling to make sure valid inputs are presented, rather
#than relying on the HTML to provide proper validation.

@app.route('/getClientData', methods=['POST'])
def getClientData():
    url = "https://api-gateway-dev.phorest.com/third-party-api-server/api/business/eTC3QY5W3p_HmGHezKfxJw/client?"
    clientInfo = request.form['clientInfo']
    type = request.form['type']
    if type == "email":
        if "@" not in clientInfo:
            return "-10"
        else:
            url += "email="
            clientInfo = clientInfo.replace("@", "%40")
            url += clientInfo+"%20&page=0&size=20"
            url = url.replace(" ", "")
            r = requests.get(url, auth=('global/cloud@apiexamples.com', 'VMlRo/eh+Xd8M~l'))
            r = r.json()
            return json.dumps(r)
    else:
        try:
            testPhone = int(clientInfo)
            url += "page=0&phone=" +clientInfo+"&size=20"
            url = url.replace(" ", "")
            r = requests.get(url, auth=('global/cloud@apiexamples.com', 'VMlRo/eh+Xd8M~l'))
            r = r.json()
            return json.dumps(r)
        except ValueError:
            return "-20"


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000,debug=True)
