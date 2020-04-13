import React from "react";
import styles from "./socials.module.css";
import { Twitter_logo, Linkedin_logo, Fb_logo, Git_logo } from "../../assets/index";

export default function SocialMediaContainer(params) {
  return (
    <div style={{ textAlign: "center" }}>
      <ul className={styles.socials_container}>
        <li className={styles.social_share_item}>
          <a className={styles.social_share_link} href="https://www.linkedin.com/in/dominik-polzer-hi-o/">
            <img className={styles.social_share_item_image} src={Linkedin_logo} />
          </a>
        </li>
        <li className={styles.social_share_item}>
          <a className={styles.social_share_link} href="https://github.com/dommyrock">
            <img
              className={styles.social_share_item_image}
              src={Git_logo}
              style={{ marginTop: "4px", height: "40px", width: "40px" }}
            />
          </a>
        </li>
        <li className={styles.social_share_item}>
          <a className={styles.social_share_link} href="https://www.facebook.com/dominik.polzerr">
            <img className={styles.social_share_item_image} src={Fb_logo} />
          </a>
        </li>
        <li className={styles.social_share_item}>
          <a className={styles.social_share_link} href="https://twitter.com/Dommypo">
            <img className={styles.social_share_item_image} src={Twitter_logo} />
          </a>
        </li>
      </ul>
    </div>
  );
}
