import { User } from ".prisma/client";
import { CommonResult } from "libs/server/withHandler";
import useSWR from "swr";

interface MeResult extends CommonResult {
  loggedInUser?: User;
}

const useMe = () => {
  const { data } = useSWR<MeResult>("/api/users/me");
  return data?.loggedInUser;
};

export default useMe;
