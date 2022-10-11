let AWS = require("aws-sdk");
let creds = new AWS.Credentials('AKIAIOJG4BNB3MHKYGUA', 'PsgdsQnmU086NHzdFwAoNZzXqKD6Q27eCDnCRNfQ', null);
AWS.config.update({
    region: "eu-west-1",
    credentials : creds
});
let date = require('date');
let moment = require('moment');

//var moment = require('moment');

let docClient = new AWS.DynamoDB.DocumentClient();
let a=0;


console.log("Scanning dch_prod_auditing table.");
console.log("Count of Data inserted in Auditing DynamoDB Table per minute on 23 Oct 2018 from 12:41:06 IST To 13:23:06 IST ")
//Params for different tables scanning call

let f = 0;
let starttimeepocvalue = 1540278666000
let endtimeepocvalue =   1540281186000  
let paramsForSuccessRecords = {
	TableName: "dch_prod_auditing",
	FilterExpression: "#user_status >= :statusValue and #user_statuss <= :statusValues",
	ExpressionAttributeNames: {
        "#user_status": "startDateTime","#user_statuss": "endDateTime"
    },
    ExpressionAttributeValues: { ":statusValue":starttimeepocvalue ,":statusValues": endtimeepocvalue }
};
let flag = 0;

		docClient.scan(paramsForSuccessRecords, onScanCriticalError);



function onScanCriticalError(err,data){
	if(err){
		console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
	}
	else{
	
		data.Items.forEach(function(record) {
			if(record.startDateTime >= starttimeepocvalue && record.endDateTime <= starttimeepocvalue + 60000) {
		
						f++;
	
			}
        });
		if (typeof data.LastEvaluatedKey != "undefined") {
			
				paramsForSuccessRecords.ExclusiveStartKey = data.LastEvaluatedKey;
				docClient.scan(paramsForSuccessRecords, onScanCriticalError);
        }
		else{
			

			console.log(""+(a+1)+" minute interval : ",f);
			a++;
			starttimeepocvalue = starttimeepocvalue + 60000;
			f=0;
			paramsForSuccessRecords.ExclusiveStartKey = data.ExclusiveStartKey;
			
			if(starttimeepocvalue>=endtimeepocvalue){
				console.log("Finished");
			}
			else{
			docClient.scan(paramsForSuccessRecords, onScanCriticalError);
			}
		
			
			
			
		}
		
		}	
}


