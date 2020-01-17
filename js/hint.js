//Search bar function
$('#searchBoxInput').on('keyup', function(e)
{
    var str = this.value;
    $("#hints").empty();
    if(str.length == 0)
    {
        $("#txtHint").text = "";
    }
    else
    {
        if(e.keyCode > 46) //Excludes unnecessary characters
        {
            $.ajax //AJAX request to get results from search
            ({
                type: 'GET',
                url: 'requests.php',
                contentType: 'application/json; charset=utf-8',
                data: {"search":str},
                dataType: 'json',
                success: function (response)
                {
                    var hints = response["hint"].split(',');
                    for(var i = 0; i < hints.length; i++) //Display results
                    {
                        //Split info with spaces
                        var splitHint = hints[i].split(" ");

                        //Removes bugged space
                        if(splitHint.length > 4)
                        {
                            splitHint.splice(0,1);
                        }

                        if(splitHint[0]) //If there is info, display search
                        {
                            $('#hints').append("<div id=" + splitHint[3] + " class='searches' onclick='goToProfile(this.id)' <p>" + splitHint[0] + " " + splitHint[1] + "</p><p>" + splitHint[2] + "</p>");
                        }
                    }
                    //If nothing was found display error messsage
                    if(!$('#hints > div').length)
                    {
                        $('#hints').append("<div class='searches'><p>No profiles found...</p></div>")
                    }
                },
                error: function (err)
                {
                    console.log(err);
                    console.log("Error occured");
                } 
            });
        }
    }
});