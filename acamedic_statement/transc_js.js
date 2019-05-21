/*
    File:           transc_js.js
    Author:         K. Lee
    Date:           Feb 11, 2018
    How to Run It:  Click the 'Process' button on the right-upper side of window in
                    Visual Studio.
*/
var xmlDoc;

function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            xmlDoc = this.responseXML;
        }
    };
    xmlhttp.open("GET", "transc_xml.xml", true);
    xmlhttp.send();
}

// Get a NodeList of all Transcription elements in the XML document
function procXml(xml) {
    var tranNodes = xmlDoc.getElementsByTagName("TransTitle");
    var instNodes = xmlDoc.getElementsByTagName("InstitutionName");
    var prinNodes = xmlDoc.getElementsByTagName("PrintDate");
    var studNodes = xmlDoc.getElementsByTagName("Student");
    var stAdNodes = xmlDoc.getElementsByTagName("StudentAddress");
    var termDNodes = xmlDoc.getElementsByTagName("TermID");
    var prNmNodes = xmlDoc.getElementsByTagName("ProgramName");
    var stStNodes = xmlDoc.getElementsByTagName("StudentStatus");
    var tmGPANodes = xmlDoc.getElementsByTagName("TermGPA");
    var csGrNodes = xmlDoc.getElementsByTagName("CourseGroup");
    const stAttr = studNodes[0].attributes;

    document.getElementById("h2").innerHTML = tranNodes[0].childNodes[0].nodeValue;
    document.getElementById("h3").innerHTML = instNodes[0].childNodes[0].nodeValue;

    var tbl = "<tr><td width='50'>" + stAttr.getNamedItem("StudentName").value +
        "</td><td width='50'>Date printed: " + prinNodes[0].childNodes[0].nodeValue + "</td></tr>" +
        "<tr><td>" + stAdNodes[0].childNodes[0].nodeValue +
        "</td><td>Student ID: " + stAttr.getNamedItem("StudentID").value + "</td></tr>";
    document.getElementById("tableA").innerHTML = tbl;

    /*      References of different expression to create childnodes
            alert(  xmlDoc.documentElement.firstChild.nextSibling.nodeName); = TransTitle  
            alert(  csGrNodes[0].firstElementChild.nodeName);       */

    var gp = 0;
    var cCredit = 0;


    for (var i = 0; i < csGrNodes.length; i++) {
        var gpTot = [];
        gpTot[i] = 0;
        var gpSum = [];
        gpSum[i] = 0;

        var termR = "<br><br><h3><b>" + termDNodes[i].childNodes[0].nodeValue + "</b></h3>";
        termR += "<table id='tableB'><tr><td id='tl'><b>Course</b></td><td id='tl'><b>Course Title</b></td>";
        termR += "<td id='tl'><b>Grade</b></td><td id='tl'><b>Credits</b></td><td id='tl'><b>Grade Points</b></td></tr>";

        var corsNodes = csGrNodes[i].childNodes;


        for (j = 0; j < corsNodes.length; j++) {

            if (corsNodes[j].nodeName == "Course") {
                const attrs = corsNodes[j].attributes;

                // This function creates Course Grade Point 
                switch (attrs.getNamedItem("StudentGrade").value) {
                    case 'A+': gp = 4.5; break;
                    case 'A': gp = 4.0; break;
                    case 'B+': gp = 3.5; break;
                    case 'B': gp = 3.0; break;
                    case 'C+': gp = 2.5; break;
                    case 'C': gp = 2.0; break;
                    case 'D+': gp = 1.5; break;
                    case 'D': gp = 1.0; break;
                    case 'F': gp = 0.0; break;
                }
                var cCredit = attrs.getNamedItem("CourseCredit").value;

                termR += "<tr><td>" + attrs.getNamedItem("CourseCode").value;
                termR += "</td><td>" + attrs.getNamedItem("CourseName").value;
                termR += "</td><td>" + attrs.getNamedItem("StudentGrade").value;
                termR += "</td><td>" + cCredit;
                termR += "</td><td>" + gp + "</td></tr>";

                gpSum[i] += cCredit * gp;
                gpTot[i] = Math.round(gpSum[i] / 20 * 100) / 100

                // reducing the lengh of sum value 
            }
        }

        termR += "<tr><td id='tl'>Total</td><td id='tl'></td><td id='tl'></td><td id='tl'>";
        termR += tmGPANodes[0].childNodes[0].nodeValue + "</td><td id='tl'>" + gpTot[i] + "</td></tr></table>";
        termR += "<b>Term Academic Standing:</b>" + stStNodes[0].childNodes[0].nodeValue;
        termR += "<br><b>Program:</b>" + prNmNodes[0].childNodes[0].nodeValue + "</b></b>";

        $('#termRot').append(termR);
    }
}

