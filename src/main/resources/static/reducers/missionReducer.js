const initialState = {
  fetching: false,
  fetched: false,
  inserting: false,
  inserted: false,
  newMission: null,
  missionPlanner: null,
  missions: null,
  missionPassengers: null,
  missionPilots: null,
  finishedFlight: false,
  error: null,
  insertingPassengers: false,
  insertedPassengers: false,
  insertingPilots: false,
  insertedPilots: false,
  insertingPlanner: false,
  insertedPlanner: false,
  missionPlanner: null,
  removedMission: false,
  removingMission: false,
}

export default function missionReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_ALL_MISSION_PENDING':
      return {
        ...state,
        fetching: true,
      }
    case 'REQUEST_ALL_MISSION_FULFILLED':
      return {
        ...state,
        fetching: false,
        fetched: true,
        missions: action.payload,
      }
    case 'REQUEST_ALL_MISSION_REJECTED':
      return {
        ...state,
        fetching: false,
        error: action.payload,
      }
    case 'REQUEST_MISSION_PLANNER_BY_MISSION_PENDING':
      return {
        ...state,
        fetching: true,
        fetched: false,
      }
    case 'REQUEST_MISSION_PLANNER_BY_MISSION_FULFILLED':
      return {
        ...state,
        fetching: false,
        fetched: true,
        missionPlanner: action.payload,
      }
    case 'REQUEST_MISSION_PLANNER_BY_MISSION_ERROR':
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.payload,
      }
    case 'REQUEST_MISSION_PASSENGERS_BY_MISSION_PENDING':
      return {
        ...state,
        fetching: true,
        fetched: false,
      }
    case 'REQUEST_MISSION_PASSENGERS_BY_MISSION_FULFILLED':
      return {
        ...state,
        fetching: false,
        fetched: true,
        missionPassengers: action.payload,
      }
    case 'REQUEST_MISSION_PASSENGERS_BY_MISSION_ERROR':
      return {
        ...state,
        fetched: false,
        fetching: false,
        error: action.payload,
      }
    case 'REQUEST_MISSION_PILOTS_BY_MISSION_PENDING':
      return {
        ...state,
        fetched: false,
        fetching: true,
      }
    case 'REQUEST_MISSION_PILOTS_BY_MISSION_FULFILLED':
      return {
        ...state,
        fetching: false,
        fetched: true,
        missionPilots: action.payload,
      }
    case 'REQUEST_MISSION_PILOTS_BY_MISSION_ERROR':
      return {
        ...state,
        feching: false,
        fetched: false,
        error: action.payload,
      }
    case 'REQUEST_INSERT_UPDATE_MISSION_PENDING':
      return {
        ...state,
        inserting: true,
      }
    case 'REQUEST_INSERT_UPDATE_MISSION_FULFILLED':
      return {
        ...state,
        inserting: false,
        inserted: true,
        newMission: action.payload,
      }
      case 'REQUEST_INSERT_UPDATE_MISSION_ERROR':
        return {
          ...state,
          inserting: false,
          inserted: false,
          error: action.payload,
        }
      case 'REQUEST_INSERT_UPDATE_MISSION_PASSENGERS_PENDING':
        return {
          ...state,
          insertingPassengers: true,
          insertedPassengers: false,
        }
      case 'REQUEST_INSERT_UPDATE_MISSION_PASSENGERS_FULFILLED':
        return {
          ...state,
          insertingPassengers: false,
          insertedPassengers: true,
        }
      case 'REQUEST_INSERT_UPDATE_MISSION_PASSENGERS_ERROR':
        return {
          ...state,
          error: action.payload
        }
      case 'REQUEST_INSERT_UPDATE_MISSION_PILOTS_PENDING':
        return {
          ...state,
          insertingPilots: true,
          insertedPilots: false,
        }
      case 'REQUEST_INSERT_UPDATE_MISSION_PILOTS_FULFILLED':
        return {
          ...state,
          insertingPilots: false,
          insertedPilots: true,
        }
      case 'REQUEST_INSERT_UPDATE_MISSION_PILOTS_ERROR':
        return {
          ...state,
          error: action.payload,
        }
      case 'REQUEST_INSERT_UPDATE_MISSION_PLANNER_PENDING':
        return {
          ...state,
          insertingPlanner: true,
          insertedPlanner: false,
        }
      case 'REQUEST_INSERT_UPDATE_MISSION_PLANNER_FULFILLED':
        return {
          ...state,
          insertingPlanner: false,
          insertedPlanner: true,
          missionPlanner: action.payload,
        }
      case 'REQUEST_INSERT_UPDATE_MISSION_PLANNER_ERROR':
        return {
          ...state,
          error: action.payload,
        }
      case 'REQUEST_DELETE_MISSION_PENDING':
      return {
        ...state,
        removingMission: true,
        removedMission: false,
      }
      case 'REQUEST_DELETE_MISSION_FULFILLED':
        return {
          ...state,
          removingMission: false,
          removedMission: true,
        }
      case 'REQUEST_DELETE_MISSION_ERROR':
        return {
          ...state,
          removingMission: false,
          removedMission: false,
          error: action.payload,
        }
      case 'REQUEST_DELETE_MISSION_PLANNER_PENDING':
        return {
          ...state,
          removingMissionPlanner: true,
        }
      case 'REQUEST_DELETE_MISSION_PLANNER_FULFILLED':
        return {
          ...state,
          removingMissionPlanner: false,
          removedMissionPlanner: true,
          }
      case 'REQUEST_DELETE_MISSION_PASSENGERS_PENDING':
        return {
          ...state,
          removingMissionPassengers: true,
        }
      case 'REQUEST_DELETE_MISSION_PASSENGERS_FULFILLED':
        return {
          ...state,
          removingMissionPassengers: false,
          removedMissionPassengers: true,
        }
      case 'REQUEST_DELETE_MISSION_PILOTS_PENDING':
        return {
          ...state,
          removingMissionPassengers: true,
        }
      case 'REQUEST_DELETE_MISSION_PILOTS_FULFILLED':
        return {
          ...state,
          removingMissionPilots: false,
          removedMissionPilots: true,
        }
      case 'REQUEST_FINISH_FLIGHT_PENDING':
        return {
          ...state,
          finishingFlight: true,
        }
      case 'REQUEST_FINISH_FLIGHT_FULFILLED':
        return {
          ...state,
          finishingFlight: false,
          finishedFlight: true,
        }
      case 'REQUEST_FINISH_FLIGHT_ERROR':
        return {
          ...state,
          finishingFlight: false,
          error: action.payload,
        }
    default:
      return state;
  }
}
