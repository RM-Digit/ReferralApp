module.exports = (io, socket) => {
  const createOrder = (payload) => {
    console.log("user connected");
  };

  socket.on("order:payment", createOrder);
};
