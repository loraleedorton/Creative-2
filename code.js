//lets connect to the Star Wars API and get their random character right when the page loads
$(document).ready(function(){
    var randCharURL = "https://swapi.co/api/people/" + Math.floor(Math.random() * 47 + 1) + "/.json"; //there are 87 but only the first ones are cool

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
            
            if(planetURL != ""){
                //make a call to get the planet information!
                $.ajax({
                    url : planetURL,
                    dataType : "json",
                    success : function(parsedJson){
                        
                        
                        var planetName = parsedJson["name"];// string -- The name of this planet.
                        var diameter = parsedJson["diameter"];// string -- The diameter of this planet in kilometers.
                        var rotation_period = parsedJson["rotation_period"];// string -- The number of standard hours it takes for this planet to complete a single rotation on its axis.
                        var orbital_period = parsedJson["orbital_period"];// string -- The number of standard days it takes for this planet to complete a single orbit of its local star.
                        var gravity = parsedJson["gravity"];// string -- A number denoting the gravity of this planet, where "1" is normal or 1 standard G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs.
                        var population = parsedJson["population"];// string -- The average population of sentient beings inhabiting this planet.
                        var climate = parsedJson["climate"];// string -- The climate of this planet. Comma separated if diverse.
                        var terrain = parsedJson["terrain"];// string -- The terrain of this planet. Comma separated if diverse.
                        var surface_water = parsedJson["surface_water"];// string -- The percentage of the planet surface that is naturally occurring water or bodies of water.
                        
                        $("#planetName").html(planetName);
                        
                        var planetInfo = "Diameter: " + diameter + " kilometers<br>Rotation Period: " + rotation_period + " hrs<br>Orbital Period: " 
                        + orbital_period + 
                            " days<br>Gravity: " + gravity + " Gs<br>Population: " + population + " people<br>Climate: " + capitalize(climate) + "<br>Terrain: " + capitalize(terrain) + "<br>Surface Water: " + surface_water + "%";
                        $("#planetInfo").html(planetInfo);
                    }
                });
            }
            
            
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