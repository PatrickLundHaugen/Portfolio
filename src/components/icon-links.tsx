import { FaLinkedin } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";
import { FiMail } from "react-icons/fi";

export function IconLinks() {
    return (
        <div
            className="flex gap-2 text-xl text-muted-foreground *:cursor-pointer *:transition-colors *:hover:text-primary">
            <a href="https://www.linkedin.com/in/patrick-lund-haugen-6776092ab/" target="_blank" aria-label="Link to LinkedIn"><FaLinkedin/></a>
            <a href="https://github.com/PatrickLundHaugen" target="_blank" aria-label="Link to GitHub"><IoLogoGithub/></a>
            <a href="mailto:patricklundhaugen@gmail.com" aria-label="Link to Mail"><FiMail/></a>
        </div>
    )
}
