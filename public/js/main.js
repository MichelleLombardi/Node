$(document).ready(function () {

    var tBody = $("#tbody");

    var arrToTable = function ( arr ) {
        tBody.text("");
        for( var row of arr ) {
            var tr = $("<tr>").data("id", row.id);
            $.each(row, function(key, value) {
                tr.append(
                    $("<td>").text( value )
                )
            });
            tr.append(
                $("<button>").text("Delete").click(function () {
                    var id = $($(this).parent()[0]).data("id");
                    // DELETE
                    console.log(id);
                    $.ajax({
                        "url": "/api",
                        "method": "DELETE",
                        "data": {
                            "arr": JSON.stringify(arregloOriginal),
                            "id": id
                        }
                    }).then(
                        function (data) { // success
                            if( !data.err ) {
                                var arr = data.arr;
                                console.log("Eliminada una fila");
                                console.log(arr);
                                localStorage.arreglo = JSON.stringify(arr);
                                arregloOriginal = arr;
                                arrToTable(arregloOriginal);
                            }
                            else {
                                var err = data.err;
                                console.log(err);
                            }
                        },
                        function (error) { // failed
                            console.log(error);
                        }
                    );
                })
            );
            tBody.append(tr);
        }
    };

    var arregloOriginal = localStorage.arreglo ? JSON.parse(localStorage.arreglo) : [];
    var orderBy = "id";
    var orderType = true;

    console.log("Arreglo original");
    console.log(arregloOriginal);

    var searchRequest = function() {
        // GET
        $.ajax({
            "url": "/api",
            "method": "GET",
            "data": {
                "arr": JSON.stringify(arregloOriginal),
                "orderBy": orderBy,
                "orderType": orderType
            }
        }).then(
            function (data) { // success
                if( !data.err ) {
                    var arr = data.arr;
                    console.log("Peticion de busqueda inicial");
                    console.log(arr);
                    arrToTable(arr);
                }
                else {
                    var err = data.err;
                    console.log(err);
                }
            },
            function (error) { // failed
                console.log(error);
            }
        );
    };

    searchRequest();

    $("#thId")
        .data("id", "id")
        .click(function () {
            if( orderBy == $(this).data("id") )
                orderType = !orderType;
            else
                orderType = true;

            console.log(orderType);

            orderBy = $(this).data("id");
            searchRequest();
        });

    $("#thProduct")
        .data("id", "product")
        .click(function () {
            if( orderBy == $(this).data("id") )
                orderType = !orderType;
            else
                orderType = true;

            console.log(orderType);

            orderBy = $(this).data("id");
            searchRequest();
        });

    $("#thStock").data("id", "stock")
        .click(function () {
            if( orderBy == $(this).data("id") )
                orderType = !orderType;
            else
                orderType = true;

            console.log(orderType);

            orderBy = $(this).data("id");
            searchRequest();
        });

    $("#thPrice").data("id", "price")
        .click(function () {
            if( orderBy == $(this).data("id") )
                orderType = !orderType;
            else
                orderType = true;

            console.log(orderType);

            orderBy = $(this).data("id");
            searchRequest();
        });

    $("#thCreate_at").data("id", "create_at")
        .click(function () {
            if( orderBy == $(this).data("id") )
                orderType = !orderType;
            else
                orderType = true;

            console.log(orderType);

            orderBy = $(this).data("id");
            searchRequest();
        });

    // POST
    $("#send").click(function () {
        $.ajax({
            "url": "/api",
            "method": "POST",
            "data": {
                "arr": JSON.stringify(arregloOriginal),
                "product": $("#product").val(),
                "price": $("#price").val(),
                "stock": $("#stock").val()
            }
        }).then(
            function (data) { // success
                if( !data.err ) {
                    var arr = data.arr;
                    console.log(arr);
                    localStorage.arreglo = JSON.stringify(arr);
                    arregloOriginal = arr;
                    arrToTable(arregloOriginal);
                }
                else {
                    var err = data.err;
                    console.log(err);
                }
            },
            function (error) { // failed
                console.log(error);
            }
        )
    });

    $("#search").click(searchRequest);

});