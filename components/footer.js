import styles from '../styles/footer.module.css'
import Link from 'next/link'
import Image from 'next/image'
import icon from "../public/favicon.ico"

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <Image
                src={icon}
                width={55}
                height={55} 
                className={styles.footer_icon}
                alt="Icon" />

            <div className={styles.authors}>
                <b>Site por: </b> <br/>
                <a>Cristian, Izac, Renan, Arthur e Kevin.</a>
            </div>

            <div className={styles.copyright}>
                <b>Copyright: 2022, Public Diary ©</b>
            </div>

            <div className={styles.info}>
                <Link href="https://github.com/EduardowGamer/Public-Diary" passHref>
                    <Image
                    className={styles.footer_icon}
                    src="https://findicons.com/files/icons/2779/simple_icons/2048/github_2048_black.png"
                    width={70}
                    height={70}
                    alt="Icon" />
                </Link>
            </div>
        </footer>
    )
};