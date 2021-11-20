$(function() {    

    $("#signupbtn").click(function(){
        console.log("Hiiii");
        var username = $("#uname").val();
        var password = $("#password").val();
        var email = $("#email").val();
        var fname = $("#fname").val();
        var lname = $("#lname").val();
        var address = $("#address").val();
        var phone = $("#phone").val();

        var details = {
            "uname": username,
            "pwd": password,
            "email": email,
            "fname": fname,
            "lname": lname,
            "address": address,
            "phone": phone
        }
        console.log(details);
        $.ajax({
            method: 'POST',
            url: '/login',
            data: details,
            dataType: "json",
            success: function(data) {
                console.log(data);
            },
            error: function() {
                alert("Error loading data");
            }
        });
    
    });

    
});




