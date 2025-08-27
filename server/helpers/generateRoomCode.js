const generateRoomCode = (len = 5) => {
  // generate room code tanpa I, O , 0 , i
  const ABC = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  const arr = new Uint32Array(len);
  crypto.getRandomValues(arr);
  return Array.from(arr, (x) => ABC[x % ABC.length]).join("");
};

module.exports = generateRoomCode;
