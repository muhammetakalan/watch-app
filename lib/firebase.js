import { initializeApp } from '@firebase/app'
import {
  set,
  get,
  ref,
  update,
  remove,
  onValue,
  getDatabase
} from 'firebase/database'

initializeApp({
  projectId: 'akalan-db',
  databaseURL: 'https://akalan-db.firebaseio.com'
})

export { ref, set, get, onValue, update, remove, getDatabase }
