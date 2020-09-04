import { BackendRoutes } from "./enums/backendRoutes"
import { Dispatch } from "redux"
import { getListSuccess, getListInitiate, ServerItem } from "./store/store"

export const backendUrl = 'http://localhost:3035'

export class Backend {

    getData = async (dispatch: Dispatch) => {
        dispatch(getListInitiate());
        const response = await fetch(`${backendUrl}${BackendRoutes.data}`)
        const { data } = await response.json()
        const validateImagePaths = data.map((item: ServerItem) => ({ ...item, picture: `${backendUrl}${item.picture}` }))
        dispatch(getListSuccess(validateImagePaths));
    }
}