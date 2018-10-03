//lets connect to the Star Wars API and get their random character right when the page loads
$(document).ready(function(){
    var randCharURL = "https://swapi.co/api/people/" + Math.floor(Math.random() * 47 + 1) + "/.json"; //there are 87 but only the first ones are cool
    //randCharURL = "https://swapi.co/api/people/79/.json";
    //randCharURL = "https://swapi.co/api/people/33/.json";
    //There seems to be a problem when it chooses person 17, that is something that we will have to fix :/
    //console.log(randCharURL);
    $.ajax({
        url : randCharURL,
        dataType : "json",
        success : function(parsed_json){
            //console.log(parsed_json);
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
            
            //get the planet information
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
                        
                        $("#planetName").html("Home Planet: " + capitalize(planetName));
                        
                        if(planetName != "unknown"){
                            var planetInfo = "Diameter: " + diameter + " kilometers<br>Rotation Period: " + rotation_period + " hrs<br>Orbital Period: " 
                        + orbital_period + " days<br>Gravity: " + gravity + " Gs<br>Population: " + population + " people<br>Climate: " + capitalize(climate) + "<br>Terrain: " + capitalize(terrain) + "<br>Surface Water: " + surface_water + "%";
                        $("#planetInfo").html(planetInfo);
                        }
                    }
                });
            }
            
            //get the starship information
            
            var shipInfoArea = "<br><h2>StarShips</h2>";
            
            for(var i = 0; i < starships.length; i++){
                $.ajax({
                    url : starships[i],
                    dataType : "json",
                    success : function(parsed_json){
                        var name = parsed_json["name"]; // string -- The name of this starship. The common name, such as "Death Star".
                        var model = parsed_json["model"]; //  string -- The model or official name of this starship. Such as "T-65 X-wing" or "DS-1 Orbital Battle Station".
                        var starship_class = parsed_json["starship_class"]; //  string -- The class of this starship, such as "Starfighter" or "Deep Space Mobile Battlestation"
                        var manufacturer = parsed_json["manufacturer"]; //  string -- The manufacturer of this starship. Comma separated if more than one.
                        var cost_in_credits = parsed_json["cost_in_credits"]; //  string -- The cost of this starship new, in galactic credits.
                        var length = parsed_json["length"]; //  string -- The length of this starship in meters.
                        var crew = parsed_json["crew"]; //  string -- The number of personnel needed to run or pilot this starship.
                        var passengers = parsed_json["passengers"]; //  string -- The number of non-essential people this starship can transport.
                        var max_atmosphering_speed = parsed_json["max_atmosphering_speed"]; //  string -- The maximum speed of this starship in the atmosphere. "N/A" if this starship is incapable of atmospheric flight.
                        var hyperdrive_rating = parsed_json["hyperdrive_rating string"]; //  -- The class of this starships hyperdrive.
                        var MGLT = parsed_json["MGLT"]; //  string -- The Maximum number of Megalights this starship can travel in a standard hour. A "Megalight" is a standard unit of distance and has never been defined before within the Star Wars universe. This figure is only really useful for measuring the difference in speed of starships. We can assume it is similar to AU, the distance between our Sun (Sol) and Earth.
                        var cargo_capacity = parsed_json["cargo_capacity"]; //  string -- The maximum number of kilograms that this starship can transport.
                        var consumables = parsed_json["consumables"]; //  -- string The maximum length of time that this starship can provide consumables for its entire crew without having to resupply.
                    
                        shipInfoArea += "<h2>" + capitalize(name) + "</h2><h3>";
                        
                        shipInfoArea += "Model: " + capitalize(model) + "<br>Starship Class: " + capitalize(starship_class) + "<br>Manufacturer: " + capitalize(manufacturer) 
                            + "<br>Cost New: " + cost_in_credits + " Galactic Credits<br>Length: " + length + " Starship meters<br>Crew: "
                            + crew + " people<br>Passengers: " + passengers + " people<br>Max Atmosphering Speed: " + max_atmosphering_speed
                            + "<br>HyperDrive Rating: " + hyperdrive_rating + "<br>MGLT rating: " + MGLT +
                            " (measure of speed which hasn't been defined in the Star Wars Universe)<br>Cargo Capacity: " + cargo_capacity +
                            " kgs<br>Can go " + capitalize(consumables) + " before needed to resupply";
                            
                        shipInfoArea += "</h3>";
                        
                        $("#starships").html(shipInfoArea);
                    }
                });
            }
            if(starships.length == 0){
                shipInfoArea += "<h3>Didn't pilot any starships</h3>";
            }
            
            $("#starships").html(shipInfoArea);
            
            
            
            //get the vehicle information
            var vehicleInfoArea = "<br><h2>Vehicles</h2>";
            
            //console.log(vehicles);
            
            for(var i = 0; i < vehicles.length; i++){
                $.ajax({
                    url : vehicles[i],
                    dataType : "json",
                    success : function(parsed_json){
                        var name = parsed_json["name"]; // string -- The name of this vehicle. The common name, such as "Death Star".
                        var model = parsed_json["model"]; //  string -- The model or official name of this vehicle. Such as "T-65 X-wing" or "DS-1 Orbital Battle Station".
                        var vehicle_class = parsed_json["vehicle_class"]; //  The class of this vehicle, such as "Wheeled" or "Repulsorcraft".
                        var manufacturer = parsed_json["manufacturer"]; //  string -- The manufacturer of this vehicle. Comma separated if more than one.
                        var cost_in_credits = parsed_json["cost_in_credits"]; //  string -- The cost of this vehicle new, in galactic credits.
                        var length = parsed_json["length"]; //  string -- The length of this vehicle in meters.
                        var crew = parsed_json["crew"]; //  string -- The number of personnel needed to run or pilot this vehicle.
                        var passengers = parsed_json["passengers"]; //  string -- The number of non-essential people this vehicle can transport.
                        var max_atmosphering_speed = parsed_json["max_atmosphering_speed"]; //  string -- The maximum speed of this vehicle in the atmosphere. "N/A" if this vehicle is incapable of atmospheric flight.
                        var cargo_capacity = parsed_json["cargo_capacity"]; //  string -- The maximum number of kilograms that this vehicle can transport.
                        var consumables = parsed_json["consumables"]; //  -- string The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply.
                    

                    
                        vehicleInfoArea += "<h2>" + capitalize(name) + "</h2><h3>";
                        
                        vehicleInfoArea += "Model: " + capitalize(model) + "<br>Starship Class: " + capitalize(vehicle_class) + "<br>Manufacturer: " + capitalize(manufacturer) 
                            + "<br>Cost New: " + cost_in_credits + " Galactic Credits<br>Length: " + length + " Starship meters<br>Crew: "
                            + crew + " people<br>Passengers: " + passengers + " people<br>Max Atmosphering Speed: " + max_atmosphering_speed
                            + "<br>Cargo Capacity: " + cargo_capacity +
                            " kgs<br>Can go " + capitalize(consumables) + " before needed to resupply";
                            
                        vehicleInfoArea += "</h3>";
                        
                        $("#vehicles").html(vehicleInfoArea);
                    }
                });
            }
            if(vehicles.length == 0){
                vehicleInfoArea += "<h3>Didn't ride any vehicles</h3>";
            }
            
            $("#vehicles").html(vehicleInfoArea);
            
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
    return Math.round(feet) + "ft " + Math.round(totalInches) + "in";
}

function convertKgsToLbs(kgs){
    var conversion = .45; //there are .34 kgs for each lb
    return Math.round(kgs / conversion);
}