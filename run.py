from flask import Flask, request, render_template
import json
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/getClientData', methods=['POST'])
def getClientData():
    url = "https://api-gateway-dev.phorest.com/third-party-api-server/api/business/eTC3QY5W3p_HmGHezKfxJw/client?"
    clientInfo = request.form['clientInfo']
    if "@" in clientInfo:
        url += "email="
        clientInfo = clientInfo.replace("@", "%40")
        url += clientInfo+"%20&page=0&size=20"
        url = url.replace(" ", "")
        print(url)
        r = requests.get(url, auth=('global/cloud@apiexamples.com', 'VMlRo/eh+Xd8M~l'))
        r = r.json()
        return json.dumps(r)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000,debug=True)
