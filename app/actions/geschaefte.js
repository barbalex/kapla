'use strict'

const getGeschaefte = require('../src/getGeschaefte.js')

export const GESCHAEFTE_HOLEN = 'GESCHAEFTE_HOLEN'

function ersetze (geschaefte) {
  return {
    type: GESCHAEFTE_HOLEN,
    data: geschaefte
  }
}

export function hole () {
  return dispatch => {
    getGeschaefte()
      .then((geschaefte) => {
        dispatch(ersetze(geschaefte))
      })
      .catch((error) => console.log(error))
  }
}
