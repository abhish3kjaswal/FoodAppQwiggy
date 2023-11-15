import { render, screen } from '@testing-library/react';
import App from './App';
import Header from './components/Header';
import Body from './components/Body';
import '@testing-library/jest-dom'

describe("Initial Test",()=>{

    test("Body Loaded", () => {
    
        //to check whether the component is rendered or not
        render(<Body />)

        // screen
    
        let button = screen.getByText('Top Rated')
        
        //to remove error for toBeInTheDocument -> need to install a library -> npm i -D @testing-library/jest-dom 
        expect(button).toBeInTheDocument()
    })
})
