import React, { useState } from "react";
import styles from "./Footer.module.css";
import logo from "../../assets/images/logo4.png";
import { Link } from "react-router-dom";

interface FooterInterface {
  title: string;
  content: Array<{ name: string; innerLink?: string; outerLink?: string }>;
}

export function Footer() {
  const [footerData, setFooterData] = useState<Array<FooterInterface>>([
    {
      title: "queue overflow",
      content: [
        { name: "questions", innerLink: "/questions?page=1" },
        { name: "tags", innerLink: "/tags" },
        { name: "users", innerLink: "/users" },
      ],
    },
    {
      title: "team capybara",
      content: [
        { name: "🐧 Lee Dong-Hyeon", outerLink: "https://blog.munawiki.dev/" },
        { name: "🌦 Kim Ye-Seul", outerLink: "https://velog.io/@ojjo" },
        { name: "🦔 Kim Yu-Young", outerLink: "https://u00938.github.io/" },
        { name: "🍄 Kang Seong-Ho", outerLink: "https://codulgi.tistory.com/" },
      ],
    },
    {
      title: "company",
      content: [
        {
          name: "Codestates Immersive 25",
          outerLink: "https://www.codestates.com/",
        },
      ],
    },
    {
      title: "repository",
      content: [
        {
          name: "WhyNotWorking-client",
          outerLink: "https://github.com/codestates/WhyNotWorking-client",
        },
        {
          name: "WhyNotWorking-server",
          outerLink: "https://github.com/codestates/WhyNotWorking-server",
        },
      ],
    },
  ]);

  return (
    <div className={styles.container}>
      <main className={styles.content}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" className={styles.logoImg} />
        </div>
        <div className={styles.listBox}>
          {footerData.map((v) => (
            <ul className={styles.list}>
              <li className={styles.listTitle}>{v.title}</li>
              {v.content.map((v) =>
                v.innerLink ? (
                  <Link to={v.innerLink}>{v.name}</Link>
                ) : (
                  <a href={v.outerLink}>{v.name}</a>
                )
              )}
            </ul>
          ))}
        </div>
      </main>
    </div>
  );
}
