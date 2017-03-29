var HttpReq = new XMLHttpRequest();
var urlAdd = "Socket.php";
var myJson = $.getJSON("Utenti.json", true);
var LogInDialog;
var SignUpDialog;
var CurrentUser;

(function(){
	$.post("WindowIsAlive.php",
				 {
		username: getCookie("Username"),
		time: new Date($.now())
	},
				function(result, status){
		console.log("result= " + result + "; status= " + status);
	});
	setTimeout(arguments.callee, 100);
})();

$(document).ready(function () {
	$( "#menu" ).menu();
  LogInDialog = $("#LogInForm").dialog({
		draggable: false,
		autoOpen: false,
		resizable: false,
		height: 487.5,
		width: 450,
		modal: true
  });
  LogInDialog.dialog("open");
	/*$(window).unload(function(e){
		$.when(GoOffline(getCookie("Username"))).done(function(){
			console.log("All done");
		});
	});*/
});

function LogOut(){
		var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        var CKUsercolor = getCookie("clpUID");
        var CKUsername = getCookie("Username");
        if(CKUsercolor != "" && CKUsername != ""){
						GoOffline(CKUsername);
            document.cookie = "clpUID=;expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
            document.cookie = "Username=;expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
        }else{
            console.log("ERROR --> Cookie not found!");
        }
        console.log('User signed out.');
    });
}

function onSignIn(googleUser) {
	var CKUsercolor = getCookie("clpUID");
	var CKUsername = getCookie("Username");
	var profile = googleUser.getBasicProfile();
	var d = new Date();

	d.setTime(d.getTime() + (720*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	$("#User-Avatar-image").append('<img id="myImage" src="' + profile.getImageUrl() + '">');
	if(CKUsercolor == "" && CKUsername == ""){
		var UserData = [$("#clpUID").val(), $("#txtUID").val()];
		if(UserData[0] == "" || UserData[1] == ""){
			alert("ERROR --> I campi non sono stati riempiti correttamente");
			LogOut();
		}else{
			document.cookie = "clpUID=" + UserData[0] + ";" + expires + ";path=/";
			document.cookie = "Username=" + UserData[1] + ";" + expires + ";path=/";
		}
	}else{
		var UserData = [CKUsercolor, CKUsername];
	}
	$("#UserName").append('<p style="color: ' + UserData[0] + ';">' + UserData[1] + '</p>');
	$.post(urlAdd, {
		UserColor: UserData[0],
		username: UserData[1],
		Avatar: profile.getImageUrl()
	},
	function (result, status) {
		console.log("result= " + result + "; status= " + status);
	});
	LogInDialog.dialog("close");
}

function GoOffline(User){
	$.post("GoOffline.php", {
		username: User
	},							 
	function (result, status) {
		console.log("result= " + result + "; status= " + status);
	});
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}