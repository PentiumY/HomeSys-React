from flask import Flask, request, jsonify
import json
import os
import time

app = Flask(__name__)

port='8001'
host='localhost'

items = {
    1: {"title": "Main Light", "state": True}
}

logTemplate = {
    "itemChange": {"item_id": None, "new_state": None, "time": None, "address": None}
}
def logItemChange(logType, **kwargs):
    logTemp = logTemplate.get(logType)
    if logTemp:
        log_message = {key: kwargs.get(key) for key in logTemp.keys()}
        with open("itemLog.log", "a") as log_file:
            json.dump(log_message, log_file)
            log_file.write("\n")
        print("Logged:", log_message)
    else:
        print("No template found for logType:", logType)

def getItemState(id):
    return items[id]["state"]

def setItemState(id, state, saddress="local"):
    items[id]["state"] = state
    logItemChange("itemChange", item_id=id, new_state=state, time=time.time(), address=saddress)
    return items[id]["state"]

def getItemByName(name):
    for item_id, item_info in items.items():
        if item_info["title"] == name:
            return item_id
    return None

def registerItemInteraction(data, address):
    name = data["name"]
    stateToSet = data["isChecked"]

    print(address)

    itemID = getItemByName(name)
    currentItemState = getItemState(itemID)

    setItemState(itemID, stateToSet, address)

    print(f"{name} setting from {currentItemState} to {stateToSet}. Result: {getItemState(itemID)}")


@app.route('/')
def hello():
    return 'HomeSys backend server'

@app.route('/endpoint', methods=['POST'])
def get_data():
    data = request.json
    address = request.remote_addr
    registerItemInteraction(data, address)
    return jsonify({'received_data': data,'ip': address}), 200

@app.route('/endpoint', methods=['GET'])
def send_data():
    data = items
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, host=host, port=port)