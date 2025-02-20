import { getDatabase, ref, push } from './firebase';

export const notifyAdmin = (title, body) => {
  const db = getDatabase();
  push(ref(db, 'notifications'), {
    title,
    body,
    timestamp: Date.now(),
  });
};
