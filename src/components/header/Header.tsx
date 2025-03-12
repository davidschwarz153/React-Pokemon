import { Link } from "react-router-dom";
import BurgerMenu from "../burgerMenu/BurgerMenu";


export default function Header() {
  return (
    <>
    <Link to="/">
        <div className="pt-10 flex justify-center">
            <img className="hover:scale-110 transform transition duration-300" src="/logo.png" alt="" />
        </div>
    </Link>

    <BurgerMenu/>

    </>

  );
}
