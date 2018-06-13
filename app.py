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


@app.route("/unique")
def unique():
    
    unique_id=[]
    for unique in csvdata["UniqueID"]:
        u = unique.replace(" ", "")
        u = u.replace(":","")
        unique_id.append(u)
    return (jsonify(unique_id))


@app.route("/table/<uniqueid_selection>")
def table(uniqueid_selection):
    data = csvdata
    data['id'] = data['UniqueID'].str.replace(" ","")
    data['UniqueID'] = data['id'].str.replace(":","")
    row_selected = data.loc[data['UniqueID'] == uniqueid_selection]

    off_col = ('EX_OffSQFT', 'MR_OFF_SQFT','EARMR_OffSQFT','EUARMR_OffSQFT')
    ret_col = ('EX_RetSQFT', 'MR_RET_SQFT', 'EARMR_RetSQFT', 'EUARMR_RetSQFT')
    hot_col = ('EX_HotSQFT', 'MR_HOT_SQFT', 'EARMR_HotSQFT', 'EUARMR_HotelSQFT')
    ins_col = ('EX_InstSQFT', 'MR_INS_SQFT', 'EARMR_InstSQFT', 'EUARMR_InstSQFT')
    ind_col = ('EX_IndusSQFT', 'MR_IND_SQFT', 'EARMR_IndusSQFT', 'EUARMR_IndusSQFT')
    res_col = ('EX_ResSQFT', 'MR_ResGFA','EARMR_ResSQFT','EUARMR_ResSQFT')
    office = []
    for col in off_col:
        office.append(row_selected[col].item())
    retail = []
    for col in ret_col:
        retail.append(row_selected[col].item())
    hotel = []
    for col in hot_col:
        hotel.append(row_selected[col].item())
    institute = []
    for col in ins_col:
        institute.append(row_selected[col].item())
    indust = []
    for col in ind_col:
        indust.append(row_selected[col].item())
    residen = []
    for col in res_col:
        residen.append(row_selected[col].item())

    label = ['Existing','Plan','Development','Review']
    
    newtable = {
        'label' : label,
        'Office': office,
        'Retail':retail,
        'Hotel':hotel,
        'Industry':indust,
        'Institutions': institute,
        'Residential':residen}
    newtable_df = pd.DataFrame(newtable)
    newtable_df['Total'] = (newtable_df['Residential']+ newtable_df['Hotel']+ newtable_df['Office']+
                            newtable_df['Institutions']+
                            newtable_df['Retail']+
                            newtable_df['Industry'])
    newtable_df['Percent Residential'] = 100*(newtable_df['Residential']/newtable_df['Total'])
    filtered_selection = newtable_df.set_index('label')

    filtered_selection.to_csv("static/resources/data/selection.csv")
    

    return jsonify(filtered_selection.to_html())

@app.route("/gauges")
def gauge():
    filtered_selection = pd.read_csv("static/resources/data/selection.csv")

    percentages = []
    for p in filtered_selection["Percent Residential"]:
        percentages.append(p)

    return jsonify(percentages)

if __name__ == "__main__":
    app.run(debug=True)