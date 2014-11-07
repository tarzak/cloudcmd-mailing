var productionVersion = false;
var locationProduction = "html/dist/";
var locationDevelop = "html/";
var location="";
if(productionVersion){
    location = locationProduction;
}else{
    location = locationDevelop;
}

module.exports  = location;
