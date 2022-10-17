import { GameObject } from "../../../../src/modules/gameObject";
import Input from "../../../../src/utils/input";

export default (obj: GameObject) => {
  if (Input.onKeyHold(87)) {
    obj.y -= 5;
  }

  if (Input.onKeyHold(83)) {
    obj.y += 5;
  }

  if (Input.onKeyHold(65)) {
    obj.x -= 5;
  }

  if (Input.onKeyHold(68)) {
    obj.x += 5;
  }
};
