import {useState } from "react";
import axios from "axios";
import {v4 as uuid} from "uuid";

const useFlip =(initialState = true) => {
    const [state, setState] = useState(initialState);
    const toggleState = () => {
        setState(state => !state);
    }
    return [state, toggleState];    

}

const useAxios = (name, url) => {
    const [cards, setCards] = useState([])
    
    const addCard = async (name) => {
        try {
        const response = await axios.get(name ? url + name : url);
        setCards(cards => [...cards, { ...response.data, id: uuid() }]);
        } catch(err){
            throw new Error(err);
        }
    };
    
    const cleanup = () => setCards([]);
    return [cards, addCard, cleanup]
    };

    export { useFlip, useAxios};