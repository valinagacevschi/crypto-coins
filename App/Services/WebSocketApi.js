import { eventChannel } from 'redux-saga';

const wsUrl = 'wss://ws-feed.gdax.com';

const websocketInitChannel = (prods) => eventChannel(emitter => {
  const socket = new WebSocket(wsUrl);

  socket.onopen = () => {
    __DEV__ && console.log('opening...', prods);
    socket.send(JSON.stringify({
      type: 'subscribe',
      product_ids: prods
    }));
  };

  socket.onmessage = (msg) => {
    const { type, price, product_id } = JSON.parse(msg.data);
    const value = {
      time: new Date(),
      price: Number(price)
    }; 

    if (type === 'match' && price) {
      const payload = { product: product_id, value };
      return emitter({ type: 'ADD_VALUE', payload });
    }
  };

  socket.onclose = (e) => {
    __DEV__ && console.log('closing..', e.code, e.reason);
  };

  socket.onerror = (error) => {
    __DEV__ && console.log('WebSocket error', error);
  };

  // unsubscribe function
  return () => {
    __DEV__ && console.log('Socket off');
  };
});

export { websocketInitChannel };
