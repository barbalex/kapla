import {
  DB_CHOOSE,
  DB_CHOOSE_SUCCESS,
  DB_CHOOSE_ERROR,
  MESSAGE_SHOW,
  TABLELAYOUT_SET,
  TABLECOLUMN_SET,
  TABLE_COLUMN_WIDTH_GET_FROM_DB,
  GESCHAEFTE_COLUMN_WIDTH_GET_FROM_DB,
  GESCHAEFTELAYOUT_SET,
  GESCHAEFTECOLUMN_SET,
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
  geschaefteColumnWidth: 40,
  tableLayout: {},
  tableColumnWidth: 70,
  config: {}
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
    case GESCHAEFTECOLUMN_SET:
      return {
        ...state,
        geschaefteColumnWidth: action.geschaefteColumnWidth
      }
    case GESCHAEFTE_COLUMN_WIDTH_GET_FROM_DB:
      return {
        ...state,
        geschaefteColumnWidth: action.geschaefteColumnWidth
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
    case TABLECOLUMN_SET:
      return {
        ...state,
        tableColumnWidth: action.tableColumnWidth
      }
    case TABLE_COLUMN_WIDTH_GET_FROM_DB:
      return {
        ...state,
        tableColumnWidth: action.tableColumnWidth
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
