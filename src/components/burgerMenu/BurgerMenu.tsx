import React from 'react'

export default function BurgerMenu() {
    const burgerMenu: React.FC = () =>{

        const [isOpen, SetIsOpen] = useState<boolean>(false);

        const toggleMenu = (): void =>{
            SetIsOpen(!isOpen);
        };

        return (
            <div className='relativ'>
                <button onClick={toggleMenu} className='p-2 rounded-md border focus:outline-none focus:ring focus:ring-orange-400' > 
                    <div>

                    <div className='w-6 h-0.5 bg-black'> </div>
                    <div className='w-6 h-0.5 bg-black'></div>
                    <div className='w-6 h-0.5 bg-black'></div>
                    </div>
                    
                </button>

    </div>
  )
}
