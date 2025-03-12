import { Link } from "react-router-dom";
import BurgerMenu from "../burgerMenu/BurgerMenu";
import SearchInput from "../searchInput/SearchInput";


export default function Header() {
  return (
    <div className="flex flex-col gap-6 items-center">
    <Link to="/">
        <div className="pt-10 flex justify-center">
            <img className="hover:scale-110 transform transition duration-300" src="/logo.png" alt="" />
        </div>
    </Link>
    <div className="flex justify-centern items-center gap-6 mb-4">
    
    <BurgerMenu/>
    <SearchInput></SearchInput>
    
    </div>

    </div>

  );
}
