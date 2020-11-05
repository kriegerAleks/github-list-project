/**
 * this serves as a place for me to experiment with the basic types as well as
 * a convenient
 */

import { NameTypes } from "./name.types";

// type Action<T, K> = (objet: K) => Pick<]>;

const addName = ({ name }: any) => ({
  type: NameTypes.ADD_NAME,
  name,
});
// bob here is really just an experiment and nothing more
const removeName = ({ bob }: any) => ({
  type: NameTypes.REMOVE_NAME,
  bob,
});

export default { addName, removeName };

// TODO: add in the Grouped action type variables
export type NameActions =
  | ReturnType<typeof addName>
  | ReturnType<typeof removeName>;
