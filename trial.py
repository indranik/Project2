#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Jun 11 10:01:06 2018

@author: niyatidesai
"""

def get_select_list():
    data = pd.read_csv("resources/data/summaryData.csv")
    data = data.sort_values('TSA')
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

    select_dropdown_list = [{"Herndon TSA":{"district":final_list['district'][0],"landuse":final_list['landuse'][0]},
                "Reston Town Center TSA":{"district":final_list['district'][1],"landuse":final_list['landuse'][1]},
                "Wiehle-Reston East TSA":{"district":final_list['district'][2],"landuse":final_list['landuse'][2]}}]
        
#    return jsonify(select_dropdown_list)
    print(select_dropdown_list)
    
get_select_list()