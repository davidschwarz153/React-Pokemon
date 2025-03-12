import AllPokemon from "../components/allPokemon/AllPokemon";
import Header from "../components/header/Header";


export default function Home(){

    return(
        <div className="flex flex-col items-center">
            <Header/>
            <AllPokemon/>
        </div>
    )
}