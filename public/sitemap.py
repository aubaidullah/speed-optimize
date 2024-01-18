from requests import Session
import time
from datetime import datetime
import xml.etree.ElementTree as ET

s = Session()

headers = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:99.0) Gecko/20100101 Firefox/99.0',
 'Accept': 'application/json, text/plain, */*',
 'Accept-Language': 'en-US,en;q=0.5',
 'Origin': 'https://www.kiomoi.com',
 'Connection': 'keep-alive',
 'Referer': 'https://www.kiomoi.com/',
 'Sec-Fetch-Dest': 'empty',
 'Sec-Fetch-Mode': 'cors',
 'Sec-Fetch-Site': 'same-site'}

directory = "sitemap/"

def get_package():
    f = open(f"{directory}/holidays.xml","w")
    json_data = {'av': '1.3', 'pt': 'WEBSITE', 'name': ''}
    r = s.post("https://admin.kiomoi.com/api/v1/package/list", json=json_data)
    packages = r.json()["output"]['packages']
    xml = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    for p in packages:
        name = p['name'].lower().strip().replace(' ',"-").replace("&","and").replace("--","-")
        url = "https://www.kiomoi.com/holidays/"+name+"-tour-package-"+str(p["id"])+"/"
        date = datetime.now().strftime("%Y-%m-%d")
        xml = xml+ f"<url><loc>{url}</loc><lastmod>{date}</lastmod><priority>0.85</priority></url>"
    xml += "</urlset>"

    element = ET.XML(xml)
    ET.indent(element)
    f.write(ET.tostring(element, encoding='unicode').replace('ns0:','').replace('xmlns:ns0','xmlns'))
    f.close()


def get_travelguide():
    f = open(f"{directory}/travel-guide.xml","w")
    json_data = {'av': '1.3', 'pt': 'WEBSITE', 'name': ''}
    r = s.post("https://admin.kiomoi.com/api/v1/travelguide/list", json=json_data)
    travelguide = r.json()["output"]
    xml = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    for p in travelguide:
        name = p['cityName'].lower().strip().replace(' ',"-").replace("&","and").replace("--","-")
        
        if p['geoType'] == 'STATE':
            url = f"https://www.kiomoi.com/states/{name}-{p['id']}"
            # /states/:city-:id
        elif p['geoType'] == 'CITY':
            url = f"https://www.kiomoi.com/places/{name}-{p['id']}"
        else:
            url = f"https://www.kiomoi.com/countries/{name}-{p['id']}"
            # url = f"https://www.kiomoi.com/travel-guide/india/city-{name}/{p['id']}/"  #+name+"-tour-package-"+str(p["id"])+"/"
        date = datetime.now().strftime("%Y-%m-%d")
        xml = xml+ f"<url><loc>{url}</loc><lastmod>{date}</lastmod><priority>0.85</priority></url>"
    xml += "</urlset>"
    element = ET.XML(xml)
    ET.indent(element)
    f.write(ET.tostring(element, encoding='unicode').replace('ns0:','').replace('xmlns:ns0','xmlns'))
    f.close()
    # f.write(xml)
    # f.close()    

def get_travelarticle():
    f = open(f"{directory}/article.xml","w")
    json_data = {'av': '1.3', 'pt': 'WEBSITE', 'name': ''}
    r = s.post("https://admin.kiomoi.com/api/v1/article/list", json=json_data)
    travelartile = r.json()["output"]["articles"]
    xml = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    for p in travelartile:
        # print(p['heading'])
        name = p['heading'].lower().strip().replace(' ',"-").replace("&","and").replace("--","-")
        url = "https://www.kiomoi.com/travel-articles/"+name+"-"+str(p["id"])+"/"
        date = datetime.now().strftime("%Y-%m-%d")
        xml = xml+ f"<url><loc>{url}</loc><lastmod>{date}</lastmod><priority>0.85</priority></url>"
    xml += "</urlset>"
    # f.write(xml)
    # f.close()    
    element = ET.XML(xml)
    ET.indent(element)
    f.write(ET.tostring(element, encoding='unicode').replace('ns0:','').replace('xmlns:ns0','xmlns'))
    f.close()    

get_package()
get_travelguide()
get_travelarticle()

# def get_traveguide():
#     json_data = {'av': '1.3', 'pt': 'WEBSITE', 'name': ''}
#     r = s.post("https://admin.kiomoi.com/api/v1/article/list", json=json_data)
#     travelguide = r.json()["output"]
#     xml = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
#     for p in travelguide:
#         name = p['heading'].lower().strip().replace(' ',"-").replace("&","and").replace("--","-")
#         url = "https://www.kiomoi.com/travel-articles/"+name+"/"+str(p["id"])+"/"
#         date = datetime.now().strftime("%Y-%m-%d")
#         xml = xml+ f"<url><loc>{url}</loc><lastmod>{date}</lastmod><priority>0.85</priority></url>"
#     xml += "</urlset>"
