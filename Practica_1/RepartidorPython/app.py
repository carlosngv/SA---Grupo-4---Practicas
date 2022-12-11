from flask import Flask, jsonify, request
from functools import wraps
import jwt


app = Flask(__name__)
app.config['SECRET_KEY']='JWTPractica1'

deliveries = [
    {
        "idCliente": 32,
        "idPedido": 12,
        "idRepartidor": 32,
        "entregado": True
    },
    {
        "idCliente": 3,
        "idPedido": 3,
        "idRepartidor": 43,
        "entregado": False
    },
    {
        "idCliente": 1,
        "idPedido": 12,
        "idRepartidor": 43,
        "entregado": True
    },
    {
        "idCliente": 2,
        "idPedido": 34,
        "idRepartidor": 43,
        "entregado": False
    },
    {
        "idCliente": 2,
        "idPedido": 10,
        "idRepartidor": 32,
        "entregado": True
    },
    {
        "idCliente": 11,
        "idPedido": 10,
        "idRepartidor": 32,
        "entregado": True
    },
];

def token_required(f):
   @wraps(f)
   def decorator(*args, **kwargs):
       token = None
       if 'Authorization' in request.headers:
           token = request.headers['Authorization']
           print('Token: ' + token)

       if not token:
           return jsonify({'message': 'a valid token is missing'})
       try:
           data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
           print('Secret key: '+ app.config['SECRET_KEY'])

       except:
           return jsonify({'message': 'token is invalid'})

       return f(data, *args, **kwargs)
   return decorator



@app.route('/')
def salute():
    return 'Hola desde repartidor en Python.'

@app.route('/repartidor/informar_cliente')
@token_required
def inform_client(request_data):
    client_id = request_data['client']['id']
    print('id:', client_id)

    filtered = []

    for delivery in deliveries:
        if delivery['idCliente'] == client_id:
            filtered.append(delivery)

    return jsonify({ 'pedidos': filtered})


@app.route('/repartidor/recibir', methods=['POST'])
@token_required
def receive_order(request_data):
    print('RequestData:', request_data  )
    if request.method == 'POST':
        data = request.get_json()
        deliveries.append(data['pedido'])
        return jsonify(
            deliveries
        )

if __name__ == "__main__":
    app.run(debug=True)
