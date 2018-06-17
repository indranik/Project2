#################################################
# Import Dependencies
#################################################
import datetime as dt
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine,inspect, func

import numpy as np
import json
from flask import Flask, render_template, jsonify, request

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Queries Setup
#################################################
# Create engine using the RestonDev.sqlite database file
engine = create_engine("sqlite:///static/resources/data/RestonDev.sqlite")

# Create a connection to the engine called `conn`
conn = engine.connect()
# Declare a Base using `automap_base()`
Base = automap_base()
# Use the Base class to reflect the database tables
Base.prepare(engine, reflect=True)
# Print all of the classes mapped to the Base
Base.classes.keys()
# Assign the classes
Existing = Base.classes.Existing
PlanMax = Base.classes.PlanMax
ExApp = Base.classes.ExApp
ExURApp = Base.classes.ExURApp

# Create a session
session = Session(engine)

#################################################
# Flask Routes
#################################################
@app.route("/")
def index():

    return render_template('index.html')

csvdata = pd.read_csv("static/resources/data/summaryData.csv")
slidercsvdata = pd.read_csv("static/resources/data/sliderdataclean.csv")
cleaned_slider_data = slidercsvdata[['APPLICATION_NAME','APPLICATION','D_TOTALS','D_Office','D_Retail','D_Hotel',
                     'D_Inst','D_Indus','D_NonResGFA']]

## Route to create dropdownlists
@app.route("/selectlist")
def get_select_list():
    
    data = csvdata.sort_values('TSA')
    data_selectlist = data[['TSA','Dis_SubDis', 'LUCategory']]
    data_selectlist.reset_index(inplace=True, drop=True)
    
    initial_val = "Herndon TSA"
    district_list = ["Select"]
    landuse_list = ["Select"]
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
            district_list = ["Select"]
            landuse_list = ["Select"]
    final_list['district'].append(district_list) 
    final_list['landuse'].append(landuse_list)

    select_dropdown_list = {"Herndon TSA":{"district":final_list['district'][0],"landuse":final_list['landuse'][0]},
                "Reston Town Center TSA":{"district":final_list['district'][1],"landuse":final_list['landuse'][1]},
                "Wiehle-Reston East TSA":{"district":final_list['district'][2],"landuse":final_list['landuse'][2]}}
        
    return jsonify(select_dropdown_list)

@app.route("/selectlist3/<districtsub>")
def get_select_list3(districtsub):
    
    data = csvdata.sort_values('Dis_SubDis')
    data_selectlist = data[['Dis_SubDis', 'LUCategory']]
    data_selectlist.reset_index(inplace=True, drop=True)
    
    landuse_list = ["Select"]

    allDistSubDIst = data_selectlist['Dis_SubDis']
    districts = allDistSubDIst.drop_duplicates()
    
    print("find a match for ", districtsub)
    for row in districts.iteritems():
        # textcompressed = row[1].replace(" ","")
        # if textcompressed == districtsub:
        if districtsub == row[1]:
            print("match district")
            validuse = data_selectlist.loc[data_selectlist['Dis_SubDis'] == row[1]]
            print(validuse)
            for x in validuse['LUCategory']:
                landuse_list.append(x)

    print("VALID Selection")
    print(landuse_list)

    return jsonify(landuse_list)


