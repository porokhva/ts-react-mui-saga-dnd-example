import clone from 'ramda/src/clone'
import find from 'ramda/src/find'
import findIndex from 'ramda/src/findIndex'
import insert from 'ramda/src/insert'
import propEq from 'ramda/src/propEq'

export const helpers = {
  find,
  findIndex,
  propEq,
  insert,
  clone
}
export const defaults = {
  notFoundImg: 'https://avatars.mds.yandex.net/i?id=1f003da65852aa344a727ad65f5a23ef_l-5439293-images-thumbs&n=13'
}

export const dateUtils = {
  formatDate: date => {
    return '' + new Date(date).toLocaleDateString('ru-RU') + ' ' + new Date(date).toLocaleTimeString('ru-RU')
  }
}
