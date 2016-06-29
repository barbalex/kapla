import {
  DB_CHOOSE,
  DB_CHOOSE_SUCCESS,
  DB_CHOOSE_ERROR,
  MESSAGE_SHOW,
  TABLELAYOUT_SET,
  GESCHAEFTELAYOUT_SET,
  FILTERFIELDSLAYOUT_SET,
  CONFIG_GET,
  CONFIG_SET,
} from '../actions/app'

const standardState = {
  fetchingDb: false,
  errorFetchingDb: null,
  dbPath: null,
  db: null,
  showMessageModal: false,
  messageTextLine1: '',
  messageTextLine2: '',
  geschaefteLayout: {},
  filterFieldsLayout: {},
  tableLayout: {},
  config: {
    dbPath: '',
    tableColumnWidth: 70,
    geschaefteColumnWidth: 40,
  }
}

const app = (state = standardState, action) => {
  switch (action.type) {
    case CONFIG_GET:
    case CONFIG_SET:
      return {
        ...state,
        config: action.config
      }
    case GESCHAEFTELAYOUT_SET:
      return {
        ...state,
        geschaefteLayout: action.geschaefteLayout
      }
    case FILTERFIELDSLAYOUT_SET:
      return {
        ...state,
        filterFieldsLayout: action.filterFieldsLayout
      }
    case TABLELAYOUT_SET:
      return {
        ...state,
        tableLayout: action.tableLayout
      }
    case MESSAGE_SHOW:
      return {
        ...state,
        showMessageModal: action.showMessageModal,
        messageTextLine1: action.messageTextLine1,
        messageTextLine2: action.messageTextLine2
      }
    case DB_CHOOSE:
      return {
        ...state,
        fetchingDb: true,
        errorFetchingDb: null
      }
    case DB_CHOOSE_SUCCESS:
      return {
        ...state,
        fetchingDb: false,
        errorFetchingDb: null,
        dbPath: action.dbPath,
        db: action.db
      }
    case DB_CHOOSE_ERROR:
      return {
        ...state,
        fetchingDb: false,
        errorFetchingDb: action.error,
        dbPath: null,
        db: null
      }
    default:
      return state
  }
}

export default app