@app.route("/areaSelection", methods=['GET','POST'])
def areaSelection():
    
    if request.json: ### == 'POST':
        data = request.json
        print(data)
        TSA = data['TSA']
        DistSubDist = data['DistSubDist']
        LUCategory = data['LUCategory']
    else:
        TSA = ""
        DistSubDist = ""
        LUCategory = ""
    
    # Filter strings   
    EX_FilterString = ""
    PlanMax_FilterString = ""
    EXApp_FilterString = ""
    EXURApp_FilterString = ""
    
    
    if TSA != "":
        EX_FilterString = "Existing.TSA == '" + TSA + "'"
        PlanMax_FilterString = "PlanMax.TSA == '" + TSA + "'"
        EXApp_FilterString = "EXApp.TSA == '" + TSA + "'"
        EXURApp_FilterString = "EXURApp.TSA == '" + TSA + "'"
        
    if DistSubDist != "":
        if TSA != "":
            EX_FilterString = EX_FilterString +" AND Existing.Dis_SubDis == '" + DistSubDist + "'"
            PlanMax_FilterString = PlanMax_FilterString +" AND PlanMax.Dis_SubDis == '" + DistSubDist + "'"
            EXApp_FilterString = EXApp_FilterString +" AND EXApp.Dis_SubDis == '" + DistSubDist + "'"
            EXURApp_FilterString = EXURApp_FilterString +" AND EXURApp.Dis_SubDis == '" + DistSubDist + "'"
        else:
            EX_FilterString ="Existing.Dis_SubDis == '" + DistSubDist + "'"
            PlanMax_FilterString = "PlanMax.Dis_SubDis == '" + DistSubDist + "'"
            EXApp_FilterString = "EXApp.Dis_SubDis == '" + DistSubDist + "'"
            EXURApp_FilterString = "EXURApp.Dis_SubDis == '" + DistSubDist + "'"
        
    if LUCategory != "":
        if TSA != "" or DistSubDist != "":
            EX_FilterString = EX_FilterString +" AND Existing.LUCategory == '" + LUCategory + "'"
            PlanMax_FilterString = PlanMax_FilterString +" AND PlanMax.LUCategory == '" + LUCategory + "'"
            EXApp_FilterString = EXApp_FilterString +" AND EXApp.LUCategory == '" + LUCategory + "'"
            EXURApp_FilterString = EXURApp_FilterString +" AND EXURApp.LUCategory == '" + LUCategory + "'"
        elif TSA == "" and DistSubDist == "":
            EX_FilterString = "Existing.LUCategory == '" + LUCategory + "'"
            PlanMax_FilterString = "PlanMax.LUCategory == '" + LUCategory + "'"
            EXApp_FilterString = "EXApp.LUCategory == '" + LUCategory + "'"
            EXURApp_FilterString = "EXURApp.LUCategory == '" + LUCategory + "'"
            
    ExistingData = session.query(Existing.Scenario,func.sum(Existing.Office).label('Office'),\
                                func.sum(Existing.Retail).label('Retail'),\
                                func.sum(Existing.Hotel).label('Hotel'),\
                                func.sum(Existing.Institutional).label('Institutional'),\
                                func.sum(Existing.Industrial).label('Industrial'),\
                                func.sum(Existing.Nonresidential_GFA).label('Nonresidential_GFA'),\
                                func.sum(Existing.Residential_GFA).label('Residential_GFA'),\
                                func.sum(Existing.Residential_Units).label('Residential_Units')).filter(EX_FilterString).\
                                group_by(Existing.Scenario).all()
                             
    PlanMaxData = session.query(PlanMax.Scenario,func.sum(PlanMax.Office).label('Office'),\
                                func.sum(PlanMax.Retail).label('Retail'),\
                                func.sum(PlanMax.Hotel).label('Hotel'),\
                                func.sum(PlanMax.Institutional).label('Institutional'),\
                                func.sum(PlanMax.Industrial).label('Industrial'),\
                                func.sum(PlanMax.Nonresidential_GFA).label('Nonresidential_GFA'),\
                                func.sum(PlanMax.Residential_GFA).label('Residential_GFA'),\
                                func.sum(PlanMax.Residential_Units).label('Residential_Units')).filter(PlanMax_FilterString).\
                                group_by(PlanMax.Scenario).all()
    
    ExAppData = session.query(ExApp.Scenario,func.sum(ExApp.Office).label('Office'),\
                                func.sum(ExApp.Retail).label('Retail'),\
                                func.sum(ExApp.Hotel).label('Hotel'),\
                                func.sum(ExApp.Institutional).label('Institutional'),\
                                func.sum(ExApp.Industrial).label('Industrial'),\
                                func.sum(ExApp.Nonresidential_GFA).label('Nonresidential_GFA'),\
                                func.sum(ExApp.Residential_GFA).label('Residential_GFA'),\
                                func.sum(ExApp.Residential_Units).label('Residential_Units')).filter(EXApp_FilterString).\
                                group_by(ExApp.Scenario).all()
          
    ExURAppData = session.query(ExURApp.Scenario,func.sum(ExURApp.Office).label('Office'),\
                                func.sum(ExURApp.Retail).label('Retail'),\
                                func.sum(ExURApp.Hotel).label('Hotel'),\
                                func.sum(ExURApp.Institutional).label('Institutional'),\
                                func.sum(ExURApp.Industrial).label('Industrial'),\
                                func.sum(ExURApp.Nonresidential_GFA).label('Nonresidential_GFA'),\
                                func.sum(ExURApp.Residential_GFA).label('Residential_GFA'),\
                                func.sum(ExURApp.Residential_Units).label('Residential_Units')).filter(EXURApp_FilterString).\
                                group_by(ExURApp.Scenario).all()
                                                      
    ExistingDataDF = pd.DataFrame(ExistingData)
    PlanMaxDataDF = pd.DataFrame(PlanMaxData)
    ExAppDataDF = pd.DataFrame(ExAppData)
    ExURAppDataDF = pd.DataFrame(ExURAppData)
    
    Testframes = [ExistingDataDF, PlanMaxDataDF, ExAppDataDF,ExURAppDataDF]
    
    summaryTableDF = pd.concat(Testframes)
    
    ## Prevent erro if selection has no data (data frame is empty)
    if not summaryTableDF.empty:
        summaryTableDF['percent_residential'] = round(100*(summaryTableDF['Residential_GFA']/(summaryTableDF['Residential_GFA']+summaryTableDF['Nonresidential_GFA'])))
        # store information for gauges
        summaryTableDF.to_csv("static/resources/data/selection.csv")   
        nicetable = summaryTableDF[["Scenario", "Office", "Retail", "Hotel","Institutional", "Industrial","Residential_GFA"]]
        nicetable = nicetable.set_index("Scenario")
        return jsonify(nicetable.to_html())
    else:
        return jsonify("This selection has no data, please select a different option...... ")


@app.route("/gauges")
def gauge():
    filtered_selection = pd.read_csv("static/resources/data/selection.csv")
    # check that selection has returned value
    
    if len(filtered_selection) == 0:
        percentages = [0,0,0,0]
        return jsonify(percentages)     
    
    # get the percentages passed to JS
    percentages = []
    for p in filtered_selection["percent_residential"]:
        percentages.append(p)
    
    print(percentages)
    return jsonify(percentages)

@app.route("/sliderdropdownlist")
def sliderddl():
    sliderDropdownList = []
    for row in range(len(cleaned_slider_data.APPLICATION_NAME)):
        sliderDropdownList.append(cleaned_slider_data.APPLICATION_NAME[row])
    
    return jsonify(sliderDropdownList)
@app.route('/get_map')
def get_map():
    return jsonify("../map.html")

#@app.route("/sliderdata")
#def sliderdata():
#    sliderDropdownList = []
#    for row in range(len(cleaned_slider_data.APPLICATION_NAME)):
#        sliderDropdownList.append(cleaned_slider_data.APPLICATION_NAME[row])
#    
#    return jsonify(sliderDropdownList)
    

if __name__ == "__main__":
    app.run(debug=True)