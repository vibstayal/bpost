let AWS = require("aws-sdk");
let creds = new AWS.Credentials('AKIAIOJG4BNB3MHKYGUA', 'PsgdsQnmU086NHzdFwAoNZzXqKD6Q27eCDnCRNfQ', null);
AWS.config.update({
    region: "eu-west-1",
    credentials : creds
});
//let date = require('date');
//let moment = require('moment');

//var moment = require('moment');

let docClient = new AWS.DynamoDB.DocumentClient();
//let a=0;


console.log("Scanning dch_prod_auditing table.");
//console.log("Count of Data inserted in Auditing DynamoDB Table per minute on 23 Oct 2018 from 12:41:06 IST To 13:23:06 IST ")
//Params for different tables scanning call

//let f = 0;
//let starttimeepocvalue = 1540278666000
//let endtimeepocvalue =   1540281186000  
let params = {
	TableName: "dch_prod_auditing",
	KeyConditionExpression: "#yr = :yyyy",
    ExpressionAttributeNames:{
        "#yr": "functionName"
    },
    ExpressionAttributeValues: {
        ":yyyy": "dch_sesNotifications"
    }
	
};
//let flag = 0;

		//docClient.scan(paramsForSuccessRecords, onScanCriticalError);

docClient.delete(params, function(err, data) {
    if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    }
});




