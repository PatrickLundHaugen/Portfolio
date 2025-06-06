import { FaLinkedin } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";
import { FiMail } from "react-icons/fi";

function Footer() {
    return (
        <footer className="flex justify-between align-center py-16 text-muted-foreground">
            <p className="text-sm">Laget av Patrick</p>
            <div className="flex gap-2 text-xl *:cursor-pointer *:transition-colors *:hover:text-primary">
                <a href="https://www.linkedin.com/in/patrick-lund-haugen-6776092ab/" target="_blank"><FaLinkedin/></a>
                <a href="https://github.com/PatrickLundHaugen" target="_blank"><IoLogoGithub/></a>
                <a href="mailto:patricklundhaugen@gmail.com"><FiMail/></a>
            </div>
        </footer>
    )
}

export default Footer;
