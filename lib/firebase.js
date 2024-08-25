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
  projectId: 'ba0d893de',
  databaseURL: 'https://ba0d893de-default-rtdb.europe-west1.firebasedatabase.app'
})

export { ref, set, get, onValue, update, remove, getDatabase }
