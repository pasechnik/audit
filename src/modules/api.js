import { v4 } from 'node-uuid';

// This is a fake in-memory implementation of something
// that would be implemented by calling a REST server.

const fakeDatabase = {
  items: [{
    id: v4(),
    type: 'zapas',
    name: 'hey 1',
    otchet: 'hey1',
    summa: 1000,
    otkl: 0,
  }, {
    id: v4(),
    type: 'zapas',
    name: 'hey 2',
    otchet: 'hey1',
    summa: 900,
    otkl: 0,
  }, {
    id: v4(),
    type: 'zapas',
    name: 'hey 3',
    otchet: 'hey1',
    summa: 100,
    otkl: 0,
  }, {
    id: v4(),
    type: 'invest',
    name: 'invest',
    otchet: 'hey1',
    summa: 5000,
    otkl: 0,
  }],
}

const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms))

export const fetchItems = (filter) =>
  delay(100).then(() => {
    switch (filter) {
      case 'all':
        return fakeDatabase.items
      case 'zapas':
        return fakeDatabase.items.filter(t => t.type === 'zapas')
      case 'invest':
        return fakeDatabase.items.filter(t => t.type === 'invest')
      default:
        return fakeDatabase.items
      // throw new Error(`Unknown filter: ${filter}`)
    }
  })

export const saveItem = (itm) =>
  delay(100).then(() => {
    const newitem = Object.assign({})
    newitem.type = itm.type
    newitem.name = itm.name
    newitem.otchet = itm.otchet
    newitem.summa = parseFloat(itm.summa)
    newitem.otkl = parseFloat(itm.otkl)

    if (itm.id === '0') {
      newitem.id = v4()
      fakeDatabase.items.push(
        newitem
      )
    } else {
      newitem.id = itm.id
    }

    let item = fakeDatabase.items.find(t => t.id === newitem.id)
    if (item !== undefined) {
      item = Object.assign(item, newitem)
    }
    return item
  })

export const deleteItem = (id) =>
  delay(100).then(() => {
    fakeDatabase.items = fakeDatabase.items.filter(itm => id !== itm.id)
    return id
  })
