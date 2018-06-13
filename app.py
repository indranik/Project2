#################################################
# Import Dependencies
#################################################
import datetime as dt
import pandas as pd

from flask import Flask, render_template, jsonify

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################
@app.route("/")
def index():
    return render_template('index.html')

csvdata = pd.read_csv("static/resources/data/summaryData.csv")

## Route to create dropdownlists
@app.route("/selectlist")
def get_select_list():
    
    data = csvdata.sort_values('TSA')
    data_selectlist = data[['TSA','Dis_SubDis', 'LUCategory']]
    data_selectlist.reset_index(inplace=True, drop=True)
    
    initial_val = "Herndon TSA"
    district_list = []
    landuse_list = []
    final_list = {}
    final_list['district'] = []
    final_list['landuse'] = []

    for row1 in range(len(data_selectlist.TSA)-1):
        if data_selectlist.TSA[row1] == initial_val:
            if data_selectlist.Dis_SubDis[row1] not in district_list:
                district_list.append(data_selectlist.Dis_SubDis[row1])
            if data_selectlist.LUCategory[row1] not in landuse_list:
                landuse_list.append(data_selectlist.LUCategory[row1])
        
        else:
            final_list['district'].append(district_list)
            final_list['landuse'].append(landuse_list)        
            initial_val = data_selectlist.TSA[row1]
            district_list = []
            landuse_list = []
    final_list['district'].append(district_list) 
    final_list['landuse'].append(landuse_list)

    select_dropdown_list = {"Herndon TSA":{"district":final_list['district'][0],"landuse":final_list['landuse'][0]},
                "Reston Town Center TSA":{"district":final_list['district'][1],"landuse":final_list['landuse'][1]},
                "Wiehle-Reston East TSA":{"district":final_list['district'][2],"landuse":final_list['landuse'][2]}}
        
    return jsonify(select_dropdown_list)


@app.route("/submit")
def submit():
    filtered_selection = pd.read_csv("static/resources/data/TableExample.csv")
 
    return jsonify(filtered_selection.to_html())

if __name__ == "__main__":
    app.run(debug=True)