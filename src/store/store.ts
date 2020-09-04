import { Reducer } from "redux";

export type ReducerState = {
    items: ServerItem[],
    isLoading: boolean,
    isError: boolean,
    filteredItems: ServerItem[]
}

const initialState = {
    items: [],
    isLoading: false,
    isError: false,
    filteredItems: []
}

export type ServerItem = {
    _id: string;
    isActive: boolean;
    price: number;
    picture: string;
    name: string
    about: string
    tags: string[]
}

export const selectData = (state: ReducerState) => state.items
export const selectFilteredItems = (state: ReducerState) => state.filteredItems



const GET_LIST_INITIATE = 'GET_LIST_INITIATE';
const GET_LIST_SUCCESS = 'GET_LIST_SUCCESS';
const GET_LIST_FAILURE = 'GET_LIST_FAILURE';
const UPDATE_LIST = 'UPDATE_LIST';

export const updateList = (searchFor: string) => ({
    type: UPDATE_LIST,
    searchFor,
})

export const getListInitiate = () => ({
    type: GET_LIST_INITIATE,
})

export const getListSuccess = (data: ServerItem[]) => ({
    type: GET_LIST_SUCCESS,
    data
});

export const getListFailure = () => ({
    type: GET_LIST_FAILURE
})

type Action = {
    type: 'GET_LIST_INITIATE' | 'GET_LIST_SUCCESS' | 'GET_LIST_FAILURE' | 'UPDATE_LIST',
    data: ServerItem[],
    searchFor: string
}

export const reducer: Reducer<ReducerState, Action> = (state = initialState, action: Action) => {
    switch (action.type) {
        case GET_LIST_INITIATE: {
            return { ...state, isLoading: true, isError: false }
        }
        case GET_LIST_SUCCESS: {
            return { ...state, isLoading: false, isError: false, items: action.data, filteredItems: action.data }
        }
        case GET_LIST_FAILURE: {
            return { ...state, isLoading: false, isError: true }
        }
        case UPDATE_LIST: {
            const searchForValue = action.searchFor.toLowerCase();
            const filteredItems = state.items.filter(item => item.name.toLowerCase().startsWith(searchForValue))
            const targetData = !!searchForValue?.length ? filteredItems : state.items
            console.log(filteredItems, '213')
            return { ...state, filteredItems: targetData }
        }
        default: {
            return { ...state }
        }
    }
}