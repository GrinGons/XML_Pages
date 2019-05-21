
function loadXMLDoc() {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            dogParks(this);
        }
    }
    xmlhttp.open("GET", "dogParks.xml", true);
    xmlhttp.send();
}

function dogParks(xml) {
    var xmlDoc = xml.responseXML;

    var table = "";
    var parks = xmlDoc.getElementsByTagName("park");

    for (i = 0; i < parks.length; i++) {

        var attrs = parks[i].attributes;

        table += "<tr><td>" + attrs.getNamedItem("name").value
            + "</td><td>" + parks[i].getElementsByTagName("address")[0].firstChild.nodeValue
            + "</td><td>" + parks[i].getElementsByTagName("feature")[0].firstChild.nodeValue
            + "</td</tr>";
    }
    document.getElementById("table").innerHTML += table;
}
