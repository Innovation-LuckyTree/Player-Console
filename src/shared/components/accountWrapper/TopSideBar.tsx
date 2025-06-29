import { FC, useEffect, useRef, useState } from "react";
import { UserInfo } from "../../../pages/account/hooks/UserInfo";
import { getImageString } from "../../../services/uploadService";

export const TopSideBar: FC = () => {
  const { userInfo } = UserInfo(); // Assume this returns an object like { userInfo: {...} }
  const [propImg, setPropImg] = useState<string>("");
  const hasLoadedImage = useRef(false);

  useEffect(() => {
    const selfiePath = userInfo?.accountInfo?.selfiePath;

    if (
      selfiePath &&
      selfiePath.trim() !== "" &&
      !hasLoadedImage.current
    ) {
      hasLoadedImage.current = true;
      getImageString(selfiePath)
        .then((resp) => {
          setPropImg(resp.data);
        })
        .catch((err) => {
          console.error("Image fetch failed", err);
          hasLoadedImage.current = false;
        });
    }
  }, [userInfo?.accountInfo?.selfiePath]);

  return (
    <>
      <div className="profile-card">
        <div className="profile-card-flex">
          <div className="avatar">
            {propImg && <img src={propImg} alt="Profile" />}
          </div>
          <div>
            <div style={{ marginBottom: "10px" }}>
              {userInfo?.accountInfo?.fullName || "..."}
            </div>
            <span
              className={`badge ${
                userInfo?.accountInfo?.isVerified ? "success" : "pending"
              }`}
            >
              {userInfo?.accountInfo?.isVerified ? "Verified" : "Pending"}
            </span>
          </div>
        </div>

        <div className="profile-info">
          <div className="profile-card-flex">
            <span>ID:</span>
            <span>
              {userInfo?.accountInfo?.accountInfoId != null
                ? String(userInfo.accountInfo.accountInfoId).padStart(15, "0")
                : "..."}
            </span>
          </div>
          <div className="profile-card-flex">
            <span>DEFAULT</span>
            <span className="badge vip">VIP</span>
          </div>
        </div>
      </div>

      <div className="credits-card">
        <span>Credits</span>
        <strong>
          PHP{" "}
          {userInfo?.totalCredits != null
            ? userInfo.totalCredits.toFixed(2)
            : "0.00"}
        </strong>
      </div>
    </>
  );
};
