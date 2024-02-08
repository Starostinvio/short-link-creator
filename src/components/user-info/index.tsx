import "./style.css";
import { useState } from "react";
import { FaUserLarge } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/auth/auth-slice";
import { User } from "../../types";
import { IoArrowRedo } from "react-icons/io5";
interface UserInfoProps {
  user: User | {};
}

function UserInfo({ user }: UserInfoProps) {
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
      <div
        className="UserInfo"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="UserInfo-avatar">
          <FaUserLarge className="user" />
        </div>
        <IoIosArrowDown />

        {hover && (
          <div className="UserInfo-list-panel">
            <div className="UserInfo-list">
              <div className="UserInfo-list-profile">
                <div className="UserInfo-avatar-small">
                  <FaUserLarge className="user-small" />
                </div>
                <div>{(user as User).username}</div>
              </div>
              <div onClick={() => dispatch(logOut())}>
                <div>Выйти</div>
                <IoArrowRedo className="icon-lock" />
              </div>
            </div>
          </div>
        )}
        {/* </div> */}
      </div>
    </>
  );
}

export default UserInfo;
