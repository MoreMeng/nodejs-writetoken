let j = JSON.parse(`{"S:Envelope":{"$":{"xmlns:S":"http://schemas.xmlsoap.org/soap/envelope/"},"S:Body":[{"ns2:searchCurrentByPIDResponse":[{"$":{"xmlns:ns2":"http://tokenws.ucws.nhso.go.th/"},"return":[{"birthdate":["25260912"],"count_select":["0"],"fname":["ธนิกุล"],"hmain":["10689"],"hmain_name":["รพ.อ่างทอง"],"lname":["ศรีอุทิศ"],"maininscl":["SSS"],"maininscl_main":["S"],"maininscl_name":["สิทธิประกันสังคม"],"nation ":["099"],"person_id":["3150300174300"],"primary_amphur_name":["ป่าโมก"],"primary_moo":["05"],"primary_mooban_name":["บ้านคลองคะเชนทร์"],"primary_province_name":["อ่างทอง"],"primary_tumbon_name":["สายทอ ง"],"primaryprovince":["1500"],"purchaseprovince":["1500"],"purchaseprovince_name":["อ่างทอง"],"sex":["1"],"startdate":["25600101"],"startdate_sss":["25600101"],"subinscl":["S1"],"subinscl_name":["สิทธิ เบิกกองทุนประกันสังคม (ผู้ประกันตน)"],"title":["003"],"title_name":["นาย"],"ws_data_source":["NHSO"],"ws_date_request":["2020-11-11T11:05:37+07:00"],"ws_status":["NHSO-000001"],"ws_status_desc":["ok"]," wsid":["WS000009765729244"],"wsid_batch":["WSB00002072559955"]}]}]}]}}`);

let profile = j["S:Envelope"]["S:Body"][0]["ns2:searchCurrentByPIDResponse"][0]["return"][0]

// console.log(profile)
// console.log(profile.person_id[0])
console.log(`${profile.title_name[0]} ${profile.fname[0]} ${profile.lname[0]}`)
console.log(`${profile.hmain[0]} ${profile.hmain_name[0]}`)
console.log(`${profile.primary_tumbon_name[0]} ${profile.primary_amphur_name[0]} ${profile.primary_province_name[0]}`)
// console.log(profile.purchaseprovince_name[0])
console.log(`${profile.subinscl[0]} ${profile.subinscl_name[0]}`)
