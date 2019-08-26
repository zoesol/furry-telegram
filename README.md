# furry-telegram


# How to Run and Develop Locally:

git clone the repo   
cd into 'ios'  
run 'pod install'  
mv to to project root directory  
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

How to Include New Imports in Podfile:
npm install your import directly into the npm_modules folder in the project root with the --prefix ./node_modules/.. flag
Then in the Podfile add the line "pod 'name_of_import', :path => '../node_modules/..'
Then add both the new package and the podfile to the git commit
