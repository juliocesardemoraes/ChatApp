import type { NextApiRequest, NextApiResponse } from 'next';
import { Server } from 'Socket.IO';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/**
 * Socket.IO Connection
 * @param {NextApiRequest} req: Socket Io requisition
 * @param {NextApiResponse} res: Socket IO response
 */
export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (res.socket.server.io) {
      console.log('Socket is already running');
    } else {
      console.log('Socket is initializing');
      const io = new Server(res.socket.server);
      res.socket.server.io = io;

      io.on('connection', (socket) => {
        socket.on('input-change', (msg) => {
          socket.broadcast.emit('update-input', msg);
        });
      });
    }
    res.end();
  } catch (err) {
    console.log('ERROR', err);
  }
};
