var charDB = new PouchDB('characterInfo');
var attackDB = new PouchDB('attackInfo');
var activeDB = new PouchDB('activeCharacters');

function storeCharacterData(){
    var name1 = document.getElementById("uniqueID").value;
    var name2 = document.getElementById("uniqueID2").value;

    var doc = {
        "_id": name1,
        "name": name2
    };

    activeDB.put(doc);
}

function showCharacterData(){
    charDB.get(document.getElementById("uniqueID").value).then(function(doc){
        document.getElementById("wholeDiv").innerHTML = "<p>"+doc.name+"</p>";
    });
}

function clearData(){
    activeDB.destroy().then(function (response) {
        document.getElementById("wholeDiv").innerHTML = "<p>Data Cleared</p>";
    }).catch(function (err) {
    console.log(err);
    });
}

function populateMainPage(){
    var heroPanel = document.getElementById("mpHeroesPanel");
    heroPanel.innerHTML = "";
    activeDB.allDocs({include_docs: true}).then(function (result){
        var i = 0;
        for(i=0; i<result.rows.length; i++){
            var node = document.createElement("p")
            node.innerHTML = result.rows[i].doc.name;
            heroPanel.appendChild(node);
        }
    }).catch(function (err) {
    console.log(err);
    });
}

/*
  function popup(mylink, windowname) { 
    if (! window.focus)return true;
    var href;
    if (typeof(mylink) == 'string') href=mylink;
    else href=mylink.href; 
    window.open(href, windowname, 'width=400,height=200,scrollbars=yes,location=no'); 
    return false; 
  }
  */

  function changePage(fromPage, toPage){
    document.getElementById(toPage).style.display='block';
    document.getElementById(fromPage).style.display='none';
    return false;
  }
