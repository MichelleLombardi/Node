var pgPromise = require('pg-promise')();

// Datos de la base de datos
conn = pgPromise({
    host: 'localhost', // server name or IP address;
    port: 5432,
    database: 'almacen',
    user: 'postgres',
    password: 'masterkey'
});

module.exports = function ( router ) {
    router.route("/req")
        .get(function (req, res) {
            console.log("Peticion GET");

            var data = (req.query.data ? req.query.data : "").trim();
            var orderBy = (req.query.orderBy ? req.query.orderBy : "").trim();
            var orderType = (req.query.orderType ? req.query.orderType : "").trim();

            var query = `
                SELECT
                  id,
                  product,
                  stock,
                  create_at
                FROM 
                  productos
                WHERE 
                  id = ? OR
                  product LIKE ?
                ORDER BY 
                  ?
                  ?
            `;

            var values = [
                data,
                `%${data}%`,
                orderBy,
                orderType
            ];

            conn.query( query, values )
                .then(function (arr) {
                    console.log("Get query success");
                    res.send(arr);
                })
                .catch(function (err) {
                    console.log("Get query failed");
                    console.log(err);
                });
        })
        .post(function (req, res) {
            console.log("Peticion POST");

            var product = (req.query.product ? req.query.product : "").trim();
            var price = (req.query.price ? req.query.price : "").trim();
            var stock = (req.query.stock ? req.query.stock : "").trim();

            var query = `
                INSERT INTO productos(
                  product,
                  price,
                  stock,
                  create_at
                ) VALUES (
                  ?,
                  ?,
                  ?,
                  ?
                )
            `;

            var values = [
                product,
                price,
                stock,
                new Date()
            ];

            conn.query( query, values )
                .then(function (data) {
                    console.log("POST query success");
                    res.send(data);
                })
                .catch(function (err) {
                    console.log("POST query failed");
                    console.log(err);
                });

        })
        .put(function (req, res) {
            console.log("Peticion PUT");
            var product = (req.query.product ? req.query.product : "").trim();
            var price = (req.query.price ? req.query.price : "").trim();
            var stock = (req.query.stock ? req.query.stock : "").trim();

            var query = `
                UPDATE 
                  productos 
                SET
                  product = ?,
                  price = ?,
                  stock = ?
            `;

            var values = [
                product,
                price,
                stock
            ];

            conn.query( query, values )
                .then(function (data) {
                    console.log("PUT query success");
                    res.send(data);
                })
                .catch(function (err) {
                    console.log("PUT query failed");
                    console.log(err);
                });

        })
        .delete(function (req, res) {
            console.log("Peticion DELETE");

            var id = (req.query.id ? req.query.id : "").trim();

            var query = `
                DELETE FROM 
                  productos
                WHERE id = ?
            `;

            var values = [
                id
            ];

            conn.query( query, values )
                .then(function (data) {
                    console.log("DELETE query success");
                    res.send(data);
                })
                .catch(function (err) {
                    console.log("DELETE query failed");
                    console.log(err);
                });
        });

    return router;
};