///////////////////////////////////////////
//
//          I <3 furniture
//
///////////////////////////////////////////

//Dem variables
var memory = [ "couch", "table", "lamp"], api = "2MWpVIlnymnM8Y8lvnAboNz1Drh6iwRw";

function randomColor(){

    let bsColors = ["","primary", "secondary", "success", "info", "warning", "danger", "dark", "light"];

    return( bsColors[ Math.floor( Math.random() * bsColors.length ) ] );
}

function popPage( data ){

    $("#content").empty();
    
    $.each( data, function( i, v ){
        $("#content").append( "<figure class='figure'>" +
        "<img class='lookinStuff img-fluid' data-swap='" + 
        v.images.fixed_height.url + "' src='" + v.images.fixed_height_still.url + "'/>" +
        "<figcaption class='figure-caption'>Rating: " + v.rating + "</figcaption></figure>");
    });

}

function histRefresh(){

    $("#history").empty();
    
    $.each( memory, function( i, v ){
        $("#history").append( "<button class='memory btn btn-" + randomColor() +"'>" + v + "</button>" );
        localStorage.clear();
        localStorage.setItem( "memory", memory );
    });
}

function gifSearch( entry ){

    let t = entry.replace(/ /g, '+');
    let urlQuery = "http://api.giphy.com/v1/gifs/search?q=" + t + "&api_key=" + api + "&limit=10";
    
    $.ajax({ url: urlQuery, method: "GET"}).then(function(callBack){

        if( !callBack.pagination.count ){
            
            
        }else if( memory.includes( entry ) ){
            

        }else{
            memory.push( entry ); 

        }

        histRefresh();
        popPage( callBack.data );

    });
    
}

function loadData(){

    let getMemory = localStorage.getItem( "memory");

    console.log( getMemory );
    if( getMemory ){

        memory = getMemory.split(',');
        localStorage.clear();
        console.log( memory );
    }

}



$("#furnSmash").on( "click", function(e){
    e.preventDefault();
    gifSearch( $("#furnInput").val());
});

$("#history").on( "click", ".memory", function(){

    gifSearch( $(this).text() );
});

$("#content").on( "click", ".lookinStuff", function(){

    let anim = $(this).attr('data-swap');
    let stil = $(this).attr('src');

    $(this).attr('data-swap', stil );
    $(this).attr('src', anim );

});

window.onload = function(){

    loadData();
    histRefresh();
    gifSearch( memory[0] );
    
}