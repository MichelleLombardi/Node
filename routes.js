var pgPromise = require('pg-promise')();

module.exports = function ( router ) {
    router.route("/api")
        .get(function (req, res) {
            console.log("Peticion GET");

            var error = false;

            var arr = (req.query.arr ? req.query.arr : "[]");

            arr = JSON.parse( arr );

            var orderBy = (req.query.orderBy ? req.query.orderBy : "id").trim();
            // true = asc; false = desc
            var orderType = req.query.orderType == "true";

            var array_ordenado = sort(arr, orderBy, orderType);

            if( !error )
                res.send({ "arr": array_ordenado });
            else
                res.send(error);

        })
        .post(function (req, res) {
            console.log("Peticion POST");

            var error = false;

            var arr = (req.body.arr ? req.body.arr : "[]");

            arr = JSON.parse( arr );

            var id = arr.length ? arr[ arr.length - 1 ].id + 1 : 1;
            var product = (req.body.product ? req.body.product : "").trim();
            var price = Number(req.body.price ? req.body.price : "");
            var stock = Number(req.body.stock ? req.body.stock : "");

            if( !id || !product || !price || !stock )
                error = {
                    err: "Todos los campos son obligatorios"
                };

            var newValue = {
                id: id,
                product: product,
                price: price,
                stock: stock,
                create_at: new Date()
            };

            arr.push( newValue );

            if( !error )
                res.send({ "arr": arr });
            else
                res.send(error);

        })
        .delete(function (req, res) {
            console.log("Peticion DELETE");

            var arr = (req.body.arr ? req.body.arr : "[]");

            arr = JSON.parse( arr );

            var id = (req.body.id ? req.body.id : "").trim();

            console.log(req.body.id);

            for( var i = 0; i < arr.length; i++ ) {
                if( arr[i].id == id )
                    remove(arr, arr[i]);
            }

            res.send({ "arr": arr });
        });

    var sort = function (arr, orderBy, orderType) {
        if( orderBy == 'id' || orderBy == 'product' || orderBy == 'stock' || orderBy == 'price' || orderBy == 'create_at' ) {
            var order = [];

            // Separamos la propiedad por la cual ordenaremos
            for( var i = 0; i < arr.length; i++ )
                order.push(arr[i][orderBy]);

            // Ordenamos de manera ascendente
            order = order.sort();

            // Si el orden tenia que ser descendente le damos la vuelta al arreglo
            if( !orderType )
                order = order.reverse();

            var arrOder = [];

            for( var j = 0; j < order.length; j++ ) {
                var property = order[j];

                for( var k = 0; k < arr.length; k++ ) {
                    var element = arr[k];

                    if( element[orderBy] == property ) {
                        arrOder.push( element );
                        arr = remove( arr, element );
                        break;
                    }

                }
            }

            return arrOder;
        }
        else {
            return {
                err: "No indico por que parametro se ordenara"
            }
        }
    };

    var remove = function ( arr, val ) {
        var pos = arr.indexOf( val );
        pos > -1 && arr.splice( pos, 1 );
        return arr;
    };

    return router;
};