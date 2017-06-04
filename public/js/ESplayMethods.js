"use strict";

module.exports = (app, $, JSHINT) => {	

	app.factory("ESplayMethods", ($http) => {
		var myCodeMirror = CodeMirror(document.getElementById("code"), {
			 lineNumbers: true, 
			 theme: "dracula",
			 gutters: ["CodeMirror-lint-markers"],
			 lint: true
		});
		myCodeMirror.setValue("/*jshint esversion: 6*/\n");
 		const ESplayMethods = {
 			transpile($scope, $http, called){
 				return () => {
 					const message = {code: myCodeMirror.getValue() };
 					console.log(message)
 					$http.post('/transpile', message)
 					.then((res) => {
 						const data = res.data;
 						let code = data.result.code;
 						let precode;
 						if(!called){
 							precode = `let logs = [];
 							let log = console.log;
 							console.log = function(){
 							   logs.push(arguments);
 							   log.apply(console, arguments);
 							}
 							${code}
 							let para, t;
 							for(let i = 0; i < logs.length; i++){
 								para = document.createElement("P");                       
 								t = document.createTextNode(logs[i][0]);      
 								para.appendChild(t); 
 								document.body.appendChild(para);
 							}`;
 						} else{
 							precode = `
 							logs = [];
 							${code}                                      
 							for(let i = 0; i < logs.length; i++){
 								para = document.createElement("P");                       
 								t = document.createTextNode(logs[i][0]);      
 								para.appendChild(t); 
 								document.body.appendChild(para);
 							}`;
 						}
 						
 						window.frames[0].document.open();
 						window.frames[0].document.write("<!DOCTYPE html>");
				        window.frames[0].document.write("<html>");
				        window.frames[0].document.write("<body>");
				        window.frames[0].document.write("<script type='text/javascript'>" + precode + "</script>");
				        window.frames[0].document.write("</body>");
				        window.frames[0].document.write("</html>");
				        window.frames[0].document.close();
						called = true;
 					});	
 				}
 			}
 		}
 		return ESplayMethods;
	});

}