/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
// import axios from "axios";
import { getDetailByUserId } from "../../../services/userService";
import { UserInfoResponse } from "../models/responses/UserInfoResponse";

export const UserInfo=() => {
  const [userDetails, setuserDetails] = useState<UserInfoResponse>();
  const [ loading, setLoading] = useState(false);
  const [ error, setError] = useState<string | null>(null);
  
  const getUserDetails = async (userId: string) => {
    setLoading(true);
    try {
      const response = await getDetailByUserId(userId);
      console.log(response);
      setuserDetails(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    userDetails,
    getUserDetails
  }
}