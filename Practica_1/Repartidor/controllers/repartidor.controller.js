const { deliveries } = require("../utils/data")




const recibirPedido = (req, res) => {

    try {
        const { id } = req.user.client
        const { pedido } = req.body

        let {idRepartidor} = pedido;

        let result = {
            ...pedido,
            idCliente: id,
            entregado: false,
        }

        deliveries.push( result );

        let pedidosRepartidor = deliveries.filter(val => val.idRepartidor === idRepartidor && !val.entregado );
        console.log(pedidosRepartidor);

        // let { entregado, ...result} = pedidosRepartidor

        global.log.info(`Pedido recibido correctamente.`);
        return res.status(200).json({
            pedidos: deliveries
        })

    } catch (error) {
        global.log.error(`pedido no recibido - ${error}`);
        return res.status(401).json({
            msg: "Pedido no recibido correctamente."
        });
    }

}

const informarCliente = (req, res) => {
    try {
        const { id, name } = req.user.client
        let result = deliveries.find(val => val.idCliente === id);

        if(!result  ) {
            global.log.info(`No se encontraron ordenes con este cliente con id: ${id}.`);
            return res.status(401).json({
                msg: `No se encontraron ordenes con este cliente con id: ${id}.`
            });
        }

        result.name = name;

        return res.status(200).json({
            result,

        });

    } catch (error) {
        global.log.error(`No se ha podido notificar al cliente correctamente - ${error}`);
        return res.status(401).json({
            msg: "No se ha podido notificar al cliente correctamente."
        });
    }


}

module.exports = {
    recibirPedido,
    informarCliente
}
