# furry-telegram


# How to Run and Develop Locally:

git clone the repo
npm install from project root  
cd into 'ios'  
run 'pod install'  
mv back to project root directory  
run 'react-native run-ios' 
<br>

Optional:  
Select the simulator    
Press command-d to pull up the dev menu   
Enable live reload   
Select Toggle Inspector for debugging front end elements 
<br>

How to View Console.logs:  
Open dev menu  
Select Remote JS Debugging  
View Developer Tools as Normal on Remote Page  
Look at that console for console.logs.  
<br>

Resetting the Persistent Storage:  
Two Options  
(1) Delete the app in simulator and then rebuild from scratch  
(2) Add the line 'useDefaults()' to the App.js constructor, run once, remove then line, then refresh  
<br>

# Notes

Sometimes there will be a random error with a hast cache map or something.  
When this happens just delete the repo and reclone. If that doesnt work then npm install whatever it says it missing and rebuild until it stops. 
