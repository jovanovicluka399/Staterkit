//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeRegister,
  postJwtRegister,
} from "../../../helpers/fakebackend_helper";

// action
import {
  registerUserSuccessful,
  registerUserFailed,
  resetRegisterFlagChange,
  apiErrorChange
} from "./reducer";
import { authHostAPI } from "pages/api/authHost-api";

// initialize relavant method of both Auth
const fireBaseBackend = getFirebaseBackend();

// Is user register successfull then direct plot user in redux.
export const registerUser = (user: any, source: string, locationData: any) => async (dispatch: any) => {
  /* try {
    let response;

    if (process.env.NEXT_PUBLIC_DEFAULTAUTH === "firebase") {
      response = fireBaseBackend.registerUser(user.email, user.password);
      // yield put(registerUserSuccessful(response));
    } else if (process.env.NEXT_PUBLIC_DEFAULTAUTH === "jwt") {
      response = postJwtRegister('/post-jwt-register', user);
      // yield put(registerUserSuccessful(response));
    } else if (process.env.NEXT_PUBLIC_API_URL) {
      response = postFakeRegister(user);
      const data: any = await response;

      // if (data.message === "success") {
        dispatch(registerUserSuccessful(data));
      // } else {
      //   dispatch(registerUserFailed(data));
      // }
    }
  } catch (error) {
    dispatch(registerUserFailed(error));
  } */
  authHostAPI
			.signUp(user.email.toLowerCase(), user.password, source, locationData)
			.then((res) => {
				localStorage.setItem(
					"user",
					JSON.stringify({
						role: "auth",
						auth: res.token,
					})
				);
				localStorage.removeItem("utm_source");
			})
			.then(() => {
				window.location.pathname = "/host/dashboard";
				window.scrollTo(0, 0);
			})
			.catch((err) => {
				if (err.response.status === 422) {
					// setExistingEmail(true);
				} else {
					alert(err);
				}
			});
};

export const resetRegisterFlag = () => {
  try {
    const response = resetRegisterFlagChange();
    return response;
  } catch (error) {
    return error;
  }
};

export const apiError = () => {
  try {
    const response = apiErrorChange("");
    return response;
  } catch (error) {
    return error;
  }
};