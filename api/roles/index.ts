import { AccessControl } from "accesscontrol";

export const roles = () => {
  const ac = new AccessControl();
  ac.grant("basic").readOwn("profile").updateOwn("profile");

  ac.grant("admin")
    .extend("basic")
    .createOwn("item")
    .updateAny("item")
    .deleteAny("item");

  return ac;
};
