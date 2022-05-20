import pandas as pd
import pymysql
from urllib.request import urlopen

import requests
import json

url = 'http://api.vworld.kr/req/address?'
params = 'service=address&request=getcoord&version=2.0&crs=epsg:4326&refine=true&simple=false&format=json&type='
road_type = 'ROAD'
address = '&address='
keys = '&key='
primary_key = '020FF5A0-6867-3445-8138-B70BE9BE97BF'


conn = pymysql.connect(host='k6d101.p.ssafy.io', user='seungwon', password='ssafyd101!', db='ecologdb', charset='utf8')
cursor = conn.cursor()

sql_insert = """
        INSERT INTO trash_can (user_no, location, address) VALUES (%s, ST_GEOMFROMTEXT(%s, 4326), %s)
    """

data = pd.read_csv('./data.csv', encoding='cp949')
cnt_success = 0
cnt_fail = 0
cnt_temp = 0

flag = True
flag_cnt = 0

lst = []


for adr in data['세부 위치(상세 주소)']:
    try:
        page = requests.get(url + params + road_type + address + adr + keys + primary_key)
    except:
        page1 = urlopen(url + params + road_type + address + adr + keys + primary_key)
        doc = page1.read().decode('utf-8')
        dic = json.loads(doc)
        if dic['response']['status'] != 'NOT_FOUND' and dic['response']['status'] != 'ERROR':
            lst.append(url + params + road_type + address + adr + keys + primary_key)


    json_data = page.json(strict=False)
    status = json_data['response']['status']
    if status == 'NOT_FOUND' or status == 'ERROR':
        cnt_fail += 1
        continue

    x = json_data['response']['result']['point']['x']
    y = json_data['response']['result']['point']['y']
    
    insert_data = ['42']
    location = 'POINT({} {})'.format(y, x)
    print(location)
    insert_data.append(location)
    insert_data.append(adr)

    cursor.execute(sql_insert, insert_data)
    conn.commit()
    cnt_success += 1

conn.close()

print('실패 횟수  : {}'.format(cnt_fail))
print('성공 횟수  : {}'.format(cnt_success))
print(lst)