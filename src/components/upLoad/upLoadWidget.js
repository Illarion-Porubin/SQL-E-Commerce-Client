import React, { useCallback } from "react";
//////////////////////////Cloudinary//////////////////////////////
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { selectAuthData } from "../../redux/selectos.tsx";
import { useCustomSelector, useCustomDispatch } from "../../hooks/store.tsx";
import { fetchAuthMe, fetchDeleteAvatar, fetchUpdateAvatar } from "../../redux/slices/authSlice.tsx";
import s from "./UploadWidget.module.scss";


export const UploadWidget = ({ ...props }) => {
  const dispatch = useCustomDispatch();
  const authState = useCustomSelector(selectAuthData);
  const cloudinaryRef = React.useRef();
  const widgetRef = React.useRef();
  const [userAvatarId, setUserAvatarId] = React.useState(null);
  const isAdmin = props.admin;


  const cld = new Cloudinary({
    cloud: {
      cloudName: "dnd2lc6qw",
    },
  });

  React.useEffect(() => {
    if (!props.admin) {
      if (authState.isLoading !== 'loaded') {
        dispatch(fetchAuthMe)
      } else if (authState.isLoading === 'loaded') {
        setUserAvatarId(authState.data?.user.avatar);
      }
    }
  }, [dispatch, authState.isLoading, authState.data?.user.avatar, props.admin]);

  const upload = useCallback(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'dnd2lc6qw',
      uploadPreset: 'xzmheeky',
      sources: [
        "local",
        "camera",
        "google_drive",
        "url"
      ],
    }, function (error, result) {
      try {
        
        const photoId = result.info.public_id;
        const productUrl = result.info.url;

        if (!props.admin) {
          if (photoId) {
            const data = { email: authState?.data?.user?.email, avatar: photoId };
            dispatch(fetchDeleteAvatar(userAvatarId))
            setTimeout(() => {
              dispatch(fetchUpdateAvatar({ ...data }));
              dispatch(fetchAuthMe())
            }, 400)
          }
        }
        if (props.admin && productUrl) {
          console.log(productUrl, 'productUrl')
          props.setUrl(productUrl)
        }
      } catch (e) {
        console.log(error);
      }

    });
    widgetRef.current.open()
  }, [dispatch, userAvatarId, authState?.data?.user?.email, props])

  const defaultAvatar = "https://res.cloudinary.com/dnd2lc6qw/image/upload/v1700142769/ha19yqibgjmmxvnfszbr.png";
  const defaultProduct = "https://blockbusterbd.com/uploads/movies/posters/noimage.jpg";
  const userAvatar = cld.image(userAvatarId ? userAvatarId : defaultAvatar).format('auto').quality('auto');

  const user = () => {
    return (
      <>
        {
          authState.data && authState.data.user.avatar ?
            <AdvancedImage
              className={s.accaunt__avatar}
              onClick={() => upload()}
              cldImg={userAvatar}
            />
            :
            <img
              className={s.accaunt__avatar}
              src={defaultAvatar}
              alt="avatar"
              onClick={() => upload()}
            />
        }
      </>
    )
  }

  const admin = () => {
    return (
      <>
        <div className={s.product} onClick={() => upload()}>
          <img className={s.product__img} src={props.url ? props.url : defaultProduct} alt="productImage" />
        </div>
      </>
    )
  }

  return (
    <>
      {
        !isAdmin ?
          user()
          :
          admin()
      }
    </>

  )
}


