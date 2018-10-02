//lets connect to the Star Wars API and get their random character right when the page loads
$(document).ready(function(){
    var randCharURL = "https://swapi.co/api/people/" + Math.floor(Math.random() * 47 + 1) + "/.json"; //there are 87 but only the first ones are cool
    var planetURL = "";
    var randShipURL = "";
    
    
    $.ajax({
        url : randCharURL,
        dataType : "json",
        success : function(parsed_json){
            console.log(parsed_json);
            
            var name = parsed_json["name"];
            var birth_year = parsed_json["birth_year"];
            var eye_color = parsed_json["eye_color"];
            var gender = parsed_json["gender"];
            var hair_color = parsed_json["hair_color"];
            var height = parsed_json["height"];
            var mass = parsed_json["mass"];
            var skin_color = parsed_json["skin_color"];
            var planetURL = parsed_json["homeworld"];
            //films array -- An array of film resource URLs that this person has been in.
            //species array -- An array of species resource URLs that this person belongs to.
            var starships  = parsed_json["starships"];
            var vehicles = parsed_json["vehicles"];
            
            $("#charName").html(name);
            
            var charInfo = "Birth Year: " + birth_year + "<br>Eye Color: " + capitalize(eye_color) + "<br>Hair Color: " + capitalize(hair_color) + 
                "<br>Gender: " + capitalize(gender) + "<br>Height: " + convertCentToFeetAndInch(height) + " <br>Weight: " + convertKgsToLbs(mass) + "lbs<br>Skin Color: " + capitalize(skin_color);
            $("#charInfo").html(charInfo);
            
            
        }
    });
}); 
function capitalize(str){
    str = str.charAt(0).toUpperCase() + str.slice(1);
    
    for(var i = 0; i < str.length - 2; i++){
        if(str.charAt(i) == " "){
            str = str.substr(0, i + 1) + str.charAt(i + 1).toUpperCase() + str.substr(i + 2);
        }
    }
    
    return str;
}

function convertCentToFeetAndInch(cent){
    var conversion = 2.54; //how many centimeters in an inch
    var totalInches = cent / 2.54;
    var feet = totalInches / 12;
    totalInches %= 12; // the remainder of this
    console.log("Total inches: " + totalInches);
    return Math.round(feet) + "ft " + Math.round(totalInches) + "in";
}

function convertKgsToLbs(kgs){
    var conversion = .45; //there are .34 kgs for each lb
    return Math.round(kgs / conversion);
}